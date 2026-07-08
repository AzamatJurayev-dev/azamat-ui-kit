import * as React from "react"

import { Badge, Button, Calendar } from "@/index"

import type { CalendarDateRange } from "@/components/calendar/calendar"

import type { ComponentDemoProps } from "../types"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

const blockedDates = ["2026-07-18", "2026-07-19", "2026-07-25"]

export function CalendarShowcase({ mode }: ComponentDemoProps) {
  const [singleValue, setSingleValue] = React.useState("2026-07-14")
  const [rangeValue, setRangeValue] = React.useState<CalendarDateRange>({ from: "2026-07-10", to: "2026-07-15" })
  const [monthCount, setMonthCount] = React.useState<1 | 2>(2)

  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Date control</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Calendar should feel precise, not decorative</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Real usage needs visible range selection, disabled business dates, and month comparison without clutter. This surface shows all three.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Range mode</Badge>
            <Badge variant="outline" className="rounded-full">Blocked dates</Badge>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Range selection</p>
          <div className="mt-4 overflow-x-auto pb-1">
            <Calendar
              mode="range"
              range={rangeValue}
              onRangeChange={setRangeValue}
              defaultMonth="2026-07-01"
              min="2026-07-01"
              max="2026-08-31"
              disabledDates={blockedDates}
              numberOfMonths={monthCount}
              pagedNavigation
              showClearShortcut
              showTodayShortcut
            />
          </div>
        </section>

        <div className="space-y-4">
          <section className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Single date</p>
            <div className="mt-4 overflow-x-auto pb-1">
              <Calendar
                value={singleValue}
                onValueChange={setSingleValue}
                defaultMonth="2026-07-01"
                min="2026-07-01"
                max="2026-07-31"
                disabledDates={blockedDates}
                showClearShortcut
              />
            </div>
          </section>

          <section className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Selection summary</p>
            <div className="mt-4 space-y-3 text-sm leading-6 aui-text-muted">
              <p>Single: <span className="font-medium aui-text-strong">{singleValue}</span></p>
              <p>Range start: <span className="font-medium aui-text-strong">{rangeValue.from ?? "not selected"}</span></p>
              <p>Range end: <span className="font-medium aui-text-strong">{rangeValue.to ?? "not selected"}</span></p>
            </div>
          </section>
        </div>
      </div>

      {mode === "playground" ? (
        <section className={panelClass}>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant={monthCount === 1 ? "default" : "outline"} onClick={() => setMonthCount(1)}>
              1 month
            </Button>
            <Button size="sm" variant={monthCount === 2 ? "default" : "outline"} onClick={() => setMonthCount(2)}>
              2 months
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSingleValue("2026-07-14")
                setRangeValue({ from: "2026-07-10", to: "2026-07-15" })
              }}
            >
              Reset selection
            </Button>
          </div>
        </section>
      ) : null}
    </div>
  )
}
