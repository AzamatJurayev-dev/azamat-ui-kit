import type { ComponentDemoMock } from "../types"

export const tagInputMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { TagInput } from "tembro"

export function Example() {
  const [tags, setTags] = React.useState(["billing", "priority"])

  return (
    <TagInput
      value={tags}
      onValueChange={setTags}
      maxTags={5}
    />
  )
}`,
  highlights: ["Add/remove tag chips", "Max tag support", "Backspace remove behavior", "Good for labels, filters, and categorization"],
  scenarios: [
    { title: "Record labels", description: "Attach operational tags to invoices, tickets, or users." },
    { title: "Saved filters", description: "Represent multi-value filter state in a compact input." },
    { title: "Skill lists", description: "Collect short multi-entry labels without building a custom repeater." },
  ],
  capabilityNotes: [
    "TagInput is for short normalized labels, not long rich text tokens.",
    "Backspace remove is important when the field is keyboard-heavy.",
    "Use `maxTags` when the domain has a sensible cap.",
  ],
}
