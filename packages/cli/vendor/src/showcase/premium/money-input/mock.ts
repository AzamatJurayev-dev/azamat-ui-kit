import type { ComponentDemoMock } from "../types"

export const moneyInputMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { MoneyInput } from "@/index"

export function Example() {
  const [value, setValue] = useState<number | null>(2990.5)
  const [raw, setRaw] = useState("$2,990.50")

  return (
    <div className="space-y-3">
      <MoneyInput
        value={value}
        onValueChange={(nextValue, rawValue) => {
          setValue(nextValue)
          setRaw(rawValue)
        }}
        prefix="$"
        inputMode="decimal"
        step={0.5}
      />
      <p className="text-sm aui-text-subtle">
        Numeric value: <strong>{value === null ? "invalid" : value}</strong>
      </p>
      <p className="text-sm aui-text-muted">Raw input: {raw}</p>
      <p className="text-sm aui-text-muted">Use inputMode to match expected currency input source.</p>
    </div>
  )
}`,
  htmlCode: '<label for="money">Budget</label><div>$<input id="money" inputmode="decimal" type="text" /></div>',
  cliCommand: "npx azix add money-input",
  highlights: ["Currency prefix/suffix", "Numeric payload", "Invalid text handling", "Custom keyboard mode"],
  relatedBlockSlugs: ["settings-form", "users-table", "crm-dashboard"],
  scenarios: [
    { title: "Pricing", description: "Capture billing amounts with stable parsing and formatting behavior." },
    { title: "Raw display vs parsed value", description: "Keep display string separate from numeric payload." },
    { title: "Invalid input", description: "Handle temporary invalid values while editing before form submit." },
    { title: "Negative guard", description: "Prevent or allow negatives based on financial rules." },
  ],
  capabilityNotes: [
    "Use `onValueChange` for canonical numeric value and raw typed value.",
    "Pair `MoneyInput` with schema validation to reject negative or extreme values.",
    "Use prefix/suffix that matches locale and accounting conventions.",
    "In multi-currency systems, normalize and convert right after parsing.",
  ],
}
