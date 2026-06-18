import { Button } from "@/index"

import type { FamilyDemoProps } from "../types"

export function NavigationFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const pages = [1, 2, 3, 8]

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {["Overview", "Analytics", "Reports"].map((item, index) => (
          <button key={item} className={`rounded-2xl border px-5 py-3 text-sm ${index === 0 ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-600"}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-[22px] border border-zinc-200 bg-white px-4 py-3">
        <Button variant="outline" size="sm" onClick={() => setState({ step: Math.max(1, state.step - 1) })}>Prev</Button>
        <div className="flex gap-2">
          {pages.map((page) => (
            <button key={page} onClick={() => setState({ step: page === 8 ? 4 : page })} className={`rounded-xl border px-4 py-2 text-sm ${state.step === (page === 8 ? 4 : page) ? "bg-zinc-950 text-white" : "border-zinc-200 text-zinc-600"}`}>
              {page}
            </button>
          ))}
        </div>
        <Button size="sm" onClick={() => setState({ step: Math.min(4, state.step + 1) })}>Next</Button>
      </div>
    </div>
  )
}

