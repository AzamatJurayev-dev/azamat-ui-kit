import type { ComponentDemoMock } from "../types"

export const collapseMock: ComponentDemoMock = {
  code: `import { CollapseGroup } from "azix"

const sections = [
  {
    key: "permissions",
    title: "Permissions",
    description: "Who can publish and archive components.",
    content: "Owners can publish. Editors can update docs. Viewers can inspect previews only.",
  },
  {
    key: "release",
    title: "Release notes",
    description: "What changed in this version.",
    content: "Added Tooltip, Combobox and Collapse public docs surfaces.",
  },
]

export function Example() {
  return <CollapseGroup items={sections} type="single" defaultValue="permissions" />
}`,
  htmlCode: `<details data-slot="collapse"><summary>Open details</summary></details>`,
  cliCommand: "npx azix add collapse",
  highlights: ["Progressive disclosure", "Single or multiple open items", "Dense settings layout", "Controlled group state"],
  relatedBlockSlugs: ["settings-form", "dashboard-starter", "crm-dashboard"],
  scenarios: [
    { title: "FAQ and settings", description: "Reveal more detail without turning the page into a long wall of text." },
    { title: "Release notes", description: "Show secondary information only when the user asks for it." },
    { title: "Admin sections", description: "Useful in compact pages where every line of space matters." },
  ],
  capabilityNotes: [
    "Use Collapse when the default page should stay compact but details must remain nearby.",
    "For one-open-at-a-time behavior, prefer `CollapseGroup` with `type=\"single\"`.",
    "Do not hide critical validation or destructive warnings inside collapsed content.",
    "Keep titles scannable so users know what each section reveals before opening it.",
  ],
}
