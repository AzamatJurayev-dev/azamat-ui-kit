# Changelog

All notable changes to this project will be documented in this file.

## 3.1.17 - 2026-07-16

- Added production-ready `agenda` and `board` variants, density controls, rich event metadata, selection state, hidden/disabled events, custom rendering, and formatted day labels to `CalendarScheduler`.
- Added a compact trigger variant to `DatePicker` for dense filters, headers, and scheduling toolbars.
- Added compact density to `StatisticCard` and configurable gaps to `StatisticGrid`.
- Added `labelClassName` and a stable inline-flex label layout to `Button`, fixing complex icon/value/action labels that previously stacked vertically.
- Updated the CalendarScheduler showcase and regression coverage for the expanded API.

## 3.1.16 - 2026-07-16

- Fixed composed Card surfaces so `StatisticCard`, `InfoCard`, `ActivityFeed`, and other Card-based components retain base border, background, radius, and variant styling.
- Added compatibility aliases for legacy theme tokens used by installed components.
- Fixed `StatusLegend` surfaces and item borders in light and dark themes.
- Reduced default Card elevation and strengthened the light-theme border for dense application layouts.
- Fixed `FormBuilder` field preset typing so discriminated input and select props remain usable in strongly typed React Hook Form schemas.
- Prevented `ResizablePanel` sizing props from leaking to DOM elements.
- Made `ResourcePage`, `ResourceDetailPage`, and `DetailLayout` reserve an aside column only when aside content exists.

## 3.1.15 - 2026-07-16

- Fixed `NotificationCenter` to use solid, fallback-safe popover surfaces when host apps do not define optional `--aui-*` theme tokens.
- Synced the notification fix into the vendored CLI source used by generated projects.

## 3.1.14 - 2026-07-16

- Fixed Kanban drag-and-drop by adding a native drag/drop fallback while preserving the existing `@dnd-kit` integration.
- Kept Kanban controlled and uncontrolled column updates in sync for drag, drop, and card move callbacks.
- Refreshed registry/showcase package metadata for the 3.1.14 release.

## 3.1.13 - 2026-07-16

- Fixed `LineChart` responsive SVG height so wide dashboard cards no longer stretch line charts into oversized panels.

## 3.1.12 - 2026-07-16

- Fixed `BarChart` bars rendering with zero height inside dashboard cards.
- Kept `DataTable` desktop and mobile layouts mutually exclusive at runtime so hidden duplicate cells and badges are not rendered.

## 3.1.11 - 2026-07-16

- Removed the fixed max-width shell from the generated showcase workbench so `tembro init` projects can use the full viewport for component QA.
- Updated generated showcase grids to align items at the start, preventing cards from stretching to unrelated sibling heights on wide dashboards.
- Synced the full-width showcase template into the vendored CLI assets used by the published package.

## 3.1.6 - 2026-07-13

- Fixed duplicate selected indicators in Select options.
- Enforced horizontal icon and label alignment for Button.
- Strengthened centralized Select trigger borders and consumer theme scanning.

## 3.1.5 - 2026-07-13

### Changed

- published the consolidated canonical component surface, reusable showcase architecture, centralized theme styling, and expanded interactive documentation
- synchronized package, CLI, registry, showcase metadata, build output, and npm release versions

## 3.1.4 - 2026-07-13

### Changed

- consolidated Input, Sidebar, Statistic, PageState, and FileUpload documentation around their canonical public APIs with interactive states and production-oriented code samples
- expanded Sidebar documentation with nested routes, React Router rendering, density controls, active indicators, collapsed rail actions, mobile navigation, and account interaction
- expanded FileUpload documentation with controlled progress, retry, validation, rejection messages, sample files, remove, and clear flows
- added compact InlineState coverage and interactive route-level PageState outcomes
- moved Statistic, PageState, and FileUpload visual states into the shared init-managed theme through semantic data slots and light/dark tokens
- improved loading, status, and upload rejection accessibility semantics

### Removed

- removed deprecated duplicate registry aliases and stale showcase routes in favor of the canonical component surfaces

## 3.1.0 - 2026-07-10

### Added

- added `SortableList` with pointer, touch, and keyboard sorting, controlled and uncontrolled state, drag overlays, disabled items, and accessible handles
- rebuilt `KanbanBoard` with real card reordering across lanes, empty-lane drops, canceled-drag recovery, and controlled or uncontrolled board state
- added `VirtualList` for dynamic, accessible virtualization of large collections
- added opt-in row virtualization to `DataTable` with bounded height, overscan, dynamic measurement, sticky headers, and visible-range reporting

### Changed

