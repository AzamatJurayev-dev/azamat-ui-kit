import type { ComponentDemoMock } from "../types"

export const comboboxMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { Button, Select } from "tembro"

const teammateOptions = [
  { value: "azamat", label: "Azamat", description: "Design system owner" },
  { value: "nodira", label: "Nodira", description: "Operations lead" },
  { value: "sardor", label: "Sardor", description: "Frontend engineer" },
]

export function Example() {
  const [value, setValue] = useState("azamat")

  return (
    <div className="space-y-3">
      <Select
        value={value}
        onValueChange={(nextValue) => setValue(nextValue ?? "azamat")}
        options={teammateOptions}
        placeholder="Assign owner"
        searchPlaceholder="Search teammate..."
        searchable
      />
      <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm aui-text-muted">
        Current owner: <strong>{value}</strong>
      </div>
      <Button variant="outline" onClick={() => setValue("nodira")}>Pick Nodira</Button>
    </div>
  )
}`,
  htmlCode: `<button data-slot="combobox-trigger">Open combobox</button>`,
  cliCommand: "npx tembro add select",
  highlights: ["Search-led selection", "Controlled value", "Description rows", "Fast reassignment flow"],
  relatedBlockSlugs: ["settings-form", "users-table", "crm-dashboard"],
  scenarios: [
    { title: "Owner assignment", description: "Use combobox when the list is local but still benefits from search." },
    { title: "Dense admin forms", description: "Keep reassignment fast without opening a full modal." },
    { title: "Command-like search", description: "Useful when discoverability matters more than plain select semantics." },
  ],
  capabilityNotes: [
    "Use Combobox when users need type-to-find behavior on a local option set.",
    "Keep option labels and descriptions short to avoid noisy dropdown rows.",
    "Prefer controlled value in admin workflows so state stays explicit.",
    "If options come from the server, move to AsyncSelect instead of overloading Combobox.",
  ],
}
