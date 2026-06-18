import type { ComponentDemoMock } from "../types"

export const badgeMock: ComponentDemoMock = {
  code: `import { Badge } from "@azamat/ui"\n\nexport function Example() {\n  return <Badge variant="secondary">New</Badge>\n}`,
  htmlCode: `<span data-slot="badge" data-variant="secondary">New</span>`,
  cliCommand: "npx azamat-ui@latest add badge",
  highlights: ["Status labels", "Intent variants", "Compact metadata", "Inline counters"],
  relatedBlockSlugs: ["users-table", "crm-dashboard", "dashboard-starter"],
  scenarios: [
    { title: "Release status", description: "Show current lifecycle state beside titles and cards." },
    { title: "Filter metadata", description: "Use badges to display chips and selected states." },
    { title: "Count surfaces", description: "Embed light counters in headers and toolbars." },
    { title: "Inline annotations", description: "Tag records, table rows and templates with short metadata." },
  ],
  capabilityNotes: [
    "Provides multiple visual variants for status and metadata contexts.",
    "Works inline with headings, chips, counters and dense table rows.",
    "Should document outline, ghost and destructive usage clearly.",
    "Can communicate status without taking much layout space.",
  ],
}

