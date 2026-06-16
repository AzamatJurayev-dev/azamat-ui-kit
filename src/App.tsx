import * as React from "react"
import { useForm } from "react-hook-form"
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import {
  ActionMenu,
  AppHeader,
  AppShell,
  AppSidebar,
  AsyncMultiSelect,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  DataTable,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  EmptyState,
  FilterBar,
  FormDateInput,
  FormDateRangeInput,
  FormInput,
  FormNumberInput,
  FormPasswordInput,
  FormPhoneInput,
  FormSearchInput,
  FormSelect,
  FormSwitch,
  LoadingState,
  ModalShell,
  PageContainer,
  PageHeader,
  PasswordInput,
  PhoneInput,
  SearchInput,
  StatCard,
  StatusBadge,
  createDataTableSelectColumn,
} from "./index"

type Product = {
  id: string
  name: string
  sku: string
  status: "active" | "inactive" | "draft"
  price: number
}

type ProductFormValues = {
  search: string
  name: string
  password: string
  phone: string
  price: number | null
  status: string
  active: boolean
  availableFrom: string
  dateFrom: string
  dateTo: string
}

const products: Product[] = [
  { id: "1", name: "Premium Coffee", sku: "COF-001", status: "active", price: 42000 },
  { id: "2", name: "Green Tea", sku: "TEA-002", status: "inactive", price: 18000 },
  { id: "3", name: "Chocolate Box", sku: "CHO-003", status: "draft", price: 73000 },
  { id: "4", name: "Water Bottle", sku: "WAT-004", status: "active", price: 6000 },
]

const tagOptions = [
  { value: "new", label: "New" },
  { value: "popular", label: "Popular" },
  { value: "discount", label: "Discount" },
  { value: "warehouse", label: "Warehouse" },
]

function getStatusTone(status: Product["status"]) {
  if (status === "active") return "success" as const
  if (status === "inactive") return "muted" as const
  return "warning" as const
}

