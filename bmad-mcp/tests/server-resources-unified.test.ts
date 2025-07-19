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
  ResourceProvider: vi.fn(),
}));

const mockResourceProvider = vi.mocked(ResourceProvider);

describe("BmadMcpServer - Unified Resources", () => {
  let server: BmadMcpServer;
  let consoleErrorSpy: any;

  const mockResources: BaseResource[] = [
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
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    // Mock the constructor to return a basic mock
    mockResourceProvider.mockImplementation(
      () =>
        ({
          discover: vi.fn().mockResolvedValue(mockResources),
          get: vi.fn().mockResolvedValue(mockResources[0]),
        } as any)
    );

    server = new BmadMcpServer();
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe("Server Construction", () => {
    it("should initialize server with unified resource providers", () => {
      expect(server).toBeDefined();
      expect(server).toBeInstanceOf(BmadMcpServer);
      // Verify ResourceProvider was called for each resource type (Agent, Checklist, Data, Task, Template, Util, Workflow)
      expect(mockResourceProvider).toHaveBeenCalledTimes(7);
    });
  });

  describe("MIME Type Detection", () => {
    it("should return correct MIME types for different extensions", () => {
      const mimeTypeMethod = (server as any).getMimeTypeForExtension.bind(server);

      expect(mimeTypeMethod("md")).toBe("text/markdown");
      expect(mimeTypeMethod("txt")).toBe("text/plain");
      expect(mimeTypeMethod("json")).toBe("application/json");
      expect(mimeTypeMethod("unknown")).toBe("text/plain");
    });
  });
});
