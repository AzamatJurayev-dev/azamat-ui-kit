import type { ComponentDemoMock } from "../types"

export const asyncSelectMock: ComponentDemoMock = {
  code: `import { useState } from "react"
import { AsyncSelect, type AsyncSelectOption } from "tembro"

const seedOptions: AsyncSelectOption[] = [
  { value: "acme", label: "ACME", description: "Core product line" },
  { value: "nova", label: "Nova", description: "Enterprise clients" },
  { value: "spark", label: "Spark", description: "Growth workspace" },
  { value: "atlas", label: "Atlas", description: "Billing team" },
  { value: "zen", label: "Zen", description: "Ops and support" },
  { value: "legacy", label: "Legacy", description: "Deprecated workspace", disabled: true },
]

const loadWorkspaces = async (search: string) => {
  await new Promise((resolve) => setTimeout(resolve, 420))
  const query = search.trim().toLowerCase()
  if (query === "error") {
    throw new Error("Unable to fetch options for the current query.")
  }

  if (query.length < 2) return []
  return seedOptions.filter((option) => String(option.label ?? "").toLowerCase().includes(query))
}

export function Example() {
  const [value, setValue] = useState("")
  const [label, setLabel] = useState("Select workspace")

  return (
    <div className="space-y-3">
      <AsyncSelect
        value={value}
        onValueChange={(nextValue, option) => {
          setValue(nextValue ?? "")
          setLabel(option?.label ? String(option.label) : "Select workspace")
        }}
        loadOptions={loadWorkspaces}
        loadSelectedOption={async (selectedValue) => {
          await new Promise((resolve) => setTimeout(resolve, 40))
          return seedOptions.find((option) => option.value === selectedValue) ?? null
        }}
        clearable
        debounceMs={250}
        minSearchLength={2}
        defaultOptions={seedOptions}
      />
      <div className="rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3 text-sm aui-text-muted">
        Selected: <strong>{value || "none"}</strong> — {label}
      </div>
      <p className="text-sm aui-text-muted">
        Set search to <code>error</code> to preview empty/error handling paths.
      </p>
      <p className="text-sm aui-text-muted">Disabled items are rendered non-selectable in the list.</p>
    </div>
  )
}`
,
  htmlCode: `<button data-slot="async-select-trigger">Choose workspace</button>`,
  cliCommand: "npx tembro add async-select",
  highlights: [
    "Asynchronous loadOptions and loading state support",
    "Debounced search requests",
    "Empty/min-search behavior",
    "Error state handling in query flow",
  ],
  relatedBlockSlugs: ["settings-form", "crm-dashboard", "users-table"],
  scenarios: [
    { title: "Remote lookup", description: "Search in remote datasets and keep selected value in state." },
    { title: "Loading state", description: "Let users understand network delay with pending feedback." },
    { title: "Error fallback", description: "Surface and recoverable errors when option loading fails." },
    { title: "Minimum query", description: "Avoid noisy requests with `minSearchLength`." },
  ],
  capabilityNotes: [
    "Prefer `AsyncSelect` for datasets that change often, have many rows, or need server filtering.",
    "Use `loadSelectedOption` when navigating back to preselected rows from an ID-only payload.",
    "Keep selected value controlled so parent forms can validate and persist immediately.",
    "Avoid embedding heavy logic in `loadOptions`; return normalized value objects with stable labels.",
  ],
}
