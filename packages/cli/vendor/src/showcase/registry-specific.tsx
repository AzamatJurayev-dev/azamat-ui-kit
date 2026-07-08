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
  AlertDialog,
  Alert,
  AnchorNav,
  AsyncSelect,
  Badge,
  Button,
  ButtonGroup,
  Calendar,
  ClearableInput,
  ColorInput,
  CommandPalette,
  DialogActionButton,
  DialogActions,
  DescriptionList,
  Drawer,
  EntityCard,
  FileDropzone,
  FileUpload,
  ImageUpload,
  FilterBar,
  FilterChips,
  InfoCard,
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
  SavedFilterSelect,
  SearchInput,
  SectionHeader,
  SimpleSelect,
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

import type { ComponentDemoBundle, ComponentDemoMock, ComponentDemoProps } from "./premium/types"

type RegistryDemoKind =
  | "actions"
  | "calendar"
  | "data-table"
  | "display"
  | "feedback"
  | "form"
  | "inputs"
  | "layout"
  | "navigation"
  | "overlay"
  | "patterns"
  | "upload"
  | "wizard"

type RegistryDemoDefinition = {
  slug: string
  title: string
  component: string
  kind: RegistryDemoKind
  summary: string
  highlights: string[]
  scenarios: ComponentDemoMock["scenarios"]
  importName?: string
}

const registryDemoDefinitions = [
  component("dialog-actions", "DialogActions", "overlay", "Modal footer action row with cancel, secondary and primary actions."),
  component("alert-dialog", "AlertDialog", "overlay", "Destructive confirmation dialog with loading-ready action states."),
  component("drawer", "Drawer", "overlay", "Side panel for contextual details without leaving the page."),
  component("pagination", "Pagination", "navigation", "Controlled page navigation with edge buttons and active state."),
  component("nav-tabs", "NavTabs", "navigation", "Navigation tabs for switching related document sections."),
  component("clearable-input", "ClearableInput", "inputs", "Input with clear action, Escape handling and focus restore."),
  component("search-input", "SearchInput", "inputs", "Search field with icon, count, shortcut and debounce-friendly value handling."),
  component("password-input", "PasswordInput", "inputs", "Password field with visibility toggle and secure autocomplete defaults."),
  component("slider", "Slider", "inputs", "Single value range control for density, threshold, and score tuning."),
  component("range-slider", "RangeSlider", "inputs", "Two-handle slider for min/max filtering."),
  component("rating", "Rating", "inputs", "Compact score input for feedback and review flows."),
  component("otp-input", "OtpInput", "inputs", "One-time code entry with fixed-length slots."),
  component("color-input", "ColorInput", "inputs", "Theme and accent color field with native color selection."),
  component("tag-input", "TagInput", "inputs", "Tokenized text input for labels, skills, and quick filters."),
  component("description-list", "DescriptionList", "display", "Structured key-value details for entity, invoice and profile pages."),
  component("progress", "Progress", "display", "Linear progress with label, value formatter, tone and indeterminate state."),
  component("progress-circle", "ProgressCircle", "display", "Compact circular progress for sidebars and status cards."),
  component("timeline", "Timeline", "display", "Vertical or horizontal event stream for workflow history."),
  component("status-dot", "StatusDot", "display", "Tiny live status indicator with optional pulse animation."),
  component("user-card", "UserCard", "display", "User summary row with avatar, metadata and actions."),
  component("delta-badge", "DeltaBadge", "display", "Compact positive, negative, and risk deltas for metric summaries."),
  component("entity-header", "EntityHeader", "display", "Top summary row for a customer, invoice, or workspace."),
  component("notification-center", "NotificationCenter", "display", "Compact activity and notifications stream."),
  component("entity-card", "EntityCard", "display", "Structured summary card with title, meta, state and actions."),
  component("file-card", "FileCard", "display", "Compact file summary with state and actions."),
  component("data-list", "DataList", "display", "Readable title and description rows for compact operational lists."),
  component("status-legend", "StatusLegend", "display", "Explain status meaning and counts in a compact legend."),
  component("trend-card", "TrendCard", "display", "Metric summary card with trend context."),
  component("comparison-card", "ComparisonCard", "display", "Compare current and previous values in one compact card."),
  component("action-menu", "ActionMenu", "actions", "Compact dropdown action menu for rows and cards."),
  component("button-group", "ButtonGroup", "actions", "Grouped action buttons for view switching and compact controls."),
  component("quick-action-grid", "QuickActionGrid", "actions", "Action launcher grid for dense dashboard shortcuts."),
  component("filter-chips", "FilterChips", "actions", "Inline active filter summaries with clear and remove actions."),
  component("data-table-saved-filters", "SavedFilterSelect", "actions", "Saved filter chips and quick view controls."),
  component("app-header", "AppHeader", "layout", "Sticky product header with left, center and right slots."),
  component("section-header", "SectionHeader", "layout", "Reusable section title block with actions and metadata."),
  component("stat-card", "StatCard", "layout", "Dashboard stat card for KPI, trend and helper text."),
  component("filter-bar", "FilterBar", "actions", "Search, filters, active-count and reset actions in one toolbar."),
  component("anchor-nav", "AnchorNav", "navigation", "Section jump navigation for long detail pages."),
  component("page-tabs", "PageTabs", "navigation", "Top-level page tab strip for route-sized sections."),
  component("stepper-tabs", "StepperTabs", "navigation", "Step-like tabs for setup and onboarding progress."),
  component("alert", "Alert", "feedback", "Inline feedback banner for success, warning, info, and error states."),
  component("page-state", "PageState", "feedback", "Full-page completion or blocked state with next actions."),
  component("data-table-pagination", "DataTablePagination", "data-table", "Pagination control used by DataTable pages."),
  component("data-table-toolbar", "DataTableToolbar", "data-table", "Toolbar surface for DataTable search, filters and actions."),
  component("data-table-column-visibility-menu", "DataTableColumnVisibilityMenu", "data-table", "Column visibility menu pattern for table views."),
  component("data-table-select-column", "DataTableSelectColumn", "data-table", "Selection column pattern for bulk table workflows."),
  component("data-table-sortable-header", "DataTableSortableHeader", "data-table", "Sortable header trigger with clear visual state."),
  component("data-table-row-actions", "DataTableRowActions", "data-table", "Row action menu for inspect, duplicate and archive operations."),
  component("data-table-actions-column", "DataTableActionsColumn", "data-table", "Reusable actions column for DataTable definitions."),
  component("data-table-bulk-actions", "DataTableBulkActions", "data-table", "Bulk action bar for selected rows."),
  component("data-table-view-presets", "DataTableViewPresets", "data-table", "Saved table view presets for operational dashboards."),
  component("calendar", "Calendar", "calendar", "Single month calendar surface for date picker and scheduling flows."),
  component("file-upload", "FileUpload", "upload", "Full file upload surface with dropzone, action button and helper text."),
  component("image-upload", "ImageUpload", "upload", "Image upload pattern with preview-oriented copy.", "ImageUpload"),
  component("file-dropzone", "FileDropzone", "upload", "Lightweight file dropzone primitive for custom upload flows."),
  component("stepper", "Stepper", "wizard", "Clickable step navigation for multi-step forms."),
  component("wizard", "Wizard", "wizard", "Stepper, content and footer controls combined into one workflow."),
  component("command-palette", "CommandPalette", "actions", "Keyboard command surface for global navigation and actions."),
  component("resource-page", "ResourcePage", "patterns", "Full resource index page shell for admin dashboards."),
  component("resource-detail-page", "ResourceDetailPage", "patterns", "Detail page shell with title, metadata and sections."),
] satisfies RegistryDemoDefinition[]

