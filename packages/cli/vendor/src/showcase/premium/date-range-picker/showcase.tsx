import { useState } from "react"

import { DateRangePicker } from "@/index"

import type { ComponentDemoProps } from "../types"

export function DateRangePickerShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = useState({ from: "2026-06-01", to: "2026-06-07" })

  return (
    <div className="space-y-4">
      <DateRangePicker
        value={value}
        onValueChange={(nextValue: { from?: string | null; to?: string | null }) => setValue({ from: nextValue.from ?? "", to: nextValue.to ?? "" })}
        min="2026-06-01"
        max="2026-12-31"
        disabledDates={["2026-06-21", "2026-06-22"]}
        closeOnPresetSelect
        presets={[
          { label: "This week", value: { from: "2026-06-01", to: "2026-06-07" } },
          { label: "Next 14 days", value: { from: "2026-06-08", to: "2026-06-20" } },
          { label: "Q3", value: { from: "2026-07-01", to: "2026-09-30" } },
        ]}
        labels={{ placeholder: "Choose reporting range", apply: "Apply range", clear: "Clear", start: "Start", end: "End" }}
      />
      <p className="aui-text-subtle text-sm">Range: {value.from} → {value.to}</p>
      <p className="aui-text-muted text-sm">Mode: {mode}</p>
    </div>
  )
}

