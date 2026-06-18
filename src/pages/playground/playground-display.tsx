import { useState } from "react"
import { ActivityIcon, CheckCircle2Icon, ClockIcon, FileTextIcon, PackageIcon, PlusIcon, ShieldCheckIcon, UploadCloudIcon, UsersIcon } from "lucide-react"

import {
  ActivityFeed,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Combobox,
  ComponentPreview,
  CopyButton,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataState,
  DescriptionList,
  FilterChips,
  InfoCard,
  MetricGrid,
  PageTabs,
  Progress,
  QuickActionGrid,
  Result,
  StatusBadge,
  StatusLegend,
  StepperTabs,
  TagInput,
  Timeline,
} from "@/index"
import { DemoSection, PlaygroundCard, PlaygroundUsage, ShowcaseGrid } from "./playground-ui"

const metrics = [
  { key: "revenue", label: "Revenue", value: "128.4M", description: "Monthly total", trend: "+12%", tone: "success" as const, icon: <ActivityIcon /> },
  { key: "orders", label: "Orders", value: "1,248", description: "Confirmed orders", trend: "+8%", tone: "info" as const, icon: <PackageIcon /> },
  { key: "pending", label: "Pending", value: "42", description: "Needs review", trend: "-3", tone: "warning" as const, icon: <ClockIcon /> },
  { key: "failed", label: "Failed", value: "7", description: "Import errors", trend: "Fix", tone: "danger" as const, icon: <FileTextIcon /> },
]

const people = [
  { key: "azamat", name: "Azamat Jurayev", status: "online" as const },
  { key: "madina", name: "Madina Karimova", status: "away" as const },
  { key: "timur", name: "Timur Akhmedov", status: "busy" as const },
  { key: "sardor", name: "Sardor Aliyev", status: "offline" as const },
  { key: "malika", name: "Malika Rustamova", status: "online" as const },
]

const statusItems = [
  { key: "active", label: "Active", description: "Visible and available", count: 18, tone: "success" as const },
  { key: "draft", label: "Draft", description: "Needs review", count: 6, tone: "warning" as const },
  { key: "archived", label: "Archived", description: "Hidden from lists", count: 3, tone: "muted" as const },
  { key: "failed", label: "Failed", description: "Requires fix", count: 2, tone: "danger" as const },
]

const actions = [
  { key: "create", label: "Create product", description: "Open product creation flow.", icon: <PlusIcon />, badge: "New" },
  { key: "import", label: "Import file", description: "Upload Excel or CSV data.", icon: <UploadCloudIcon />, badge: "CSV" },
  { key: "audit", label: "Review audit", description: "Check recent changes.", icon: <ShieldCheckIcon />, badge: "3" },
]

const details = [
  { key: "name", label: "Product", value: "Premium Coffee", icon: <PackageIcon /> },
  { key: "sku", label: "SKU", value: "COF-001" },
  { key: "status", label: "Status", value: <StatusBadge tone="success" dot>active</StatusBadge> },
  { key: "price", label: "Price", value: "42,000 UZS" },
]

const timeline = [
  { key: "created", title: "Created", description: "Product was added.", time: "09:30", tone: "success" as const, icon: <CheckCircle2Icon className="size-4" /> },
  { key: "review", title: "Reviewed", description: "Price and stock checked.", time: "10:15", tone: "info" as const, icon: <ShieldCheckIcon className="size-4" /> },
]

const activity = [
  { id: "1", title: "Order approved", description: "Manager confirmed the order.", time: "2m", tone: "success" as const },
  { id: "2", title: "Stock warning", description: "Minimum stock threshold reached.", time: "14m", tone: "warning" as const },
  { id: "3", title: "Import completed", description: "124 products were synced.", time: "1h", tone: "info" as const },
]

const comboOptions = [
  { value: "coffee", label: "Premium Coffee", description: "COF-001" },
  { value: "tea", label: "Green Tea", description: "TEA-002" },
  { value: "cocoa", label: "Classic Cocoa", description: "COC-003" },
  { value: "disabled", label: "Disabled option", description: "Cannot select", disabled: true },
]

