import type { ComponentDemoMock } from "../types"

export const badgeMock: ComponentDemoMock = {
  code: `import { Badge } from \"azamat-ui-kit\"\nimport { CheckCircle2, AlertTriangle } from \"lucide-react\"\n\nexport function Example() {\n  return (\n    <div className=\"flex flex-wrap gap-2\">\n      <Badge variant=\"default\">Active</Badge>\n      <Badge variant=\"secondary\">Queued</Badge>\n      <Badge variant=\"outline\">Draft</Badge>\n      <Badge variant=\"destructive\">Needs attention</Badge>\n      <Badge variant=\"ghost\">Small metadata</Badge>\n      <Badge variant=\"secondary\">\n        <CheckCircle2 className=\"mr-1 size-3\" />\n        OK\n      </Badge>\n      <Badge variant=\"outline\">\n        <AlertTriangle className=\"mr-1 size-3\" />\n        Warning\n      </Badge>\n      <a href=\"/docs\" className=\"cursor-pointer\">\n        <Badge variant=\"link\">Docs</Badge>\n      </a>\n    </div>\n  )\n}\n`,
  htmlCode: `<span data-slot=\"badge\" data-variant=\"secondary\">New</span>`,
  cliCommand: "npx azamat-ui-kit-cli add badge",
  highlights: ["Status labels", "Intent variants", "Compact metadata", "Inline and clickable chips"],
  relatedBlockSlugs: ["users-table", "crm-dashboard", "dashboard-starter"],
  scenarios: [
    { title: "Release status", description: "Show current lifecycle state beside titles and cards." },
    { title: "Filter metadata", description: "Use badges to display chips and selected states." },
    { title: "Count surfaces", description: "Embed small counters in headers and toolbars." },
    { title: "Inline annotations", description: "Tag records, table rows and templates with short metadata." },
  ],
  capabilityNotes: [
    "Use multiple variants for status, warnings and soft metadata.",
    "Badges can be inline, clickable, or action-adjacent depending on product intent.",
    "Use icon + text for fast visual parsing when status is critical.",
    "Avoid using badges as primary interactive controls; pair with buttons or links when action needed.",
  ],
}
