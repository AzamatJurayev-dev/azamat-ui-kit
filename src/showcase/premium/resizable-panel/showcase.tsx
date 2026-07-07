import * as React from "react"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/index"

export function ResizablePanelShowcase() {
  const [vertical, setVertical] = React.useState(false)

  return (
    <div className="space-y-4">
      <button type="button" className="inline-flex rounded-md border px-3 py-1.5 text-sm" onClick={() => setVertical((value) => !value)}>
        Direction: {vertical ? "Vertical" : "Horizontal"}
      </button>
      <ResizablePanelGroup direction={vertical ? "vertical" : "horizontal"} className="h-56">
        <ResizablePanel defaultSize={35} className="grid place-items-center">
          <span className="text-sm text-muted-foreground">Navigation</span>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={65} className="grid place-items-center">
          <span className="text-sm text-muted-foreground">Details</span>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

