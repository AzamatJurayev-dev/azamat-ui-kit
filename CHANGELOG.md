# Changelog

All notable changes to this project will be documented in this file.

## Unreleased

### Added

- added `Button` loading, loading label, left icon, right icon, and `md`/`xl` size API coverage
- added `Card` variants, tones, density, interactive, selected, and disabled state APIs
- added `Badge` tone, size, dot, left icon, and right icon APIs for status-heavy dashboard UI
- added `ClearableInput` Escape-to-clear and focus-after-clear behavior
- added `SearchInput` loading, result count, shortcut, and debounced value callback support
- added `InputDecorator` density, tone, leading/trailing class hooks, and pointer-event control
- added `NumberInput` prefix/suffix support through the shared input decorator
- added `DateInput` optional leading calendar icon support
- added `PhoneInput` icon and country-code display options
- added `PasswordInput` Caps Lock warning and autocomplete defaults
- added `SimpleSelect` clearable, searchable, loading, empty-state, keyword, and custom option rendering APIs
- added reusable form field splitting utilities for future direct form wrapper refactors
- added `PageHeader` variants, tones, sizes, leading content, footer, and class hooks
- added `StatCard` loading skeleton, helper text, value prefix/suffix, trend label, and badge-backed trend rendering
- added `DataTableToolbar` variants, density, and heading/action class hooks
- added `AppInput` / `UniversalInput` as the single public input wrapper for text, clearable, search, password, number, phone, and date input kinds
- added `FormAppInput` as the single React Hook Form wrapper for the same input kinds

### Changed

- moved `NumberInput`, `DateInput`, `MaskedInput`, and `PhoneInput` onto the shared `InputDecorator` surface for more consistent visual behavior
- improved the route-level dashboard foundation by aligning `PageHeader`, `StatCard`, and `DataTableToolbar` with the newer surface/tone APIs
- registered `app-input` and `form-app-input` so CLI/source-copy discovery can prefer the universal input wrappers

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
