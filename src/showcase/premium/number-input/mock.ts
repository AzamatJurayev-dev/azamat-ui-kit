import type { ComponentDemoMock } from "../types"

export const numberInputMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { Input } from "tembro"

export function Example() {
  const [value, setValue] = useState<number | null>(14)
  const [raw, setRaw] = useState("14")

  return (
    <div className="space-y-3">
      <Input
        kind="number"
        value={value}
        onNumberChange={(nextValue) => {
          setValue(nextValue)
          setRaw(String(nextValue ?? ""))
        }}
        onChange={(event) => setRaw(event.target.value)}
        min={0}
        max={100}
        step={5}
        allowEmpty
      />
      <p className="text-sm aui-text-subtle">
        Parsed numeric: <strong>{value === null ? "unset" : value}</strong>
      </p>
      <p className="text-sm aui-text-muted">Raw text: {raw}</p>
      <p className="text-sm aui-text-muted">
        Try entering invalid chars to see how parse and clamp rules apply.
      </p>
    </div>
  )
}`,
  htmlCode: `<label for="example-number">Amount</label><input id="example-number" inputmode="decimal" type="text" />`,
  cliCommand: "npx tembro add input",
  highlights: ["Numeric parsing", "Min/max constraints", "Decimal steps", "allowEmpty fallback"],
  relatedBlockSlugs: ["settings-form", "users-table", "crm-dashboard"],
  scenarios: [
    { title: "Budget field", description: "Keep values inside business bounds while editing quickly." },
    { title: "Invalid input", description: "Use parser path to avoid NaN leaks into form data." },
    { title: "Stepper steps", description: "Use step values that match your business precision." },
    { title: "Uncontrolled mode", description: "Use defaultValue and HTML value when rapid typing is enough." },
  ],
  capabilityNotes: [
    "The component supports controlled numeric state and keeps string display behavior under user editing.",
    "Use `min`/`max` with `clamp` semantics when downstream systems expect bounded values.",
    "`allowEmpty` helps avoid forced 0 when field is cleared temporarily.",
    "Prefer controlled usage in forms that need instant validation and submit-time serialization.",
  ],
}
