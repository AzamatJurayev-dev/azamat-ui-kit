import * as React from "react"
import { useForm } from "react-hook-form"
import type { ColumnDef, RowSelectionState, SortingState } from "@tanstack/react-table"
import {
  BellIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  CommandIcon,
  Grid2X2Icon,
  LayersIcon,
  ListChecksIcon,
  MoonIcon,
  PanelLeftIcon,
  RocketIcon,
  SettingsIcon,
  SparklesIcon,
  SunIcon,
  UploadCloudIcon,
} from "lucide-react"
import {
  ActionMenu,
  AppHeader,
  AppShell,
  AppSidebar,
  AsyncMultiSelect,
  AsyncSelect,
  Badge,
  Breadcrumbs,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  ClearableInput,
  CommandPalette,
  ConfirmDialog,
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  DateInput,
  DatePicker,
  DateRangeInput,
  DateRangePicker,
  DialogActionButton,
  DialogActions,
  EmptyState,
  FileUpload,
  FilterBar,
  FormAsyncSelect,
  FormDateInput,
  FormDatePicker,
  FormDateRangeInput,
  FormDateRangePicker,
  FormFieldShell,
  FormInput,
  FormNumberInput,
  FormPasswordInput,
  FormPhoneInput,
  FormSearchInput,
  FormSelect,
  FormSwitch,
  FormTextarea,
  ImageUpload,
  Input,
  LoadingState,
  MaskedInput,
  ModalShell,
  MoneyInput,
  NumberInput,
  PageContainer,
  PageHeader,
  PasswordInput,
  PhoneInput,
  QuantityInput,
  SearchInput,
  SheetShell,
  SidebarNav,
  SimpleSelect,
  StatCard,
  StatusBadge,
  Stepper,
  Switch,
  Textarea,
  ToastProvider,
  useCommandPaletteShortcut,
  useToast,
  Wizard,
  createDataTableActionsColumn,
  createDataTableSelectColumn,
} from "./index"

type Product = {
  id: string
  name: string
  sku: string
  status: "active" | "inactive" | "draft"
  price: number
  stock: number
  category: string
}

type ProductFormValues = {
  search: string
  name: string
  password: string
  phone: string
  price: number | null
  status: string
  customerId: string
  active: boolean
  notes: string
  availableFrom: string
  dateFrom: string
  dateTo: string
  pickerDate: string
  pickerRangeFrom: string
  pickerRangeTo: string
}

type DemoSectionProps = React.ComponentProps<"section"> & {
  title: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
}

const products: Product[] = [
  { id: "1", name: "Premium Coffee", sku: "COF-001", status: "active", price: 42000, stock: 32, category: "Drinks" },
  { id: "2", name: "Green Tea", sku: "TEA-002", status: "inactive", price: 18000, stock: 12, category: "Drinks" },
  { id: "3", name: "Chocolate Box", sku: "CHO-003", status: "draft", price: 73000, stock: 0, category: "Snacks" },
  { id: "4", name: "Water Bottle", sku: "WAT-004", status: "active", price: 6000, stock: 160, category: "Drinks" },
  { id: "5", name: "Office Cookies", sku: "COO-005", status: "active", price: 29000, stock: 44, category: "Snacks" },
  { id: "6", name: "Gift Pack", sku: "GIF-006", status: "inactive", price: 128000, stock: 7, category: "Gifts" },
]

const tagOptions = [
  { value: "new", label: "New", description: "Recently added" },
  { value: "popular", label: "Popular", description: "Top selling" },
  { value: "discount", label: "Discount", description: "Has active offer" },
  { value: "warehouse", label: "Warehouse", description: "Stock controlled" },
]

const customerOptions = [
  { value: "1", label: "Azamat Store", description: "Retail customer" },
  { value: "2", label: "Bilimza Academy", description: "Education customer" },
  { value: "3", label: "Distron Market", description: "Wholesale customer" },
]

const wizardSteps = [
  { id: "info", title: "Info", description: "Basic details" },
  { id: "settings", title: "Settings", description: "Options" },
  { id: "finish", title: "Finish", description: "Review" },
]

