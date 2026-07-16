import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Stepper } from "@/components/wizard/stepper"
import { Wizard } from "@/components/wizard/wizard"
import { wizardSteps } from "@/showcase/data/registry"

export function WizardSection() {
  const [step, setStep] = useState("test")

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[1fr_0.8fr]">
      <Card>
        <CardHeader>
          <CardTitle>Stepper</CardTitle>
          <CardDescription>Horizontal and clickable stepper.</CardDescription>
        </CardHeader>
        <CardContent>
          <Stepper steps={wizardSteps} currentStep={step} onStepChange={setStep} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Wizard</CardTitle>
          <CardDescription>Wizard footer, previous/next and content slot.</CardDescription>
        </CardHeader>
        <CardContent>
          <Wizard
            steps={wizardSteps}
            currentStep={step}
            onStepChange={setStep}
            onPrevious={() => setStep("add")}
            onNext={() => setStep("test")}
            onFinish={() => setStep("test")}
          >
            <div className="rounded-lg border bg-muted/25 p-4 text-sm">
              Current step: <span className="font-semibold">{step}</span>
            </div>
          </Wizard>
        </CardContent>
      </Card>
    </div>
  )
}
