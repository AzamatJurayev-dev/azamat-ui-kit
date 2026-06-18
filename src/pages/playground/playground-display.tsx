import {
  ActivityIcon,
  CheckCircle2Icon,
  ClockIcon,
  FileTextIcon,
  PackageIcon,
  PlusIcon,
  ShieldCheckIcon,
  TruckIcon,
  UploadCloudIcon,
} from "lucide-react"

import {
  ActivityFeed,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ComponentPreview,
  CopyButton,
  DescriptionList,
  InfoCard,
  MetricGrid,
  Progress,
  ProgressCard,
  QuickActionGrid,
  Result,
  ResultAction,
  StatusBadge,
  StatusLegend,
  Timeline,
} from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, ShowcaseGrid, TokenPill } from "./playground-ui"

const detailItems = [
  { key: "name", label: "Product", value: "Premium Coffee", icon: <PackageIcon /> },
  { key: "sku", label: "SKU", value: "COF-001" },
  { key: "status", label: "Status", value: <StatusBadge tone="success" dot>active</StatusBadge> },
  { key: "price", label: "Price", value: "42,000 UZS" },
  { key: "owner", label: "Owner", value: "Operations team" },
  { key: "updated", label: "Updated", value: "17 Jun 2026", description: "Mock local date" },
  { key: "notes", label: "Notes", value: "Reusable details block with column span.", span: 2 as const },
]

const metricItems = [
  { key: "revenue", label: "Revenue", value: "128.4M", description: "Monthly total", trend: "+12%", tone: "success" as const, icon: <ActivityIcon /> },
  { key: "orders", label: "Orders", value: "1,248", description: "Confirmed orders", trend: "+8%", tone: "info" as const, icon: <PackageIcon /> },
  { key: "pending", label: "Pending", value: "42", description: "Needs review", trend: "-3", tone: "warning" as const, icon: <ClockIcon /> },
  { key: "failed", label: "Failed", value: "7", description: "Import errors", trend: "Fix", tone: "danger" as const, icon: <FileTextIcon /> },
]

const quickActions = [
  { key: "create", label: "Create product", description: "Open a product creation flow.", icon: <PlusIcon />, badge: "New" },
  { key: "import", label: "Import file", description: "Upload Excel or CSV import data.", icon: <UploadCloudIcon />, badge: "CSV" },
  { key: "audit", label: "Review audit", description: "Check recent product changes.", icon: <ShieldCheckIcon />, badge: "3" },
]

const statusLegendItems = [
  { key: "active", label: "Active", description: "Visible and available", count: 18, tone: "success" as const },
  { key: "draft", label: "Draft", description: "Needs review before publish", count: 6, tone: "warning" as const },
  { key: "archived", label: "Archived", description: "Hidden from main lists", count: 3, tone: "muted" as const },
  { key: "failed", label: "Failed", description: "Requires manual fix", count: 2, tone: "danger" as const },
]

const timelineItems = [
  { key: "created", title: "Created", description: "Product was added to catalog.", time: "09:30", tone: "success" as const, icon: <CheckCircle2Icon className="size-4" /> },
  { key: "review", title: "Reviewed", description: "Price and stock rules were checked.", time: "10:15", tone: "info" as const, icon: <ShieldCheckIcon className="size-4" /> },
  { key: "ship", title: "Queued", description: "Ready for warehouse sync.", time: "11:40", tone: "warning" as const, icon: <TruckIcon className="size-4" /> },
]

const activityItems = [
  { id: "1", title: "Order approved", description: "Manager confirmed the order and sent it to fulfillment.", time: "2m", tone: "success" as const },
  { id: "2", title: "Stock warning", description: "Premium Coffee reached the minimum stock threshold.", time: "14m", tone: "warning" as const },
  { id: "3", title: "Import completed", description: "124 products were synced from the import file.", time: "1h", tone: "info" as const },
]

const resultStatuses = ["success", "error", "warning", "info", "not-found", "forbidden", "server-error"] as const

