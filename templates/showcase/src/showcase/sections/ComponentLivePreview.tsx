import { useMemo } from "react"
import {
  CalendarDaysIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  CommandIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListChecksIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react"

import { KanbanBoard, type KanbanColumn } from "@/components/display/kanban"
import { Progress, ProgressCard } from "@/components/display/progress"
import { StatusLegend } from "@/components/display/status-legend"
import { Tag, TagGroup } from "@/components/display/tag"
import { Timeline } from "@/components/display/timeline"
import { Alert } from "@/components/feedback/alert"
import { StateView } from "@/components/feedback/state-view"
import { Pagination } from "@/components/navigation/pagination"
import { EmptyState } from "@/components/patterns/empty-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Divider } from "@/components/ui/divider"
import { Input } from "@/components/ui/input"
import { Kbd } from "@/components/ui/kbd"
import { RadioGroup } from "@/components/ui/radio-group"
import { ScrollBox } from "@/components/ui/scroll-box"
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Select } from "@/components/ui/select"
import { Skeleton, SkeletonCard, SkeletonText } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Sidebar } from "@/components/layout/sidebar"
import type { RegistryComponent, RegistryGroup } from "@/showcase/data/registry"
import { CalendarSection } from "@/showcase/sections/CalendarSection"
import { CoreUiSection } from "@/showcase/sections/CoreUiSection"
import { DataTableSection } from "@/showcase/sections/DataTableSection"
import { FormsSection } from "@/showcase/sections/FormsSection"
import { KanbanSection } from "@/showcase/sections/KanbanSection"
import { OverlaySection } from "@/showcase/sections/OverlaySection"
import { PatternsSection } from "@/showcase/sections/PatternsSection"
import { WizardSection } from "@/showcase/sections/WizardSection"

type ComponentLivePreviewProps = {
  group: RegistryGroup
  component: RegistryComponent
}

function SourcePill({ component }: { component: RegistryComponent }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/35 px-3 py-2 text-xs text-muted-foreground">
      <span className="font-medium text-foreground">Direct local import</span>
      <code className="rounded bg-background px-1.5 py-0.5">{component.sourcePath}</code>
    </div>
  )
}

function ButtonPreview() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button leftIcon={<SparklesIcon className="size-4" />}>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="destructive">Destructive</Button>
      <Button loading loadingLabel="Loading" />
      <Button iconOnly aria-label="Command">
        <CommandIcon className="size-4" />
      </Button>
    </div>
  )
}

function InputPreview() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input placeholder="Text input" defaultValue="Tembro input" />
      <Input kind="search" placeholder="Search input" searchIcon={<SearchIcon className="size-4" />} />
      <Input kind="password" placeholder="Password input" defaultValue="secret" />
      <Input kind="number" aria-label="Number input" defaultValue={42} />
    </div>
  )
}

function SelectPreview() {
  return (
    <Select
      placeholder="Select component"
      searchable
      clearable
      options={[
        { label: "Button", value: "button", description: "ui/button" },
        { label: "Kanban", value: "kanban", description: "display/kanban" },
        { label: "DataTable", value: "data-table", description: "data-table/data-table" },
      ]}
    />
  )
}

