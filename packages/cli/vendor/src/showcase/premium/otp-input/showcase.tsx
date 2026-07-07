import * as React from "react"

import { Badge, OtpInput } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function OtpInputShowcase({ mode }: ComponentDemoProps) {
  const [code, setCode] = React.useState("")

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Verification input</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">OtpInput should make fixed-code entry feel automatic</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Users should not wrestle with focus or manual cell management. Paste and auto-advance behavior are the main value here.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Auto advance</Badge>
            <Badge variant="outline" className="rounded-full">Paste aware</Badge>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <OtpInput value={code} onValueChange={setCode} length={6} />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Current code</p>
          <p className="mt-3 text-base font-medium aui-text-strong">{code || "No code entered"}</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Usage note</p>
          <p className="mt-3 text-sm leading-6 aui-text-muted">
            Bir martalik tasdiqlash kodlari uchun ishlating. Odatda 4-6 belgili verification yoki 2FA oqimlarida eng foydali.
          </p>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">Clipboarddan 6 xonali kod paste qilib ham tekshirib ko‘ring.</p>
        </section>
      ) : null}
    </div>
  )
}
