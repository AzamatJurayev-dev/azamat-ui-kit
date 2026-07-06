import type { FamilyDemoMock } from "../types"

export const wizardFamilyMock: FamilyDemoMock = {
  code: `import { Stepper, Wizard } from "azix"\n\nexport function Example() {\n  return <Wizard />\n}`,
  highlights: ["Multi-step flow", "Progress state", "Guided forms", "Step affordances"],
  scenarios: [
    { title: "Onboarding", description: "Guide users through setup without overwhelming them." },
    { title: "Checkout flow", description: "Break complex processes into sequential steps." },
    { title: "Workspace creation", description: "Collect structured info with visible progress." },
  ],
  metrics: [
    { label: "Exports", value: "2" },
    { label: "Steps", value: "4" },
    { label: "Status", value: "Stable" },
  ],
}

