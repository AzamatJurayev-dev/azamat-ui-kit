import type { FamilyDemoMock } from "../types"

export const filtersFamilyMock: FamilyDemoMock = {
  code: `import { FilterBar, FilterChips } from "azix"\n\nexport function Example() {\n  return <FilterBar />\n}`,
  highlights: ["Filter bars", "Applied chips", "Search + filter coupling", "Dashboard refinement"],
  scenarios: [
    { title: "Analytics toolbar", description: "Combine search, chips and status filters in one row." },
    { title: "Lead boards", description: "Switch quickly between open, review and won states." },
    { title: "Saved segments", description: "Represent active narrowing rules with persistent chips." },
  ],
  metrics: [
    { label: "Exports", value: "2" },
    { label: "Modes", value: "Bar + chips" },
    { label: "Status", value: "Stable" },
  ],
}