function EverydayPreview() {
  const [tab, setTab] = useState("overview")
  const [chips, setChips] = useState([
    { key: "status", label: "Status", value: "Active", tone: "success" as const },
    { key: "branch", label: "Branch", value: "Main", tone: "info" as const },
    { key: "stock", label: "Stock", value: "Low", tone: "warning" as const },
  ])
  const [tags, setTags] = useState(["dashboard", "reusable", "ui-kit"])

  return (
    <div className="grid w-full gap-4 xl:grid-cols-2">
      <InfoCard title="Avatar / AvatarGroup" description="Sizes, statuses, shapes and overflow." icon={<UsersIcon />} compact>
        <div className="grid gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Avatar name="Azamat Jurayev" size="xs" status="online" />
            <Avatar name="Madina Karimova" size="sm" status="away" />
            <Avatar name="Timur Akhmedov" status="busy" />
            <Avatar name="Sardor Aliyev" size="lg" shape="rounded" status="offline" />
            <Avatar name="Malika Rustamova" size="xl" shape="square" />
          </div>
          <AvatarGroup items={people} max={4} />
        </div>
      </InfoCard>
      <InfoCard title="PageTabs" description="Underline and pills navigation." compact>
        <div className="grid gap-4">
          <PageTabs value={tab} onValueChange={setTab} items={[{ value: "overview", label: "Overview", badge: "12" }, { value: "orders", label: "Orders", badge: "4" }, { value: "settings", label: "Settings" }]} />
          <PageTabs value={tab} variant="pills" size="sm" onValueChange={setTab} items={[{ value: "overview", label: "Overview" }, { value: "orders", label: "Orders" }, { value: "settings", label: "Settings" }]} />
          <p className="text-xs text-muted-foreground">Active tab: {tab}</p>
        </div>
      </InfoCard>
      <InfoCard title="FilterChips" description="Remove chips or clear all." compact>
        <FilterChips chips={chips} onRemove={(key) => setChips((items) => items.filter((chip) => chip.key !== key))} onClear={() => setChips([])} />
      </InfoCard>
      <InfoCard title="TagInput" description="Enter/comma adds tags, backspace removes last." compact>
        <TagInput value={tags} onValueChange={setTags} maxTags={6} placeholder="Add keyword" />
      </InfoCard>
    </div>
  )
}

function FunctionalPreview() {
  const [state, setState] = useState<"loading" | "empty" | "error" | "success">("success")
  const [step, setStep] = useState("details")
  const [combo, setCombo] = useState<string | undefined>("coffee")

  return (
    <div className="grid w-full gap-4 xl:grid-cols-2">
      <InfoCard title="DataState" description="Loading, empty, error and success blocks." compact>
        <div className="mb-3 flex flex-wrap gap-2">
          {(["loading", "empty", "error", "success"] as const).map((item) => <Button key={item} size="xs" variant={state === item ? "default" : "outline"} onClick={() => setState(item)}>{item}</Button>)}
        </div>
        <DataState status={state} compact onRetry={state === "error" ? () => setState("success") : undefined} />
      </InfoCard>
      <InfoCard title="StepperTabs" description="Horizontal and vertical step navigation." compact>
        <StepperTabs value={step} onValueChange={setStep} items={[{ value: "details", label: "Details", description: "Basic info", completed: true }, { value: "pricing", label: "Pricing", description: "Price rules" }, { value: "review", label: "Review", description: "Final check" }]} />
        <div className="mt-3"><StepperTabs orientation="vertical" compact value={step} onValueChange={setStep} items={[{ value: "details", label: "Details", completed: true }, { value: "pricing", label: "Pricing" }, { value: "review", label: "Review" }]} /></div>
      </InfoCard>
      <InfoCard title="Combobox" description="Searchable single select with disabled option." compact>
        <Combobox value={combo} onValueChange={setCombo} options={comboOptions} placeholder="Select product" />
        <p className="mt-3 text-xs text-muted-foreground">Selected value: {combo ?? "none"}</p>
      </InfoCard>
      <InfoCard title="QuickActionGrid" description="Dashboard shortcut cards." compact>
        <QuickActionGrid columns={1} compact items={actions} />
      </InfoCard>
    </div>
  )
}

