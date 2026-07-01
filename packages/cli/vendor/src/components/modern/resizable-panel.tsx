import * as React from "react"

import { cn } from "@/lib/utils"

export type ResizablePanelGroupProps = React.ComponentProps<"div"> & {
  direction?: "horizontal" | "vertical"
}

export type ResizablePanelProps = React.ComponentProps<"div"> & {
  defaultSize?: string
}

function ResizablePanelGroup({ direction = "horizontal", className, ...props }: ResizablePanelGroupProps) {
  return <div data-slot="resizable-panel-group" data-direction={direction} className={cn("grid gap-2", direction === "horizontal" ? "md:grid-flow-col md:auto-cols-fr" : "grid-flow-row", className)} {...props} />
}

function ResizablePanel({ defaultSize, className, style, ...props }: ResizablePanelProps) {
  return <div data-slot="resizable-panel" className={cn("min-h-24 resize overflow-auto rounded-lg border bg-card p-3", className)} style={{ flexBasis: defaultSize, ...style }} {...props} />
}

function ResizableHandle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="resizable-handle" className={cn("hidden w-px bg-border md:block", className)} {...props} />
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
