import type { FamilyDemoMock } from "../types"

export const navigationFamilyMock: FamilyDemoMock = {
  code: `import { Pagination, PageTabs, StepperTabs } from "azix"\n\nexport function Example() {\n  return <Pagination />\n}`,
  highlights: ["Pagination controls", "Page tabs", "Stepper tabs", "Route-aware segmentation"],
  scenarios: [
    { title: "Paged reports", description: "Move through dense result sets with explicit page state." },
    { title: "Section tabs", description: "Segment detail pages into clear content groups." },
    { title: "Stepper flow", description: "Represent ordered multi-stage progress in navigation." },
  ],
  metrics: [
    { label: "Exports", value: "3" },
    { label: "Navigation modes", value: "3" },
    { label: "Status", value: "Stable" },
  ],
}

