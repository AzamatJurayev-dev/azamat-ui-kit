# azamat-ui-kit

Personal React + TypeScript UI kit for dashboard projects. The goal is to keep shadcn-style copyable components, Ant-style universal wrappers, and project-specific business logic separate.

## What belongs here

This package contains UI primitives, reusable wrappers, generic hooks, formatting helpers, CLI/registry helpers, and dashboard-ready components.

Good candidates:

- Button, Input, Textarea, Checkbox, Switch, Select, Dialog, Popover, Table, Badge, Card
- AppShell, AppHeader, AppSidebar, ActionMenu, PageHeader, FilterBar, StatCard
- ModalShell, SheetShell, ConfirmDialog, DialogActions
- Pagination, SimpleSelect, AsyncSelect, AsyncMultiSelect
- ClearableInput, SearchInput, PasswordInput, NumberInput, MoneyInput, QuantityInput, MaskedInput, PhoneInput, DateInput, DateRangeInput
- FormFieldShell, FormInput, FormSelect, FormAsyncSelect, FormTextarea, FormSwitch
- FormSearchInput, FormPasswordInput, FormNumberInput, FormPhoneInput, FormDateInput, FormDateRangeInput
- DataTable, DataTablePagination, DataTableToolbar, DataTableColumnVisibilityMenu, DataTableSortableHeader
- DataTableRowActions, createDataTableActionsColumn, DataTableBulkActions
- ToastProvider, useToast, CommandPalette, useCommandPaletteShortcut
- EmptyState, LoadingState, StatusBadge
- useSessionStorageState, useBeforeUnloadWhenDirty, useIsMobile, useDisclosure, useDebouncedValue

Do not put project-specific Kassa, LMS, Restaurant, tenant, billing, permission, branch, or API logic into the core UI kit.

## Install

```bash
npm install azamat-ui-kit
```

Alternative GitHub install:

```bash
npm install github:AzamatJurayev-dev/azamat-ui-kit#master
```

Initialize the project once:

```bash
npx azamat-ui-kit init
```

The package entry does **not** import global CSS. During `init`, the CLI can write Azamat UI Kit theme tokens directly into your app global CSS file, for example `src/index.css`.

Do not import package CSS manually:

```ts
// not needed
// import "azamat-ui-kit/style.css"
```

Use components:

```tsx
import {
  ActionMenu,
  AppHeader,
  AppShell,
  AppSidebar,
  AsyncMultiSelect,
  AsyncSelect,
  Button,
  CommandPalette,
  DataTable,
  DataTableBulkActions,
  FilterBar,
  FormDateInput,
  FormInput,
  FormPhoneInput,
  FormSearchInput,
  FormSwitch,
  ModalShell,
  PageHeader,
  PasswordInput,
  PhoneInput,
  SearchInput,
  StatCard,
  StatusBadge,
  ToastProvider,
  useCommandPaletteShortcut,
  useToast,
} from "azamat-ui-kit"
```

## Router integration

The package is router-agnostic by default. Navigation-oriented components render regular `<a>` tags unless you provide a custom link renderer.

Example with Next.js:

```tsx
import Link from "next/link"
import { Breadcrumbs, SidebarNav } from "azamat-ui-kit"

<Breadcrumbs
  items={[
    { key: "home", label: "Home", href: "/" },
    { key: "components", label: "Components", href: "/components" },
  ]}
  renderLink={({ item, ...props }) => <Link {...props} href={item.href || "#"} />}
/>

<SidebarNav
  items={[
    { key: "dashboard", label: "Dashboard", href: "/dashboard" },
    { key: "settings", label: "Settings", href: "/settings" },
  ]}
  renderLink={({ item, ...props }) => <Link {...props} href={item.href || "#"} />}
/>
```

## Local development

```bash
npm install
npm run build
```

## Release

Useful commands before public release:

```bash
npm run test:run
npm pack --dry-run
```

Release notes live in `CHANGELOG.md`, and the publish flow is documented in `RELEASE.md`.

## Component rules

1. Components must be generic and reusable.
2. Components must not import project API clients, route paths, auth stores, or business types.
3. Data loading must be passed through props like `loadOptions`, `data`, `onSubmit`, `onConfirm`.
4. Business wrappers stay in the app project, not in the UI kit.
5. Primitive UI and form wrappers should stay separate.
6. Every reusable component should export from `src/index.ts`.

