import { promises as fs } from "fs";
import { join, resolve, relative, extname, basename, dirname } from "path";
import { fileURLToPath } from "url";
import type {
  BaseResource,
  ResourceProvider as IResourceProvider,
  ResourceConfig,
} from "../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class ResourceProvider<T extends BaseResource> implements IResourceProvider<T> {
  protected cache = new Map<string, T>();
  protected metadataCache: T[] | null = null;
  protected readonly resourceDir: string;
  protected readonly directoryName: string;
  protected supportedExtensions: string[];
  protected config: ResourceConfig;

  constructor(config: ResourceConfig, baseDir?: string) {
    this.config = config;
    this.directoryName = config.directory;
    this.supportedExtensions = config.supportedExtensions;

    if (baseDir) {
      this.resourceDir = resolve(baseDir, `bmad-core/${this.directoryName}`);
    } else {
      this.resourceDir = resolve(__dirname, `bmad-core/${this.directoryName}`);
    }
  }

  /**
   * Discover all resources by scanning the directory recursively
   */
  async discover(): Promise<T[]> {
    if (this.metadataCache) {
      return this.metadataCache;
    }

    try {
      const resources = await this.scanResourceDirectory(this.resourceDir);
      this.metadataCache = resources;
      return resources;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        console.warn(`${this.directoryName} directory not found: ${this.resourceDir}`);
        return [];
      }
      throw new Error(`Failed to discover ${this.directoryName}: ${(error as Error).message}`);
    }
  }

  /**
   * Get a specific resource by ID, loading content if not cached
   */
  async get(id: string): Promise<T> {
    // Check cache first
    if (this.cache.has(id)) {
      return this.cache.get(id)!;
    }

    // Discover resources if not already cached
    const resources = await this.discover();
    const resource = resources.find((r) => r.id === id);

    if (!resource) {
      throw new Error(
        `${
          this.directoryName.slice(0, -1).charAt(0).toUpperCase() + this.directoryName.slice(1, -1)
        } with ID '${id}' not found`
      );
    }

    // Load content
    const resourceWithContent = await this.loadResourceContent(resource);

    // Cache it
    this.cache.set(id, resourceWithContent);

    return resourceWithContent;
  }

  /**
   * Discover all resources by scanning the directory recursively
   */
  async discoverResources(): Promise<T[]> {
    return await this.discover();
  }

  /**
   * Get a specific resource by ID, loading content if not cached
   */
  async getResource(id: string): Promise<T> {
    return await this.get(id);
  }

  /**
   * Get all resources with their content loaded
   */
  async getAllResources(): Promise<T[]> {
    const resources = await this.discoverResources();
    const resourcesWithContent: T[] = [];

    for (const resource of resources) {
      try {
        const resourceWithContent = await this.getResource(resource.id);
        resourcesWithContent.push(resourceWithContent);
      } catch (error) {
        console.error(`Failed to load resource ${resource.id}:`, error);
        // Include resource without content rather than failing completely
        resourcesWithContent.push(resource);
      }
    }

    return resourcesWithContent;
  }

  /**
   * Scan directory recursively for resources
   */
  private async scanResourceDirectory(dir: string): Promise<T[]> {
    const resources: T[] = [];

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = join(dir, entry.name);

        if (entry.isDirectory()) {
          // Recursively scan subdirectories
          const subResources = await this.scanResourceDirectory(fullPath);
          resources.push(...subResources);
        } else if (entry.isFile()) {
          // Process files
          const resource = await this.createResourceFromFile(fullPath);
          if (resource) {
            resources.push(resource);
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
      throw error;
    }

    return resources;
  }

  /**
   * Create a resource metadata object from a file path
   */
  private async createResourceFromFile(filePath: string): Promise<T | null> {
    try {
      const extension = extname(filePath).slice(1); // Remove the dot
      const name = basename(filePath, `.${extension}`);

      // Check if this file type should be processed
      if (!this.isValidFile(filePath)) {
        return null;
      }

      // Create relative path from the base directory
      const relativePath = relative(this.resourceDir, filePath);
      const id = relativePath.replace(/\\/g, "/").replace(`.${extension}`, "").replace(/\//g, "_");

      const baseResource: BaseResource = {
        id,
        name,
        path: filePath,
        extension,
      };

      return this.enhanceResource(baseResource);
    } catch (error) {
      console.error(`Error creating resource from file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Load content for a resource
   */
  private async loadResourceContent(resource: T): Promise<T> {
    try {
      const content = await fs.readFile(resource.path, "utf-8");
      return {
        ...resource,
        content,
      };
    } catch (error) {
      console.error(`Error loading content for resource ${resource.id}:`, error);
      throw new Error(
        `Failed to load ${this.directoryName.slice(0, -1)} '${resource.id}': ${
          (error as Error).message
        }`
      );
    }
  }

  /**
   * Clear caches
   */
  clearCache(): void {
    this.cache.clear();
    this.metadataCache = null;
  }

  /**
   * Enhance the base resource using configuration
   */
  protected enhanceResource(baseResource: BaseResource): T {
    if (this.config.enhanceResource) {
      return this.config.enhanceResource(baseResource) as T;
    }
    return baseResource as T;
  }

  /**
   * Check if file is a supported format
   */
  protected isValidFile(filePath: string): boolean {
    const ext = extname(filePath).toLowerCase();
    return this.supportedExtensions.includes(ext);
  }
}
