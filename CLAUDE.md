# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@xivdyetools/logger` is a unified logging library for the xivdyetools ecosystem, supporting browser, Node.js, and Cloudflare Workers environments. It provides structured JSON logging, request correlation, secret redaction, and performance timing.

## Development Commands

```bash
npm run build          # Build with TypeScript (uses tsconfig.build.json)
npm run type-check     # Type check without emitting
npm run test           # Run tests with Vitest
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
npm run clean          # Remove dist/ and coverage/
```

## Architecture

The library follows a layered architecture:

### Types (`src/types.ts`)
Core interfaces: `Logger`, `ExtendedLogger`, `LogContext`, `LogEntry`, `LoggerConfig`, `ErrorTracker`. The `Logger` interface maintains backward compatibility with `xivdyetools-core`.

### Core (`src/core/`)
- `BaseLogger` - Abstract class implementing `ExtendedLogger`. Custom adapters extend this and implement the `write(entry: LogEntry)` method.
- Log level filtering, context merging, error formatting, and secret redaction are handled here.

### Adapters (`src/adapters/`)
Output implementations extending `BaseLogger`:
- `ConsoleAdapter` - Pretty console output for development
- `JsonAdapter` - Structured JSON output for production/Workers
- `NoopAdapter` - Silent logger for libraries/testing

### Presets (`src/presets/`)
Pre-configured factories for specific environments:
- **Browser** (`/browser`) - Development filtering, error tracker integration, `perf` timing utility
- **Worker** (`/worker`) - JSON output, request ID correlation, `createRequestLogger` for Hono middleware
- **Library** (`/library`) - `NoOpLogger` (silent default), `ConsoleLogger`, `createLibraryLogger`

## Entry Points

The package exports multiple entry points via `package.json` exports:
- `@xivdyetools/logger` - Main entry with all exports
- `@xivdyetools/logger/browser` - Browser preset
- `@xivdyetools/logger/worker` - Cloudflare Workers preset
- `@xivdyetools/logger/library` - Library preset (for npm packages)

## Testing

Tests use Vitest and are co-located with source files (`*.test.ts`). Run a single test file:
```bash
npx vitest run src/core/base-logger.test.ts
```

## Key Patterns

- **Secret Redaction**: Fields in `DEFAULT_REDACT_FIELDS` (password, token, secret, etc.) are automatically redacted from log context
- **Child Loggers**: `logger.child({ requestId })` creates a new logger inheriting parent context
- **Error Sanitization**: When `sanitizeErrors: true`, stack traces are removed and sensitive patterns in error messages are redacted
