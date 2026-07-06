import type { ShowcaseDemoBundle, ShowcaseDemoDefinition, ShowcaseDemoMock, ShowcaseDemoProps } from "./types"
import { renderShowcasePreview } from "./render-registry-preview"

export function component(
  slug: string,
  componentName: string,
  kind: ShowcaseDemoDefinition["kind"],
  summary: string,
  importName = componentName
): ShowcaseDemoDefinition {
  const readableName = toTitle(slug)

  return {
    slug,
    title: readableName,
    component: componentName,
    kind,
    summary,
    importName,
    highlights: [
      `${readableName} renders with realistic dashboard data instead of an empty shell.`,
      `${componentName} stays isolated so copy, install and preview remain component-scoped.`,
      getQualityHighlight(kind),
    ],
    scenarios: [
      {
        title: "Use when",
        description: getScenarioCopy(kind, summary),
      },
      {
        title: "Implementation",
        description: getImplementationCopy(slug, importName),
      },
    ],
  }
}

export function createShowcaseDemoRegistry(definitions: ShowcaseDemoDefinition[]) {
  return Object.fromEntries(
    definitions.map((definition) => [
      definition.slug,
      {
        mock: createMock(definition),
        Showcase: (props: ShowcaseDemoProps) => <RegistryShowcase definition={definition} {...props} />,
      } satisfies ShowcaseDemoBundle,
    ])
  ) satisfies Record<string, ShowcaseDemoBundle>
}

function createMock(definition: ShowcaseDemoDefinition): ShowcaseDemoMock {
  return {
    cliCommand: `npx azix add ${definition.slug}`,
    code: createCodeSnippet(definition),
    highlights: definition.highlights,
    scenarios: definition.scenarios,
    capabilityNotes: getCapabilityNotes(definition),
  }
}

function createCodeSnippet(definition: ShowcaseDemoDefinition) {
  return exactCodeSnippets[definition.slug]
    ?? createKindSnippet(definition)
}

