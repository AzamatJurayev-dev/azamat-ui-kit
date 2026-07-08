import type { ComponentDemoMock } from "../types"

export const badgeMock: ComponentDemoMock = {
  code: `import { Badge } from "azix"\n\nexport function Example() {\n  return (\n    <div className="flex flex-wrap gap-2">\n      <Badge status="success" label="Active" />\n      <Badge status="warning" label="Needs review" />\n      <Badge variant="secondary" label="Invoices" count={12} />\n      <Badge variant="outline" label="Design" removable onRemove={() => console.log("remove")} />\n    </div>\n  )\n}\n`,
  htmlCode: `<span data-slot="badge" data-variant="secondary">New</span>`,
  cliCommand: "npx azix add badge",
  highlights: ["Status props", "Count chip", "Removable chip", "Compact metadata"],
  relatedBlockSlugs: ["users-table", "crm-dashboard", "dashboard-starter"],
  scenarios: [
    { title: "Release status", description: "Show current lifecycle state beside titles and cards." },
    { title: "Filter metadata", description: "Use badges to display chips and selected states." },
    { title: "Count surfaces", description: "Embed small counters in headers and toolbars." },
    { title: "Inline annotations", description: "Tag records, table rows and templates with short metadata." },
  ],
  capabilityNotes: [
    "Use status for ready-made semantic tones instead of manually picking every badge color.",
    "Use count when the chip also needs a compact number bubble.",
    "Use removable with onRemove for filter chips and selected metadata.",
    "Avoid using badges as primary interactive controls; pair with buttons or links when action needed.",
  ],
}

