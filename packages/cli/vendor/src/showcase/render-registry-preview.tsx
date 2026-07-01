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
  AnchorNav,
  Badge,
  Button,
  ButtonGroup,
  Calendar,
  ClearableInput,
  ColorInput,
  CommandPalette,
  DescriptionList,
  DialogActionButton,
  DialogActions,
  Drawer,
  EntityCard,
  FileDropzone,
  FileUpload,
  FilterBar,
  FilterChips,
  Input,
  List,
  NavTabs,
  OtpInput,
  PageState,
  PageTabs,
  Pagination,
  PasswordInput,
  Progress,
  ProgressCircle,
  QuickActionGrid,
  RangeSlider,
  Rating,
  SearchInput,
  SectionHeader,
  Slider,
  StatusDot,
  StatusLegend,
  Stepper,
  StepperTabs,
  TagInput,
  Timeline,
  UserCard,
  Wizard,
} from "@/index"
import { AppHeader } from "@/components/layout/app-header"
import { StatCard } from "@/components/layout/stat-card"
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

  if (slug === "search-input") {
    return <SearchInput value={value} onValueChange={onValueChange} resultCount={12} shortcut="Ctrl K" placeholder="Search customers..." />
  }

  if (slug === "password-input") {
    return <PasswordInput value="secret-token" onValueChange={onValueChange} placeholder="Password" />
  }

  if (slug === "clearable-input") {
    return <ClearableInput value={value} onValueChange={onValueChange} placeholder="Clearable input" />
  }

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
    return <ColorInput defaultValue="#22c55e" label="Accent color" description="Theme token preview." />
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
        <SearchInput value="Active customers" resultCount={7} readOnly />
        <span className="text-xs text-emerald-500">Ready to submit</span>
      </label>
    </div>
  )
}

function OverlayPreview({ slug }: { slug: string }) {
  if (slug === "dialog-actions") {
    return (
      <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4">
        <DialogActions align="end">
          <DialogActionButton variant="ghost">Cancel</DialogActionButton>
          <DialogActionButton variant="outline">Save draft</DialogActionButton>
          <DialogActionButton>Publish</DialogActionButton>
        </DialogActions>
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
            { key: "owner", label: "Owner", value: "Azamat UI" },
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

  if (slug === "anchor-nav") {
    return (
      <AnchorNav
        orientation="horizontal"
        title="Sections"
        items={[
          { key: "overview", label: "Overview", href: "#overview", active: true },
          { key: "usage", label: "Usage", href: "#usage" },
          { key: "api", label: "API", href: "#api" },
        ]}
      />
    )
  }

  if (slug === "page-tabs") {
    return (
      <PageTabs
        value="overview"
        variant="pills"
        items={[
          { value: "overview", label: "Overview" },
          { value: "usage", label: "Usage" },
          { value: "api", label: "API", badge: "3" },
        ]}
      />
    )
  }

  if (slug === "stepper-tabs") {
    return (
      <StepperTabs
        value="billing"
        items={[
          { value: "profile", label: "Profile", description: "Team and owner details", completed: true },
          { value: "billing", label: "Billing", description: "Payment and invoices" },
          { value: "review", label: "Review", description: "Confirm release" },
        ]}
      />
    )
  }

  return (
    <NavTabs
      value="overview"
      items={[
        { value: "overview", label: "Overview" },
        { value: "usage", label: "Usage" },
        { value: "api", label: "API" },
      ]}
    />
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

  if (slug === "progress-circle") {
    return <ProgressCircle value={72} label="Profile completed" />
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

  if (slug === "delta-badge") {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">+12.4%</Badge>
        <Badge variant="outline">-3.1%</Badge>
        <Badge variant="destructive">Risk</Badge>
      </div>
    )
  }

  if (slug === "entity-header") {
    return (
      <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <Badge variant="outline">Customer</Badge>
            <div>
              <h3 className="text-xl font-semibold">Acme Holdings</h3>
              <p className="text-sm text-[color:var(--aui-page-muted)]">Enterprise account with billing and admin ownership.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Archive</Button>
            <Button size="sm">Edit</Button>
          </div>
        </div>
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

  if (slug === "entity-card" || slug === "file-card") {
    return (
      <EntityCard
        title={slug === "file-card" ? "Design-spec.pdf" : "Azamat Workspace"}
        description={slug === "file-card" ? "Shared with 4 reviewers." : "Admin console and live dashboard route."}
        status={<Badge variant="secondary">Live</Badge>}
        meta={slug === "file-card" ? "2.4 MB" : "Updated 8 min ago"}
        actions={<Button size="sm" variant="outline">Open</Button>}
      />
    )
  }

  if (slug === "data-list") {
    return (
      <List
        items={[
          { key: "1", title: "Enterprise plan", description: "Priority support and SSO", extra: "$499" },
          { key: "2", title: "Growth plan", description: "Most used by product teams", extra: "$199" },
          { key: "3", title: "Starter plan", description: "Lightweight team setup", extra: "$49" },
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

  if (slug === "trend-card" || slug === "comparison-card") {
    return (
      <StatCard
        title={slug === "trend-card" ? "Weekly revenue" : "Current vs previous"}
        value="$84.2k"
        description="Compared with last month"
        trend={{ value: "+12.4%", tone: "success" }}
        icon={<LayoutDashboardIcon />}
      />
    )
  }

  return <UserCard name="Azamat Jurayev" description="Product designer and maintainer" meta="Admin workspace" actions={<Button size="sm">Invite</Button>} />
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
        search={<SearchInput value={state.textValue} onValueChange={(value) => setState({ textValue: value })} placeholder="Search invoices..." />}
        activeCount={2}
        onReset={() => setState({ textValue: "" })}
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

  if (slug === "filter-chips" || slug === "data-table-saved-filters") {
    return (
      <div className="grid gap-3">
        <FilterChips
          chips={[
            { key: "status", label: "Status", value: "Active", tone: "success" },
            { key: "owner", label: "Owner", value: "Azamat", tone: "default" },
            { key: "region", label: "Region", value: "APAC", tone: "info" },
          ]}
          onRemove={() => undefined}
          onClear={() => undefined}
        />
        {slug === "data-table-saved-filters" ? (
          <ButtonGroup
            attached={false}
            items={[
              { key: "default", label: "Default", variant: "secondary" },
              { key: "billing", label: "Billing" },
              { key: "ops", label: "Operations" },
            ]}
          />
        ) : null}
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
      <AppHeader
        sticky={false}
        left={<><LayoutDashboardIcon className="size-4" /><span className="font-medium">Dashboard</span></>}
        center={<Badge variant="secondary">Preview</Badge>}
        right={<><Button variant="ghost" size="icon-sm" aria-label="Notifications"><BellIcon /></Button><Button size="sm">Deploy</Button></>}
        className="rounded-xl border border-[color:var(--aui-divider)]"
      />
    )
  }

  if (slug === "section-header") {
    return <SectionHeader eyebrow="Components" title="Production-ready surfaces" description="SectionHeader keeps copy, metadata and actions aligned." actions={<Button size="sm">Add component</Button>} />
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
        <SearchInput value="" placeholder="Search rows..." className="max-w-xs" readOnly />
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
      {["Azamat UI", "Registry", "Dashboard"].map((row, index) => (
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
  if (slug === "file-dropzone") {
    return <FileDropzone label="Drop contract files" description="PDF, PNG or CSV up to 10MB." />
  }

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
      filters={<FilterBar search={<SearchInput value="" placeholder="Search..." readOnly />} activeCount={1} />}
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
