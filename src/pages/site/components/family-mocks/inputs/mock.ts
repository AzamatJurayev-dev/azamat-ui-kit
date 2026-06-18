import type { FamilyDemoMock } from "../types"

export const inputsFamilyMock: FamilyDemoMock = {
  code: `import { SearchInput, PasswordInput, MoneyInput, TagInput } from "@azamat/ui"\n\nexport function Example() {\n  return <SearchInput />\n}`,
  highlights: ["Search and password inputs", "Money and number fields", "Date helpers", "Tag and combobox flows"],
  scenarios: [
    { title: "Filter-heavy dashboards", description: "Use search, date and select controls in tight headers." },
    { title: "Checkout and billing", description: "Money and quantity fields help transactional forms." },
    { title: "Entity tagging", description: "Capture labels and categories inline with tag input patterns." },
  ],
  metrics: [
    { label: "Exports", value: "14" },
    { label: "Modes", value: "4+" },
    { label: "Status", value: "Stable" },
  ],
}

