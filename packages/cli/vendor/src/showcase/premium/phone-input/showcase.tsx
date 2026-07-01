import { useState } from "react"

import { PhoneInput } from "@/index"

import type { ComponentDemoProps } from "../types"

export function PhoneInputShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = useState("+998 90 123 45 67")

  return (
    <div className="space-y-4">
      <PhoneInput
        value={value}
        onValueChange={(maskedValue) => setValue(maskedValue)}
        countryCode="+998"
        placeholder="+998 90 123 45 67"
      />
      <p className="aui-text-strong text-sm">Canonical value: {value || "—"}</p>
      <p className="aui-text-muted text-sm">Display format is formatted for UX; raw value strategy is app-specific.</p>
      <p className="aui-text-muted text-sm">Mode: {mode}</p>
    </div>
  )
}



