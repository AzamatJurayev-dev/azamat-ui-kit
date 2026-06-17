import * as React from "react"
import { useForm } from "react-hook-form"
import type { ColumnDef, RowSelectionState, VisibilityState } from "@tanstack/react-table"
import {
  BellIcon,
  CalendarDaysIcon,
  CheckCircle2Icon,
  FileUpIcon,
  ImageIcon,
  LayoutDashboardIcon,
  PackageIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  Table2Icon,
  UploadCloudIcon,
  ZapIcon,
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
  LoadingState,
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
  ToastProvider,
  Wizard,
  createDataTableActionsColumn,
  createDataTableSelectColumn,
  useCommandPaletteShortcut,
  useToast,
} from "./index"

type Product = {
  id: string
  name: string
  sku: string
  status: "active" | "inactive" | "draft"
  price: number
  stock?: number
  disabled?: boolean
}

type PlaygroundFormValues = {
  search: string
  name: string
  description: string
  password: string
  phone: string
  price: number | null
  status: string
  categoryId: string
  active: boolean
  availableFrom: string
  dateFrom: string
  dateTo: string
  pickerDate: string
  pickerFrom: string
  pickerTo: string
}

type DemoOption = {
  value: string
  label: string
  description?: string
}

const products: Product[] = [
  { id: "1", name: "Premium Coffee", sku: "COF-001", status: "active", price: 42000, stock: 18 },
  { id: "2", name: "Green Tea", sku: "TEA-002", status: "inactive", price: 18000, stock: 0, disabled: true },
  { id: "3", name: "Chocolate Box", sku: "CHO-003", status: "draft", price: 73000 },
  { id: "4", name: "Water Bottle", sku: "WAT-004", status: "active", price: 6000, stock: 220 },
  { id: "5", name: "Organic Honey", sku: "HON-005", status: "active", price: 88000, stock: 14 },
]

const tagOptions: DemoOption[] = [
  { value: "new", label: "New", description: "Recently added" },
  { value: "popular", label: "Popular", description: "High demand" },
  { value: "discount", label: "Discount", description: "Promotion" },
  { value: "warehouse", label: "Warehouse", description: "Stock tracking" },
  { value: "seasonal", label: "Seasonal", description: "Limited time" },
]

const categoryOptions: DemoOption[] = [
  { value: "coffee", label: "Coffee", description: "Hot drinks" },
  { value: "tea", label: "Tea", description: "Tea products" },
  { value: "snacks", label: "Snacks", description: "Small foods" },
]

const simpleOptions = [
  { value: "active", label: "Active", description: "Visible in app" },
  { value: "inactive", label: "Inactive", description: "Hidden from users" },
  { value: "draft", label: "Draft", description: "Work in progress" },
]

const wizardSteps = [
  { id: "info", title: "Info", description: "Basic data" },
  { id: "media", title: "Media", description: "Upload files" },
  { id: "review", title: "Review", description: "Confirm" },
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
  footer,
  ...props
}: React.ComponentProps<typeof Card> & {
  title: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
}) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}

function SectionTitle({ title, description }: { title: React.ReactNode; description?: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  )
}

function delay<TValue>(value: TValue, timeout = 300) {
  return new Promise<TValue>((resolve) => {
    window.setTimeout(() => resolve(value), timeout)
  })
}

async function loadTagOptions(search: string) {
  const normalized = search.toLowerCase()
  const filtered = tagOptions.filter((tag) => tag.label.toLowerCase().includes(normalized))

  return delay([
    {
      label: "Product tags",
      options: filtered,
    },
  ])
}

async function loadCategoryOptions(search: string) {
  const normalized = search.toLowerCase()

  return delay(
    categoryOptions.filter((category) => category.label.toLowerCase().includes(normalized)),
    250
  )
}

