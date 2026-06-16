# UI Kit Migration Plan

This plan is based on reusable code extracted from existing projects. The goal is to move reusable code into `azamat-ui-kit` without bringing app-specific business logic.

## Phase 1 - Safe reusable foundation

Added low-risk generic wrappers:

- `ModalShell`
- `SheetShell`
- `ConfirmDialog`
- `DialogActions`
- `Pagination`
- `SimpleSelect`
- `MoneyInput`
- `QuantityInput`
- `useSessionStorageState`
- `useBeforeUnloadWhenDirty`
- `useIsMobile`

Rules:

- No API client imports
- No app route imports
- No i18n dependency
- No business types

## Phase 2 - Form wrappers

Added React Hook Form layer:

- `FormFieldShell`
- `FormInput`
- `FormSelect`
- `FormAsyncSelect`
- `FormTextarea`
- `FormSwitch`

Rules:

- Keep primitive inputs separate from form wrappers
- Form wrappers should only depend on generic field state
- Validation messages come from the consuming app

## Phase 3 - Universal async select

Enhanced async select layer:

- `AsyncSelect`
- `AsyncMultiSelect`
- grouped options
- quick create
- selected option preload
- local option cache
- selected count labels

Rules:

- Core component must not import `$api`
- Core component must not know backend response shape
- Cache and create behavior must be optional
- Multi select must emit both values and selected options

## Phase 4 - DataTable and feedback

Added data display layer:

- `DataTable`
- `DataTablePagination`
- `DataTableToolbar`
- `EmptyState`
- `LoadingState`
- `StatusBadge`

Rules:

- No delete/update endpoint inside table
- No project resource state imports
- No route or query-param dependency in core
- App-specific filters stay outside
- Bulk actions must be passed through toolbar/selection action slots

## Phase 5 - Dashboard helpers

Added dashboard-level reusable components:

- `ActionMenu`
- `PageHeader`
- `FilterBar`
- `StatCard`
- `DataTableColumnVisibilityMenu`

Rules:

- `ActionMenu` only emits callbacks, it does not navigate by itself
- `PageHeader` does not know route structure or breadcrumbs shape
- `FilterBar` receives filters/search/actions through slots
- `StatCard` is visual only, all data comes through props
- column visibility is controlled by the provided TanStack table instance

## Phase 6 - Layout, table, input and hook helpers

Added reusable app-level and table helper components:

- `AppShell`
- `AppHeader`
- `AppSidebar`
- `Checkbox`
- `createDataTableSelectColumn`
- `DataTableSortableHeader`
- `MaskedInput`
- `PhoneInput`
- `useDisclosure`
- `useDebouncedValue`
- `useDebouncedCallback`

Rules:

- app shell components must not know router/auth/permission logic
- table select column only wires TanStack selection state
- sortable header only controls TanStack sorting state
- masked inputs must expose both masked and raw values
- hooks must be generic and app-independent

## Phase 7 - Theme CSS strategy

Changed package styling strategy:

- package entry no longer forces global CSS import
- CLI writes theme tokens to the consumer app global CSS file
- dark mode uses `.dark` class on the root/html element
- theme CSS is updated through marked blocks

Rules:

- apps own global CSS
- reusable components only rely on tokens
- no component should import project CSS directly

## Phase 8 - Advanced form inputs

Added frequently reused input components:

- `ClearableInput`
- `SearchInput`
- `PasswordInput`
- `NumberInput`
- `DateInput`
- `DateRangeInput`
- `FormSearchInput`
- `FormPasswordInput`
- `FormNumberInput`
- `FormPhoneInput`
- `FormDateInput`
- `FormDateRangeInput`

Rules:

- primitive inputs must work without React Hook Form
- form wrappers must only connect primitives to `Controller`
- phone input can store raw or masked value through `valueMode`
- date inputs use native date fields for now; calendar picker can be a later phase

## Phase 9 - Playground and local preview

Added a real Vite playground for testing components inside the UI kit repository:

- updated `src/App.tsx` from a button-only preview into a full component showcase
- added app shell, dashboard cards, advanced inputs and form examples
- added async multi select, data table, action menu, modal, confirm dialog and feedback state demos
- added `docs/playground.md`

Rules:

- playground can use fake local data only
- playground must not import real project API clients
- playground is for development preview and must not become business logic
- every new reusable component should get a small playground example before wide usage

## Phase 10 - DataTable action helpers

Added table-specific action helpers:

- `DataTableRowActions`
- `createDataTableActionsColumn`
- `DataTableBulkActions`

Rules:

- row actions only receive the TanStack row/original data and emit callbacks
- actions columns are generated with `ColumnDef` and do not know API/routes
- bulk actions receive selected rows through props
- clear selection stays optional and controlled by the consuming app

## Next priority order

1. Registry polish for all new components
2. Calendar / popover date picker
3. Command palette / global search
4. Toast and notification helpers
5. Docs site from playground examples
