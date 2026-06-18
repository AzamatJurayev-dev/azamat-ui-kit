# UI Kit Migration Plan

This plan tracks how reusable code is moved into `azamat-ui-kit` without bringing app-specific business logic.

## Core rules

- No API client imports in reusable UI components.
- No app route, auth, tenant, role, permission or branch logic in core components.
- Prefer one reusable component with props/slots over many visual-only component names.
- Visual polish should come from CSS tokens and stable `data-slot` selectors.
- Playground examples must use local mock data only.

## Completed phases

### Phase 1 - Safe reusable foundation

Added low-risk wrappers and hooks: `ModalShell`, `SheetShell`, `ConfirmDialog`, `DialogActions`, `Pagination`, `SimpleSelect`, `MoneyInput`, `QuantityInput`, `useSessionStorageState`, `useBeforeUnloadWhenDirty`, `useIsMobile`.

### Phase 2 - Form wrappers

Added React Hook Form wrappers: `FormFieldShell`, `FormInput`, `FormSelect`, `FormAsyncSelect`, `FormTextarea`, `FormSwitch`.

### Phase 3 - Universal async select

Added `AsyncSelect`, `AsyncMultiSelect`, grouped options, quick create, selected option preload, local option cache and selected count labels.

### Phase 4 - DataTable and feedback

Added `DataTable`, `DataTablePagination`, `DataTableToolbar`, `EmptyState`, `LoadingState`, `StatusBadge`.

### Phase 5 - Dashboard helpers

Added `ActionMenu`, `PageHeader`, `FilterBar`, `StatCard`, `DataTableColumnVisibilityMenu`.

### Phase 6 - Layout, table, input and hook helpers

Added `AppShell`, `AppHeader`, `AppSidebar`, `Checkbox`, `createDataTableSelectColumn`, `DataTableSortableHeader`, `MaskedInput`, `PhoneInput`, `useDisclosure`, `useDebouncedValue`, `useDebouncedCallback`.

### Phase 7 - Theme CSS strategy

Changed package styling strategy so the package entry does not force global CSS import and CLI can write theme tokens into the consumer app global CSS file.

### Phase 8 - Advanced form inputs

Added `ClearableInput`, `SearchInput`, `PasswordInput`, `NumberInput`, `DateInput`, `DateRangeInput`, `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput`, `FormDateRangeInput`.

### Phase 9 - Playground and local preview

Added a Vite playground for testing components inside the UI kit repository with local mock data only.

### Phase 10 - DataTable action helpers

Added `DataTableRowActions`, `createDataTableActionsColumn`, `DataTableBulkActions`.

### Phase 11 - Notifications and command palette

Added `ToastProvider`, `useToast`, `CommandPalette`, `useCommandPaletteShortcut`.

### Phase 12 - Calendar, upload, wizard and CI

Added `Calendar`, `DatePicker`, `DateRangePicker`, `FormDatePicker`, `FormDateRangePicker`, `FileUpload`, `ImageUpload`, `Stepper`, `Wizard`, and GitHub Actions build workflow.

### Phase 13 - Registry polish

Expanded CLI registry coverage for current components and groups: `recommended`, `dashboard`, `layout`, `inputs`, `form`, `feedback`, `data-table`, `notifications`, `command`, `calendar-suite`, `upload`, `wizard-suite`, `hooks`.

### Phase 14 - DataTable hardening

Improved existing `DataTable` with `density`, `striped`, `bordered`, `stickyHeader`, skeleton loading rows, `onRowDoubleClick`, `getRowDisabled`, `cellFallback`, header/cell class callbacks and mobile loading fallback.

### Phase 15 - AsyncSelect hardening

Improved `AsyncSelect` and `AsyncMultiSelect` with `cacheTtl`, custom loading/empty/error/min-search renderers, min-search messages, sticky group labels, select visible, clear all and max selected messages.

### Phase 16 - Form components hardening

Improved form shell and wrappers with vertical/horizontal/inline layouts, description position, label actions, custom required/error indicators, disabled/read-only state propagation and `FormSwitch` label placement.

### Phase 17 - Upload components hardening

Improved `FileUpload` and `ImageUpload` with drag-and-drop, keyboard dropzone trigger, max size/count validation, accept validation, rejected files, remove/clear actions, append/replace mode, custom renderers, progress and image preview cleanup.

### Phase 18 - CSS-first visual system

Started moving visual polish into CSS tokens and stable `data-slot` selectors. Added `--aui-*` component tokens for controls, cards, popovers and tables and synced the token layer into the CLI theme template.

