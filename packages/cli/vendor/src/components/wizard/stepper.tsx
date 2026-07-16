import * as React from "react"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type StepperStep = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
  completed?: boolean
}

export type StepperProps = React.ComponentProps<"div"> & {
  steps: StepperStep[]
  currentStep: string
  onStepChange?: (stepId: string) => void
  orientation?: "horizontal" | "vertical"
}

function Stepper({ className, steps, currentStep, onStepChange, orientation = "horizontal", ...props }: StepperProps) {
  const currentIndex = Math.max(steps.findIndex((step) => step.id === currentStep), 0)

  return (
    <div data-slot="stepper" data-orientation={orientation} className={cn(orientation === "vertical" ? "grid gap-3" : "flex flex-wrap items-start gap-3", className)} {...props}>
      {steps.map((step, index) => {
        const isActive = step.id === currentStep
        const isComplete = step.completed ?? index < currentIndex
        const isClickable = Boolean(onStepChange) && !step.disabled

        return (
          <button
            key={step.id}
            type="button"
            disabled={!isClickable}
            className={cn("flex min-w-0 items-start gap-2 text-left disabled:cursor-default", orientation === "horizontal" && "min-w-36 flex-1")}
            onClick={() => onStepChange?.(step.id)}
          >
            <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full border text-xs font-medium", isActive && "border-primary bg-primary text-primary-foreground", isComplete && !isActive && "border-primary bg-primary/10 text-primary")}>
              {isComplete && !isActive ? <CheckIcon className="size-4" /> : index + 1}
            </span>
            <span className="grid min-w-0 max-w-full gap-0.5">
              <span className={cn("max-w-full break-words text-sm font-medium leading-snug", isActive ? "text-foreground" : "text-muted-foreground")}>{step.title}</span>
              {step.description && <span className="max-w-full break-words text-xs leading-snug text-muted-foreground">{step.description}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export { Stepper }
