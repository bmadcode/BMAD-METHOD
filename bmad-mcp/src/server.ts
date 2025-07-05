import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { ResourceProvider } from "./providers/resourceProvider.js";
import type {
  ReadResourceResult,
  ListResourcesResult,
  Resource,
} from "@modelcontextprotocol/sdk/types.js";
import type { Variables } from "@modelcontextprotocol/sdk/shared/uriTemplate.js";
import type { BaseResource, PromptConfig, ResourceConfig } from "./types/index.js";
import { load } from "js-yaml";

export class BmadMcpServer {
  private server: McpServer;
  private transport: StdioServerTransport;
  private resourceProviders: Map<string, ResourceProvider<BaseResource>>;

  private readonly agentsResourceConfig: ResourceConfig = {
    resourceType: "Agent",
    uriScheme: "bmad://agents",
    directory: "agents",
    nameSuffix: "",
    description: "Individual BMAD agent content",
    supportedExtensions: [".md"],
  };

  // TODO some bmad files contain instructions that are only relevant when using bmad-core as files and not as MCP resources, e.g. `IDE-FILE-RESOLUTION` in agent files - either change this in BMAD, or do some file content replacement here when serving resources
  private readonly resourceConfigs: ResourceConfig[] = [
    this.agentsResourceConfig,
    {
      resourceType: "Checklist",
      uriScheme: "bmad://checklists",
      directory: "checklists",
      nameSuffix: "-checklist",
      description: "Individual BMAD checklist content",
      supportedExtensions: [".md"],
    },
    {
      resourceType: "Data",
      uriScheme: "bmad://data",
      directory: "data",
      nameSuffix: "",
      description: "Individual BMAD data content",
      supportedExtensions: [".md"],
    },
    {
      resourceType: "Task",
      uriScheme: "bmad://tasks",
      directory: "tasks",
      nameSuffix: "",
      description: "Individual BMAD task content",
      supportedExtensions: [".md"],
    },
    {
      resourceType: "Template",
      uriScheme: "bmad://templates",
      directory: "templates",
      nameSuffix: "-tmpl",
      description: "Individual BMAD template content",
      supportedExtensions: [".md"],
    },
    {
      resourceType: "Util",
      uriScheme: "bmad://utils",
      directory: "utils",
      nameSuffix: "",
      description: "Individual BMAD util content",
      supportedExtensions: [".md"],
    },
    {
      resourceType: "Workflow",
      uriScheme: "bmad://workflows",
      directory: "workflows",
      nameSuffix: "",
      description: "Individual BMAD workflow content",
      supportedExtensions: [".yml"],
    },
  ];

  private readonly promptConfigs: PromptConfig[] = [
    {
      referencedResourceConfig: this.agentsResourceConfig,
      parseDependencies: true,
    },
  ];

  constructor() {
    this.server = new McpServer(
      {
        name: "bmad-mcp",
        version: "0.1.0",
        description: "BMAD Method MCP Server",
      },
      {
        capabilities: {
          logging: {},
          prompts: {},
          resources: {},
        },
        instructions: `This MCP server provides prompts and resources to provide an Agile Development Framework. Call the bmad-orchestrator prompt to get started, or directly use the other prompts for PRD, Architecture, and Story creation and development.`,
      }
    );
    this.transport = new StdioServerTransport(process.stdin, process.stdout);
    this.resourceProviders = new Map();

    for (const config of this.resourceConfigs) {
      this.resourceProviders.set(config.resourceType, new ResourceProvider(config));
    }
  }

  private setupResources() {
    for (const config of this.resourceConfigs) {
      this.setupResourceType(config);
    }
  }

  private setupResourceType(config: ResourceConfig) {
    const provider = this.resourceProviders.get(config.resourceType);
    if (!provider) {
      throw new Error(`Provider for ${config.resourceType} not found`);
    }

    this.server.resource(
      `BMAD ${config.resourceType}`,
      new ResourceTemplate(`${config.uriScheme}/{${config.directory.slice(0, -1)}Id}`, {
        list: async () => {
          return await this.listIndividualResources(config, provider);
        },
        complete: {
          [`${config.directory.slice(0, -1)}Id`]: async (value: string) => {
            return await this.completeResourceId(value, config, provider);
          },
        },
      }),
      {
        description: config.description,
      },
      async (uri: URL, variables: Variables) => {
        return await this.readIndividualResource(uri, variables, config, provider);
      }
    );
  }

