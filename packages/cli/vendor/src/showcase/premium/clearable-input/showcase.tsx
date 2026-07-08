import * as React from "react"

import { Badge, Input } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function ClearableInputShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = React.useState("workspace token")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Utility input</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">ClearableInput should remove friction from repetitive short entry</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This control exists for fields people revise often. Clear has to feel instant and keep focus where the user already is.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Escape clear</Badge>
            <Badge variant="outline" className="rounded-full">Focus restore</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <Input
          value={value}
          onValueChange={setValue}
          placeholder="Filter or paste value..."
          clearable
          clearOnEscape
          trailingAction={<span className="text-xs aui-text-muted">Live filter</span>}
          replaceTrailingWhenClear={false}
        />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Current value</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{value || "Empty"}</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Usage note</p>
          <p className="mt-3 text-sm leading-6 aui-text-muted">
            Good for toolbar filters, small token fields, and any place users repeatedly enter and clear short text.
          </p>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">`Escape` bosib ham clear bo‘lishini sinab ko‘ring.</p>
        </section>
      ) : null}
    </div>
  )
}
