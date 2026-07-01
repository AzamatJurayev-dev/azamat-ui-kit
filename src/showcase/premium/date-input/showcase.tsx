import { useState } from "react"

import { DateInput } from "@/index"

import type { ComponentDemoProps } from "../types"

export function DateInputShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = useState("2026-06-19")

  return (
    <div className="space-y-4">
      <DateInput
        value={value}
        onValueChange={(nextValue: string) => setValue(nextValue)}
        min="2026-06-01"
        max="2026-12-31"
      />
      <p className="aui-text-subtle text-sm">Value: {value || "—"}</p>
      <p className="aui-text-muted text-sm">Mode: {mode}</p>
    </div>
  )
}

