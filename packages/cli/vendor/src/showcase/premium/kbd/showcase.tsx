import * as React from "react"

import { Badge, Button, Kbd } from "@/index"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const variants = ["default", "outline", "ghost"] as const

export function KbdShowcase() {
  const [variant, setVariant] = React.useState<(typeof variants)[number]>("default")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Keyboard hints</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Kbd should make shortcuts readable at a glance</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Keep shortcut tokens compact and subordinate to the action they describe.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Inline token</Badge>
            <Badge variant="outline" className="rounded-full">Variants</Badge>
            <Badge variant="outline" className="rounded-full">Command hint</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_1fr]">
          <div className={`${panelClass} space-y-4`}>
            <p className="text-sm font-medium aui-text-muted">Command pattern</p>
            <p className="aui-text-strong text-sm">Press <Kbd variant={variant}>Ctrl</Kbd> + <Kbd variant={variant}>K</Kbd> to open global search.</p>
            <p className="aui-text-strong text-sm">Press <Kbd variant={variant}>G</Kbd> then <Kbd variant={variant}>C</Kbd> to jump to components.</p>
          </div>
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Current variant</p>
            <p className="mt-3 text-lg font-semibold aui-text-strong">{variant}</p>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">Active variant: {variant}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {variants.map((entry) => (
              <Button key={entry} type="button" size="sm" variant={variant === entry ? "default" : "secondary"} onClick={() => setVariant(entry)}>
                {entry}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