### Phase 19 - Toast API hardening

Improved `ToastProvider` and `useToast` with `toast.success`, `toast.info`, `toast.warning`, `toast.error`, `toast.loading`, `toast.promise`, loading tone and pause-on-hover behavior.

### Phase 20 - Playground full showcase

Expanded dev playground into a broad manual QA surface covering shell, primitives, inputs, forms, DataTable, upload, calendar, overlays, command palette, toast, stepper/wizard and CSS tokens.

### Phase 21 - DataTable API consolidation

Improved existing `DataTable` as the single table component instead of adding a separate `ProTable` name. Added feature-driven search, column visibility, row actions, bulk actions, refresh/export callbacks and toolbar wiring.

### Phase 22 - Landing and documentation polish

Improved playground as a public-facing UI kit website with landing hero, CTA, metrics, system cards, architecture principles, CSS-first customization block, polished wrappers and `ComponentPreview`.

### Phase 23 - Section showcase polish

Polished Forms, DataTable, Upload, Calendar and Overlay sections so each looks like a modern UI library documentation page with metrics, controls, full previews and usage guidance.

### Phase 24 - Foundation and Inputs polish

Polished Foundation and Inputs sections with metrics, button matrix, status language, primitive fields, radius controls, CSS token maps, complete input/select previews and state cards.

### Phase 25 - Templates section polish

Rebuilt the Templates section as a modern app-level pattern gallery:

- route-driven template catalogue with metrics and cards
- reusable module map linking template blocks to component docs
- template detail pages with deep-linked page tabs
- module registry table using the existing `DataTable`
- mock action form and modal preview for each template page
- API-free examples that show how templates can become real app routes

### Phase 26 - CommandPalette hardening

Improved `CommandPalette` as the single global command/search component:

- async command groups through `loadItems`
- per-group loading and error rendering
- debounced search
- recent commands memory
- disabled reason support
- per-item loading state
- `onItemSelect` callback
- configurable `recent`, `renderEmpty`, `renderLoading`, `filterItem`, `inputClassName` and `listClassName`

### Phase 27 - AppShell responsive hardening

Improved `AppShell` as the main responsive dashboard shell:

- controlled/uncontrolled desktop sidebar collapse state
- controlled/uncontrolled mobile sidebar open state
- mobile overlay sidebar with close button
- optional mobile sidebar override
- fixed or static sidebar mode
- configurable sidebar and aside widths
- mobile menu trigger slot behavior
- class hooks for sidebar, mobile sidebar, aside, main wrapper and content
- no route, auth, tenant, permission or business dependency

### Phase 28 - ResourcePage pattern

Added an API-free page composition pattern for dashboard resource screens:

- `ResourcePage` combines header, breadcrumbs, stats, filters, tabs, content, table, aside and footer slots
- `ResourcePageSection` gives reusable card-like page sections
- optional `DataTable` integration through a `table` prop
- density support for compact/default/comfortable spacing
- slot class names for toolbar, content, aside and page header
- no API, route, permission or business dependency

### Phase 29 - FormBuilder pattern

Added a config-driven form composition pattern on top of existing React Hook Form wrappers:

- `FormBuilder` renders fields or sections from config
- supports `input`, `textarea`, `select`, `async-select`, `switch`, `number`, `phone`, `date`, `date-range` and `custom`
- supports grid or stack layout
- supports compact/default/comfortable density
- supports section headers, section actions, field col-span and footer actions
- disabled/read-only state can be propagated from one place
- no validation schema, API, route or business dependency is introduced

### Phase 30 - Component tests and accessibility smoke checks

Added a lightweight quality gate without new runtime dependencies:

- `test:types` runs TypeScript smoke tests against the public package surface
- `test:a11y` runs static accessibility smoke checks for key interactive components
- `test:run` combines both checks
- CI now runs smoke tests before build
- `docs/testing.md` documents the testing strategy

### Phase 31 - ResourceDetailPage pattern

Added an API-free detail page composition pattern for dashboard resource detail screens:

- `ResourceDetailPage` combines breadcrumbs, header, status, summary, meta, sections, aside and footer slots
- sections can render `DescriptionList` items or custom children
- optional back button callback through `onBack`
- compact/default/comfortable density support
- slot class names for content, aside, header and sections
- no API, route, permission or business dependency is introduced

## Next priority order

1. Registry validation script
2. Playground examples for ResourcePage/FormBuilder/AppShell responsive states
3. More focused smoke tests for registry groups
4. More dashboard-ready display components
