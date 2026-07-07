import * as React from "react"

import { Badge, Rating } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function RatingShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = React.useState(4)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Feedback input</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Rating should capture quick sentiment without turning into a full form</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This control is best when people need a fast qualitative score and should not be distracted by extra layout or wrapper UI.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Quick score</Badge>
            <Badge variant="outline" className="rounded-full">Clearable</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <Rating
          value={value}
          onValueChange={setValue}
          labels={{ rate: (score) => `Rate ${score}`, clear: "Reset score" }}
        />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Current score</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{value || "No score"}</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Typical usage</p>
          <p className="mt-3 text-sm leading-6 aui-text-muted">
            Good for support resolution, QA confidence, compact reviews, and places where a full textarea would slow the task down.
          </p>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">Yulduzlar ustiga olib borib hover holatini va shu scorega yana bosib clear bo‘lishini sinab ko‘ring.</p>
        </section>
      ) : null}
    </div>
  )
}