export function DisplaySection() {
  return (
    <DemoSection
      sectionIndex={6}
      id="display"
      eyebrow="Data display"
      title="Display and feedback"
      description="Reusable metrics, info cards, action grids, status legends, activity feeds, detail lists, progress, timeline and result components for dashboard pages."
      action={<StatusBadge tone="success" dot>New components</StatusBadge>}
    >
      <MetricGrid className="mb-4" items={metricItems} />

      <section className="mb-4 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Metrics</CardDescription>
            <CardTitle className="text-3xl">4 cards</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">MetricGrid for dashboards</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Actions</CardDescription>
            <CardTitle className="text-3xl">Grid</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">QuickActionGrid shortcuts</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Status</CardDescription>
            <CardTitle className="text-3xl">Legend</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Counts and tone meanings</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Result</CardDescription>
            <CardTitle className="text-3xl">7 states</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Success, error, 404, forbidden and more</CardContent>
        </Card>
      </section>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="MetricGrid" description="Use for dashboard KPIs, resource summaries and page stats." badge={<Badge variant="outline">metrics</Badge>}>
          <MetricGrid columns={2} compact items={metricItems.slice(0, 4)} />
        </PlaygroundCard>

        <PlaygroundCard title="QuickActionGrid" description="Use for dashboard shortcuts, resource actions and module launchers." badge={<Badge variant="outline">actions</Badge>}>
          <QuickActionGrid columns={1} compact items={quickActions} />
        </PlaygroundCard>

        <PlaygroundCard title="StatusLegend" description="Explain statuses and show counts with consistent tones." badge={<Badge variant="outline">legend</Badge>}>
          <StatusLegend title="Product status" items={statusLegendItems} compact />
        </PlaygroundCard>
      </ShowcaseGrid>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="InfoCard" description="Flexible informational card with media, actions and footer slots." badge={<Badge variant="outline">card</Badge>}>
          <InfoCard
            eyebrow="Resource summary"
            title="Premium Coffee"
            description="Reusable card for aside panels and detail summaries."
            icon={<PackageIcon />}
            actions={<CopyButton value="COF-001" size="xs" variant="outline" copyLabel="Copy SKU" copiedLabel="Copied" />}
            footer={<span className="text-xs text-muted-foreground">Updated 17 Jun 2026</span>}
            compact
          >
            <div className="text-sm text-muted-foreground">Use this instead of rebuilding small info panels in every app.</div>
          </InfoCard>
        </PlaygroundCard>

        <PlaygroundCard title="CopyButton" description="Clipboard action with copied state and icon swap." badge={<Badge variant="outline">clipboard</Badge>}>
          <div className="grid gap-3">
            <div className="rounded-lg border bg-muted/25 p-3 text-sm">SKU: COF-001</div>
            <div className="flex flex-wrap gap-2">
              <CopyButton value="COF-001" size="sm" />
              <CopyButton value="https://example.com/products/COF-001" size="sm" variant="outline" copyLabel="Copy link" />
              <CopyButton value="42,000 UZS" size="sm" variant="ghost" showIcon={false} copyLabel="Copy price" />
            </div>
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="ActivityFeed" description="Use for audit history, recent activity and timeline sidebars." badge={<Badge variant="outline">feed</Badge>}>
          <ActivityFeed title="Recent activity" items={activityItems} compact />
        </PlaygroundCard>
      </ShowcaseGrid>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="DescriptionList" description="Use for detail pages, read-only views and audit summaries." badge={<Badge variant="outline">details</Badge>}>
          <DescriptionList title="Product details" description="Responsive label/value grid" items={detailItems} columns={2} compact />
        </PlaygroundCard>

        <PlaygroundCard title="Progress" description="Use in uploads, onboarding, tasks and KPIs." badge={<Badge variant="outline">status</Badge>}>
          <div className="grid gap-3">
            <Progress label="Catalog sync" value={74} tone="success" showValue />
            <Progress label="Risk review" value={44} tone="warning" showValue />
            <Progress label="Failed imports" value={18} tone="danger" showValue />
            <Progress label="Indeterminate" indeterminate showValue={false} description="Waiting for server event" />
          </div>
        </PlaygroundCard>

        <PlaygroundCard title="CSS display tokens" description="Display components follow the shared card/control style." badge={<Badge variant="outline">CSS</Badge>}>
          <div className="flex flex-wrap gap-2">
            <TokenPill>data-slot="copy-button"</TokenPill>
            <TokenPill>data-slot="quick-action-grid"</TokenPill>
            <TokenPill>data-slot="status-legend"</TokenPill>
            <TokenPill>data-slot="activity-feed"</TokenPill>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            These components are generic display/action primitives. App pages pass data, actions and labels through props.
          </p>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="Dashboard display and action suite"
        description="MetricGrid, QuickActionGrid, StatusLegend, CopyButton, InfoCard, ActivityFeed, DescriptionList, Timeline, ProgressCard and Result in one reusable documentation example."
        dependencies={["MetricGrid", "QuickActionGrid", "StatusLegend", "CopyButton", "InfoCard", "ActivityFeed", "DescriptionList", "Timeline", "Progress", "Result"]}
        code={`<MetricGrid items={metrics} />
<QuickActionGrid items={actions} />
<StatusLegend items={statuses} />
<CopyButton value="COF-001" />
<ActivityFeed items={activity} />`}
      >
        <div className="grid w-full gap-4 xl:grid-cols-2">
          <MetricGrid className="xl:col-span-2" columns={4} items={metricItems} />
          <QuickActionGrid items={quickActions} />
          <StatusLegend title="Status legend" items={statusLegendItems} orientation="grid" />

          <DescriptionList
            title="Order detail"
            description="Read-only detail view with actions and spans."
            columns={2}
            items={detailItems}
            actions={<CopyButton value="COF-001" size="sm" variant="outline" copyLabel="Copy SKU" />}
          />

          <ActivityFeed title="Activity feed" description="Recent user and system events." items={activityItems} />

          <ProgressCard
            title="Profile completion"
            description="Reusable card wrapper around progress."
            value={82}
            tone="info"
            footer={<div className="flex items-center gap-2 text-xs text-muted-foreground"><ActivityIcon className="size-3.5" /> 3 steps left</div>}
          />

          <Result
            status="success"
            title="Changes saved"
            description="Use Result for empty routes, success screens, errors and final workflow states."
            actions={
              <>
                <ResultAction size="sm">Continue</ResultAction>
                <ResultAction size="sm" variant="outline">View details</ResultAction>
              </>
            }
          />
        </div>
      </ComponentPreview>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <PlaygroundCard title="Horizontal timeline" description="Compact process view for cards and dashboards." badge={<Badge variant="outline">horizontal</Badge>}>
          <Timeline items={timelineItems} orientation="horizontal" compact />
        </PlaygroundCard>
        <PlaygroundCard title="Result status matrix" description="Common app-level result states." badge={<Badge variant="outline">states</Badge>}>
          <div className="grid gap-2 sm:grid-cols-2">
            {resultStatuses.map((status) => (
              <Result
                key={status}
                status={status}
                compact
                title={status}
                description={<span className="text-xs">Reusable status view</span>}
                className="rounded-xl border bg-muted/20"
              />
            ))}
          </div>
        </PlaygroundCard>
      </section>

      <PlaygroundUsage
        title="Display usage"
        items={[
          "Use `MetricGrid` for dashboard KPIs and ResourcePage stats instead of hand-building stat cards.",
          "Use `QuickActionGrid` for common dashboard actions and resource shortcuts.",
          "Use `StatusLegend` when users need to understand status colors, counts and meanings.",
          "Use `CopyButton` for IDs, links, API keys, tracking numbers and reference values.",
        ]}
        code={`<MetricGrid items={metrics} />
<QuickActionGrid items={actions} />
<StatusLegend title="Statuses" items={statuses} />
<CopyButton value="COF-001" />`}
      />
    </DemoSection>
  )
}
