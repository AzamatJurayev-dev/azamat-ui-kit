import * as React from "react"
import {
  ArchiveIcon,
  BellIcon,
  ChevronRightIcon,
  DownloadIcon,
  FilterIcon,
  LayoutDashboardIcon,
  MoreHorizontalIcon,
  SearchIcon,
  UploadCloudIcon,
} from "lucide-react"

import {
  ActionMenu,
  Alert,
  AlertDialog,
  Badge,
  BarChart,
  Button,
  ButtonGroup,
  Calendar,
  ChartFrame,
  ChartLegend,
  CommandPalette,
  DescriptionList,
  DonutChart,
  Drawer,
  FileUpload,
  FilterBar,
  InfoCard,
  Input,
  List,
  OtpInput,
  PageState,
  Pagination,
  Progress,
  QuickActionGrid,
  RangeSlider,
  Rating,
  Slider,
  StatusDot,
  StatusLegend,
  Stepper,
  TagInput,
  Tabs,
  TabsList,
  TabsTrigger,
  Timeline,
  Wizard,
  Avatar,
} from "@/index"
import { PreviewFileDropzone as FileDropzone, PreviewStatCard as StatCard } from "@/showcase/preview-compositions"
import { ResourceDetailPage } from "@/components/patterns/resource-detail-page"
import { ResourcePage, ResourcePageSection } from "@/components/patterns/resource-page"

import type { ShowcaseDemoDefinition, ShowcaseDemoProps } from "./types"

export function renderShowcasePreview(
  definition: ShowcaseDemoDefinition,
  state: ShowcaseDemoProps["state"],
  setState: ShowcaseDemoProps["setState"]
) {
  if (definition.kind === "inputs") return <InputPreview slug={definition.slug} state={state} setState={setState} />
  if (definition.kind === "form") return <FormPreview state={state} setState={setState} />
  if (definition.kind === "overlay") return <OverlayPreview slug={definition.slug} />
  if (definition.kind === "navigation") return <NavigationPreview slug={definition.slug} />
  if (definition.kind === "feedback") return <FeedbackPreview slug={definition.slug} />
  if (definition.kind === "display") return <DisplayPreview slug={definition.slug} />
  if (definition.kind === "actions") return <ActionsPreview slug={definition.slug} state={state} setState={setState} />
  if (definition.kind === "layout") return <LayoutPreview slug={definition.slug} />
  if (definition.kind === "data-table") return <DataTablePartsPreview slug={definition.slug} />
  if (definition.kind === "calendar") return <CalendarPreview />
  if (definition.kind === "upload") return <UploadPreview slug={definition.slug} />
  if (definition.kind === "wizard") return <WizardPreview slug={definition.slug} />
  if (definition.kind === "patterns") return <PatternsPreview slug={definition.slug} />

  return null
}

function SurfaceStatusBadge({
  tone,
  children,
}: {
  tone: "success" | "warning" | "danger" | "info"
  children: React.ReactNode
}) {
  const variant = tone === "danger" ? "destructive" : tone === "warning" ? "outline" : "secondary"
  return <Badge variant={variant}>{children}</Badge>
}

function InputPreview({
  slug,
  state,
  setState,
}: {
  slug: string
  state: ShowcaseDemoProps["state"]
  setState: ShowcaseDemoProps["setState"]
}) {
  const value = state.textValue
  const onValueChange = (nextValue: string) => setState({ textValue: nextValue })

  if (slug === "slider") {
    return <Slider label="Density" description="Tune content density." defaultValue={64} showValue />
  }

  if (slug === "range-slider") {
    return <RangeSlider label="Revenue range" description="Filter between two values." defaultValue={[20, 80]} showValue />
  }

  if (slug === "rating") {
    return <Rating defaultValue={4} labels={{ clear: "Reset" }} />
  }

  if (slug === "otp-input") {
    return <OtpInput value={value.replace(/\D/g, "").slice(0, 6)} onValueChange={onValueChange} />
  }

  if (slug === "color-input") {
    return <Input type="color" defaultValue="#22c55e" aria-label="Accent color" />
  }

  if (slug === "tag-input") {
    return <TagInput defaultValue={["dashboard", "beta", "ops"]} placeholder="Add label" />
  }

  return <Input value={value} onChange={(event) => setState({ textValue: event.currentTarget.value })} placeholder="Unified input" />
}

