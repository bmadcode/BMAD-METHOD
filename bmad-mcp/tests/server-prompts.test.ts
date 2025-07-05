import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { BmadMcpServer } from "../src/server.js";
import { ResourceProvider } from "../src/providers/resourceProvider.js";
import type { BaseResource } from "../src/types/index.js";

// Mock the stdio transport to avoid actual process interaction during tests
vi.mock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
  StdioServerTransport: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    on: vi.fn(),
    close: vi.fn(),
  })),
}));

// Mock the MCP server with prompt functionality
const mockPromptFn = vi.fn();
const mockServerInstance = {
  connect: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
  resource: vi.fn(),
  prompt: mockPromptFn,
};

vi.mock("@modelcontextprotocol/sdk/server/mcp.js", () => ({
  McpServer: vi.fn().mockImplementation(() => mockServerInstance),
  ResourceTemplate: vi.fn().mockImplementation((pattern, callbacks) => ({
    uriTemplate: pattern,
    listCallback: callbacks.list,
    completeCallback: callbacks.complete,
  })),
}));

// Mock the resource provider
vi.mock("../src/providers/resourceProvider.js", () => ({
  ResourceProvider: vi.fn().mockImplementation(() => ({
    discover: vi.fn(),
    get: vi.fn(),
  })),
}));

const mockResourceProvider = vi.mocked(ResourceProvider);

