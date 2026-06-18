# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Fixed

- hardened library externals so React, React DOM, JSX runtime and React Hook Form stay external in package builds
- added build-output smoke checks to catch forbidden ESM `require("react")` usage before release
- aligned CLI version with the package version
- aligned `registry.json` version with `package.json`
- added `.light` theme class output next to `:root` and `.dark`

### Changed

- build now starts from a clean `dist` directory and runs output validation
- release gate now includes lint, type/a11y/registry/build-output tests, build, and `npm pack --dry-run`
- `init` supports Vite and Next.js path defaults through `--template vite|next`
- registry validation now fails on package/registry version mismatch and duplicate registry dependencies
- package tarball includes `COMPONENT_MATURITY.md` for public API handoff

### Docs

- documented component maturity rubric, public export statuses, helper policy, and audit checklist
- expanded release handoff with npm 2FA/token, manual consumer smoke, GitHub release notes and docs-app handoff

## 0.1.1 - 2026-06-18

Library-only cleanup release.

### Changed

- version bumped from `0.1.0` to `0.1.1`
- package exports narrowed to reusable runtime pieces only
- release documentation updated for the `0.1.1` patch

### Fixed

- removed docs-only `ComponentPreview` from package exports
- removed unused `prism-react-renderer` runtime dependency
- silenced expected React Compiler lint noise around TanStack Table integration

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
