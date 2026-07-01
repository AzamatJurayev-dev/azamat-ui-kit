import { Badge, Button } from "@/index"

import type { FamilyDemoProps } from "../types"

export function CalendarFamilyShowcase({ state, setState }: FamilyDemoProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
          <p className="aui-text-strong font-medium">Selected reporting window</p>
          <p className="aui-text-muted mt-2 text-sm">June 1 - June 18, 2026</p>
          <div className="mt-4 flex gap-2">
            <Badge variant="secondary">Range</Badge>
            <Badge variant="outline">Calendar</Badge>
          </div>
        </div>
        <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
          <p className="aui-text-strong font-medium">Booking slot</p>
          <p className="aui-text-muted mt-2 text-sm">{`Step-linked selection state: ${state.step}`}</p>
          <Button className="mt-4" onClick={() => setState({ step: state.step === 4 ? 1 : state.step + 1 })}>Advance date step</Button>
        </div>
      </div>
      <div className="aui-text-subtle grid grid-cols-7 gap-2 rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4 text-center text-sm">
        {Array.from({ length: 28 }).map((_, index) => (
          <div key={index} className={`rounded-xl px-2 py-3 ${index === 11 || index === 12 || index === 13 ? "aui-surface-strong" : "bg-[color:var(--aui-page-bg-alt)]"}`}>
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

