import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "fs";
import { join } from "path";
import { BmadMcpServer } from "../src/server.js";
import { ResourceProvider } from "../src/providers/resourceProvider.js";

describe("BmadMcpServer - Unified Resources Integration", () => {
  let server: BmadMcpServer;
  let tempDir: string;
  let checklistsDir: string;
  let templatesDir: string;

  beforeEach(async () => {
    // Create temporary directory structure
    tempDir = await fs.mkdtemp("/tmp/bmad-test-");
    checklistsDir = join(tempDir, "bmad-core", "checklists");
    templatesDir = join(tempDir, "bmad-core", "templates");
    await fs.mkdir(checklistsDir, { recursive: true });
    await fs.mkdir(templatesDir, { recursive: true });

    // Create test checklist files
    await fs.writeFile(
      join(checklistsDir, "pm-checklist.md"),
      `# PM Checklist

Product Manager requirements checklist for ensuring comprehensive project definition.

- [ ] Define user stories
- [ ] Create acceptance criteria
- [ ] Validate business requirements`
    );

    // Create test template files
    await fs.writeFile(
      join(templatesDir, "prd-tmpl.md"),
      `# Product Requirements Document Template

## Overview
[Brief description of the product]

## Requirements
[Detailed requirements here]`
    );

    // Initialize server
    server = new BmadMcpServer();
  });

  afterEach(async () => {
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe("Resource Provider Integration", () => {
    it("should create ResourceProvider instances for each resource type", () => {
      expect(server).toBeDefined();
      expect(server).toBeInstanceOf(BmadMcpServer);

      // Verify server was constructed successfully
      const resourceProviders = (server as any).resourceProviders;
      expect(resourceProviders).toBeDefined();
      expect(resourceProviders.has("Template")).toBe(true);
      expect(resourceProviders.has("Checklist")).toBe(true);
      expect(resourceProviders.has("Agent")).toBe(true);
      expect(resourceProviders.has("Data")).toBe(true);
      expect(resourceProviders.has("Task")).toBe(true);
      expect(resourceProviders.has("Util")).toBe(true);
      expect(resourceProviders.has("Workflow")).toBe(true);
    });

    it("should have resource configurations with proper settings", () => {
      const resourceConfigs = (server as any).resourceConfigs;

      expect(resourceConfigs).toHaveLength(7); // Agent, Checklist, Data, Task, Template, Util, Workflow

      const templateConfig = resourceConfigs.find((c: any) => c.resourceType === "Template");
      expect(templateConfig).toBeDefined();
      expect(templateConfig.supportedExtensions).toEqual([".md"]);
      expect(templateConfig.directory).toBe("templates");

      const checklistConfig = resourceConfigs.find((c: any) => c.resourceType === "Checklist");
      expect(checklistConfig).toBeDefined();
      expect(checklistConfig.supportedExtensions).toEqual([".md"]);
      expect(checklistConfig.directory).toBe("checklists");

      // Verify some of the other resource types are present
      const agentConfig = resourceConfigs.find((c: any) => c.resourceType === "Agent");
      expect(agentConfig).toBeDefined();
      expect(agentConfig.supportedExtensions).toEqual([".md"]);
      expect(agentConfig.directory).toBe("agents");

      const workflowConfig = resourceConfigs.find((c: any) => c.resourceType === "Workflow");
      expect(workflowConfig).toBeDefined();
      expect(workflowConfig.supportedExtensions).toEqual([".yml"]);
      expect(workflowConfig.directory).toBe("workflows");
    });
  });

  describe("MIME Type Handling", () => {
    it("should correctly determine MIME types", () => {
      const getMimeType = (server as any).getMimeTypeForExtension.bind(server);

      expect(getMimeType("md")).toBe("text/markdown");
      expect(getMimeType("txt")).toBe("text/plain");
      expect(getMimeType("json")).toBe("application/json");
      expect(getMimeType("unknown")).toBe("text/plain");
    });
  });
});
