import { useMemo, useState } from "react"
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowRightIcon,
  BarChart2Icon,
  BanknoteIcon,
  BookOpenIcon,
  BriefcaseIcon,
  EyeIcon,
  LayoutDashboardIcon,
  PackageOpenIcon,
  RouteIcon,
  UsersIcon,
} from "lucide-react"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ComponentPreview,
  DataTable,
  DataTableBulkActions,
  DataTableColumnVisibilityMenu,
  DataTableSortableHeader,
  Input,
  ModalShell,
  SearchInput,
  StatusBadge,
  Textarea,
  buttonVariants,
  createDataTableActionsColumn,
  createDataTableSelectColumn,
  useToast,
} from "@/index"
import { cn } from "@/lib/utils"
import { DemoSection, PlaygroundCard, PlaygroundUsage, PreviewSurface, ShowcaseGrid, TokenPill } from "./playground-ui"
import { getStatusTone, templateCatalog, type TemplateShowcase } from "./playground-data"

type TemplateTone = TemplateShowcase["tone"]

type TemplateModuleRow = {
  id: string
  module: string
  owner: string
  page: string
  status: "active" | "inactive" | "draft"
  readiness: number
}

type TemplateFormState = {
  customer: string
  owner: string
  budget: string
  notes: string
}

const moduleRouteHints: Array<{ keywords: string[]; path: string; label: string }> = [
  { keywords: ["table", "datatable", "grid", "list"], path: "/components/table", label: "DataTable" },
  { keywords: ["file", "upload", "image"], path: "/components/upload", label: "Upload" },
  { keywords: ["calendar", "date", "picker", "range"], path: "/components/calendar", label: "Calendar" },
  { keywords: ["form", "input", "filters"], path: "/components/forms", label: "Forms" },
  { keywords: ["status", "badge", "cards", "progress"], path: "/components/foundation", label: "Foundation" },
  { keywords: ["modal", "dialog", "overlay", "toast", "stepper", "commands", "sidebar"], path: "/components/overlay", label: "Overlay" },
]

const templateMetrics = [
  { title: "Templates", value: `${templateCatalog.length}`, note: "Dashboard-ready concepts" },
  { title: "Pages", value: `${templateCatalog.reduce((sum, item) => sum + item.pages.length, 0)}`, note: "Route-level mock screens" },
  { title: "Modules", value: `${templateCatalog.reduce((sum, item) => sum + item.modules.length, 0)}`, note: "Reusable UI building blocks" },
  { title: "Mode", value: "Mock", note: "No API, auth or tenant logic" },
]

