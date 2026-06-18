import type { ComponentDemoMock } from "../types"

export const selectMock: ComponentDemoMock = {
  code: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@azamat/ui"\n\nexport function Example() {\n  return (\n    <Select defaultValue="starter">\n      <SelectTrigger><SelectValue /></SelectTrigger>\n      <SelectContent>\n        <SelectItem value="starter">Starter</SelectItem>\n      </SelectContent>\n    </Select>\n  )\n}`,
  cliCommand: "npx azamat-ui@latest add select",
  highlights: ["Controlled selection", "Size variants", "Grouped choices", "Filter panels"],
  relatedBlockSlugs: ["crm-dashboard", "users-table", "dashboard-starter"],
  scenarios: [
    { title: "Plan picker", description: "Switch between starter, growth and enterprise plans." },
    { title: "Status filter", description: "Use select inside dashboards and reporting toolbars." },
    { title: "Compact trigger", description: "Render small controls in dense admin layouts." },
    { title: "Grouped options", description: "Present structured choices without overwhelming the form." },
  ],
  capabilityNotes: [
    "Supports controlled and uncontrolled selected values.",
    "Includes trigger sizing for compact or default density layouts.",
    "Best suited for status, plan and ownership filtering scenarios.",
    "Needs examples for long labels, compact lists and default selection states.",
  ],
}

