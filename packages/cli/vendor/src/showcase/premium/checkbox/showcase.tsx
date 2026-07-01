import { Badge, Button, Checkbox } from "@/index"

import type { ComponentDemoProps } from "../types"

import { checkboxDemoItems } from "./data"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function CheckboxShowcase({ state, setState }: ComponentDemoProps) {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Binary lists</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Checkboxes should read like a checklist</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              The preview should show task-like selection, disabled permissions, and follow-up actions in one readable stack instead of floating toggles.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Controlled</Badge>
            <Badge variant="outline" className="rounded-full">Default checked</Badge>
            <Badge variant="outline" className="rounded-full">Disabled</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {checkboxDemoItems.map((item, index) => (
            <label key={item.label} htmlFor={item.id} className={`${panelClass} flex items-start gap-3`}>
              <Checkbox
                id={item.id}
                checked={index === 0 ? state.checked : item.checked}
                disabled={item.disabled}
                onCheckedChange={index === 0 ? (checked) => setState({ checked: Boolean(checked) }) : undefined}
                defaultChecked={index > 0 ? item.checked : undefined}
              />
              <div>
                <p className="text-sm font-medium aui-text-strong">{item.label}</p>
                <p className="mt-1 text-sm aui-text-muted">{item.description}</p>
              </div>
            </label>
          ))}
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">
              Release checklist is {state.checked ? "enabled" : "disabled"}
            </h4>
            <p className="mt-2 text-sm leading-6 aui-text-muted">
              Toggle the first row or use these actions to verify controlled checkbox behavior.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => setState({ checked: true })}>
              Enable
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => setState({ checked: false })}>
              Disable
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
