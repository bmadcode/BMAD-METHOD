import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { cpSync } from 'fs';

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      rollupTypes: true
    }),
    {
      name: 'copy-bmad-core',
      writeBundle() {
        cpSync('../bmad-core', 'dist/bmad-core', { recursive: true });
      }
    }
  ],
  build: {
    target: 'node18',
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'BmadMcp',
      fileName: 'index',
      formats: ['es']
    },
    minify: false,
    sourcemap: true,
    rollupOptions: {
      external: [
        '@modelcontextprotocol/sdk',
        'node:fs',
        'node:path',
        'node:url',
        'fs',
        'path',
        'url'
      ],
      output: {
        preserveModules: false,
        globals: {
          '@modelcontextprotocol/sdk': 'McpSdk'
        }
      }
    },
    emptyOutDir: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  define: {
    global: 'globalThis'
  }
});
