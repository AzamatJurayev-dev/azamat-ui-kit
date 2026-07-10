import { useState } from "react"

import { Input } from "@/index"

export function NumberInputShowcase() {
  const [value, setValue] = useState<number | null>(12)

  return (
    <div className="space-y-3">
      <Input kind="number" value={value} onNumberChange={setValue} min={0} max={30} step={1} />
      <p className="aui-text-subtle text-sm">Current value: {value ?? "unset"}</p>
    </div>
  )
}
