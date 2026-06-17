import { useEffect, useMemo, useState } from "react"
import type { RowSelectionState } from "@tanstack/react-table"
import {
  Link,
  useNavigate
} from "react-router-dom"
import {
  Badge,
  Button,
  DataTable,
  DataTableSortableHeader,
  ModalShell,
  SearchInput,
  StatusBadge,
  buttonVariants,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  createDataTableActionsColumn,
  useToast,
} from "@/index"
import { type ColumnDef } from "@tanstack/react-table"
import {
  BarChart2Icon,
  BanknoteIcon,
  BriefcaseIcon,
  LayoutDashboardIcon,
  PackageOpenIcon,
  UsersIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DemoSection, PlaygroundUsage } from "./playground-ui"
import { getStatusTone, templateCatalog, TemplateShowcase } from "./playground-data"

function templateIcon(tone: TemplateShowcase["tone"]) {
  const iconProps = { className: "size-4 text-muted-foreground" }

  if (tone === "emerald") return <UsersIcon {...iconProps} />
  if (tone === "blue") return <BarChart2Icon {...iconProps} />
  if (tone === "violet") return <PackageOpenIcon {...iconProps} />
  if (tone === "amber") return <BriefcaseIcon {...iconProps} />
  if (tone === "rose") return <BanknoteIcon {...iconProps} />
  return <LayoutDashboardIcon {...iconProps} />
}

const templateModuleToTemplatePage: Record<string, Record<string, string>> = {
  "template-crm": {
    "Data table": "Leads",
    "Form": "Accounts",
    "Status badges": "Pipeline",
    Filters: "Pipeline",
    Modals: "Settings",
    Sidebar: "Pipeline",
  },
  "template-analytics": {
    Cards: "Overview",
    Tabs: "Funnels",
    Calendar: "Retention",
    Progress: "Overview",
    "Data table": "Overview",
  },
  "template-ecommerce": {
    "File upload": "Catalog",
    Stepper: "Orders",
    "Date picker": "Orders",
    "Data table": "Customers",
    Form: "Returns",
  },
  "template-operations": {
    Overlays: "Incidents",
    Toasts: "Incidents",
    Tabs: "Team",
    "Status badges": "Escalation",
    Sidebar: "Team",
  },
  "template-finance": {
    Form: "Approvals",
    Dialog: "Dashboard",
    Stepper: "Forecast",
    Charts: "Payments",
    "Shell layouts": "Dashboard",
  },
  "template-hub": {
    Tabs: "Campaigns",
    Cards: "Assets",
    "File upload": "Assets",
    "Status badges": "Approvals",
    Commands: "Analytics",
  },
}

type LinkedModule = {
  name: string
  path: string
  aliases?: string[]
}

const linkedModules: LinkedModule[] = [
  { name: "Data table", path: "/components/table", aliases: ["table", "datatable", "data table", "products"] },
  { name: "File upload", path: "/components/upload", aliases: ["upload", "file", "image"] },
  { name: "Calendar", path: "/components/calendar", aliases: ["calendar", "date", "picker", "range"] },
  { name: "Form", path: "/components/forms", aliases: ["forms", "form", "input", "submit"] },
  { name: "Status badges", path: "/components/foundation", aliases: ["status", "badge", "badges"] },
  { name: "Overlay", path: "/components/overlay", aliases: ["overlay", "modal", "sheet", "dialog", "confirm"] },
]

function getTemplateModuleLinks(modules: string[]) {
  const links = new Map<string, string>()

  modules.forEach((module) => {
    const moduleName = module.toLowerCase()
    const match = linkedModules.find((item) => {
      const aliases = [item.name.toLowerCase(), ...(item.aliases ?? [])]
      return aliases.some((alias) => moduleName.includes(alias.toLowerCase()))
    })

    if (match) {
      links.set(module, match.path)
    }
  })

  return Array.from(links.entries()).map(([label, path]) => ({
    label,
    path,
  }))
}

