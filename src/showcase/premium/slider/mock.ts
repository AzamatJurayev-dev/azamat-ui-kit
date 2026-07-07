import type { ComponentDemoMock } from "../types"

export const sliderMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { RangeSlider, Slider } from "@azamatjurayevdev/azix-ui"

export function Example() {
  const [score, setScore] = React.useState(72)
  const [windowRange, setWindowRange] = React.useState<[number, number]>([20, 80])

  return (
    <div className="space-y-4">
      <Slider label="Alert threshold" value={score} onValueChange={setScore} showValue />
      <RangeSlider label="Accepted window" value={windowRange} onValueChange={setWindowRange} showValue />
    </div>
  )
}`,
  highlights: ["Single and range sliders", "Inline value surfaces", "Great for tuning thresholds and windows", "Controlled usage without extra wrapper boilerplate"],
  scenarios: [
    { title: "Risk threshold", description: "Tune alert cutoff for operational monitoring." },
    { title: "Accepted score window", description: "Set min and max limits for review, fraud, or quality flows." },
    { title: "Preference controls", description: "Expose density, volume, or sensitivity adjustments with visible values." },
  ],
  capabilityNotes: [
    "Use a slider only when a continuous range is easier than direct typing.",
    "Always label the meaning of the number, not just the number itself.",
    "Range sliders are best for constraints and filters, not for arbitrary dual inputs.",
  ],
}
