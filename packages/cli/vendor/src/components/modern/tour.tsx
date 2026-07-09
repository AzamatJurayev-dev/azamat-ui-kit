"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type TourStep = {
  title: React.ReactNode
  description?: React.ReactNode
  target?: string
}

export type TourProps = React.ComponentProps<"div"> & {
  steps: TourStep[]
  index?: number
  onIndexChange?: (index: number) => void
  onClose?: () => void
  onSkip?: () => void
  onFinish?: () => void
  placement?: "top" | "right" | "bottom" | "left"
}

function Tour({ steps, index = 0, onIndexChange, onClose, onSkip, onFinish, placement = "bottom", className, ...props }: TourProps) {
  const step = steps[index]
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  React.useEffect(() => {
    containerRef.current?.focus()
  }, [index])

  if (!step) return null

  return (
    <div
      ref={containerRef}
      data-slot="tour"
      data-placement={placement}
      tabIndex={-1}
      className={cn("rounded-xl border bg-popover p-4 text-popover-foreground shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-ring/40", className)}
      {...props}
    >
      <div className="grid gap-2">
        <div className="font-semibold">{step.title}</div>
        {step.description && <div className="text-sm text-muted-foreground">{step.description}</div>}
        {step.target && <div className="text-xs text-muted-foreground">{step.target}</div>}
        <div className="flex items-center justify-between gap-3 pt-2">
          <span className="text-xs text-muted-foreground">{index + 1} / {steps.length}</span>
          <div className="flex gap-2">
            <button type="button" className="rounded-md border px-2.5 py-1 text-sm" onClick={() => { onSkip?.(); onClose?.() }}>Skip</button>
            <button type="button" className="rounded-md border px-2.5 py-1 text-sm" disabled={index === 0} onClick={() => onIndexChange?.(index - 1)}>Back</button>
            {index < steps.length - 1 ? (
              <button type="button" className="rounded-md bg-primary px-2.5 py-1 text-sm text-primary-foreground" onClick={() => onIndexChange?.(index + 1)}>Next</button>
            ) : (
              <button type="button" className="rounded-md bg-primary px-2.5 py-1 text-sm text-primary-foreground" onClick={() => { onFinish?.(); onClose?.() }}>Done</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export { Tour }
