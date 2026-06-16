# UI Kit Migration Plan

This plan is based on reusable code extracted from one existing project. The goal is to move reusable code into `azamat-ui-kit` without bringing app-specific business logic.

## Phase 1 - Safe reusable foundation

Add low-risk generic wrappers:

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

Add React Hook Form layer:

- `FormFieldShell`
- `FormInput`
- `FormSelect`
- `FormAsyncSelect`
- `FormTextarea`
- `FormSwitch`
- `FormDatePicker`

Rules:

- Keep primitive inputs separate from form wrappers
- Form wrappers should only depend on generic field state
- Validation messages come from the consuming app

## Phase 3 - Universal async select

Refactor existing `AppAsyncSelect` into:

- `AsyncSelect`
- `AsyncMultiSelect`
- optional `ApiAsyncSelect` adapter later

Core API should look like:

```tsx
<AsyncSelect
  value={value}
  onValueChange={setValue}
  loadOptions={async (search) => customersApi.search(search)}
  getOptionLabel={(item) => item.name}
  getOptionValue={(item) => String(item.id)}
/>
```

Rules:

- Core component must not import `$api`
- Core component must not know backend response shape
- Cache and connectivity behavior should be optional

## Phase 4 - DataTable

Refactor existing `AppTable` into generic `DataTable`.

Target features:

- TanStack Table support
- controlled pagination
- row selection
- expandable rows
- column visibility
- loading/empty/error states
- card view for mobile
- toolbar slot
- bulk action slot

Rules:

- No delete/update endpoint inside table
- No project resource state imports
- No route or query-param dependency in core
- App-specific filters stay outside

## Phase 5 - Registry and CLI

Add shadcn-style registry metadata:

```txt
registry/
  components/
  hooks/
registry.json
```

Then improve CLI:

```bash
npx azamat-ui-kit init
npx azamat-ui-kit add button pagination data-table
```

## Priority order

1. Phase 1 wrappers
2. Form wrappers
3. AsyncSelect
4. DataTable
5. Registry/CLI polish
6. Layout shell components
