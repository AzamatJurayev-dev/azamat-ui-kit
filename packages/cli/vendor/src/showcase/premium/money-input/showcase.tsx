import { useState } from "react"

import { MoneyInput } from "@/index"

export function MoneyInputShowcase() {
  const [value, setValue] = useState<number | null>(125.75)

  return (
    <div className="space-y-3">
      <MoneyInput
        value={value}
        onValueChange={(nextValue: number | null) => setValue(nextValue)}
        prefix="$"
      />
      <p className="aui-text-subtle text-sm">
        Parsed amount: {value === null ? "invalid" : `$${value.toFixed(2)}`}
      </p>
    </div>
  )
}
