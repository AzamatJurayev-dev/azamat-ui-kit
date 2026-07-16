import * as React from "react"

import { Badge, Button, Select } from "@/index"

import type { ComponentDemoProps } from "../types"

import { selectDemoGroups } from "./data"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

type SelectMode = "plan" | "density"

export function SelectShowcase({ state, setState }: ComponentDemoProps) {
  const planOptions = selectDemoGroups[0].options
  const compactOptions = selectDemoGroups[1].options
  const groupedOptions = selectDemoGroups[2].options
  const selectedValue = state.selectValue ?? planOptions[0].value
  const selectedPlan = planOptions.find((option) => option.value === selectedValue) ?? planOptions[0]
  const highlightedPlan = planOptions[1] ?? planOptions[0]
  const [surface, setSurface] = React.useState<SelectMode>("plan")
  const [workspace, setWorkspace] = React.useState("north")

  const summaryRows =
    selectedPlan.value === "enterprise"
      ? [["Seats", "Unlimited"], ["Support", "Dedicated"], ["SLA", "Priority"]]
      : selectedPlan.value === "growth"
        ? [["Seats", "25"], ["Support", "Shared"], ["SLA", "Same day"]]
        : [["Seats", "5"], ["Support", "Email"], ["SLA", "Standard"]]

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Selection</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">One clean select surface first</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Show the default trigger, controlled value, and summary update in one place.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Choice</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{selectedPlan.label}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Mode</p>
              <p className="mt-2 text-lg font-semibold capitalize aui-text-strong">{surface}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Options</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{surface === "plan" ? planOptions.length : compactOptions.length}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="sm" variant={surface === "plan" ? "default" : "outline"} onClick={() => setSurface("plan")}>
            Default trigger
          </Button>
              <Button size="sm" variant={surface === "density" ? "default" : "outline"} onClick={() => setSurface("density")}>
            Compact trigger
          </Button>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Primary select</p>
              <h4 className="mt-2 text-xl font-semibold tracking-tight aui-text-strong">
                {surface === "plan" ? "Standard choice trigger" : "Compact toolbar trigger"}
              </h4>
            </div>

            <div className="rounded-[20px] border border-[color:var(--aui-divider)] p-4">
              <p className="text-sm font-medium aui-text-muted">{surface === "plan" ? "Workspace plan" : "Toolbar density"}</p>
              <div className="mt-3">
                {surface === "plan" ? (
                  <Select
                    value={selectedValue}
                    onValueChange={(value) => setState({ selectValue: value ?? planOptions[0].value })}
                    options={planOptions}
                    triggerClassName="w-full"
                  />
                ) : (
                  <Select
                    defaultValue={compactOptions[0].value}
                    options={compactOptions}
                    size="sm"
                    triggerClassName="w-full"
                  />
                )}
              </div>
            </div>

            <div className="rounded-[20px] border border-[color:var(--aui-divider)] p-4">
              <p className="text-sm font-medium aui-text-muted">Grouped searchable select</p>
              <div className="mt-3">
                <Select
                  value={workspace}
                  onValueChange={(value) => setWorkspace(value ?? "north")}
                  searchable
                  clearable
                  placeholder="Choose workspace"
                  emptyMessage="No workspace matched"
                  groups={[
                    { label: "Regions", options: groupedOptions.slice(0, 2) },
                    { label: "Operations", options: groupedOptions.slice(2) },
                  ]}
                  triggerClassName="w-full"
                />
              </div>
            </div>

            <div className="rounded-[20px] border border-[color:var(--aui-divider)] p-4">
              <p className="text-sm font-medium aui-text-muted">Custom option renderer without duplicate check icons</p>
              <div className="mt-3">
                <Select
                  defaultValue={planOptions[1].value}
                  options={planOptions}
                  showSelectedIndicator={false}
                  renderOption={(option, optionState) => (
                    <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{option.label}</span>
                        {option.description ? <span className="block truncate text-xs aui-text-muted">{option.description}</span> : null}
                      </span>
                      {optionState.selected ? <span className="rounded-full bg-[color:var(--aui-control-bg)] px-2 py-0.5 text-xs font-semibold">Selected</span> : null}
                    </span>
                  )}
                  triggerClassName="w-full"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {summaryRows.map(([label, value]) => (
                <div key={label} className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
                  <p className="text-xs aui-text-muted">{label}</p>
                  <p className="mt-1 text-sm font-medium aui-text-strong">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Controlled result</p>
                <h4 className="mt-2 text-xl font-semibold tracking-tight aui-text-strong">{selectedPlan.label}</h4>
              </div>
              <Badge variant="outline" className="rounded-full">{selectedPlan.value}</Badge>
            </div>

            <div className="border-y border-[color:var(--aui-divider)]">
              {[
                "Base Select should cover normal forms and static choices first.",
                "Async and searchable variants should be documented as upgrades, not parallel defaults.",
                "Controlled value must update nearby product UI immediately.",
              ].map((note) => (
                <div key={note} className="border-b border-[color:var(--aui-divider)] py-3 text-sm leading-6 aui-text-muted last:border-b-0">
                  {note}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" onClick={() => setState({ selectValue: highlightedPlan.value })}>
                Choose {highlightedPlan.label}
              </Button>
              <Button type="button" size="sm" variant="secondary" onClick={() => setState({ selectValue: planOptions[0].value })}>
                Reset
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Select
                value="invalid"
                onValueChange={() => undefined}
                options={[{ value: "invalid", label: "Invalid selection" }]}
                invalid
                triggerClassName="w-full"
              />
              <Select
                value="loading"
                onValueChange={() => undefined}
                options={[{ value: "loading", label: "Loading options" }]}
                loading
                triggerClassName="w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
