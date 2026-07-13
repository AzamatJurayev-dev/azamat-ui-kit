"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

const HEX_COLOR_PATTERN = /^#?([0-9a-f]{6})([0-9a-f]{2})?$/i

function normalizeHexColor(value: string, fallback = "#000000") {
  const match = value.trim().match(HEX_COLOR_PATTERN)
  if (!match) return fallback
  return `#${match[1].toLowerCase()}${match[2]?.toLowerCase() ?? ""}`
}

function getOpaqueColor(value: string) {
  return normalizeHexColor(value).slice(0, 7)
}

function getAlphaPercent(value: string) {
  const normalized = normalizeHexColor(value)
  if (normalized.length !== 9) return 100
  return Math.round((Number.parseInt(normalized.slice(7, 9), 16) / 255) * 100)
}

function withAlpha(value: string, alpha: number, includeAlpha: boolean) {
  const opaque = getOpaqueColor(value)
  if (!includeAlpha) return opaque
  const channel = Math.round((Math.min(100, Math.max(0, alpha)) / 100) * 255)
    .toString(16)
    .padStart(2, "0")
  return `${opaque}${channel}`
}

export type ColorPickerProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  swatches?: string[]
  showAlpha?: boolean
  disabled?: boolean
  label?: React.ReactNode
  labels?: {
    color?: string
    hex?: string
    alpha?: string
  }
}

function ColorPicker({
  value,
  defaultValue = "#2563eb",
  onValueChange,
  swatches = ["#0f172a", "#2563eb", "#059669", "#d97706", "#dc2626", "#7c3aed"],
  showAlpha = false,
  disabled = false,
  label,
  labels,
  className,
  ...props
}: ColorPickerProps) {
  const [internalValue, setInternalValue] = React.useState(() => withAlpha(defaultValue, getAlphaPercent(defaultValue), showAlpha))
  const currentValue = withAlpha(value ?? internalValue, getAlphaPercent(value ?? internalValue), showAlpha)
  const [draft, setDraft] = React.useState(currentValue)

  React.useEffect(() => setDraft(currentValue), [currentValue])

  const updateValue = (nextValue: string) => {
    const normalized = withAlpha(nextValue, getAlphaPercent(nextValue), showAlpha)
    if (value === undefined) setInternalValue(normalized)
    onValueChange?.(normalized)
  }

  const commitDraft = () => {
    if (!HEX_COLOR_PATTERN.test(draft.trim())) {
      setDraft(currentValue)
      return
    }
    updateValue(draft)
  }

  return (
    <div data-slot="color-picker" className={cn("grid gap-3", className)} {...props}>
      {label ? <div className="text-sm font-medium text-foreground">{label}</div> : null}
      <div className="flex min-w-0 items-center gap-2">
        <label className="relative size-10 shrink-0 overflow-hidden rounded-md border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring">
          <span className="sr-only">{labels?.color ?? "Choose color"}</span>
          <input
            type="color"
            aria-label={labels?.color ?? "Choose color"}
            value={getOpaqueColor(currentValue)}
            disabled={disabled}
            className="absolute -inset-2 size-14 cursor-pointer border-0 bg-transparent p-0 disabled:cursor-not-allowed"
            onChange={(event) => updateValue(withAlpha(event.target.value, getAlphaPercent(currentValue), showAlpha))}
          />
        </label>
        <input
          aria-label={labels?.hex ?? "Hex color"}
          value={draft}
          disabled={disabled}
          spellCheck={false}
          className="h-10 min-w-0 flex-1 rounded-md border bg-background px-3 font-mono text-sm uppercase outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitDraft}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              commitDraft()
            }
            if (event.key === "Escape") setDraft(currentValue)
          }}
        />
      </div>
      {showAlpha ? (
        <label className="grid grid-cols-[1fr_auto] items-center gap-3 text-xs text-muted-foreground">
          <span className="sr-only">{labels?.alpha ?? "Opacity"}</span>
          <input
            type="range"
            min="0"
            max="100"
            value={getAlphaPercent(currentValue)}
            disabled={disabled}
            aria-label={labels?.alpha ?? "Opacity"}
            className="w-full accent-foreground disabled:cursor-not-allowed"
            onChange={(event) => updateValue(withAlpha(currentValue, Number(event.target.value), true))}
          />
          <span className="w-10 text-right tabular-nums">{getAlphaPercent(currentValue)}%</span>
        </label>
      ) : null}
      {swatches.length > 0 ? (
        <div role="list" aria-label="Color swatches" className="flex flex-wrap gap-2">
          {swatches.map((swatch) => {
            const normalizedSwatch = withAlpha(swatch, getAlphaPercent(currentValue), showAlpha)
            const selected = getOpaqueColor(normalizedSwatch) === getOpaqueColor(currentValue)
            return (
              <button
                key={swatch}
                type="button"
                role="listitem"
                aria-label={`Use ${swatch}`}
                aria-pressed={selected}
                disabled={disabled}
                className="size-7 rounded-md border border-black/10 shadow-sm outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                style={{ backgroundColor: getOpaqueColor(normalizedSwatch) }}
                onClick={() => updateValue(normalizedSwatch)}
              />
            )
          })}
        </div>
      ) : null}
    </div>
  )
}

export { ColorPicker, getAlphaPercent, normalizeHexColor, withAlpha }
