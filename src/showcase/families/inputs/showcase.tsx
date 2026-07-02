import * as React from "react"

import {
  AsyncMultiSelect,
  AsyncSelect,
  Badge,
  Button,
  SimpleSelect,
  Textarea,
} from "@/index"

import type { FamilyDemoProps } from "../types"

import {
  defaultWorkspaceGroups,
  densityOptions,
  environmentOptions,
  workspaceOptions,
  type WorkspaceOption,
} from "./data"

export function InputsFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const [mode, setMode] = React.useState<"default" | "error" | "strict">("default")
  const [singleValue, setSingleValue] = React.useState<string | undefined>("acme-dashboard")
  const [singleOption, setSingleOption] = React.useState<WorkspaceOption | null>(workspaceOptions[0])
  const [multiValue, setMultiValue] = React.useState<string[]>(["crm-workspace", "store-command"])
  const [multiOptions, setMultiOptions] = React.useState<WorkspaceOption[]>([workspaceOptions[1], workspaceOptions[2]])
  const [environment, setEnvironment] = React.useState<string | undefined>("production")

  const loadOptions = React.useCallback(
    async (search: string) => {
      await new Promise((resolve) => window.setTimeout(resolve, 320))

      if (mode === "error") {
        throw new Error("Failed to load")
      }

      const query = search.trim().toLowerCase()
      const filtered = workspaceOptions.filter((item) =>
        [item.label, item.description, item.data.team, item.data.status].join(" ").toLowerCase().includes(query)
      )

      if (!query) return defaultWorkspaceGroups
      return [{ label: "Search results", options: filtered }]
    },
    [mode]
  )

  const loadSelectedOption = React.useCallback(async (value: string) => {
    await new Promise((resolve) => window.setTimeout(resolve, 120))
    return workspaceOptions.find((item) => item.value === value) ?? null
  }, [])

  const loadSelectedOptions = React.useCallback(async (values: string[]) => {
    await new Promise((resolve) => window.setTimeout(resolve, 120))
    return workspaceOptions.filter((item) => values.includes(item.value))
  }, [])

  const activeSingle = singleOption ?? workspaceOptions.find((item) => item.value === singleValue) ?? null

  return (
    <div className="space-y-4">
      <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">AsyncSelect</Badge>
              <Badge variant="outline">AsyncMultiSelect</Badge>
              <Badge variant="outline">SimpleSelect</Badge>
              <Badge variant="outline">{mode === "strict" ? "Min search 2" : mode === "error" ? "Error mode" : "Default mode"}</Badge>
            </div>
            <div>
              <p className="aui-text-strong text-sm font-medium">Select family coverage</p>
              <p className="aui-text-muted mt-1 text-sm leading-6">
                Static select, async search, hydrated edit mode, create flow, multiselect limits, clear actions and selection summaries all stay visible here.
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
                setSingleOption(workspaceOptions[0])
                setMultiValue(["crm-workspace", "store-command"])
                setMultiOptions([workspaceOptions[1], workspaceOptions[2]])
                setEnvironment("production")
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-4">
          <div className="grid gap-4 xl:grid-cols-2">
            <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
              <p className="aui-text-strong text-sm font-medium">Simple select</p>
              <p className="aui-text-muted mt-1 text-sm leading-6">Static option set with search and clear action for lightweight forms.</p>
              <div className="mt-4">
                <SimpleSelect
                  value={environment}
                  onValueChange={(value) => {
                    setEnvironment(value)
                    setState({ notes: `${value ?? "No environment"} selected for deploy routing.` })
                  }}
                  options={environmentOptions}
                  placeholder="Choose environment"
                  searchable
                  clearable
                />
              </div>
            </div>

            <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
              <p className="aui-text-strong text-sm font-medium">Single async select</p>
              <p className="aui-text-muted mt-1 text-sm leading-6">Hydrate selected value, search grouped results and create custom workspace.</p>
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
                      <span className="aui-text-muted truncate text-xs">{option.data.team}</span>
                    </span>
                  )}
                  renderOption={(option, optionState) => (
                    <span className="flex min-w-0 items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{option.label}</span>
                        <span className="aui-text-muted block truncate text-xs">{option.description}</span>
                      </span>
                      <span className={optionState.selected ? "rounded-full aui-surface-strong px-2 py-0.5 text-[11px]" : "rounded-full bg-[color:var(--aui-page-bg-alt)] px-2 py-0.5 text-[11px] aui-text-strong"}>
                        {option.data.status}
                      </span>
                    </span>
                  )}
                  onCreateOption={(search) => ({
                    value: search.trim().toLowerCase().replace(/\s+/g, "-"),
                    label: search.trim(),
                    description: "Created from the current route",
                    data: { team: "Custom", status: "Draft" },
                  })}
                  createOptionLabel={(search) => `Create workspace "${search}"`}
                />
              </div>
            </div>
          </div>

          <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="aui-text-strong text-sm font-medium">Async multi select</p>
                <p className="aui-text-muted mt-1 text-sm leading-6">Select all visible options, cap selection count and keep tag removal independent from trigger open state.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">{multiValue.length} linked</Badge>
                <Badge variant="outline">Max 3</Badge>
                <Badge variant="outline">Select visible</Badge>
              </div>
            </div>
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
                      <span className="aui-text-muted block truncate text-xs">{option.data.team}</span>
                    </span>
                    <span className="aui-text-muted text-[11px]">{option.data.status}</span>
                  </span>
                )}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Row-safe clear",
                body: "Clear icons and tag remove actions stay isolated from the parent trigger or row click surface.",
              },
              {
                title: "Hydrated edit mode",
                body: "Selected values can be restored from remote data without forcing the full option list to preload.",
              },
              {
                title: "Large option sets",
                body: "Use async search when a plain select would overload the route or the user needs remote filtering.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] px-4 py-3">
                <p className="aui-text-strong text-sm font-medium">{item.title}</p>
                <p className="aui-text-subtle mt-2 text-sm leading-6">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
          <Textarea value={state.notes} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => setState({ notes: event.target.value })} className="min-h-24" />
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
            <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] p-4">
              <p className="aui-text-muted text-sm">Mode</p>
              <p className="aui-text-strong mt-2 text-lg font-semibold">{mode}</p>
              <p className="aui-text-strong mt-2 text-sm">
                {mode === "error" ? "Forces renderError state." : mode === "strict" ? "Requires min search before loading." : "Immediate async search with grouped defaults."}
              </p>
            </div>
            <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] p-4">
              <p className="aui-text-muted text-sm">Selected workspace</p>
              <p className="aui-text-strong mt-2 text-lg font-semibold">{activeSingle?.label ?? "Nothing selected"}</p>
              <p className="aui-text-subtle mt-2 text-sm">{activeSingle?.description ?? "Choose a workspace to hydrate its shell."}</p>
            </div>
            <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] p-4">
              <p className="aui-text-muted text-sm">Linked modules</p>
              <p className="aui-text-strong mt-2 text-lg font-semibold">{multiValue.length} attached</p>
              <p className="aui-text-subtle mt-2 text-sm">Tags, clear all and select visible stay synchronized with controlled value state.</p>
            </div>
            <div className="rounded-[20px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg-alt)] p-4">
              <p className="aui-text-muted text-sm">Environment</p>
              <p className="aui-text-strong mt-2 text-lg font-semibold">{environmentOptions.find((item) => item.value === environment)?.label ?? "Not selected"}</p>
              <p className="aui-text-subtle mt-2 text-sm">SimpleSelect covers the static branch of the same select family.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {["grouped", "hydration", "create-option", "multi-select", "clearable", "searchable"].map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          <SimpleSelect
            value={state.density}
            onValueChange={(value) => setState({ density: (value as FamilyDemoProps["state"]["density"] | undefined) ?? "comfortable" })}
            options={densityOptions}
            placeholder="Preview density"
          />
        </div>
      </div>
    </div>
  )
}
