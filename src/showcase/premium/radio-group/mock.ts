import type { ComponentDemoMock } from "../types"

export const radioGroupMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { RadioGroup } from "tembro"

const planOptions = [
  { value: "starter", label: "Starter", description: "Good for single workspace setup." },
  { value: "growth", label: "Growth", description: "Adds more seats and team workflows." },
  { value: "enterprise", label: "Enterprise", description: "Advanced controls and support." },
]

export function Example() {
  const [value, setValue] = useState("growth")

  return <RadioGroup value={value} onValueChange={setValue} options={planOptions} />
}`,
  htmlCode: `<div data-slot="radio-group" role="radiogroup"></div>`,
  cliCommand: "npx tembro add radio-group",
  highlights: ["Single choice", "Description rows", "Controlled value", "Plan selection"],
  relatedBlockSlugs: ["settings-form", "crm-dashboard", "dashboard-starter"],
  scenarios: [
    { title: "Plan choice", description: "Use when only one option can stay active." },
    { title: "Density mode", description: "Useful for settings that must remain mutually exclusive." },
    { title: "Form clarity", description: "Descriptions reduce ambiguity between similar choices." },
  ],
  capabilityNotes: [
    "Prefer RadioGroup over Select when all choices should remain visible.",
    "Use descriptions only when options are close enough to need clarification.",
    "Keep the selected value controlled in settings or pricing flows.",
    "Switch to Checkbox only when multiple answers can be true at once.",
  ],
}
