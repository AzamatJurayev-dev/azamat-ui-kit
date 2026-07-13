import * as React from "react"
import type { ChangeEvent } from "react"

import { MailIcon } from "lucide-react"

import { Button, Input } from "@/index"

import type { ComponentDemoProps } from "../types"

import { inputDemoFields } from "./data"

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

export function InputShowcase({ state, setState }: ComponentDemoProps) {
  const searchField = inputDemoFields[0]
  const hasValue = state.textValue.trim().length > 0
  const [activeMode, setActiveMode] = React.useState<"search" | "profile">("search")
  const activeLabel = activeMode === "search" ? searchField.label : "Profile contact"
  const activePlaceholder = activeMode === "search" ? searchField.placeholder : "owner@azamatui.dev"
  const activeType = activeMode === "search" ? "text" : "email"
  const [moneyValue, setMoneyValue] = React.useState<number | null>(1250)
  const [quantityValue, setQuantityValue] = React.useState<number | null>(3)
  const [phoneValue, setPhoneValue] = React.useState("+998 90 123 45 67")
  const [dateValue, setDateValue] = React.useState("2026-07-13")
  const [clearableValue, setClearableValue] = React.useState("Azamat UI")

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Text entry</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">One field should define the rhythm</h3>
            <p className="mt-3 text-sm leading-6 aui-text-muted">Show the real input first, then verify disabled and read-only states around it.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[360px] xl:max-w-[420px]">
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Mode</p>
              <p className="mt-2 text-lg font-semibold capitalize aui-text-strong">{activeMode}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Value</p>
              <p className="mt-2 truncate text-lg font-semibold aui-text-strong">{hasValue ? state.textValue : "Empty"}</p>
            </div>
            <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">State</p>
              <p className="mt-2 text-lg font-semibold aui-text-strong">{hasValue ? "Filled" : "Ready"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button size="sm" variant={activeMode === "search" ? "default" : "outline"} onClick={() => setActiveMode("search")}>
            Search field
          </Button>
          <Button size="sm" variant={activeMode === "profile" ? "default" : "outline"} onClick={() => setActiveMode("profile")}>
            Email field
          </Button>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Primary field</p>
              <h4 className="mt-2 text-xl font-semibold tracking-tight aui-text-strong">
                {activeMode === "search" ? "Search-driven input" : "Profile contact field"}
              </h4>
            </div>

            <div className="rounded-[20px] border border-[color:var(--aui-divider)] p-4">
              <p className="text-sm font-medium aui-text-muted">{activeLabel}</p>
              <div className="mt-3">
                <Input
                  aria-label={activeLabel}
                  value={state.textValue}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setState({ textValue: event.target.value })}
                  placeholder={activePlaceholder}
                  type={activeType}
                  kind={activeMode === "search" ? "search" : "text"}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
                <p className="text-xs aui-text-muted">Email sample</p>
                <div className="mt-2">
                  <Input defaultValue={inputDemoFields[1].defaultValue} type="email" aria-label={inputDemoFields[1].label} />
                </div>
              </div>
              <div className="rounded-[18px] border border-[color:var(--aui-divider)] px-4 py-3">
                <p className="text-xs aui-text-muted">Disabled sample</p>
                <div className="mt-2">
                  <Input value={inputDemoFields[2].defaultValue} disabled aria-label={inputDemoFields[2].label} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <MailIcon className="size-4 aui-text-muted" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Read only</p>
                <p className="mt-1 text-sm aui-text-muted">{inputDemoFields[3].label}</p>
              </div>
            </div>

            <Input defaultValue={inputDemoFields[3].defaultValue} readOnly aria-label={inputDemoFields[3].label} />

            <div className="border-y border-[color:var(--aui-divider)]">
              {[
                "Default field should stay legible before any decorators or wrappers are added.",
                "Disabled state should look intentionally inactive without losing structure.",
                "Read-only fields must remain easy to scan and copy.",
                "Avoid extra shells when the real input already provides the right chrome.",
              ].map((note) => (
                <div key={note} className="border-b border-[color:var(--aui-divider)] py-3 text-sm leading-6 aui-text-muted last:border-b-0">
                  {note}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              <Button type="button" size="sm" onClick={() => setState({ textValue: "Dashboard" })}>
                Fill sample
              </Button>
              <Button type="button" size="sm" variant="outline" onClick={() => setState({ textValue: "finance@azamat.dev" })}>
                Email sample
              </Button>
              <Button type="button" size="sm" variant="secondary" onClick={() => setState({ textValue: "" })}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass} data-slot="input-kind-showcase">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] aui-text-muted">Unified kind API</p>
          <h4 className="mt-2 text-xl font-semibold tracking-tight aui-text-strong">One import, every production input</h4>
          <p className="mt-2 text-sm leading-6 aui-text-muted">
            Change only the <code>kind</code> prop. Validation, disabled state, value callbacks and keyboard behavior stay in the same public component.
          </p>
        </div>

        <div className="mt-6 grid gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-3">
          <label className="grid gap-2 text-sm font-medium aui-text-strong">
            Password
            <Input kind="password" defaultValue="tembro-2026" autoComplete="current-password" />
            <span className="text-xs font-normal aui-text-muted">Built-in visibility toggle and caps-lock feedback.</span>
          </label>

          <label className="grid gap-2 text-sm font-medium aui-text-strong">
            Numeric threshold
            <Input kind="number" defaultValue={24} min={0} max={100} step={1} />
            <span className="text-xs font-normal aui-text-muted">Native limits with normalized numeric callbacks.</span>
          </label>

          <label className="grid gap-2 text-sm font-medium aui-text-strong">
            Budget
            <Input kind="money" value={moneyValue} onValueChange={setMoneyValue} prefix="$" suffix="USD" />
            <span className="text-xs font-normal aui-text-muted">Current value: {moneyValue ?? "empty"}</span>
          </label>

          <label className="grid gap-2 text-sm font-medium aui-text-strong">
            Phone
            <Input kind="phone" value={phoneValue} onValueChange={setPhoneValue} />
            <span className="text-xs font-normal aui-text-muted">Normalized value: {phoneValue || "empty"}</span>
          </label>

          <label className="grid gap-2 text-sm font-medium aui-text-strong">
            Release date
            <Input kind="date" value={dateValue} onValueChange={setDateValue} />
            <span className="text-xs font-normal aui-text-muted">ISO value: {dateValue || "empty"}</span>
          </label>

          <label className="grid gap-2 text-sm font-medium aui-text-strong">
            Seats
            <Input kind="quantity" value={quantityValue} onValueChange={setQuantityValue} min={1} max={12} />
            <span className="text-xs font-normal aui-text-muted">Use the buttons or type a value directly.</span>
          </label>
        </div>

        <div className="mt-6 border-t border-[color:var(--aui-divider)] pt-5">
          <label className="grid max-w-xl gap-2 text-sm font-medium aui-text-strong">
            Clearable project name
            <Input
              kind="clearable"
              value={clearableValue}
              onValueChange={setClearableValue}
              placeholder="Enter a project name"
              clearOnEscape
            />
            <span className="text-xs font-normal aui-text-muted">Use the clear control or press Escape while the field is focused.</span>
          </label>
        </div>
      </section>
    </div>
  )
}