function PlaygroundForm() {
  const form = useForm<PlaygroundFormValues>({
    defaultValues: {
      search: "",
      name: "Premium Coffee",
      description: "Reusable product form example.",
      password: "secret123",
      phone: "998901234567",
      price: 42000,
      status: "active",
      categoryId: "coffee",
      active: true,
      availableFrom: "2026-06-17",
      dateFrom: "2026-06-01",
      dateTo: "2026-06-30",
      pickerDate: "2026-06-17",
      pickerFrom: "2026-06-01",
      pickerTo: "2026-06-30",
    },
  })

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2">
        <FormSearchInput control={form.control} name="search" label="Search" description="Basic search form wrapper." />
        <FormInput
          control={form.control}
          name="name"
          label="Name"
          required
          labelAction={<Button size="xs" variant="ghost">Auto fill</Button>}
        />
        <FormPasswordInput control={form.control} name="password" label="Password" description="Toggle visibility." />
        <FormPhoneInput control={form.control} name="phone" label="Phone" valueMode="raw" />
        <FormNumberInput control={form.control} name="price" label="Price" min={0} step={1000} />
        <FormSelect control={form.control} name="status" label="Status" options={simpleOptions} />
        <FormAsyncSelect
          control={form.control}
          name="categoryId"
          label="Async category"
          description="Remote-like async select."
          loadOptions={loadCategoryOptions}
          defaultOptions={categoryOptions}
          cacheTtl={10_000}
        />
        <FormSwitch
          control={form.control}
          name="active"
          label="Active"
          description="Show this product in the app."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormTextarea
          control={form.control}
          name="description"
          label="Description"
          descriptionPosition="bottom"
          description="Textarea supports the same shell props."
          className="md:col-span-2"
        />
        <FormDateInput control={form.control} name="availableFrom" label="Native date input" />
        <FormDatePicker control={form.control} name="pickerDate" label="Popover date picker" />
        <FormDateRangeInput
          control={form.control}
          fromName="dateFrom"
          toName="dateTo"
          label="Native date range"
        />
        <FormDateRangePicker
          control={form.control}
          fromName="pickerFrom"
          toName="pickerTo"
          label="Popover date range"
        />
      </div>

      <PlaygroundCard title="FormFieldShell layouts" description="Vertical, horizontal and inline visual states." size="sm">
        <div className="grid gap-4">
          <FormFieldShell
            label="Horizontal field"
            description="Label and content are split into columns."
            layout="horizontal"
            labelAction={<Badge variant="outline">Action</Badge>}
            required
          >
            <SearchInput placeholder="Horizontal layout" />
          </FormFieldShell>
          <FormFieldShell
            label="Inline field"
            description="Good for compact filters."
            layout="inline"
            descriptionPosition="bottom"
            error="Inline validation message"
          >
            <SimpleSelect options={simpleOptions} placeholder="Inline select" />
          </FormFieldShell>
          <FormFieldShell label="Read only" description="Visual readonly state." readOnly>
            <ClearableInput value="Readonly value" readOnly />
          </FormFieldShell>
        </div>
      </PlaygroundCard>
    </div>
  )
}

