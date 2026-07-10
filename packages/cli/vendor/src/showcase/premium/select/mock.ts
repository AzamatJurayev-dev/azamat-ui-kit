import type { ComponentDemoMock } from "../types"

export const selectMock: ComponentDemoMock = {
  code: `import { Select } from "tembro"\n\nconst planGroups = [\n  {\n    label: "Plans",\n    options: [\n      { value: "starter", label: "Starter" },\n      { value: "growth", label: "Growth", description: "25 seats" },\n      { value: "enterprise", label: "Enterprise", description: "Priority support" },\n    ],\n  },\n]\n\nexport function Example() {\n  return (\n    <Select\n      defaultValue="starter"\n      groups={planGroups}\n      searchable\n      clearable\n      emptyMessage="No plan matched"\n    />\n  )\n}`,
  cliCommand: "npx tembro add select",
  highlights: ["Primary selection surface", "Controlled selection", "Searchable local flow", "Grouped option support", "Compact trigger options"],
  relatedBlockSlugs: ["crm-dashboard", "users-table", "dashboard-starter"],
  scenarios: [
    { title: "Plan picker", description: "Switch between starter, growth and enterprise plans." },
    { title: "Status filter", description: "Use select inside dashboards and reporting toolbars." },
    { title: "Compact trigger", description: "Render small controls in dense admin layouts." },
    { title: "Grouped options", description: "Present structured choices without overwhelming the form." },
  ],
  capabilityNotes: [
    "Start here for most static single-choice flows before reaching for helper members.",
    "Supports controlled and uncontrolled selected values, grouped options, clearable state, and searchable local filtering.",
    "Includes trigger sizing for compact or default density layouts.",
    "AsyncSelect, AsyncMultiSelect, SimpleSelect, and Combobox should read as related members rather than separate starting points.",
  ],
}


