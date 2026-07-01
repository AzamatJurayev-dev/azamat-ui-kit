import type { ComponentDemoMock } from "../types"

export const pageHeaderMock: ComponentDemoMock = {
  code: `import { Breadcrumbs, PageHeader } from "azamat-ui-kit"

export function Example() {
  return (
    <PageHeader
      eyebrow="Overview"
      title="Project settings"
      description="Use PageHeader to group title, description and actions at the top of a screen."
      breadcrumbs={<Breadcrumbs items={[{ key: "home", label: "Home", href: "/" }, { key: "settings", label: "Settings", current: true }]} />}
      actions={<button>Save</button>}
      sticky
    />
  )
}`,
  highlights: ["Top-of-page composition", "Optional breadcrumbs region", "Action and meta regions", "Sticky page heading mode"],
  relatedBlockSlugs: ["dashboard-starter", "crm-dashboard", "users-table"],
  scenarios: [
    { title: "Admin pages", description: "Keep title, description and action buttons together before body content." },
    { title: "List views", description: "Pair breadcrumbs with actions to indicate current scope." },
    { title: "Sticky header", description: "Enable sticky mode for long content pages where users need persistent context." },
  ],
  capabilityNotes: [
    "Use `eyebrow` for a compact pre-heading that communicates area or environment.",
    "Place route breadcrumbs in one place and avoid duplicating path state elsewhere.",
    "Use `meta` for small KPI chips, tags or helper context." ,
  ],
}
