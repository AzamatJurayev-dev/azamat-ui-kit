"use client"

import * as React from "react"

import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

export type DataGridColumn<TRow extends Record<string, unknown>> = {
  key: keyof TRow & string
  header: React.ReactNode
  editable?: boolean
  width?: React.CSSProperties["width"]
  render?: (value: TRow[keyof TRow], row: TRow, rowIndex: number) => React.ReactNode
}

export type DataGridProps<TRow extends Record<string, unknown>> = React.ComponentProps<"div"> & {
  columns: DataGridColumn<TRow>[]
  rows: TRow[]
  onRowsChange?: (rows: TRow[]) => void
}

function DataGrid<TRow extends Record<string, unknown>>({ columns, rows, onRowsChange, className, ...props }: DataGridProps<TRow>) {
  const updateCell = (rowIndex: number, key: keyof TRow & string, value: string) => {
    onRowsChange?.(rows.map((row, index) => index === rowIndex ? { ...row, [key]: value } : row))
  }

  return (
    <div data-slot="data-grid" className={cn("overflow-hidden rounded-lg border", className)} {...props}>
      <Table>
        <TableHeader>
          <TableRow>{columns.map((column) => <TableHead key={column.key} style={{ width: column.width }}>{column.header}</TableHead>)}</TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => {
                const value = row[column.key]
                return (
                  <TableCell key={column.key}>
                    {column.editable ? (
                      <Input value={String(value ?? "")} onValueChange={(nextValue) => updateCell(rowIndex, column.key, nextValue)} />
                    ) : column.render ? (
                      column.render(value, row, rowIndex)
                    ) : (
                      String(value ?? "")
                    )}
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { DataGrid }