  private async listIndividualResources(
    config: ResourceConfig,
    provider: ResourceProvider<BaseResource>
  ): Promise<ListResourcesResult> {
    try {
      const resources = await provider.discover();
      const resourceList = resources.map((resource) => ({
        uri: `${config.uriScheme}/${resource.id}`,
        name: resource.name,
        title: `${config.resourceType} ${resource.name.replace(config.nameSuffix, "")}`,
        description:
          resource.description || `BMAD ${config.resourceType.toLowerCase()}: ${resource.name}`,
        mimeType: this.getMimeTypeForExtension(resource.extension),
      }));

      return { resources: resourceList };
    } catch (error) {
      console.error(
        `Error listing individual ${config.resourceType.toLowerCase()} resources:`,
        error
      );
      throw new Error(
        `Failed to list ${config.resourceType.toLowerCase()} resources: ${(error as Error).message}`
      );
    }
  }

  private async readIndividualResource(
    uri: URL,
    variables: Variables,
    config: ResourceConfig,
    provider: ResourceProvider<BaseResource>
  ): Promise<ReadResourceResult> {
    try {
      const resourceIdKey = `${config.directory.slice(0, -1)}Id`;
      const resourceIdRaw = variables[resourceIdKey];

      if (!resourceIdRaw) {
        throw new Error(`${config.resourceType} ID is required in URI`);
      }

      // Handle the case where resourceId might be an array
      const resourceId = Array.isArray(resourceIdRaw) ? resourceIdRaw[0] : resourceIdRaw;
      if (!resourceId) {
        throw new Error(`${config.resourceType} ID is required in URI`);
      }

      // Get resource content
      const resource = await provider.get(resourceId);
      const mimeType = this.getMimeTypeForExtension(resource.extension);

      return {
        contents: [
          {
            uri: uri.toString(),
            mimeType,
            text: resource.content || "",
          },
        ],
      };
    } catch (error) {
      console.error(
        `Error reading individual ${config.resourceType.toLowerCase()} resource:`,
        error
      );
      throw new Error(
        `Failed to read ${config.resourceType.toLowerCase()} resource: ${(error as Error).message}`
      );
    }
  }

  private async completeResourceId(
    value: string,
    config: ResourceConfig,
    provider: ResourceProvider<BaseResource>
  ): Promise<string[]> {
    try {
      const resources = await provider.discover();

      // Filter resources that start with the provided value
      const matchingIds = resources
        .map((resource) => resource.id)
        .filter((id) => id.toLowerCase().startsWith(value.toLowerCase()))
        .sort();

      return matchingIds;
    } catch (error) {
      console.error(`Error completing ${config.resourceType.toLowerCase()} resource IDs:`, error);
      // Return empty array on error rather than throwing
      return [];
    }
  }

  getMimeTypeForExtension(extension: string): string {
    const mimeTypes: { [key: string]: string } = {
      md: "text/markdown",
      txt: "text/plain",
      json: "application/json",
      yml: "application/x-yaml",
      yaml: "application/x-yaml",
    };
    return mimeTypes[extension] || "text/plain";
  }

  private async setupPrompts() {
    for (const config of this.promptConfigs) {
      await this.setupPrompt(config);
    }
  }

