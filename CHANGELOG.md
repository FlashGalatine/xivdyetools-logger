# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-12-24

### Fixed

#### Medium Priority Audit Fixes

- **LOG-ERR-001**: Fixed incomplete secret redaction patterns in `sanitizeErrorMessage`
  - Original patterns stopped at whitespace, potentially leaking partial secrets
  - Now properly handles both quoted (`token="value"`) and unquoted (`token=value`) formats
  - Added missing patterns for `authorization`, `access_token`, and `refresh_token` fields

---

## [1.0.0] - 2025-12-14

### Added

- Initial release of unified logging for xivdyetools ecosystem
- Support for browser, Node.js, and Cloudflare Workers environments
- Preset configurations: `browser`, `worker`, `library`
- Log levels: debug, info, warn, error
- Structured logging with context support
- Sensitive data sanitization
- `NoOpLogger` for silent operation
- `ConsoleLogger` for development
- Full TypeScript support
