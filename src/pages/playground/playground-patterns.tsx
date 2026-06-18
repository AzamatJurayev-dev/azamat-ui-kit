import { useMemo } from "react"
import { useForm } from "react-hook-form"
import type { ColumnDef } from "@tanstack/react-table"
import {
  BoxesIcon,
  CheckCircle2Icon,
  LayoutDashboardIcon,
  PackageIcon,
  SettingsIcon,
} from "lucide-react"

import {
  ActivityFeed,
  AppHeader,
  AppShell,
  AppSidebar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ComponentPreview,
  DataTableViewPresets,
  FormBuilder,
  InfoCard,
  MetricGrid,
  ResourceDetailPage,
  ResourcePage,
  ResourcePageSection,
  SidebarNav,
  StatusBadge,
  formSection,
  inputField,
  phoneField,
  switchField,
  useDataTableViewState,
} from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, ShowcaseGrid, TokenPill } from "./playground-ui"

type ProductRow = {
  id: string
  name: string
  status: "active" | "draft" | "archived"
  stock: number
}

type ResourceFormValues = {
  name: string
  phone: string
  active: boolean
}

type ProductView = ProductRow["status"]

const productViews = ["active", "draft", "archived"] as const

const rows: ProductRow[] = [
  { id: "p-1", name: "Premium Coffee", status: "active", stock: 42 },
  { id: "p-2", name: "Green Tea", status: "draft", stock: 18 },
  { id: "p-3", name: "Classic Cocoa", status: "archived", stock: 0 },
]

const metrics = [
  { key: "active", label: "Active", value: "18", description: "Published resources", tone: "success" as const, icon: <CheckCircle2Icon /> },
  { key: "draft", label: "Draft", value: "6", description: "Needs review", tone: "warning" as const, icon: <PackageIcon /> },
  { key: "archived", label: "Archived", value: "3", description: "Hidden records", tone: "muted" as const, icon: <BoxesIcon /> },
]

const activity = [
  { id: "a-1", title: "Resource updated", description: "Stock and pricing fields were changed.", time: "5m", tone: "success" as const },
  { id: "a-2", title: "Draft created", description: "A new product draft was added to the catalogue.", time: "18m", tone: "info" as const },
  { id: "a-3", title: "Archive request", description: "Old SKU was moved into review queue.", time: "1h", tone: "warning" as const },
]

function ResourcePagePreview() {
  const viewState = useDataTableViewState<ProductView>({
    key: "playground:products:view",
    defaultValue: "active",
    allowedValues: productViews,
  })

  const columns = useMemo<ColumnDef<ProductRow>[]>(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "stock", header: "Stock" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <StatusBadge tone={row.original.status === "active" ? "success" : row.original.status === "draft" ? "warning" : "muted"} dot>{row.original.status}</StatusBadge>,
      },
    ],
    []
  )

  const filteredRows = rows.filter((row) => row.status === viewState.value)

  return (
    <ResourcePage<ProductRow>
      title="Products"
      description="ResourcePage combines header, stats, filters, table, content, aside and footer slots. The selected view is persisted."
      eyebrow="Resource pattern"
      actions={<Button size="sm">Create product</Button>}
      stats={<MetricGrid columns={3} items={metrics} />}
      filters={
        <DataTableViewPresets<ProductView>
          value={viewState.value}
          onValueChange={viewState.setValue}
          presets={[
            { value: "active", label: "Active", count: 18 },
            { value: "draft", label: "Draft", count: 6 },
            { value: "archived", label: "Archived", count: 3 },
          ]}
        />
      }
      table={{ columns, data: filteredRows, getRowId: (row) => row.id }}
      aside={<ActivityFeed title="Recent activity" items={activity} compact />}
    >
      <ResourcePageSection title="Resource notes" description="Any custom page content can live above the table.">
        <InfoCard title="Persisted view state" description="useDataTableViewState stores the selected view." compact>
          <p className="text-sm text-muted-foreground">
            Current view: <span className="font-medium text-foreground">{viewState.value}</span>. Refresh the page and it will stay selected.
          </p>
        </InfoCard>
      </ResourcePageSection>
    </ResourcePage>
  )
}

