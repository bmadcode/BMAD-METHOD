import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { promises as fs } from "fs";
import { join } from "path";
import { ResourceProvider } from "../../src/providers/resourceProvider.js";
import type { BaseResource, ResourceConfig } from "../../src/types/index.js";

// Mock fs module
vi.mock("fs", () => ({
  promises: {
    readdir: vi.fn(),
    readFile: vi.fn(),
  },
}));

const mockFs = vi.mocked(fs);

interface TestResource extends BaseResource {
  testProperty?: string;
}

class TestResourceProvider extends ResourceProvider<TestResource> {
  constructor(config: ResourceConfig, baseDir?: string) {
    super(config, baseDir);
  }

  protected enhanceResource(baseResource: BaseResource): TestResource {
    return {
      ...baseResource,
      testProperty: "enhanced",
    };
  }
}

describe("ResourceProvider", () => {
  let provider: TestResourceProvider;
  const mockBaseDir = "/test/project";
  const resourcesDir = join(mockBaseDir, "bmad-core/test-resources");

  const testConfig: ResourceConfig = {
    resourceType: "TestResource",
    uriScheme: "test://resources",
    directory: "test-resources",
    nameSuffix: "-test",
    description: "Test resources",
    supportedExtensions: [".md", ".txt"],
  };

  beforeEach(() => {
    provider = new TestResourceProvider(testConfig, mockBaseDir);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("discoverResources", () => {
    it("should return empty array when resources directory does not exist", async () => {
      mockFs.readdir.mockRejectedValue({ code: "ENOENT" });

      const resources = await provider.discoverResources();

      expect(resources).toEqual([]);
      expect(mockFs.readdir).toHaveBeenCalledWith(resourcesDir, { withFileTypes: true });
    });

    it("should discover resource files with supported extensions", async () => {
      const mockDirents = [
        { name: "resource1.md", isDirectory: () => false, isFile: () => true },
        { name: "resource2.txt", isDirectory: () => false, isFile: () => true },
        { name: "ignored.json", isDirectory: () => false, isFile: () => true }, // Should be ignored
        { name: "resource3.md", isDirectory: () => false, isFile: () => true },
      ];

      mockFs.readdir.mockResolvedValue(mockDirents as any);

      const resources = await provider.discoverResources();

      expect(resources).toHaveLength(3);
      expect(resources[0]).toEqual({
        id: "resource1",
        name: "resource1",
        path: join(resourcesDir, "resource1.md"),
        extension: "md",
        testProperty: "enhanced",
      });
      expect(resources[1]).toEqual({
        id: "resource2",
        name: "resource2",
        path: join(resourcesDir, "resource2.txt"),
        extension: "txt",
        testProperty: "enhanced",
      });
    });
  });

  describe("getResource", () => {
    beforeEach(() => {
      const mockDirents = [
        { name: "test-resource.md", isDirectory: () => false, isFile: () => true },
      ];
      mockFs.readdir.mockResolvedValue(mockDirents as any);
    });

    it("should load resource content", async () => {
      const mockContent = "# Test Resource\n\nThis is test content.";
      mockFs.readFile.mockResolvedValue(mockContent);

      const resource = await provider.getResource("test-resource");

      expect(resource.name).toBe("test-resource");
      expect(resource.content).toBe(mockContent);
      expect(resource.testProperty).toBe("enhanced");
    });

    it("should cache loaded resources", async () => {
      mockFs.readFile.mockResolvedValue("Content");

      // First call
      await provider.getResource("test-resource");
      // Second call
      await provider.getResource("test-resource");

      expect(mockFs.readFile).toHaveBeenCalledTimes(1);
    });
  });

  describe("getAllResources", () => {
    beforeEach(() => {
      const mockDirents = [
        { name: "resource1.md", isDirectory: () => false, isFile: () => true },
        { name: "resource2.md", isDirectory: () => false, isFile: () => true },
      ];
      mockFs.readdir.mockResolvedValue(mockDirents as any);
    });

    it("should return all resources with content loaded", async () => {
      mockFs.readFile.mockResolvedValueOnce("Content 1").mockResolvedValueOnce("Content 2");

      const resources = await provider.getAllResources();

      expect(resources).toHaveLength(2);
      expect(resources[0].content).toBe("Content 1");
      expect(resources[1].content).toBe("Content 2");
    });

    it("should include resources without content when file read fails", async () => {
      mockFs.readFile
        .mockResolvedValueOnce("Content 1")
        .mockRejectedValueOnce(new Error("File read error"));

      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const resources = await provider.getAllResources();

      expect(resources).toHaveLength(2);
      expect(resources[0].content).toBe("Content 1");
      expect(resources[1].content).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Failed to load resource resource2:",
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe("supported extensions", () => {
    it("should only discover files with configured extensions", async () => {
      const mockDirents = [
        { name: "file.md", isDirectory: () => false, isFile: () => true },
        { name: "file.txt", isDirectory: () => false, isFile: () => true },
        { name: "file.json", isDirectory: () => false, isFile: () => true }, // Not in configured extensions
        { name: "file.doc", isDirectory: () => false, isFile: () => true }, // Not supported
      ];

      mockFs.readdir.mockResolvedValue(mockDirents as any);

      const resources = await provider.discoverResources();

      expect(resources).toHaveLength(2);
      expect(resources.map((r) => r.extension)).toEqual(["md", "txt"]);
    });
  });
});
