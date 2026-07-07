import * as React from "react"

import { Affix } from "@/index"

export function AffixShowcase() {
  const [offsetTop, setOffsetTop] = React.useState(0)
  const [zIndex, setZIndex] = React.useState(40)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="rounded-md border px-2.5 py-1 text-sm" onClick={() => setOffsetTop((value) => Math.max(0, value - 8))}>
          Offset -8
        </button>
        <button type="button" className="rounded-md border px-2.5 py-1 text-sm" onClick={() => setOffsetTop((value) => value + 8)}>
          Offset +8
        </button>
        <button type="button" className="rounded-md border px-2.5 py-1 text-sm" onClick={() => setZIndex((value) => (value === 30 ? 80 : 30))}>
          Toggle z-index
        </button>
      </div>
      <p className="text-sm text-muted-foreground">Current settings: offsetTop={offsetTop}, zIndex={zIndex}</p>
      <div className="relative h-48 overflow-y-auto rounded-lg border bg-muted/20 p-3">
        <div className="h-80 space-y-2">
          <Affix offsetTop={offsetTop} zIndex={zIndex} className="mb-3 bg-primary/95 rounded-md px-3 py-2 text-primary-foreground">
            Sticky anchor bar
          </Affix>
          <p>Scroll this area to verify sticky behavior.</p>
          <p>Affix stays visible at the selected top offset.</p>
          <p>Useful in dashboard toolbars and contextual quick actions.</p>
          <p className="h-64" />
        </div>
      </div>
    </div>
  )
}

