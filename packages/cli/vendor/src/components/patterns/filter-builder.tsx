import * as React from "react"
import { RotateCcwIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type FilterValue = string | number | boolean | null | undefined | string[] | [string | undefined, string | undefined]

export type FilterOption = {
  value: string
  label: React.ReactNode
  disabled?: boolean
}

export type FilterField = {
  key: string
  label?: React.ReactNode
  type?: "text" | "search" | "select" | "date" | "date-range" | "custom"
  placeholder?: string
  options?: FilterOption[]
  disabled?: boolean
  hidden?: boolean
  className?: string
}

export type FilterBuilderLabels = {
  reset?: React.ReactNode
  apply?: React.ReactNode
  search?: string
  from?: string
  to?: string
}

export type FilterBuilderProps<TFilters extends Record<string, FilterValue> = Record<string, FilterValue>> = React.ComponentProps<"div"> & {
  value: TFilters
  fields: FilterField[]
  labels?: FilterBuilderLabels
  layout?: "inline" | "grid"
  columns?: 1 | 2 | 3 | 4
  showApply?: boolean
  showReset?: boolean
  onChange: (value: TFilters) => void
  onApply?: (value: TFilters) => void
  onReset?: () => void
  renderField?: (field: FilterField, value: FilterValue, helpers: { setValue: (value: FilterValue) => void; filters: TFilters }) => React.ReactNode
}

function FilterBuilder<TFilters extends Record<string, FilterValue> = Record<string, FilterValue>>({
  value,
  fields,
  labels,
  layout = "inline",
  columns = 3,
  showApply = false,
  showReset = true,
  onChange,
  onApply,
  onReset,
  renderField,
  className,
  ...props
}: FilterBuilderProps<TFilters>) {
  const setFieldValue = (key: string, nextValue: FilterValue) => onChange({ ...value, [key]: nextValue } as TFilters)
  const visibleFields = fields.filter((field) => !field.hidden)

  return (
    <div data-slot="filter-builder" className={cn("flex flex-wrap items-end gap-3", layout === "grid" && "grid w-full", columns === 2 && "sm:grid-cols-2", columns === 3 && "sm:grid-cols-2 lg:grid-cols-3", columns === 4 && "sm:grid-cols-2 lg:grid-cols-4", className)} {...props}>
      {visibleFields.map((field) => (
        <div key={field.key} data-slot="filter-builder-field" className={cn("grid min-w-48 gap-1.5", field.className)}>
          {field.label && <label className="text-xs font-medium text-muted-foreground">{field.label}</label>}
          {renderField?.(field, value[field.key], { setValue: (nextValue) => setFieldValue(field.key, nextValue), filters: value }) ?? <DefaultFilterField field={field} value={value[field.key]} labels={labels} onChange={(nextValue) => setFieldValue(field.key, nextValue)} />}
        </div>
      ))}
      {(showReset || showApply) && (
        <div data-slot="filter-builder-actions" className="flex items-center gap-2">
          {showReset && <Button type="button" variant="outline" size="sm" onClick={onReset}><RotateCcwIcon data-icon="inline-start" />{labels?.reset ?? "Reset"}</Button>}
          {showApply && <Button type="button" size="sm" onClick={() => onApply?.(value)}>{labels?.apply ?? "Apply"}</Button>}
        </div>
      )}
    </div>
  )
}

function DefaultFilterField({ field, value, labels, onChange }: { field: FilterField; value: FilterValue; labels?: FilterBuilderLabels; onChange: (value: FilterValue) => void }) {
  if (field.type === "select") {
    return (
      <select disabled={field.disabled} value={String(value ?? "")} className="h-8 rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" onChange={(event) => onChange(event.currentTarget.value || undefined)}>
        <option value="">{field.placeholder ?? "All"}</option>
        {field.options?.map((option) => <option key={option.value} value={option.value} disabled={option.disabled}>{typeof option.label === "string" ? option.label : option.value}</option>)}
      </select>
    )
  }

  if (field.type === "date-range") {
    const range = Array.isArray(value) ? value as [string | undefined, string | undefined] : [undefined, undefined]
    return (
      <div className="grid grid-cols-2 gap-2">
        <Input type="date" disabled={field.disabled} value={range[0] ?? ""} aria-label={labels?.from ?? "From"} onChange={(event) => onChange([event.currentTarget.value || undefined, range[1]])} />
        <Input type="date" disabled={field.disabled} value={range[1] ?? ""} aria-label={labels?.to ?? "To"} onChange={(event) => onChange([range[0], event.currentTarget.value || undefined])} />
      </div>
    )
  }

  return (
    <div className="relative">
      {field.type === "search" && <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />}
      <Input type={field.type === "date" ? "date" : "text"} disabled={field.disabled} value={String(value ?? "")} placeholder={field.placeholder ?? labels?.search} className={cn(field.type === "search" && "pl-8")} onChange={(event) => onChange(event.currentTarget.value || undefined)} />
    </div>
  )
}

export { FilterBuilder }
