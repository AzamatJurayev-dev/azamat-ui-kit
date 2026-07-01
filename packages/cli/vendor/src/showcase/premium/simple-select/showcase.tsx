import { useState } from "react"

import { SimpleSelect } from "@/index"

import type { ComponentDemoProps } from "../types"

export function SimpleSelectShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = useState<string | undefined>("private")
  const [uncontrolledKey, setUncontrolledKey] = useState(0)
  const options = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
    { value: "internal", label: "Internal" },
    { value: "archived", label: "Archived", disabled: true },
  ]

  return (
    <div className="space-y-4">
      <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
        <p className="text-sm font-medium aui-text-strong">SimpleSelect is the lightweight static member</p>
        <p className="mt-2 text-sm leading-6 aui-text-muted">
          Use it only when you want a thinner wrapper around the main Select surface for static option lists.
        </p>
      </div>
      <SimpleSelect
        value={value}
        onValueChange={(nextValue) => setValue(nextValue)}
        options={options}
        placeholder="Visibility"
      />
      <button
        type="button"
        className="aui-text-subtle text-sm hover:underline"
        onClick={() => setValue(undefined)}
      >
        Clear selection
      </button>
      <SimpleSelect key={uncontrolledKey} defaultValue="public" options={options} />
      <button
        type="button"
        className="aui-text-subtle text-sm hover:underline"
        onClick={() => setUncontrolledKey((prev) => prev + 1)}
      >
        Reset uncontrolled sample
      </button>
      {mode === "playground" ? (
        <p className="aui-text-muted rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm">
          Controlled selection can power filter states, while uncontrolled default usage is fine for one-off static forms. If the list becomes remote, move back to the Select family and choose AsyncSelect.
        </p>
      ) : null}
    </div>
  )
}