function ResourceDetailPreview() {
  return (
    <ResourceDetailPage
      title="Premium Coffee"
      description="Detail page with status, summary, sections and aside."
      eyebrow="Resource detail"
      status={<StatusBadge tone="success" dot>active</StatusBadge>}
      summary={<MetricGrid columns={3} compact items={metrics} />}
      meta={<InfoCard title="Owner" description="Operations team" compact>Updated 17 Jun 2026</InfoCard>}
      aside={<ActivityFeed title="Audit trail" items={activity} compact />}
      sections={[
        {
          id: "main",
          title: "Main information",
          description: "DescriptionList-backed section inside ResourceDetailPage.",
          items: [
            { key: "sku", label: "SKU", value: "COF-001" },
            { key: "price", label: "Price", value: "42,000 UZS" },
            { key: "stock", label: "Stock", value: "42" },
            { key: "category", label: "Category", value: "Drinks" },
          ],
        },
      ]}
    />
  )
}

function FormBuilderPatternPreview() {
  const form = useForm<ResourceFormValues>({
    defaultValues: { name: "Premium Coffee", phone: "+998 90 123 45 67", active: true },
  })

  const sections = [
    formSection<ResourceFormValues>({
      id: "resource",
      title: "Quick edit",
      description: "Reusable form section using FormBuilder helpers.",
      fields: [
        inputField<ResourceFormValues>({ id: "name", props: { name: "name", label: "Name" } }),
        phoneField<ResourceFormValues>({ id: "phone", props: { name: "phone", label: "Phone" } }),
        switchField<ResourceFormValues>({ id: "active", colSpan: "full", props: { name: "active", label: "Active" } }),
      ],
    }),
  ]

  return <FormBuilder control={form.control} sections={sections} submitLabel="Save" resetLabel="Reset" />
}

function AppShellPatternPreview() {
  const navItems = [
    { key: "dashboard", label: "Dashboard", active: true, icon: <LayoutDashboardIcon className="size-4" /> },
    { key: "products", label: "Products", icon: <PackageIcon className="size-4" /> },
    { key: "settings", label: "Settings", icon: <SettingsIcon className="size-4" /> },
  ]

  return (
    <div className="overflow-hidden rounded-xl border bg-background">
      <AppShell
        className="min-h-[420px]"
        sidebarMode="static"
        showMobileMenuButton={false}
        sidebar={<AppSidebar header={<div className="px-3 py-2 font-semibold">Demo app</div>}><SidebarNav items={navItems} /></AppSidebar>}
        header={<AppHeader left="Resource dashboard" right={<Badge variant="outline">static preview</Badge>} />}
        aside={<InfoCard title="Aside" description="AppShell aside slot" compact>Secondary content</InfoCard>}
        mainClassName="p-4"
      >
        <div className="grid gap-4">
          <MetricGrid columns={3} items={metrics} compact />
          <InfoCard title="AppShell pattern" description="Header, sidebar, main and aside slots in one reusable layout." compact>
            <p className="text-sm text-muted-foreground">Use static mode for embedded previews and fixed mode for full dashboards.</p>
          </InfoCard>
        </div>
      </AppShell>
    </div>
  )
}

