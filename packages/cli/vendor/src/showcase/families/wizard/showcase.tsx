import { Button } from "@/index"

import type { FamilyDemoProps } from "../types"

const steps = ["Workspace", "Brand", "Members", "Publish"]

export function WizardFamilyShowcase({ state, setState }: FamilyDemoProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((label, index) => {
          const stepNumber = index + 1
          const active = state.step === stepNumber
          const complete = state.step > stepNumber
          return (
            <button
              key={label}
              onClick={() => setState({ step: stepNumber })}
              className={`rounded-[22px] border px-4 py-4 text-left ${active ? "aui-surface-strong border-[color:var(--aui-surface-strong)]" : complete ? "aui-status-success" : "border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] aui-text-muted"}`}
            >
              <div className="text-xs uppercase tracking-[0.24em]">{`Step ${stepNumber}`}</div>
              <div className="mt-2 text-lg font-semibold">{label}</div>
            </button>
          )
        })}
      </div>
      <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-5">
        <p className="text-2xl font-semibold tracking-tight">{steps[state.step - 1]} step</p>
        <p className="aui-text-muted mt-2 text-sm leading-6">A multi-step guided workflow with a stable route and predictable step flow.</p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" onClick={() => setState({ step: Math.max(1, state.step - 1) })}>Back</Button>
          <Button onClick={() => setState({ step: Math.min(4, state.step + 1) })}>Next</Button>
        </div>
      </div>
    </div>
  )
}


