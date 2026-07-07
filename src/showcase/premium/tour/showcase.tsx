import * as React from "react"

import { Button, Tour } from "@/index"

const tourSteps = [
  { title: "Welcome", description: "Use this for quick onboarding overlays." },
  { title: "Key actions", description: "Guide users through essential workflows." },
  { title: "Done", description: "Save and share the tour flow with the team." },
]

export function TourShowcase() {
  const [index, setIndex] = React.useState(0)
  const [open, setOpen] = React.useState(true)

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setOpen(true)}>
          Open tour
        </Button>
        <Button size="sm" variant="outline" onClick={() => setIndex((value) => (value + 1) % tourSteps.length)}>
          Next step
        </Button>
      </div>
      {open ? <Tour steps={tourSteps} index={index} onIndexChange={setIndex} onClose={() => setOpen(false)} /> : null}
    </div>
  )
}

