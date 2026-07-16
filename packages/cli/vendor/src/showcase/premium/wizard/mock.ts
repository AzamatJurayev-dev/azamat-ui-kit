import type { ComponentDemoMock } from "../types"

export const wizardMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { Wizard } from "tembro"

const steps = [
  { id: "profile", title: "Profile", description: "Basic account" },
  { id: "team", title: "Team", description: "Invite members" },
  { id: "finish", title: "Finish", description: "Review setup" },
]

export function Example() {
  const [step, setStep] = React.useState("profile")

  return (
    <Wizard
      steps={steps}
      currentStep={step}
      onStepChange={setStep}
      onNext={() => setStep(step === "profile" ? "team" : "finish")}
      onPrevious={() => setStep(step === "finish" ? "team" : "profile")}
      onFinish={() => console.log("complete")}
    >
      <div>Current step: {step}</div>
    </Wizard>
  )
}`,
  cliCommand: "npx tembro add wizard",
  highlights: ["Stepper and footer controls in one workflow", "Controlled current step", "Clickable step navigation", "Custom content slots"],
  scenarios: [
    { title: "Onboarding", description: "Guide users through profile, team and confirmation screens." },
    { title: "Multi-step forms", description: "Keep form sections small while preserving progress context." },
    { title: "Setup flows", description: "Review final state before enabling the submit action." },
  ],
  capabilityNotes: [
    "Keep currentStep controlled so route or form state can persist.",
    "Disable future steps when the user must complete validation first.",
    "Keep the footer action labels specific to the workflow.",
  ],
}
