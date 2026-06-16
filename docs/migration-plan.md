# UI Kit Migration Plan

This plan is based on reusable code extracted from existing projects. The goal is to move reusable code into `azamat-ui-kit` without bringing app-specific business logic.

## Phase 1 - Safe reusable foundation

Added: `ModalShell`, `SheetShell`, `ConfirmDialog`, `DialogActions`, `Pagination`, `SimpleSelect`, `MoneyInput`, `QuantityInput`, `useSessionStorageState`, `useBeforeUnloadWhenDirty`, `useIsMobile`.

Rules: no API client imports, no app route imports, no i18n dependency, no business types.

## Phase 2 - Form wrappers

Added: `FormFieldShell`, `FormInput`, `FormSelect`, `FormAsyncSelect`, `FormTextarea`, `FormSwitch`.

Rules: form wrappers only connect generic field state; validation messages come from the consuming app.

## Phase 3 - Universal async select

Added: `AsyncSelect`, `AsyncMultiSelect`, grouped options, quick create, selected option preload, local option cache, selected count labels.

Rules: core component does not import API clients and does not know backend response shape.

## Phase 4 - DataTable and feedback

Added: `DataTable`, `DataTablePagination`, `DataTableToolbar`, `EmptyState`, `LoadingState`, `StatusBadge`.

Rules: no endpoints, no route/query dependency, no project resource state.

## Phase 5 - Dashboard helpers

Added: `ActionMenu`, `PageHeader`, `FilterBar`, `StatCard`, `DataTableColumnVisibilityMenu`.

Rules: all behavior is passed through props/callbacks.

## Phase 6 - Layout, table, input and hook helpers

Added: `AppShell`, `AppHeader`, `AppSidebar`, `Checkbox`, `createDataTableSelectColumn`, `DataTableSortableHeader`, `MaskedInput`, `PhoneInput`, `useDisclosure`, `useDebouncedValue`, `useDebouncedCallback`.

Rules: shell components do not know router/auth/permission logic.

## Phase 7 - Theme CSS strategy

Changed package styling strategy:

- package entry no longer forces global CSS import
- CLI writes theme tokens to the consumer app global CSS file
- dark mode uses `.dark` class on the root/html element
- theme CSS is updated through marked blocks

## Phase 8 - Advanced form inputs

Added: `ClearableInput`, `SearchInput`, `PasswordInput`, `NumberInput`, `DateInput`, `DateRangeInput`, `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, `FormDateInput`, `FormDateRangeInput`.

## Phase 9 - Playground and local preview

Added a Vite playground for testing components inside the UI kit repository.

Rules: fake local data only; no real project API clients.

## Phase 10 - DataTable action helpers

Added: `DataTableRowActions`, `createDataTableActionsColumn`, `DataTableBulkActions`.

Rules: row and bulk actions receive data through props and emit callbacks.

## Phase 11 - Notifications and command palette

Added: `ToastProvider`, `useToast`, `CommandPalette`, `useCommandPaletteShortcut`.

Rules: no router/auth/API dependency; consuming apps pass behavior through callbacks.

## Phase 12 - Calendar, upload, wizard and CI

Added:

- `Calendar`
- `DatePicker`
- `DateRangePicker`
- `FormDatePicker`
- `FormDateRangePicker`
- `FileUpload`
- `ImageUpload`
- `Stepper`
- `Wizard`
- GitHub Actions build workflow

Rules:

- calendar stores values as `YYYY-MM-DD` strings
- date pickers use popover calendar UI and remain API-independent
- upload components only handle selected `File[]`; API/S3/R2 upload stays in the app
- wizard controls visual flow only; validation/submission stay in the app
- CI runs install and build on push/pull request

## Phase 13 - Registry polish

Expanded CLI registry coverage for all current components and groups:

- `recommended`
- `dashboard`
- `layout`
- `inputs`
- `form`
- `feedback`
- `data-table`
- `notifications`
- `command`
- `calendar-suite`
- `upload`
- `wizard-suite`
- `hooks`

Rules:

- CLI registry dependencies should copy required primitives automatically
- groups should be useful entry points for real dashboards
- registry entries must point to source files, not stale inline templates
- component copy mode must stay API/business independent

## Phase 14 - DataTable hardening

Improved existing `DataTable` without changing its default usage:

- `density`: `compact`, `default`, `comfortable`
- `striped` rows
- `bordered` cells
- `stickyHeader`
- skeleton loading rows through `loadingVariant="skeleton"`
- `onRowDoubleClick`
- `getRowDisabled`
- `cellFallback`
- `headerCellClassName` and `cellClassName` callbacks
- improved mobile loading fallback

Rules:

- all new behavior is optional and backward-compatible
- no API, route, permission or project state dependency is introduced
- visual variants are controlled by props only

## Phase 15 - AsyncSelect hardening

Improved existing `AsyncSelect` and `AsyncMultiSelect` without changing basic usage:

- `cacheTtl` for expiring cached remote searches
- custom `renderLoading`, `renderEmpty`, `renderError`, `renderMinSearch` renderers
- `minSearchLength` message through labels/render prop
- sticky group labels inside option lists
- multi-select `showSelectAll`
- multi-select visible-option select all
- multi-select clear all action in dropdown
- `renderMaxSelected` and `labels.maxSelected`
- max selected message support

Rules:

- loading/search/create behavior stays API-independent
- cache is local component memory only
- select all only selects currently visible options
- all advanced render states are optional

## Next priority order

1. Form components hardening
2. Upload components hardening
3. Toast / CommandPalette hardening
4. App shell advanced responsive sidebar helpers
5. Component tests and accessibility smoke checks
