# azamat-ui-kit

Personal React + TypeScript UI kit for dashboard projects. The goal is to keep shadcn-style copyable components, Ant-style universal wrappers, and project-specific business logic separate.

## What belongs here

This package should contain UI primitives, reusable wrappers, generic hooks, formatting helpers, and component registry metadata.

Good candidates:

- Button, Input, Textarea, Select, Dialog, Popover, Table, Badge, Card
- ModalShell, SheetShell, ConfirmDialog, DialogActions
- Pagination, SimpleSelect, AsyncSelect, MoneyInput, QuantityInput
- FormFieldShell, FormInput, FormSelect, FormAsyncSelect, FormTextarea
- DataTable, FilterBar, EmptyState, LoadingState, StatusBadge
- useSessionStorageState, useBeforeUnloadWhenDirty, useIsMobile

Do not put project-specific Kassa, LMS, Restaurant, tenant, billing, permission, branch, or API logic into the core UI kit.

## Install from GitHub

```bash
npm install github:AzamatJurayev-dev/azamat-ui-kit#master
```

Then import styles once in the app entry:

```ts
import "azamat-ui-kit/style.css"
```

Use components:

```tsx
import { Button, AsyncSelect, FormInput, ModalShell, Pagination } from "azamat-ui-kit"
```

## Local development

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Component rules

1. Components must be generic and reusable.
2. Components must not import project API clients, route paths, auth stores, or business types.
3. Data loading must be passed through props like `loadOptions`, `data`, `onSubmit`, `onConfirm`.
4. Business wrappers stay in the app project, not in the UI kit.
5. Primitive UI and form wrappers should stay separate.
6. Every reusable component should export from `src/index.ts`.

## Current layers

```txt
src/components/ui/          Base primitives
src/components/overlay/     Modal, sheet, confirm dialog wrappers
src/components/navigation/  Pagination and navigation widgets
src/components/inputs/      Simple and async input/select wrappers
src/components/form/        React Hook Form wrappers
src/hooks/                  Generic React hooks
src/lib/                    Utilities
```

## AsyncSelect example

```tsx
<AsyncSelect
  value={customerId}
  onValueChange={setCustomerId}
  loadOptions={async (search) => {
    const customers = await customersApi.search(search)

    return customers.map((customer) => ({
      value: String(customer.id),
      label: customer.name,
      data: customer,
    }))
  }}
/>
```

## Migration plan

Phase 1 added low-risk generic wrappers:

- ModalShell
- SheetShell
- ConfirmDialog
- DialogActions
- Pagination
- SimpleSelect
- MoneyInput
- QuantityInput
- useSessionStorageState
- useBeforeUnloadWhenDirty
- useIsMobile

Phase 2 added form and async-select layer:

- AsyncSelect
- FormFieldShell
- FormInput
- FormSelect
- FormAsyncSelect
- FormTextarea
- Textarea export
- react-hook-form peer dependency

Phase 3 should add:

- DataTable
- DataTablePagination
- DataTableToolbar
- EmptyState
- LoadingState
- StatusBadge

Phase 4 should add shadcn-style registry metadata and CLI commands.
