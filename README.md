# azamat-ui-kit

Personal React + TypeScript UI kit for dashboard projects. The goal is to keep shadcn-style copyable components, Ant-style universal wrappers, and project-specific business logic separate.

## What belongs here

This package should contain UI primitives, reusable wrappers, generic hooks, formatting helpers, and component registry metadata.

Good candidates:

- Button, Input, Textarea, Switch, Select, Dialog, Popover, Table, Badge, Card
- ModalShell, SheetShell, ConfirmDialog, DialogActions
- Pagination, SimpleSelect, AsyncSelect, AsyncMultiSelect, MoneyInput, QuantityInput
- FormFieldShell, FormInput, FormSelect, FormAsyncSelect, FormTextarea, FormSwitch
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
import {
  AsyncMultiSelect,
  AsyncSelect,
  Button,
  FormInput,
  FormSwitch,
  ModalShell,
  Pagination,
} from "azamat-ui-kit"
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

## Form example

```tsx
import { useForm } from "react-hook-form"
import { FormInput, FormSelect, FormSwitch } from "azamat-ui-kit"

type ProductFormValues = {
  name: string
  status: string
  active: boolean
}

function ProductForm() {
  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: "",
      status: "active",
      active: true,
    },
  })

  return (
    <form className="grid gap-4">
      <FormInput
        control={form.control}
        name="name"
        label="Name"
        placeholder="Product name"
        required
      />

      <FormSelect
        control={form.control}
        name="status"
        label="Status"
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
        ]}
      />

      <FormSwitch
        control={form.control}
        name="active"
        label="Active"
        description="Show this item in the app."
      />
    </form>
  )
}
```

## AsyncSelect example

```tsx
<AsyncSelect
  value={customerId}
  onValueChange={setCustomerId}
  cacheOptions
  loadSelectedOption={async (id) => {
    const customer = await customersApi.getById(id)

    return {
      value: String(customer.id),
      label: customer.name,
      data: customer,
    }
  }}
  loadOptions={async (search) => {
    const customers = await customersApi.search(search)

    return customers.map((customer) => ({
      value: String(customer.id),
      label: customer.name,
      data: customer,
    }))
  }}
  onCreateOption={async (search) => {
    const customer = await customersApi.create({ name: search })

    return {
      value: String(customer.id),
      label: customer.name,
      data: customer,
    }
  }}
/>
```

## AsyncMultiSelect with groups

```tsx
<AsyncMultiSelect
  value={tagIds}
  onValueChange={setTagIds}
  labels={{
    placeholder: "Select tags",
    selectedCount: (count) => `${count} selected`,
  }}
  loadOptions={async (search) => {
    const [systemTags, customTags] = await Promise.all([
      tagsApi.system(search),
      tagsApi.custom(search),
    ])

    return [
      {
        label: "System",
        options: systemTags.map((tag) => ({
          value: String(tag.id),
          label: tag.name,
          data: tag,
        })),
      },
      {
        label: "Custom",
        options: customTags.map((tag) => ({
          value: String(tag.id),
          label: tag.name,
          data: tag,
        })),
      },
    ]
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

- AsyncSelect base
- FormFieldShell
- FormInput
- FormSelect
- FormAsyncSelect
- FormTextarea
- FormSwitch
- Textarea and Switch exports
- react-hook-form peer dependency

Phase 3 improved async select:

- AsyncMultiSelect
- grouped options
- quick create
- selected option preload
- local option cache
- selected count labels

Phase 4 should add:

- DataTable
- DataTablePagination
- DataTableToolbar
- EmptyState
- LoadingState
- StatusBadge

Phase 5 should add shadcn-style registry metadata and CLI commands.
