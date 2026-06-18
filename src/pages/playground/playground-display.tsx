import {
  ActivityFeed,
  ActivityIcon,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CheckCircle2Icon,
  ClockIcon,
  ComponentPreview,
  DescriptionList,
  FileTextIcon,
  InfoCard,
  MetricGrid,
  PackageIcon,
  Progress,
  ProgressCard,
  Result,
  ResultAction,
  ShieldCheckIcon,
  StatusBadge,
  Timeline,
  TruckIcon,
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
      description="Reusable metrics, info cards, activity feeds, detail lists, progress, timeline and result components for dashboard pages."
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
            <CardDescription>Details</CardDescription>
            <CardTitle className="text-3xl">4 cols</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Responsive description list</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Activity</CardDescription>
            <CardTitle className="text-3xl">Feed</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Timeline-like dashboard activity</CardContent>
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

        <PlaygroundCard title="InfoCard" description="Flexible informational card with media, actions and footer slots." badge={<Badge variant="outline">card</Badge>}>
          <InfoCard
            eyebrow="Resource summary"
            title="Premium Coffee"
            description="Reusable card for aside panels and detail summaries."
            icon={<PackageIcon />}
            actions={<Button size="xs" variant="outline">Edit</Button>}
            footer={<span className="text-xs text-muted-foreground">Updated 17 Jun 2026</span>}
            compact
          >
            <div className="text-sm text-muted-foreground">Use this instead of rebuilding small info panels in every app.</div>
          </InfoCard>
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
            <TokenPill>data-slot="metric-grid"</TokenPill>
            <TokenPill>data-slot="info-card"</TokenPill>
            <TokenPill>data-slot="activity-feed"</TokenPill>
            <TokenPill>data-slot="description-list"</TokenPill>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            These components are generic display primitives. App pages pass data, actions and labels through props.
          </p>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="Dashboard display suite"
        description="MetricGrid, InfoCard, ActivityFeed, DescriptionList, Timeline, ProgressCard and Result in one reusable documentation example."
        dependencies={["MetricGrid", "InfoCard", "ActivityFeed", "DescriptionList", "Timeline", "Progress", "Result"]}
        code={`<MetricGrid items={metrics} />
<InfoCard title="Resource">Content</InfoCard>
<ActivityFeed items={activity} />
<DescriptionList columns={2} items={items} />
<Timeline items={events} pending />
<Result status="success" title="Saved" />`}
      >
        <div className="grid w-full gap-4 xl:grid-cols-2">
          <MetricGrid className="xl:col-span-2" columns={4} items={metricItems} />

          <DescriptionList
            title="Order detail"
            description="Read-only detail view with actions and spans."
            columns={2}
            items={detailItems}
            actions={<Button size="sm" variant="outline"><FileTextIcon className="mr-2 size-4" />Export</Button>}
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
          "Use `InfoCard` for aside panels, help cards and compact resource summaries.",
          "Use `ActivityFeed` for order history, audit logs, status changes and recent activity.",
          "Use `DescriptionList`, `Progress` and `Result` for detail screens and workflow states.",
        ]}
        code={`<MetricGrid items={metrics} />
<InfoCard title="Summary">...</InfoCard>
<ActivityFeed items={activity} />
<DescriptionList title="Details" columns={2} items={items} />`}
      />
    </DemoSection>
  )
}
