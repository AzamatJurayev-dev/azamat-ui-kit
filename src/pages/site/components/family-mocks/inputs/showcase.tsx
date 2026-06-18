import * as React from "react"

import { Badge, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Textarea } from "@/index"

import type { FamilyDemoProps } from "../types"

export function InputsFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const [asyncState, setAsyncState] = React.useState<"idle" | "loading" | "ready">("idle")
  const asyncOptions = [
    "Acme Dashboard",
    "CRM Workspace",
    "Store Command",
    "Finance Dock",
    "Creator Hub",
  ].filter((item) => item.toLowerCase().includes(state.search.toLowerCase()))

  return (
    <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4 rounded-[22px] border border-zinc-200 bg-white p-4">
        <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-medium text-zinc-900">Async select / search flow</p>
          <p className="mt-2 text-sm leading-6 text-zinc-500">Search term, loading state, result list and selected mode should all be visible in docs.</p>
          <div className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]">
            <Input value={state.search} onChange={(event) => setState({ search: event.target.value })} placeholder="Search workspaces..." />
            <button onClick={() => setAsyncState("loading")} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">Load</button>
            <button onClick={() => setAsyncState("ready")} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">Resolve</button>
          </div>
          <div className="mt-4 rounded-[20px] border border-zinc-200 bg-white p-3">
            {asyncState === "loading" ? (
              <div className="space-y-2">
                {new Array(3).fill(null).map((_, index) => (
                  <div key={index} className="h-10 rounded-xl bg-zinc-100" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {(asyncState === "ready" ? asyncOptions : asyncOptions.slice(0, 2)).map((item, index) => (
                  <div key={item} className={index === 0 ? "rounded-xl bg-zinc-950 px-4 py-3 text-sm text-white" : "rounded-xl border border-zinc-200 px-4 py-3 text-sm text-zinc-700"}>
                    {item}
                  </div>
                ))}
                {!asyncOptions.length ? <div className="rounded-xl border border-dashed border-zinc-200 px-4 py-3 text-sm text-zinc-500">No async results found</div> : null}
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Input defaultValue="$12,480" />
          <Select value={state.density} onValueChange={(value) => setState({ density: value as FamilyDemoProps["state"]["density"] })}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comfortable">Comfortable</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm font-medium text-zinc-900">Selected entity</p>
          <p className="mt-2 text-sm leading-6 text-zinc-500">After async resolution, the chosen item should appear in the field shell and downstream form flow.</p>
          <div className="mt-4 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
            {state.search || "Acme Dashboard"}
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-[22px] border border-zinc-200 bg-white p-4">
        <Textarea value={state.notes} onChange={(event) => setState({ notes: event.target.value })} className="min-h-24" />
        <div className="flex flex-wrap gap-2">
          {["alpha", "beta", "release", "dashboard"].map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
        </div>
        <div className="grid gap-3">
          <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm text-zinc-500">Async state</p>
            <p className="mt-2 text-lg font-semibold text-zinc-950">{asyncState}</p>
          </div>
          <div className="rounded-[20px] border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-sm text-zinc-500">Use cases</p>
            <div className="mt-3 space-y-2 text-sm text-zinc-600">
              <p>Async select for large entity lists</p>
              <p>Combobox-like search and select flow</p>
              <p>Tagging and downstream form hydration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

