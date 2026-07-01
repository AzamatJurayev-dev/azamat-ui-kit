import { useState } from "react"

import { MaskedInput } from "@/index"

import type { ComponentDemoProps } from "../types"

export function MaskedInputShowcase({ mode }: ComponentDemoProps) {
  const [value, setValue] = useState("AA-123")

  return (
    <div className="space-y-4">
      <MaskedInput
        value={value}
        onValueChange={(nextValue: string) => setValue(nextValue)}
        mask={(raw: string) => raw.toUpperCase().slice(0, 6).replace(/(.{3})(?=.)/, "$1-")}
        placeholder="AA-123"
      />
      <p className="aui-text-subtle text-sm">Display value: {value || "—"}</p>
      <p className="aui-text-muted text-sm">Task focus: fixed-format field where raw/display value assumptions should be documented.</p>
      <p className="aui-text-muted text-sm">Mode: {mode}</p>
    </div>
  )
}

