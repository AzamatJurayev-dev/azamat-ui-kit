import { Badge, Button, Switch } from "@/index"

import type { ComponentDemoProps } from "../types"

import { switchDemoRows } from "./data"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function SwitchShowcase({ state, setState }: ComponentDemoProps) {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Preferences</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Switches should feel like settings</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              This pattern is for single on/off preferences. The preview should read like a settings page, not a stack of anonymous toggles.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Controlled</Badge>
            <Badge variant="outline" className="rounded-full">Settings</Badge>
            <Badge variant="outline" className="rounded-full">Single preference</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-3">
          {switchDemoRows.map((row, index) => (
            <div key={row.title} className={`${panelClass} flex items-center justify-between gap-4`}>
              <div>
                <p className="font-medium aui-text-strong">{row.title}</p>
                <p className="text-sm aui-text-muted">{row.description}</p>
              </div>
              <Switch checked={index === 0 ? state.switchOn : row.defaultChecked} onCheckedChange={index === 0 ? (switchOn) => setState({ switchOn }) : undefined} defaultChecked={index > 0 ? row.defaultChecked : undefined} />
            </div>
          ))}
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">
              Dark mode sync is {state.switchOn ? "on" : "off"}
            </h4>
            <p className="mt-2 text-sm leading-6 aui-text-muted">
              Switches should show immediate preference feedback without requiring a save button.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => setState({ switchOn: true })}>
              Turn on
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => setState({ switchOn: false })}>
              Turn off
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
