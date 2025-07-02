import { vi, beforeEach, afterEach } from 'vitest';

// Global test setup and configuration
beforeEach(() => {
  // Clear all mocks before each test
  vi.clearAllMocks();
});

afterEach(() => {
  // Clean up after each test
  vi.restoreAllMocks();
});

// Configure test timeout globally
export const TEST_TIMEOUT = 10000;

// Mock utilities for MCP transport
export const createMockTransport = () => ({
  start: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
  send: vi.fn().mockResolvedValue(undefined),
  onMessage: vi.fn(),
  onClose: vi.fn(),
  onError: vi.fn()
});

// Mock utilities for MCP server
export const createMockMcpServer = (config?: any) => ({
  connect: vi.fn().mockResolvedValue(undefined),
  close: vi.fn().mockResolvedValue(undefined),
  setRequestHandler: vi.fn(),
  setNotificationHandler: vi.fn(),
  config: config || {
    name: 'test-server',
    version: '0.1.0'
  }
});

// Suppress console outputs during tests unless needed
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  debug: vi.fn()
};

// Restore console for specific tests that need it
export const restoreConsole = () => {
  global.console = originalConsole;
};

export const mockConsole = () => {
  global.console = {
    ...originalConsole,
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    debug: vi.fn()
  };
};
