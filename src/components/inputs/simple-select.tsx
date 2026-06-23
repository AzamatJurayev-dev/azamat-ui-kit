import * as React from "react"
import { CheckIcon, LoaderCircleIcon, SearchIcon, XIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export type SimpleSelectOption = {
  label: React.ReactNode
  value: string
  disabled?: boolean
  description?: React.ReactNode
  keywords?: string[]
}

export type SimpleSelectProps = Omit<
  React.ComponentProps<typeof Select>,
  "value" | "onValueChange"
> & {
  value?: string
  onValueChange?: (value: string | undefined) => void
  options: SimpleSelectOption[]
  placeholder?: string
  searchPlaceholder?: string
  emptyLabel?: React.ReactNode
  clearLabel?: string
  size?: "sm" | "default"
  clearable?: boolean
  searchable?: boolean
  loading?: boolean
  loadingLabel?: React.ReactNode
  disabled?: boolean
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
  searchClassName?: string
  renderOption?: (option: SimpleSelectOption, state: { selected: boolean }) => React.ReactNode
}

function optionMatchesSearch(option: SimpleSelectOption, search: string) {
  const normalized = search.trim().toLowerCase()
  if (!normalized) return true

  const labelText = typeof option.label === "string" || typeof option.label === "number" ? String(option.label) : option.value
  const haystack = [labelText, option.value, ...(option.keywords ?? [])].join(" ").toLowerCase()
  return haystack.includes(normalized)
}

function SimpleSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select",
  searchPlaceholder = "Search options...",
  emptyLabel = "No options found",
  clearLabel = "Clear selection",
  size = "default",
  clearable = false,
  searchable = false,
  loading = false,
  loadingLabel = "Loading options...",
  disabled = false,
  triggerClassName,
  contentClassName,
  itemClassName,
  searchClassName,
  renderOption,
  ...props
}: SimpleSelectProps) {
  const [search, setSearch] = React.useState("")
  const selectedOption = options.find((option) => option.value === value)
  const filteredOptions = options.filter((option) => optionMatchesSearch(option, search))

  return (
    <Select value={value} onValueChange={(val) => onValueChange?.(val as string)} disabled={disabled || loading} {...props}>
      <SelectTrigger
        size={size}
        className={cn(
          "w-full border-border/80 bg-background/96 shadow-[0_1px_0_rgba(255,255,255,0.06)]",
          triggerClassName
        )}
      >
        <SelectValue placeholder={placeholder}>{selectedOption?.label}</SelectValue>
        {loading ? <LoaderCircleIcon className="size-4 animate-spin text-muted-foreground" /> : null}
        {clearable && value && !disabled && !loading ? (
          <button
            type="button"
            aria-label={clearLabel}
            className="ml-1 rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onValueChange?.(undefined)
            }}
          >
            <XIcon className="size-3.5" />
          </button>
        ) : null}
      </SelectTrigger>
      <SelectContent
        className={cn(
          "border-border/80 bg-popover/98 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur",
          contentClassName
        )}
      >
        {searchable ? (
          <div className="sticky top-0 z-10 mb-1 flex items-center gap-2 rounded-[min(var(--radius-lg),14px)] border border-border/70 bg-background/95 px-2.5 py-2 text-sm">
            <SearchIcon className="size-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className={cn("min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground", searchClassName)}
            />
          </div>
        ) : null}

        {loading ? (
          <div className="flex items-center gap-2 rounded-[min(var(--radius-lg),14px)] px-3 py-2.5 text-sm text-muted-foreground">
            <LoaderCircleIcon className="size-4 animate-spin" />
            {loadingLabel}
          </div>
        ) : filteredOptions.length === 0 ? (
          <div className="rounded-[min(var(--radius-lg),14px)] px-3 py-2.5 text-sm text-muted-foreground">{emptyLabel}</div>
        ) : (
          filteredOptions.map((option) => {
            const selected = option.value === value
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cn("rounded-[min(var(--radius-lg),14px)]", itemClassName)}
              >
                {renderOption ? (
                  renderOption(option, { selected })
                ) : (
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="truncate">{option.label}</span>
                      {selected ? <CheckIcon className="ml-auto size-3.5 text-primary" /> : null}
                    </span>
                    {option.description && <span className="truncate text-xs text-muted-foreground">{option.description}</span>}
                  </span>
                )}
              </SelectItem>
            )
          })
        )}
      </SelectContent>
    </Select>
  )
}

export { SimpleSelect }
