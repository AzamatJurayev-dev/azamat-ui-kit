import * as React from "react"

import { DualListPicker } from "@/index"

const defaultItems = [
  { label: "Analytics", value: "analytics" },
  { label: "Reports", value: "reports" },
  { label: "Integrations", value: "integrations" },
  { label: "Billing", value: "billing" },
  { label: "Notifications", value: "notifications", disabled: true },
]

export function DualListPickerShowcase() {
  const [picked, setPicked] = React.useState(["analytics"])

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">Selected: {picked.join(", ") || "None"}</p>
      <DualListPicker items={defaultItems} picked={picked} onPickedChange={setPicked} availableTitle="All modules" pickedTitle="Enabled modules" />
      <button type="button" className="rounded-md border px-3 py-1.5 text-sm" onClick={() => setPicked([])}>
        Clear selection
      </button>
    </div>
  )
}

