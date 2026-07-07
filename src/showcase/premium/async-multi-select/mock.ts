import type { ComponentDemoMock } from "../types"

export const asyncMultiSelectMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { AsyncMultiSelect } from "@/index"

const projectOptions = [
  { value: "analytics", label: "Analytics", description: "Dashboards and reports" },
  { value: "billing", label: "Billing", description: "Invoices and subscriptions" },
  { value: "support", label: "Support", description: "Customer tickets" },
  { value: "security", label: "Security", description: "Permissions and audit" },
  { value: "search", label: "Search", description: "Discovery and recommendations" },
  { value: "archive", label: "Archive", description: "Legacy read-only project", disabled: true },
]

const loadProjectOptions = async (search: string) => {
  await new Promise((resolve) => setTimeout(resolve, 300))
  const query = search.trim().toLowerCase()
  if (!query) return projectOptions
  return projectOptions.filter((option) => String(option.label ?? "").toLowerCase().includes(query))
}

export function Example() {
  const [selected, setSelected] = useState<string[]>(["analytics"])

  return (
    <div className="space-y-3">
      <AsyncMultiSelect
        value={selected}
        onValueChange={(values) => setSelected(values)}
        loadOptions={loadProjectOptions}
        loadSelectedOptions={async (values) => projectOptions.filter((item) => values.includes(item.value))}
        maxSelected={3}
        closeOnSelect={false}
        showSelectAll
        clearable
      />
      <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm aui-text-muted">
        Modules: <strong>{selected.length}</strong> selected
      </div>
    </div>
  )
}`
  ,
  htmlCode: `<button data-slot="async-multiselect-trigger">Choose modules</button>`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add async-multi-select",
  highlights: ["Multiple selected tags", "maxSelected guard", "select-all action", "remove by tag/checkbox"],
  relatedBlockSlugs: ["users-table", "crm-dashboard", "settings-form"],
  scenarios: [
    { title: "Project scope", description: "Attach multiple modules to one workspace or permission set." },
    { title: "Max selected", description: "Limit selections to keep downstream payloads predictable." },
    { title: "Keyboard remove", description: "Support tag cleanup for power users in dense inputs." },
    { title: "Async updates", description: "Keep tags synced with changing remote data." },
  ],
  capabilityNotes: [
    "Use `AsyncMultiSelect` for sparse multi-select forms where dataset changes over time.",
    "Show clear limits with `maxSelected` and help text from validation.",
    "`onValueChange` returns both ids and resolved options when custom payloads are needed.",
    "Disable close-on-select when users are likely to make batch picks.",
  ],
}
