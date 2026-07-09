import { useState } from "react"

import { Input } from "@/index"

import type { ComponentDemoProps } from "../types"

export function DateRangeInputShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = useState({ from: "2026-06-01", to: "2026-06-30" })

  return (
    <div className="space-y-4">
      <Input
        kind="date-range"
        value={value}
        onValueChange={(nextValue: { from?: string | null; to?: string | null }) => setValue({ from: nextValue.from ?? "", to: nextValue.to ?? "" })}
        fromInputProps={{ min: "2026-06-01" }}
        toInputProps={{ max: "2026-12-31" }}
      />
      <p className="aui-text-subtle text-sm">Range: {value.from} → {value.to}</p>
      <p className="aui-text-muted text-sm">Mode: {mode}</p>
    </div>
  )
}

