"use client"

import * as React from "react"
import { GripVerticalIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type ResizablePanelGroupProps = React.ComponentProps<"div"> & {
  direction?: "horizontal" | "vertical"
}

export type ResizablePanelProps = React.ComponentProps<"div"> & {
  defaultSize?: number | string
  minSize?: number
}

type ResizablePanelInternalProps = ResizablePanelProps & {
  "data-panel-index"?: number
}

type ResizableHandleProps = React.ComponentProps<"button"> & {
  "data-handle-index"?: number
}

type ResizablePanelContextValue = {
  direction: "horizontal" | "vertical"
  getSize: (index: number) => number
  resizePanels: (index: number, deltaPx: number) => void
}

const ResizablePanelContext = React.createContext<ResizablePanelContextValue | null>(null)

function normalizeSizeValue(value: number | string | undefined) {
  if (typeof value === "number") return value
  if (typeof value === "string") {
    const parsed = Number.parseFloat(value.replace("%", ""))
    return Number.isFinite(parsed) ? parsed : undefined
  }
  return undefined
}

function ResizablePanelGroup({ direction = "horizontal", className, children, ...props }: ResizablePanelGroupProps) {
  const groupRef = React.useRef<HTMLDivElement>(null)
  const panelNodes = React.Children.toArray(children).filter((child) => React.isValidElement(child) && (child.type === ResizablePanel || (child as React.ReactElement<any>).props["data-slot"] === "resizable-panel" || (child.type && (child.type as any).name === "ResizablePanel")))
  const panelCount = panelNodes.length
  const initialSizes = React.useMemo(() => {
    const declaredSizes = panelNodes.map((child) => normalizeSizeValue((child as React.ReactElement<ResizablePanelProps>).props.defaultSize))
    const declaredTotal = declaredSizes.reduce<number>((sum, value) => sum + (value ?? 0), 0)
    const unresolvedCount = declaredSizes.filter((value) => value === undefined).length
    const remaining = Math.max(100 - declaredTotal, 0)
    const fallbackSize = unresolvedCount > 0 ? remaining / unresolvedCount : panelCount > 0 ? 100 / panelCount : 100

    return declaredSizes.map((value) => value ?? fallbackSize)
  }, [panelCount, panelNodes])
  const minSizes = React.useMemo(
    () => panelNodes.map((child) => (child as React.ReactElement<ResizablePanelProps>).props.minSize ?? 15),
    [panelNodes]
  )
  const [sizes, setSizes] = React.useState(initialSizes)

  React.useEffect(() => {
    setSizes(initialSizes)
  }, [initialSizes])

  const resizePanels = React.useCallback(
    (index: number, deltaPx: number) => {
      const node = groupRef.current
      if (!node || index < 0 || index >= panelCount - 1) return

      const basis = direction === "horizontal" ? node.getBoundingClientRect().width : node.getBoundingClientRect().height
      if (!basis) return

      const deltaPercent = (deltaPx / basis) * 100

      setSizes((currentSizes) => {
        const nextSizes = [...currentSizes]
        const previousSize = nextSizes[index] ?? 0
        const followingSize = nextSizes[index + 1] ?? 0
        const minPrevious = minSizes[index] ?? 15
        const minFollowing = minSizes[index + 1] ?? 15

        const requestedPrevious = previousSize + deltaPercent
        const clampedPrevious = Math.min(Math.max(requestedPrevious, minPrevious), previousSize + followingSize - minFollowing)
        const consumedDelta = clampedPrevious - previousSize

        nextSizes[index] = clampedPrevious
        nextSizes[index + 1] = followingSize - consumedDelta

        return nextSizes
      })
    },
    [direction, minSizes, panelCount]
  )

  let panelIndexCounter = 0
  let handleIndexCounter = 0

  const processedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child

    if (child.type === ResizablePanel || (child as React.ReactElement<any>).props["data-slot"] === "resizable-panel" || (child.type && (child.type as any).name === "ResizablePanel")) {
      return React.cloneElement(child as React.ReactElement<ResizablePanelInternalProps>, { "data-panel-index": panelIndexCounter++ })
    }

    if (child.type === ResizableHandle || (child as React.ReactElement<any>).props["data-slot"] === "resizable-handle" || (child.type && (child.type as any).name === "ResizableHandle")) {
      return React.cloneElement(child as React.ReactElement<ResizableHandleProps>, { "data-handle-index": handleIndexCounter++ })
    }

    return child
  })

  return (
    <ResizablePanelContext.Provider
      value={{
        direction,
        getSize: (index) => sizes[index] ?? 100 / Math.max(panelCount, 1),
        resizePanels,
      }}
    >
      <div
        ref={groupRef}
        data-slot="resizable-panel-group"
        data-direction={direction}
        className={cn("flex", direction === "horizontal" ? "flex-row items-stretch" : "flex-col", className)}
        {...props}
      >
        {processedChildren}
      </div>
    </ResizablePanelContext.Provider>
  )
}