- added `@dnd-kit/react`, `@dnd-kit/helpers`, and `@tanstack/react-virtual` as focused interaction and performance foundations
- added CLI registry entries, source-copy dependency installation, public demos, and regression coverage for the new components

## 3.0.0 - 2026-07-10

### Breaking changes

- removed the deprecated `FormAsyncSelect`, `FormDateInput`, `FormNumberInput`, `FormPasswordInput`, `FormPhoneInput`, and `FormSearchInput` component exports; use `FormSelect kind="async"` or the matching `FormInput kind` instead
- removed the deprecated `AppSidebar` and `SmartCard` exports; use `Sidebar` and `InfoCard`
- removed `QRCode`, which rendered a QR-like image that was not scannable
- removed the incomplete `RichTextEditor`, `Menubar`, `NavigationMenu`, and `Tour` surfaces instead of presenting partial interaction contracts as production components

### Changed

- made CLI migration aliases resolve to canonical components without copying deprecated source files
- fixed conditional React hook usage in `Input`, `AsyncSelect`, and `Sidebar`, and restored core hooks lint rules
- renamed the implementation module from `smart-card.tsx` to `info-card.tsx`
- made `JsonInput` and `DualListPicker` work in both controlled and uncontrolled modes
- improved `CalendarScheduler` empty states and reduced repeated event filtering
- tightened registry validation so every advertised group member and migration alias must exist in the CLI registry
- added component-quality regression coverage and corrected repository metadata

## 2.0.3 - 2026-07-08

- tightened default radius and shadow tokens so controls render less pill-like out of the box
- polished Button, Input, Select, and Calendar core surfaces for cleaner default spacing and focus states
- added render coverage for clearable canonical Input and multi-month Calendar paging

## 2.0.2 - 2026-07-08

### Changed

- rebuilt `AppSidebar` into a responsive navigation surface with automatic mobile drawer behavior, overlay dismissal, escape handling, and close-on-select flow
- refreshed the `AppSidebar` and `AppShell` showcase demos so mobile and desktop sidebar behavior are both visible from the docs surface
- synced CLI vendor copies and added navigation render coverage for the new responsive sidebar contract

## 1.0.0 - 2026-07-08

### Changed

- renamed the public npm package to `tembro` so installs and CLI usage can use `npm i tembro` and `npx tembro`
- moved the workspace CLI package to the private internal name `tembro-cli-internal` to avoid npm workspace name collisions
- updated the registry, README, showcase metadata, docs snippets, and fixture smoke imports to use the new `tembro` package name
- reset the public package line to `1.0.0` for the short-name release

## 0.3.24 - 2026-07-02

### Changed

- filled public showcase demo coverage for every component catalog route so docs no longer fall back to missing generic detail states
- added a supplemental showcase registry plus a coverage test to stop new public components from shipping without demo wiring
- refreshed preview registry and source-copy showcase metadata so `azamat-ui` can consume the same complete demo surface after upgrade

## 0.3.23 - 2026-07-02

### Changed

- upgraded `Carousel` from a static slide shell to a usable component with internal state, arrows, dots, loop support, and keyboard navigation
- replaced `SavedFilterSelect` browser `prompt()` saving with an inline input flow so saved-view creation is stylable, testable, and accessible
- rebuilt `ResizablePanel` into an actual split-panel primitive with draggable and keyboard-accessible handles instead of a fake CSS resize shell
- upgraded `MentionInput` into a real trigger-based mention surface with inline suggestions, keyboard selection, and cursor-aware insertion
- synced `JsonInput` validation with controlled values and aligned `TrendCard` success sparkline colors with Tembro theme tokens
- refreshed registry/showcase wiring and CLI vendor copies so the new component behavior ships consistently in both package and source-copy flows

## 0.3.22 - 2026-07-01

### Changed

- stabilized the standalone `test:run` flow by auto-building `dist` before build-output smoke checks when needed
- promoted `InfoCard` as the canonical display-card name while keeping `SmartCard` as a deprecated compatibility alias
- marked compatibility wrappers such as `FormPasswordInput`, `FormAsyncSelect`, and `AppSidebar` more explicitly as migration aliases
- rewrote `PUBLIC_API_INVENTORY.md`, regenerated `PUBLIC_COMPONENT_API.md`, and refreshed `README.md` so source-copy-first canonical APIs lead the docs surface
- rationalized public family surfaces so actions, feedback, charts, navigation, primitives, and upload docs group around canonical component entry points
- refined `Calendar`, `DatePicker`, and `DateRangePicker` popup chrome so installed dark-mode date pickers no longer render with heavy nested panels

