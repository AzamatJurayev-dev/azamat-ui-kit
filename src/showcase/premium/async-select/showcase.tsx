import { useState } from "react"

import { AsyncSelect, Badge, type AsyncSelectOption } from "@/index"

const workspaceOptions: AsyncSelectOption[] = [
  { value: "north", label: "North Region", description: "Sales ops" },
  { value: "south", label: "South Region", description: "Support team" },
  { value: "west", label: "West Region", description: "Billing operations" },
]

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const loadOptions = async (query: string): Promise<typeof workspaceOptions> => {
  await new Promise((resolve) => setTimeout(resolve, 260))
  const normalized = query.trim().toLowerCase()
  if (!normalized) return workspaceOptions
  return workspaceOptions.filter((item) => String(item.label ?? "").toLowerCase().includes(normalized))
}

export function AsyncSelectShowcase() {
  const [value, setValue] = useState("")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Remote selection</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">AsyncSelect is the remote member of the Select family</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use AsyncSelect only when the main Select flow is not enough because the option set is large, remote, or hydration-aware.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Async</Badge>
            <Badge variant="outline" className="rounded-full">Search</Badge>
            <Badge variant="outline" className="rounded-full">Clearable</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Assign service region</p>
            <div className="mt-3">
              <AsyncSelect
                value={value}
                onValueChange={(nextValue) => setValue(nextValue ?? "")}
                loadOptions={loadOptions}
                defaultOptions={workspaceOptions}
                minSearchLength={1}
                clearable
                debounceMs={220}
              />
            </div>
          </div>

          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Selected result</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{value || "No region selected"}</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">
              Start typing to simulate remote filtering. This should feel like a specialized extension of Select, not a completely separate mental model.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