export const registrySpecificDemoRegistry: Record<string, ComponentDemoBundle> = Object.fromEntries(
  registryDemoDefinitions.map((definition) => [
    definition.slug,
    {
      mock: createMock(definition),
      Showcase: (props: ComponentDemoProps) => <RegistrySpecificShowcase definition={definition} {...props} />,
    },
  ])
)

function component(
  slug: string,
  componentName: string,
  kind: RegistryDemoKind,
  summary: string,
  importName = componentName
): RegistryDemoDefinition {
  const readableName = toTitle(slug)

  return {
    slug,
    title: readableName,
    component: componentName,
    kind,
    summary,
    importName,
    highlights: [
      `${readableName} uses the real ${componentName} surface.`,
      "CLI, import and preview stay scoped to this component.",
      "Preview wrappers stay light so the component UI remains visible.",
    ],
    scenarios: [
      {
        title: "Use when",
        description: summary,
      },
      {
        title: "Implementation",
        description: `Add ${slug}, import ${importName}, then pass controlled props where the API requires state.`,
      },
    ],
  }
}

function createMock(definition: RegistryDemoDefinition): ComponentDemoMock {
  return {
    cliCommand: `npx azix add ${definition.slug}`,
    code: createCodeSnippet(definition),
    highlights: definition.highlights,
    scenarios: definition.scenarios,
    capabilityNotes: [
      `Add ${definition.slug} into your local source with the CLI.`,
      `Import from your configured components alias after the file is copied.`,
    ],
  }
}

