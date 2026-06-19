# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

## 0.2.0 - 2026-06-19

### Added

- reusable dependency-free chart components: `ChartFrame`, `BarChart`, `LineChart`, `Sparkline`, `DonutChart`, `ChartLegend`, and `MetricTrend`
- base collapse primitive and composed `CollapseGroup`
- feedback `Alert` component with info, success, warning, destructive, and muted tones
- `Statistic`, `StatisticCard`, and `StatisticGrid` display components
- base UI primitives: `Skeleton`, `SkeletonText`, `SkeletonCard`, `Divider`, `SegmentedControl`, `Spinner`, `LoadingOverlay`, and `Tooltip`
- Ant-like data display components: `List`, `ListRow`, `Descriptions`, `KanbanBoard`, `TagList`, `TreeView`, `CodeBlock`, `FileCard`, `PropertyGrid`, `DataCard`, and `UserCard`
- utility display component `KeyboardShortcut`
- feedback state components `PageState` and `InlineState`
- action utilities `CopyField` and `ButtonGroup`
- navigation utility `AnchorNav`
- interactive `Rating`, `Slider`, `RangeSlider`, `OtpInput`, and `ColorInput` input components
- reusable dashboard layout helpers: `Section`, `Toolbar`, `SplitLayout`, and `StickyFooterBar`
- registry status metadata and CLI status output for stable/preview/experimental/internal components
- README component status, upload example, DataTable pagination note, and troubleshooting sections

### Fixed

- hardened library externals so React, React DOM, JSX runtime and React Hook Form stay external in package builds
- added build-output smoke checks to catch forbidden ESM `require("react")` usage before release
- aligned CLI version with the package version
- aligned `registry.json` version with `package.json`
- added `.light` theme class output next to `:root` and `.dark`
- removed `DataTable` search prop type workarounds by typing search through `SearchInputProps`
- removed the `onValueChange as any` workaround from `DataTable`
- hardened Calendar keyboard navigation, disabled date reasons, roving tab index, and invalid range handling
- hardened FileUpload disabled/loading drag-drop behavior and localized rejection messages

### Changed

- build now starts from a clean `dist` directory and runs output validation
- release gate now includes lint, type/a11y/registry/build-output tests, build, and `npm pack --dry-run`
- `init` supports Vite and Next.js path defaults through `--template vite|next`
- registry validation now fails on package/registry version mismatch and duplicate registry dependencies
- package tarball includes `COMPONENT_MATURITY.md` for public API handoff
- build-output smoke checks now reject indirect ESM browser require fallbacks such as Rolldown CommonJS helpers and `createRequire`
- package root exports now include charts, collapse, skeleton, divider, segmented control, spinner, tooltip, rating, sliders, OTP input, color input, list, descriptions, kanban, tree view, code block, file card, property grid, data card, user card and statistic components
- component maturity docs now define public API decisions, color policy, and font dependency rationale

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
