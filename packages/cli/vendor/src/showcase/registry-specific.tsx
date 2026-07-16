import * as React from "react"
import {
  ArchiveIcon,
  BellIcon,
  ChevronRightIcon,
  DownloadIcon,
  FilterIcon,
  LayoutDashboardIcon,
  MoreHorizontalIcon,
  UploadCloudIcon,
} from "lucide-react"

import {
  ActionMenu,
  AlertDialog,
  Alert,
  AsyncSelect,
  Badge,
  Button,
  ButtonGroup,
  Calendar,
  DescriptionList,
  Drawer,
  FileUpload,
  ImageUpload,
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
  SavedFilterSelect,
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
import { FormBuilder, customField, formSection } from "@/components/patterns/form-builder"
import { ResourceDetailPage } from "@/components/patterns/resource-detail-page"
import { ResourcePage, ResourcePageSection } from "@/components/patterns/resource-page"
import { useForm } from "react-hook-form"

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
  component("alert-dialog", "AlertDialog", "overlay", "Destructive confirmation dialog with loading-ready action states."),
  component("drawer", "Drawer", "overlay", "Side panel for contextual details without leaving the page."),
  component("pagination", "Pagination", "navigation", "Controlled page navigation with edge buttons and active state."),
  component("slider", "Slider", "inputs", "Single value range control for density, threshold, and score tuning."),
  component("range-slider", "RangeSlider", "inputs", "Two-handle slider for min/max filtering."),
  component("rating", "Rating", "inputs", "Compact score input for feedback and review flows."),
  component("otp-input", "OtpInput", "inputs", "One-time code entry with fixed-length slots."),
  component("tag-input", "TagInput", "inputs", "Tokenized text input for labels, skills, and quick filters."),
  component("progress", "Progress", "display", "Linear progress with label, value formatter, tone and indeterminate state."),
  component("timeline", "Timeline", "display", "Vertical or horizontal event stream for workflow history."),
  component("status-dot", "StatusDot", "display", "Tiny live status indicator with optional pulse animation."),
  component("notification-center", "NotificationCenter", "display", "Compact activity and notifications stream."),
  component("status-legend", "StatusLegend", "display", "Explain status meaning and counts in a compact legend."),
  component("action-menu", "ActionMenu", "actions", "Compact dropdown action menu for rows and cards."),
  component("button-group", "ButtonGroup", "actions", "Grouped action buttons for view switching and compact controls."),
  component("quick-action-grid", "QuickActionGrid", "actions", "Action launcher grid for dense dashboard shortcuts."),
  component("filter-bar", "FilterBar", "actions", "Search, filters, active-count and reset actions in one toolbar."),
  component("alert", "Alert", "feedback", "Inline feedback banner for success, warning, info, and error states."),
  component("page-state", "PageState", "feedback", "Full-page completion or blocked state with next actions."),
  component("form-builder", "FormBuilder", "patterns", "Declarative form scaffold with sections and reusable field presets."),
  component("calendar", "Calendar", "calendar", "Single month calendar surface for date picker and scheduling flows."),
  component("file-upload", "FileUpload", "upload", "Full file upload surface with dropzone, action button and helper text."),
  component("image-upload", "ImageUpload", "upload", "Image upload pattern with preview-oriented copy.", "ImageUpload"),
  component("stepper", "Stepper", "wizard", "Clickable step navigation for multi-step forms."),
  component("wizard", "Wizard", "wizard", "Stepper, content and footer controls combined into one workflow."),
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
    cliCommand: `npx tembro add ${definition.slug}`,
    code: createCodeSnippet(definition),
    highlights: definition.highlights,
    scenarios: definition.scenarios,
    capabilityNotes: [
      `Add ${definition.slug} into your local source with the CLI.`,
      "Import the public component surface from `tembro` in app code.",
    ],
  }
}

function createCodeSnippet(definition: RegistryDemoDefinition) {
  const importName = definition.importName ?? definition.component

  return `import { ${importName} } from "tembro"\n\nexport function Demo() {\n  return <${importName} />\n}`
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

  if (slug === "tag-input") {
    return <TagInput defaultValue={["dashboard", "beta", "ops"]} placeholder="Add label" />
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
        <Input type="search" value="Active customers" resultCount={7} readOnly />
        <span className="text-xs text-emerald-500">Ready to submit</span>
      </label>
    </div>
  )
}

function OverlayPreview({ slug }: { slug: string }) {
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
  state: ComponentDemoProps["state"]
  setState: ComponentDemoProps["setState"]
}) {
  if (slug === "filter-bar") {
    return (
      <FilterBar
        search={<Input type="search" value={state.textValue} onValueChange={(value) => setState({ textValue: value })} placeholder="Search invoices..." />}
        activeCount={2}
        onReset={() => setState({ textValue: "" })}
        filters={<Button variant="outline" size="sm"><FilterIcon data-icon="inline-start" />Status</Button>}
        actions={<Button size="sm">Export</Button>}
      />
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
    "data-table-column-visibility-menu": "Column visibility",
    "data-table-sortable-header": "Sortable header",
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
      <div className="grid grid-cols-[40px_1fr_120px_72px] border-b border-[color:var(--aui-divider)] px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] aui-text-muted">
        <span><input type="checkbox" aria-label="Select rows" /></span>
        <span>Name</span>
        <span>Status</span>
        <span>Actions</span>
      </div>
      {["Tembro", "Registry", "Dashboard"].map((row, index) => (
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
  if (slug === "form-builder") {
    return <FormBuilderPreview />
  }

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

function FormBuilderPreview() {
  type FormBuilderDemoValues = {
    name: string
    email: string
    notes: string
    marketing: boolean
  }

  const form = useForm<FormBuilderDemoValues>({
    defaultValues: {
      name: "Azamat Jurayev",
      email: "azamat@example.com",
      notes: "Release gate is ready.",
      marketing: true,
    },
  })

  const sections = [
    formSection<FormBuilderDemoValues>({
      id: "profile",
      title: "Profile",
      description: "Core account and contact fields.",
      fields: [
        customField<FormBuilderDemoValues>({
          id: "profile-summary",
          colSpan: "full",
          render: () => (
            <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-4">
              <p className="text-sm font-semibold text-[color:var(--aui-page-foreground)]">Reusable section shell</p>
              <p className="mt-1 text-sm text-[color:var(--aui-page-muted)]">
                FormBuilder groups controls, helper copy and actions without scattering layout logic.
              </p>
            </div>
          ),
        }),
      ],
    }),
  ]

  return (
    <FormBuilder<FormBuilderDemoValues>
      control={form.control}
      sections={sections}
      columns={1}
      submitLabel="Save changes"
      resetLabel="Reset"
      onResetClick={() => form.reset()}
      footer={
        <div className="rounded-2xl border border-dashed border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm text-[color:var(--aui-page-muted)]">
          Use the builder for real form routes, then replace this preview with your own field presets.
        </div>
      }
    />
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
