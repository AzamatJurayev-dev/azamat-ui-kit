# azamat-ui-kit

Personal React + TypeScript UI kit for dashboard projects. The goal is to keep source-copyable components, universal wrappers, and project-specific business logic separate.

Preferred adoption model: use the CLI to copy source into your app. Treat the package itself as `foundation + registry`, not as the long-term runtime home for every large component.

## Quick start

There are two valid ways to adopt the library:

1. `source-copy` for real product work.
2. `runtime import` for small stable foundation pieces.

Recommended first step:

```bash
npx azamat-ui-kit-cli init --template next --defaults
npx azamat-ui-kit-cli add button form-input data-table
```

After that, import from your local app source:

```tsx
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
import { DataTable } from "@/components/data-table/data-table"
```

Use direct package imports only when you want small shared primitives without copying source:

```bash
npm install azamat-ui-kit
```

```tsx
import { Button, Dialog, Input, Popover, useDisclosure } from "azamat-ui-kit"
```

Range pickers can also render two months side-by-side when needed:

```tsx
<DateRangePicker value={range} onValueChange={setRange} numberOfMonths={2} />
```

`DateRangePicker` now defaults to `numberOfMonths={2}` and `pagedNavigation={true}`. You can still override both:

```tsx
<DateRangePicker
  value={range}
  onValueChange={setRange}
  numberOfMonths={1}
  pagedNavigation={false}
  showMonthHeaders={false}
/>
```

If you want a review-style footer before the value is committed:

```tsx
<DateRangePicker
  value={range}
  onValueChange={setRange}
  showFooter
  labels={{ apply: "Apply", clear: "Reset" }}
/>
```

Single-date pickers can also opt into a wider desktop calendar:

```tsx
<DatePicker value={date} onValueChange={setDate} numberOfMonths={2} />
```

## What belongs here

This package contains UI primitives, reusable wrappers, generic hooks, formatting helpers, registry helpers, and dashboard-ready components.

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

Recommended CLI setup:

```bash
npx azamat-ui-kit-cli init --template next --defaults
npx azamat-ui-kit-cli add button form-input data-table
```

Primary usage after that should be local source imports:

```tsx
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
import { DataTable } from "@/components/data-table/data-table"
```

If you want runtime imports without source-copy, install the library directly:

```bash
npm install azamat-ui-kit
```

Alternative GitHub install:

```bash
npm install github:AzamatJurayev-dev/azamat-ui-kit#master
```

Initialize the project once:

```bash
npx azamat-ui-kit-cli init
```

Use Next.js defaults:

```bash
npx azamat-ui-kit-cli init --template next
```

Use Vite defaults:

```bash
npx azamat-ui-kit-cli init --template vite
```

For most teams the safe install order is:

```bash
npm install -D azamat-ui-kit-cli
npm install azamat-ui-kit
npx azamat-ui-kit-cli init --template vite --defaults
npx azamat-ui-kit-cli add button form-input
```

The package entry does **not** import global CSS. During `init`, the CLI can write Azamat UI Kit theme tokens directly into your app global CSS file, for example `src/index.css` or `app/globals.css`.

`init` also writes an `@source` directive that points Tailwind at `node_modules/azamat-ui-kit/dist/**/*.js`, so runtime package imports can render correctly in consumer apps.

Do not import package CSS manually:

```ts
// not needed
// import "azamat-ui-kit/style.css"
```

Runtime package imports are best for small stable foundation pieces:

```tsx
import {
  Button,
  Dialog,
  FormInput,
  FormSelect,
  Input,
  Popover,
  useDisclosure,
} from "azamat-ui-kit"
```

For larger reusable surfaces and systems, prefer copied-source imports from your app instead of package-root imports.

Copied-source install writes files into your local app, typically under `src/components`, `src/hooks`, and `src/lib`:

```bash
npx azamat-ui-kit-cli add button input data-table
```

Root import intentionally exposes the smaller foundation-facing public surface. Advanced helpers and implementation-oriented building blocks should be imported from subpaths when needed, or copied through the CLI, for example:

```tsx
import { ActionBar } from "azamat-ui-kit/actions/action-bar"
import { ActionSystem } from "azamat-ui-kit/patterns/action-system"
import { ProgressRing } from "azamat-ui-kit/charts/progress-ring"
import { SmartFormShell } from "azamat-ui-kit/form/smart-form-shell"
import { TableExportMenu } from "azamat-ui-kit/data-table/table-export-menu"
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

## Vite setup

Use this when the consumer app is a React + TypeScript Vite project and you want the recommended source-copy workflow.

### 1. Install both packages

```bash
npm install -D azamat-ui-kit-cli
npm install azamat-ui-kit
```

Why both:

- `azamat-ui-kit-cli`: owns `init`, `add`, `theme`, and local source-copy setup
- `azamat-ui-kit`: runtime package, Tailwind `@source` target, and small direct-import primitives

### 2. Run template-aware init

```bash
npx azamat-ui-kit-cli init --template vite --defaults
```

This should create or update:

- `azamat-ui.json`
- `src/lib/utils.ts`
- `src/index.css`
- `tsconfig.app.json` alias mapping for `@/*`
- `vite.config.ts` alias support for `@`

If the project is missing Tailwind Vite packages, `init` can install:

```txt
tailwindcss
@tailwindcss/vite
```

### 3. Verify `vite.config.ts`

Your Vite config should include the Tailwind Vite plugin and an `@` alias to `src`.

```ts
import path from "node:path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
})
```

### 4. Verify `tsconfig.app.json`

The consumer app should resolve `@/*` to `src/*`.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 5. Verify `src/index.css`

`init` writes the theme layer into the real global CSS file used by the app. That file should contain the Azamat UI Kit theme block, including:

- `@import "tw-animate-css";`
- `@import "@fontsource-variable/geist";`
- `@source "../node_modules/azamat-ui-kit/dist/**/*.js";` or an equivalent `node_modules/azamat-ui-kit/dist/**/*.js` path
- light and dark token definitions

Do not create a separate package stylesheet import. The global app CSS is the source of truth.

### 6. Verify the app entry imports global CSS

For standard Vite React apps, `src/main.tsx` should already include:

```ts
import "./index.css"
```

If this import is missing, the library will render without the expected styles even if the components themselves are correct.

### 7. Add first components

```bash
npx azamat-ui-kit-cli add button form-input
```

Expected copied files usually land under:

```txt
src/components/ui/button.tsx
src/components/form/form-input.tsx
```

### 8. Import from local app source

```tsx
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
```

This is the preferred production usage. It keeps your app editable and avoids forcing large reusable systems through one package-root import.

### 9. Smoke test one component

```tsx
import { Button } from "@/components/ui/button"

export function Demo() {
  return <Button>Save changes</Button>
}
```

If the button renders without theme styles, check these first:

1. `src/main.tsx` imports `./index.css`
2. `src/index.css` contains the Azamat UI Kit theme block
3. `vite.config.ts` uses `@tailwindcss/vite`
4. `tsconfig.app.json` and `vite.config.ts` both resolve `@`
5. the project restarted after `init`

## Next.js setup

Use this when the consumer app is a Next.js App Router project and you want the same source-copy workflow.

### 1. Install both packages

```bash
npm install -D azamat-ui-kit-cli
npm install azamat-ui-kit
```

### 2. Run template-aware init

```bash
npx azamat-ui-kit-cli init --template next --defaults
```

This should create or update:

- `azamat-ui.json`
- `lib/utils.ts`
- `app/globals.css`
- `tsconfig.json` alias mapping for `@/*`

If missing, `init` can also install:

```txt
tailwindcss
@tailwindcss/postcss
```

### 3. Verify `app/globals.css`

The theme block should be written into `app/globals.css`, not into a package stylesheet import.

### 4. Add first components

```bash
npx azamat-ui-kit-cli add button form-input
```

### 5. Import from local app source

```tsx
import { Button } from "@/components/ui/button"
import { FormInput } from "@/components/form/form-input"
```

### 6. Smoke test in a page

```tsx
import { Button } from "@/components/ui/button"

export default function Page() {
  return <Button>Continue</Button>
}
```

If the component is unstyled, confirm `app/layout.tsx` imports `./globals.css` and restart the dev server after `init`.

## Adoption model

- `foundation package`: small stable primitives, tiny hooks, metadata helpers
- `source-copy reusable`: inputs, forms, feedback, layout, display, calendar, upload
- `source-copy systems`: data-table, resource pages, builders, dashboard shells, templates

Decision rule:

- choose `runtime import` for `Button`, `Input`, `Dialog`, `Popover`, tiny hooks, and other stable primitives
- choose `source-copy` for forms, inputs, calendar, upload, data-table, builders, and any component you expect to edit in your app
- choose `subpath import` only when you intentionally want an advanced helper without copying the whole surface

For the longer-term architecture, see `SOURCE_COPY.md`, `LIBRARY_DISTRIBUTION_ARCHITECTURE.md`, and `INSTALLATION_TEMPLATES.md`.

Large systems such as `DataTable`, `ResourcePage`, `ResourceDetailPage`, and `FormBuilder` should now be treated as source-copy or subpath surfaces, not first-step root imports.

## Naming policy

Public docs should stay family-first even when the package keeps separate exports for implementation convenience.

