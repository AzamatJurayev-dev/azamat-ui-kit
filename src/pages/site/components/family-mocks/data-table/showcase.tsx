import * as React from "react"

import { Badge, Button, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/index"

import type { FamilyDemoProps } from "../types"

import { dataTableDemoRows, dataTableToolbarActions } from "./data"

export function DataTableFamilyShowcase({ state, setState }: FamilyDemoProps) {
  const [selectedInvoices, setSelectedInvoices] = React.useState<string[]>([dataTableDemoRows[0]?.invoice ?? ""])
  const [activeInvoice, setActiveInvoice] = React.useState<string>(dataTableDemoRows[0]?.invoice ?? "")
  const visibleRows = dataTableDemoRows.filter((row) => [row.invoice, row.customer, row.status, row.amount].join(" ").toLowerCase().includes(state.search.toLowerCase()))
  const activeRow = visibleRows.find((row) => row.invoice === activeInvoice) ?? visibleRows[0]

  function toggleInvoice(invoice: string) {
    setSelectedInvoices((current) => (current.includes(invoice) ? current.filter((item) => item !== invoice) : [...current, invoice]))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-[22px] border border-zinc-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
        <Input value={state.search} onChange={(event) => setState({ search: event.target.value })} placeholder="Filter invoices..." className="w-full md:max-w-xs" />
        <div className="flex flex-wrap gap-3">
          {dataTableToolbarActions.map((action) => (
            <Button key={action.label} variant={action.variant}>{action.label}</Button>
          ))}
        </div>
      </div>
      <div className="rounded-[22px] border border-zinc-200 bg-white p-4">
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge variant="outline">{selectedInvoices.length} selected</Badge>
          <Badge variant="outline">Row actions ready</Badge>
          <Badge variant="outline">Mobile cards supported</Badge>
        </div>

        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Pick</TableHead>
                <TableHead>Invoice</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow key={row.invoice} className={activeInvoice === row.invoice ? "bg-zinc-50" : undefined} onClick={() => setActiveInvoice(row.invoice)}>
                  <TableCell>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        toggleInvoice(row.invoice)
                      }}
                      className={selectedInvoices.includes(row.invoice) ? "rounded-lg bg-zinc-950 px-2 py-1 text-xs text-white" : "rounded-lg border border-zinc-200 px-2 py-1 text-xs text-zinc-600"}
                    >
                      {selectedInvoices.includes(row.invoice) ? "On" : "Off"}
                    </button>
                  </TableCell>
                  <TableCell>{row.invoice}</TableCell>
                  <TableCell>{row.customer}</TableCell>
                  <TableCell><Badge variant={row.status === "Paid" ? "secondary" : row.status === "Review" ? "outline" : "destructive"}>{row.status}</Badge></TableCell>
                  <TableCell className="text-right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="grid gap-3 md:hidden">
          {visibleRows.map((row) => (
            <button
              key={row.invoice}
              type="button"
              onClick={() => setActiveInvoice(row.invoice)}
              className={activeInvoice === row.invoice ? "rounded-[20px] border border-zinc-950 bg-zinc-950 p-4 text-left text-white" : "rounded-[20px] border border-zinc-200 bg-zinc-50 p-4 text-left"}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{row.invoice}</p>
                  <p className={activeInvoice === row.invoice ? "mt-1 text-sm text-white/70" : "mt-1 text-sm text-zinc-500"}>{row.customer}</p>
                </div>
                <Badge variant={activeInvoice === row.invoice ? "secondary" : row.status === "Paid" ? "secondary" : row.status === "Review" ? "outline" : "destructive"}>{row.status}</Badge>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={activeInvoice === row.invoice ? "text-sm text-white/70" : "text-sm text-zinc-500"}>Amount</span>
                <span className="font-semibold">{row.amount}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Active row</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">{activeRow?.invoice ?? "No row"}</p>
          <p className="mt-2 text-sm text-zinc-600">{activeRow?.customer}</p>
        </div>
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Selection mode</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">Bulk actions</p>
          <p className="mt-2 text-sm text-zinc-600">{selectedInvoices.length} invoices can be exported or archived together.</p>
        </div>
        <div className="rounded-[22px] border border-zinc-200 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-500">Mobile strategy</p>
          <p className="mt-2 text-lg font-semibold text-zinc-950">Table to cards</p>
          <p className="mt-2 text-sm text-zinc-600">Narrow screens collapse rows into actionable stacked cards.</p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-[22px] border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
        <span>{visibleRows.length} rows visible</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Prev</Button>
          <Button size="sm">Next</Button>
        </div>
      </div>
    </div>
  )
}
