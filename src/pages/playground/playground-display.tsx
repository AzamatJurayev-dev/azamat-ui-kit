import {
  ActivityIcon,
  CheckCircle2Icon,
  ClockIcon,
  FileTextIcon,
  PackageIcon,
  ShieldCheckIcon,
  TruckIcon,
} from "lucide-react"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ComponentPreview,
  DescriptionList,
  Progress,
  ProgressCard,
  Result,
  ResultAction,
  StatusBadge,
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

const timelineItems = [
  { key: "created", title: "Created", description: "Product was added to catalog.", time: "09:30", tone: "success" as const, icon: <CheckCircle2Icon className="size-4" /> },
  { key: "review", title: "Reviewed", description: "Price and stock rules were checked.", time: "10:15", tone: "info" as const, icon: <ShieldCheckIcon className="size-4" /> },
  { key: "ship", title: "Queued", description: "Ready for warehouse sync.", time: "11:40", tone: "warning" as const, icon: <TruckIcon className="size-4" /> },
]

const resultStatuses = ["success", "error", "warning", "info", "not-found", "forbidden", "server-error"] as const

export function DisplaySection() {
  return (
    <DemoSection
      sectionIndex={6}
      id="display"
      eyebrow="Data display"
      title="Display and feedback"
      description="Reusable detail, progress, timeline and result components for dashboard pages and stateful workflows."
      action={<StatusBadge tone="success" dot>New components</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardDescription>Detail blocks</CardDescription>
            <CardTitle className="text-3xl">4 cols</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Responsive description list</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Timeline</CardDescription>
            <CardTitle className="text-3xl">V/H</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Vertical and horizontal flows</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Progress</CardDescription>
            <CardTitle className="text-3xl">6 tones</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Status-aware progress bars</CardContent>
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
            <TokenPill>data-slot="description-list"</TokenPill>
            <TokenPill>data-slot="timeline"</TokenPill>
            <TokenPill>data-slot="progress"</TokenPill>
            <TokenPill>data-slot="result"</TokenPill>
          </div>
          <p className="text-sm leading-6 text-muted-foreground">
            These components are generic display primitives. App pages pass data, actions and labels through props.
          </p>
        </PlaygroundCard>
      </ShowcaseGrid>

      <ComponentPreview
        title="Display suite"
        description="DescriptionList, Timeline, ProgressCard and Result in one reusable documentation example."
        dependencies={["DescriptionList", "Timeline", "Progress", "Result"]}
        code={`<DescriptionList columns={2} items={items} />
<Timeline items={events} pending />
<Progress value={74} tone="success" showValue />
<Result status="success" title="Saved" />`}
      >
        <div className="grid w-full gap-4 xl:grid-cols-2">
          <DescriptionList
            title="Order detail"
            description="Read-only detail view with actions and spans."
            columns={2}
            items={detailItems}
            actions={<Button size="sm" variant="outline"><FileTextIcon className="mr-2 size-4" />Export</Button>}
          />

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
              <CardDescription>Vertical process with pending state.</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline items={timelineItems} pending pendingLabel="Waiting for approval" />
            </CardContent>
          </Card>

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
          "Use `DescriptionList` for product, organization, user and order detail screens instead of hand-building repeated label/value grids.",
          "Use `Timeline` for order history, audit logs, status changes and process steps without creating project-specific history components.",
          "Use `Progress` and `ProgressCard` for onboarding, uploads, sync jobs and KPI completion states.",
          "Use `Result` for final states like success, forbidden, not found and server error screens.",
        ]}
        code={`<DescriptionList title="Details" columns={2} items={items} />
<Timeline items={history} pending />
<ProgressCard title="Completion" value={82} />
<Result status="forbidden" actions={<Button>Go back</Button>} />`}
      />
    </DemoSection>
  )
}
