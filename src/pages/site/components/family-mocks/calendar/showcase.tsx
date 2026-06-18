import { Badge, Button } from "@/index"

import type { FamilyDemoProps } from "../types"

export function CalendarFamilyShowcase({ state, setState }: FamilyDemoProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[22px] border border-zinc-200 bg-white p-4">
          <p className="font-medium">Selected reporting window</p>
          <p className="mt-2 text-sm text-zinc-500">June 1 - June 18, 2026</p>
          <div className="mt-4 flex gap-2">
            <Badge variant="secondary">Range</Badge>
            <Badge variant="outline">Calendar</Badge>
          </div>
        </div>
        <div className="rounded-[22px] border border-zinc-200 bg-white p-4">
          <p className="font-medium">Booking slot</p>
          <p className="mt-2 text-sm text-zinc-500">{`Step-linked selection state: ${state.step}`}</p>
          <Button className="mt-4" onClick={() => setState({ step: state.step === 4 ? 1 : state.step + 1 })}>Advance date step</Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 rounded-[22px] border border-zinc-200 bg-zinc-50 p-4 text-center text-sm text-zinc-600">
        {Array.from({ length: 28 }).map((_, index) => (
          <div key={index} className={`rounded-xl px-2 py-3 ${index === 11 || index === 12 || index === 13 ? "bg-zinc-950 text-white" : "bg-white"}`}>
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}

