import {
  Alert,
  AnchorNav,
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CollapseGroup,
  ColorInput,
  DescriptionList,
  EmptyState,
  EntityCard,
  FilterChips,
  Input,
  List,
  OtpInput,
  PageState,
  PageTabs,
  QuickActionGrid,
  RangeSlider,
  Rating,
  SegmentedControl,
  Slider,
  Spinner,
  StepperTabs,
  StatusLegend,
  TagInput,
} from "@/index"
import { StatCard } from "@/components/layout/stat-card"

import type { ShowcaseDemoBundle, ShowcaseDemoProps } from "./types"

export type GenericShowcaseCatalogItem = {
  slug: string
  title: string
  category: string
  features: string[]
}

export function createGenericShowcaseDemo({
  item,
  groupLabel,
  importSnippet,
}: {
  item: GenericShowcaseCatalogItem
  groupLabel: string
  importSnippet: string
}): ShowcaseDemoBundle {
  const exportName = slugToExportName(item.slug)

  return {
    Showcase: (props) => <GenericComponentShowcase {...props} item={item} groupLabel={groupLabel} />,
    mock: {
      cliCommand: `npx azamat-ui-kit-cli add ${item.slug}`,
      code: `${importSnippet}\n\nexport function Example() {\n  return <${exportName} />\n}`,
      highlights: item.features,
      scenarios: item.features.slice(0, 3).map((feature) => ({
        title: feature,
        description: `${item.title} can be copied into your app and adjusted locally.`,
      })),
      capabilityNotes: item.features.slice(0, 3),
    },
  }
}

function slugToExportName(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function GenericComponentShowcase({
  item,
  groupLabel,
  state,
  setState,
  mode,
}: ShowcaseDemoProps & {
  item: GenericShowcaseCatalogItem
  groupLabel: string
}) {
  const features = item.features.length ? item.features : [groupLabel, "CLI add", "Local file"]

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5 border-b border-[color:var(--aui-divider)] pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--aui-brand-strong)]">CLI component</p>
          <h3 className="mt-2.5 text-2xl font-semibold tracking-tight text-[color:var(--aui-page-foreground)]">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-[color:var(--aui-page-muted)]">
            Copy this component into your app and adjust it inside your own `components` folder.
          </p>
        </div>
        <div className="rounded-full border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--aui-page-muted-strong)]">
          {mode === "docs" ? "Docs" : "Preview"}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {features.slice(0, 3).map((feature) => (
          <div key={feature} className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-3.5">
            <p className="text-sm font-semibold text-[color:var(--aui-page-foreground)]">{feature}</p>
            <p className="mt-1.5 text-xs leading-5 text-[color:var(--aui-page-muted)]">Lives in your local component source.</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-code-bg)] px-4 py-3">
        <code className="text-sm text-[color:var(--aui-code-fg)]">npx azamat-ui-kit-cli add {item.slug}</code>
      </div>

      <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4 sm:p-5">
        {renderGenericPreviewSurface(item, groupLabel, state, setState, mode)}
      </div>
    </div>
  )
}

