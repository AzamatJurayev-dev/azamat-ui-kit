/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import { createUniver, LocaleType, mergeLocales } from "@univerjs/presets"
import { UniverSheetsCorePreset } from "@univerjs/preset-sheets-core"
import UniverPresetSheetsCoreEnUS from "@univerjs/preset-sheets-core/locales/en-US"
import {
  BoldIcon,
  ChevronDownIcon,
  Columns3Icon,
  DownloadIcon,
  FileJsonIcon,
  FileSpreadsheetIcon,
  ItalicIcon,
  LoaderCircleIcon,
  PinIcon,
  PlusIcon,
  Redo2Icon,
  Rows3Icon,
  SaveIcon,
  SearchIcon,
  Trash2Icon,
  Undo2Icon,
  UploadIcon,
} from "lucide-react"

import "@univerjs/preset-sheets-core/lib/index.css"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type SpreadsheetApi = ReturnType<typeof createUniver>["univerAPI"]
export type SpreadsheetWorkbook = Parameters<SpreadsheetApi["createWorkbook"]>[0]
export type SpreadsheetSelectionType = "cell" | "range" | "row" | "column" | "sheet"

export type SpreadsheetSelection = {
  type: SpreadsheetSelectionType
  sheetId: string
  sheetName: string
  a1Notation: string
  startRow: number
  endRow: number
  startColumn: number
  endColumn: number
  rowCount: number
  columnCount: number
  values: unknown[][]
}

export type SpreadsheetSheetInfo = {
  id: string
  name: string
  index: number
  rowCount: number
  columnCount: number
  active: boolean
}

export type SpreadsheetChange = {
  commandId: string
  type?: number
  params?: unknown
  workbookId?: string
  sheetId?: string
  snapshot: SpreadsheetWorkbook | null
}

export type SpreadsheetState = {
  ready: boolean
  readonly: boolean
  workbookId: string | null
  activeSheet: SpreadsheetSheetInfo | null
  sheets: SpreadsheetSheetInfo[]
  selection: SpreadsheetSelection | null
  zoom: number
  dirty: boolean
}

export type SpreadsheetCsvOptions = {
  sheetName?: string
  range?: string
  delimiter?: string
  includeEmptyRows?: boolean
  fileName?: string
}

export type SpreadsheetCsvImportOptions = {
  sheetName?: string
  startCell?: string
  delimiter?: string
  parseNumbers?: boolean
  clearTarget?: boolean
}

export type SpreadsheetActions = {
  focus: () => void
  undo: () => Promise<void>
  redo: () => Promise<void>
  selectRange: (a1Notation: string, sheetName?: string) => void
  selectRows: (startRow: number, count?: number) => void
  selectColumns: (startColumn: number, count?: number) => void
  setActiveCellValue: (value: unknown) => void
  setActiveCellFormula: (formula: string) => void
  insertRows: (startRow?: number, count?: number) => void
  deleteRows: (startRow?: number, count?: number) => void
  insertColumns: (startColumn?: number, count?: number) => void
  deleteColumns: (startColumn?: number, count?: number) => void
  addSheet: (name?: string, rows?: number, columns?: number) => SpreadsheetSheetInfo | null
  deleteActiveSheet: () => void
  activateSheet: (sheetIdOrName: string) => void
  renameActiveSheet: (name: string) => void
  setZoom: (zoom: number) => void
  freezeRows: (count: number) => void
  freezeColumns: (count: number) => void
  clearSelection: () => void
  copySelection: () => Promise<string>
  exportCsv: (options?: SpreadsheetCsvOptions) => string
  downloadCsv: (options?: SpreadsheetCsvOptions) => void
  exportSnapshot: () => SpreadsheetWorkbook | null
  downloadSnapshot: (fileName?: string) => void
  importCsv: (csv: string, options?: SpreadsheetCsvImportOptions) => void
  importCsvFile: (file: File, options?: SpreadsheetCsvImportOptions) => Promise<void>
  markSaved: () => void
}

export type SpreadsheetHandle = SpreadsheetActions & {
  getApi: () => SpreadsheetApi | null
  getState: () => SpreadsheetState
  getSelection: () => SpreadsheetSelection | null
  getWorkbook: () => any | null
  getActiveSheet: () => any | null
  refresh: () => void
}

export type SpreadsheetToolbarContext = SpreadsheetState & {
  api: SpreadsheetApi | null
  actions: SpreadsheetActions
}

export type SpreadsheetStateContent = {
  loading?: React.ReactNode
  error?: React.ReactNode | ((error: Error, retry: () => void) => React.ReactNode)
}