const exactCodeSnippets: Record<string, string> = {
  "search-input": `import { SearchInput } from "@/components/search-input"

export function Demo() {
  return (
    <SearchInput
      value="invoice"
      onValueChange={(value) => console.log(value)}
      placeholder="Search invoices..."
      resultCount={12}
      shortcut="Ctrl K"
    />
  )
}`,
  "password-input": `import { PasswordInput } from "@/components/password-input"

export function Demo() {
  return <PasswordInput placeholder="Enter secure token" autoComplete="current-password" />
}`,
  "clearable-input": `import { ClearableInput } from "@/components/clearable-input"

export function Demo() {
  return <ClearableInput defaultValue="Azamat UI" placeholder="Search customer" />
}`,
  "tag-input": `import { TagInput } from "@/components/tag-input"

export function Demo() {
  return <TagInput defaultValue={["dashboard", "billing"]} placeholder="Add tag" />
}`,
  "action-menu": `import { ActionMenu } from "@/components/action-menu"
import { Button } from "@/components/button"

export function Demo() {
  return (
    <ActionMenu
      label="Row actions"
      actions={[
        { key: "open", label: "Open" },
        { key: "duplicate", label: "Duplicate" },
        { key: "archive", label: "Archive", destructive: true },
      ]}
      trigger={<Button variant="outline">Actions</Button>}
    />
  )
}`,
  "button-group": `import { ButtonGroup } from "@/components/button-group"

export function Demo() {
  return (
    <ButtonGroup
      items={[
        { key: "day", label: "Day" },
        { key: "week", label: "Week" },
        { key: "month", label: "Month" },
      ]}
    />
  )
}`,
  "quick-action-grid": `import { QuickActionGrid } from "@/components/quick-action-grid"

export function Demo() {
  return (
    <QuickActionGrid
      columns={3}
      items={[
        { key: "new", label: "New invoice", description: "Create a billing row." },
        { key: "import", label: "Import CSV", description: "Upload operational data." },
        { key: "share", label: "Share", description: "Invite a teammate." },
      ]}
    />
  )
}`,
  "filter-bar": `import { FilterBar } from "@/components/filter-bar"
import { SearchInput } from "@/components/search-input"
import { Button } from "@/components/button"

export function Demo() {
  return (
    <FilterBar
      search={<SearchInput value="" placeholder="Search rows..." readOnly />}
      activeCount={2}
      filters={<Button variant="outline">Status</Button>}
      actions={<Button>Export</Button>}
      onReset={() => undefined}
    />
  )
}`,
  "description-list": `import { DescriptionList } from "@/components/description-list"

export function Demo() {
  return (
    <DescriptionList
      title="Invoice details"
      items={[
        { key: "id", label: "Invoice", value: "#4821" },
        { key: "amount", label: "Amount", value: "$12,420" },
        { key: "status", label: "Status", value: "Paid" },
      ]}
    />
  )
}`,
  "entity-card": `import { EntityCard } from "@/components/entity-card"
import { Badge } from "@/components/badge"
import { Button } from "@/components/button"

export function Demo() {
  return (
    <EntityCard
      title="Azamat Workspace"
      description="Admin console and live dashboard route."
      status={<Badge variant="secondary">Live</Badge>}
      meta="Updated 8 min ago"
      actions={<Button size="sm" variant="outline">Open</Button>}
    />
  )
}`,
  "stat-card": `import { StatCard } from "@/components/stat-card"

export function Demo() {
  return (
    <StatCard
      title="Revenue"
      value="$84.2k"
      description="Compared with last month"
      trend={{ value: "+12.4%", tone: "success" }}
      helperText="Updated just now"
    />
  )
}`,
  "pagination": `import { Pagination } from "@/components/pagination"

export function Demo() {
  return <Pagination page={3} pageCount={9} onPageChange={(page) => console.log(page)} />
}`,
  "dialog-actions": `import { DialogActionButton, DialogActions } from "@/components/dialog-actions"

export function Demo() {
  return (
    <DialogActions align="end">
      <DialogActionButton variant="ghost">Cancel</DialogActionButton>
      <DialogActionButton variant="outline">Save draft</DialogActionButton>
      <DialogActionButton>Publish</DialogActionButton>
    </DialogActions>
  )
}`,
  "file-dropzone": `import { FileDropzone } from "@/components/file-dropzone"

export function Demo() {
  return <FileDropzone label="Drop contract files" description="PDF, PNG or CSV up to 10MB." />
}`,
  "stepper": `import { Stepper } from "@/components/stepper"

export function Demo() {
  return (
    <Stepper
      currentStep="billing"
      steps={[
        { id: "profile", title: "Profile", completed: true },
        { id: "billing", title: "Billing" },
        { id: "review", title: "Review" },
      ]}
      onStepChange={() => undefined}
    />
  )
}`,
}

function createKindSnippet(definition: ShowcaseDemoDefinition) {
  const importName = definition.importName ?? definition.component
  const importPath = `@/components/${definition.slug}`

  if (definition.kind === "data-table") {
    return `import { ${importName} } from "${importPath}"

export function Demo() {
  return (
    <div className="rounded-xl border p-3">
      <${importName} />
    </div>
  )
}`
  }

  if (definition.kind === "inputs" || definition.kind === "form") {
    return `import { ${importName} } from "${importPath}"

export function Demo() {
  return <${importName} aria-label="${definition.title}" />
}`
  }

  if (definition.kind === "layout" || definition.kind === "patterns") {
    return `import { ${importName} } from "${importPath}"

export function Demo() {
  return (
    <${importName}>
      <div>Production page content</div>
    </${importName}>
  )
}`
  }

  return `import { ${importName} } from "${importPath}"

export function Demo() {
  return <${importName} />
}`
}

function getCapabilityNotes(definition: ShowcaseDemoDefinition) {
  return [
    `Add ${definition.slug} into your local source with the CLI.`,
    `Open the ${definition.title} page to review props, copyable code, and a live state preview.`,
    getKindCapabilityNote(definition.kind),
  ]
}