function renderGenericPreviewSurface(
  item: GenericShowcaseCatalogItem,
  _groupLabel: string,
  state: ShowcaseDemoProps["state"],
  setState: ShowcaseDemoProps["setState"],
  mode: ShowcaseDemoProps["mode"]
) {
  if (item.slug === "accordion") {
    return (
      <CollapseGroup
        type="single"
        defaultValue="api"
        items={[
          { key: "api", title: "Single open section", description: "Open one section at a time.", content: "Use one expanded panel when the page needs compact disclosure." },
          { key: "states", title: "State handling", description: "Controlled or uncontrolled usage.", content: "Use one expanded section for FAQs, settings clusters, and compact disclosure flows." },
        ]}
      />
    )
  }

  if (item.slug === "segmented-control") {
    return (
      <SegmentedControl
        options={[
          { value: "overview", label: "Overview" },
          { value: "activity", label: "Activity" },
          { value: "settings", label: "Settings" },
        ]}
        defaultValue="overview"
      />
    )
  }

  if (item.slug === "spinner") {
    return (
      <div className="flex items-center gap-5">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
    )
  }

  if (item.slug === "slider") {
    return <Slider label="Spacing scale" description="Adjust dashboard density." defaultValue={64} showValue />
  }

  if (item.slug === "range-slider") {
    return <RangeSlider label="Revenue band" description="Filter a metric window." defaultValue={[20, 80]} showValue />
  }

  if (item.slug === "rating") {
    return <Rating defaultValue={4} labels={{ clear: "Reset" }} />
  }

  if (item.slug === "otp-input") {
    return <OtpInput value={state.textValue.replace(/\D/g, "").slice(0, 6)} onValueChange={(value) => setState({ textValue: value })} />
  }

  if (item.slug === "color-input") {
    return <ColorInput defaultValue="#22c55e" label="Accent color" description="Theme token preview." />
  }

  if (item.slug === "tag-input") {
    return <TagInput defaultValue={["dashboard", "beta", "ops"]} placeholder="Add label" />
  }

  if (item.slug === "button-group") {
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

  if (item.slug === "quick-action-grid" || item.slug === "command-bar") {
    return (
      <QuickActionGrid
        columns={item.slug === "command-bar" ? 4 : 3}
        compact={item.slug === "command-bar"}
        items={[
          { key: "new", label: "New invoice", description: "Create a fresh billing row.", badge: "N" },
          { key: "import", label: "Import CSV", description: "Bring finance data into the table.", badge: "I" },
          { key: "share", label: "Share workspace", description: "Invite team members to the route.", badge: "S" },
        ]}
      />
    )
  }

  if (item.slug === "filter-chips" || item.slug === "data-table-saved-filters") {
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
        {item.slug === "data-table-saved-filters" ? (
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

  if (item.slug === "anchor-nav") {
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

  if (item.slug === "page-tabs") {
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

  if (item.slug === "stepper-tabs") {
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

  if (item.slug === "alert") {
    return <Alert tone="warning" title="Review needed" description="Billing rules changed and one approval is pending." action={<Button size="sm">Open</Button>} />
  }

  if (item.slug === "page-state") {
    return (
      <PageState
        title="Workspace connected"
        description="The route is ready to accept live data and team actions."
        tone="success"
        action={<Button size="sm">Continue</Button>}
      />
    )
  }

  if (item.slug === "empty-search-state") {
    return (
      <EmptyState
        title="No matching components"
        description="Try a shorter keyword or switch to a broader family."
        action={<Button size="sm">Clear search</Button>}
      />
    )
  }

  if (item.slug === "data-list" || item.slug === "list") {
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

  if (item.slug === "key-value-card") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Account summary</CardTitle>
        </CardHeader>
        <CardContent>
          <DescriptionList
            items={[
              { key: "owner", label: "Owner", value: "Azamat UI" },
              { key: "plan", label: "Plan", value: "Scale" },
              { key: "renewal", label: "Renewal", value: "July 14, 2026" },
            ]}
          />
        </CardContent>
      </Card>
    )
  }

  if (item.slug === "entity-card" || item.slug === "file-card") {
    return (
      <EntityCard
        title={item.slug === "file-card" ? "Design-spec.pdf" : "Azamat Workspace"}
        description={item.slug === "file-card" ? "Shared with 4 reviewers." : "Admin console and live dashboard route."}
        status={<Badge variant="secondary">Live</Badge>}
        meta={item.slug === "file-card" ? "2.4 MB" : "Updated 8 min ago"}
        actions={<Button size="sm" variant="outline">Open</Button>}
      />
    )
  }

  if (item.slug === "status-legend") {
    return (
      <StatusLegend
        title="Delivery states"
        items={[
          { key: "live", label: "Live", description: "Healthy production routes", tone: "success", count: 18 },
          { key: "review", label: "Review", description: "Awaiting QA approval", tone: "warning", count: 4 },
          { key: "blocked", label: "Blocked", description: "Needs engineering action", tone: "danger", count: 1 },
        ]}
      />
    )
  }

  if (item.slug === "trend-card" || item.slug === "comparison-card") {
    return <StatCard title={item.slug === "trend-card" ? "Weekly revenue" : "Current vs previous"} value="$84.2k" description="Compared with last month" trend={{ value: "+12.4%", tone: "success" }} />
  }

  if (item.slug === "delta-badge") {
    return (
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">+12.4%</Badge>
        <Badge variant="outline">-3.1%</Badge>
        <Badge variant="destructive">Risk</Badge>
      </div>
    )
  }

  if (item.slug === "entity-header") {
    return (
      <Card>
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:justify-between">
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
        </CardContent>
      </Card>
    )
  }

  if (item.slug === "notification-center") {
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

  if (item.slug === "inline-editable") {
    return (
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input value={state.textValue} onChange={(event) => setState({ textValue: event.currentTarget.value })} />
        <Button size="sm">Save label</Button>
      </div>
    )
  }

  if (item.slug === "repeater-field") {
    return (
      <Card>
        <CardContent className="grid gap-3 p-5">
          <Input placeholder="First item" defaultValue="Revenue KPI" />
          <Input placeholder="Second item" defaultValue="Churn guardrail" />
          <div>
            <Button size="sm" variant="outline">Add row</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (item.category === "Forms") {
    return (
      <div className="grid gap-3">
        <Input
          value={state.textValue}
          onChange={(event) => setState({ textValue: event.currentTarget.value })}
          placeholder={`${item.title} preview`}
        />
        <p className="text-sm text-muted-foreground">Generic field preview for this form surface.</p>
      </div>
    )
  }

  if (item.category === "Overlay") {
    return (
      <div className="rounded-2xl border border-dashed border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
        <p className="text-sm font-semibold text-[color:var(--aui-page-foreground)]">{item.title}</p>
        <p className="mt-2 text-sm leading-6 text-[color:var(--aui-page-muted)]">
          This overlay route needs a dedicated interactive demo. The docs fallback avoids rendering a different component as a substitute.
        </p>
      </div>
    )
  }

  if (item.category === "Data Display") {
    return (
      <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">Generic display fallback kept neutral until a dedicated showcase is added.</p>
          </div>
          <Badge variant="outline">{mode}</Badge>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-lg font-semibold">{item.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Neutral starter preview for this surface. Copy it into your app, then shape the final state with your real data and props.
          </p>
        </div>
        <Badge variant="outline">{item.category}</Badge>
      </div>
    </div>
  )
}
