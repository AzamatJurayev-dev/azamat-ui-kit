import type { ComponentDemoMock } from "../types"

export const ratingMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { Rating } from "tembro"

export function Example() {
  const [value, setValue] = React.useState(4)

  return (
    <Rating
      value={value}
      onValueChange={setValue}
      labels={{ rate: (score) => \`Rate \${score}\` }}
    />
  )
}`,
  highlights: ["Compact score input", "Hover and clear behavior", "Accessible label support", "Good for reviews, QA, and lightweight feedback"],
  scenarios: [
    { title: "QA handoff", description: "Capture a quick confidence score before shipping a change." },
    { title: "Support satisfaction", description: "Collect a lightweight post-resolution rating." },
    { title: "Internal review", description: "Use a compact score where a full form would slow people down." },
  ],
  capabilityNotes: [
    "Use rating when relative sentiment matters more than exact numeric entry.",
    "Allow clear when revising feedback is a normal part of the flow.",
    "Keep the label around the score context outside the stars themselves.",
  ],
}
