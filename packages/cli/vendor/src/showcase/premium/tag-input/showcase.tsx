import * as React from "react"

import { Badge, TagInput } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function TagInputShowcase({ mode }: ComponentDemoProps) {
  const [tags, setTags] = React.useState(["billing", "priority"])

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Token input</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">TagInput should make multi-label entry feel lightweight</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Good tag UX means adding, removing, and reviewing short labels without dragging the user into a full form builder.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Multi value</Badge>
            <Badge variant="outline" className="rounded-full">Keyboard friendly</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <TagInput value={tags} onValueChange={setTags} maxTags={5} />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Current tags</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{tags.join(", ") || "No tags"}</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Usage note</p>
          <p className="mt-3 text-sm leading-6 aui-text-muted">
            Bu component label, quick filter va qisqa metadata tokenlari uchun kuchli. Uzun structured input uchun emas.
          </p>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">`Enter` yoki `,` bilan tag qo‘shing. Input bo‘sh bo‘lsa `Backspace` oxirgi tagni o‘chiradi.</p>
        </section>
      ) : null}
    </div>
  )
}