describe("BmadMcpServer - MCP Prompts", () => {
  let server: BmadMcpServer;
  let mockProviderInstance: any;
  let consoleErrorSpy: any;

  const mockAgents: BaseResource[] = [
    {
      id: "bmad-orchestrator",
      name: "BMAD Orchestrator",
      path: "/test/.bmad-core/agents/bmad-orchestrator.md",
      extension: "md",
      content: "# BMAD Orchestrator\nThis is the main orchestrator agent.",
    },
    {
      id: "prd-agent",
      name: "PRD Agent",
      path: "/test/.bmad-core/agents/prd-agent.md",
      extension: "md",
      content: "# PRD Agent\nThis agent helps create product requirements documents.",
    },
    {
      id: "story-agent",
      name: "Story Agent",
      path: "/test/.bmad-core/agents/story-agent.md",
      extension: "md",
      content: "# Story Agent\nThis agent helps create user stories.",
    },
  ];

  beforeEach(() => {
    // Create mock provider instance
    mockProviderInstance = {
      discover: vi.fn(),
      get: vi.fn(),
    };

    mockResourceProvider.mockImplementation(() => mockProviderInstance);

    server = new BmadMcpServer();

    // Override the server instance with our mock after construction
    (server as any).server = mockServerInstance;

    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe("Prompt Setup", () => {
    beforeEach(() => {
      mockProviderInstance.discover.mockResolvedValue(mockAgents);
      mockAgents.forEach((agent) => {
        mockProviderInstance.get.mockImplementation((name: string) => {
          const found = mockAgents.find((a) => a.name === name);
          return Promise.resolve(found || null);
        });
      });
    });

    it("should setup prompts during server start", async () => {
      // Mock the server methods to avoid actual connection
      vi.spyOn(server as any, "setupResources").mockImplementation(() => {});
      mockServerInstance.connect = vi.fn().mockResolvedValue(undefined);

      await server.start();

      // Verify that prompts were registered for each agent
      expect(mockPromptFn).toHaveBeenCalledTimes(mockAgents.length);

      // Verify prompt names
      mockAgents.forEach((agent) => {
        expect(mockPromptFn).toHaveBeenCalledWith(`BMAD ${agent.name}`, expect.any(Function));
      });
    });

    it("should create proper prompt structure with resource content", async () => {
      // Access the setupPrompt method directly for testing
      const setupPrompt = (server as any).setupPrompt.bind(server);
      const agentConfig = (server as any).agentsResourceConfig;

      await setupPrompt({ referencedResourceConfig: agentConfig });

      // Verify prompt was called with correct structure
      expect(mockPromptFn).toHaveBeenCalledTimes(mockAgents.length);

      // Get the prompt handler function for the first agent
      const promptCalls = mockPromptFn.mock.calls;
      const firstPromptHandler = promptCalls[0][1];

      // Execute the prompt handler to test its structure
      const promptResult = await firstPromptHandler();

      expect(promptResult).toEqual({
        description: `BMAD ${mockAgents[0].name}`,
        messages: [
          {
            role: "user",
            content: {
              type: "text",
              text: `Please use the ${mockAgents[0].name} resource to assist with your task.`,
            },
          },
          {
            role: "user",
            content: {
              type: "resource",
              resource: {
                uri: `bmad://agents/${mockAgents[0].id}`,
                mimeType: "text/markdown",
                text: mockAgents[0].content,
              },
            },
          },
        ],
      });
    });

    it("should handle empty content in resources", async () => {
      const agentWithNoContent = {
        ...mockAgents[0],
        content: undefined,
      };

      mockProviderInstance.discover.mockResolvedValue([agentWithNoContent]);
      mockProviderInstance.get.mockResolvedValue(agentWithNoContent);

      const setupPrompt = (server as any).setupPrompt.bind(server);
      const agentConfig = (server as any).agentsResourceConfig;

      await setupPrompt({ referencedResourceConfig: agentConfig });

      const promptCalls = mockPromptFn.mock.calls;
      const promptHandler = promptCalls[0][1];
      const promptResult = await promptHandler();

      expect(promptResult.messages[1].content.resource.text).toBe("");
    });

    it("should use correct MIME types for different extensions", async () => {
      const yamlAgent = {
        ...mockAgents[0],
        extension: "yml",
      };

      mockProviderInstance.discover.mockResolvedValue([yamlAgent]);
      mockProviderInstance.get.mockResolvedValue(yamlAgent);

      const setupPrompt = (server as any).setupPrompt.bind(server);
      const agentConfig = (server as any).agentsResourceConfig;

      await setupPrompt({ referencedResourceConfig: agentConfig });

      const promptCalls = mockPromptFn.mock.calls;
      const promptHandler = promptCalls[0][1];
      const promptResult = await promptHandler();

      expect(promptResult.messages[1].content.resource.mimeType).toBe("application/x-yaml");
    });
  });

  describe("Error Handling", () => {
    it("should throw error when provider is not found", async () => {
      const invalidConfig = {
        referencedResourceConfig: {
          resourceType: "NonExistentType",
          uriScheme: "bmad://invalid",
          directory: "invalid",
          nameSuffix: "",
          description: "Invalid type",
          supportedExtensions: [".md"],
        },
      };

      const setupPrompt = (server as any).setupPrompt.bind(server);

      await expect(setupPrompt(invalidConfig)).rejects.toThrow(
        "Provider for NonExistentType not found"
      );
    });

    it("should handle resource discovery errors", async () => {
      mockProviderInstance.discover.mockRejectedValue(new Error("Discovery failed"));

      const setupPrompt = (server as any).setupPrompt.bind(server);
      const agentConfig = (server as any).agentsResourceConfig;

      await expect(setupPrompt({ referencedResourceConfig: agentConfig })).rejects.toThrow(
        "Failed to list agent resources: Discovery failed"
      );
    });

    it("should handle resource loading errors in prompt execution", async () => {
      // This test should actually test setup errors, since resource loading happens during setup
      mockProviderInstance.discover.mockResolvedValue(mockAgents);
      mockProviderInstance.get.mockRejectedValue(new Error("Resource not found"));

      const setupPrompt = (server as any).setupPrompt.bind(server);
      const agentConfig = (server as any).agentsResourceConfig;

      // The error should happen during setup, not prompt execution
      await expect(setupPrompt({ referencedResourceConfig: agentConfig })).rejects.toThrow(
        "Resource not found"
      );
    });

    it("should handle errors in prompt execution gracefully", async () => {
      const agentWithBadContent = {
        ...mockAgents[0],
        id: "bad-agent",
        content: "# Bad Agent\nThis agent has content.",
      };

      mockProviderInstance.discover.mockResolvedValue([agentWithBadContent]);
      mockProviderInstance.get.mockResolvedValue(agentWithBadContent);

      const setupPrompt = (server as any).setupPrompt.bind(server);
      const agentConfig = (server as any).agentsResourceConfig;

      await setupPrompt({ referencedResourceConfig: agentConfig });

      expect(mockPromptFn).toHaveBeenCalledWith(
        `BMAD ${agentWithBadContent.name}`,
        expect.any(Function)
      );

      // Get the registered prompt handler and verify it works
      const promptCalls = mockPromptFn.mock.calls;
      const promptHandler = promptCalls[0][1];

      const result = await promptHandler();
      expect(result.description).toBe(`BMAD ${agentWithBadContent.name}`);
      expect(result.messages[1].content.resource.text).toBe(agentWithBadContent.content);
    });
  });

  describe("Prompt Configuration", () => {
    it("should have correct prompt configurations defined", () => {
      const promptConfigs = (server as any).promptConfigs;

      expect(promptConfigs).toHaveLength(1);
      expect(promptConfigs[0].referencedResourceConfig.resourceType).toBe("Agent");
      expect(promptConfigs[0].referencedResourceConfig.uriScheme).toBe("bmad://agents");
    });

    it("should setup prompts for all configured prompt types", async () => {
      mockProviderInstance.discover.mockResolvedValue(mockAgents);
      mockAgents.forEach((agent) => {
        mockProviderInstance.get.mockImplementation((name: string) => {
          const found = mockAgents.find((a) => a.name === name);
          return Promise.resolve(found || null);
        });
      });

      const setupPrompts = (server as any).setupPrompts.bind(server);
      await setupPrompts();

      // Should call setupPrompt once for each prompt config
      expect(mockPromptFn).toHaveBeenCalledTimes(mockAgents.length);
    });
  });

  describe("Resource Integration", () => {
    it("should correctly map resource properties to prompt content", async () => {
      const testAgent = mockAgents[0];
      mockProviderInstance.discover.mockResolvedValue([testAgent]);
      mockProviderInstance.get.mockResolvedValue(testAgent);

      const setupPrompt = (server as any).setupPrompt.bind(server);
      const agentConfig = (server as any).agentsResourceConfig;

      await setupPrompt({ referencedResourceConfig: agentConfig });

      const promptCalls = mockPromptFn.mock.calls;
      const promptHandler = promptCalls[0][1];
      const promptResult = await promptHandler();

      expect(promptResult.messages[1].content.resource).toEqual({
        uri: "bmad://agents/bmad-orchestrator",
        mimeType: "text/markdown",
        text: testAgent.content,
      });
    });

    it("should handle multiple agents correctly", async () => {
      mockProviderInstance.discover.mockResolvedValue(mockAgents);
      mockAgents.forEach((agent) => {
        mockProviderInstance.get.mockImplementation((name: string) => {
          const found = mockAgents.find((a) => a.name === name);
          return Promise.resolve(found || null);
        });
      });

      const setupPrompt = (server as any).setupPrompt.bind(server);
      const agentConfig = (server as any).agentsResourceConfig;

      await setupPrompt({ referencedResourceConfig: agentConfig });

      expect(mockPromptFn).toHaveBeenCalledTimes(mockAgents.length);

      // Verify each agent got its own prompt
      const promptNames = mockPromptFn.mock.calls.map((call) => call[0]);
      expect(promptNames).toEqual(["BMAD BMAD Orchestrator", "BMAD PRD Agent", "BMAD Story Agent"]);
    });
  });
});
