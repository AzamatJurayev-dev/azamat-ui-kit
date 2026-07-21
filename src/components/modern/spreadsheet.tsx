"use client"

import * as React from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type SpreadsheetColumn = {
  key: string
  label: React.ReactNode
  width?: number | string
  align?: "left" | "center" | "right"
  readOnly?: boolean
  formatter?: (value: string, row: SpreadsheetRow) => React.ReactNode
}

export type SpreadsheetRow = {
  key: string
  cells: Record<string, string>
  readOnly?: boolean
}

export type SpreadsheetSelection = {
  rowKey: string
  columnKey: string
}

export type SpreadsheetProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  columns: SpreadsheetColumn[]
  rows?: SpreadsheetRow[]
  defaultRows?: SpreadsheetRow[]
  onRowsChange?: (rows: SpreadsheetRow[], selection?: SpreadsheetSelection) => void
  onCellChange?: (value: string, selection: SpreadsheetSelection, rows: SpreadsheetRow[]) => void
  selectedCell?: SpreadsheetSelection
  defaultSelectedCell?: SpreadsheetSelection
  onSelectedCellChange?: (selection: SpreadsheetSelection) => void
  readOnly?: boolean
  showRowNumbers?: boolean
  showAddRow?: boolean
  addRowLabel?: React.ReactNode
  empty?: React.ReactNode
}

function alignClassName(align: SpreadsheetColumn["align"]) {
  if (align === "center") return "text-center"
  if (align === "right") return "text-right"
  return "text-left"
}

function createEmptyRow(columns: SpreadsheetColumn[], index: number): SpreadsheetRow {
  return {
    key: `row-${Date.now()}-${index}`,
    cells: Object.fromEntries(columns.map((column) => [column.key, ""])),
  }
}

function Spreadsheet({
  columns,
  rows: rowsProp,
  defaultRows = [],
  onRowsChange,
  onCellChange,
  selectedCell,
  defaultSelectedCell,
  onSelectedCellChange,
  readOnly = false,
  showRowNumbers = true,
  showAddRow = true,
  addRowLabel = "Add row",
  empty = "No rows yet.",
  className,
  ...props
}: SpreadsheetProps) {
  const [internalRows, setInternalRows] = React.useState(defaultRows)
  const [internalSelectedCell, setInternalSelectedCell] = React.useState<SpreadsheetSelection | undefined>(defaultSelectedCell)
  const rows = rowsProp ?? internalRows
  const activeCell = selectedCell ?? internalSelectedCell

  const commitRows = (nextRows: SpreadsheetRow[], selection?: SpreadsheetSelection) => {
    if (rowsProp === undefined) setInternalRows(nextRows)
    onRowsChange?.(nextRows, selection)
  }

  const selectCell = (selection: SpreadsheetSelection) => {
    if (selectedCell === undefined) setInternalSelectedCell(selection)
    onSelectedCellChange?.(selection)
  }

  const updateCell = (selection: SpreadsheetSelection, value: string) => {
    const nextRows = rows.map((row) => row.key === selection.rowKey ? { ...row, cells: { ...row.cells, [selection.columnKey]: value } } : row)
    commitRows(nextRows, selection)
    onCellChange?.(value, selection, nextRows)
  }

  const addRow = () => {
    const nextRows = [...rows, createEmptyRow(columns, rows.length + 1)]
    commitRows(nextRows)
  }

  return (
    <div data-slot="spreadsheet" className={cn("grid min-w-0 gap-3 rounded-lg border bg-card p-3 shadow-sm", className)} {...props}>
      <div className="overflow-auto rounded-lg border">
        <table className="w-full min-w-[48rem] border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-muted/80 backdrop-blur">
            <tr>
              {showRowNumbers ? <th className="w-12 border-b border-r px-3 py-2 text-left text-xs font-medium text-muted-foreground">#</th> : null}
              {columns.map((column) => (
                <th key={column.key} className={cn("border-b border-r px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground last:border-r-0", alignClassName(column.align))} style={{ width: column.width }}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? rows.map((row, rowIndex) => (
              <tr key={row.key} data-readonly={row.readOnly || undefined} className="odd:bg-background even:bg-muted/18">
                {showRowNumbers ? <th className="border-r px-3 py-1.5 text-left text-xs font-medium text-muted-foreground">{rowIndex + 1}</th> : null}
                {columns.map((column) => {
                  const selection = { rowKey: row.key, columnKey: column.key }
                  const selected = activeCell?.rowKey === row.key && activeCell.columnKey === column.key
                  const value = row.cells[column.key] ?? ""
                  const cellReadOnly = readOnly || row.readOnly || column.readOnly
                  return (
                    <td key={column.key} data-selected={selected || undefined} className="border-r border-t p-0 last:border-r-0 data-[selected=true]:ring-2 data-[selected=true]:ring-inset data-[selected=true]:ring-primary/55">
                      {cellReadOnly && column.formatter ? (
                        <div className={cn("min-h-10 px-3 py-2", alignClassName(column.align))}>{column.formatter(value, row)}</div>
                      ) : (
                        <input
                          aria-label={`${String(column.label)} row ${rowIndex + 1}`}
                          value={value}
                          readOnly={cellReadOnly}
                          className={cn("h-10 w-full bg-transparent px-3 outline-none transition focus:bg-background read-only:cursor-default", alignClassName(column.align))}
                          onFocus={() => selectCell(selection)}
                          onChange={(event) => updateCell(selection, event.target.value)}
                        />
                      )}
                    </td>
                  )
                })}
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + (showRowNumbers ? 1 : 0)} className="h-32 text-center text-sm text-muted-foreground">{empty}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {showAddRow && !readOnly ? <Button type="button" className="w-fit" variant="outline" size="sm" leftIcon={<PlusIcon />} onClick={addRow}>{addRowLabel}</Button> : null}
    </div>
  )
}

export { Spreadsheet }
