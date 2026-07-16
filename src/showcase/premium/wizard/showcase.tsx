import * as React from "react"

import { Badge, Button, Wizard } from "@/index"

const steps = [
  { id: "profile", title: "Profile", description: "Basic account" },
  { id: "team", title: "Team", description: "Invite members" },
  { id: "finish", title: "Finish", description: "Review setup" },
]

const contentByStep: Record<string, { title: string; description: string; checks: string[] }> = {
  profile: {
    title: "Workspace profile",
    description: "Collect the public name, default role and workspace context before moving forward.",
    checks: ["Name added", "Default role selected", "Timezone confirmed"],
  },
  team: {
    title: "Invite the team",
    description: "Add collaborators and decide who can manage billing, releases and support queues.",
    checks: ["Owner invited", "Support role ready", "Billing access limited"],
  },
  finish: {
    title: "Review and launch",
    description: "Confirm the setup summary and finish only when required details are complete.",
    checks: ["Profile verified", "Team access reviewed", "Launch checklist complete"],
  },
}

export function WizardShowcase() {
  const [currentStep, setCurrentStep] = React.useState("profile")
  const [finished, setFinished] = React.useState(false)
  const currentIndex = Math.max(steps.findIndex((step) => step.id === currentStep), 0)
  const content = contentByStep[currentStep] ?? contentByStep.profile

  return (
    <div className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Guided workflow</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight aui-text-strong">Wizard with controlled progress</h3>
        </div>
        <Badge variant={finished ? "soft" : "outline"}>{finished ? "Finished" : `Step ${currentIndex + 1} of ${steps.length}`}</Badge>
      </div>

      <Wizard
        steps={steps.map((step, index) => ({ ...step, completed: index < currentIndex }))}
        currentStep={currentStep}
        onStepChange={(stepId) => {
          setCurrentStep(stepId)
          setFinished(false)
        }}
        onNext={() => {
          const next = steps[Math.min(currentIndex + 1, steps.length - 1)]
          setCurrentStep(next.id)
          setFinished(false)
        }}
        onPrevious={() => {
          const previous = steps[Math.max(currentIndex - 1, 0)]
          setCurrentStep(previous.id)
          setFinished(false)
        }}
        onFinish={() => setFinished(true)}
        finishLabel="Launch"
      >
        <section className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
          <h4 className="text-lg font-semibold aui-text-strong">{content.title}</h4>
          <p className="mt-2 text-sm leading-6 aui-text-muted">{content.description}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {content.checks.map((check) => (
              <div key={check} className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] px-3 py-2 text-sm aui-text-muted">
                {check}
              </div>
            ))}
          </div>
        </section>
      </Wizard>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" onClick={() => { setCurrentStep("profile"); setFinished(false) }}>
          Reset flow
        </Button>
        <Button size="sm" variant="outline" onClick={() => setCurrentStep("finish")}>
          Jump to review
        </Button>
      </div>
    </div>
  )
}
