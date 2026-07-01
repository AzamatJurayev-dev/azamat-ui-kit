import { useState } from "react"

import { DatePicker } from "@/index"

import type { ComponentDemoProps } from "../types"

export function DatePickerShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = useState("2026-06-19")

  return (
    <div className="space-y-4">
      <DatePicker
        value={value}
        onValueChange={setValue}
        min="2026-06-01"
        max="2026-12-31"
        disabledDates={["2026-06-21"]}
      />
      <p className="aui-text-subtle text-sm">Selected: {value || "—"}</p>
      <p className="aui-text-muted text-sm">Mode: {mode}</p>
    </div>
  )
}

