import {
  Alert,
  Accordion,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  ButtonGroup,
  CalendarScheduler,
  Card,
  CardContent,
  CodeBlock,
  ColorPicker,
  CommandPalette,
  CopyButton,
  DataState,
  Divider,
  DualListPicker,
  Input,
  JsonInput,
  KanbanBoard,
  List,
  OtpInput,
  StateView,
  QRCode,
  QuickActionGrid,
  RangeSlider,
  Rating,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  RichTextEditor,
  SavedFilterSelect,
  Section,
  SegmentedControl,
  SignaturePad,
  Skeleton,
  SkeletonCard,
  SkeletonText,
  Slider,
  Spinner,
  StatusLegend,
  SortableList,
  TagInput,
  TimePicker,
  TimeRangePicker,
  TreeView,
  VirtualList,
} from "@/index"
import { Carousel, CarouselItem } from "@/components/display/carousel"
import { Tag, TagGroup } from "@/components/display/tag"
import { Heading, Mark, Text } from "@/components/display/typography"

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
  if (item.slug === "avatar") {
    return (
      <div className="flex flex-wrap items-center gap-4">
        <Avatar name="Tembro" />
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

  if (item.slug === "accordion") {
    return (
      <Accordion
        type="single"
        defaultValue="install"
        items={[
          {
            key: "install",
            title: "Install with CLI",
            description: "Copy source into your app.",
            content: "Run `npx tembro add accordion`, then edit the local component source.",
          },
          {
            key: "compose",
            title: "Compose route content",
            description: "Use it for settings, FAQ and dense docs groups.",
            content: "Accordion items keep title, description, meta, badges and disabled states together.",
          },
        ]}
      />
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

  if (item.slug === "command-palette") {
    return (
      <CommandPalette
        open
        onOpenChange={() => undefined}
        title="Preview command palette"
        description="Command palette preview with grouped actions."
        placeholder="Search commands..."
        groups={[
          {
            id: "components",
            label: "Components",
            items: [
              { id: "button", label: "Button", description: "Open button docs", shortcut: "B" },
              { id: "input", label: "Input", description: "Open input docs", shortcut: "I" },
              { id: "data-table", label: "DataTable", description: "Open table docs", shortcut: "T" },
            ],
          },
        ]}
        contentClassName="relative inset-auto translate-x-0 translate-y-0 shadow-none"
      />
    )
  }

  if (item.slug === "copy-button") {
    return <CopyButton value="npx tembro add button">Copy command</CopyButton>
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

  if (item.slug === "color-picker") {
    return (
      <ColorPicker
        label="Brand accent"
        defaultValue="#2563ebcc"
        showAlpha
        swatches={["#0f172a", "#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed"]}
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
    return <Input type="color" defaultValue="#22c55e" aria-label="Accent color" />
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

  if (item.slug === "quick-action-grid") {
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

  if (item.slug === "data-table-saved-filters") {
    return (
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-2 rounded-[var(--radius-lg)] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-3">
          <Badge label="Status" count="Active" status="success" variant="soft" />
          <Badge label="Owner" count="Azamat" variant="secondary" />
          <Badge label="Region" count="APAC" status="info" variant="soft" />
        </div>
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

  if (item.slug === "alert") {
    return <Alert tone="warning" title="Review needed" description="Billing rules changed and one approval is pending." action={<Button size="sm">Open</Button>} />
  }

  if (item.slug === "state-view") {
    return (
      <StateView
        status="success"
        title="Workspace connected"
        description="The route is ready to accept live data and team actions."
        actions={<Button size="sm">Continue</Button>}
      />
    )
  }

  if (item.slug === "list") {
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
        value={`{\n  "workspace": "tembro",\n  "theme": "dashboard"\n}`}
        onValueChange={() => undefined}
        rows={7}
      />
    )
  }

  if (item.slug === "sortable-list") {
    const tasks = [
      { id: "docs", title: "Docs polish", meta: "Ready" },
      { id: "api", title: "API table", meta: "Review" },
      { id: "preview", title: "Live preview", meta: "Live" },
    ]

    return (
      <SortableList
        defaultItems={tasks}
        getItemId={(task) => task.id}
        getItemLabel={(task) => task.title}
        renderItem={(task) => (
          <div className="flex min-w-0 items-center justify-between gap-3">
            <span className="truncate text-sm font-medium">{task.title}</span>
            <Badge variant="outline">{task.meta}</Badge>
          </div>
        )}
      />
    )
  }

  if (item.slug === "virtual-list") {
    const rows = Array.from({ length: 80 }, (_, index) => ({
      id: `row-${index + 1}`,
      name: `Virtual record ${index + 1}`,
      status: index % 3 === 0 ? "Review" : "Live",
    }))

    return (
      <VirtualList
        items={rows}
        height={280}
        estimateSize={56}
        getItemKey={(row) => row.id}
        renderItem={(row) => (
          <div className="mx-1 flex items-center justify-between rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] px-4 py-3">
            <span className="text-sm font-medium">{row.name}</span>
            <Badge variant={row.status === "Live" ? "secondary" : "outline"}>{row.status}</Badge>
          </div>
        )}
      />
    )
  }

  if (item.slug === "signature-pad") {
    return (
      <SignaturePad
        defaultValue={[
          [
            { x: 0.16, y: 0.58, pressure: 0.5 },
            { x: 0.26, y: 0.38, pressure: 0.5 },
            { x: 0.38, y: 0.62, pressure: 0.5 },
            { x: 0.54, y: 0.42, pressure: 0.5 },
            { x: 0.72, y: 0.56, pressure: 0.5 },
          ],
        ]}
        labels={{ canvas: "Signature preview", undo: "Undo", clear: "Clear" }}
      />
    )
  }

  if (item.slug === "qr-code") {
    return (
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div className="rounded-2xl border border-[color:var(--aui-divider)] bg-white p-4">
          <QRCode value="https://tembro.dev/components" size={148} alt="Tembro components QR" />
        </div>
        <div>
          <p className="font-semibold aui-text-strong">QR code</p>
          <p className="mt-2 text-sm leading-6 aui-text-muted">Generates SVG output, supports custom colors, error fallback and async loading.</p>
        </div>
      </div>
    )
  }

  if (item.slug === "rich-text-editor") {
    return (
      <RichTextEditor
        defaultValue="<h2>Release notes</h2><p>Write rich product copy with toolbar actions, links and placeholder support.</p>"
        minHeight={180}
        onLinkRequest={() => "https://tembro.dev"}
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

  if (item.slug === "overlay") {
    return (
      <div className="grid gap-3 sm:grid-cols-3">
        <Card><CardContent className="p-4"><p className="font-medium">Dialog</p><p className="mt-1 text-sm text-muted-foreground">Focused confirmation and forms.</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="font-medium">Popover</p><p className="mt-1 text-sm text-muted-foreground">Compact contextual actions.</p></CardContent></Card>
        <Card><CardContent className="p-4"><p className="font-medium">Sheet</p><p className="mt-1 text-sm text-muted-foreground">Side panel workflows.</p></CardContent></Card>
      </div>
    )
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
      <div className="grid gap-4 rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[color:var(--aui-page-foreground)]">{item.title}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[color:var(--aui-page-muted)]">
              Overlay surfaces should stay compact, focused, and secondary to the route behind them.
            </p>
          </div>
          <Badge variant="outline">Overlay</Badge>
        </div>

        <div className="rounded-2xl border border-dashed border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button variant="ghost">Cancel</Button>
            <Button variant="outline">Save draft</Button>
            <Button>Confirm</Button>
          </div>
        </div>
      </div>
    )
  }

  if (item.category === "Data Display") {
    return (
      <div className="grid gap-4 rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-lg font-semibold">{item.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">Display surfaces should prioritize readable values, compact metadata, and clear scanning order.</p>
          </div>
          <Badge variant="outline">{mode}</Badge>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {[
            { label: "Primary value", value: "84.2k", note: "Strong first read" },
            { label: "Supporting meta", value: "12 teams", note: "Context stays secondary" },
            { label: "Status", value: "Live", note: "One concise badge or tone" },
          ].map((entry) => (
            <div key={entry.label} className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{entry.label}</p>
              <p className="mt-2 text-lg font-semibold text-[color:var(--aui-page-foreground)]">{entry.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>
            </div>
          ))}
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
