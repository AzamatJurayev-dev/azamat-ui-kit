import type { ComponentDemoMock } from "../types"

export const selectMock: ComponentDemoMock = {
  code: `import { Select } from "tembro"\n\nconst planOptions = [\n  { value: "starter", label: "Starter" },\n  { value: "growth", label: "Growth" },\n  { value: "enterprise", label: "Enterprise" },\n]\n\nexport function Example() {\n  return <Select defaultValue="starter" options={planOptions} />\n}`,
  cliCommand: "npx tembro add select",
  highlights: ["Primary selection surface", "Controlled selection", "Searchable local flow", "Compact trigger options"],
  relatedBlockSlugs: ["crm-dashboard", "users-table", "dashboard-starter"],
  scenarios: [
    { title: "Plan picker", description: "Switch between starter, growth and enterprise plans." },
    { title: "Status filter", description: "Use select inside dashboards and reporting toolbars." },
    { title: "Compact trigger", description: "Render small controls in dense admin layouts." },
    { title: "Grouped options", description: "Present structured choices without overwhelming the form." },
  ],
  capabilityNotes: [
    "Start here for most static single-choice flows before reaching for helper members.",
    "Supports controlled and uncontrolled selected values plus searchable local filtering.",
    "Includes trigger sizing for compact or default density layouts.",
    "AsyncSelect, AsyncMultiSelect, SimpleSelect, and Combobox should read as related members rather than separate starting points.",
  ],
}


