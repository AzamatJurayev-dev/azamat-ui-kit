"use client"

import * as React from "react"
import { createUniver, LocaleType, mergeLocales } from "@univerjs/presets"
import { UniverSheetsCorePreset } from "@univerjs/preset-sheets-core"
import UniverPresetSheetsCoreEnUS from "@univerjs/preset-sheets-core/locales/en-US"
import { LoaderCircleIcon } from "lucide-react"

import "@univerjs/preset-sheets-core/lib/index.css"

import { cn } from "@/lib/utils"

export type SpreadsheetApi = ReturnType<typeof createUniver>["univerAPI"]
export type SpreadsheetWorkbook = Parameters<SpreadsheetApi["createWorkbook"]>[0]

const EMPTY_WORKBOOK = {} as SpreadsheetWorkbook

export type SpreadsheetProps = Omit<React.ComponentProps<"div">, "children"> & {
  workbook?: SpreadsheetWorkbook
  resetKey?: React.Key
  locale?: LocaleType
  locales?: Record<string, unknown>
  onReady?: (api: SpreadsheetApi) => void
  onError?: (error: Error) => void
  loading?: React.ReactNode
  viewportClassName?: string
}

function Spreadsheet({
  workbook = EMPTY_WORKBOOK,
  resetKey,
  locale = LocaleType.EN_US,
  locales,
  onReady,
  onError,
  loading,
  className,
  viewportClassName,
  ...props
}: SpreadsheetProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const onReadyRef = React.useRef(onReady)
  const onErrorRef = React.useRef(onError)
  const [initializing, setInitializing] = React.useState(true)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  React.useEffect(() => {
    onErrorRef.current = onError
  }, [onError])

  React.useEffect(() => {
    if (!containerRef.current) return

    let disposed = false
    setInitializing(true)
    setError(null)

    try {
      const { univerAPI } = createUniver({
        locale,
        locales: {
          [LocaleType.EN_US]: mergeLocales(UniverPresetSheetsCoreEnUS),
          ...(locales ?? {}),
        },
        presets: [
          UniverSheetsCorePreset({
            container: containerRef.current,
          }),
        ],
      })

      univerAPI.createWorkbook(workbook)

      if (!disposed) {
        setInitializing(false)
        onReadyRef.current?.(univerAPI)
      }

      return () => {
        disposed = true
        univerAPI.dispose()
      }
    } catch (cause: unknown) {
      const nextError = cause instanceof Error ? cause : new Error("Spreadsheet could not be initialized")
      setError(nextError)
      setInitializing(false)
      onErrorRef.current?.(nextError)
    }
  }, [locale, locales, resetKey, workbook])

  return (
    <div
      data-slot="spreadsheet"
      className={cn("relative min-h-[480px] overflow-hidden rounded-lg border bg-background", className)}
      {...props}
    >
      <div
        ref={containerRef}
        data-slot="spreadsheet-viewport"
        className={cn("h-full min-h-[480px] w-full", viewportClassName)}
      />

      {initializing ? (
        <div className="absolute inset-0 grid place-items-center bg-background/80 backdrop-blur-sm" role="status">
          {loading ?? (
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <LoaderCircleIcon className="size-4 animate-spin" aria-hidden="true" />
              Loading spreadsheet
            </span>
          )}
        </div>
      ) : null}

      {error ? (
        <div className="absolute inset-0 grid place-items-center bg-background/90 p-6" role="alert">
          <p className="max-w-md text-center text-sm text-destructive">{error.message}</p>
        </div>
      ) : null}
    </div>
  )
}

export { Spreadsheet }