function PlaygroundCard({
  title,
  description,
  children,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

function PlaygroundForm() {
  const form = useForm<ProductFormValues>({
    defaultValues: {
      search: "",
      name: "",
      password: "",
      phone: "",
      price: null,
      status: "active",
      active: true,
      availableFrom: "",
      dateFrom: "",
      dateTo: "",
    },
  })

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <FormSearchInput control={form.control} name="search" label="Search" />
      <FormInput control={form.control} name="name" label="Name" required />
      <FormPasswordInput control={form.control} name="password" label="Password" />
      <FormPhoneInput control={form.control} name="phone" label="Phone" valueMode="raw" />
      <FormNumberInput control={form.control} name="price" label="Price" min={0} />
      <FormDateInput control={form.control} name="availableFrom" label="Available from" />
      <FormDateRangeInput
        control={form.control}
        fromName="dateFrom"
        toName="dateTo"
        label="Period"
        className="md:col-span-2"
      />
      <FormSelect
        control={form.control}
        name="status"
        label="Status"
        options={[
          { label: "Active", value: "active" },
          { label: "Inactive", value: "inactive" },
          { label: "Draft", value: "draft" },
        ]}
      />
      <FormSwitch
        control={form.control}
        name="active"
        label="Active"
        description="Show this product in the app."
      />
    </div>
  )
}

export default function App() {
  const [search, setSearch] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [selectedTags, setSelectedTags] = React.useState<string[]>(["new"])
  const [modalOpen, setModalOpen] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      createDataTableSelectColumn<Product>(),
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableSortableHeader column={column}>Name</DataTableSortableHeader>,
      },
      {
        accessorKey: "sku",
        header: "SKU",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge tone={getStatusTone(row.original.status)} dot>
            {row.original.status}
          </StatusBadge>
        ),
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => `${row.original.price.toLocaleString()} UZS`,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <ActionMenu
            actions={[
              { key: "view", label: "View", onSelect: () => console.log("view", row.original) },
              { key: "edit", label: "Edit", onSelect: () => console.log("edit", row.original) },
              {
                key: "delete",
                label: "Delete",
                destructive: true,
                onSelect: () => setConfirmOpen(true),
              },
            ]}
          />
        ),
      },
    ],
    []
  )

  return (
    <AppShell
      sidebar={
        <AppSidebar
          header={<div className="font-semibold">Azamat UI</div>}
          items={[
            { key: "overview", label: "Overview", href: "#overview", active: true },
            { key: "forms", label: "Forms", href: "#forms" },
            { key: "table", label: "Data table", href: "#table" },
          ]}
          footer={<div className="text-xs text-muted-foreground">Playground</div>}
        />
      }
      header={
        <AppHeader
          left={<span className="font-semibold">UI Kit Playground</span>}
          right={<Button onClick={() => setModalOpen(true)}>Open modal</Button>}
        />
      }
      mainClassName="p-4 lg:p-6"
    >
      <PageContainer size="xl">
        <PageHeader
          title="Azamat UI Kit"
          description="Reusable dashboard components, form wrappers, async selects and data table helpers."
          actions={
            <ActionMenu
              label="Project"
              actions={[
                { key: "build", label: "Run build", onSelect: () => console.log("npm run build") },
                { key: "docs", label: "Open docs", onSelect: () => console.log("docs") },
              ]}
            />
          }
        />

        <section id="overview" className="grid gap-4 md:grid-cols-3">
          <StatCard title="Components" value="60+" description="Reusable building blocks" />
          <StatCard title="Forms" value="12" trend={{ value: "Advanced", tone: "success" }} />
          <StatCard title="Theme" value="Dark/Light" description="CSS variable based" />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <PlaygroundCard title="Advanced inputs" description="Search, password and phone inputs.">
            <div className="grid gap-3">
              <SearchInput value={search} onValueChange={setSearch} placeholder="Search products..." />
              <PasswordInput value={password} onValueChange={setPassword} placeholder="Password" />
              <PhoneInput
                value={phone}
                placeholder="Phone"
                onValueChange={(masked) => setPhone(masked)}
              />
              <AsyncMultiSelect
                value={selectedTags}
                onValueChange={setSelectedTags}
                defaultOptions={tagOptions}
                loadOptions={async (value) =>
                  tagOptions.filter((tag) => tag.label.toLowerCase().includes(value.toLowerCase()))
                }
                labels={{
                  placeholder: "Select tags",
                  selectedCount: (count) => `${count} selected`,
                }}
              />
            </div>
          </PlaygroundCard>

          <PlaygroundCard id="forms" title="Form wrappers" description="React Hook Form connected inputs.">
            <PlaygroundForm />
          </PlaygroundCard>
        </section>

        <PlaygroundCard id="table" title="Data table" description="Selection, visibility menu and actions.">
          <DataTable
            columns={columns}
            data={products}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            enableRowSelection
            emptyState={{ title: "No products", description: "Try changing filters." }}
            toolbarProps={(table) => ({
              title: "Products",
              search: (
                <FilterBar
                  search={<SearchInput value={search} onValueChange={setSearch} placeholder="Search table..." />}
                  activeCount={search ? 1 : 0}
                  onReset={() => setSearch("")}
                />
              ),
              actions: <DataTableColumnVisibilityMenu table={table} />,
              selectionActions: <Button size="sm">Bulk action</Button>,
            })}
            pagination={{
              pageIndex: 0,
              pageSize: 10,
              rowCount: products.length,
              pageCount: 1,
            }}
          />
        </PlaygroundCard>

        <section className="grid gap-4 md:grid-cols-2">
          <EmptyState title="Empty state" description="Use this when there is no data yet." />
          <LoadingState label="Loading state" description="Use this while data is loading." />
        </section>
      </PageContainer>

      <ModalShell
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Reusable modal"
        description="ModalShell wraps the dialog primitive for dashboard usage."
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
      >
        <p className="text-sm text-muted-foreground">
          This modal is controlled by props and does not contain business logic.
        </p>
      </ModalShell>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete product?"
        description="This demo only closes the dialog. Real delete logic belongs to the app."
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => setConfirmOpen(false)}
      />
    </AppShell>
  )
}