  private async setupPrompt(config: PromptConfig) {
    const provider = this.resourceProviders.get(config.referencedResourceConfig.resourceType);

    if (!provider) {
      throw new Error(`Provider for ${config.referencedResourceConfig.resourceType} not found`);
    }

    const resourceList = await this.listIndividualResources(
      config.referencedResourceConfig,
      provider
    );

    for (const resource of resourceList.resources) {
      const resourceContent = await provider.get(resource.name);

      let dependencyResources: Resource[] = [];

      if (config.parseDependencies && resourceContent.content) {
        const parsedDependencies = this.getDependenciesFromYamlEmbeddedInMarkdown(
          resourceContent.content,
          resource.name
        );

        dependencyResources = await this.getDependencyResources(parsedDependencies);
      }

      this.server.prompt(`BMAD ${resource.name}`, async () => {
        try {
          return {
            description: `BMAD ${resource.name}`,
            messages: [
              // TODO also add separate prompts for each task of the agent, so they can be triggered directly - in that case it would be great to directly embed resources instead of resource_links to save requests (relevant for ai agents like copilot which deduct premium requests and not token count)
              {
                role: "user",
                content: {
                  type: "text",
                  text: `Please use the ${resource.name} resource to assist with your task.`,
                },
              } as const,
              {
                role: "user",
                content: {
                  type: "resource",
                  resource: {
                    uri: resource.uri,
                    mimeType: resource.mimeType,
                    text: resourceContent.content ?? "",
                  },
                },
              } as const,
              ...dependencyResources.map(
                (depResource) =>
                  ({
                    role: "user",
                    content: {
                      type: "resource_link",
                      name: depResource.name,
                      uri: depResource.uri,
                      mimeType: depResource.mimeType,
                    },
                  } as const)
              ),
            ],
          };
        } catch (error) {
          console.error(`Error loading prompt resource ${resource.id}:`, error);
          throw new Error(
            `Failed to load ${config.referencedResourceConfig.resourceType.toLowerCase()} prompt: ${
              (error as Error).message
            }`
          );
        }
      });
    }
  }

  private getDependenciesFromYamlEmbeddedInMarkdown(
    content: string,
    fileName: string
  ): Record<string, string[]> {
    try {
      // Look for YAML block in markdown - it should be between ```yaml and ```
      const yamlMatch = content.match(/```y(a)?ml([\s\S]*)```/);

      if (!yamlMatch) {
        console.warn(`No YAML block found in file ${fileName}`);
        return {};
      }

      const yamlContent = yamlMatch[2];
      const yamlData = load(yamlContent);
      const dependencies = (yamlData as any)?.dependencies || null;
      return dependencies;
    } catch (error) {
      console.error(`Error parsing YAML front matter for file ${fileName}:`, error);
      return {};
    }
  }

  private async getDependencyResources(
    dependencies: Record<string, string[]>
  ): Promise<Resource[]> {
    const dependencyResources: Resource[] = [];

    for (const [directory, dependencyList] of Object.entries(dependencies)) {
      // Find the matching resource config for this dependency type
      const config = this.resourceConfigs.find(
        (c) => c.directory.toLowerCase() === directory.toLowerCase()
      );

      if (!config) {
        console.warn(`No resource config found for dependency type: ${directory}`);
        continue;
      }

      const provider = this.resourceProviders.get(config.resourceType);
      if (!provider) {
        console.warn(`No provider found for resource type: ${config.resourceType}`);
        continue;
      }

      // Get all resources for this type
      const resourceList = await this.listIndividualResources(config, provider);

      // Filter resources that match the dependency names
      const matchingResources = resourceList.resources.filter((resource) =>
        dependencyList.some(
          (dep) =>
            resource.name.toLowerCase().includes(dep.toLowerCase()) ||
            resource.title?.toLowerCase().includes(dep.toLowerCase())
        )
      );

      dependencyResources.push(...matchingResources);
    }

    return dependencyResources;
  }

  async start() {
    console.error("Starting BMAD-MCP Server...");

    this.setupResources();
    await this.setupPrompts();

    try {
      await this.server.connect(this.transport);
      console.error("BMAD-MCP Server started successfully on stdio transport");

      // Handle graceful shutdown
      process.on("SIGINT", () => this.shutdown());
      process.on("SIGTERM", () => this.shutdown());
    } catch (error) {
      console.error("Failed to start BMAD-MCP Server:", error);
      process.exit(1);
    }
  }

  private async shutdown() {
    console.error("Shutting down BMAD-MCP Server...");
    try {
      await this.server.close();
      console.error("BMAD-MCP Server shut down gracefully");
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  }
}