export type SpreadsheetProps = Omit<React.ComponentProps<"div">, "children" | "onChange"> & {
  workbook?: SpreadsheetWorkbook
  resetKey?: React.Key
  locale?: LocaleType
  locales?: Record<string, unknown>
  presets?: unknown[]
  readonly?: boolean
  showToolbar?: boolean
  showFormulaBar?: boolean
  showStatusBar?: boolean
  showSheetTabs?: boolean
  showImportExport?: boolean
  showSelectionSummary?: boolean
  autoFocus?: boolean
  initialSelection?: string
  stateContent?: SpreadsheetStateContent
  toolbar?: React.ReactNode | ((context: SpreadsheetToolbarContext) => React.ReactNode)
  beforeToolbar?: React.ReactNode
  afterToolbar?: React.ReactNode
  overlay?: React.ReactNode
  loading?: React.ReactNode
  viewportClassName?: string
  toolbarClassName?: string
  statusBarClassName?: string
  onReady?: (api: SpreadsheetApi, handle: SpreadsheetHandle) => void
  onError?: (error: Error) => void
  onSelectionChange?: (selection: SpreadsheetSelection | null) => void
  onActiveSheetChange?: (sheet: SpreadsheetSheetInfo | null) => void
  onSheetsChange?: (sheets: SpreadsheetSheetInfo[]) => void
  onChange?: (change: SpreadsheetChange) => void
  onDirtyChange?: (dirty: boolean) => void
  onSave?: (snapshot: SpreadsheetWorkbook | null, state: SpreadsheetState) => void | Promise<void>
  onImportRequest?: (file: File, api: SpreadsheetApi) => void | Promise<void>
  labels?: Partial<Record<
    | "loading" | "retry" | "spreadsheet" | "address" | "formula" | "undo" | "redo"
    | "addRow" | "deleteRow" | "addColumn" | "deleteColumn" | "addSheet" | "deleteSheet"
    | "importCsv" | "exportCsv" | "exportJson" | "save" | "readonly" | "selected"
    | "rows" | "columns" | "cells",
    string
  >>
}

const EMPTY_WORKBOOK = {
  id: "tembro-workbook",
  name: "Workbook",
  sheetOrder: ["sheet-1"],
  sheets: {
    "sheet-1": {
      id: "sheet-1",
      name: "Sheet1",
      rowCount: 100,
      columnCount: 26,
      cellData: {},
    },
  },
} as unknown as SpreadsheetWorkbook

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = fileName
  anchor.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 0)
}

function csvEscape(value: unknown, delimiter: string) {
  const text = value == null ? "" : String(value)
  return text.includes(delimiter) || text.includes("\n") || text.includes('"')
    ? `"${text.replaceAll('"', '""')}"`
    : text
}

function parseCsv(input: string, delimiter = ",") {
  const rows: string[][] = []
  let row: string[] = []
  let field = ""
  let quoted = false

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index]
    if (character === '"') {
      if (quoted && input[index + 1] === '"') {
        field += '"'
        index += 1
      } else quoted = !quoted
    } else if (character === delimiter && !quoted) {
      row.push(field)
      field = ""
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && input[index + 1] === "\n") index += 1
      row.push(field)
      rows.push(row)
      row = []
      field = ""
    } else field += character
  }

  row.push(field)
  if (row.some(Boolean) || rows.length === 0) rows.push(row)
  return rows
}

function normalizeCellValue(value: string, parseNumbers: boolean) {
  if (!parseNumbers) return value
  const trimmed = value.trim()
  if (trimmed === "") return ""
  if (/^-?\d+(\.\d+)?$/.test(trimmed)) return Number(trimmed)
  if (trimmed.toLowerCase() === "true") return true
  if (trimmed.toLowerCase() === "false") return false
  return value
}

function getWorkbookSnapshot(api: SpreadsheetApi | null): SpreadsheetWorkbook | null {
  const workbook = (api as any)?.getActiveWorkbook?.()
  return (workbook?.save?.() ?? workbook?.getWorkbook?.()?.getSnapshot?.() ?? null) as SpreadsheetWorkbook | null
}

function getSheetInfo(sheet: any, index: number, activeSheetId?: string): SpreadsheetSheetInfo {
  const id = sheet.getSheetId?.() ?? sheet.getId?.() ?? `sheet-${index}`
  return {
    id,
    name: sheet.getName?.() ?? sheet.getSheetName?.() ?? `Sheet${index + 1}`,
    index,
    rowCount: sheet.getMaxRows?.() ?? sheet.getRowCount?.() ?? 0,
    columnCount: sheet.getMaxColumns?.() ?? sheet.getColumnCount?.() ?? 0,
    active: id === activeSheetId,
  }
}

