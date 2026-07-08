import type { ComponentDemoMock } from "../types"

export const quantityInputMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { QuantityInput } from "@/index"

export function Example() {
  const [quantity, setQuantity] = useState<number | null>(3)

  return (
    <div className="space-y-3">
      <QuantityInput
        value={quantity}
        onValueChange={(nextValue: number | null) => setQuantity(nextValue)}
        min={0}
        max={10}
        step={1}
        showControls
      />
      <p className="text-sm aui-text-subtle">
        Items: <strong>{quantity ?? "unset"}</strong>
      </p>
      <p className="text-sm aui-text-muted">
        Controls should stay aligned with adjacent action columns in compact table rows.
      </p>
      <p className="text-sm aui-text-muted">
        Try increment/decrement at bounds to validate guardrails.
      </p>
    </div>
  )
}`,
  htmlCode: `<label for="qty">Quantity</label><input id="qty" type="text" inputmode="numeric" />`,
  cliCommand: "npx tembro add quantity-input",
  highlights: ["Stepper controls", "min/max boundaries", "controlled usage", "compact row compatibility"],
  relatedBlockSlugs: ["crm-dashboard", "users-table", "settings-form"],
  scenarios: [
    { title: "Line item quantity", description: "Use in carts and order forms with strict bounds." },
    { title: "Inventory controls", description: "Keep increments aligned with backend-stock constraints." },
    { title: "Form tables", description: "Compact control rendering works well in inline editable rows." },
    { title: "Bounded values", description: "Reject edits below zero and above maximum." },
  ],
  capabilityNotes: [
    "Show inline controls for quick adjustments when quantity edits are frequent.",
    "Set `min`/`max` to protect impossible states in business rules.",
    "Use controlled flow to persist updates across rows and validation passes.",
    "Disable controls when quantity is not editable to avoid inconsistent states.",
  ],
}
