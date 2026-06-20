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
- ChartFrame, BarChart, LineChart, Sparkline, DonutChart, ChartLegend, MetricTrend
- ResourcePage, ResourceDetailPage, FormBuilder, FormBuilderPresets
- InputFamily, SelectFamily, CardFamily, FormFamily, DataTableFamily
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

Use Next.js defaults:

```bash
npx azamat-ui-kit init --template next
```

Use Vite defaults:

```bash
npx azamat-ui-kit init --template vite
```

The package entry does **not** import global CSS. During `init`, the CLI can write Azamat UI Kit theme tokens directly into your app global CSS file, for example `src/index.css` or `app/globals.css`.

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
  CardFamily,
  CommandPalette,
  DataTable,
  DataTableFamily,
  DataTableBulkActions,
  FilterBar,
  FormDateInput,
  FormFamily,
  FormInput,
  FormPhoneInput,
  FormSearchInput,
  FormSwitch,
  InputFamily,
  ModalShell,
  PageHeader,
  PasswordInput,
  PhoneInput,
  SearchInput,
  SelectFamily,
  StatCard,
  StatusBadge,
  ToastProvider,
  useCommandPaletteShortcut,
  useToast,
} from "azamat-ui-kit"
```

Root import intentionally exposes the docs-facing public surface. Advanced helpers and experimental building blocks should be imported from subpaths when needed, for example:

```tsx
import { ActionSystem } from "azamat-ui-kit/patterns/action-system"
import { ProgressRing } from "azamat-ui-kit/charts/progress-ring"
```

Family entry exports are also available for docs-first or design-system-first usage:

```tsx
import { CardFamily, InputFamily, SelectFamily } from "azamat-ui-kit"

<InputFamily.Search placeholder="Search products..." />
<SelectFamily.Async loadOptions={loadUsers} />
<CardFamily.Info title="Revenue" description="Current period" />
```

```tsx
import { DataTableFamily, FormFamily } from "azamat-ui-kit"

<FormFamily.Input name="firstName" control={control} label="First name" />
<DataTableFamily.Root columns={columns} data={rows} />
```

## Component status

Component readiness is tracked in `COMPONENT_MATURITY.md` and mirrored for the CLI in `cli/registry-status.ts`.

```bash
npx azamat-ui-kit list
```

Statuses:

- `stable`: safe public API for app usage.
- `preview`: reusable, but API may change before a stable release.
- `experimental`: useful internally, but not ready for stable app contracts.
- `internal`: helper metadata or implementation detail.

Stable today: primitives, Base UI wrappers, router-agnostic layout/navigation, feedback/display wrappers and generic action/overlay components. Preview today: inputs, forms, calendar, upload, data-table and resource patterns. Experimental today: `FormBuilder` and presets.

Root package exports now stay intentionally smaller for high-level adoption:

- root import: canonical primitives, reusable wrappers, core charts, public hooks, and docs-facing patterns
- subpath import: advanced pattern helpers and chart extras that are still being audited as a long-term public contract
- family import: grouped entry objects such as `InputFamily`, `SelectFamily`, `CardFamily`, `FormFamily`, `DataTableFamily`

The package also exports `componentFamilyCatalog`, `componentFamilyMigrationMap`, `componentDocsGroups`, `componentMemberMetadata`, `componentSnippetExamples`, and query helpers like `getFamilyCatalogEntry`, `getComponentFamilyEntry`, `getDocsGroupByComponent`, `getDocsNavigation`, `getComponentMemberMetadata`, `getComponentSnippets`, `getComponentSnippetsByVariant`, and `resolveDocsRoute` so a docs app or internal tooling can render family navigation, canonical component routes, route aliases, example snippet tabs, and migration guidance from a single source of truth.

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
npm run release:gate
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

Advanced or internal-facing components may stay on subpath exports instead of the root package entry until their contract is stable.

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
src/components/calendar/       Generic calendar and date pickers
src/components/upload/         File and image upload
src/components/wizard/         Stepper and wizard flows
src/components/patterns/       Public page/form patterns plus advanced system helpers
src/components/charts/         Core charts plus advanced dashboard extras
src/hooks/                     Generic React hooks
src/lib/                       Utilities
```

## Theme / dark mode

Consumer apps own the global CSS. The UI kit only uses token-based classes like `bg-background`, `text-foreground`, `border-border`, `bg-card`, `bg-popover`, `text-muted-foreground`.

```bash
npx azamat-ui-kit theme src/index.css
```

Dark mode works by toggling the `.dark` class on the root/html element. The theme block also provides `.light` for explicit light-mode class usage.

The generated theme block imports `@fontsource-variable/geist`; keep that dependency installed when using the CLI theme output.

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

## Upload example

```tsx
<ImageUpload
  files={files}
  onFilesChange={setFiles}
  maxFiles={4}
  maxSize={2 * 1024 * 1024}
  rejectionMessages={{
    "max-files": ({ maxFiles }) => `Upload at most ${maxFiles} images.`,
    "max-size": ({ maxSize }) => `Each image must be under ${Math.round((maxSize ?? 0) / 1024 / 1024)} MB.`,
    type: "Only image files are allowed.",
  }}
/>
```

`ImageUpload` owns object URL preview cleanup when files change, preview is disabled, or the component unmounts. `FileUpload` blocks drag/drop and file dialog interactions while disabled or loading.

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
      search={{ value: search, onValueChange: setSearch, placeholder: "Search products" }}
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

`DataTable` public pagination config uses a 0-based `pageIndex`, matching TanStack Table. UI copy can display page numbers as 1-based labels.

## Troubleshooting

### Missing theme tokens

Run the theme command against the actual global CSS file used by your app. For Vite this is often `src/index.css`; for Next App Router this is often `app/globals.css`.

```bash
npx azamat-ui-kit theme app/globals.css
```

### ESM import issues

Run `npm run build` in this repo before packing or installing from a local tarball. The build output check rejects ESM browser bundles that contain direct or indirect CommonJS `require` fallbacks.

### Peer dependency mismatch

Install React and React DOM in the consumer app. They are peer dependencies and are intentionally not bundled into the package runtime.

### React Hook Form setup

Form wrappers require `react-hook-form` in the consumer app. Use package imports for reusable wrappers and keep form schema/business validation in the app layer.

The library repo only contains reusable package source, CLI helpers, registry templates, tests, and release files. Public docs, blocks, templates showcase pages, and the marketing site live in the separate `azamat-ui` Next.js app.
