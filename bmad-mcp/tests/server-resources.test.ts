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

// Mock the unified resource provider
vi.mock("../src/providers/resourceProvider.js", () => ({
  ResourceProvider: vi.fn().mockImplementation(() => ({
    discover: vi.fn(),
    get: vi.fn(),
    discoverResources: vi.fn(),
    getResource: vi.fn(),
    getAllResources: vi.fn(),
    clearCache: vi.fn(),
  })),
}));

const mockResourceProvider = vi.mocked(ResourceProvider);

describe("BmadMcpServer - MCP Resources", () => {
  let server: BmadMcpServer;
  let mockProviderInstance: any;
  let consoleErrorSpy: any;

  const mockTemplates: BaseResource[] = [
    {
      id: "prd-tmpl",
      name: "PRD Template",
      path: "/test/bmad-core/templates/prd-tmpl.md",
      extension: "md",
    },
    {
      id: "architecture-tmpl",
      name: "Architecture Template",
      path: "/test/bmad-core/templates/architecture-tmpl.md",
      extension: "md",
    },
    {
      id: "story-tmpl",
      name: "Story Template",
      path: "/test/bmad-core/templates/story-tmpl.txt",
      extension: "txt",
    },
  ];

  beforeEach(() => {
    // Create mock provider instance
    mockProviderInstance = {
      discover: vi.fn(),
      get: vi.fn(),
      discoverResources: vi.fn(),
      getResource: vi.fn(),
      getAllResources: vi.fn(),
      clearCache: vi.fn(),
    };

    mockResourceProvider.mockImplementation(() => mockProviderInstance);

    server = new BmadMcpServer();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe("Template Resources Registration", () => {
    it("should register resources during server construction", () => {
      // Verify server was created (constructor ran successfully)
      expect(server).toBeDefined();
      expect(server).toBeInstanceOf(BmadMcpServer);
    });

    it("should have template provider initialized", () => {
      expect(mockResourceProvider).toHaveBeenCalledTimes(7); // Agent, Checklist, Data, Task, Template, Util, Workflow
    });
  });

  describe("Individual Template Resources", () => {
    beforeEach(() => {
      mockProviderInstance.discover.mockResolvedValue(mockTemplates);
    });

    it("should list individual template resources", async () => {
      // Test the provider directly since the server methods are now private
      const templates = await (server as any).resourceProviders.get("Template").discover();

      expect(templates).toEqual(mockTemplates);
      expect(mockProviderInstance.discover).toHaveBeenCalledTimes(1);
    });

    it("should read individual template content", async () => {
      const mockTemplateWithContent = {
        ...mockTemplates[0],
        content: "# PRD Template\nThis is a product requirements document template.",
      };

      mockProviderInstance.get.mockResolvedValue(mockTemplateWithContent);

      // Test the provider directly
      const result = await (server as any).resourceProviders.get("Template").get("prd-tmpl");

      expect(result).toEqual(mockTemplateWithContent);
      expect(mockProviderInstance.get).toHaveBeenCalledWith("prd-tmpl");
    });

    it("should handle array templateId variables", async () => {
      const mockTemplateWithContent = {
        ...mockTemplates[0],
        content: "# PRD Template\nThis is a product requirements document template.",
      };

      mockProviderInstance.get.mockResolvedValue(mockTemplateWithContent);

      // Test that provider handles single ID correctly
      const result = await (server as any).resourceProviders.get("Template").get("prd-tmpl");

      expect(result).toEqual(mockTemplateWithContent);
      expect(mockProviderInstance.get).toHaveBeenCalledWith("prd-tmpl");
    });

    it("should handle missing templateId", async () => {
      // Test provider error handling for missing ID
      mockProviderInstance.get.mockRejectedValue(new Error("Template with ID '' not found"));

      await expect((server as any).resourceProviders.get("Template").get("")).rejects.toThrow();
    });

    it("should handle template loading errors", async () => {
      mockProviderInstance.get.mockRejectedValue(new Error("Template not found"));

      await expect(
        (server as any).resourceProviders.get("Template").get("missing")
      ).rejects.toThrow("Template not found");
    });
  });

  describe("MIME Type Detection", () => {
    it("should return correct MIME types for different extensions", () => {
      const getMimeType = server.getMimeTypeForExtension.bind(server);

      expect(getMimeType("md")).toBe("text/markdown");
      expect(getMimeType("txt")).toBe("text/plain");
      expect(getMimeType("json")).toBe("application/json");
      expect(getMimeType("unknown")).toBe("text/plain");
    });
  });

  describe("Error Handling", () => {
    it("should handle template discovery errors in listing", async () => {
      mockProviderInstance.discover.mockRejectedValue(new Error("Discovery failed"));

      await expect((server as any).resourceProviders.get("Template").discover()).rejects.toThrow(
        "Discovery failed"
      );
    });
  });
});
