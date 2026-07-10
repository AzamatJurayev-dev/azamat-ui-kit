import { useState } from "react"

import { AsyncSelect, type AsyncSelectOption } from "@/index"

const moduleOptions: AsyncSelectOption[] = [
  { value: "inbox", label: "Inbox" },
  { value: "analytics", label: "Analytics" },
  { value: "billing", label: "Billing" },
  { value: "support", label: "Support" },
]

const loadModules = async (query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 240))
  if (!query) return moduleOptions
  return moduleOptions.filter((item) => String(item.label ?? "").toLowerCase().includes(query.toLowerCase()))
}

export function AsyncMultiSelectShowcase() {
  const [selected, setSelected] = useState<string[]>(["analytics"])

  return (
    <div className="space-y-4">
      <div className="rounded-[20px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
        <p className="text-sm font-medium aui-text-strong">Use AsyncSelect with isMulti for remote multi-value flows</p>
        <p className="mt-2 text-sm leading-6 aui-text-muted">
          Keep the Select family centered on one remote surface. This route documents the multi-value mode, but new code should stay on AsyncSelect.
        </p>
      </div>
      <AsyncSelect
        isMulti
        value={selected}
        onValueChange={(values) => setSelected(values)}
        loadOptions={loadModules}
        maxSelected={3}
        showSelectAll
      />
      <p className="aui-text-muted text-sm">Selected count: {selected.length}</p>
    </div>
  )
}