function TablePreview() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Component</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Group</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["sidebar", "stable", "layout"],
          ["kanban", "preview", "display"],
          ["button", "stable", "ui"],
        ].map(([name, status, group]) => (
          <TableRow key={name}>
            <TableCell>{name}</TableCell>
            <TableCell>
              <Badge label={status} status={status === "stable" ? "success" : "info"} />
            </TableCell>
            <TableCell>{group}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function TabsPreview() {
  return (
    <Tabs defaultValue="preview">
      <TabsList>
        <TabsTrigger value="preview">Preview</TabsTrigger>
        <TabsTrigger value="props">Props</TabsTrigger>
      </TabsList>
      <TabsContent value="preview" className="rounded-lg border bg-muted/25 p-4">
        TabsContent rendered from local tabs component.
      </TabsContent>
      <TabsContent value="props" className="rounded-lg border bg-muted/25 p-4">
        Root, List, Trigger and Content exports are active.
      </TabsContent>
    </Tabs>
  )
}

function KanbanPreview() {
  const columns = useMemo<KanbanColumn[]>(
    () => [
      {
        key: "todo",
        title: "Todo",
        count: 2,
        cards: [
          { key: "button", title: "Button", description: "variants, size, iconOnly", meta: <Badge label="ui" /> },
          { key: "sidebar", title: "Sidebar", description: "navigation surface", meta: <Badge label="layout" /> },
        ],
      },
      {
        key: "testing",
        title: "Testing",
        count: 2,
        cards: [
          { key: "kanban", title: "KanbanBoard", description: "drag and drop columns", meta: <Badge status="info" label="dnd" /> },
          { key: "datatable", title: "DataTable", description: "search and pagination", meta: <Badge status="warning" label="table" /> },
        ],
      },
      {
        key: "ready",
        title: "Ready",
        count: 1,
        cards: [{ key: "theme", title: "Theme tokens", description: "local styles loaded", meta: <Badge status="success" label="ready" /> }],
      },
    ],
    []
  )

  return <KanbanBoard defaultColumns={columns} />
}

function SidebarPreview() {
  return (
    <div className="min-h-[430px] overflow-hidden rounded-xl border bg-background">
      <Sidebar
        responsive={false}
        width="18rem"
        header={
          <div className="grid gap-1 px-1">
            <div className="font-semibold">Tembro</div>
            <div className="text-xs text-muted-foreground">Local sidebar component</div>
          </div>
        }
        items={[
          {
            key: "workspace",
            label: "Workspace",
            sectionLabel: "Main",
            icon: <LayoutDashboardIcon className="size-4" />,
            active: true,
            badge: <Badge label="live" status="success" />,
          },
          { key: "components", label: "Components", icon: <FolderIcon className="size-4" />, defaultExpanded: true, items: [
            { key: "button", label: "button", icon: <CheckCircle2Icon className="size-4" /> },
            { key: "kanban", label: "kanban", icon: <ListChecksIcon className="size-4" /> },
            { key: "data-table", label: "data-table", icon: <UsersIcon className="size-4" /> },
          ] },
          { key: "calendar", label: "Calendar", icon: <CalendarDaysIcon className="size-4" /> },
          { key: "settings", label: "Settings", icon: <SettingsIcon className="size-4" /> },
        ]}
        footerAccount={{
          label: "Azamat",
          description: "QA workspace",
        }}
      />
    </div>
  )
}

function DisplayPreview() {
  return (
    <div className="grid items-start gap-4 lg:grid-cols-2">
      <ProgressCard title="ProgressCard" description="display/progress" value={72} tone="success" />
      <StatusLegend
        title="StatusLegend"
        items={[
          { key: "ready", label: "Ready", tone: "success" },
          { key: "testing", label: "Testing", tone: "info" },
          { key: "blocked", label: "Blocked", tone: "danger" },
        ]}
      />
      <Timeline
        items={[
          { key: "init", title: "Init", description: "CLI scaffold", tone: "success" },
          { key: "add", title: "Add components", description: "Registry copied", tone: "info" },
          { key: "test", title: "Browser test", description: "Screenshot validation", tone: "warning" },
        ]}
      />
      <TagGroup>
        <Tag tone="success" selected>selected</Tag>
        <Tag tone="info">info</Tag>
        <Tag tone="warning" removable>removable</Tag>
      </TagGroup>
    </div>
  )
}

function UiPreview({ name }: { name: string }) {
  if (name === "button") return <ButtonPreview />
  if (name === "input") return <InputPreview />
  if (name === "textarea") return <Textarea defaultValue="Textarea component with helper text and character count." helperText="helperText prop" maxLength={120} showCharacterCount />
  if (name === "checkbox") return <label className="flex items-center gap-3 text-sm"><Checkbox defaultChecked />Checkbox checked state</label>
  if (name === "switch") return <Switch defaultChecked label="Switch enabled" description="Switch label and description props." />
  if (name === "badge") return <div className="flex flex-wrap gap-2"><Badge label="default" /><Badge label="info" status="info" /><Badge label="success" status="success" /><Badge label="warning" status="warning" /><Badge label="danger" status="danger" removable /></div>
  if (name === "card") return <Card variant="elevated" tone="info" title="Card title prop" description="Card description prop" badge={<Badge label="badge" />} action={<Button size="sm" variant="outline" rightIcon={<ChevronRightIcon className="size-4" />}>Action</Button>} content={<Progress value={64} label="Card content" showValue />} footer="Card footer prop" />
  if (name === "skeleton") return <div className="grid gap-3 md:grid-cols-2"><SkeletonCard /><div className="grid content-start gap-3"><Skeleton className="h-10 w-40" /><SkeletonText rows={4} /></div></div>
  if (name === "tabs") return <TabsPreview />
  if (name === "select") return <SelectPreview />
  if (name === "table") return <TablePreview />
  if (name === "segmented-control") return <SegmentedControl defaultValue="desktop" options={[{ label: "Desktop", value: "desktop" }, { label: "Tablet", value: "tablet" }, { label: "Mobile", value: "mobile" }]} />
  if (name === "radio-group") return <RadioGroup defaultValue="stable" options={[{ label: "Stable", value: "stable" }, { label: "Preview", value: "preview" }, { label: "Experimental", value: "experimental" }]} />
  if (name === "kbd") return <div className="flex flex-wrap gap-2"><Kbd>Ctrl</Kbd><Kbd>K</Kbd><Kbd>Enter</Kbd></div>
  if (name === "scroll-box") return <ScrollBox className="h-36 rounded-lg border p-4">{Array.from({ length: 12 }, (_, index) => <p key={index} className="text-sm">Scrollable local row {index + 1}</p>)}</ScrollBox>
  if (name === "divider") return <div className="grid gap-4"><span>Above divider</span><Divider /><span>Below divider</span></div>
  if (name === "spinner") return <div className="flex items-center gap-3"><Spinner /><span className="text-sm text-muted-foreground">Spinner component</span></div>
  return <CoreUiSection />
}

function DirectComponentSurface({ group, component }: ComponentLivePreviewProps) {
  if (component.name === "kanban") return <KanbanPreview />
  if (component.name === "data-table") return <DataTableSection />
  if (component.name === "sidebar") return <SidebarPreview />
  if (group.name === "ui") return <UiPreview name={component.name} />
  if (group.name === "inputs") return <FormsSection />
  if (group.name === "form") return <FormsSection />
  if (group.name === "display") return <DisplayPreview />
  if (group.name === "calendar" || group.name === "navigation") return group.name === "navigation" ? <Pagination page={2} pageCount={8} onPageChange={() => undefined} /> : <CalendarSection />
  if (group.name === "feedback") return component.name === "alert" ? <Alert tone="success" title="Alert component" description="Rendered from feedback/alert." /> : <StateView status="loading" title="StateView" description="Rendered from feedback/state-view." />
  if (group.name === "patterns") return <EmptyState title="EmptyState component" description="Rendered from patterns/empty-state." primaryAction={{ label: "Create item" }} secondaryAction={{ label: "Reset" }} />
  if (group.name === "wizard") return <WizardSection />
  if (group.name === "overlay") return <OverlaySection />
  return <PatternsSection />
}

function RenderLiveSurface({ group, component }: ComponentLivePreviewProps) {
  if (component.name === "kanban") return <KanbanSection />
  if (component.name === "data-table") return <DataTableSection />
  if (group.name === "calendar" || group.name === "navigation") return <CalendarSection />
  if (group.name === "overlay" || ["dialog", "drawer", "confirm-dialog", "alert-dialog"].includes(component.name)) return <OverlaySection />
  if (group.name === "wizard") return <WizardSection />
  if (group.name === "form" || group.name === "inputs" || group.name === "feedback") return <FormsSection />
  if (group.name === "ui" || group.name === "actions" || group.name === "command") return <CoreUiSection />
  return <PatternsSection />
}

export function ComponentLivePreview({ group, component }: ComponentLivePreviewProps) {
  return (
    <section className="grid gap-4">
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>Component preview: {component.name}</CardTitle>
              <CardDescription>{component.name} is rendered from the copied local component file.</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge label={group.name} status="info" />
              <Badge label={component.status} status={component.status === "stable" ? "success" : "info"} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SourcePill component={component} />
          <DirectComponentSurface group={group} component={component} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related group surface</CardTitle>
          <CardDescription>Same installed local components used together inside a full section.</CardDescription>
        </CardHeader>
        <CardContent>
          <RenderLiveSurface group={group} component={component} />
        </CardContent>
      </Card>
    </section>
  )
}