function getTemplatePageForModule(templateId: string, modules: string[], moduleName: string) {
  const exact = templateModuleToTemplatePage[templateId]?.[moduleName]

  if (exact) {
    return exact
  }

  const moduleNameLower = moduleName.toLowerCase()

  const templateSpecific = new Map<string, Array<{ alias: string[]; pageKeywords: string[] }>>()

  templateSpecific.set("template-crm", [
    { alias: ["table", "grid", "list", "datatable"], pageKeywords: ["leads", "accounts", "pipeline"] },
    { alias: ["form", "input", "customer", "account"], pageKeywords: ["accounts", "pipeline"] },
    { alias: ["modal", "overlay", "dialog", "status"], pageKeywords: ["settings", "reports"] },
    { alias: ["badge", "filter", "sidebar"], pageKeywords: ["pipeline", "reports"] },
  ])

  const candidates = templateSpecific.get(templateId)

  const fallbackTemplate = toKebab(modules.join(" ")).split("-")[0]

  const pages = (templateCatalog.find((template) => template.id === templateId)?.pages || []).map((page) => ({
    name: page,
    slug: toKebab(page),
  }))

  if (candidates) {
    const matched = candidates.find((candidate) => candidate.alias.some((alias) => moduleNameLower.includes(alias)))

    if (matched) {
      const pageName = pages.find((page) => matched.pageKeywords.some((keyword) => page.slug.includes(keyword)))

      if (pageName) {
        return pageName.name
      }
    }
  }

  return pages.find((page) => page.slug.includes(fallbackTemplate))?.name ?? pages[0]?.name ?? ""
}

function getTemplatePageRouteForModule(templateId: string, modules: string[], moduleName: string) {
  const pageName = getTemplatePageForModule(templateId, modules, moduleName)
  if (!pageName) return getTemplateRoute(templateId)
  return getTemplatePageRoute(templateId, pageName)
}

export function getTemplateSlug(templateId: string) {
  return templateId.replace(/^template-/, "")
}

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

export function getTemplateRoute(templateId: string) {
  return `/templates/${getTemplateSlug(templateId)}`
}

export function getTemplatePageRoute(templateId: string, page: string) {
  return `${getTemplateRoute(templateId)}/${toKebab(page)}`
}

export function getTemplateBySlug(slug: string) {
  return (
    templateCatalog.find((template) => getTemplateSlug(template.id) === slug) ||
    templateCatalog.find((template) => template.id === slug)
  )
}

function TemplateStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 rounded-lg border border-border/80 bg-muted/30 p-3">
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  )
}

