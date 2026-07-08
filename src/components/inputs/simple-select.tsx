import * as React from "react"
import { CheckIcon, LoaderCircleIcon, SearchIcon, XIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn, stopInteractivePropagation } from "@/lib/utils"

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
  size?: "sm" | "default" | "lg"
  clearable?: boolean
  searchable?: boolean
  loading?: boolean
  loadingLabel?: React.ReactNode
  disabled?: boolean
  showSelectedDescription?: boolean
  triggerClassName?: string
  contentClassName?: string
  itemClassName?: string
  searchClassName?: string
  renderOption?: (option: SimpleSelectOption, state: { selected: boolean }) => React.ReactNode
  invalid?: boolean
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
  showSelectedDescription = true,
  triggerClassName,
  contentClassName,
  itemClassName,
  searchClassName,
  renderOption,
  invalid,
  onOpenChange,
  ...props
}: SimpleSelectProps) {
  const [search, setSearch] = React.useState("")
  const selectedOption = options.find((option) => option.value === value)
  const filteredOptions = options.filter((option) => optionMatchesSearch(option, search))

  return (
    <Select
      value={value}
      onValueChange={(val) => onValueChange?.(val as string)}
      disabled={disabled || loading}
      onOpenChange={(open, eventDetails) => {
        if (!open) setSearch("")
        onOpenChange?.(open, eventDetails)
      }}
      {...props}
    >
      <SelectTrigger
        size={size}
        aria-invalid={invalid || undefined}
        className={cn(
          "w-full",
          triggerClassName
        )}
      >
        <SelectValue placeholder={placeholder}>
          {selectedOption ? (
            <span className="flex min-w-0 flex-col items-start">
              <span className="truncate">{selectedOption.label}</span>
              {showSelectedDescription && selectedOption.description ? (
                <span className="truncate text-[11px] font-medium text-muted-foreground">{selectedOption.description}</span>
              ) : null}
            </span>
          ) : null}
        </SelectValue>
        {loading ? <LoaderCircleIcon className="size-4 animate-spin text-muted-foreground" /> : null}
        {clearable && value && !disabled && !loading ? (
          <span
            role="button"
            tabIndex={0}
            aria-label={clearLabel}
            className="ml-1 rounded-[var(--radius-sm)] border border-border/65 p-1 text-muted-foreground transition-colors hover:border-border hover:bg-muted/55 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={(event) => {
              event.preventDefault()
              stopInteractivePropagation(event)
              onValueChange?.(undefined)
            }}
            onMouseDown={stopInteractivePropagation}
            onDoubleClick={stopInteractivePropagation}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault()
                onValueChange?.(undefined)
              }
            }}
          >
            <XIcon className="size-3.5" />
          </span>
        ) : null}
      </SelectTrigger>
      <SelectContent
        className={cn(
          "w-(--anchor-width)",
          contentClassName
        )}
      >
        {searchable ? (
          <div data-slot="select-search" className="sticky top-0 z-10 mb-1 flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--aui-card-border,var(--border))] bg-popover px-2.5 py-2 text-sm">
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
          <div data-slot="select-state" className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--aui-card-border,var(--border))] bg-[color:color-mix(in_oklch,var(--muted),transparent_55%)] px-3 py-2.5 text-sm text-muted-foreground">
            <LoaderCircleIcon className="size-4 animate-spin" />
            {loadingLabel}
          </div>
        ) : filteredOptions.length === 0 ? (
          <div data-slot="select-state" className="rounded-[var(--radius-md)] border border-[color:var(--aui-card-border,var(--border))] bg-[color:color-mix(in_oklch,var(--muted),transparent_55%)] px-3 py-2.5 text-sm text-muted-foreground">{emptyLabel}</div>
        ) : (
          filteredOptions.map((option) => {
            const selected = option.value === value
            return (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cn("rounded-[var(--radius-md)]", itemClassName)}
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