function RegistryShowcase({
  definition,
  state,
  setState,
}: ShowcaseDemoProps & {
  definition: ShowcaseDemoDefinition
}) {
  return (
    <div className="space-y-5">
      <header className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--aui-page-muted)]">
            {definition.component}
          </span>
          <span className="rounded-full border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:var(--aui-page-muted)]">
            {definition.kind}
          </span>
        </div>
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-[color:var(--aui-page-foreground)]">
            {definition.title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[color:var(--aui-page-muted)]">{definition.summary}</p>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--aui-divider)] px-4 py-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--aui-page-muted)]">Live example</p>
            <p className="mt-1 text-sm font-medium text-[color:var(--aui-page-foreground)]">Realistic dashboard state</p>
          </div>
          <span className="rounded-full border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--aui-brand-strong)]">
            CLI ready
          </span>
        </div>
        <div className="p-4 sm:p-5">
          {renderShowcasePreview(definition, state, setState)}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {definition.highlights.slice(0, 3).map((item) => (
          <div
            key={item}
            className="rounded-2xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm leading-6 text-[color:var(--aui-page-muted)]"
          >
            {item}
          </div>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {definition.scenarios.slice(0, 2).map((scenario) => (
          <div key={scenario.title} className="rounded-2xl border border-dashed border-[color:var(--aui-divider)] px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--aui-page-muted)]">{scenario.title}</p>
            <p className="mt-2 text-sm leading-6 text-[color:var(--aui-page-muted)]">{scenario.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function getQualityHighlight(kind: ShowcaseDemoDefinition["kind"]) {
  const values: Record<ShowcaseDemoDefinition["kind"], string> = {
    actions: "Actions include labels, destructive states and compact row controls.",
    calendar: "Calendar examples keep date value and month state visible.",
    "data-table": "Table demos show toolbar, selection, rows, actions and pagination context.",
    display: "Display demos use real entity, metric and workflow copy.",
    feedback: "Feedback demos include status, action and recovery context.",
    form: "Form demos keep label, hint and validation spacing visible.",
    inputs: "Input demos show controlled values, placeholder copy and useful affordances.",
    layout: "Layout demos show how the component frames a production screen.",
    navigation: "Navigation demos show active state and route-sized labels.",
    overlay: "Overlay demos keep trigger, content and action semantics together.",
    patterns: "Pattern demos show page-level composition, not just isolated atoms.",
    upload: "Upload demos show accepted content and empty state messaging.",
    wizard: "Wizard demos include steps, progress and content slots.",
  }

  return values[kind]
}

function getScenarioCopy(kind: ShowcaseDemoDefinition["kind"], summary: string) {
  if (kind === "data-table") return "Use on operational pages where search, filters, selection and row actions must stay visible together."
  if (kind === "patterns") return "Use when a whole route needs consistent header, stats, filters, sections and detail content."
  if (kind === "overlay") return "Use when the user needs a focused decision without leaving the current route."
  if (kind === "inputs" || kind === "form") return "Use inside controlled forms where label, value and validation behavior must be predictable."

  return summary
}

function getImplementationCopy(slug: string, importName: string) {
  return `Run the CLI add command for ${slug}, import ${importName}, then replace the preview data with your product state.`
}

function getKindCapabilityNote(kind: ShowcaseDemoDefinition["kind"]) {
  const values: Record<ShowcaseDemoDefinition["kind"], string> = {
    actions: "Keep action labels explicit and mark destructive operations clearly.",
    calendar: "Keep date values normalized before passing them into calendar state.",
    "data-table": "Wire table state first, then add visual density and presets.",
    display: "Use real empty, loading and long-text cases before shipping.",
    feedback: "Pair every alert or state with the next useful user action.",
    form: "Validate with RHF or controlled state before styling the wrapper.",
    inputs: "Keep value and onChange behavior stable for filtering and forms.",
    layout: "Use layout components at route level instead of nesting them deep inside widgets.",
    navigation: "Keep active state route-driven where possible.",
    overlay: "Preserve focus return, escape close and mobile behavior.",
    patterns: "Treat patterns as starting points for full pages, not tiny widgets.",
    upload: "Validate file type, size and async error states in your app layer.",
    wizard: "Persist current step and form state between step changes.",
  }

  return values[kind]
}

function toTitle(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}
