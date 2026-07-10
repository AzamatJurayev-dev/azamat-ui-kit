"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type TourStep = {
  title: React.ReactNode
  description?: React.ReactNode
}

export type TourProps = React.ComponentProps<"div"> & {
  steps: TourStep[]
  onFinish?: () => void
  onClose?: () => void
  doneLabel?: string
  closeLabel?: string
}

function Tour({
  steps,
  onFinish,
  onClose,
  doneLabel = "Done",
  closeLabel = "Close",
  className,
  ...props
}: TourProps) {
  const activeStep = steps[0]

  return (
    <div
      {...props}
      data-slot="tour"
      className={cn(
        "rounded-[var(--aui-card-radius,var(--radius-lg))] border border-[color:var(--aui-card-border,var(--border))] bg-[color:var(--aui-card,var(--background))] p-4 text-sm text-foreground shadow-[var(--aui-card-shadow,0_12px_32px_rgba(15,23,42,0.08))]",
        className
      )}
    >
      <div className="space-y-2">
        <div className="text-base font-semibold">{activeStep?.title ?? "Tour"}</div>
        {activeStep?.description ? <p className="text-muted-foreground">{activeStep.description}</p> : null}
      </div>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            onClose?.()
          }}
        >
          {closeLabel}
        </Button>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            onFinish?.()
            onClose?.()
          }}
        >
          {doneLabel}
        </Button>
      </div>
    </div>
  )
}

export { Tour }
