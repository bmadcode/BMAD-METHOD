import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BmadMcpServer } from '../src/server.js';

// Mock the stdio transport to avoid actual process interaction during tests
vi.mock('@modelcontextprotocol/sdk/server/stdio.js', () => ({
  StdioServerTransport: vi.fn().mockImplementation(() => ({
    start: vi.fn(),
    on: vi.fn(),
    close: vi.fn(),
  }))
}));

// Mock the MCP server
vi.mock('@modelcontextprotocol/sdk/server/mcp.js', () => ({
  McpServer: vi.fn().mockImplementation((config) => ({
    connect: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
    resource: vi.fn().mockReturnValue({ enable: vi.fn(), disable: vi.fn() }),
    config
  })),
  ResourceTemplate: vi.fn().mockImplementation((pattern, callbacks) => ({
    uriTemplate: pattern,
    listCallback: callbacks.list,
    completeCallback: vi.fn()
  }))
}));

// Mock the template provider
vi.mock('../src/providers/templateProvider.js', () => ({
  TemplateProvider: vi.fn().mockImplementation(() => ({
    discoverTemplates: vi.fn().mockResolvedValue([]),
    getTemplate: vi.fn(),
    getAllTemplates: vi.fn(),
    clearCache: vi.fn()
  }))
}));

describe('BmadMcpServer', () => {
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create server instance with correct configuration', () => {
      const server = new BmadMcpServer();
      expect(server).toBeDefined();
      expect(server).toBeInstanceOf(BmadMcpServer);
    });
  });
});