## Current layers

```txt
src/components/ui/             Base primitives
src/components/actions/        Generic action menus
src/components/layout/         App shell, sidebar, headers and stat cards
src/components/filters/        Filter bars
src/components/overlay/        Modal, sheet, confirm dialog wrappers
src/components/navigation/     Pagination and navigation widgets
src/components/inputs/         Simple, async, masked, phone, date and numeric inputs
src/components/form/           React Hook Form wrappers
src/components/feedback/       Empty, loading and status states
src/components/data-table/     Generic TanStack Table wrapper and helpers
src/components/notifications/  Toast provider and hook
src/components/command/        Command palette and shortcut hook
src/hooks/                     Generic React hooks
src/lib/                       Utilities
```

## Theme / dark mode

Consumer apps own the global CSS. The UI kit only uses token-based classes like `bg-background`, `text-foreground`, `border-border`, `bg-card`, `bg-popover`, `text-muted-foreground`.

```bash
npx azamat-ui-kit theme src/index.css
```

Dark mode works by toggling the `.dark` class on the root/html element.

## Notifications example

```tsx
function App() {
  return (
    <ToastProvider position="top-right">
      <Routes />
    </ToastProvider>
  )
}

function SaveButton() {
  const { addToast } = useToast()

  return (
    <Button
      onClick={() =>
        addToast({
          tone: "success",
          title: "Saved",
          description: "Changes were saved successfully.",
        })
      }
    >
      Save
    </Button>
  )
}
```

## Command palette example

```tsx
const [open, setOpen] = React.useState(false)

useCommandPaletteShortcut(setOpen)

<CommandPalette
  open={open}
  onOpenChange={setOpen}
  groups={[
    {
      id: "navigation",
      label: "Navigation",
      items: [
        { id: "dashboard", label: "Dashboard", onSelect: () => navigate("/dashboard") },
        { id: "products", label: "Products", onSelect: () => navigate("/products") },
      ],
    },
  ]}
/>
```

## Advanced inputs example

```tsx
<SearchInput value={search} onValueChange={setSearch} placeholder="Search products..." />
<PasswordInput value={password} onValueChange={setPassword} />
<NumberInput value={price} min={0} step={1000} onNumberChange={setPrice} />
```

## DataTable example

```tsx
import type { ColumnDef } from "@tanstack/react-table"
import {
  ActionMenu,
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  FilterBar,
  SearchInput,
  StatusBadge,
  createDataTableActionsColumn,
  createDataTableSelectColumn,
} from "azamat-ui-kit"

type Product = {
  id: string
  name: string
  status: "active" | "inactive"
}

const columns: ColumnDef<Product>[] = [
  createDataTableSelectColumn<Product>(),
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableSortableHeader column={column}>Name</DataTableSortableHeader>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <StatusBadge tone={row.original.status === "active" ? "success" : "muted"} dot>
        {row.original.status}
      </StatusBadge>
    ),
  },
  createDataTableActionsColumn<Product>({
    getActions: (_row, product) => [
      { key: "edit", label: "Edit", onSelect: () => edit(product) },
      { key: "delete", label: "Delete", destructive: true, onSelect: () => remove(product) },
    ],
  }),
]

function ProductsTable() {
  return (
    <DataTable
      columns={columns}
      data={products}
      isLoading={isLoading}
      emptyState={{ title: "No products" }}
      toolbarProps={(table) => ({
        title: "Products",
        search: <FilterBar search={<SearchInput placeholder="Search" />} />,
        actions: <DataTableColumnVisibilityMenu table={table} />,
        selectionActions: (
          <DataTableBulkActions
            rows={table.getSelectedRowModel().rows.map((row) => row.original)}
            actions={[{ key: "delete", label: "Delete selected", destructive: true, onSelect: deleteMany }]}
          />
        ),
      })}
      pagination={{ pageIndex, pageSize, pageCount, rowCount, onPageChange: setPageIndex, onPageSizeChange: setPageSize }}
    />
  )
}
```

The library repo only contains reusable package source, CLI helpers, registry templates, tests, and release files. Public docs, blocks, templates showcase pages, and the marketing site live in the separate `azamat-ui` Next.js app.