export function DisplaySection() {
  return (
    <DemoSection
      sectionIndex={6}
      id="display"
      eyebrow="Data display"
      title="Display"
      description="Reusable metrics, avatars, tabs, states, comboboxes, tags, filters, actions, legends, activity, details and result components."
      action={<StatusBadge tone="success" dot>New components</StatusBadge>}
    >
      <section className="mb-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <Card className="border-primary/15 bg-background shadow-lg shadow-primary/5">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">Display</Badge>
              <Badge variant="outline">Feedback</Badge>
              <Badge variant="outline">Status language</Badge>
            </div>
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">Readable dashboard feedback, not decorative widgets.</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-6">
              Display components should help the user scan state, compare values and understand what happened next. Keep them compact,
              legible and easy to compose into real screens.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Reading flow</p>
              <div className="mt-2 grid gap-2">
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Metrics</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Status</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Activity</div>
              </div>
            </div>
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Component signal</p>
              <div className="mt-2 grid gap-2 text-sm text-muted-foreground">
                <div className="rounded-xl border bg-background px-3 py-2">Avatar + tabs</div>
                <div className="rounded-xl border bg-background px-3 py-2">DataState + Result</div>
                <div className="rounded-xl border bg-background px-3 py-2">Timeline + legend</div>
              </div>
            </div>
            <div className="rounded-2xl border bg-background/80 p-4 sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">State</p>
                <Badge variant="outline" className="text-[11px]">Signal live</Badge>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Readable metrics.</div>
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">One tone system.</div>
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Fast activity.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-muted/15">
          <CardHeader>
            <CardTitle className="text-lg">Display summary</CardTitle>
            <CardDescription>Fast glance of current dashboard signal.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">Metrics</p>
                <p className="mt-1 text-sm font-medium">{metrics.length}</p>
              </div>
              <div className="rounded-2xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">States</p>
                <p className="mt-1 text-sm font-medium">{statusItems.length}</p>
              </div>
            </div>
            <div className="rounded-2xl border bg-background p-3 text-sm text-muted-foreground">
              Use display components to reinforce state and hierarchy on dashboards and admin screens.
            </div>
          </CardContent>
        </Card>
      </section>

      <MetricGrid className="mb-4" items={metrics} />

      <ComponentPreview title="Everyday dashboard components" description="Avatar, AvatarGroup, PageTabs, FilterChips and TagInput with state." dependencies={["Avatar", "AvatarGroup", "PageTabs", "FilterChips", "TagInput"]} code={`<Avatar name="Azamat Jurayev" status="online" />
<AvatarGroup items={people} max={4} />
<PageTabs value={tab} onValueChange={setTab} items={tabs} />
<FilterChips chips={filters} />
<TagInput value={tags} onValueChange={setTags} />`}>
        <EverydayPreview />
      </ComponentPreview>

      <ComponentPreview title="Functional state components" description="DataState, StepperTabs, Combobox and QuickActionGrid with interactive states." dependencies={["DataState", "StepperTabs", "Combobox", "QuickActionGrid"]} code={`<DataState status="loading" />
<StepperTabs value={step} onValueChange={setStep} items={steps} />
<Combobox value={value} onValueChange={setValue} options={options} />
<QuickActionGrid items={actions} />`}>
        <FunctionalPreview />
      </ComponentPreview>

      <ShowcaseGrid className="mt-4 mb-4 xl:grid-cols-3">
        <PlaygroundCard title="StatusLegend" description="Explain statuses and show counts." badge={<Badge variant="outline">legend</Badge>}><StatusLegend title="Product status" items={statusItems} compact /></PlaygroundCard>
        <PlaygroundCard title="CopyButton" description="Clipboard action with copied state." badge={<Badge variant="outline">clipboard</Badge>}><div className="flex flex-wrap gap-2"><CopyButton value="COF-001" size="sm" /><CopyButton value="https://example.com/products/COF-001" size="sm" variant="outline" copyLabel="Copy link" /></div></PlaygroundCard>
        <PlaygroundCard title="ActivityFeed" description="Recent events and audit history." badge={<Badge variant="outline">feed</Badge>}><ActivityFeed title="Recent activity" items={activity} compact /></PlaygroundCard>
      </ShowcaseGrid>

      <ShowcaseGrid className="mb-4 xl:grid-cols-3">
        <PlaygroundCard title="DescriptionList" description="Read-only label/value detail blocks." badge={<Badge variant="outline">details</Badge>}><DescriptionList title="Product details" items={details} columns={2} compact /></PlaygroundCard>
        <PlaygroundCard title="Progress" description="Uploads, onboarding and KPI completion." badge={<Badge variant="outline">status</Badge>}><div className="grid gap-3"><Progress label="Catalog sync" value={74} tone="success" showValue /><Progress label="Risk review" value={44} tone="warning" showValue /><Progress indeterminate label="Waiting" showValue={false} /></div></PlaygroundCard>
        <PlaygroundCard title="Timeline and Result" description="Process and final states." badge={<Badge variant="outline">states</Badge>}><div className="grid gap-4"><Timeline items={timeline} compact /><Result status="success" compact title="Saved" description="Reusable success state" /></div></PlaygroundCard>
      </ShowcaseGrid>

      <PlaygroundUsage title="Display usage" items={["Use `DataState` for loading, empty, error and success blocks.", "Use `StepperTabs` for multi-step dashboard flows.", "Use `Combobox` for simple searchable single-select fields.", "Use `Avatar`, `PageTabs`, `FilterChips` and `TagInput` for everyday dashboard UI."]} code={`<DataState status="empty" />
<StepperTabs value={step} items={steps} />
<Combobox value={value} options={options} />
<TagInput value={tags} />`} />
    </DemoSection>
  )
}






