import * as React from "react"

import { Badge, RangeSlider, Slider } from "@/index"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function SliderShowcase({ mode }: ComponentDemoProps) {
  const [threshold, setThreshold] = React.useState(72)
  const [range, setRange] = React.useState<[number, number]>([20, 80])

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Range control</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Slider should make thresholds legible, not vague</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use sliders where a continuous range is easier than manual typing. The control needs a visible meaning and clear current value.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Thresholds</Badge>
            <Badge variant="outline" className="rounded-full">Range windows</Badge>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <Slider
            label="Alert threshold"
            description="Raise or lower the score that triggers manual review."
            value={threshold}
            onValueChange={setThreshold}
            showValue
            formatValue={(value) => `${value}%`}
          />
        </section>
        <section className={panelClass}>
          <RangeSlider
            label="Accepted score window"
            description="Only scores inside this range pass automatic approval."
            value={range}
            onValueChange={setRange}
            showValue
            formatValue={(value) => `${value[0]}% - ${value[1]}%`}
          />
        </section>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Current threshold</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{threshold}%</p>
        </section>
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Approval window</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{range[0]}% - {range[1]}%</p>
        </section>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <p className="text-sm aui-text-muted">Thresholdni siljitib, keyin range oynasini toraytirib ko‘ring. Demo mahsulotdagi tuning holatiga yaqin ishlaydi.</p>
        </section>
      ) : null}
    </div>
  )
}
