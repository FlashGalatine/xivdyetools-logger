import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test execution settings
    globals: true,
    environment: 'node',

    // Coverage configuration
    coverage: {
      // Use v8 coverage provider
      provider: 'v8',

      // Enable multiple reporters for different use cases
      reporter: ['text', 'html', 'json', 'json-summary'],

      // Output directory for coverage reports
      reportsDirectory: './coverage',

      // Files to include in coverage analysis
      include: ['src/**/*.ts'],

      // Files to exclude from coverage
      exclude: [
        'src/**/*.test.ts', // Test files
        'src/**/__tests__/**', // Test directories
        'src/index.ts', // Barrel export file
        'src/types.ts', // Type definitions only (no runtime code)
        'src/adapters/index.ts', // Barrel export file
        'src/core/index.ts', // Barrel export file
        'src/presets/index.ts', // Barrel export file
        '**/*.d.ts', // TypeScript declaration files
        '**/node_modules/**', // Dependencies
        '**/dist/**', // Build output
        '**/.{git,cache,output,temp}/**', // Version control and temp dirs
      ],

      // Coverage thresholds - BUILD FAILS if below these values
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },

      // Include all files, even if not imported in tests
      all: true,
      clean: true,
      skipFull: false,
    },

    // Test file patterns
    include: ['src/**/*.test.ts'],

    // Reporter configuration
    reporters: ['verbose'],
  },
});
