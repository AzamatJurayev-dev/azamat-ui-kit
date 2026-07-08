import type { ComponentDemoMock } from "../types"

export const clearableInputMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { ClearableInput } from "azix"

export function Example() {
  const [value, setValue] = React.useState("workspace token")

  return (
    <ClearableInput
      value={value}
      onValueChange={setValue}
      placeholder="Filter or paste value..."
      clearOnEscape
    />
  )
}`,
  highlights: ["Inline clear action", "Escape-to-clear support", "Focus restore after clearing", "Small but high-frequency utility input"],
  scenarios: [
    { title: "Filter reset", description: "Let users clear a short filter without hunting for an extra reset button." },
    { title: "Token paste", description: "Remove a pasted value quickly and stay focused in the same field." },
    { title: "Toolbar utility", description: "Use in dense admin bars where compact cleanup matters." },
  ],
  capabilityNotes: [
    "Clearable input is strongest for short-lived values like filters and quick entry.",
    "Escape clear is useful only when the input is frequently changed.",
    "Keep the field visually quiet so the clear action feels secondary.",
  ],
}
