import * as React from "react"

import { Badge, Button, RadioGroup } from "@/index"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const planOptions = [
  { value: "starter", label: "Starter", description: "Good for single workspace setup." },
  { value: "growth", label: "Growth", description: "Adds more seats and team workflows." },
  { value: "enterprise", label: "Enterprise", description: "Advanced controls and support." },
] as const

export function RadioGroupShowcase() {
  const [value, setValue] = React.useState("growth")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Single choice</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Radio group should make one active choice obvious</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Keep all options visible when users should compare them before selecting one final answer.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Visible choices</Badge>
            <Badge variant="outline" className="rounded-full">Single answer</Badge>
            <Badge variant="outline" className="rounded-full">Controlled</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Workspace plan</p>
            <div className="mt-3">
              <RadioGroup value={value} onValueChange={setValue} options={planOptions.map((option) => ({ ...option }))} />
            </div>
          </div>
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Selection summary</p>
            <p className="mt-3 text-lg font-semibold aui-text-strong">{planOptions.find((option) => option.value === value)?.label}</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">{planOptions.find((option) => option.value === value)?.description}</p>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">Current plan: {value}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {planOptions.map((option) => (
              <Button key={option.value} type="button" size="sm" variant={value === option.value ? "default" : "secondary"} onClick={() => setValue(option.value)}>
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
