import * as React from "react"

import { Button } from "@/components/ui/button"
import { Stepper, type StepperStep } from "@/components/wizard/stepper"
import { cn } from "@/lib/utils"

export type WizardProps = React.ComponentProps<"div"> & {
  steps: StepperStep[]
  currentStep: string
  onStepChange?: (stepId: string) => void
  onNext?: () => void
  onPrevious?: () => void
  onFinish?: () => void
  nextLabel?: React.ReactNode
  previousLabel?: React.ReactNode
  finishLabel?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
}

function Wizard({
  className,
  steps,
  currentStep,
  onStepChange,
  onNext,
  onPrevious,
  onFinish,
  nextLabel = "Next",
  previousLabel = "Previous",
  finishLabel = "Finish",
  children,
  footer,
  ...props
}: WizardProps) {
  const currentIndex = Math.max(steps.findIndex((step) => step.id === currentStep), 0)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === steps.length - 1

  return (
    <div data-slot="wizard" className={cn("grid gap-6", className)} {...props}>
      <Stepper steps={steps} currentStep={currentStep} onStepChange={onStepChange} />
      <div data-slot="wizard-content" className="min-w-0">
        {children}
      </div>
      {footer ?? (
        <div data-slot="wizard-footer" className="flex items-center justify-between gap-2 border-t pt-4">
          <Button type="button" variant="outline" disabled={isFirst} onClick={onPrevious}>
            {previousLabel}
          </Button>
          <Button type="button" onClick={isLast ? onFinish : onNext}>
            {isLast ? finishLabel : nextLabel}
          </Button>
        </div>
      )}
    </div>
  )
}

export { Wizard }