function FormPreview({
  state,
  setState,
}: {
  state: ShowcaseDemoProps["state"]
  setState: ShowcaseDemoProps["setState"]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-[color:var(--aui-page-foreground)]">Email address</span>
        <Input value={state.textValue} onChange={(event) => setState({ textValue: event.currentTarget.value })} />
        <span className="text-xs text-[color:var(--aui-page-muted)]">
          Form wrappers keep label, hint and error spacing consistent.
        </span>
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-[color:var(--aui-page-foreground)]">Status</span>
        <Input type="search" value="Active customers" resultCount={7} readOnly />
        <span className="text-xs text-emerald-500">Ready to submit</span>
      </label>
    </div>
  )
}

function OverlayPreview({ slug }: { slug: string }) {
  if (slug === "dialog-actions") {
    return (
      <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4">
        <ButtonGroup attached={false}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="outline">Save draft</Button>
          <Button>Publish</Button>
        </ButtonGroup>
      </div>
    )
  }

  if (slug === "alert-dialog") {
    return (
      <AlertDialog
        open={false}
        title="Archive invoice?"
        description="This keeps the invoice readable but removes it from active queues."
      >
        <Button variant="destructive">Open alert</Button>
      </AlertDialog>
    )
  }

  if (slug === "drawer") {
    return (
      <Drawer
        open={false}
        trigger={<Button variant="outline">Open drawer</Button>}
        title="Customer details"
        description="Side panel for fast inspection."
      >
        <DescriptionList
          items={[
            { key: "plan", label: "Plan", value: "Scale" },
            { key: "owner", label: "Owner", value: "Tembro" },
          ]}
        />
      </Drawer>
    )
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2 rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4">
      <Button variant="ghost">Cancel</Button>
      <Button variant="outline">Save draft</Button>
      <Button>Publish</Button>
    </div>
  )
}

