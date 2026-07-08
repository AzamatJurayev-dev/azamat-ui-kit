import {
  Accordion,
  Alert,
  AnchorNav,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  CalendarScheduler,
  Card,
  CardContent,
  Carousel,
  CarouselItem,
  CodeBlock,
  ColorInput,
  CopyButton,
  CopyField,
  DataState,
  Descriptions,
  Divider,
  DualListPicker,
  FilterBar,
  Heading,
  Input,
  JsonInput,
  KanbanBoard,
  List,
  Mark,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  OtpInput,
  PageState,
  PageTabs,
  PropertyGrid,
  QuickActionGrid,
  QRCode,
  QuantityStepper,
  RangeSlider,
  Rating,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  RichTextEditor,
  SavedFilterSelect,
  Section,
  SegmentedControl,
  Skeleton,
  SkeletonCard,
  SkeletonText,
  Slider,
  Spinner,
  StepperTabs,
  Statistic,
  StatisticCard,
  StatisticGrid,
  StickyFooterBar,
  StatusLegend,
  Tag,
  TagInput,
  TagGroup,
  Text,
  TimePicker,
  TimeRangePicker,
  Tour,
  TreeView,
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
      cliCommand: `npx tembro add ${item.slug}`,
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
        <code className="text-sm text-[color:var(--aui-code-fg)]">npx tembro add {item.slug}</code>
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
      <Accordion
        type="single"
        defaultValue="api"
        items={[
          { key: "api", title: "Single open section", description: "Open one section at a time.", content: "Use one expanded panel when the page needs compact disclosure." },
          { key: "states", title: "State handling", description: "Controlled or uncontrolled usage.", content: "Use one expanded section for FAQs, settings clusters, and compact disclosure flows." },
        ]}
      />
    )
  }

  if (item.slug === "avatar") {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <Avatar name="Azamat UI" />
        <Avatar fallback="AJ" shape="rounded" />
        <AvatarGroup
          items={[
            { key: "1", name: "Azamat" },
            { key: "2", name: "Nodir" },
            { key: "3", name: "Dilshod" },
            { key: "4", name: "Madina" },
          ]}
        />
      </div>
    )
  }

  if (item.slug === "calendar-scheduler") {
    return (
      <CalendarScheduler
        events={[
          { id: "1", title: "Design review", date: "Mon", time: "10:00", tone: "default" },
          { id: "2", title: "Release QA", date: "Tue", time: "14:00", tone: "warning" },
          { id: "3", title: "Go live", date: "Fri", time: "09:30", tone: "success" },
        ]}
      />
    )
  }

  if (item.slug === "carousel") {
    return (
      <Carousel index={0}>
        <CarouselItem>
          <Card>
            <CardContent className="p-5">
              <p className="text-lg font-semibold">Release dashboard</p>
              <p className="mt-2 text-sm text-muted-foreground">Compact KPI slide for weekly review.</p>
            </CardContent>
          </Card>
        </CarouselItem>
        <CarouselItem>
          <Card>
            <CardContent className="p-5">
              <p className="text-lg font-semibold">Customer health</p>
              <p className="mt-2 text-sm text-muted-foreground">Second slide with account risk summary.</p>
            </CardContent>
          </Card>
        </CarouselItem>
      </Carousel>
    )
  }

  if (item.slug === "code-block") {
    return (
      <CodeBlock
        title="Install"
        language="bash"
        code={`npx tembro init --template next\nnpx tembro add button`}
      />
    )
  }

  if (item.slug === "copy-button") {
    return <CopyButton value="npx tembro add button">Copy command</CopyButton>
  }

  if (item.slug === "copy-field") {
    return (
      <CopyField
        label="CLI command"
        description="Quick source-copy command"
        value="npx tembro add input"
      />
    )
  }

  if (item.slug === "data-state") {
    return (
      <DataState
        status="empty"
        title="No matching rows"
        description="Try another filter or import the first record."
        actions={<Button size="sm">Import CSV</Button>}
      />
    )
  }

  if (item.slug === "descriptions") {
    return (
      <Descriptions
        title="Workspace details"
        columns={3}
        items={[
          { key: "owner", label: "Owner", value: "Azamat UI" },
          { key: "plan", label: "Plan", value: "Scale" },
          { key: "renewal", label: "Renewal", value: "Jul 14, 2026" },
        ]}
      />
    )
  }

  if (item.slug === "divider") {
    return (
      <div className="grid gap-3">
        <div className="text-sm font-medium">Section above</div>
        <Divider label="Summary" />
        <div className="text-sm text-muted-foreground">Section below</div>
      </div>
    )
  }

  if (item.slug === "dual-list-picker") {
    return (
      <DualListPicker
        picked={["billing", "support"]}
        items={[
          { value: "billing", label: "Billing" },
          { value: "support", label: "Support" },
          { value: "analytics", label: "Analytics" },
          { value: "security", label: "Security" },
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

  if (item.slug === "skeleton") {
    return (
      <div className="grid gap-3">
        <Skeleton className="h-10 w-full" />
        <SkeletonText rows={3} />
        <SkeletonCard avatar />
      </div>
    )
  }

  if (item.slug === "slider") {
    return <Slider label="Spacing scale" description="Adjust dashboard density." defaultValue={64} showValue />
  }

  if (item.slug === "statistic") {
    return (
      <StatisticGrid columns={3}>
        <StatisticCard label="ARR" value="$84.2k" change="+12.4%" trend="up" description="vs previous month" />
        <Statistic label="MRR" value="$7.0k" change="+3.1%" trend="up" description="Live subscriptions" />
        <Statistic label="Churn" value="1.9%" change="-0.4%" trend="down" description="Healthy range" />
      </StatisticGrid>
    )
  }

  if (item.slug === "sticky-footer-bar") {
    return (
      <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)]">
        <div className="p-4 text-sm text-muted-foreground">Scrollable page content</div>
        <StickyFooterBar start={<div className="text-sm font-medium">2 unsaved changes</div>} end={<><Button size="sm" variant="outline">Discard</Button><Button size="sm">Save</Button></>} />
      </div>
    )
  }

  if (item.slug === "tag") {
    return (
      <TagGroup>
        <Tag>Default</Tag>
        <Tag tone="success">Live</Tag>
        <Tag tone="warning">Review</Tag>
        <Tag tone="danger">Blocked</Tag>
      </TagGroup>
    )
  }

  if (item.slug === "time-picker") {
    return (
      <div className="grid gap-3">
        <TimePicker label="Start time" defaultValue="09:30" />
        <TimeRangePicker from="09:30" to="17:30" />
      </div>
    )
  }

  if (item.slug === "tour") {
    return (
      <Tour
        index={1}
        steps={[
          { title: "Workspace setup", description: "Initialize theme tokens first." },
          { title: "Component add", description: "Copy only the component you need." },
          { title: "Detail route", description: "Open docs, API and preview together." },
        ]}
      />
    )
  }

  if (item.slug === "tree-view") {
    return (
      <TreeView
        defaultExpandedKeys={["components", "inputs"]}
        selectedKey="button"
        items={[
          {
            key: "components",
            label: "Components",
            children: [
              {
                key: "inputs",
                label: "Inputs",
                children: [
                  { key: "button", label: "Button" },
                  { key: "input", label: "Input" },
                ],
              },
            ],
          },
        ]}
      />
    )
  }

  if (item.slug === "typography") {
    return (
      <div className="grid gap-3">
        <Heading level={2}>Dashboard typography</Heading>
        <Text>Readable defaults for product copy and operational labels.</Text>
        <blockquote className="border-l-4 pl-4 italic text-muted-foreground">Ship simple text hierarchy before adding decorative layout layers.</blockquote>
        <Text muted size="sm">Use <Mark>Mark</Mark> only for emphasis that matters.</Text>
      </div>
    )
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

  if (item.slug === "data-table-saved-filters") {
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

  if (item.slug === "json-input") {
    return (
      <JsonInput
        value={`{\n  "workspace": "azamat-ui",\n  "theme": "dashboard"\n}`}
        onValueChange={() => undefined}
        rows={7}
      />
    )
  }

  if (item.slug === "kanban") {
    return (
      <KanbanBoard
        columns={[
          {
            key: "todo",
            title: "Todo",
            cards: [
              { key: "1", title: "Polish Button demo", description: "Improve interactive preview states." },
            ],
          },
          {
            key: "progress",
            title: "In progress",
            cards: [
              { key: "2", title: "Refresh Input docs", description: "Clean API notes and examples." },
            ],
          },
          {
            key: "done",
            title: "Done",
            cards: [
              { key: "3", title: "Publish 1.0.0", description: "Release package and sync docs." },
            ],
          },
        ]}
      />
    )
  }

  if (item.slug === "menubar") {
    return (
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent className="relative mt-2">
            <MenubarItem>New page</MenubarItem>
            <MenubarItem>Duplicate</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
        </MenubarMenu>
      </Menubar>
    )
  }

  if (item.slug === "navigation-menu") {
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem><NavigationMenuLink href="#" active>Overview</NavigationMenuLink></NavigationMenuItem>
          <NavigationMenuItem><NavigationMenuLink href="#">Components</NavigationMenuLink></NavigationMenuItem>
          <NavigationMenuItem><NavigationMenuLink href="#">Docs</NavigationMenuLink></NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    )
  }

  if (item.slug === "overlay") {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        <Card><CardContent className="p-4"><p className="font-medium">Dialog</p><p className="mt-1 text-sm text-muted-foreground">Focused confirmation and forms.</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="font-medium">Popover</p><p className="mt-1 text-sm text-muted-foreground">Compact contextual actions.</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="font-medium">Sheet</p><p className="mt-1 text-sm text-muted-foreground">Side panel workflows.</p></CardContent></Card>
      </div>
    )
  }

  if (item.slug === "property-grid") {
    return (
      <PropertyGrid
        columns={3}
        items={[
          { key: "framework", label: "Framework", value: "Next.js", description: "App Router setup" },
          { key: "theme", label: "Theme", value: "Light / Dark", description: "CSS tokens ready" },
          { key: "mode", label: "Mode", value: "Source-copy", description: "Editable local files" },
        ]}
      />
    )
  }

  if (item.slug === "qr-code") {
    return <QRCode value="https://azamat-ui.vercel.app" alt="Azamat UI" />
  }

  if (item.slug === "quantity-stepper") {
    return <QuantityStepper defaultValue={3} min={1} max={10} />
  }

  if (item.slug === "resizable-panel") {
    return (
      <ResizablePanelGroup>
        <ResizablePanel defaultSize="45%">
          <p className="text-sm font-medium">Preview panel</p>
          <p className="mt-2 text-sm text-muted-foreground">Resize this surface in product screens with long content.</p>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="55%">
          <p className="text-sm font-medium">Inspector panel</p>
          <p className="mt-2 text-sm text-muted-foreground">Use for side-by-side data and editing tools.</p>
        </ResizablePanel>
      </ResizablePanelGroup>
    )
  }

  if (item.slug === "rich-text-editor") {
    return <RichTextEditor value="<p><strong>Release note</strong> with product details.</p>" onValueChange={() => undefined} />
  }

  if (item.slug === "saved-filter-select") {
    return (
      <SavedFilterSelect
        value="billing"
        filters={[
          { value: "billing", label: "Billing", description: "Invoices and payment status" },
          { value: "ops", label: "Operations", description: "Queues and workload" },
          { value: "owners", label: "Owner: Azamat", description: "Assigned records only" },
        ]}
        onValueChange={() => undefined}
        onSave={() => undefined}
        onDelete={() => undefined}
      />
    )
  }

  if (item.slug === "section") {
    return (
      <Section
        title="Revenue summary"
        description="Section wrapper for grouped content and actions."
        actions={<Button size="sm">Export</Button>}
        bordered
      >
        <div className="text-sm text-muted-foreground">Place chart, filters, table or any route content inside.</div>
      </Section>
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

