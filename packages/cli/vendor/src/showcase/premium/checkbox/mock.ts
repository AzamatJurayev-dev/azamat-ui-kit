import type { ComponentDemoMock } from "../types"

export const checkboxMock: ComponentDemoMock = {
  code: `import * as React from "react"\nimport { Checkbox } from "azamat-ui-kit"\n\nexport function Example() {\n  const [termsAccepted, setTermsAccepted] = React.useState(false)\n\n  return (\n    <div className="space-y-3">\n      <label className="flex items-center gap-2">\n        <Checkbox\n          checked={termsAccepted}\n          onCheckedChange={(checked) => setTermsAccepted(Boolean(checked))}\n        />\n        <span>Accept terms and conditions</span>\n      </label>\n      <label className="flex items-center gap-2">\n        <Checkbox id="indeterminate" indeterminate />\n        <span>Parent selection (mixed state)</span>\n      </label>\n      <label className="flex items-center gap-2">\n        <Checkbox id="readonly" readOnly checked />\n        <span>Read-only state example</span>\n      </label>\n    </div>\n  )\n}\n`,
  cliCommand: "npx azix add checkbox",
  highlights: ["Checked state", "Indeterminate-ready API", "Task lists", "Permission groups"],
  relatedBlockSlugs: ["settings-form", "users-table", "crm-dashboard"],
  scenarios: [
    { title: "Release checklist", description: "Track deployment readiness with simple binary controls." },
    { title: "Permissions", description: "Apply checkbox groups in role and access screens." },
    { title: "Bulk selection", description: "Use in table rows and mass-action workflows." },
    { title: "Task confirmation", description: "Represent short check sequences inside setup and review screens." },
  ],
  capabilityNotes: [
    "Supports checked, disabled and indeterminate-ready API usage patterns.",
    "Pair each checkbox with label elements for accessible toggles.",
    "Use checked/unchecked states for workflows, not custom state machines.",
    "For mixed selections, compute parent indeterminate state from child selections.",
  ],
}