function getSelectionSnapshot(api: SpreadsheetApi | null): SpreadsheetSelection | null {
  const sheet = (api as any)?.getActiveWorkbook?.()?.getActiveSheet?.()
  const range = sheet?.getSelection?.()?.getActiveRange?.()
  if (!sheet || !range) return null

  const startRow = range.getRow?.() ?? 0
  const startColumn = range.getColumn?.() ?? 0
  const rowCount = range.getNumRows?.() ?? 1
  const columnCount = range.getNumColumns?.() ?? 1
  const maxRows = sheet.getMaxRows?.() ?? sheet.getRowCount?.() ?? rowCount
  const maxColumns = sheet.getMaxColumns?.() ?? sheet.getColumnCount?.() ?? columnCount
  const type: SpreadsheetSelectionType =
    rowCount >= maxRows && columnCount >= maxColumns ? "sheet"
      : columnCount >= maxColumns ? "row"
        : rowCount >= maxRows ? "column"
          : rowCount === 1 && columnCount === 1 ? "cell" : "range"

  return {
    type,
    sheetId: sheet.getSheetId?.() ?? sheet.getId?.() ?? "",
    sheetName: sheet.getName?.() ?? sheet.getSheetName?.() ?? "Sheet",
    a1Notation: range.getA1Notation?.() ?? "A1",
    startRow,
    endRow: startRow + rowCount - 1,
    startColumn,
    endColumn: startColumn + columnCount - 1,
    rowCount,
    columnCount,
    values: range.getValues?.() ?? [],
  }
}

