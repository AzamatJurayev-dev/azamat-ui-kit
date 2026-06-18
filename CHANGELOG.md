# Changelog

All notable changes to this project will be documented in this file.

## 0.1.0 - 2026-06-18

First public npm-ready release.

### Added

- npm publish metadata: `description`, `keywords`, `homepage`, `repository`, `bugs`, `author`, `license`
- `LICENSE` file with MIT license
- dedicated declaration build via `tsconfig.build.json`
- router-agnostic link rendering through `renderLink` on:
  - `Breadcrumbs`
  - `SidebarNav`
  - `AppSidebar`
  - `QuickActionGrid`
- Next.js `renderLink` usage example in `README.md`

### Changed

- version bumped from `0.0.1` to `0.1.0`
- publish pipeline switched to `prepack`
- package tarball reduced and cleaned for npm distribution
- library build no longer copies site/public assets into `dist`
- exported navigation components no longer require `react-router-dom` at runtime

### Fixed

- `dist/index.d.ts` now generates correctly instead of shipping as an empty file
- smoke type issues in `tests/smoke/component-imports.test.tsx`
- a11y smoke compatibility in `src/components/upload/file-upload.tsx`

### Removed

- unused `@radix-ui/*` dependencies
- unused `vite-plugin-dts`
- non-library files from published package contents (`src`, docs-site assets, empty templates, extra public artifacts)
