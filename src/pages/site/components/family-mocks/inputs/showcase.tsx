import * as React from "react"

import { AsyncMultiSelect, AsyncSelect, Badge, Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/index"

import type { FamilyDemoProps } from "../types"

type WorkspaceOption = {
  value: string
  label: string
  description: string
  data: {
    team: string
    status: "Live" | "Draft" | "Review"
  }
}

const baseWorkspaces: WorkspaceOption[] = [
  { value: "acme-dashboard", label: "Acme Dashboard", description: "Core analytics workspace", data: { team: "Growth", status: "Live" } },
  { value: "crm-workspace", label: "CRM Workspace", description: "Deals and pipeline control", data: { team: "Sales", status: "Review" } },
  { value: "store-command", label: "Store Command", description: "Commerce operations shell", data: { team: "Commerce", status: "Live" } },
  { value: "finance-dock", label: "Finance Dock", description: "Billing and payout center", data: { team: "Finance", status: "Draft" } },
  { value: "creator-hub", label: "Creator Hub", description: "Content and campaign surface", data: { team: "Marketing", status: "Live" } },
  { value: "ops-center", label: "Ops Center", description: "Internal service operations", data: { team: "Operations", status: "Review" } },
] as const

const defaultWorkspaceGroups = [
  {
    label: "Pinned",
    options: baseWorkspaces.slice(0, 2),
  },
  {
    label: "All workspaces",
    options: baseWorkspaces.slice(2),
  },
]

export function InputsFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const [mode, setMode] = React.useState<"default" | "error" | "strict">("default")
  const [singleValue, setSingleValue] = React.useState<string | undefined>("acme-dashboard")
  const [singleOption, setSingleOption] = React.useState<WorkspaceOption | null>(baseWorkspaces[0])
  const [multiValue, setMultiValue] = React.useState<string[]>(["crm-workspace", "store-command"])
  const [multiOptions, setMultiOptions] = React.useState<WorkspaceOption[]>([baseWorkspaces[1], baseWorkspaces[2]])

  const loadOptions = React.useCallback(
    async (search: string) => {
      await new Promise((resolve) => window.setTimeout(resolve, 320))

      if (mode === "error") {
        throw new Error("Failed to load")
      }

      const query = search.trim().toLowerCase()
      const filtered = baseWorkspaces.filter((item) =>
        [item.label, item.description, item.data.team, item.data.status].join(" ").toLowerCase().includes(query)
      )

      if (!query) return defaultWorkspaceGroups
      return [{ label: "Search results", options: filtered }]
    },
    [mode]
  )

  const loadSelectedOption = React.useCallback(async (value: string) => {
    await new Promise((resolve) => window.setTimeout(resolve, 120))
    return baseWorkspaces.find((item) => item.value === value) ?? null
  }, [])

  const loadSelectedOptions = React.useCallback(async (values: string[]) => {
    await new Promise((resolve) => window.setTimeout(resolve, 120))
    return baseWorkspaces.filter((item) => values.includes(item.value))
  }, [])

  const activeSingle = singleOption ?? baseWorkspaces.find((item) => item.value === singleValue) ?? null
  const activeMultiCount = multiValue.length

  return (
    <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-4">
        <div className="rounded-[22px] border border-zinc-200 bg-white p-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">AsyncSelect</Badge>
                <Badge variant="outline">AsyncMultiSelect</Badge>
                <Badge variant="outline">{mode === "strict" ? "Min search 2" : mode === "error" ? "Error mode" : "Default mode"}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-zinc-900">Async entity search flow</p>
                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  Remote loading, hydration, create option, grouped results, multiselect and limit handling should all be visible in docs.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant={mode === "default" ? "default" : "outline"} size="sm" onClick={() => setMode("default")}>Default</Button>
              <Button variant={mode === "strict" ? "default" : "outline"} size="sm" onClick={() => setMode("strict")}>Strict</Button>
              <Button variant={mode === "error" ? "default" : "outline"} size="sm" onClick={() => setMode("error")}>Error</Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMode("default")
                  setSingleValue("acme-dashboard")
                  setSingleOption(baseWorkspaces[0])
                  setMultiValue(["crm-workspace", "store-command"])
                  setMultiOptions([baseWorkspaces[1], baseWorkspaces[2]])
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-medium text-zinc-900">Single select</p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">Hydrate selected value, search grouped results and allow create flow.</p>
              <div className="mt-4">
                <AsyncSelect<string, WorkspaceOption["data"], WorkspaceOption>
                  value={singleValue}
                  selectedOption={singleOption}
                  onValueChange={(value, option) => {
                    setSingleValue(value)
                    setSingleOption(option ?? null)
                    setState({ notes: `${option?.label ?? "Selection cleared"} connected to downstream workspace flow.` })
                  }}
                  loadOptions={loadOptions}
                  loadSelectedOption={loadSelectedOption}
                  defaultOptions={defaultWorkspaceGroups}
                  minSearchLength={mode === "strict" ? 2 : 0}
                  cacheOptions
                  clearable
                  labels={{
                    placeholder: "Select workspace",
                    searchPlaceholder: "Search workspaces...",
                    loading: "Loading workspaces...",
                    error: "Could not load workspaces",
                    empty: "No workspace found",
                    minSearchLength: (length) => `Type at least ${length} characters`,
                  }}
                  renderValue={(option) => (
                    <span className="inline-flex min-w-0 flex-col text-left">
                      <span className="truncate">{option.label}</span>
                      <span className="truncate text-xs text-zinc-500">{option.data.team}</span>
                    </span>
                  )}
                  renderOption={(option, optionState) => (
                    <span className="flex min-w-0 items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{option.label}</span>
                        <span className="block truncate text-xs text-zinc-500">{option.description}</span>
                      </span>
                      <span className={optionState.selected ? "rounded-full bg-zinc-950 px-2 py-0.5 text-[11px] text-white" : "rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] text-zinc-600"}>
                        {option.data.status}
                      </span>
                    </span>
                  )}
                  onCreateOption={(search) => ({
                    value: search.trim().toLowerCase().replace(/\s+/g, "-"),
                    label: search.trim(),
                    description: "Created from docs preview",
                    data: { team: "Custom", status: "Draft" },
                  })}
                  createOptionLabel={(search) => `Create workspace "${search}"`}
                />
              </div>
            </div>

            <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-medium text-zinc-900">Multi select</p>
              <p className="mt-1 text-sm leading-6 text-zinc-500">Select all visible options, cap selection count and keep tags removable.</p>
              <div className="mt-4">
                <AsyncMultiSelect<string, WorkspaceOption["data"], WorkspaceOption>
                  value={multiValue}
                  selectedOptions={multiOptions}
                  onValueChange={(value, options) => {
                    setMultiValue(value)
                    setMultiOptions(options)
                    setState({ notes: `${options.length} linked modules attached to the workspace form.` })
                  }}
                  loadOptions={loadOptions}
                  loadSelectedOptions={loadSelectedOptions}
                  defaultOptions={defaultWorkspaceGroups}
                  minSearchLength={mode === "strict" ? 2 : 0}
                  maxSelected={3}
                  showSelectAll
                  clearable
                  labels={{
                    placeholder: "Attach modules",
                    searchPlaceholder: "Search modules...",
                    loading: "Loading modules...",
                    error: "Could not load modules",
                    empty: "No module found",
                    clearAll: "Clear all",
                    selectAll: "Select visible",
                    selectedCount: (count) => `${count} selected`,
                    maxSelected: (count) => `Maximum ${count} modules`,
                    minSearchLength: (length) => `Type at least ${length} characters`,
                  }}
                  renderOption={(option) => (
                    <span className="flex min-w-0 items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{option.label}</span>
                        <span className="block truncate text-xs text-zinc-500">{option.data.team}</span>
                      </span>
                      <span className="text-[11px] text-zinc-500">{option.data.status}</span>
                    </span>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Select value={state.density} onValueChange={(value) => setState({ density: value as FamilyDemoProps["state"]["density"] })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comfortable">Comfortable</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
            </SelectContent>
          </Select>
          <div className="rounded-[20px] border border-zinc-200 bg-white px-4 py-3">
            <p className="text-sm text-zinc-500">Selected workspace</p>
            <p className="mt-2 text-sm font-medium text-zinc-950">{activeSingle?.label ?? "Nothing selected"}</p>
          </div>
          <div className="rounded-[20px] border border-zinc-200 bg-white px-4 py-3">
            <p className="text-sm text-zinc-500">Linked modules</p>
            <p className="mt-2 text-sm font-medium text-zinc-950">{activeMultiCount} attached</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-[22px] border border-zinc-200 bg-white p-4">
        <Textarea value={state.notes} onChange={(event) => setState({ notes: event.target.value })} className="min-h-24" />
        <div className="flex flex-wrap gap-2">
          {["grouped", "hydration", "create-option", "multi-select", "cache"].map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
        <div className="grid gap-3">
          <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm text-zinc-500">Mode</p>
            <p className="mt-2 text-lg font-semibold text-zinc-950">{mode}</p>
            <p className="mt-2 text-sm text-zinc-600">
              {mode === "error" ? "Forces renderError state." : mode === "strict" ? "Requires min search before loading." : "Immediate async search with grouped defaults."}
            </p>
          </div>
          <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm text-zinc-500">Single selection</p>
            <p className="mt-2 text-lg font-semibold text-zinc-950">{activeSingle?.data.team ?? "No team"}</p>
            <p className="mt-2 text-sm text-zinc-600">{activeSingle?.description ?? "Choose a workspace to hydrate its shell."}</p>
          </div>
          <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm text-zinc-500">Use cases</p>
            <div className="mt-3 space-y-2 text-sm text-zinc-600">
              <p>Large entity search with remote loading</p>
              <p>Hydrated edit forms with preselected values</p>
              <p>Module linking and controlled multiselect limits</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

