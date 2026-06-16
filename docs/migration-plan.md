# UI Kit Migration Plan

This plan is based on reusable code extracted from one existing project. The goal is to move reusable code into `azamat-ui-kit` without bringing app-specific business logic.

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

Supported features:

- TanStack Table columns and cells
- controlled pagination
- row selection state wiring
- sorting state wiring
- column visibility state wiring
- loading/empty/error states
- mobile card renderer
- toolbar slot
- selection action area

Rules:

- No delete/update endpoint inside table
- No project resource state imports
- No route or query-param dependency in core
- App-specific filters stay outside
- Bulk actions must be passed through toolbar/selection action slots

## Phase 5 - Registry and CLI

Prepared registry/CLI polish plan:

- expanded registry for Phase 1-4 components
- source-file based copying instead of old inline string templates
- `npx azamat-ui-kit list`
- `npx azamat-ui-kit add ... --overwrite`
- `npx azamat-ui-kit add ... --dry-run`
- `npx azamat-ui-kit add ... --skip-install`
- `registry.json` manifest
- package `files` update to include source templates and registry manifest

CLI examples:

```bash
npx azamat-ui-kit init
npx azamat-ui-kit list
npx azamat-ui-kit add button input data-table
npx azamat-ui-kit add form --overwrite
```

## Phase 6 - Dashboard helpers

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

## Phase 7 - Layout, table, input and hook helpers

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

## Next priority order

1. Form date picker and date range picker
2. Combobox / command palette
3. Tabs, tooltip, separator and skeleton primitives
4. Registry docs site / demo playground