function ResizablePanel({ className, style, defaultSize, minSize: _minSize, ...props }: ResizablePanelInternalProps) {
  const context = React.useContext(ResizablePanelContext)
  const panelIndex = Number(props["data-panel-index"] ?? 0)
  const basis = context ? context.getSize(panelIndex) : normalizeSizeValue(defaultSize) ?? 100

  return (
    <div
      data-slot="resizable-panel"
      className={cn("min-h-24 min-w-0 overflow-auto rounded-[var(--aui-card-radius,var(--radius-lg))] border border-[color:var(--aui-card-border,var(--border))] bg-card p-3 shadow-[var(--aui-card-shadow,0_10px_24px_rgba(15,23,42,0.07))]", className)}
      style={{ flexBasis: `${basis}%`, flexGrow: 0, flexShrink: 0, ...style }}
      {...props}
    />
  )
}

function ResizableHandle({ className, ...props }: ResizableHandleProps) {
  const context = React.useContext(ResizablePanelContext)
  const handleIndex = Number(props["data-handle-index"] ?? 0)
  const pointerStateRef = React.useRef<{ pointerId: number; axis: number } | null>(null)

  return (
    <button
      type="button"
      data-slot="resizable-handle"
      aria-label="Resize panels"
      aria-orientation={context?.direction ?? "horizontal"}
      className={cn(
        "group relative flex shrink-0 items-center justify-center text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring",
        context?.direction === "horizontal" ? "w-4 cursor-col-resize px-1" : "h-4 cursor-row-resize py-1",
        className
      )}
      onPointerDown={(event) => {
        if (!context) return
        pointerStateRef.current = {
          pointerId: event.pointerId,
          axis: context.direction === "horizontal" ? event.clientX : event.clientY,
        }
        event.currentTarget.setPointerCapture(event.pointerId)
      }}
      onPointerMove={(event) => {
        if (!context || !pointerStateRef.current || pointerStateRef.current.pointerId !== event.pointerId) return
        const currentAxis = context.direction === "horizontal" ? event.clientX : event.clientY
        const delta = currentAxis - pointerStateRef.current.axis
        if (delta === 0) return
        pointerStateRef.current.axis = currentAxis
        context.resizePanels(handleIndex, delta)
      }}
      onPointerUp={(event) => {
        if (pointerStateRef.current?.pointerId === event.pointerId) pointerStateRef.current = null
      }}
      onPointerCancel={() => {
        pointerStateRef.current = null
      }}
      onKeyDown={(event) => {
        if (!context) return
        const step = event.shiftKey ? 24 : 12
        if (context.direction === "horizontal" && event.key === "ArrowLeft") {
          event.preventDefault()
          context.resizePanels(handleIndex, -step)
        }
        if (context.direction === "horizontal" && event.key === "ArrowRight") {
          event.preventDefault()
          context.resizePanels(handleIndex, step)
        }
        if (context.direction === "vertical" && event.key === "ArrowUp") {
          event.preventDefault()
          context.resizePanels(handleIndex, -step)
        }
        if (context.direction === "vertical" && event.key === "ArrowDown") {
          event.preventDefault()
          context.resizePanels(handleIndex, step)
        }
      }}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute rounded-full bg-border transition-colors group-hover:bg-ring/55",
          context?.direction === "horizontal" ? "inset-y-2 left-1/2 w-px -translate-x-1/2" : "inset-x-2 top-1/2 h-px -translate-y-1/2"
        )}
      />
      <span className="relative grid size-5 place-items-center rounded-full border border-border/75 bg-background shadow-sm transition-colors group-hover:border-ring/45">
        <GripVerticalIcon className={cn("size-3", context?.direction === "vertical" && "rotate-90")} />
      </span>
    </button>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }
