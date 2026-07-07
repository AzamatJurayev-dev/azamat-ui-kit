import * as React from "react"

import { FloatButton } from "@/index"
import { PlusIcon } from "lucide-react"

const placements = ["bottom-right", "bottom-left", "top-right", "top-left"] as const

export function FloatButtonShowcase() {
  const [index, setIndex] = React.useState(0)
  const placement = placements[index % placements.length]

  return (
    <div className="relative h-48 rounded-lg border bg-muted/20 p-6">
      <p className="mb-3 text-sm text-muted-foreground">Current placement: {placement}</p>
      <FloatButton onClick={() => setIndex((value) => value + 1)} aria-label="Open quick actions" placement={placement}>
        <PlusIcon className="size-5" />
      </FloatButton>
    </div>
  )
}

