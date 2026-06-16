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

Added registry/CLI polish:

- expanded `cli/registry.ts` for Phase 1-4 components
- source-file based copying instead of old inline string templates
- `npx azamat-ui-kit list`
- `npx azamat-ui-kit add ... --overwrite`
- `npx azamat-ui-kit add ... --dry-run`
- `npx azamat-ui-kit add ... --skip-install`
- `registry.json` manifest
- `docs/cli.md` usage guide
- package `files` updated to include source templates and registry manifest

CLI examples:

```bash
npx azamat-ui-kit init
npx azamat-ui-kit list
npx azamat-ui-kit add button input data-table
npx azamat-ui-kit add form --overwrite
```

## Next priority order

1. Layout shell components: `AppShell`, `AppHeader`, `AppSidebar`
2. DataTable advanced helpers: select column, action menu, column visibility menu
3. Form date picker and masked inputs
4. Registry docs site / demo playground
