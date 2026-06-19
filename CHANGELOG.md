# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

## 0.2.0 - 2026-06-19

### Added

- reusable dependency-free chart components: `ChartFrame`, `BarChart`, `LineChart`, `Sparkline`, `DonutChart`, `ChartLegend`, and `MetricTrend`
- analytics components: `KpiCard`, `KpiGrid`, `ProgressRing`, and `HorizontalBarChart`
- POS/ecommerce components: `QuantityStepper`, `PriceTag`, `ProductTile`, `CartItem`, and `CartPanel`
- table utility components: `TableExportMenu` and `TableImportButton`
- workflow/admin components: `ApprovalPanel`, `CommentsPanel`, `RoleBadge`, and `StatusSelect`
- action utilities: `CopyField`, `ButtonGroup`, `FloatingActionButton`, and `ActionBar`
- form helpers: `FormActions` and `FormSection`
- settings patterns: `SettingsSection` and `SettingsRow`
- base collapse primitive and composed `CollapseGroup`
- feedback `Alert` component with info, success, warning, destructive, and muted tones
- `Statistic`, `StatisticCard`, and `StatisticGrid` display components
- base UI primitives: `Skeleton`, `SkeletonText`, `SkeletonCard`, `Divider`, `SegmentedControl`, `Spinner`, `LoadingOverlay`, and `Tooltip`
- Ant-like data display components: `List`, `ListRow`, `Descriptions`, `KanbanBoard`, `TagList`, `TreeView`, `CodeBlock`, `FileCard`, `PropertyGrid`, `DataCard`, and `UserCard`
- utility display component `KeyboardShortcut`
- feedback state components `PageState` and `InlineState`
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

### Docs

- documented component maturity rubric, public export statuses, helper policy, and audit checklist
- expanded release handoff with npm 2FA/token, manual consumer smoke, GitHub release notes and docs-app handoff
