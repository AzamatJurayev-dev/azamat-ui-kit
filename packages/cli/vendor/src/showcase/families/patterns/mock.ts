import type { FamilyDemoMock } from "../types"

export const patternsFamilyMock: FamilyDemoMock = {
  code: `import { ResourcePage, ResourceDetailPage, FormBuilder } from "azix"\n\nexport function Example() {\n  return <ResourcePage />\n}`,
  highlights: ["Resource pages", "Detail layouts", "Form builder presets", "Composed product patterns"],
  scenarios: [
    { title: "CMS resource page", description: "List, filter and inspect resources in a pattern-driven layout." },
    { title: "Detail view", description: "Break detail screens into overview, activity and settings content." },
    { title: "Form builder", description: "Generate field structures from reusable form presets." },
  ],
  metrics: [
    { label: "Exports", value: "4" },
    { label: "Pattern types", value: "Page + builder" },
    { label: "Status", value: "Stable" },
  ],
}

