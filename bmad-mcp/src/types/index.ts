// Shared types for the project

export interface ServerInfo {
  name: string;
  version: string;
  description: string;
}

export interface ServerConfiguration {
  name: string;
  version: string;
  description?: string;
}

export interface ServerCapabilities {
  // Empty for minimal implementation
}

// Generic resource types
export interface BaseResource {
  id: string;
  name: string;
  path: string;
  extension: string;
  content?: string;
  description?: string;
}

export interface ResourceProvider<T extends BaseResource> {
  discover(): Promise<T[]>;
  get(id: string): Promise<T>;
}

export interface ResourceConfig {
  resourceType: string;
  uriScheme: string;
  directory: string;
  nameSuffix: string;
  description: string;
  supportedExtensions: string[];
  enhanceResource?: (baseResource: BaseResource) => BaseResource;
}

export interface PromptConfig {
  referencedResourceConfig: ResourceConfig;
  parseDependencies?: boolean;
}

export * from "@modelcontextprotocol/sdk/types.js";
