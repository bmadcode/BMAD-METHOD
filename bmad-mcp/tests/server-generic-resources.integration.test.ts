import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { promises as fs } from "fs";
import { join } from "path";
import { BmadMcpServer } from "../src/server.js";
import { ResourceProvider } from "../src/providers/resourceProvider.js";
import type { BaseResource } from "../src/types/index.js";

describe("BmadMcpServer - Generic Resources Integration", () => {
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

    await fs.writeFile(
      join(checklistsDir, "story-dod-checklist.md"),
      `# Story Definition of Done

Checklist to ensure stories meet quality standards before marking as complete.

- [ ] All acceptance criteria met
- [ ] Code reviewed
- [ ] Tests written and passing`
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

    // Create category subdirectory for checklists
    const devDir = join(checklistsDir, "dev");
    await fs.mkdir(devDir, { recursive: true });
    await fs.writeFile(
      join(devDir, "code-review.md"),
      `# Code Review Checklist

Developer checklist for thorough code reviews.

- [ ] Code follows standards
- [ ] Security considerations reviewed
- [ ] Performance implications considered`
    );

    // Initialize server with temp directory
    server = new BmadMcpServer();
    const { ResourceProvider } = await import("../src/providers/resourceProvider.js");

    // Create configurations for testing
    const checklistConfig = {
      resourceType: "Checklist",
      uriScheme: "bmad://checklists",
      directory: "checklists",
      nameSuffix: "-checklist",
      description: "Individual BMAD checklist content",
      supportedExtensions: [".md"],
    };

    const templateConfig = {
      resourceType: "Template",
      uriScheme: "bmad://templates",
      directory: "templates",
      nameSuffix: "-tmpl",
      description: "Individual BMAD template content",
      supportedExtensions: [".md"],
    };

    // Override the resource providers to use our test directory
    (server as any).resourceProviders.set(
      "Checklist",
      new ResourceProvider(checklistConfig, tempDir)
    );
    (server as any).resourceProviders.set(
      "Template",
      new ResourceProvider(templateConfig, tempDir)
    );
  });

  afterEach(async () => {
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true });
  });

  describe("Checklist Resources", () => {
    it("should discover and list all checklist resources", async () => {
      const checklistConfig = (server as any).resourceConfigs.find(
        (config: any) => config.resourceType === "Checklist"
      );
      const provider = (server as any).resourceProviders.get("Checklist");

      const result = await (server as any).listIndividualResources(checklistConfig, provider);

      expect(result.resources).toHaveLength(3);

      const checklistUris = result.resources.map((r: any) => r.uri);
      expect(checklistUris).toContain("bmad://checklists/pm-checklist");
      expect(checklistUris).toContain("bmad://checklists/story-dod-checklist");
      expect(checklistUris).toContain("bmad://checklists/dev_code-review");

      // Verify metadata
      const pmChecklist = result.resources.find(
        (r: any) => r.uri === "bmad://checklists/pm-checklist"
      );
      expect(pmChecklist).toMatchObject({
        name: "pm-checklist",
        title: "Checklist pm",
        description: "BMAD checklist: pm-checklist",
        mimeType: "text/markdown",
      });
    });

    it("should retrieve individual checklist content", async () => {
      const uri = new URL("bmad://checklists/pm-checklist");
      const variables = { checklistId: "pm-checklist" };
      const checklistConfig = (server as any).resourceConfigs.find(
        (config: any) => config.resourceType === "Checklist"
      );
      const provider = (server as any).resourceProviders.get("Checklist");

      const result = await (server as any).readIndividualResource(
        uri,
        variables,
        checklistConfig,
        provider
      );

      expect(result.contents).toHaveLength(1);
      expect(result.contents[0]).toMatchObject({
        uri: "bmad://checklists/pm-checklist",
        mimeType: "text/markdown",
      });

      const content = result.contents[0].text;
      expect(content).toContain("# PM Checklist");
      expect(content).toContain("Product Manager requirements checklist");
      expect(content).toContain("- [ ] Define user stories");
    });
  });

  describe("Template Resources", () => {
    it("should discover and list all template resources", async () => {
      const templateConfig = (server as any).resourceConfigs.find(
        (config: any) => config.resourceType === "Template"
      );
      const provider = (server as any).resourceProviders.get("Template");

      const result = await (server as any).listIndividualResources(templateConfig, provider);

      expect(result.resources).toHaveLength(1);

      const templateUris = result.resources.map((r: any) => r.uri);
      expect(templateUris).toContain("bmad://templates/prd-tmpl");

      // Verify metadata
      const prdTemplate = result.resources.find((r: any) => r.uri === "bmad://templates/prd-tmpl");
      expect(prdTemplate).toMatchObject({
        name: "prd-tmpl",
        title: "Template prd",
        description: "BMAD template: prd-tmpl",
        mimeType: "text/markdown",
      });
    });

    it("should retrieve individual template content", async () => {
      const uri = new URL("bmad://templates/prd-tmpl");
      const variables = { templateId: "prd-tmpl" };
      const templateConfig = (server as any).resourceConfigs.find(
        (config: any) => config.resourceType === "Template"
      );
      const provider = (server as any).resourceProviders.get("Template");

      const result = await (server as any).readIndividualResource(
        uri,
        variables,
        templateConfig,
        provider
      );

      expect(result.contents).toHaveLength(1);
      expect(result.contents[0]).toMatchObject({
        uri: "bmad://templates/prd-tmpl",
        mimeType: "text/markdown",
      });

      const content = result.contents[0].text;
      expect(content).toContain("# Product Requirements Document Template");
      expect(content).toContain("## Overview");
      expect(content).toContain("## Requirements");
    });
  });
});