function TemplateCard({ item }: { item: TemplateShowcase }) {
  const moduleLinks = getTemplateModuleLinks(item.modules)

  return (
    <Card
      id={item.id}
      className="group relative overflow-hidden border border-border/80 transition-colors hover:border-primary/55"
    >
      <CardHeader className="relative">
        <div className="absolute -right-2 top-2 flex items-center gap-2">
          <Badge variant="outline" className="text-[11px]">
            {item.category}
          </Badge>
          <Badge variant="secondary" className="text-[11px]">
            {item.focus}
          </Badge>
        </div>
        <CardTitle className="max-w-[80%]">{item.title}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-muted-foreground">
          Pages
          <span className="ml-1 inline-flex flex-wrap gap-1.5">
            {item.pages.map((page) => (
              <Link
                key={page}
                to={getTemplatePageRoute(item.id, page)}
                className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                {page}
              </Link>
            ))}
          </span>
        </p>
        <div className="grid gap-2">
          {item.modules.map((module) => (
            <div
              key={module}
              className="flex items-center justify-between rounded-md border border-border/80 bg-muted/30 px-3 py-2 text-sm"
            >
              <span className="truncate text-sm">{module}</span>
              <span className="text-xs text-muted-foreground">
                {moduleLinks.some((entry) => entry.label === module) ? "linked" : "module"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          to={getTemplateRoute(item.id)}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full")}
        >
          Open template
        </Link>
      </CardFooter>
    </Card>
  )
}

export function TemplatesSection() {
  return (
    <DemoSection
      sectionIndex={1}
      id="templates"
      title="Template gallery"
      description="Dashboard template'lari: real loyihalarda ishlatishga tayyor bloklar va page strukturasi."
    >
      <div className="mb-4 grid gap-2 sm:grid-cols-2">
        {templateCatalog.map((template) => (
          <div key={template.id} className="relative">
            <div className="absolute -left-2 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border/80 bg-card shadow-sm">
              {templateIcon(template.tone)}
            </div>
            <div className="pl-6">
              <TemplateCard item={template} />
            </div>
          </div>
        ))}
      </div>

      <PlaygroundUsage
        title="Template usage idea"
        items={[
          "Har bir template alohida routega ajratilgan — sidebar va command palette orqali tez navigatsiya.",
          "Page structure'da `Card`, `Table`, `Form`, `Overlay` kabi mavjud komponentlar qayta ishlatilgan.",
          "Production da har bir shablonni yangi app route'ga ajratish uchun shu bo'limlarni asos qilib ishlatish oson.",
        ]}
        code={`// Template route shape\nconst templatePages = [\n  { path: \"/templates/crm\", component: CrmTemplate },\n  { path: \"/templates/analytics\", component: AnalyticsTemplate },\n  { path: \"/templates/ecommerce\", component: EcommerceTemplate },\n]\n\nrender(<Routes>{templatePages.map(...)} />)`}
      />
    </DemoSection>
  )
}

type TemplateModuleRow = {
  id: string
  module: string
  owner: string
  status: "active" | "inactive" | "draft"
  readiness: number
}

type TemplatePageMetric = {
  label: string
  value: string
  note: string
}

type TemplateFormState = {
  customer: string
  owner: string
  budget: string
  notes: string
}

type TemplateMiniRow = {
  id: string
  item: string
  owner: string
  score: number
  status: "active" | "inactive" | "draft"
}

function TemplateDashboard({
  template,
  initialPage,
}: {
  template: NonNullable<ReturnType<typeof getTemplateBySlug>>
  initialPage?: string
}) {
  const { addToast } = useToast()
  const navigate = useNavigate()
  const moduleLinks = getTemplateModuleLinks(template.modules)
  const moduleTemplatePageMap = Object.fromEntries(
    template.modules.map((module) => [module, getTemplatePageRouteForModule(template.id, template.modules, module)]),
  )
  const templatePages = useMemo(
    () =>
      template.pages.map((page) => ({
        name: page,
        slug: toKebab(page),
        route: getTemplatePageRoute(template.id, page),
      })),
    [template.id, template.pages],
  )

  const initialPageName = useMemo(() => {
    if (!initialPage) {
      return templatePages[0]?.name ?? ""
    }

    return templatePages.find((page) => page.slug === toKebab(initialPage))?.name ?? templatePages[0]?.name ?? ""
  }, [initialPage, templatePages])

  const [activePage, setActivePage] = useState(initialPageName)
  const [activeModule, setActiveModule] = useState(template.modules[0] ?? "")
  const [search, setSearch] = useState("")
  const [tableLoading, setTableLoading] = useState(false)
  const [tableError, setTableError] = useState(false)
  const [tableDensity, setTableDensity] = useState<"compact" | "default" | "comfortable">("default")
  const [loadingVariant, setLoadingVariant] = useState<"skeleton" | "state">("state")
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const selectedCount = Object.keys(rowSelection).length

  useEffect(() => {
    setActivePage(initialPageName)
  }, [initialPageName])
  useEffect(() => {
    setActiveModule(template.modules[0] ?? "")
  }, [template.id, template.modules])

  const rows: TemplateModuleRow[] = useMemo(
    () =>
      template.modules.map((module, index) => ({
        id: `${template.id}-${index}`,
        module,
        owner: ["Ops", "Sales", "Marketing", "Finance"][index % 4],
        status: ["active", "draft", "inactive"][index % 3] as "active" | "draft" | "inactive",
        readiness: 62 + ((index + 1) * 9) % 38,
      })),
    [template.id, template.modules],
  )

  const filteredRows = useMemo(
    () => rows.filter((row) => row.module.toLowerCase().includes(search.toLowerCase())),
    [rows, search],
  )

  const columns = useMemo<ColumnDef<TemplateModuleRow>[]>(() => {
    return [
      {
        accessorKey: "module",
        header: ({ column }) => <DataTableSortableHeader column={column}>Module</DataTableSortableHeader>,
      },
      {
        accessorKey: "owner",
        header: "Owner",
      },
      {
        accessorKey: "readiness",
        header: ({ column }) => <DataTableSortableHeader column={column}>Readiness</DataTableSortableHeader>,
        cell: ({ row }) => `${row.original.readiness}%`,
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
      createDataTableActionsColumn<TemplateModuleRow>({
        getActions: (_row, module) => [
          {
            key: "open",
            label: "Open module",
            onSelect: () => {
              setActiveModule(module.module)
              addToast({ title: "Active module", description: `${module.module} selected` })
            },
          },
          {
            key: "open-template",
            label: "Open template page",
            onSelect: () => {
              const path = moduleTemplatePageMap[module.module]

              if (path) {
                navigate(path)
              } else {
                addToast({ title: "No linked route", description: "This module has no matching template route." })
              }
            },
          },
        ],
      }),
    ]
  }, [addToast, moduleLinkMap, navigate])

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-base">Template shell</CardTitle>
          <CardDescription>Sidebar + quick routes for this mock template.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div>
            <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Pages</p>
            <div className="grid gap-1.5">
              {templatePages.map((page) => (
                <Link
                  key={page.slug}
                  to={page.route}
                  onClick={() => setActivePage(page.name)}
                  className={cn(buttonVariants({ variant: activePage === page.name ? "default" : "outline", size: "sm" }), "justify-start")}
                >
                  {page.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Template modules</p>
            <div className="grid gap-1.5">
              {template.modules.map((module) => (
                <Button
                  key={`${template.id}-${module}`}
                  size="sm"
                  variant={activeModule === module ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setActiveModule(module)}
                >
                  {module}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium uppercase text-muted-foreground">Linked module pages</p>
            <div className="grid gap-1.5">
              {template.modules.map((module) => (
                <Link
                  key={`${template.id}-${module}`}
                  to={getTemplatePageRouteForModule(template.id, template.modules, module)}
                  className="rounded-md border border-border/70 bg-muted/20 px-2 py-1.5 text-sm text-muted-foreground"
                >
                  {module}
                </Link>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="grid lg:col-span-3 gap-4">
        <CardContent className="grid gap-3">
          <div className="grid gap-2 sm:grid-cols-3">
            <TemplateStat label="Template modules" value={`${filteredRows.length} ta`} />
            <TemplateStat label="Active modules" value={`${filteredRows.filter((item) => item.status === "active").length} ta`} />
            <TemplateStat label="Owner pages" value={`${template.pages.length} page`} />
          </div>

          <div className="mb-1 flex flex-wrap gap-2">
            {(["compact", "default", "comfortable"] as const).map((item) => (
              <Button
                key={item}
                variant={tableDensity === item ? "default" : "outline"}
                size="sm"
                onClick={() => setTableDensity(item)}
              >
                {item}
              </Button>
            ))}
            <Button
              variant={tableLoading ? "default" : "outline"}
              size="sm"
              onClick={() => setTableLoading((value) => !value)}
            >
              Toggle loading
            </Button>
            <Button
              variant={tableError ? "default" : "outline"}
              size="sm"
              onClick={() => setTableError((value) => !value)}
            >
              Toggle error
            </Button>
            <Button
              variant={loadingVariant === "state" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                setLoadingVariant((value) => (value === "skeleton" ? "state" : "skeleton"))
              }
            >
              Loading variant: {loadingVariant}
            </Button>
            <Button
              size="sm"
              variant={selectedCount > 0 ? "default" : "outline"}
              disabled={selectedCount === 0}
              onClick={() => setRowSelection({})}
            >
              Clear selection ({selectedCount})
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={filteredRows}
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
            enableRowSelection
            density={tableDensity}
            striped
            bordered
            isLoading={tableLoading}
            isError={tableError}
            loadingVariant={loadingVariant}
            loadingState={{
              label: "Syncing module registry",
              description: "Simulated API response for this template view.",
            }}
            errorState={{
              title: "Could not load template modules",
              description: "Toggle error OFF to restore normal mock state.",
            }}
            emptyState={{
              title: search ? "No matching modules" : "Template modules are empty",
              description: "Change search text or switch template.",
            }}
            toolbarProps={() => ({
              title: `${template.title} modules`,
              description: `Focused page: ${activePage}`,
              search: <SearchInput value={search} onValueChange={setSearch} placeholder="Search module..." />,
            })}
            pagination={{
              pageIndex: 0,
              pageSize: 5,
              pageCount: Math.max(Math.ceil(filteredRows.length / 5), 1),
              rowCount: filteredRows.length,
              showPageSize: true,
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function resolvePageMetrics(template: TemplateShowcase, page: string): TemplatePageMetric[] {
  const lower = toKebab(page)
  const mapByTemplate = templateModuleToTemplatePage[template.id] ?? {}
  const moduleHint = Object.keys(mapByTemplate).join(", ")

  if (lower.includes("overview") || lower.includes("dashboard")) {
    return [
      { label: "Template depth", value: `${template.pages.length} bo'lim`, note: "Bo‘limlar soni" },
      { label: "Modules", value: `${template.modules.length} ta`, note: "Tayyorlash darajasi" },
      { label: "Scope", value: template.category, note: "Primary domain" },
      { label: "Focus", value: template.focus, note: moduleHint },
    ]
  }

  if (lower.includes("leads") || lower.includes("accounts") || lower.includes("customers")) {
    return [
      { label: "Active leads", value: "124", note: "Current queue" },
      { label: "New today", value: "18", note: "Last 24h intake" },
      { label: "Conversion", value: "41%", note: "To next stage" },
      { label: "Source mix", value: "4", note: "Connected sources" },
    ]
  }

  if (lower.includes("orders") || lower.includes("catalog") || lower.includes("stock")) {
    return [
      { label: "Today orders", value: "84", note: "New transactions" },
      { label: "Abandoned", value: "12", note: "Need follow-up" },
      { label: "Stock risk", value: "7", note: "Items below threshold" },
      { label: "Conversion", value: "63%", note: "Catalog-to-checkout" },
    ]
  }

  if (lower.includes("reports") || lower.includes("forecast") || lower.includes("retention") || lower.includes("analytics")) {
    return [
      { label: "Visibility", value: "High", note: "Fresh data windows enabled" },
      { label: "Refresh", value: "12m", note: "Auto sync interval" },
      { label: "Insights", value: "9", note: "New signals" },
      { label: "Anomalies", value: "2", note: "Needs review" },
    ]
  }

  if (lower.includes("incidents") || lower.includes("escalation")) {
    return [
      { label: "Open incidents", value: "6", note: "Unresolved SLA" },
      { label: "On-call", value: "3", note: "Engineers online" },
      { label: "MTTR", value: "1h 42m", note: "Last 7 days" },
      { label: "Escalations", value: "2", note: "This week" },
    ]
  }

  if (lower.includes("approval") || lower.includes("payments") || lower.includes("invoices")) {
    return [
      { label: "Open approvals", value: "11", note: "Pending managers" },
      { label: "Invoice total", value: "43.2M UZS", note: "Queued amount" },
      { label: "Rejected", value: "1", note: "Today" },
      { label: "Avg cycle", value: "18m", note: "Approval speed" },
    ]
  }

  return [
    { label: "Page", value: page, note: "Selected page" },
    { label: "Category", value: template.category, note: "Template group" },
    { label: "Modules", value: `${template.modules.length}`, note: "Connected blocks" },
    { label: "Status", value: "Ready", note: "Mock mode" },
  ]
}

function getTemplatePreviewRows(template: TemplateShowcase, page: string): TemplateMiniRow[] {
  const suffix = toKebab(page)
  const owners = ["Ops", "Sales", "Marketing", "Finance", "Support", "Design", "Growth"]

  if (suffix.includes("overview") || suffix.includes("dashboard") || suffix.includes("campaigns")) {
    return [
      { id: `${template.id}-1`, item: "KPI baseline", owner: owners[0], score: 81, status: "active" },
      { id: `${template.id}-2`, item: "Real-time widget", owner: owners[1], score: 64, status: "active" },
      { id: `${template.id}-3`, item: "Activity delta", owner: owners[2], score: 72, status: "draft" },
    ]
  }

  if (suffix.includes("leads") || suffix.includes("accounts") || suffix.includes("customers")) {
    return [
      { id: `${template.id}-1`, item: "Inbound leads", owner: owners[0], score: 84, status: "active" },
      { id: `${template.id}-2`, item: "Qualified", owner: owners[1], score: 57, status: "draft" },
      { id: `${template.id}-3`, item: "Closed-won", owner: owners[3], score: 73, status: "active" },
      { id: `${template.id}-4`, item: "Reassign", owner: owners[2], score: 45, status: "inactive" },
    ]
  }

  if (suffix.includes("orders") || suffix.includes("returns") || suffix.includes("stock")) {
    return [
      { id: `${template.id}-1`, item: "Order intake", owner: owners[0], score: 88, status: "active" },
      { id: `${template.id}-2`, item: "Risky returns", owner: owners[4], score: 52, status: "inactive" },
      { id: `${template.id}-3`, item: "Stock sync", owner: owners[3], score: 67, status: "active" },
      { id: `${template.id}-4`, item: "Fulfillment", owner: owners[2], score: 73, status: "draft" },
    ]
  }

  if (suffix.includes("reports") || suffix.includes("forecast") || suffix.includes("analytics")) {
    return [
      { id: `${template.id}-1`, item: "Monthly trend", owner: owners[5], score: 92, status: "active" },
      { id: `${template.id}-2`, item: "Cohort table", owner: owners[1], score: 69, status: "draft" },
      { id: `${template.id}-3`, item: "Anomaly audit", owner: owners[2], score: 58, status: "active" },
    ]
  }

  return [
    { id: `${template.id}-1`, item: template.title, owner: owners[0], score: 81, status: "active" },
    { id: `${template.id}-2`, item: "Template pages", owner: owners[1], score: 74, status: "draft" },
    { id: `${template.id}-3`, item: "Module health", owner: owners[3], score: 66, status: "inactive" },
  ]
}

function TemplatePageContent({
  template,
  activePage,
}: {
  template: NonNullable<ReturnType<typeof getTemplateBySlug>>
  activePage: string
}) {
  const [tableLoading, setTableLoading] = useState(false)
  const [tableError, setTableError] = useState(false)
  const [tableDensity, setTableDensity] = useState<"compact" | "default" | "comfortable">("default")
  const [search, setSearch] = useState("")
  const [rows, setRows] = useState<RowSelectionState>({})
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [form, setForm] = useState<TemplateFormState>({ customer: "", owner: "", budget: "", notes: "" })
  const [loadingVariant, setLoadingVariant] = useState<"skeleton" | "state">("state")
  const [formResult, setFormResult] = useState("Draft not sent")

  const pageRows = useMemo(
    () =>
      getTemplatePreviewRows(template, activePage).map((row) => ({
        ...row,
      })),
    [activePage, template.id, template.title],
  )

  const filtered = useMemo(() => pageRows.filter((row) => row.item.toLowerCase().includes(search.toLowerCase())), [pageRows, search])
  const selectedCount = Object.keys(rows).length

  const formPayload = useMemo(() => {
    if (!form.customer && !form.owner && !form.budget && !form.notes) return "Nothing yet"
    return `${form.customer || "No name"} • ${form.owner || "No owner"} • ${form.budget || "No budget"}`
  }, [form])

  const columns = useMemo<ColumnDef<TemplateMiniRow>[]>(() => {
    return [
      {
        accessorKey: "item",
        header: ({ column }) => <DataTableSortableHeader column={column}>Item</DataTableSortableHeader>,
      },
      {
        accessorKey: "owner",
        header: "Owner",
      },
      {
        accessorKey: "score",
        header: ({ column }) => <DataTableSortableHeader column={column}>Score</DataTableSortableHeader>,
        cell: ({ row }) => `${row.original.score}%`,
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
      createDataTableActionsColumn<TemplateMiniRow>({
        getActions: (_row, item) => [
          {
            key: "preview",
            label: "Inspect",
            onSelect: () => {
              setOverlayOpen(true)
              setForm((value) => ({ ...value, notes: value.notes || `Inspect row: ${item.item}` }))
            },
          },
        ],
      }),
    ]
  }, [])

  const metrics = useMemo(() => resolvePageMetrics(template, activePage), [activePage, template])

  return (
    <div className="grid gap-4">
      <div className="grid gap-3 lg:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label} className="border-muted/90">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-wide text-muted-foreground">{metric.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{metric.value}</p>
              <p className="text-xs text-muted-foreground">{metric.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>Mini table for {activePage}</CardTitle>
            <CardDescription>Kichik ko‘rinishdagi data table va qismiy CRUD preview.</CardDescription>
          </div>
          <Button size="sm" variant={tableDensity === "compact" ? "default" : "outline"} onClick={() => setTableDensity("compact")}>
            Compact
          </Button>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="flex flex-wrap gap-2">
            {(["compact", "default", "comfortable"] as const).map((item) => (
              <Button
                key={item}
                size="sm"
                variant={tableDensity === item ? "default" : "outline"}
                onClick={() => setTableDensity(item)}
              >
                {item}
              </Button>
            ))}
            <Button
              size="sm"
              variant={tableLoading ? "secondary" : "outline"}
              onClick={() => setTableLoading((value) => !value)}
            >
              Loading: {tableLoading ? "ON" : "OFF"}
            </Button>
            <Button
              size="sm"
              variant={tableError ? "secondary" : "outline"}
              onClick={() => setTableError((value) => !value)}
            >
              Error: {tableError ? "ON" : "OFF"}
            </Button>
            <Button
              size="sm"
              variant={loadingVariant === "state" ? "default" : "outline"}
              onClick={() => setLoadingVariant((value) => (value === "skeleton" ? "state" : "skeleton"))}
            >
              Variant: {loadingVariant}
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={filtered}
            rowSelection={rows}
            onRowSelectionChange={setRows}
            enableRowSelection
            density={tableDensity}
            striped
            bordered
            isLoading={tableLoading}
            isError={tableError}
            loadingVariant={loadingVariant}
            loadingState={{ label: "Loading table", description: "Preview table data is syncing..." }}
            errorState={{ title: "Table sync failed", description: "Turn error OFF for mock demo." }}
            emptyState={{ title: search ? "No results" : "No data", description: "Try another query or remove filters." }}
            toolbarProps={() => ({
              title: `${template.title} • ${activePage}`,
              description: `Mini table for ${template.title} page`,
              search: <SearchInput value={search} onValueChange={setSearch} placeholder="Search item..." />,
            })}
          />
        </CardContent>
        <CardFooter>
          <div className="w-full text-xs text-muted-foreground">
            Selected: <span className="font-medium text-foreground">{selectedCount}</span> item
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mini form</CardTitle>
          <CardDescription>Mock form workflow to simulate action with table/filter/page interaction.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-muted-foreground">Customer</span>
            <input
              value={form.customer}
              onChange={(event) => setForm((value) => ({ ...value, customer: event.target.value }))}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-primary"
              placeholder="Acme partner"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-muted-foreground">Owner</span>
            <input
              value={form.owner}
              onChange={(event) => setForm((value) => ({ ...value, owner: event.target.value }))}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-primary"
              placeholder="Ops owner"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-muted-foreground">Budget</span>
            <input
              value={form.budget}
              onChange={(event) => setForm((value) => ({ ...value, budget: event.target.value }))}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-primary"
              placeholder="1250000"
            />
          </label>
          <label className="grid gap-1 text-sm">
            <span className="text-xs font-medium text-muted-foreground">Notes</span>
            <textarea
              value={form.notes}
              onChange={(event) => setForm((value) => ({ ...value, notes: event.target.value }))}
              rows={3}
              className="resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none ring-0 transition focus:border-primary"
              placeholder="Quick notes"
            />
          </label>
          <div className="mt-2 flex gap-2">
            <Button
              onClick={() => {
                setFormResult(`Saved: ${formPayload}`)
              }}
            >
              Save mock
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setForm({ customer: "", owner: "", budget: "", notes: "" })
                setFormResult("Reset done")
              }}
            >
              Reset
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Result: {formResult}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Overlay preview</CardTitle>
          <CardDescription>Har bir sahifada dialog/overlay behavior namunalari.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Button onClick={() => setOverlayOpen(true)}>Open preview overlay</Button>
        </CardContent>
      </Card>

      <ModalShell
        open={overlayOpen}
        onOpenChange={setOverlayOpen}
        title={`${template.title} • ${activePage}`}
        description="Template page overlay mock"
        footer={
          <Button size="sm" onClick={() => setOverlayOpen(false)}>
            Close
          </Button>
        }
        size="sm"
      >
        <div className="grid gap-2 text-sm text-muted-foreground">
          <p>
            Route: <code className="rounded bg-muted px-1 py-0.5 text-xs">{getTemplatePageRoute(template.id, activePage)}</code>
          </p>
          <p>Owner: {form.owner || "Not set"}</p>
          <p>Budget: {form.budget || "Not set"}</p>
          <p>Payload: {formPayload}</p>
        </div>
      </ModalShell>
    </div>
  )
}

export function TemplateShowcasePage({ slug, page }: { slug: string; page?: string }) {
  const template = getTemplateBySlug(slug)

  if (!template) {
    return (
      <DemoSection
        sectionIndex={1}
        id="template-not-found"
        title="Template not found"
        description="Bu slug bilan template topilmadi. Boshqa template'ni tanlab ko'ring."
      >
        <Link to="/templates" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Back to templates
        </Link>
      </DemoSection>
    )
  }

  const activePageName = template.pages.find((item) => toKebab(item) === toKebab(page ?? "")) ?? template.pages[0]
  const pageLinks = template.pages.map((item) => ({
    name: item,
    slug: toKebab(item),
    route: getTemplatePageRoute(template.id, item),
  }))

  return (
    <DemoSection
      sectionIndex={1}
      id={template.id}
      title={template.title}
      description={`${template.category} • ${template.focus}`}
      action={
        <Link to="/templates" className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          Barcha template'lar
        </Link>
      }
    >
      <TemplateDashboard template={template} initialPage={page} />

      <TemplatePageContent template={template} activePage={activePageName ?? template.pages[0] ?? ""} />

      <Card className="mt-4 border-dashed border-primary/40 bg-primary/5">
        <CardContent className="grid gap-2 py-4 text-sm">
          <p className="font-medium text-primary">Template deep-link</p>
          <code className="inline-flex w-fit rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground">
            {getTemplatePageRoute(template.id, activePageName ?? template.pages[0] ?? "")}
          </code>
          <p className="text-muted-foreground">
            Har bir modul to'g'ri yo'naltirilgan component section bilan bog'langan — bu productiondagi route topologiyasi uchun ham to'g'ri.
          </p>
        </CardContent>
      </Card>

      <div className="mb-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline">{template.focus}</Badge>
              {template.title}
            </CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div>
              <p className="mb-2 text-xs uppercase text-muted-foreground">Pages</p>
              <div className="flex flex-wrap gap-2">
                {pageLinks.map((pageItem) => (
                  <Link
                    key={pageItem.slug}
                    to={pageItem.route}
                    className={cn(
                      buttonVariants({ variant: activePageName === pageItem.name ? "default" : "outline", size: "sm" }),
                      "text-xs",
                    )}
                  >
                    {pageItem.name}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase text-muted-foreground">Modules</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {template.modules.map((module) => (
                  <div key={module} className="rounded-lg border border-border/80 bg-muted/20 px-3 py-2 text-sm">
                    {module}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Template quick brief</CardTitle>
            <CardDescription>Har bir dashboard uchun kerakli modullar va UI yo'nalishi.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <TemplateStat label="Category" value={template.category} />
            <TemplateStat label="Route" value={getTemplatePageRoute(template.id, activePageName ?? template.pages[0] ?? "")} />
            <TemplateStat label="Modules count" value={`${template.modules.length} ta`} />
            <TemplateStat label="Pages count" value={`${template.pages.length} ta`} />
          </CardContent>
          <CardFooter>
            <Link
              to="/components"
              className={cn(buttonVariants({ size: "sm", variant: "default" }), "w-full justify-center")}
            >
              Component Library ga o'tish
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Go to module pages</CardTitle>
            <CardDescription>Template modulari uchun chuqur route'lar.</CardDescription>
          </CardHeader>
          <CardContent>
            {template.modules.length === 0 ? (
              <p className="text-sm text-muted-foreground">Bu template uchun modul route'lari topilmadi.</p>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2">
                {template.modules.map((module) => (
                  <Link
                    key={`${template.id}-${module}`}
                    to={getTemplatePageRouteForModule(template.id, template.modules, module)}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }), "justify-start")}
                  >
                    {module}
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <PlaygroundUsage
        title="Template usage idea"
        items={[
          `Bu sahifa route: ${getTemplatePageRoute(template.id, activePageName ?? template.pages[0] ?? "")}`,
          "Template bo'limlari alohida routega ajratilganligi production'da deploy qilishni osonlashtiradi.",
          "Har bir modulni alohida `DemoSection` yoki page block sifatida ajratib, keyinchalik real app routing bilan ulash mumkin.",
        ]}
        code={`// Template route file shape\nconst templatePages = [\n  ${template.pages
          .map((templatePage) => `"${getTemplatePageRoute(template.id, templatePage)} // ${templatePage}"`)
          .join("\\n  ")}\n]`}
      />
    </DemoSection>
  )
}