## 0.3.19 - 2026-06-30

### Added

- added `Accordion` as the canonical accordion API backed by the existing collapse interaction model
- added `DataList` and `DataListRow` for compact operational list rows with values, metadata, icons and links
- added `KeyValueCard` for concise key/value summaries inside dashboard and detail pages
- added `DataTableSavedFilters` to the public registry groups so saved table filters are discoverable from the CLI registry

### Changed

- synced registry, CLI status metadata, public API inventory and render coverage for the new source-copy components

## 0.3.17 - 2026-06-30

### Changed

- strengthened `Select` trigger, popup, item, focus, invalid and disabled visuals so source-copied selects look styled without relying on extra site CSS
- refined `Table` and `DataTable` surfaces with token-based borders, backgrounds, selected rows, striped rows and shadows
- improved `DataTableToolbar` soft and selection-bar treatment for cleaner dashboard usage
- synced CLI vendor component sources with the published package polish

## 0.3.11 - 2026-06-29

### Changed

- refined `Button` defaults so installed package buttons have calmer radius, clearer focus rings, and better dark-mode contrast
- improved disabled and loading button states so they stay readable without looking like broken outline controls
- reduced heavy hover shadows on primary and destructive actions for cleaner dashboard usage

## 0.3.10 - 2026-06-26

### Changed

- refined the published primitive layer for `Button`, `Input`, `Select`, `Checkbox`, `Switch`, `Tabs`, and `Card` so default surfaces feel flatter, calmer, and more product-ready
- cleaned up shared input chrome, decorator spacing, and clear action affordances so installed field components ship with a stronger default UI

## 0.3.9 - 2026-06-26

### Changed

- refined `Badge` defaults so status labels look calmer, flatter, and more product-ready out of the box
- simplified the Badge docs surface to remove heavy card-in-card composition around a small primitive

## 0.3.8 - 2026-06-26

### Changed

- polished the published input field chrome, decorator spacing, and clear action treatment
- reduced nested-card noise in the docs input showcase and cleaned up the live field composition
- moved detail-page side rails to wider breakpoints so preview content no longer collides with related panels

## 0.3.7 - 2026-06-26

### Fixed

- restored the full root export contract so published package consumers receive patterns, families, and complete public component barrels from `tembro`

## 0.3.6 - 2026-06-26

### Changed

- refined the base input, decorator, and clear action visuals for a cleaner published default field surface
- softened tabs, cards, dialogs, popovers, and dropdown menus so overlay-heavy docs routes match the newer surface system

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
- added `AppInput` / `UniversalInput` as the single public input wrapper for text, clearable, search, number, phone, and date input kinds
- added `FormAppInput` as the single React Hook Form wrapper for the same input kinds
- added real component primitives: `RadioGroup`, `Kbd`, `HoverCard`, `StatusDot`, `SectionHeader`, `AlertDialog`, and `Drawer`
- added `UserCard`, `NavTabs`, and `FileDropzone` for dashboard identity, navigation, and upload flows
- added `ScrollBox`, `RightClickMenu`, `ProgressCircle`, and `MetricCard` as additional real reusable UI components

### Changed

- moved `NumberInput`, `DateInput`, `MaskedInput`, and `PhoneInput` onto the shared `InputDecorator` surface for more consistent visual behavior
- improved the route-level dashboard foundation by aligning `PageHeader`, `StatCard`, and `DataTableToolbar` with the newer surface/tone APIs
- registered `app-input` and `form-app-input` so CLI/source-copy discovery can prefer the universal input wrappers
- hardened `AppInput` and `FormAppInput` typing so specialized props are routed more safely by kind
- routed `FormSearchInput`, `FormNumberInput`, `FormPhoneInput`, and `FormDateInput` through `FormAppInput` as compatibility wrapper migrations
- exported `StatusDot`, `UserCard`, `ProgressCircle`, `SectionHeader`, `NavTabs`, `FileDropzone`, `ScrollBox`, and `RightClickMenu` from their public surfaces
- re-routed compatibility wrappers back onto the canonical `FormInput` surface so docs and implementation stay aligned
- clarified README and universal-input docs to teach `Input` / `FormInput` first while keeping aliases for migration

### Docs

- aligned the component maturity matrix with the current `Button` public API
- documented the universal input API in `UNIVERSAL_INPUT.md`
- added a render-time public API snapshot test for documented root exports

## 0.2.3 - 2026-06-23

### Added

- new `Stack`, `Inline`, and `Grid` layout helpers for common vertical, horizontal, and grid composition

### Changed

- aligned package, CLI, and registry versions for the next public release