function toKebab(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[\s_/]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function getTemplateSlug(templateId: string) {
  return templateId.replace(/^template-/, "")
}

export function getTemplateRoute(templateId: string) {
  return `/templates/${getTemplateSlug(templateId)}`
}

export function getTemplatePageRoute(templateId: string, page: string) {
  return `${getTemplateRoute(templateId)}/${toKebab(page)}`
}

export function getTemplateBySlug(slug: string) {
  return templateCatalog.find((template) => getTemplateSlug(template.id) === slug) || templateCatalog.find((template) => template.id === slug)
}

function templateIcon(tone: TemplateTone) {
  const iconProps = { className: "size-4 text-muted-foreground" }

  if (tone === "emerald") return <UsersIcon {...iconProps} />
  if (tone === "blue") return <BarChart2Icon {...iconProps} />
  if (tone === "violet") return <PackageOpenIcon {...iconProps} />
  if (tone === "amber") return <BriefcaseIcon {...iconProps} />
  if (tone === "rose") return <BanknoteIcon {...iconProps} />
  return <LayoutDashboardIcon {...iconProps} />
}

function getModuleLink(module: string) {
  const normalized = module.toLowerCase()
  return moduleRouteHints.find((hint) => hint.keywords.some((keyword) => normalized.includes(keyword)))
}

function getLinkedModuleCount(template: TemplateShowcase) {
  return template.modules.filter((module) => Boolean(getModuleLink(module))).length
}

function getPageForModule(template: TemplateShowcase, module: string) {
  const moduleWords = toKebab(module).split("-")
  const exact = template.pages.find((page) => moduleWords.some((word) => toKebab(page).includes(word)))
  return exact ?? template.pages[0] ?? "Overview"
}

function createTemplateRows(template: TemplateShowcase): TemplateModuleRow[] {
  return template.modules.map((module, index) => ({
    id: `${template.id}-${toKebab(module)}-${index}`,
    module,
    owner: ["Product", "Design", "Ops", "Growth", "Finance", "Support"][index % 6],
    page: getPageForModule(template, module),
    status: ["active", "draft", "inactive"][index % 3] as TemplateModuleRow["status"],
    readiness: 58 + ((index + 3) * 11) % 39,
  }))
}

function TemplateStatCard({ title, value, note, icon }: { title: string; value: string; note: string; icon?: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="flex items-center gap-2 text-3xl">
          {icon}
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{note}</CardContent>
    </Card>
  )
}

function TemplateCard({ item }: { item: TemplateShowcase }) {
  const linkedCount = getLinkedModuleCount(item)

  return (
    <Card id={item.id} className="group relative overflow-hidden transition-all hover:-translate-y-0.5 hover:border-primary/45">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/45 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <CardHeader>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border bg-muted text-muted-foreground">
            {templateIcon(item.tone)}
          </div>
          <div className="flex flex-wrap justify-end gap-1.5">
            <Badge variant="outline" className="text-[11px]">{item.category}</Badge>
            <Badge variant="secondary" className="text-[11px]">{item.focus}</Badge>
          </div>
        </div>
        <CardTitle>{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <PreviewSurface className="p-3 text-center">
            <div className="text-lg font-semibold">{item.pages.length}</div>
            <div className="text-xs text-muted-foreground">pages</div>
          </PreviewSurface>
          <PreviewSurface className="p-3 text-center">
            <div className="text-lg font-semibold">{item.modules.length}</div>
            <div className="text-xs text-muted-foreground">modules</div>
          </PreviewSurface>
          <PreviewSurface className="p-3 text-center">
            <div className="text-lg font-semibold">{linkedCount}</div>
            <div className="text-xs text-muted-foreground">linked</div>
          </PreviewSurface>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {item.pages.map((page) => (
            <Link key={page} to={getTemplatePageRoute(item.id, page)} className="rounded-full border bg-muted/35 px-2 py-0.5 text-xs transition-colors hover:border-primary/50 hover:bg-primary/5">
              {page}
            </Link>
          ))}
        </div>
        <div className="grid gap-1.5">
          {item.modules.slice(0, 4).map((module) => {
            const link = getModuleLink(module)
            return (
              <div key={module} className="flex items-center justify-between gap-2 rounded-lg border bg-muted/25 px-3 py-2 text-sm">
                <span className="truncate">{module}</span>
                <span className="text-xs text-muted-foreground">{link ? link.label : "module"}</span>
              </div>
            )
          })}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Link to={getTemplateRoute(item.id)} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex-1 justify-center")}>Open template</Link>
        <Link to={getTemplatePageRoute(item.id, item.pages[0] ?? "overview")} className={cn(buttonVariants({ size: "sm" }))}>
          <ArrowRightIcon className="size-4" />
        </Link>
      </CardFooter>
    </Card>
  )
}

function TemplateGalleryPreview() {
  return (
    <div className="grid w-full gap-4 lg:grid-cols-3">
      {templateCatalog.slice(0, 3).map((template) => (
        <TemplateCard key={template.id} item={template} />
      ))}
    </div>
  )
}

export function TemplatesSection() {
  return (
    <DemoSection
      sectionIndex={1}
      id="templates"
      eyebrow="Application blocks"
      title="Template gallery"
      description="Dashboard templates for real apps: routed pages, reusable modules, component links and API-free preview states."
      action={<StatusBadge tone="success" dot>{templateCatalog.length} templates</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 md:grid-cols-4">
        {templateMetrics.map((metric) => (
          <TemplateStatCard key={metric.title} {...metric} icon={metric.title === "Templates" ? <LayoutDashboardIcon className="size-5 text-primary" /> : undefined} />
        ))}
      </section>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="Template rules" description="Templates are page patterns, not product-specific business logic." badge={<Badge variant="outline">rules</Badge>}>
          <div className="grid gap-2 text-sm text-muted-foreground">
            <div className="rounded-lg border bg-muted/25 p-3">Routes are mock-only and API-free.</div>
            <div className="rounded-lg border bg-muted/25 p-3">Blocks reuse existing primitives, DataTable, forms, overlays and status badges.</div>
            <div className="rounded-lg border bg-muted/25 p-3">Apps can copy patterns and connect their own API/state.</div>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Reusable module map" description="Template modules deep-link to component documentation sections." badge={<Badge variant="outline">linked</Badge>}>
          <div className="grid gap-2">
            {moduleRouteHints.map((module) => (
              <Link key={module.label} to={module.path} className="flex items-center justify-between rounded-lg border bg-muted/25 px-3 py-2 text-sm hover:border-primary/45">
                <span>{module.label}</span>
                <ArrowRightIcon className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="Template styling" description="Template pages use the same CSS-first tokens as all components." badge={<Badge variant="outline">CSS</Badge>}>
          <div className="flex flex-wrap gap-2">
            <TokenPill>--aui-card-shadow</TokenPill>
            <TokenPill>--aui-table-header-bg</TokenPill>
            <TokenPill>data-slot="card"</TokenPill>
            <TokenPill>data-slot="data-table-wrapper"</TokenPill>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">Templates should look branded without creating project-only components.</p>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="Template catalogue"
        description="Route-driven templates shown as reusable app-level patterns. Open each one to inspect page states and module tables."
        dependencies={["AppShell", "Card", "DataTable", "ModalShell", "StatusBadge"]}
        code={`const templates = templateCatalog.map((template) => ({
  route: getTemplateRoute(template.id),
  pages: template.pages,
  modules: template.modules,
}))

<TemplateCard item={template} />`}
      >
        <TemplateGalleryPreview />
      </ComponentPreview>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {templateCatalog.map((template) => <TemplateCard key={template.id} item={template} />)}
      </div>

      <PlaygroundUsage
        title="Template usage idea"
        items={[
          "Use templates as app-level composition examples, not as business-specific components inside the UI kit.",
          "Each template page is route-driven and can be copied into a product dashboard with its own API/state layer.",
          "Module links show which foundation component family powers the template block.",
          "Keep styling consistent with shared playground wrappers and CSS tokens.",
        ]}
        code={`// Template route shape
const templatePages = [
  { path: "/templates/crm", component: CrmTemplate },
  { path: "/templates/analytics", component: AnalyticsTemplate },
]

render(<Routes>{templatePages.map(...)} />)`}
      />
    </DemoSection>
  )
}

function TemplateModuleTable({ template, activePage }: { template: TemplateShowcase; activePage: string }) {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [search, setSearch] = useState("")
  const [density, setDensity] = useState<"compact" | "default" | "comfortable">("default")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [loadingVariant, setLoadingVariant] = useState<"skeleton" | "state">("state")
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const rows = useMemo(() => createTemplateRows(template), [template])
  const filteredRows = useMemo(() => rows.filter((row) => row.module.toLowerCase().includes(search.toLowerCase())), [rows, search])
  const selectedRows = Object.keys(rowSelection).length

  const columns = useMemo<ColumnDef<TemplateModuleRow>[]>(
    () => [
      createDataTableSelectColumn<TemplateModuleRow>(),
      {
        accessorKey: "module",
        header: ({ column }) => <DataTableSortableHeader column={column}>Module</DataTableSortableHeader>,
      },
      { accessorKey: "owner", header: "Owner" },
      { accessorKey: "page", header: "Page" },
      {
        accessorKey: "readiness",
        header: ({ column }) => <DataTableSortableHeader column={column}>Readiness</DataTableSortableHeader>,
        cell: ({ row }) => `${row.original.readiness}%`,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge tone={getStatusTone(row.original.status)} dot>{row.original.status}</StatusBadge>,
      },
      createDataTableActionsColumn<TemplateModuleRow>({
        getActions: (_row, module) => [
          {
            key: "inspect",
            label: "Inspect module",
            onSelect: () => addToast({ title: "Module selected", description: module.module }),
          },
          {
            key: "open-page",
            label: "Open page",
            onSelect: () => navigate(getTemplatePageRoute(template.id, module.page)),
          },
        ],
      }),
    ],
    [addToast, navigate, template.id],
  )

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <CardTitle>{template.title} modules</CardTitle>
            <CardDescription>Focused page: {activePage}. Toggle state and density like a real dashboard table.</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["compact", "default", "comfortable"] as const).map((item) => (
              <Button key={item} size="sm" variant={density === item ? "default" : "outline"} onClick={() => setDensity(item)}>{item}</Button>
            ))}
            <Button size="sm" variant={loading ? "default" : "outline"} onClick={() => setLoading((value) => !value)}>Loading</Button>
            <Button size="sm" variant={error ? "default" : "outline"} onClick={() => setError((value) => !value)}>Error</Button>
            <Button size="sm" variant={loadingVariant === "state" ? "default" : "outline"} onClick={() => setLoadingVariant((value) => (value === "state" ? "skeleton" : "state"))}>Variant: {loadingVariant}</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={filteredRows}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          enableRowSelection
          density={density}
          striped
          bordered
          stickyHeader
          isLoading={loading}
          isError={error}
          loadingVariant={loadingVariant}
          loadingState={{ label: "Syncing template modules", description: "Mock registry sync state." }}
          errorState={{ title: "Could not load modules", description: "Toggle error OFF to restore mock state." }}
          emptyState={{ title: search ? "No matching modules" : "No modules", description: "Try another search query." }}
          toolbarProps={(table) => ({
            title: "Template module registry",
            description: `${selectedRows} selected`,
            search: <SearchInput value={search} onValueChange={setSearch} placeholder="Search module..." />,
            actions: <DataTableColumnVisibilityMenu table={table} />,
            selectionActions: (
              <DataTableBulkActions
                rows={table.getSelectedRowModel().rows.map((row) => row.original)}
                actions={[{ key: "activate", label: "Mark active", onSelect: (selected) => addToast({ title: "Bulk action", description: `${selected.length} modules selected` }) }]}
                onClearSelection={() => setRowSelection({})}
              />
            ),
          })}
          pagination={{ pageIndex: 0, pageSize: 5, pageCount: Math.max(Math.ceil(filteredRows.length / 5), 1), rowCount: filteredRows.length }}
        />
      </CardContent>
    </Card>
  )
}

function TemplatePagePreview({ template, activePage }: { template: TemplateShowcase; activePage: string }) {
  const [form, setForm] = useState<TemplateFormState>({ customer: "", owner: "", budget: "", notes: "" })
  const [open, setOpen] = useState(false)
  const route = getTemplatePageRoute(template.id, activePage)

  const metrics = [
    { label: "Category", value: template.category, note: "Template group" },
    { label: "Focus", value: template.focus, note: "Primary workflow" },
    { label: "Route", value: route, note: "Deep-link path" },
    { label: "Modules", value: `${template.modules.length}`, note: "Connected blocks" },
  ]

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
      <Card>
        <CardHeader>
          <CardTitle>{activePage} preview</CardTitle>
          <CardDescription>Small page-level composition using the same primitives as the rest of the UI kit.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => (
              <PreviewSurface key={metric.label} className="p-3">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{metric.label}</div>
                <div className="mt-1 truncate text-sm font-semibold">{metric.value}</div>
                <div className="text-xs text-muted-foreground">{metric.note}</div>
              </PreviewSurface>
            ))}
          </div>
          <div className="rounded-xl border bg-muted/25 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium">Reusable page composition</div>
                <div className="text-xs text-muted-foreground">This block is a template pattern, not a product-specific page.</div>
              </div>
              <StatusBadge tone="success" dot>Mock</StatusBadge>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {template.modules.slice(0, 3).map((module) => (
                <div key={module} className="rounded-lg border bg-background/60 p-3 text-sm">
                  <div className="font-medium">{module}</div>
                  <div className="text-xs text-muted-foreground">{getModuleLink(module)?.label ?? "Custom block"}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="justify-between gap-3">
          <code className="rounded-md border bg-muted px-2 py-1 text-xs text-muted-foreground">{route}</code>
          <Button size="sm" onClick={() => setOpen(true)}><EyeIcon className="mr-2 size-4" />Open overlay</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mock action form</CardTitle>
          <CardDescription>Local state only; use this pattern in app pages with real API handlers.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-muted-foreground">Customer</span>
            <Input value={form.customer} onChange={(event) => setForm((value) => ({ ...value, customer: event.target.value }))} placeholder="Acme partner" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-muted-foreground">Owner</span>
            <Input value={form.owner} onChange={(event) => setForm((value) => ({ ...value, owner: event.target.value }))} placeholder="Ops owner" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-muted-foreground">Budget</span>
            <Input value={form.budget} onChange={(event) => setForm((value) => ({ ...value, budget: event.target.value }))} placeholder="1250000" />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-muted-foreground">Notes</span>
            <Textarea value={form.notes} onChange={(event) => setForm((value) => ({ ...value, notes: event.target.value }))} rows={3} placeholder="Quick notes" />
          </label>
        </CardContent>
      </Card>

      <ModalShell open={open} onOpenChange={setOpen} title={`${template.title} • ${activePage}`} description="Template page overlay mock" footer={<Button size="sm" onClick={() => setOpen(false)}>Close</Button>} size="sm">
        <div className="grid gap-2 text-sm text-muted-foreground">
          <p>Route: <code className="rounded bg-muted px-1 py-0.5 text-xs">{route}</code></p>
          <p>Owner: {form.owner || "Not set"}</p>
          <p>Budget: {form.budget || "Not set"}</p>
          <p>Customer: {form.customer || "Not set"}</p>
        </div>
      </ModalShell>
    </div>
  )
}

export function TemplateShowcasePage({ slug, page }: { slug: string; page?: string }) {
  const template = getTemplateBySlug(slug)

  if (!template) {
    return (
      <DemoSection sectionIndex={1} id="template-not-found" title="Template not found" description="Bu slug bilan template topilmadi. Boshqa template'ni tanlab ko'ring.">
        <Link to="/templates" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Back to templates</Link>
      </DemoSection>
    )
  }

  const activePage = template.pages.find((item) => toKebab(item) === toKebab(page ?? "")) ?? template.pages[0] ?? "Overview"

  return (
    <DemoSection
      sectionIndex={1}
      id={template.id}
      eyebrow="Template detail"
      title={template.title}
      description={`${template.category} • ${template.focus}`}
      action={<Link to="/templates" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>Back to templates</Link>}
    >
      <section className="mb-4 rounded-3xl border bg-card p-5 shadow-xl shadow-primary/5">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="gap-2"><BookOpenIcon className="size-3.5" />{template.category}</Badge>
              <Badge variant="secondary">{template.focus}</Badge>
              <StatusBadge tone="success" dot>{template.modules.length} modules</StatusBadge>
            </div>
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{template.description}</p>
            <div className="flex flex-wrap gap-2">
              {template.pages.map((item) => (
                <Link key={item} to={getTemplatePageRoute(template.id, item)} className={cn(buttonVariants({ variant: activePage === item ? "default" : "outline", size: "sm" }))}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <PreviewSurface className="min-w-[220px] p-4">
            <div className="flex items-center gap-2 text-sm font-medium"><RouteIcon className="size-4 text-primary" />Current route</div>
            <code className="mt-2 block truncate rounded-md border bg-muted px-2 py-1 text-xs text-muted-foreground">{getTemplatePageRoute(template.id, activePage)}</code>
          </PreviewSurface>
        </div>
      </section>

      <ComponentPreview
        title="Template detail surface"
        description="Route-driven template detail page with module table, deep-linked pages and a mock action form."
        dependencies={["DataTable", "Card", "ModalShell", "StatusBadge"]}
        code={`<TemplateShowcasePage slug="${getTemplateSlug(template.id)}" page="${toKebab(activePage)}" />
<DataTable data={template.modules} />
<ModalShell open={open} onOpenChange={setOpen} />`}
      >
        <div className="grid w-full gap-4">
          <TemplateModuleTable template={template} activePage={activePage} />
          <TemplatePagePreview template={template} activePage={activePage} />
        </div>
      </ComponentPreview>

      <PlaygroundUsage
        title="Template page usage"
        items={[
          `Current route: ${getTemplatePageRoute(template.id, activePage)}`,
          "Use templates as composition references for real dashboards, not as business-specific core components.",
          "Replace local mock state with your app API hooks while preserving layout, table and form composition.",
          "Keep module links connected to component docs so developers can understand the building blocks quickly.",
        ]}
        code={`// Template route file shape
<Route path="${getTemplateRoute(template.id)}" element={<TemplateShowcasePage slug="${getTemplateSlug(template.id)}" />} />
<Route path="${getTemplateRoute(template.id)}/:page" element={<TemplateShowcasePage slug="${getTemplateSlug(template.id)}" />} />`}
      />
    </DemoSection>
  )
}
