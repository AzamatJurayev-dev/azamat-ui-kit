import type { ComponentDemoMock } from "../types"

export const inputMock: ComponentDemoMock = {
  code: `import { Input } from "@azamat/ui"\n\nexport function Example() {\n  return <Input placeholder="Search components..." />\n}`,
  htmlCode: `<input data-slot="input" type="text" placeholder="Search components..." />`,
  cliCommand: "npx azamat-ui@latest add input",
  highlights: ["Search fields", "Email inputs", "Disabled state", "Controlled value"],
  relatedBlockSlugs: ["users-table", "settings-form", "crm-dashboard"],
  scenarios: [
    { title: "Search", description: "Use compact inputs inside headers and filter bars." },
    { title: "Email capture", description: "Pair with helper text and clear labels in forms." },
    { title: "Disabled state", description: "Prevent editing when the workflow is locked." },
    { title: "Toolbar filtering", description: "Embed the input in list and table control bars." },
  ],
  capabilityNotes: [
    "Supports controlled text entry with placeholder and disabled states.",
    "Fits filter bars, compact headers and regular form layouts.",
    "Can represent text, email and password-like scenarios through native input type changes.",
    "Needs explicit preview coverage for default, focused and read-only-adjacent states.",
  ],
}

