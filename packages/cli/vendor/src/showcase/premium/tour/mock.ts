import type { ComponentDemoMock } from "../types"

export const tourMock: ComponentDemoMock = {
  code: `import { Button, Tour } from "@/index"
import { useState } from "react"

export function Example() {
  const [open, setOpen] = useState(true)
  const [index, setIndex] = useState(0)

  return (
    <Tour
      steps={[
        { title: "Welcome", description: "Intro your app flow." },
        { title: "Next", description: "Continue to another key step." },
      ]}
      index={index}
      onIndexChange={setIndex}
      onClose={() => setOpen(false)}
    />
  )
}`,
  cliCommand: "npx tembro add tour",
  highlights: [
    "Controlled tour state with index-driven steps",
    "Built-in close handling",
  ],
  scenarios: [
    { title: "Product onboarding", description: "Guide new users through first-time workflow." },
    { title: "Release tours", description: "Attach temporary walkthroughs to feature releases." },
  ],
}

