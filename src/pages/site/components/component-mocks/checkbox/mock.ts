import type { ComponentDemoMock } from "../types"

export const checkboxMock: ComponentDemoMock = {
  code: `import { Checkbox } from "@azamat/ui"\n\nexport function Example() {\n  return <Checkbox defaultChecked />\n}`,
  cliCommand: "npx azamat-ui@latest add checkbox",
  highlights: ["Checked state", "Indeterminate-ready API", "Task lists", "Permission groups"],
  relatedBlockSlugs: ["settings-form", "users-table", "crm-dashboard"],
  scenarios: [
    { title: "Release checklist", description: "Track deployment readiness with simple binary controls." },
    { title: "Permissions", description: "Apply checkbox groups in role and access screens." },
    { title: "Bulk selection", description: "Use in table rows and mass-action workflows." },
    { title: "Task confirmation", description: "Represent short check sequences inside setup and review screens." },
  ],
  capabilityNotes: [
    "Supports checked and indeterminate-ready API usage patterns.",
    "Works in lists, permission matrices and selection flows.",
    "Should show default, checked, disabled and group contexts.",
    "Often pairs with labels and helper text instead of standing alone.",
  ],
}