- docs-first name: `Input`, `Select`, `Card`, `Form Field`, `Data Table`
- grouped public helpers: `InputFamily`, `SelectFamily`, `CardFamily`, `FormFamily`, `DataTableFamily`
- canonical card naming: prefer `InfoCard`; `SmartCard` is transitional
- advanced data-table helpers: `TableExportMenu` and `TableImportButton` are subpath-only helpers, not first-step adoption components

This package exports shared metadata for docs apps and internal tooling:

- `componentFamilyCatalog`
- `componentDocsGroups`
- `componentFamilyMigrationMap`
- `componentMemberMetadata`
- `componentSnippetExamples`

`FormInput` is now the universal RHF text-field entry. Use `kind="search" | "password" | "number" | "phone" | "date"` when you want one primary mental model, and keep `FormSearchInput`, `FormPasswordInput`, `FormNumberInput`, `FormPhoneInput`, and `FormDateInput` only as compatibility aliases.

`FormSelect` is now the universal RHF select entry. Use default simple mode for local options and `kind="async"` for remote loading, while `FormAsyncSelect` remains a compatibility alias.

## Component status

Component readiness is tracked in `COMPONENT_MATURITY.md` and mirrored for the CLI in `cli/registry-status.ts`.

```bash
npx azamat-ui-kit-cli list
```

Statuses:

- `stable`: safe public API for app usage.
- `preview`: reusable, but API may change before a stable release.
- `experimental`: useful internally, but not ready for stable app contracts.
- `internal`: helper metadata or implementation detail.

Stable today: primitives, Base UI wrappers, router-agnostic layout/navigation, feedback/display wrappers and generic action/overlay components. Preview today: inputs, forms, calendar, upload, data-table and resource patterns. Experimental today: `FormBuilder` and presets.

Root package exports now stay intentionally smaller for high-level adoption:

- root import: canonical primitives, reusable wrappers, core charts, public hooks, and small adoption-ready surfaces
- subpath import: advanced action, form, layout, pattern, chart, and data-table helpers that are still being audited as a long-term public contract
- family import: grouped entry objects such as `InputFamily`, `SelectFamily`, `CardFamily`, `FormFamily`, `DataTableFamily`

The package also exports `componentFamilyCatalog`, `componentFamilyMigrationMap`, `componentDocsGroups`, `componentMemberMetadata`, `componentSnippetExamples`, and query helpers like `getFamilyCatalogEntry`, `getComponentFamilyEntry`, `getDocsGroupByComponent`, `getDocsNavigation`, `getComponentMemberMetadata`, `getComponentSnippets`, `getComponentSnippetsByVariant`, `getComponentDocsAdoption`, and `resolveDocsRoute` so a docs app or internal tooling can render family navigation, canonical component routes, route aliases, status badges, recommended adoption order, example snippet tabs, and migration guidance from a single source of truth.

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
6. Stable adoption-ready components export from `src/index.ts`; advanced or transitional helpers can stay on subpath exports until their contract is clear.

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
npx azamat-ui-kit-cli theme src/index.css
```

Dark mode works by toggling the `.dark` class on the root/html element. The theme block also provides `.light` for explicit light-mode class usage.

The generated theme block imports `@fontsource-variable/geist` and `tw-animate-css` into the consumer app CSS, so the CLI installs them into the app during `init`. They are no longer shipped as runtime dependencies of `azamat-ui-kit`.

The CLI now ships as a separate package, `azamat-ui-kit-cli`, so `npm i azamat-ui-kit` stays focused on runtime library dependencies only.

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

```tsx
<FormInput control={control} name="query" kind="search" label="Search" />
<FormInput control={control} name="password" kind="password" label="Password" />
<FormInput control={control} name="price" kind="number" label="Price" min={0} />
<FormSelect control={control} name="role" label="Role" options={roleOptions} />
<FormSelect control={control} name="ownerId" kind="async" label="Owner" loadOptions={loadUsers} />
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
npx azamat-ui-kit-cli theme app/globals.css
```

### ESM import issues

Run `npm run build` in this repo before packing or installing from a local tarball. The build output check rejects ESM browser bundles that contain direct or indirect CommonJS `require` fallbacks.

### Peer dependency mismatch

Install React and React DOM in the consumer app. They are peer dependencies and are intentionally not bundled into the package runtime.

### React Hook Form setup

Form wrappers require `react-hook-form` in the consumer app. Use package imports for reusable wrappers and keep form schema/business validation in the app layer.

The library repo only contains reusable package source, CLI helpers, registry templates, tests, and release files. Public docs, blocks, templates showcase pages, and the marketing site live in the separate `azamat-ui` Next.js app.
