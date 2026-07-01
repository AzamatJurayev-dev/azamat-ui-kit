import { useState } from "react"

import { QuantityInput } from "@/index"

export function QuantityInputShowcase() {
  const [value, setValue] = useState<number | null>(2)

  return (
    <div className="space-y-3">
      <QuantityInput
        value={value}
        onValueChange={setValue}
        min={0}
        max={12}
        showControls
      />
      <p className="aui-text-subtle text-sm">Quantity: {value ?? "unset"}</p>
    </div>
  )
}