function NavigationPreview({ slug }: { slug: string }) {
  if (slug === "pagination") {
    return <Pagination page={3} pageCount={9} onPageChange={() => undefined} />
  }

  return (
    <Tabs defaultValue="overview">
      <TabsList variant="pills" overflow="wrap">
        <TabsTrigger value="overview" variant="pills">Overview</TabsTrigger>
        <TabsTrigger value="usage" variant="pills">Usage</TabsTrigger>
        <TabsTrigger value="api" variant="pills">API</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

function FeedbackPreview({ slug }: { slug?: string }) {
  if (slug === "alert") {
    return (
      <Alert
        tone="warning"
        title="Review needed"
        description="Billing rules changed and one approval is pending."
        action={<Button size="sm">Open</Button>}
      />
    )
  }

  if (slug === "page-state") {
    return (
      <PageState
        title="Workspace connected"
        description="The route is ready to accept live data and team actions."
        tone="success"
        action={<Button size="sm">Continue</Button>}
      />
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      <SurfaceStatusBadge tone="success">Live</SurfaceStatusBadge>
      <SurfaceStatusBadge tone="warning">Needs review</SurfaceStatusBadge>
      <SurfaceStatusBadge tone="danger">Blocked</SurfaceStatusBadge>
      <SurfaceStatusBadge tone="info">Queued</SurfaceStatusBadge>
    </div>
  )
}

function DisplayPreview({ slug }: { slug: string }) {
  if (slug === "description-list") {
    return (
      <DescriptionList
        title="Invoice details"
        description="Structured facts with responsive columns."
        items={[
          { key: "id", label: "Invoice", value: "#4821" },
          { key: "amount", label: "Amount", value: "$12,420" },
          { key: "status", label: "Status", value: <SurfaceStatusBadge tone="success">Paid</SurfaceStatusBadge> },
          { key: "owner", label: "Owner", value: "Finance team" },
        ]}
      />
    )
  }

  if (slug === "progress") {
    return <Progress label="Migration progress" description="Production rollout" value={68} tone="success" showValue />
  }

  if (slug === "timeline") {
    return (
      <Timeline
        items={[
          { key: "created", title: "Created", description: "Invoice generated", time: "09:20", tone: "success" },
          { key: "review", title: "Review", description: "Finance team assigned", time: "10:05", tone: "info" },
          { key: "approve", title: "Approval", description: "Waiting for manager", time: "Now", tone: "warning" },
        ]}
        pending
        pendingLabel="Paid"
      />
    )
  }

  if (slug === "metric-card" || slug === "stat-card") {
    return (
      <StatCard
        title="Revenue"
        value="$84.2k"
        description="Compared with last month"
        trend={{ value: "+12.4%", tone: "success" }}
        icon={<LayoutDashboardIcon />}
      />
    )
  }

  if (slug === "status-dot") {
    return (
      <div className="grid gap-3">
        <StatusDot tone="success" pulse label="API healthy" />
        <StatusDot tone="warning" label="Sync delayed" />
        <StatusDot tone="danger" label="Webhook failed" />
      </div>
    )
  }

  if (slug === "notification-center") {
    return (
      <List
        items={[
          { key: "1", title: "Build completed", description: "Dashboard docs deployment is live.", extra: "Now" },
          { key: "2", title: "New comment", description: "Review requested on DataTable API.", extra: "8m" },
          { key: "3", title: "Publish reminder", description: "Package version is ready for release.", extra: "1h" },
        ]}
      />
    )
  }

  if (slug === "status-legend") {
    return (
      <StatusLegend
        title="Delivery states"
        description="Explain what each state means and how often it appears."
        orientation="grid"
        items={[
          { key: "live", label: "Live", description: "Healthy production routes", tone: "success", count: 18 },
          { key: "review", label: "Review", description: "Waiting for QA approval", tone: "warning", count: 4 },
          { key: "blocked", label: "Blocked", description: "Needs engineering action", tone: "danger", count: 1 },
        ]}
      />
    )
  }

  if (slug === "charts") {
    const channelData = [
      { label: "Organic", value: 42, color: "var(--aui-brand)" },
      { label: "Paid", value: 28, color: "var(--aui-success)" },
      { label: "Referral", value: 18, color: "var(--aui-warning)" },
      { label: "Direct", value: 12, color: "var(--aui-danger)" },
    ]

    return (
      <div className="grid items-start gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <ChartFrame title="Pipeline by week" description="BarChart inside the shared chart frame.">
          <BarChart
            data={[
              { label: "Mon", value: 18 },
              { label: "Tue", value: 26 },
              { label: "Wed", value: 21 },
              { label: "Thu", value: 34 },
              { label: "Fri", value: 29 },
            ]}
            valueFormatter={(value) => `$${value}k`}
          />
        </ChartFrame>
        <ChartFrame title="Traffic mix" description="DonutChart with legend and center value.">
          <div className="grid justify-items-center gap-4">
            <DonutChart data={channelData} centerValue="88k" centerLabel="Visitors" />
            <ChartLegend data={channelData} />
          </div>
        </ChartFrame>
      </div>
    )
  }

  return (
    <InfoCard
      title="Azamat Jurayev"
      description="Product designer and maintainer"
      media={<Avatar name="Azamat Jurayev" />}
      actions={<Button size="sm">Invite</Button>}
    />
  )
}

function ActionsPreview({
  slug,
  state,
  setState,
}: {
  slug: string
  state: ShowcaseDemoProps["state"]
  setState: ShowcaseDemoProps["setState"]
}) {
  if (slug === "filter-bar") {
    return (
      <FilterBar
        search={<Input type="search" value={state.textValue} onValueChange={(value) => setState({ textValue: value })} placeholder="Search invoices..." />}
        onReset={() => setState({ textValue: "" })}
        chips={[
          { key: "status", label: "Status", value: "Active", tone: "success" },
          { key: "owner", label: "Owner", value: "Azamat", tone: "default" },
        ]}
        onRemoveChip={() => undefined}
        filters={<Button variant="outline" size="sm"><FilterIcon data-icon="inline-start" />Status</Button>}
        actions={<Button size="sm">Export</Button>}
      />
    )
  }

  if (slug === "command-palette") {
    return (
      <div className="grid gap-3">
        <div className="flex items-center gap-2 rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] px-3 py-2">
          <SearchIcon className="size-4 text-[color:var(--aui-page-muted)]" />
          <span className="text-sm text-[color:var(--aui-page-muted)]">Command palette preview: search routes, components and actions.</span>
        </div>
        <CommandPalette
          open={false}
          onOpenChange={() => undefined}
          groups={[
            {
              id: "navigation",
              label: "Navigation",
              items: [
                { id: "docs", label: "Open docs", icon: <SearchIcon className="size-4" /> },
                { id: "components", label: "Browse components", icon: <LayoutDashboardIcon className="size-4" /> },
              ],
            },
          ]}
        />
      </div>
    )
  }

  if (slug === "button-group") {
    return (
      <ButtonGroup
        items={[
          { key: "day", label: "Day" },
          { key: "week", label: "Week" },
          { key: "month", label: "Month" },
        ]}
      />
    )
  }

  if (slug === "quick-action-grid") {
    return (
      <QuickActionGrid
        columns={3}
        items={[
          { key: "new", label: "New invoice", description: "Create a fresh billing row.", badge: "N" },
          { key: "import", label: "Import CSV", description: "Bring finance data into the table.", badge: "I" },
          { key: "share", label: "Share workspace", description: "Invite team members to the route.", badge: "S" },
        ]}
      />
    )
  }

  if (slug === "data-table-saved-filters") {
    return (
      <div className="grid gap-3">
        <FilterBar
          chips={[
            { key: "status", label: "Status", value: "Active", tone: "success" },
            { key: "owner", label: "Owner", value: "Azamat", tone: "default" },
            { key: "region", label: "Region", value: "APAC", tone: "info" },
          ]}
          onRemoveChip={() => undefined}
          onReset={() => undefined}
        />
        <ButtonGroup
          attached={false}
          items={[
            { key: "default", label: "Default", variant: "secondary" },
            { key: "billing", label: "Billing" },
            { key: "ops", label: "Operations" },
          ]}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4">
      <div>
        <p className="font-medium text-[color:var(--aui-page-foreground)]">Invoice #4821</p>
        <p className="text-sm text-[color:var(--aui-page-muted)]">Pending approval</p>
      </div>
      <ActionMenu
        label="Actions"
        actions={[
          { key: "open", label: "Open", icon: <ChevronRightIcon className="size-4" /> },
          { key: "download", label: "Download", icon: <DownloadIcon className="size-4" /> },
          { key: "archive", label: "Archive", icon: <ArchiveIcon className="size-4" />, destructive: true },
        ]}
        trigger={<Button variant="outline" size="icon-sm" aria-label="Open actions"><MoreHorizontalIcon /></Button>}
      />
    </div>
  )
}

function LayoutPreview({ slug }: { slug: string }) {
  if (slug === "app-header") {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-3">
        <div className="flex items-center gap-2">
          <LayoutDashboardIcon className="size-4" />
          <span className="font-medium">Dashboard</span>
        </div>
        <Badge variant="secondary">Preview</Badge>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-sm" aria-label="Notifications"><BellIcon /></Button>
          <Button size="sm">Deploy</Button>
        </div>
      </div>
    )
  }

  return (
    <StatCard
      title="Revenue"
      value="$84.2k"
      description="Compared with last month"
      trend={{ value: "+12.4%", tone: "success" }}
      helperText="StatCard keeps KPI, helper text and trend in one compact tile."
    />
  )
}

function DataTablePartsPreview({ slug }: { slug: string }) {
  const labels: Record<string, string> = {
    "data-table-pagination": "Pagination footer",
    "data-table-toolbar": "Search and filter toolbar",
    "data-table-column-visibility-menu": "Column visibility",
    "data-table-select-column": "Row selection",
    "data-table-sortable-header": "Sortable header",
    "data-table-row-actions": "Row actions",
    "data-table-actions-column": "Actions column",
    "data-table-bulk-actions": "Bulk action bar",
    "data-table-view-presets": "Saved view presets",
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--aui-divider)] p-3">
        <Input type="search" value="" placeholder="Search rows..." className="max-w-xs" readOnly />
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FilterIcon data-icon="inline-start" />Filters</Button>
          <Button size="sm">Create</Button>
        </div>
      </div>
      <div className="grid grid-cols-[40px_1fr_120px_72px] border-b border-[color:var(--aui-divider)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--aui-page-muted)]">
        <span><input type="checkbox" aria-label="Select rows" /></span>
        <span>Name</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      {["Tembro", "Registry", "Dashboard"].map((row, index) => (
        <div key={row} className="grid grid-cols-[40px_1fr_120px_72px] items-center border-b border-[color:var(--aui-divider)] px-3 py-3 last:border-b-0">
          <span><input type="checkbox" aria-label={`Select ${row}`} defaultChecked={index === 0} /></span>
          <span className="font-medium text-[color:var(--aui-page-foreground)]">{row}</span>
          <span><SurfaceStatusBadge tone={index === 2 ? "warning" : "success"}>{index === 2 ? "Review" : "Live"}</SurfaceStatusBadge></span>
          <span><Button variant="ghost" size="icon-sm" aria-label="Row actions"><MoreHorizontalIcon /></Button></span>
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--aui-divider)] p-3 text-sm text-[color:var(--aui-page-muted)]">
        <span>{labels[slug] ?? "DataTable part"} preview</span>
        <Pagination page={1} pageCount={4} onPageChange={() => undefined} showEdges={false} />
      </div>
    </div>
  )
}

function CalendarPreview() {
  return <Calendar value="2026-06-18" defaultMonth="2026-06-01" onValueChange={() => undefined} />
}

function UploadPreview({ slug }: { slug: string }) {
  if (slug === "file-upload") {
    return <FileUpload dropzoneLabel="Upload documents" dropzoneDescription="Drag files here or choose from your device." buttonLabel="Choose files" helperText="Supports PDF, CSV and images." />
  }

  return (
    <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-center">
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)]">
        <UploadCloudIcon className="size-8 text-[color:var(--aui-page-muted)]" />
      </div>
      <FileDropzone label="Upload product image" description="Shows the image-upload flow without custom CSS." accept="image/*" />
    </div>
  )
}