function getStatusTone(status: Product["status"]) {
  if (status === "active") return "success" as const
  if (status === "inactive") return "muted" as const
  return "warning" as const
}

function formatMoney(value: number) {
  return `${value.toLocaleString()} UZS`
}

function DemoSection({ title, description, action, children, className, ...props }: DemoSectionProps) {
  return (
    <section className={className} {...props}>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  )
}

function PlaygroundCard({
  title,
  description,
  children,
  footer,
  className,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="grid gap-3">{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

function TokenPill({ children }: { children: React.ReactNode }) {
  return <code className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">{children}</code>
}

function PlaygroundForm() {
  const form = useForm<ProductFormValues>({
    defaultValues: {
      search: "",
      name: "Premium Coffee",
      password: "secret123",
      phone: "998901234567",
      price: 42000,
      status: "active",
      customerId: "1",
      active: true,
      notes: "This form shows vertical, horizontal and inline field layouts.",
      availableFrom: "2026-06-17",
      dateFrom: "2026-06-01",
      dateTo: "2026-06-30",
      pickerDate: "2026-06-17",
      pickerRangeFrom: "2026-06-01",
      pickerRangeTo: "2026-06-30",
    },
  })

  return (
    <div className="grid gap-5">
      <div className="grid gap-3 md:grid-cols-2">
        <FormSearchInput
          control={form.control}
          name="search"
          label="Search"
          description="Search wrapper with clear action."
          labelAction={<Button size="xs" variant="ghost">Help</Button>}
        />
        <FormInput
          control={form.control}
          name="name"
          label="Name"
          required
          description="Required field with custom marker."
          requiredIndicator={<span className="ml-1 text-primary">*</span>}
        />
        <FormPasswordInput control={form.control} name="password" label="Password" />
        <FormPhoneInput control={form.control} name="phone" label="Phone" valueMode="raw" />
        <FormNumberInput control={form.control} name="price" label="Price" min={0} />
        <FormDateInput control={form.control} name="availableFrom" label="Native date" />
      </div>

      <FormTextarea
        control={form.control}
        name="notes"
        label="Notes"
        layout="horizontal"
        description="Horizontal field layout with bottom description."
        descriptionPosition="bottom"
      />

      <div className="grid gap-3 md:grid-cols-2">
        <FormSelect
          control={form.control}
          name="status"
          label="Status"
          layout="horizontal"
          options={[
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Draft", value: "draft" },
          ]}
        />
        <FormAsyncSelect
          control={form.control}
          name="customerId"
          label="Customer"
          minSearchLength={1}
          defaultOptions={customerOptions}
          loadOptions={async (value) =>
            customerOptions.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()))
          }
        />
      </div>

      <FormDateRangeInput
        control={form.control}
        fromName="dateFrom"
        toName="dateTo"
        label="Native period"
        layout="horizontal"
      />

      <div className="grid gap-3 md:grid-cols-2">
        <FormDatePicker control={form.control} name="pickerDate" label="Calendar picker" />
        <FormDateRangePicker
          control={form.control}
          fromName="pickerRangeFrom"
          toName="pickerRangeTo"
          label="Calendar range"
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <FormSwitch
          control={form.control}
          name="active"
          label="Active product"
          description="Default label placement."
        />
        <FormSwitch
          control={form.control}
          name="active"
          label="Inline switch"
          labelPlacement="start"
          layout="inline"
          description="The same field with inline layout."
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <FormFieldShell label="Read only" description="Visual read-only state." readOnly>
          <Input value="Read-only value" readOnly />
        </FormFieldShell>
        <FormFieldShell label="Disabled" description="Visual disabled state." disabled>
          <Input value="Disabled value" disabled />
        </FormFieldShell>
        <FormFieldShell label="Error" error="This field has an error." required>
          <Input aria-invalid />
        </FormFieldShell>
      </div>
    </div>
  )
}

function PlaygroundInner() {
  const { addToast } = useToast()
  const [theme, setTheme] = React.useState<"light" | "dark">("light")
  const [radius, setRadius] = React.useState("md")
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [modalOpen, setModalOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [clearable, setClearable] = React.useState("Clear me")
  const [password, setPassword] = React.useState("secret123")
  const [phone, setPhone] = React.useState("+998 90 123 45 67")
  const [masked, setMasked] = React.useState("AA-123")
  const [numberValue, setNumberValue] = React.useState<number | null>(42)
  const [moneyRaw, setMoneyRaw] = React.useState("42000")
  const [quantity, setQuantity] = React.useState<number | null>(3)
  const [simpleValue, setSimpleValue] = React.useState("active")
  const [asyncValue, setAsyncValue] = React.useState<string | undefined>("1")
  const [selectedTags, setSelectedTags] = React.useState<string[]>(["new", "popular"])
  const [dateValue, setDateValue] = React.useState("2026-06-17")
  const [dateRange, setDateRange] = React.useState({ from: "2026-06-01", to: "2026-06-30" })
  const [calendarDate, setCalendarDate] = React.useState("2026-06-17")
  const [calendarRange, setCalendarRange] = React.useState({ from: "2026-06-01", to: "2026-06-30" })
  const [pickerDate, setPickerDate] = React.useState("2026-06-17")
  const [pickerRange, setPickerRange] = React.useState({ from: "2026-06-01", to: "2026-06-30" })
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [tableLoading, setTableLoading] = React.useState(false)
  const [density, setDensity] = React.useState<"compact" | "default" | "comfortable">("default")
  const [files, setFiles] = React.useState<File[]>([])
  const [images, setImages] = React.useState<File[]>([])
  const [wizardStep, setWizardStep] = React.useState("info")
  const [checkbox, setCheckbox] = React.useState(true)
  const [switchChecked, setSwitchChecked] = React.useState(true)

  useCommandPaletteShortcut(setCommandOpen)

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  React.useEffect(() => {
    document.documentElement.dataset.radius = radius
  }, [radius])

  const rejectedFiles = React.useMemo(
    () => [
      {
        file: new File(["demo"], "too-large-demo.pdf", { type: "application/pdf" }),
        reason: "max-size" as const,
        message: "File is larger than 2 MB.",
      },
    ],
    []
  )

  const filteredProducts = React.useMemo(() => {
    const value = search.trim().toLowerCase()
    if (!value) return products
    return products.filter((product) =>
      [product.name, product.sku, product.category, product.status].some((field) => field.toLowerCase().includes(value))
    )
  }, [search])

  const columns = React.useMemo<ColumnDef<Product>[]>(
    () => [
      createDataTableSelectColumn<Product>(),
      {
        accessorKey: "name",
        header: ({ column }) => <DataTableSortableHeader column={column}>Name</DataTableSortableHeader>,
      },
      { accessorKey: "sku", header: "SKU" },
      { accessorKey: "category", header: "Category" },
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
        accessorKey: "stock",
        header: ({ column }) => <DataTableSortableHeader column={column}>Stock</DataTableSortableHeader>,
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => formatMoney(row.original.price),
      },
      createDataTableActionsColumn<Product>({
        getActions: (_row, product) => [
          { key: "view", label: "View", onSelect: () => addToast({ title: "View", description: product.name }) },
          { key: "edit", label: "Edit", onSelect: () => addToast({ title: "Edit", description: product.name }) },
          {
            key: "delete",
            label: "Delete",
            destructive: true,
            onSelect: () => setConfirmOpen(true),
          },
        ],
      }),
    ],
    [addToast]
  )

  const commandGroups = React.useMemo(
    () => [
      {
        id: "navigation",
        label: "Navigation",
        items: [
          { id: "foundation", label: "Foundation", icon: <Grid2X2Icon />, shortcut: "G F", onSelect: () => { location.hash = "foundation" } },
          { id: "forms", label: "Forms", icon: <ListChecksIcon />, shortcut: "G R", onSelect: () => { location.hash = "forms" } },
          { id: "table", label: "Data table", icon: <LayersIcon />, shortcut: "G T", onSelect: () => { location.hash = "table" } },
        ],
      },
      {
        id: "actions",
        label: "Actions",
        items: [
          { id: "toast", label: "Show success toast", icon: <BellIcon />, onSelect: () => addToast({ tone: "success", title: "Command executed", description: "The command palette triggered this toast." }) },
          { id: "modal", label: "Open modal", icon: <PanelLeftIcon />, onSelect: () => setModalOpen(true) },
          { id: "sheet", label: "Open sheet", icon: <SettingsIcon />, onSelect: () => setSheetOpen(true) },
        ],
      },
    ],
    [addToast]
  )

  return (
    <AppShell
      sidebar={
        <AppSidebar
          header={<div className="flex items-center gap-2 font-semibold"><SparklesIcon className="size-4" /> Azamat UI</div>}
          footer={<div className="text-xs text-muted-foreground">CSS-first playground</div>}
        >
          <SidebarNav
            items={[
              { key: "foundation", label: "Foundation", href: "#foundation", active: true, icon: <Grid2X2Icon className="size-4" /> },
              { key: "inputs", label: "Inputs", href: "#inputs", icon: <SettingsIcon className="size-4" /> },
              { key: "forms", label: "Forms", href: "#forms", icon: <ListChecksIcon className="size-4" /> },
              { key: "table", label: "Data table", href: "#table", icon: <LayersIcon className="size-4" /> },
              { key: "upload", label: "Upload", href: "#upload", icon: <UploadCloudIcon className="size-4" /> },
              { key: "calendar", label: "Calendar", href: "#calendar", icon: <CalendarDaysIcon className="size-4" /> },
            ]}
          />
        </AppSidebar>
      }
      header={
        <AppHeader
          left={<span className="font-semibold">UI Kit Playground</span>}
          center={<Breadcrumbs items={[{ key: "home", label: "UI Kit", href: "#foundation" }, { key: "playground", label: "Playground" }]} />}
          right={
            <>
              <Button variant="outline" size="sm" onClick={() => setCommandOpen(true)}>
                <CommandIcon data-icon="inline-start" /> Command
              </Button>
              <Button variant="ghost" size="icon-sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </Button>
            </>
          }
        />
      }
      mainClassName="p-4 lg:p-6"
    >
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} groups={commandGroups} />

      <PageContainer size="xl">
        <PageHeader
          title="Azamat UI Kit"
          description="Mock playground for reusable dashboard components, CSS tokens and advanced states."
          eyebrow="Playground"
          actions={
            <ActionMenu
              label="Page actions"
              actions={[
                { key: "modal", label: "Open modal", onSelect: () => setModalOpen(true) },
                { key: "sheet", label: "Open sheet", onSelect: () => setSheetOpen(true) },
                { key: "toast", label: "Show toast", onSelect: () => addToast({ tone: "info", title: "Hello", description: "This is a toast from ActionMenu." }) },
              ]}
            />
          }
        />

        <DemoSection id="foundation" title="Foundation" description="Primitive UI, badges, cards, status tones and CSS token switches.">
          <div className="grid gap-4 lg:grid-cols-3">
            <PlaygroundCard title="Button variants" description="All common variants and sizes." footer={<span className="text-xs text-muted-foreground">CSS token: --aui-control-radius</span>}>
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button size="xs">XS</Button>
                <Button size="sm">SM</Button>
                <Button>Default</Button>
                <Button size="lg">LG</Button>
                <Button size="icon-sm"><RocketIcon /></Button>
              </div>
            </PlaygroundCard>

            <PlaygroundCard title="Badges and status" description="Generic badge variants and status tones.">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <StatusBadge tone="success" dot>Success</StatusBadge>
                <StatusBadge tone="warning" dot>Warning</StatusBadge>
                <StatusBadge tone="danger" dot>Danger</StatusBadge>
                <StatusBadge tone="info" dot>Info</StatusBadge>
                <StatusBadge tone="muted" dot>Muted</StatusBadge>
              </div>
            </PlaygroundCard>

            <PlaygroundCard title="CSS tokens" description="Radius and dark/light are CSS controlled.">
              <div className="flex flex-wrap gap-2">
                {['none', 'sm', 'md', 'lg', 'xl'].map((item) => (
                  <Button key={item} variant={radius === item ? "default" : "outline"} size="sm" onClick={() => setRadius(item)}>
                    {item}
                  </Button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <TokenPill>--aui-card-radius</TokenPill>
                <TokenPill>--aui-card-shadow</TokenPill>
                <TokenPill>--aui-table-header-bg</TokenPill>
              </div>
            </PlaygroundCard>
          </div>
        </DemoSection>

        <section className="grid gap-4 md:grid-cols-3">
          <StatCard title="Components" value="80+" icon={<SparklesIcon />} trend={{ value: "+polished", tone: "success" }} description="Reusable UI coverage" />
          <StatCard title="Theming" value="CSS-first" icon={<SettingsIcon />} description="data-slot + variables" />
          <StatCard title="QA" value="Playground" icon={<CheckCircle2Icon />} description="Manual visual checks" />
        </section>

        <DemoSection id="inputs" title="Inputs and selects" description="Standalone data-entry components with controlled mock state.">
          <div className="grid gap-4 lg:grid-cols-3">
            <PlaygroundCard title="Text inputs">
              <Input placeholder="Primitive input" />
              <Textarea placeholder="Primitive textarea" />
              <SearchInput value={search} onValueChange={setSearch} placeholder="Search products..." />
              <ClearableInput value={clearable} onValueChange={setClearable} placeholder="Clearable input" />
              <MaskedInput value={masked} onValueChange={setMasked} mask={(value) => value.toUpperCase().slice(0, 6)} placeholder="Masked input" />
            </PlaygroundCard>

            <PlaygroundCard title="Numeric and phone inputs">
              <PhoneInput value={phone} onValueChange={(value) => setPhone(value)} />
              <NumberInput value={numberValue} min={0} max={100} onNumberChange={setNumberValue} />
              <MoneyInput value={moneyRaw} prefix="UZS" onValueChange={(_value, raw) => setMoneyRaw(raw)} />
              <QuantityInput value={quantity} min={0} max={10} onValueChange={setQuantity} />
              <DateInput value={dateValue} onValueChange={setDateValue} />
              <DateRangeInput value={dateRange} onValueChange={(value) => setDateRange({ from: value.from ?? "", to: value.to ?? "" })} />
            </PlaygroundCard>

            <PlaygroundCard title="Selects and booleans">
              <PasswordInput value={password} onValueChange={setPassword} placeholder="Password" />
              <SimpleSelect value={simpleValue} onValueChange={setSimpleValue} options={[
                { label: "Active", value: "active", description: "Visible" },
                { label: "Inactive", value: "inactive", description: "Hidden" },
                { label: "Draft", value: "draft", disabled: true },
              ]} />
              <AsyncSelect
                value={asyncValue}
                onValueChange={setAsyncValue}
                selectedOption={customerOptions.find((item) => item.value === asyncValue)}
                minSearchLength={1}
                cacheTtl={30_000}
                defaultOptions={customerOptions}
                loadOptions={async (value) => customerOptions.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()))}
                labels={{ placeholder: "Async customer", minSearchLength: (count) => `Type ${count}+ character` }}
              />
              <AsyncMultiSelect
                value={selectedTags}
                onValueChange={setSelectedTags}
                defaultOptions={[{ label: "Tags", options: tagOptions }]}
                loadOptions={async (value) => [{ label: "Tags", options: tagOptions.filter((tag) => tag.label.toLowerCase().includes(value.toLowerCase())) }]}
                maxSelected={3}
                showSelectAll
                labels={{ placeholder: "Select tags", selectedCount: (count) => `${count} selected` }}
              />
              <div className="flex items-center gap-3 text-sm">
                <Checkbox checked={checkbox} onCheckedChange={setCheckbox} /> Checkbox
                <Switch checked={switchChecked} onCheckedChange={setSwitchChecked} /> Switch
              </div>
            </PlaygroundCard>
          </div>
        </DemoSection>

        <DemoSection id="forms" title="Form wrappers" description="React Hook Form wrappers with hardened field shell props.">
          <Card>
            <CardContent>
              <PlaygroundForm />
            </CardContent>
          </Card>
        </DemoSection>

        <DemoSection id="table" title="DataTable" description="Density, selection, actions, skeletons, striped/bordered mode and sticky header.">
          <Card>
            <CardHeader>
              <CardTitle>Products table</CardTitle>
              <CardDescription>Try search, density, loading skeleton, row click and column visibility.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-3 flex flex-wrap gap-2">
                {(['compact', 'default', 'comfortable'] as const).map((item) => (
                  <Button key={item} variant={density === item ? "default" : "outline"} size="sm" onClick={() => setDensity(item)}>
                    {item}
                  </Button>
                ))}
                <Button variant={tableLoading ? "default" : "outline"} size="sm" onClick={() => setTableLoading((value) => !value)}>
                  Toggle skeleton
                </Button>
              </div>
              <DataTable
                columns={columns}
                data={filteredProducts}
                rowSelection={rowSelection}
                onRowSelectionChange={setRowSelection}
                sorting={sorting}
                onSortingChange={setSorting}
                enableRowSelection
                density={density}
                striped
                bordered
                stickyHeader
                isLoading={tableLoading}
                loadingVariant="skeleton"
                getRowDisabled={(row) => row.original.status === "draft"}
                onRowClick={(row) => addToast({ title: "Row clicked", description: row.original.name })}
                onRowDoubleClick={(row) => addToast({ tone: "success", title: "Double click", description: row.original.sku })}
                emptyState={{ title: "No products", description: "Try clearing the search input." }}
                toolbarProps={(table) => ({
                  title: "Products",
                  search: <FilterBar search={<SearchInput value={search} onValueChange={setSearch} placeholder="Search table..." />} activeCount={search ? 1 : 0} onReset={() => setSearch("")} />,
                  actions: <DataTableColumnVisibilityMenu table={table} />,
                  selectionActions: (
                    <DataTableBulkActions
                      rows={table.getSelectedRowModel().rows.map((row) => row.original)}
                      actions={[{ key: "delete", label: "Delete selected", destructive: true, onSelect: (rows) => addToast({ tone: "warning", title: "Bulk action", description: `${rows.length} rows selected.` }) }]}
                      onClearSelection={() => setRowSelection({})}
                    />
                  ),
                })}
                pagination={{ pageIndex: 0, pageSize: 10, rowCount: filteredProducts.length, pageCount: 1 }}
              />
            </CardContent>
          </Card>
        </DemoSection>

        <DemoSection id="upload" title="Upload" description="Drag/drop, validation, rejected files, progress and image previews.">
          <div className="grid gap-4 lg:grid-cols-2">
            <PlaygroundCard title="FileUpload" description="Client-side validation only; app owns real upload logic.">
              <FileUpload
                files={files}
                onFilesChange={setFiles}
                rejectedFiles={rejectedFiles}
                accept=".pdf,.xlsx,image/*"
                maxFiles={3}
                maxSize={2 * 1024 * 1024}
                progress={55}
                dropzoneDescription="Accepts PDF, Excel and images. Max 3 files."
              />
            </PlaygroundCard>
            <PlaygroundCard title="ImageUpload" description="Image previews use object URLs and clean up automatically.">
              <ImageUpload files={images} onFilesChange={setImages} maxFiles={4} maxSize={2 * 1024 * 1024} />
            </PlaygroundCard>
          </div>
        </DemoSection>

        <DemoSection id="calendar" title="Calendar and pickers" description="Single/range calendar plus popover pickers.">
          <div className="grid gap-4 lg:grid-cols-4">
            <PlaygroundCard title="Calendar single">
              <Calendar value={calendarDate} onValueChange={setCalendarDate} />
            </PlaygroundCard>
            <PlaygroundCard title="Calendar range">
              <Calendar mode="range" range={calendarRange} onRangeChange={(value) => setCalendarRange({ from: value.from ?? "", to: value.to ?? "" })} />
            </PlaygroundCard>
            <PlaygroundCard title="DatePicker">
              <DatePicker value={pickerDate} onValueChange={setPickerDate} />
            </PlaygroundCard>
            <PlaygroundCard title="DateRangePicker">
              <DateRangePicker value={pickerRange} onValueChange={(value) => setPickerRange({ from: value.from ?? "", to: value.to ?? "" })} />
            </PlaygroundCard>
          </div>
        </DemoSection>

        <DemoSection title="Overlay and feedback" description="Modal, sheet, confirm, empty/loading states and toasts.">
          <div className="grid gap-4 lg:grid-cols-3">
            <PlaygroundCard title="Overlay controls">
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                <Button variant="outline" onClick={() => setSheetOpen(true)}>Open sheet</Button>
                <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Confirm</Button>
              </div>
              <DialogActions>
                <DialogActionButton variant="outline">Cancel</DialogActionButton>
                <DialogActionButton isLoading loadingLabel="Saving...">Save</DialogActionButton>
              </DialogActions>
            </PlaygroundCard>
            <EmptyState title="Empty state" description="Use this when there is no data yet." actionLabel="Create" onAction={() => addToast({ title: "Create clicked" })} />
            <LoadingState label="Loading state" description="Use this while async data is loading." />
          </div>
        </DemoSection>

        <DemoSection title="Command and wizard" description="Keyboard command palette and multi-step flow.">
          <div className="grid gap-4 lg:grid-cols-2">
            <PlaygroundCard title="Command palette">
              <Button onClick={() => setCommandOpen(true)}><CommandIcon data-icon="inline-start" /> Open command palette</Button>
              <p className="text-sm text-muted-foreground">Shortcut: Ctrl/Cmd + K</p>
            </PlaygroundCard>
            <PlaygroundCard title="Stepper and wizard">
              <Stepper steps={wizardSteps} currentStep={wizardStep} onStepChange={setWizardStep} />
              <Wizard
                steps={wizardSteps}
                currentStep={wizardStep}
                onStepChange={setWizardStep}
                onPrevious={() => setWizardStep(wizardSteps[Math.max(wizardSteps.findIndex((step) => step.id === wizardStep) - 1, 0)].id)}
                onNext={() => setWizardStep(wizardSteps[Math.min(wizardSteps.findIndex((step) => step.id === wizardStep) + 1, wizardSteps.length - 1)].id)}
                onFinish={() => addToast({ tone: "success", title: "Wizard finished" })}
              >
                <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                  Current step: <strong className="text-foreground">{wizardStep}</strong>
                </div>
              </Wizard>
            </PlaygroundCard>
          </div>
        </DemoSection>
      </PageContainer>

      <ModalShell
        open={modalOpen}
        onOpenChange={setModalOpen}
        title="Reusable modal"
        description="ModalShell wraps the dialog primitive for dashboard usage."
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
      >
        <p className="text-sm text-muted-foreground">This modal is controlled by props and does not contain business logic.</p>
      </ModalShell>

      <SheetShell
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Reusable sheet"
        description="SheetShell supports side, header, body and footer slots."
        footer={<Button onClick={() => setSheetOpen(false)}>Done</Button>}
      >
        <div className="grid gap-3">
          <Input placeholder="Sheet input" />
          <Textarea placeholder="Sheet textarea" />
        </div>
      </SheetShell>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete product?"
        description="This demo only closes the dialog. Real delete logic belongs to the app."
        confirmText="Delete"
        confirmVariant="destructive"
        onConfirm={() => {
          setConfirmOpen(false)
          addToast({ tone: "danger", title: "Delete confirmed", description: "No real data was removed." })
        }}
      />
    </AppShell>
  )
}

export default function App() {
  return (
    <ToastProvider position="top-right">
      <PlaygroundInner />
    </ToastProvider>
  )
}
