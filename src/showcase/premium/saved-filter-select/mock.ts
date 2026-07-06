import type { ComponentDemoMock } from "../types"

export const savedFilterSelectMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { SavedFilterSelect } from "@/index"

const filters = [
  { value: "billing", label: "Billing", description: "Invoices and payment status" },
  { value: "ops", label: "Operations", description: "Queues and workload" },
  { value: "owners", label: "Owner: Azamat", description: "Assigned records only" },
]

export function Example() {
  const [value, setValue] = useState("billing")

  return (
    <SavedFilterSelect
      value={value}
      onValueChange={setValue}
      filters={filters}
      onSave={() => undefined}
      onDelete={() => undefined}
    />
  )
}`,
  cliCommand: "npx azix add saved-filter-select",
  highlights: [
    "Named view switching",
    "Nested delete action behavior",
    "Toolbar-friendly control",
    "Controlled active view API",
  ],
  scenarios: [
    { title: "Saved table states", description: "Restore common operational filter sets quickly." },
    { title: "Named views", description: "Expose billing, ops or owner-specific modes in one control." },
    { title: "Managed delete", description: "Keep delete and apply interactions separated inside the same list row." },
  ],
  capabilityNotes: [
    "Use SavedFilterSelect where operators revisit the same filter combinations repeatedly.",
    "Keep the active view controlled so tables and filters stay synchronized.",
    "Nested delete actions are isolated from parent selection to avoid accidental view switching.",
  ],
}
