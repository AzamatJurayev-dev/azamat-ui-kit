import type { ComponentDemoMock } from "../types"

export const cardMock: ComponentDemoMock = {
  code: `import { Badge, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from \"azamat-ui-kit\"\n\nexport function Example() {\n  return (\n    <Card>\n      <CardHeader>\n        <CardTitle>Project status</CardTitle>\n        <CardDescription>Release readiness and team alignment</CardDescription>\n      </CardHeader>\n      <CardContent className=\"space-y-2\">\n        <p>Design review complete. QA pass: 84%.</p>\n        <Badge variant=\"secondary\">Dashboard module</Badge>\n      </CardContent>\n      <CardFooter>Updated 12 minutes ago</CardFooter>\n    </Card>\n  )\n}\n`,
  cliCommand: "npx azamat-ui-kit-cli add card",
  highlights: ["Header and footer slots", "Compact density", "Dashboard modules", "Composed content"],
  relatedBlockSlugs: ["dashboard-starter", "sidebar-layout", "users-table"],
  scenarios: [
    { title: "Status module", description: "Show dense KPI or project status summaries." },
    { title: "Feature card", description: "Use cards for marketing sections and blocks." },
    { title: "Compact card", description: "Switch density for tighter dashboard layouts." },
    { title: "Composed content shell", description: "Assemble headers, media and metadata in one consistent surface." },
  ],
  capabilityNotes: [
    "Supports structured header, content and footer composition.",
    "Use size='sm' for dense dashboards and default for richer content blocks.",
    "Avoid nesting cards; compose with sections, stacks, or lists instead.",
    "Great as wrapper for forms, metric summaries and preview surfaces.",
  ],
}