const Spreadsheet = React.forwardRef<SpreadsheetHandle, SpreadsheetProps>(function Spreadsheet(
  {
    workbook = EMPTY_WORKBOOK,
    resetKey,
    locale = LocaleType.EN_US,
    locales,
    presets,
    readonly = false,
    showToolbar = true,
    showFormulaBar = true,
    showStatusBar = true,
    showSheetTabs = true,
    showImportExport = true,
    showSelectionSummary = true,
    autoFocus = false,
    initialSelection,
    stateContent,
    toolbar,
    beforeToolbar,
    afterToolbar,
    overlay,
    loading,
    className,
    viewportClassName,
    toolbarClassName,
    statusBarClassName,
    onReady,
    onError,
    onSelectionChange,
    onActiveSheetChange,
    onSheetsChange,
    onChange,
    onDirtyChange,
    onSave,
    onImportRequest,
    labels,
    ...props
  },
  forwardedRef
) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const apiRef = React.useRef<SpreadsheetApi | null>(null)
  const actionsRef = React.useRef<SpreadsheetActions>(null as unknown as SpreadsheetActions)
  const stateRef = React.useRef<SpreadsheetState>(null as unknown as SpreadsheetState)
  const selectionRef = React.useRef<SpreadsheetSelection | null>(null)
  const activeSheetRef = React.useRef<SpreadsheetSheetInfo | null>(null)
  const callbacksRef = React.useRef({ onReady, onError, onSelectionChange, onActiveSheetChange, onSheetsChange, onChange, onDirtyChange })
  const [initializing, setInitializing] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)
  const [retryKey, setRetryKey] = React.useState(0)
  const [dirty, setDirty] = React.useState(false)
  const [selection, setSelection] = React.useState<SpreadsheetSelection | null>(null)
  const [sheets, setSheets] = React.useState<SpreadsheetSheetInfo[]>([])
  const [activeSheet, setActiveSheet] = React.useState<SpreadsheetSheetInfo | null>(null)
  const [zoom, setZoomState] = React.useState(1)
  const [address, setAddress] = React.useState(initialSelection ?? "A1")
  const [formulaValue, setFormulaValue] = React.useState("")

  React.useEffect(() => {
    callbacksRef.current = { onReady, onError, onSelectionChange, onActiveSheetChange, onSheetsChange, onChange, onDirtyChange }
  }, [onActiveSheetChange, onChange, onDirtyChange, onError, onReady, onSelectionChange, onSheetsChange])

  const markDirty = React.useCallback((value: boolean) => {
    setDirty(value)
    callbacksRef.current.onDirtyChange?.(value)
  }, [])

  const readSheets = React.useCallback(() => {
    const workbookFacade = (apiRef.current as any)?.getActiveWorkbook?.()
    const active = workbookFacade?.getActiveSheet?.()
    const activeId = active?.getSheetId?.() ?? active?.getId?.()
    const nextSheets = (workbookFacade?.getSheets?.() ?? []).map((sheet: any, index: number) => getSheetInfo(sheet, index, activeId))
    const nextActive = nextSheets.find((sheet) => sheet.active) ?? null
    activeSheetRef.current = nextActive
    setSheets(nextSheets)
    setActiveSheet(nextActive)
    callbacksRef.current.onSheetsChange?.(nextSheets)
    callbacksRef.current.onActiveSheetChange?.(nextActive)
    return nextSheets
  }, [])

  const readSelection = React.useCallback(() => {
    const next = getSelectionSnapshot(apiRef.current)
    selectionRef.current = next
    setSelection(next)
    if (next) {
      setAddress(next.a1Notation)
      const range = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.getSelection?.()?.getActiveRange?.()
      const value = range?.getFormula?.() ?? range?.getValue?.() ?? ""
      setFormulaValue(value == null ? "" : String(value))
    }
    callbacksRef.current.onSelectionChange?.(next)
    return next
  }, [])

  const exportCsvInternal = React.useCallback((options: SpreadsheetCsvOptions = {}) => {
    const workbookFacade = (apiRef.current as any)?.getActiveWorkbook?.()
    const sheet = options.sheetName
      ? workbookFacade?.getSheets?.().find((item: any) => (item.getName?.() ?? item.getSheetName?.()) === options.sheetName)
      : workbookFacade?.getActiveSheet?.()
    const delimiter = options.delimiter ?? ","
    const range = options.range ? sheet?.getRange?.(options.range) : sheet?.getDataRange?.()
    const values: unknown[][] = range?.getValues?.() ?? []
    const rows = options.includeEmptyRows ? values : values.filter((row) => row.some((value) => value != null && value !== ""))
    return rows.map((row) => row.map((value) => csvEscape(value, delimiter)).join(delimiter)).join("\n")
  }, [])

  const importCsvInternal = React.useCallback((csv: string, options: SpreadsheetCsvImportOptions = {}) => {
    const workbookFacade = (apiRef.current as any)?.getActiveWorkbook?.()
    const sheet = options.sheetName
      ? workbookFacade?.getSheets?.().find((item: any) => (item.getName?.() ?? item.getSheetName?.()) === options.sheetName)
      : workbookFacade?.getActiveSheet?.()
    const rows = parseCsv(csv, options.delimiter ?? ",").map((row) => row.map((value) => normalizeCellValue(value, options.parseNumbers ?? true)))
    if (!sheet || rows.length === 0) return
    const startRange = sheet.getRange?.(options.startCell ?? "A1")
    const startRow = startRange?.getRow?.() ?? 0
    const startColumn = startRange?.getColumn?.() ?? 0
    const width = Math.max(...rows.map((row) => row.length))
    const matrix = rows.map((row) => [...row, ...Array(Math.max(0, width - row.length)).fill("")])
    const target = sheet.getRange?.(startRow, startColumn, matrix.length, width)
    if (options.clearTarget) target?.clearContent?.()
    target?.setValues?.(matrix)
    target?.activate?.()
    readSelection()
  }, [readSelection])

  const actions = React.useMemo<SpreadsheetActions>(() => ({
    focus: () => rootRef.current?.focus(),
    undo: async () => {
      const api = apiRef.current as any
      if (api?.undo) await api.undo()
      else await api?.executeCommand?.("core.command.undo")
    },
    redo: async () => {
      const api = apiRef.current as any
      if (api?.redo) await api.redo()
      else await api?.executeCommand?.("core.command.redo")
    },
    selectRange: (notation, sheetName) => {
      const workbookFacade = (apiRef.current as any)?.getActiveWorkbook?.()
      const sheet = sheetName
        ? workbookFacade?.getSheets?.().find((item: any) => (item.getName?.() ?? item.getSheetName?.()) === sheetName)
        : workbookFacade?.getActiveSheet?.()
      sheet?.getRange?.(notation)?.activate?.()
      readSelection()
    },
    selectRows: (startRow, count = 1) => {
      const sheet = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()
      const columns = sheet?.getMaxColumns?.() ?? sheet?.getColumnCount?.() ?? 26
      sheet?.getRange?.(Math.max(0, startRow), 0, Math.max(1, count), columns)?.activate?.()
      readSelection()
    },
    selectColumns: (startColumn, count = 1) => {
      const sheet = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()
      const rows = sheet?.getMaxRows?.() ?? sheet?.getRowCount?.() ?? 100
      sheet?.getRange?.(0, Math.max(0, startColumn), rows, Math.max(1, count))?.activate?.()
      readSelection()
    },
    setActiveCellValue: (value) => (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.getSelection?.()?.getActiveRange?.()?.setValue?.(value),
    setActiveCellFormula: (formula) => {
      const range = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.getSelection?.()?.getActiveRange?.()
      if (formula.startsWith("=")) range?.setFormula?.(formula)
      else range?.setValue?.(formula)
    },
    insertRows: (startRow, count = 1) => {
      const sheet = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()
      sheet?.insertRows?.(startRow ?? selectionRef.current?.startRow ?? 0, Math.max(1, count))
      readSheets()
    },
    deleteRows: (startRow, count = 1) => {
      const sheet = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()
      sheet?.deleteRows?.(startRow ?? selectionRef.current?.startRow ?? 0, Math.max(1, count))
      readSheets()
    },
    insertColumns: (startColumn, count = 1) => {
      const sheet = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()
      sheet?.insertColumns?.(startColumn ?? selectionRef.current?.startColumn ?? 0, Math.max(1, count))
      readSheets()
    },
    deleteColumns: (startColumn, count = 1) => {
      const sheet = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()
      sheet?.deleteColumns?.(startColumn ?? selectionRef.current?.startColumn ?? 0, Math.max(1, count))
      readSheets()
    },
    addSheet: (name, rows = 100, columns = 26) => {
      const workbookFacade = (apiRef.current as any)?.getActiveWorkbook?.()
      const nextName = name || `Sheet${(workbookFacade?.getSheets?.().length ?? 0) + 1}`
      const sheet = workbookFacade?.create?.(nextName, rows, columns)
      readSheets()
      return sheet ? getSheetInfo(sheet, (workbookFacade?.getSheets?.().length ?? 1) - 1, sheet.getSheetId?.()) : null
    },
    deleteActiveSheet: () => {
      const workbookFacade = (apiRef.current as any)?.getActiveWorkbook?.()
      if ((workbookFacade?.getSheets?.().length ?? 0) <= 1) return
      workbookFacade?.deleteSheet?.(workbookFacade.getActiveSheet?.())
      readSheets()
    },
    activateSheet: (idOrName) => {
      const workbookFacade = (apiRef.current as any)?.getActiveWorkbook?.()
      const sheet = workbookFacade?.getSheets?.().find((item: any) => [item.getSheetId?.(), item.getId?.(), item.getName?.(), item.getSheetName?.()].includes(idOrName))
      sheet?.activate?.()
      readSheets()
      readSelection()
    },
    renameActiveSheet: (name) => {
      ;(apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.setName?.(name)
      readSheets()
    },
    setZoom: (nextZoom) => {
      const normalized = Math.min(4, Math.max(0.25, nextZoom))
      ;(apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.zoom?.(normalized)
      setZoomState(normalized)
    },
    freezeRows: (count) => {
      const sheet = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()
      const freeze = sheet?.getFreeze?.()
      if (freeze?.setFreezeRows) freeze.setFreezeRows(Math.max(0, count))
      else sheet?.setFrozenRows?.(Math.max(0, count))
    },
    freezeColumns: (count) => {
      const sheet = (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()
      const freeze = sheet?.getFreeze?.()
      if (freeze?.setFreezeColumns) freeze.setFreezeColumns(Math.max(0, count))
      else sheet?.setFrozenColumns?.(Math.max(0, count))
    },
    clearSelection: () => (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.getSelection?.()?.getActiveRange?.()?.clearContent?.(),
    copySelection: async () => {
      const values = getSelectionSnapshot(apiRef.current)?.values ?? []
      const text = values.map((row) => row.map((value) => value == null ? "" : String(value)).join("\t")).join("\n")
      await navigator.clipboard?.writeText(text)
      return text
    },
    exportCsv: exportCsvInternal,
    downloadCsv: (options = {}) => {
      const csv = exportCsvInternal(options)
      downloadBlob(new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" }), options.fileName ?? `${activeSheetRef.current?.name ?? "sheet"}.csv`)
    },
    exportSnapshot: () => getWorkbookSnapshot(apiRef.current),
    downloadSnapshot: (fileName = "workbook.json") => downloadBlob(new Blob([JSON.stringify(getWorkbookSnapshot(apiRef.current), null, 2)], { type: "application/json" }), fileName),
    importCsv: importCsvInternal,
    importCsvFile: async (file, options = {}) => importCsvInternal(await file.text(), options),
    markSaved: () => markDirty(false),
  }), [exportCsvInternal, importCsvInternal, markDirty, readSelection, readSheets])

  actionsRef.current = actions

  const state = React.useMemo<SpreadsheetState>(() => ({
    ready: !initializing && !error,
    readonly,
    workbookId: ((apiRef.current as any)?.getActiveWorkbook?.()?.getId?.() ?? null),
    activeSheet,
    sheets,
    selection,
    zoom,
    dirty,
  }), [activeSheet, dirty, error, initializing, readonly, selection, sheets, zoom])

  stateRef.current = state

  React.useImperativeHandle(forwardedRef, () => ({
    ...actions,
    getApi: () => apiRef.current,
    getState: () => stateRef.current,
    getSelection: () => getSelectionSnapshot(apiRef.current),
    getWorkbook: () => (apiRef.current as any)?.getActiveWorkbook?.() ?? null,
    getActiveSheet: () => (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.() ?? null,
    refresh: () => (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.refreshCanvas?.(),
  }), [actions])

  React.useEffect(() => {
    if (!containerRef.current) return
    setInitializing(true)
    setError(null)
    const disposables: Array<{ dispose?: () => void } | undefined> = []

    try {
      const { univerAPI } = createUniver({
        locale,
        locales: { [LocaleType.EN_US]: mergeLocales(UniverPresetSheetsCoreEnUS), ...(locales ?? {}) },
        presets: [UniverSheetsCorePreset({ container: containerRef.current }), ...((presets ?? []) as any[])],
      })
      apiRef.current = univerAPI
      const workbookFacade = univerAPI.createWorkbook(workbook)
      if (readonly) workbookFacade?.disableSelection?.()
      if (initialSelection) workbookFacade?.getActiveSheet?.()?.getRange?.(initialSelection)?.activate?.()

      const selectionEvent = (univerAPI as any).Event?.SelectionChanged
      const valueEvent = (univerAPI as any).Event?.SheetValueChanged
      const sheetEvent = (univerAPI as any).Event?.ActiveSheetChanged
      if (selectionEvent) disposables.push((univerAPI as any).addEvent(selectionEvent, readSelection))
      if (valueEvent) disposables.push((univerAPI as any).addEvent(valueEvent, (params: unknown) => {
        markDirty(true)
        callbacksRef.current.onChange?.({
          commandId: "sheet.value.changed",
          params,
          workbookId: (univerAPI as any).getActiveWorkbook?.()?.getId?.(),
          sheetId: (univerAPI as any).getActiveWorkbook?.()?.getActiveSheet?.()?.getSheetId?.(),
          snapshot: getWorkbookSnapshot(univerAPI),
        })
      }))
      if (sheetEvent) disposables.push((univerAPI as any).addEvent(sheetEvent, () => { readSheets(); readSelection() }))
      disposables.push((univerAPI as any).onCommandExecuted?.((command: any) => {
        if (!command?.id || command.id.includes("selection")) return
        markDirty(true)
        callbacksRef.current.onChange?.({
          commandId: command.id,
          type: command.type,
          params: command.params,
          workbookId: (univerAPI as any).getActiveWorkbook?.()?.getId?.(),
          sheetId: (univerAPI as any).getActiveWorkbook?.()?.getActiveSheet?.()?.getSheetId?.(),
          snapshot: getWorkbookSnapshot(univerAPI),
        })
      }))

      readSheets()
      readSelection()
      setZoomState(workbookFacade?.getActiveSheet?.()?.getZoom?.() ?? 1)
      setInitializing(false)
      callbacksRef.current.onReady?.(univerAPI, {
        ...actionsRef.current,
        getApi: () => apiRef.current,
        getState: () => stateRef.current,
        getSelection: () => getSelectionSnapshot(apiRef.current),
        getWorkbook: () => (apiRef.current as any)?.getActiveWorkbook?.() ?? null,
        getActiveSheet: () => (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.() ?? null,
        refresh: () => (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.refreshCanvas?.(),
      })
      if (autoFocus) window.setTimeout(() => rootRef.current?.focus(), 0)

      return () => {
        disposables.forEach((item) => item?.dispose?.())
        apiRef.current = null
        univerAPI.dispose()
      }
    } catch (cause: unknown) {
      const nextError = cause instanceof Error ? cause : new Error("Spreadsheet could not be initialized")
      setError(nextError)
      setInitializing(false)
      callbacksRef.current.onError?.(nextError)
    }
  }, [autoFocus, initialSelection, locale, locales, markDirty, presets, readSelection, readSheets, readonly, resetKey, retryKey, workbook])

  const context = React.useMemo<SpreadsheetToolbarContext>(() => ({ ...state, api: apiRef.current, actions }), [actions, state])
  const toolbarContent = typeof toolbar === "function" ? toolbar(context) : toolbar

  return (
    <div ref={rootRef} tabIndex={-1} data-slot="spreadsheet" data-ready={state.ready || undefined} data-dirty={dirty || undefined} data-readonly={readonly || undefined} className={cn("relative flex min-h-[560px] flex-col overflow-hidden rounded-xl border bg-background", className)} {...props}>
      {showToolbar ? <>{beforeToolbar}{toolbarContent ?? (
        <div data-slot="spreadsheet-toolbar" className={cn("flex flex-wrap items-center gap-1 border-b bg-muted/30 p-2", toolbarClassName)}>
          <Button type="button" variant="ghost" size="icon-sm" title={labels?.undo ?? "Undo"} onClick={() => void actions.undo()} disabled={readonly}><Undo2Icon className="size-4" /></Button>
          <Button type="button" variant="ghost" size="icon-sm" title={labels?.redo ?? "Redo"} onClick={() => void actions.redo()} disabled={readonly}><Redo2Icon className="size-4" /></Button>
          <span className="mx-1 h-6 w-px bg-border" />
          <Button type="button" variant="ghost" size="icon-sm" title="Bold" disabled={readonly} onClick={() => (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.getSelection?.()?.getActiveRange?.()?.setFontWeight?.("bold")}><BoldIcon className="size-4" /></Button>
          <Button type="button" variant="ghost" size="icon-sm" title="Italic" disabled={readonly} onClick={() => (apiRef.current as any)?.getActiveWorkbook?.()?.getActiveSheet?.()?.getSelection?.()?.getActiveRange?.()?.setFontStyle?.("italic")}><ItalicIcon className="size-4" /></Button>
          <span className="mx-1 h-6 w-px bg-border" />
          <Button type="button" variant="ghost" size="sm" title={labels?.addRow ?? "Insert row"} disabled={readonly} onClick={() => actions.insertRows()}><Rows3Icon className="size-4" />+</Button>
          <Button type="button" variant="ghost" size="sm" title={labels?.deleteRow ?? "Delete row"} disabled={readonly} onClick={() => actions.deleteRows()}><Rows3Icon className="size-4" />−</Button>
          <Button type="button" variant="ghost" size="sm" title={labels?.addColumn ?? "Insert column"} disabled={readonly} onClick={() => actions.insertColumns()}><Columns3Icon className="size-4" />+</Button>
          <Button type="button" variant="ghost" size="sm" title={labels?.deleteColumn ?? "Delete column"} disabled={readonly} onClick={() => actions.deleteColumns()}><Columns3Icon className="size-4" />−</Button>
          <Button type="button" variant="ghost" size="icon-sm" title="Freeze first row" onClick={() => actions.freezeRows(1)}><PinIcon className="size-4" /></Button>
          <span className="flex-1" />
          {showImportExport ? <>
            <input ref={fileInputRef} type="file" accept=".csv,text/csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" hidden onChange={(event) => {
              const file = event.target.files?.[0]
              if (!file) return
              if (file.name.toLowerCase().endsWith(".csv")) void actions.importCsvFile(file)
              else if (onImportRequest && apiRef.current) void onImportRequest(file, apiRef.current)
              event.currentTarget.value = ""
            }} />
            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} disabled={readonly}><UploadIcon className="size-4" />{labels?.importCsv ?? "Import"}</Button>
            <div className="relative group">
              <Button type="button" variant="outline" size="sm"><DownloadIcon className="size-4" />Export<ChevronDownIcon className="size-3" /></Button>
              <div className="invisible absolute right-0 top-full z-30 mt-1 min-w-40 rounded-md border bg-popover p-1 opacity-0 shadow-md transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                <button type="button" className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-accent" onClick={() => actions.downloadCsv()}><FileSpreadsheetIcon className="size-4" />{labels?.exportCsv ?? "Download CSV"}</button>
                <button type="button" className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-accent" onClick={() => actions.downloadSnapshot()}><FileJsonIcon className="size-4" />{labels?.exportJson ?? "Download JSON"}</button>
              </div>
            </div>
          </> : null}
          {onSave ? <Button type="button" size="sm" disabled={!dirty} onClick={async () => { await onSave(actions.exportSnapshot(), stateRef.current); actions.markSaved() }}><SaveIcon className="size-4" />{labels?.save ?? "Save"}</Button> : null}
        </div>
      )}{afterToolbar}</> : null}

      {showFormulaBar ? (
        <div data-slot="spreadsheet-formula-bar" className="grid grid-cols-[minmax(76px,120px)_1fr] items-center border-b bg-background">
          <form className="border-r p-1.5" onSubmit={(event) => { event.preventDefault(); if (address.trim()) actions.selectRange(address.trim()) }}>
            <label className="sr-only" htmlFor="spreadsheet-address">{labels?.address ?? "Cell or range"}</label>
            <div className="flex items-center gap-1 rounded border bg-muted/20 px-2"><SearchIcon className="size-3.5 text-muted-foreground" /><input id="spreadsheet-address" value={address} onChange={(event) => setAddress(event.target.value)} className="h-7 min-w-0 flex-1 bg-transparent font-mono text-xs outline-none" /></div>
          </form>
          <form className="flex min-w-0 items-center gap-2 p-1.5" onSubmit={(event) => { event.preventDefault(); actions.setActiveCellFormula(formulaValue) }}>
            <span className="select-none text-xs font-semibold italic text-muted-foreground">fx</span>
            <label className="sr-only" htmlFor="spreadsheet-formula">{labels?.formula ?? "Value or formula"}</label>
            <input id="spreadsheet-formula" value={formulaValue} readOnly={readonly} onChange={(event) => setFormulaValue(event.target.value)} className="h-7 min-w-0 flex-1 bg-transparent text-sm outline-none" placeholder="Enter a value or =SUM(A1:A10)" />
          </form>
        </div>
      ) : null}

      <div className="relative min-h-0 flex-1">
        <div ref={containerRef} data-slot="spreadsheet-viewport" className={cn("h-full min-h-[460px] w-full", viewportClassName)} />
        {overlay}
        {initializing ? <div className="absolute inset-0 grid place-items-center bg-background/80 backdrop-blur-sm" role="status">{stateContent?.loading ?? loading ?? <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircleIcon className="size-4 animate-spin" />{labels?.loading ?? "Loading spreadsheet"}</span>}</div> : null}
        {error ? <div className="absolute inset-0 grid place-items-center bg-background/90 p-6" role="alert">{typeof stateContent?.error === "function" ? stateContent.error(error, () => setRetryKey((value) => value + 1)) : stateContent?.error ?? <div className="max-w-md text-center"><p className="text-sm text-destructive">{error.message}</p><Button type="button" className="mt-4" variant="outline" size="sm" onClick={() => setRetryKey((value) => value + 1)}>{labels?.retry ?? "Retry"}</Button></div>}</div> : null}
      </div>

      {showSheetTabs ? <div data-slot="spreadsheet-sheet-tabs" className="flex min-h-10 items-center gap-1 overflow-x-auto border-t bg-muted/20 px-2">
        {sheets.map((sheet) => <button key={sheet.id} type="button" onClick={() => actions.activateSheet(sheet.id)} className={cn("h-8 shrink-0 rounded-md px-3 text-xs font-medium transition", sheet.active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:bg-background/70 hover:text-foreground")}>{sheet.name}</button>)}
        {!readonly ? <Button type="button" variant="ghost" size="icon-sm" title={labels?.addSheet ?? "Add sheet"} onClick={() => actions.addSheet()}><PlusIcon className="size-4" /></Button> : null}
        {!readonly && sheets.length > 1 ? <Button type="button" variant="ghost" size="icon-sm" title={labels?.deleteSheet ?? "Delete sheet"} onClick={() => actions.deleteActiveSheet()}><Trash2Icon className="size-4" /></Button> : null}
      </div> : null}

      {showStatusBar ? <div data-slot="spreadsheet-status-bar" className={cn("flex min-h-8 flex-wrap items-center gap-x-4 gap-y-1 border-t bg-muted/30 px-3 py-1 text-[11px] text-muted-foreground", statusBarClassName)}>
        <span>{activeSheet?.name ?? labels?.spreadsheet ?? "Spreadsheet"}</span>
        {showSelectionSummary && selection ? <span>{labels?.selected ?? "Selected"}: <strong className="font-medium text-foreground">{selection.a1Notation}</strong> · {selection.rowCount} {labels?.rows ?? "rows"} × {selection.columnCount} {labels?.columns ?? "columns"} · {selection.rowCount * selection.columnCount} {labels?.cells ?? "cells"}</span> : null}
        <span className="ml-auto">{Math.round(zoom * 100)}%</span>
        {readonly ? <span>{labels?.readonly ?? "Read only"}</span> : dirty ? <span className="text-amber-600">Unsaved changes</span> : <span>Saved</span>}
      </div> : null}
    </div>
  )
})

export { Spreadsheet }
