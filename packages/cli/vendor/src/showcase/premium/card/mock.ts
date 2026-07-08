import type { ComponentDemoMock } from "../types"

export const cardMock: ComponentDemoMock = {
  code: `import { Badge, Card } from "tembro"\n\nexport function Example() {\n  return (\n    <Card\n      title="Project status"\n      description="Release readiness and team alignment"\n      content={\n        <div className="space-y-2">\n          <p>Design review complete. QA pass: 84%.</p>\n          <Badge variant="secondary">Dashboard module</Badge>\n        </div>\n      }\n      footer="Updated 12 minutes ago"\n    />\n  )\n}\n`,
  cliCommand: "npx tembro add card",
  highlights: ["Prop-driven surface", "Compact density", "Dashboard modules", "Token-ready styling"],
  relatedBlockSlugs: ["dashboard-starter", "sidebar-layout", "users-table"],
  scenarios: [
    { title: "Status module", description: "Show dense KPI or project status summaries." },
    { title: "Feature card", description: "Use cards for marketing sections and blocks." },
    { title: "Compact card", description: "Switch density for tighter dashboard layouts." },
    { title: "Composed content shell", description: "Assemble headers, media and metadata in one consistent surface." },
  ],
  capabilityNotes: [
    "Use title, description, content and footer props for the default ready-made card API.",
    "Header/content/footer slot exports stay available only for advanced custom layouts.",
    "Use size='sm' for dense dashboards and default for richer content blocks.",
    "Avoid nesting cards; compose with sections, stacks, or lists instead.",
    "Great as wrapper for forms, metric summaries and preview surfaces.",
  ],
}

