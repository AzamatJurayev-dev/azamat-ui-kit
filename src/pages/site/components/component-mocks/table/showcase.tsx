import * as React from "react"

import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/index"

import type { ComponentDemoProps } from "../types"

import { tableDemoRows, tableDemoStats } from "./data"

export function TableShowcase({ mode }: ComponentDemoProps) {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([tableDemoRows[0]?.id ?? ""])
  const [activeRowId, setActiveRowId] = React.useState<string>(tableDemoRows[0]?.id ?? "")

  function toggleRow(id: string) {
    setSelectedIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  const activeRow = tableDemoRows.find((row) => row.id === activeRowId) ?? tableDemoRows[0]

  return (
    <div className="space-y-5">
      {mode === "playground" ? (
        <div className="grid gap-3 md:grid-cols-3">
          {tableDemoStats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm text-zinc-500">{item.label}</p>
              <p className="mt-2 text-lg font-semibold text-zinc-950">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{item.note}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="rounded-[24px] border border-zinc-200 bg-white p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{selectedIds.length} selected</Badge>
            <Badge variant="outline">Row click enabled</Badge>
            <Badge variant="outline">Mobile cards ready</Badge>
          </div>
          {mode === "playground" ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedIds(tableDemoRows.slice(0, 2).map((row) => row.id))}>Select top 2</Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedIds([])}>Clear</Button>
            </div>
          ) : null}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Pick</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Device</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableDemoRows.map((row) => {
                const selected = selectedIds.includes(row.id)
                const active = activeRowId === row.id

                return (
                  <TableRow
                    key={row.id}
                    className={active ? "bg-zinc-50" : undefined}
                    onClick={() => setActiveRowId(row.id)}
                  >
                    <TableCell>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleRow(row.id)
                        }}
                        className={selected ? "rounded-lg bg-zinc-950 px-2 py-1 text-xs text-white" : "rounded-lg border border-zinc-200 px-2 py-1 text-xs text-zinc-600"}
                      >
                        {selected ? "On" : "Off"}
                      </button>
                    </TableCell>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>
                      <Badge variant={row.status === "Live" ? "default" : row.status === "Review" ? "secondary" : "outline"}>{row.status}</Badge>
                    </TableCell>
                    <TableCell>{row.owner}</TableCell>
                    <TableCell>{row.device}</TableCell>
                    <TableCell className="text-right">{row.revenue}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-3 md:hidden">
          {tableDemoRows.map((row) => {
            const selected = selectedIds.includes(row.id)
            const active = activeRowId === row.id

            return (
              <button
                key={row.id}
                type="button"
                onClick={() => setActiveRowId(row.id)}
                className={active ? "rounded-[20px] border border-zinc-950 bg-zinc-950 p-4 text-left text-white" : "rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-left"}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{row.name}</p>
                    <p className={active ? "mt-1 text-sm text-white/70" : "mt-1 text-sm text-zinc-500"}>{row.owner} • {row.device}</p>
                  </div>
                  <Badge variant={active ? "secondary" : row.status === "Live" ? "default" : row.status === "Review" ? "secondary" : "outline"}>{row.status}</Badge>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className={active ? "text-sm text-white/70" : "text-sm text-zinc-500"}>Revenue</span>
                  <span className="font-semibold">{row.revenue}</span>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      toggleRow(row.id)
                    }}
                    className={selected ? "rounded-xl bg-white px-3 py-2 text-sm text-zinc-950" : active ? "rounded-xl border border-white/20 px-3 py-2 text-sm text-white" : "rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"}
                  >
                    {selected ? "Selected" : "Select row"}
                  </button>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-sm font-medium text-zinc-900">Active row details</p>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <div className="rounded-2xl bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Project</p>
            <p className="mt-2 text-sm font-medium text-zinc-900">{activeRow?.name}</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Owner</p>
            <p className="mt-2 text-sm font-medium text-zinc-900">{activeRow?.owner}</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Device</p>
            <p className="mt-2 text-sm font-medium text-zinc-900">{activeRow?.device}</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Revenue</p>
            <p className="mt-2 text-sm font-medium text-zinc-900">{activeRow?.revenue}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