function createCodeSnippet(definition: RegistryDemoDefinition) {
  const importName = definition.importName ?? definition.component

  return `import { ${importName} } from "@/components/${definition.slug}"\n\nexport function Demo() {\n  return <${importName} />\n}`
}

function RegistrySpecificShowcase({
  definition,
  state,
  setState,
}: ComponentDemoProps & {
  definition: RegistryDemoDefinition
}) {
  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">{definition.component}</p>
        <div>
          <h3 className="aui-text-strong text-2xl font-semibold tracking-tight">{definition.title}</h3>
          <p className="aui-text-muted mt-2 max-w-2xl text-sm leading-6">{definition.summary}</p>
        </div>
      </header>

      <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4 sm:p-5">
        {renderPreview(definition, state, setState)}
      </div>
    </div>
  )
}

function renderPreview(
  definition: RegistryDemoDefinition,
  state: ComponentDemoProps["state"],
  setState: ComponentDemoProps["setState"]
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

function InputPreview({
  slug,
  state,
  setState,
}: {
  slug: string
  state: ComponentDemoProps["state"]
  setState: ComponentDemoProps["setState"]
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

  if (slug === "simple-select") {
    return (
      <div className="grid gap-4">
        <SimpleSelect
          value="private"
          onValueChange={() => undefined}
          options={[
            { value: "public", label: "Public", description: "Visible to all users" },
            { value: "private", label: "Private", description: "Restricted to invited members" },
            { value: "internal", label: "Internal", description: "Only workspace maintainers" },
            { value: "archived", label: "Archived", description: "History only", disabled: true },
          ]}
          placeholder="Visibility"
          searchable
          clearable
        />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Static options with lightweight search.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Clear action stays inside the trigger surface.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Use before moving to AsyncSelect.</div>
        </div>
      </div>
    )
  }

  if (slug === "async-select") {
    const asyncSelectOptions = [
      { value: "north" as const, label: "North Region", description: "Sales ops" },
      { value: "south" as const, label: "South Region", description: "Support team" },
      { value: "west" as const, label: "West Region", description: "Billing operations" },
    ]

    return (
      <div className="grid gap-4">
        <AsyncSelect
          value={"north" as string}
          onValueChange={() => undefined}
          loadOptions={async (search) => {
            const query = search.trim().toLowerCase()
            return query ? asyncSelectOptions.filter((item) => String(item.label).toLowerCase().includes(query)) : asyncSelectOptions
          }}
          defaultOptions={asyncSelectOptions}
          minSearchLength={1}
          clearable
        />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Remote-ready select surface.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Hydration and clear behavior stay aligned.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Good for large or changing datasets.</div>
        </div>
      </div>
    )
  }

  return <Input value={value} onChange={(event) => setState({ textValue: event.currentTarget.value })} placeholder="Unified input" />
}

function FormPreview({
  state,
  setState,
}: {
  state: ComponentDemoProps["state"]
  setState: ComponentDemoProps["setState"]
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <label className="grid gap-2">
        <span className="text-sm font-medium aui-text-strong">Email address</span>
        <Input value={state.textValue} onChange={(event) => setState({ textValue: event.currentTarget.value })} />
        <span className="text-xs aui-text-muted">Form wrappers keep label, hint and error spacing consistent.</span>
      </label>
      <label className="grid gap-2">
        <span className="text-sm font-medium aui-text-strong">Status</span>
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
    return <Alert tone="warning" title="Review needed" description="Billing rules changed and one approval is pending." action={<Button size="sm">Open</Button>} />
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
      <DemoStatusBadge tone="success">Live</DemoStatusBadge>
      <DemoStatusBadge tone="warning">Needs review</DemoStatusBadge>
      <DemoStatusBadge tone="danger">Blocked</DemoStatusBadge>
      <DemoStatusBadge tone="info">Queued</DemoStatusBadge>
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
          { key: "status", label: "Status", value: <DemoStatusBadge tone="success">Paid</DemoStatusBadge> },
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
    return <StatCard title="Revenue" value="$84.2k" description="Compared with last month" trend={{ value: "+12.4%", tone: "success" }} icon={<LayoutDashboardIcon />} />
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
              <p className="text-sm text-muted-foreground">Enterprise account with billing and admin ownership.</p>
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
    return <StatCard title={slug === "trend-card" ? "Weekly revenue" : "Current vs previous"} value="$84.2k" description="Compared with last month" trend={{ value: "+12.4%", tone: "success" }} icon={<LayoutDashboardIcon />} />
  }

  if (slug === "info-card") {
    return (
      <div className="grid gap-4">
        <InfoCard
          eyebrow="Summary"
          title="Workspace"
          description="Reusable card surface with header, actions and metadata."
          actions={<Button size="sm" variant="outline">Open</Button>}
          selected
        >
          <p className="aui-text-muted mt-2 text-sm">Keep metadata, helper copy and compact actions in one reusable card surface.</p>
        </InfoCard>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Vertical and horizontal layout support.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Selected and action-safe surfaces.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Useful for summary panels and detail sidebars.</div>
        </div>
      </div>
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
  state: ComponentDemoProps["state"]
  setState: ComponentDemoProps["setState"]
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
          <SearchIcon className="size-4 aui-text-muted" />
          <span className="text-sm aui-text-muted">Command palette preview: search routes, components and actions.</span>
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

  if (slug === "saved-filter-select") {
    return (
      <div className="grid gap-4">
        <SavedFilterSelect
          value="billing"
          onValueChange={() => undefined}
          onSave={() => undefined}
          onDelete={() => undefined}
          filters={[
            { value: "billing", label: "Billing", description: "Invoices and payment status" },
            { value: "ops", label: "Operations", description: "Queues and workload" },
            { value: "owners", label: "Owner: Azamat", description: "Assigned records only" },
          ]}
        />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Named view switching for table routes.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Delete action stays isolated from parent selection.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Useful in finance, ops and admin dashboards.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4">
      <div>
        <p className="font-medium aui-text-strong">Invoice #4821</p>
        <p className="text-sm aui-text-muted">Pending approval</p>
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
      <div className="grid grid-cols-[40px_1fr_120px_72px] border-b border-[color:var(--aui-divider)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] aui-text-muted">
        <span><input type="checkbox" aria-label="Select rows" /></span>
        <span>Name</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      {["Azamat UI", "Registry", "Dashboard"].map((row, index) => (
        <div key={row} className="grid grid-cols-[40px_1fr_120px_72px] items-center border-b border-[color:var(--aui-divider)] px-3 py-3 last:border-b-0">
          <span><input type="checkbox" aria-label={`Select ${row}`} defaultChecked={index === 0} /></span>
          <span className="font-medium aui-text-strong">{row}</span>
          <span><DemoStatusBadge tone={index === 2 ? "warning" : "success"}>{index === 2 ? "Review" : "Live"}</DemoStatusBadge></span>
          <span><Button variant="ghost" size="icon-sm" aria-label="Row actions"><MoreHorizontalIcon /></Button></span>
        </div>
      ))}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[color:var(--aui-divider)] p-3 text-sm aui-text-muted">
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
    return (
      <div className="grid gap-4">
        <FileUpload dropzoneLabel="Upload documents" dropzoneDescription="Drag files here or choose from your device." buttonLabel="Choose files" helperText="Supports PDF, CSV and images." />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Dropzone click and nested actions stay isolated.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Rejected states and helper copy live in the same component.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Use for production file routes, not just decorative previews.</div>
        </div>
      </div>
    )
  }

  if (slug === "image-upload") {
    return (
      <div className="grid gap-4">
        <ImageUpload dropzoneLabel="Upload product image" helperText="Preview-friendly upload for gallery and hero assets." />
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Image preview is part of the reusable component.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Remove action stays separate from the parent dropzone surface.</div>
          <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm aui-text-muted">Good for template thumbnails and marketing assets.</div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-[160px_1fr] md:items-center">
      <div className="flex aspect-square items-center justify-center rounded-2xl border border-dashed border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)]">
        <UploadCloudIcon className="size-8 aui-text-muted" />
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
        <p className="font-medium aui-text-strong">Billing setup</p>
        <p className="mt-1 text-sm aui-text-muted">Wizard combines steps, content and footer controls.</p>
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
      stats={<div className="grid gap-3 sm:grid-cols-2"><StatCard title="Active" value="2,418" trend={{ value: "+8%", tone: "success" }} /><StatCard title="Health" value="94%" trend={{ value: "Stable", tone: "info" }} /></div>}
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

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

function DemoStatusBadge({
  tone,
  children,
}: {
  tone: "success" | "warning" | "danger" | "info"
  children: React.ReactNode
}) {
  const toneMap = {
    success: "secondary",
    warning: "outline",
    danger: "destructive",
    info: "outline",
  } as const

  return <Badge variant={toneMap[tone]}>{children}</Badge>
}
