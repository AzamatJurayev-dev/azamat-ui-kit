import * as React from "react"

import { Badge, PasswordInput } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function PasswordInputShowcase({ mode }: ComponentDemoProps) {
  const [password, setPassword] = React.useState("")
  const [visible, setVisible] = React.useState(false)

  const strength =
    password.length >= 12 ? "Strong"
      : password.length >= 8 ? "Good"
        : password.length >= 1 ? "Weak"
          : "Empty"

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Sensitive field</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">PasswordInput should reduce mistakes in high-friction moments</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              The control should keep visibility, warnings, and state feedback inside one clean field instead of pushing users into extra UI.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Visibility toggle</Badge>
            <Badge variant="outline" className="rounded-full">Caps Lock aware</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <PasswordInput
          value={password}
          onValueChange={setPassword}
          visible={visible}
          onVisibleChange={setVisible}
          placeholder="Enter workspace password"
          showCapsLockWarning
        />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Field state</p>
          <div className="mt-4 space-y-2 text-sm leading-6 aui-text-muted">
            <p>Length: <span className="font-medium aui-text-strong">{password.length}</span></p>
            <p>Visibility: <span className="font-medium aui-text-strong">{visible ? "visible" : "hidden"}</span></p>
            <p>Strength: <span className="font-medium aui-text-strong">{strength}</span></p>
          </div>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Usage note</p>
          <p className="mt-4 text-sm leading-6 aui-text-muted">
            Password fields should be operational and quiet. The user should not need a second component just to show, hide, or understand entry state.
          </p>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">Desktopda Caps Lock yoqib ko‘rsangiz warning ham shu field ichida ko‘rinadi.</p>
        </section>
      ) : null}
    </div>
  )
}
