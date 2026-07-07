import type { ComponentDemoMock } from "../types"

export const simpleSelectMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { Button, SimpleSelect } from "@/index"

const selectOptions = [
  { value: "public", label: "Public", disabled: false },
  { value: "private", label: "Private", disabled: false },
  { value: "internal", label: "Internal", disabled: false },
  { value: "archived", label: "Archived", disabled: true },
]

export function Example() {
  const [value, setValue] = useState("private")

  return (
    <div className="space-y-3">
      <SimpleSelect
        options={selectOptions}
        value={value}
        onValueChange={(nextValue) => setValue(nextValue ?? "private")}
        placeholder="Visibility"
        size="sm"
      />
      <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm aui-text-muted">
        Current visibility: <strong>{value}</strong>
      </div>
      <Button variant="outline" onClick={() => setValue("public")}>Reset public</Button>
    </div>
  )
}`,
  htmlCode: `<button data-slot="simple-select-trigger">Open options</button>`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add simple-select",
  highlights: ["Controlled usage", "Static options", "Clear default value", "Disabled option handling"],
  relatedBlockSlugs: ["settings-form", "users-table", "crm-dashboard"],
  scenarios: [
    { title: "Controlled visibility", description: "Use controlled `value` when parent flow tracks visibility state." },
    { title: "Static catalog", description: "Use fixed options for status and tier fields." },
    { title: "Clear/reset flow", description: "Expose a reset path before destructive transitions." },
    { title: "Compact trigger", description: "Use small size in dense row or toolbar layouts." },
  ],
  capabilityNotes: [
    "SimpleSelect is best for local option lists that don't require async loading.",
    "Avoid rebuilding options each render; memoize if options are computed.",
    "Use disabled options to communicate temporarily unavailable targets.",
    "Always keep selected value in a controlled parent when used in complex forms.",
  ],
}
