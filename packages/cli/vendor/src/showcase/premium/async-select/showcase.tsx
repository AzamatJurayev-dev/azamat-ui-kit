import { useState } from "react"

import { AsyncSelect, Badge, Button, type AsyncSelectOption } from "@/index"
import { routeWorkspaceOptions } from "@/showcase/component-route-data"

const workspaceOptions: AsyncSelectOption[] = routeWorkspaceOptions

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const loadOptions = async (query: string): Promise<typeof workspaceOptions> => {
  await new Promise((resolve) => setTimeout(resolve, 260))
  const normalized = query.trim().toLowerCase()
  if (normalized === "error") {
    throw new Error("Unable to load regions")
  }
  if (!normalized) return workspaceOptions
  return workspaceOptions.filter((item) => String(item.label ?? "").toLowerCase().includes(normalized))
}

const loadSelectedOption = async (selectedValue: string) => {
  await new Promise((resolve) => setTimeout(resolve, 120))
  return workspaceOptions.find((item) => item.value === selectedValue) ?? null
}

const loadSelectedOptions = async (selectedValues: string[]) => {
  await new Promise((resolve) => setTimeout(resolve, 120))
  return workspaceOptions.filter((item) => selectedValues.includes(String(item.value)))
}

const createWorkspaceOption = async (search: string): Promise<AsyncSelectOption> => {
  await new Promise((resolve) => setTimeout(resolve, 180))
  const value = search.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
  return {
    value: value || "custom-region",
    label: search.trim(),
    description: "Created from the current search query",
  }
}

export function AsyncSelectShowcase() {
  const [value, setValue] = useState("")
  const [teamValues, setTeamValues] = useState<string[]>(["north", "west"])
  const activeOption = routeWorkspaceOptions.find((item) => item.value === value)
  const selectedTeams = routeWorkspaceOptions.filter((item) => teamValues.includes(String(item.value)))

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
                loadSelectedOption={loadSelectedOption}
                defaultOptions={workspaceOptions}
                minSearchLength={1}
                clearable
                showSelectedDescription
                debounceMs={220}
                onCreateOption={createWorkspaceOption}
                createOptionLabel={(search) => `Create region "${search.trim()}"`}
                labels={{
                  placeholder: "Choose service region",
                  searchPlaceholder: "Search regions...",
                  error: "Could not load regions. Try another query.",
                }}
              />
            </div>
            <div className="mt-5">
              <p className="text-sm font-medium aui-text-muted">Multi select uses the same component</p>
              <div className="mt-3">
                <AsyncSelect
                  isMulti
                  value={teamValues}
                  onValueChange={(nextValue) => setTeamValues(nextValue)}
                  loadOptions={loadOptions}
                  loadSelectedOptions={loadSelectedOptions}
                  defaultOptions={workspaceOptions}
                  minSearchLength={1}
                  clearable
                  showSelectAll
                  maxSelected={3}
                  maxVisibleTags={2}
                  showSelectedDescription
                  debounceMs={220}
                  onCreateOption={createWorkspaceOption}
                  createOptionLabel={(search) => `Create team "${search.trim()}"`}
                  labels={{
                    multiPlaceholder: "Choose team coverage",
                    searchPlaceholder: "Search team regions...",
                    error: "Could not load teams. Try another query.",
                    selectedCount: (count) => `${count} regions selected`,
                    hiddenSelected: (count) => `+${count} more`,
                    maxSelected: (count) => `Maximum ${count} regions`,
                  }}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button size="sm" variant="secondary" onClick={() => setValue("south")}>
                Hydrate South
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setTeamValues(["north", "west", "central"])}>
                Fill max selected
              </Button>
              <Button size="sm" variant="outline" onClick={() => {
                setValue("")
                setTeamValues([])
              }}>
                Clear all
              </Button>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <div className="rounded-[18px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm">
                <p className="font-medium aui-text-strong">Type to query</p>
                <p className="mt-2 leading-6 aui-text-muted">Minimum search length keeps remote requests intentional. Type error to test failure state.</p>
              </div>
              <div className="rounded-[18px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm">
                <p className="font-medium aui-text-strong">Clear safely</p>
                <p className="mt-2 leading-6 aui-text-muted">Clear action is isolated from the trigger surface.</p>
              </div>
              <div className="rounded-[18px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3 text-sm">
                <p className="font-medium aui-text-strong">Create and hydrate</p>
                <p className="mt-2 leading-6 aui-text-muted">Create missing options and restore selected labels from ID-first edit state.</p>
              </div>
            </div>
          </div>

          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Selected result</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{activeOption?.label || "No region selected"}</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">
              Start typing to simulate remote filtering. This should feel like a specialized extension of Select, not a completely separate mental model.
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-[18px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] aui-text-muted">Value</p>
                <p className="mt-2 text-sm font-medium aui-text-strong">{value || "none"}</p>
              </div>
              <div className="rounded-[18px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] aui-text-muted">Team</p>
                <p className="mt-2 text-sm font-medium aui-text-strong">{activeOption ? routeWorkspaceOptions.find((item) => item.value === activeOption.value)?.team : "No team"}</p>
              </div>
              <div className="rounded-[18px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.2em] aui-text-muted">Multi mode</p>
                <p className="mt-2 text-sm font-medium aui-text-strong">{selectedTeams.length ? selectedTeams.map((item) => item.label).join(", ") : "No teams selected"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
