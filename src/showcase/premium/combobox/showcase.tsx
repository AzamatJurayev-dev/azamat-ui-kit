import * as React from "react"

import { Badge, Button, Combobox } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const teammateOptions = [
  { value: "azamat", label: "Azamat", description: "Design system owner" },
  { value: "nodira", label: "Nodira", description: "Operations lead" },
  { value: "sardor", label: "Sardor", description: "Frontend engineer" },
  { value: "kamola", label: "Kamola", description: "Product manager" },
] as const

export function ComboboxShowcase({ state, setState }: ComponentDemoProps) {
  const currentValue = teammateOptions.some((option) => option.value === state.selectValue) ? state.selectValue : "azamat"
  const currentOption = teammateOptions.find((option) => option.value === currentValue) ?? teammateOptions[0]
  const [searchValue, setSearchValue] = React.useState("")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Search selection</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Combobox is the keyboard-first local member</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use it when users know part of the option name and need to jump directly through local filtering instead of scanning a longer static Select list.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Searchable</Badge>
            <Badge variant="outline" className="rounded-full">Controlled</Badge>
            <Badge variant="outline" className="rounded-full">Local options</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Assign component owner</p>
            <div className="mt-3">
              <Combobox
                value={currentValue}
                options={teammateOptions.map((option) => ({ ...option }))}
                onValueChange={(value) => setState({ selectValue: value ?? "azamat" })}
                placeholder="Choose teammate"
                searchPlaceholder="Search teammate..."
                clearable
                allowDeselect
                showSelectedDescription
                onSearchChange={setSearchValue}
              />
            </div>
          </div>

          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Selection summary</p>
            <p className="mt-3 text-lg font-semibold aui-text-strong">{currentOption.label}</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">{currentOption.description}</p>
            <p className="mt-3 text-sm leading-6 aui-text-muted">
              Keep Combobox for local search-heavy reassignment flows. If options are remote, move back to the Select family and choose AsyncSelect instead.
            </p>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">Current owner: {currentOption.label}</h4>
            <p className="mt-2 text-sm leading-6 aui-text-muted">
              Use quick actions below to verify that the value stays controlled outside the dropdown itself.
            </p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">Search query: {searchValue || "empty"}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => setState({ selectValue: "nodira" })}>
              Pick Nodira
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => setState({ selectValue: "azamat" })}>
              Reset
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