function WizardPreview({ slug }: { slug: string }) {
  const steps = [
    { id: "profile", title: "Profile", description: "Account details", completed: true },
    { id: "billing", title: "Billing", description: "Payment setup" },
    { id: "review", title: "Review", description: "Confirm data" },
  ]

  if (slug === "stepper") {
    return <Stepper steps={steps} currentStep="billing" onStepChange={() => undefined} />
  }

  return (
    <Wizard steps={steps} currentStep="billing" onNext={() => undefined} onPrevious={() => undefined} onFinish={() => undefined}>
      <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4">
        <p className="font-medium text-[color:var(--aui-page-foreground)]">Billing setup</p>
        <p className="mt-1 text-sm text-[color:var(--aui-page-muted)]">Wizard combines steps, content and footer controls.</p>
      </div>
    </Wizard>
  )
}

function PatternsPreview({ slug }: { slug: string }) {
  if (slug === "resource-detail-page") {
    return (
      <ResourceDetailPage
        title="Customer profile"
        description="ResourceDetailPage organizes detail screens."
        actions={<Button size="sm">Edit</Button>}
      >
        <ResourcePageSection title="Account">
          <DescriptionList
            items={[
              { key: "plan", label: "Plan", value: "Scale" },
              { key: "owner", label: "Owner", value: "Design team" },
            ]}
          />
        </ResourcePageSection>
      </ResourceDetailPage>
    )
  }

  return (
    <ResourcePage
      title="Customers"
      description="ResourcePage combines header, stats, filters and sections."
      actions={<Button size="sm">New customer</Button>}
      stats={
        <div className="grid gap-3 sm:grid-cols-2">
          <StatCard title="Active" value="2,418" trend={{ value: "+8%", tone: "success" }} />
          <StatCard title="Health" value="94%" trend={{ value: "Stable", tone: "default" }} />
        </div>
      }
      filters={<FilterBar search={<Input type="search" value="" placeholder="Search..." readOnly />} activeCount={1} />}
    >
      <ResourcePageSection title="Recent activity">
        <Timeline
          items={[
            { key: "a", title: "Customer added", description: "Acme workspace", tone: "success" },
            { key: "b", title: "Plan updated", description: "Scale plan enabled", tone: "info" },
          ]}
        />
      </ResourcePageSection>
    </ResourcePage>
  )
}
