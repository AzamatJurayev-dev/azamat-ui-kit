import type { ComponentDemoMock } from "../types"

export const cardMock: ComponentDemoMock = {
  code: `import { Card, CardHeader, CardTitle, CardContent } from "@azamat/ui"\n\nexport function Example() {\n  return (\n    <Card>\n      <CardHeader><CardTitle>Project status</CardTitle></CardHeader>\n      <CardContent>Live and stable</CardContent>\n    </Card>\n  )\n}`,
  cliCommand: "npx azamat-ui@latest add card",
  highlights: ["Header and footer slots", "Compact density", "Dashboard modules", "Composed content"],
  relatedBlockSlugs: ["dashboard-starter", "sidebar-layout", "ecommerce-product"],
  scenarios: [
    { title: "Status module", description: "Show dense KPI or project status summaries." },
    { title: "Feature card", description: "Use cards for marketing sections and blocks." },
    { title: "Compact card", description: "Switch density for tighter dashboard layouts." },
    { title: "Composed content shell", description: "Assemble headers, media and metadata in one consistent surface." },
  ],
  capabilityNotes: [
    "Supports structured header, content and footer composition.",
    "Useful in marketing, analytics and settings interfaces.",
    "Should demonstrate both roomy and compact density settings.",
    "Pairs with badges, tables and small action rows for richer blocks.",
  ],
}

