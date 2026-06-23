# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- added `Button` loading, loading label, left icon, right icon, and `md`/`xl` size API coverage

### Docs

- aligned the component maturity matrix with the current `Button` public API

## 0.2.3 - 2026-06-23

### Added

- new `Stack`, `Inline`, and `Grid` layout helpers for common vertical, horizontal, and grid composition

### Changed

- aligned package, CLI, and registry versions for the next public release

## 0.2.1 - 2026-06-20

### Fixed

- exported the newer family metadata helpers used by the docs app, including docs-group detail, route resolution, and adoption queries
- restored working JS/CJS output for advanced subpath exports such as `actions/*`, `form/*`, `layout/*`, `patterns/*`, `charts/*`, and `data-table/*`
- added automated tarball consumer smoke coverage so Vite-like and Next-like installs validate real npm import paths before publish

### Changed

- narrowed the root package surface to docs-facing canonical exports while keeping advanced helpers on explicit subpaths
- expanded the release gate to include fixture-based consumer smoke checks

## 0.2.0 - 2026-06-19

### Added

- source-copy preset command and preset file map for `minimal` and `dashboard` installs
- registry entries for `SmartCard`, `EntityCard`, `ActionSystem`, `StatusSystem`, `FilterBuilder`, `DataView`, `EntityDetails`, `ResourceSystem`, `CrudSystem`, `SmartFormShell`, and `WorkspaceShell`
- props-driven `SmartCard` with slots, `classNames`, render overrides, loading, selected, disabled, interactive, orientation, variant, size, and density controls
- source-copy architecture notes for editable component installation
- export family config for subpath/runtime import planning
- reusable system components: `ActionSystem`, `StatusSystem`, `FilterBuilder`, `DataView`, `EntityDetails`, `ResourceSystem`, and `CrudSystem`
- reusable layout/form systems: `WorkspaceShell`, `EntityCard`, and `SmartFormShell`
- reusable dependency-free chart components: `ChartFrame`, `BarChart`, `LineChart`, `Sparkline`, `DonutChart`, `ChartLegend`, and `MetricTrend`
- analytics components: `KpiCard`, `KpiGrid`, `ProgressRing`, and `HorizontalBarChart`
- table utility components: `TableExportMenu` and `TableImportButton`
- action utilities: `CopyField`, `ButtonGroup`, `FloatingActionButton`, and `ActionBar`
- form helpers: `FormActions` and `FormSection`
- settings patterns: `SettingsSection` and `SettingsRow`
- base collapse primitive and composed `CollapseGroup`
- feedback `Alert` component with info, success, warning, destructive, and muted tones
- `Statistic`, `StatisticCard`, and `StatisticGrid` display components
- base UI primitives: `Skeleton`, `SkeletonText`, `SkeletonCard`, `Divider`, `SegmentedControl`, `Spinner`, `LoadingOverlay`, and `Tooltip`
- generic data display components: `List`, `ListRow`, `Descriptions`, `KanbanBoard`, `TagList`, `TreeView`, `CodeBlock`, `FileCard`, `PropertyGrid`, and `SmartCard`
- utility display component `KeyboardShortcut`
- feedback state components `PageState` and `InlineState`
- navigation utility `AnchorNav`
- interactive `Rating`, `Slider`, `RangeSlider`, `OtpInput`, and `ColorInput` input components
- reusable dashboard layout helpers: `Section`, `Toolbar`, `SplitLayout`, and `StickyFooterBar`
- registry status metadata and CLI status output for stable/preview/experimental/internal components
- README component status, upload example, DataTable pagination note, and troubleshooting sections

### Removed

- removed narrow business blocks from public exports and source: `ProductTile`, `CartPanel`, `CartItem`, `PriceTag`, `RoleBadge`, `StatusSelect`, `ApprovalPanel`, and `CommentsPanel`
- removed `InfoCard`, `DataCard`, and `UserCard` from public display exports and source in favor of `SmartCard` and `EntityCard`
- removed stale `info-card` registry entry after deleting the source file

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

- build now preserves per-component modules for future subpath imports and source-copy-friendly artifacts
- declaration build now emits declarations for all source modules instead of only the root index
- registry now favors source-copy system components over narrow business/card blocks
- build now starts from a clean `dist` directory and runs output validation
- release gate now includes lint, type/a11y/registry/build-output tests, build, and `npm pack --dry-run`
- `init` supports Vite and Next.js path defaults through `--template vite|next`
- registry validation now fails on package/registry version mismatch and duplicate registry dependencies
- package tarball includes `COMPONENT_MATURITY.md` for public API handoff
- build-output smoke checks now reject indirect ESM browser require fallbacks such as Rolldown CommonJS helpers and `createRequire`

### Docs

- documented component maturity rubric, public export statuses, helper policy, and audit checklist
- expanded release handoff with npm 2FA/token, manual consumer smoke, GitHub release notes and docs-app handoff