export function PatternsSection() {
  return (
    <DemoSection
      sectionIndex={9}
      id="patterns"
      eyebrow="Page patterns"
      title="Resource and app patterns"
      description="Composable page-level patterns for dashboards: ResourcePage, ResourceDetailPage, FormBuilder and AppShell."
      action={<StatusBadge tone="success" dot>API-free</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <Card className="border-primary/15 bg-background shadow-lg shadow-primary/5">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">Patterns</Badge>
              <Badge variant="outline">Resource pages</Badge>
              <Badge variant="outline">AppShell</Badge>
            </div>
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">Page-level patterns for full app screens.</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-6">
              Resource pages, detail pages, form builders and shell layouts give the app a stable screen architecture instead of isolated widgets.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Screen types</p>
              <div className="mt-2 grid gap-2">
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Resource list</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Resource detail</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Dashboard shell</div>
              </div>
            </div>
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Reusable slots</p>
              <div className="mt-2 grid gap-2 text-sm text-muted-foreground">
                <div className="rounded-xl border bg-background px-3 py-2">Header + stats</div>
                <div className="rounded-xl border bg-background px-3 py-2">Filters + table</div>
                <div className="rounded-xl border bg-background px-3 py-2">Summary + aside</div>
              </div>
            </div>
            <div className="rounded-2xl border bg-background/80 p-4 sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">State</p>
                <Badge variant="outline" className="text-[11px]">Shell ready</Badge>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Filter-first list.</div>
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Aligned detail.</div>
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Shell frame.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-muted/15">
          <CardHeader>
            <CardTitle className="text-lg">Pattern overview</CardTitle>
            <CardDescription>What each pattern is optimized for.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="rounded-2xl border bg-background p-3">
              <p className="text-xs text-muted-foreground">ResourcePage</p>
              <p className="mt-1 text-sm font-medium">List screens with metrics, filters, table and activity.</p>
            </div>
            <div className="rounded-2xl border bg-background p-3">
              <p className="text-xs text-muted-foreground">ResourceDetailPage</p>
              <p className="mt-1 text-sm font-medium">Detail screens with summary, sections and audit trail.</p>
            </div>
            <div className="rounded-2xl border bg-background p-3">
              <p className="text-xs text-muted-foreground">AppShell</p>
              <p className="mt-1 text-sm font-medium">Dashboard shell with sidebar, header, main and aside.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="ResourcePage" description="List page with header, stats, filters, table and persisted views." badge={<Badge variant="outline">list</Badge>}>
          <TokenPill>stats + filters + table</TokenPill>
        </PlaygroundCard>
        <PlaygroundCard title="ResourceDetailPage" description="Detail page with status, summary, sections and activity." badge={<Badge variant="outline">detail</Badge>}>
          <TokenPill>summary + sections + aside</TokenPill>
        </PlaygroundCard>
        <PlaygroundCard title="AppShell" description="Header/sidebar/main/aside layout for dashboards." badge={<Badge variant="outline">shell</Badge>}>
          <TokenPill>static or fixed layout</TokenPill>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="ResourcePage pattern"
        description="A complete resource list screen using table, metrics, saved views, persisted view state and activity aside."
        dependencies={["ResourcePage", "MetricGrid", "DataTableViewPresets", "useDataTableViewState", "ActivityFeed"]}
        code={`const viewState = useDataTableViewState({
  key: "products:view",
  defaultValue: "active",
  allowedValues: ["active", "draft", "archived"],
})

<ResourcePage
  title="Products"
  filters={<DataTableViewPresets value={viewState.value} onValueChange={viewState.setValue} presets={views} />}
  table={{ columns, data: filteredRows }}
/>`}
      >
        <ResourcePagePreview />
      </ComponentPreview>

      <ComponentPreview
        title="ResourceDetailPage pattern"
        description="A complete detail screen with status, summary, DescriptionList sections and aside content."
        dependencies={["ResourceDetailPage", "DescriptionList", "MetricGrid", "InfoCard"]}
        code={`<ResourceDetailPage
  title="Premium Coffee"
  status={<StatusBadge>active</StatusBadge>}
  summary={<MetricGrid items={metrics} />}
  sections={[{ id: "main", items }]}
/>`}
      >
        <ResourceDetailPreview />
      </ComponentPreview>

      <ComponentPreview
        title="FormBuilder and AppShell patterns"
        description="Config-driven forms and dashboard shell layout previews."
        dependencies={["FormBuilder", "AppShell", "AppSidebar", "AppHeader"]}
        code={`<FormBuilder control={form.control} sections={sections} />
<AppShell sidebar={<AppSidebar />} header={<AppHeader />}>...</AppShell>`}
      >
        <div className="grid w-full gap-4 xl:grid-cols-2">
          <FormBuilderPatternPreview />
          <AppShellPatternPreview />
        </div>
      </ComponentPreview>

      <PlaygroundUsage
        title="Pattern usage"
        items={[
          "Use ResourcePage for list screens that need header, stats, filters, table and aside composition.",
          "Use useDataTableViewState with DataTableViewPresets when the selected view should survive refresh.",
          "Use ResourceDetailPage for read-only detail screens with status, summary, sections and audit activity.",
          "Use AppShell as the outer dashboard shell; keep API, auth and route policy in the consuming app.",
        ]}
        code={`<ResourcePage table={{ columns, data }} />
<ResourceDetailPage sections={sections} />
<FormBuilder control={form.control} fields={fields} />
<AppShell sidebar={sidebar} header={header}>{children}</AppShell>`}
      />
    </DemoSection>
  )
}