function PlaygroundContent() {
  const { addToast, clearToasts } = useToast()
  const [search, setSearch] = React.useState("")
  const [clearableValue, setClearableValue] = React.useState("Editable value")
  const [password, setPassword] = React.useState("secret123")
  const [phone, setPhone] = React.useState("+998 90 123 45 67")
  const [money, setMoney] = React.useState<string | number>(42000)
  const [quantity, setQuantity] = React.useState<number | null>(3)
  const [numberValue, setNumberValue] = React.useState<number | null>(12)
  const [dateValue, setDateValue] = React.useState("2026-06-17")
  const [dateRange, setDateRange] = React.useState({ from: "2026-06-01", to: "2026-06-30" })
  const [calendarDate, setCalendarDate] = React.useState("2026-06-17")
  const [calendarRange, setCalendarRange] = React.useState({ from: "2026-06-10", to: "2026-06-20" })
  const [singleTag, setSingleTag] = React.useState<string | undefined>("popular")
  const [selectedTags, setSelectedTags] = React.useState<string[]>(["new", "warehouse"])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [modalOpen, setModalOpen] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)
  const [confirmOpen, setConfirmOpen] = React.useState(false)
  const [commandOpen, setCommandOpen] = React.useState(false)
  const [files, setFiles] = React.useState<File[]>([])
  const [images, setImages] = React.useState<File[]>([])
  const [wizardStep, setWizardStep] = React.useState("info")
  const [tableLoading, setTableLoading] = React.useState(false)

  useCommandPaletteShortcut(setCommandOpen)

  const filteredProducts = React.useMemo(() => {
    const normalized = search.toLowerCase()
    if (!normalized) return products
    return products.filter((product) => product.name.toLowerCase().includes(normalized) || product.sku.toLowerCase().includes(normalized))
  }, [search])

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
        accessorKey: "stock",
        header: "Stock fallback",
        cell: ({ row }) => row.original.stock ?? "",
      },
      {
        accessorKey: "price",
        header: ({ column }) => <DataTableSortableHeader column={column}>Price</DataTableSortableHeader>,
        cell: ({ row }) => `${row.original.price.toLocaleString()} UZS`,
      },
      createDataTableActionsColumn<Product>({
        getActions: (_row, product) => [
          {
            key: "view",
            label: "View",
            onSelect: () => addToast({ title: product.name, description: "View action clicked." }),
          },
          {
            key: "edit",
            label: "Edit",
            onSelect: () => addToast({ tone: "info", title: "Edit", description: product.sku }),
          },
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

  const selectedRows = React.useMemo(() => {
    const selectedIds = new Set(Object.keys(rowSelection))
    return filteredProducts.filter((product) => selectedIds.has(product.id))
  }, [filteredProducts, rowSelection])

  const currentWizardIndex = wizardSteps.findIndex((step) => step.id === wizardStep)
  const goNextWizardStep = () => setWizardStep(wizardSteps[Math.min(currentWizardIndex + 1, wizardSteps.length - 1)].id)
  const goPreviousWizardStep = () => setWizardStep(wizardSteps[Math.max(currentWizardIndex - 1, 0)].id)

  return (
    <AppShell
      sidebar={
        <AppSidebar
          header={<div className="font-semibold">Azamat UI</div>}
          footer={<div className="text-xs text-muted-foreground">Playground • mock data</div>}
        >
          <SidebarNav
            items={[
              { key: "overview", label: "Overview", href: "#overview", active: true, icon: <LayoutDashboardIcon /> },
              { key: "primitives", label: "Primitives", href: "#primitives", icon: <SparklesIcon /> },
              { key: "inputs", label: "Inputs", href: "#inputs", icon: <SearchIcon /> },
              { key: "forms", label: "Forms", href: "#forms", icon: <SettingsIcon /> },
              { key: "table", label: "Data table", href: "#table", icon: <Table2Icon />, badge: "new" },
              { key: "upload", label: "Upload", href: "#upload", icon: <UploadCloudIcon /> },
              { key: "calendar", label: "Calendar", href: "#calendar", icon: <CalendarDaysIcon /> },
            ]}
          />
        </AppSidebar>
      }
      header={
        <AppHeader
          left={<span className="font-semibold">UI Kit Playground</span>}
          center={<Breadcrumbs items={[{ key: "home", label: "UI Kit", href: "#overview" }, { key: "playground", label: "Playground" }]} />}
          right={
            <>
              <Button variant="outline" onClick={() => setCommandOpen(true)}>⌘K</Button>
              <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            </>
          }
        />
      }
      mainClassName="p-4 lg:p-6"
    >
      <PageContainer size="xl">
        <PageHeader
          title="Azamat UI Kit"
          eyebrow="Full component preview"
          description="Mock playground for primitives, inputs, forms, overlays, data table, uploads, calendar, toast, command palette and wizard components."
          meta={<span>Run <code className="rounded bg-muted px-1 py-0.5">npm run dev</code> to preview changes locally.</span>}
          actions={
            <ActionMenu
              label="Project"
              actions={[
                { key: "toast", label: "Show success toast", icon: <BellIcon />, onSelect: () => addToast({ tone: "success", title: "Saved", description: "Toast from ActionMenu." }) },
                { key: "sheet", label: "Open sheet", onSelect: () => setSheetOpen(true) },
                { key: "clear", label: "Clear toasts", onSelect: clearToasts },
              ]}
            />
          }
        />

        <section id="overview" className="grid gap-4 md:grid-cols-3">
          <StatCard title="Components" value="80+" icon={<PackageIcon />} description="Reusable building blocks" />
          <StatCard title="Forms" value="Hardened" trend={{ value: "+ advanced props", tone: "success" }} />
          <StatCard title="Theme" value="Dark/Light" description="CSS variable based" action={<StatusBadge tone="info">tokenized</StatusBadge>} />
        </section>

        <section id="primitives" className="grid gap-4">
          <SectionTitle title="Primitives and feedback" description="Button, Badge, StatusBadge, Card, EmptyState and LoadingState variations." />
          <div className="grid gap-4 lg:grid-cols-2">
            <PlaygroundCard title="Button variants" description="Variants and sizes used across the library.">
              <div className="flex flex-wrap gap-2">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
                <Button size="xs">XS</Button>
                <Button size="sm">SM</Button>
                <Button size="lg">LG</Button>
                <Button size="icon-sm" aria-label="icon"><ZapIcon /></Button>
              </div>
            </PlaygroundCard>

            <PlaygroundCard title="Badges and states" description="Badge and StatusBadge tone coverage.">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <StatusBadge tone="success" dot>success</StatusBadge>
                <StatusBadge tone="warning" dot>warning</StatusBadge>
                <StatusBadge tone="danger" dot>danger</StatusBadge>
                <StatusBadge tone="info" dot>info</StatusBadge>
                <StatusBadge tone="muted" dot>muted</StatusBadge>
              </div>
            </PlaygroundCard>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <EmptyState title="Empty state" description="Use this when there is no data yet." actionLabel="Create item" onAction={() => addToast({ title: "Empty action" })} />
            <LoadingState label="Loading state" description="Use this while data is loading." />
          </div>
        </section>

        <section id="inputs" className="grid gap-4">
          <SectionTitle title="Inputs" description="Standalone primitive wrappers and async select behavior." />
          <div className="grid gap-4 lg:grid-cols-2">
            <PlaygroundCard title="Text and numeric inputs" description="Search, clearable, password, phone, number, money and quantity.">
              <div className="grid gap-3">
                <SearchInput value={search} onValueChange={setSearch} placeholder="Search products..." />
                <ClearableInput value={clearableValue} onValueChange={setClearableValue} leadingIcon={<SearchIcon />} />
                <PasswordInput value={password} onValueChange={setPassword} placeholder="Password" />
                <PhoneInput value={phone} placeholder="Phone" onValueChange={(masked) => setPhone(masked)} />
                <NumberInput value={numberValue} min={0} max={100} onNumberChange={setNumberValue} />
                <MoneyInput value={money} prefix="$" suffix="USD" onValueChange={(_value, rawValue) => setMoney(rawValue)} />
                <QuantityInput value={quantity} min={0} max={20} onValueChange={setQuantity} />
              </div>
            </PlaygroundCard>

            <PlaygroundCard title="Selects" description="SimpleSelect, AsyncSelect and AsyncMultiSelect with hardening props.">
              <div className="grid gap-3">
                <SimpleSelect options={simpleOptions} placeholder="Simple status" />
                <AsyncSelect
                  value={singleTag}
                  onValueChange={setSingleTag}
                  defaultOptions={tagOptions}
                  loadOptions={loadTagOptions}
                  minSearchLength={2}
                  cacheTtl={5_000}
                  labels={{ placeholder: "Async single tag", minSearchLength: (count) => `Type ${count}+ characters` }}
                  renderEmpty={() => <EmptyState title="No tag" description="Try another search." className="min-h-28 border-0" />}
                />
                <AsyncMultiSelect
                  value={selectedTags}
                  onValueChange={setSelectedTags}
                  defaultOptions={tagOptions}
                  loadOptions={loadTagOptions}
                  showSelectAll
                  maxSelected={4}
                  labels={{ placeholder: "Async multi tags", selectedCount: (count) => `${count} selected`, selectAll: "Select visible", maxSelected: (count) => `Maximum ${count} tags` }}
                />
              </div>
            </PlaygroundCard>
          </div>
        </section>

        <section id="forms" className="grid gap-4">
          <SectionTitle title="Forms" description="React Hook Form wrappers plus FormFieldShell layout props." />
          <PlaygroundCard title="Form wrappers" description="Vertical, horizontal and inline field shell examples.">
            <PlaygroundForm />
          </PlaygroundCard>
        </section>

        <section id="table" className="grid gap-4">
          <SectionTitle title="Data table" description="Selection, visibility menu, density, skeleton, striped rows and bulk actions." />
          <PlaygroundCard title="DataTable hardening" description="Toggle loading to see skeleton rows; disabled row is dimmed.">
            <DataTable
              columns={columns}
              data={filteredProducts}
              getRowId={(row) => row.id}
              rowSelection={rowSelection}
              onRowSelectionChange={setRowSelection}
              columnVisibility={columnVisibility}
              onColumnVisibilityChange={setColumnVisibility}
              enableRowSelection
              isLoading={tableLoading}
              loadingVariant="skeleton"
              skeletonRows={4}
              density="compact"
              striped
              bordered
              stickyHeader
              cellFallback="—"
              getRowDisabled={(row) => Boolean(row.original.disabled)}
              onRowClick={(row) => addToast({ title: row.original.name, description: "Row click" })}
              onRowDoubleClick={(row) => addToast({ tone: "info", title: row.original.name, description: "Row double click" })}
              emptyState={{ title: "No products", description: "Try changing filters." }}
              toolbarProps={(table) => ({
                title: "Products",
                description: "Mock product list with advanced DataTable props.",
                search: (
                  <FilterBar
                    search={<SearchInput value={search} onValueChange={setSearch} placeholder="Search table..." />}
                    activeCount={search ? 1 : 0}
                    onReset={() => setSearch("")}
                    actions={<Button size="sm" variant="outline" onClick={() => setTableLoading((value) => !value)}>{tableLoading ? "Stop loading" : "Show skeleton"}</Button>}
                  />
                ),
                actions: <DataTableColumnVisibilityMenu table={table} />,
                selectionActions: (
                  <DataTableBulkActions
                    rows={selectedRows}
                    hideWhenEmpty={false}
                    onClearSelection={() => setRowSelection({})}
                    actions={[
                      { key: "export", label: "Export selected", onSelect: (rows) => addToast({ title: "Export", description: `${rows.length} rows selected.` }) },
                      { key: "delete", label: "Delete selected", destructive: true, onSelect: () => setConfirmOpen(true) },
                    ]}
                  />
                ),
              })}
              pagination={{ pageIndex: 0, pageSize: 10, rowCount: filteredProducts.length, pageCount: 1 }}
              renderMobileCard={(row) => (
                <Card size="sm">
                  <CardHeader>
                    <CardTitle>{row.original.name}</CardTitle>
                    <CardDescription>{row.original.sku}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StatusBadge tone={getStatusTone(row.original.status)}>{row.original.status}</StatusBadge>
                  </CardContent>
                </Card>
              )}
            />
          </PlaygroundCard>
        </section>

        <section id="upload" className="grid gap-4">
          <SectionTitle title="Upload" description="Drag/drop, validation, rejected files, progress and image previews." />
          <div className="grid gap-4 lg:grid-cols-2">
            <PlaygroundCard title="FileUpload" description="Try dropping any file. Validation is client-side only.">
              <FileUpload
                files={files}
                onFilesChange={setFiles}
                accept=".pdf,.png,.jpg,image/*"
                maxFiles={3}
                maxSize={1024 * 1024}
                progress={35}
                dropzoneDescription="PDF or images, max 1 MB, max 3 files."
              />
            </PlaygroundCard>
            <PlaygroundCard title="ImageUpload" description="ImageUpload reuses FileUpload and adds previews.">
              <ImageUpload files={images} onFilesChange={setImages} maxFiles={4} maxSize={2 * 1024 * 1024} />
            </PlaygroundCard>
          </div>
        </section>

        <section id="calendar" className="grid gap-4">
          <SectionTitle title="Calendar and date pickers" description="Single/range calendars, native inputs and popover pickers." />
          <div className="grid gap-4 lg:grid-cols-3">
            <PlaygroundCard title="Calendar single">
              <Calendar value={calendarDate} onValueChange={setCalendarDate} locale="en-US" />
            </PlaygroundCard>
            <PlaygroundCard title="Calendar range">
              <Calendar mode="range" range={calendarRange} onRangeChange={setCalendarRange} locale="en-US" />
            </PlaygroundCard>
            <PlaygroundCard title="Date controls">
              <div className="grid gap-3">
                <DateInput value={dateValue} onValueChange={setDateValue} />
                <DateRangeInput value={dateRange} onValueChange={setDateRange} />
                <DatePicker value={dateValue} onValueChange={setDateValue} />
                <DateRangePicker value={dateRange} onValueChange={setDateRange} />
              </div>
            </PlaygroundCard>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <PlaygroundCard title="Overlays" description="ModalShell, SheetShell, ConfirmDialog and DialogActions.">
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setModalOpen(true)}>Open modal</Button>
              <Button variant="outline" onClick={() => setSheetOpen(true)}>Open sheet</Button>
              <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Open confirm</Button>
            </div>
          </PlaygroundCard>

          <PlaygroundCard title="Wizard and stepper" description="Visual flow only; validation belongs to the app.">
            <Wizard
              steps={wizardSteps}
              currentStep={wizardStep}
              onStepChange={setWizardStep}
              onNext={goNextWizardStep}
              onPrevious={goPreviousWizardStep}
              onFinish={() => addToast({ tone: "success", title: "Wizard finished" })}
            >
              <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                Current step: <span className="font-medium text-foreground">{wizardStep}</span>
              </div>
            </Wizard>
            <div className="mt-4">
              <Stepper steps={wizardSteps.map((step) => ({ ...step, completed: step.id === "info" }))} currentStep={wizardStep} orientation="vertical" />
            </div>
          </PlaygroundCard>
        </section>
      </PageContainer>

      <ModalShell
        open={modalOpen}
        onOpenChange={setModalOpen}
        size="lg"
        title="Reusable modal"
        description="ModalShell wraps the dialog primitive for dashboard usage."
        footer={
          <DialogActions>
            <DialogActionButton variant="outline" onClick={() => setModalOpen(false)}>Cancel</DialogActionButton>
            <DialogActionButton isLoading={false} onClick={() => setModalOpen(false)}>Save</DialogActionButton>
          </DialogActions>
        }
      >
        <p className="text-sm text-muted-foreground">
          This modal is controlled by props and does not contain business logic.
        </p>
      </ModalShell>

      <SheetShell
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title="Reusable sheet"
        description="Use sheets for side panels, filters and quick forms."
        footer={<Button onClick={() => setSheetOpen(false)}>Done</Button>}
      >
        <div className="grid gap-3">
          <SearchInput placeholder="Search inside sheet" />
          <SimpleSelect options={simpleOptions} placeholder="Sheet select" />
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
          addToast({ tone: "danger", title: "Delete clicked", description: "No real data was deleted." })
        }}
      />

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        groups={[
          {
            id: "navigation",
            label: "Navigation",
            items: [
              { id: "overview", label: "Overview", shortcut: "G O", onSelect: () => window.location.hash = "overview" },
              { id: "forms", label: "Forms", shortcut: "G F", onSelect: () => window.location.hash = "forms" },
              { id: "table", label: "Data table", shortcut: "G T", onSelect: () => window.location.hash = "table" },
            ],
          },
          {
            id: "actions",
            label: "Actions",
            items: [
              { id: "toast", label: "Show toast", icon: <BellIcon />, onSelect: () => addToast({ title: "Command executed" }) },
              { id: "sheet", label: "Open sheet", icon: <SettingsIcon />, onSelect: () => setSheetOpen(true) },
            ],
          },
        ]}
      />
    </AppShell>
  )
}

export default function App() {
  return (
    <ToastProvider position="top-right">
      <PlaygroundContent />
    </ToastProvider>
  )
}
