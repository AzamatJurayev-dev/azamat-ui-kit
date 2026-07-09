"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type ComboboxOption<TValue extends string = string> = {
  value: TValue
  label: React.ReactNode
  searchValue?: string
  description?: React.ReactNode
  disabled?: boolean
  hidden?: boolean
}

export type ComboboxProps<TValue extends string = string> = React.ComponentProps<"div"> & {
  value?: TValue
  options: ComboboxOption<TValue>[]
  onValueChange?: (value: TValue | undefined, option?: ComboboxOption<TValue>) => void
  placeholder?: React.ReactNode
  searchPlaceholder?: string
  emptyLabel?: React.ReactNode
  disabled?: boolean
  invalid?: boolean
  clearable?: boolean
  allowDeselect?: boolean
  showSelectedDescription?: boolean
  onSearchChange?: (value: string) => void
  triggerClassName?: string
  contentClassName?: string
  optionClassName?: string
  searchClassName?: string
}

function Combobox<TValue extends string = string>({
  value,
  options,
  onValueChange,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyLabel = "No option found",
  disabled = false,
  invalid,
  clearable = false,
  allowDeselect = false,
  showSelectedDescription = true,
  onSearchChange,
  triggerClassName,
  contentClassName,
  optionClassName,
  searchClassName,
  className,
  ...props
}: ComboboxProps<TValue>) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const selectedOption = options.find((option) => option.value === value)
  const normalizedSearch = search.trim().toLowerCase()
  const filteredOptions = options.filter((option) => {
    if (option.hidden) return false
    if (!normalizedSearch) return true
    return String(option.searchValue ?? option.label).toLowerCase().includes(normalizedSearch)
  })

  return (
    <div data-slot="combobox" className={cn("grid w-full gap-2", className)} {...props}>
      <Popover
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen)
          if (!nextOpen) {
            setSearch("")
            onSearchChange?.("")
          }
        }}
      >
        <PopoverTrigger
          render={
            <Button
              type="button"
              variant="outline"
              disabled={disabled}
              aria-expanded={open}
              aria-invalid={invalid || undefined}
              className={cn("min-h-11 w-full justify-between rounded-[var(--aui-control-radius,var(--radius-md))] px-3.5 text-left", triggerClassName)}
            />
          }
        >
          <span className={cn("min-w-0 flex-1", !selectedOption && "text-muted-foreground")}>
            {selectedOption ? (
              <span className="flex min-w-0 flex-col items-start">
                <span className="truncate font-medium">{selectedOption.label}</span>
                {showSelectedDescription && selectedOption.description ? (
                  <span className="truncate text-[11px] text-muted-foreground">{selectedOption.description}</span>
                ) : null}
              </span>
            ) : (
              <span className="truncate font-normal">{placeholder}</span>
            )}
          </span>
          {clearable && selectedOption && !disabled ? (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear value"
              className="inline-flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/55 hover:text-foreground"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onValueChange?.(undefined, undefined)
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  event.stopPropagation()
                  onValueChange?.(undefined, undefined)
                }
              }}
            >
              ×
            </span>
          ) : null}
          <ChevronDownIcon className="size-4 opacity-60" />
        </PopoverTrigger>
        <PopoverContent
          align="start"
          data-slot="combobox-content"
          className={cn("w-(--anchor-width) min-w-72 rounded-[var(--aui-card-radius,var(--radius-lg))] border-[color:var(--aui-card-border,var(--border))] bg-popover p-3 shadow-[var(--aui-control-panel-shadow,0_18px_40px_rgba(15,23,42,0.14))]", contentClassName)}
        >
          <div className="relative mb-2">
            <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                onSearchChange?.(event.target.value)
              }}
              placeholder={searchPlaceholder}
              className={cn("h-9 pl-8", searchClassName)}
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length ? filteredOptions.map((option) => {
              const active = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  data-selected={active || undefined}
                  className={cn(
                    "flex w-full items-start gap-2.5 rounded-[var(--radius-md)] border border-transparent px-3 py-2.5 text-left text-sm transition-colors hover:border-[color:color-mix(in_oklch,var(--primary),transparent_76%)] hover:bg-[color:color-mix(in_oklch,var(--primary),transparent_93%)] disabled:pointer-events-none disabled:opacity-50 data-[selected=true]:border-[color:color-mix(in_oklch,var(--primary),transparent_68%)] data-[selected=true]:bg-[color:color-mix(in_oklch,var(--primary),transparent_89%)]",
                    optionClassName
                  )}
                  onClick={() => {
                    const nextValue = allowDeselect && active ? undefined : option.value
                    onValueChange?.(nextValue, nextValue ? option : undefined)
                    setOpen(false)
                  }}
                >
                  <span className={cn("mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border border-border/70", active && "border-primary bg-primary text-primary-foreground")}>{active && <CheckIcon className="size-3" />}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{option.label}</span>
                    {option.description && <span className="block text-xs text-muted-foreground">{option.description}</span>}
                  </span>
                </button>
              )
            }) : <div className="rounded-[var(--radius-md)] border border-[color:var(--aui-card-border,var(--border))] bg-[color:color-mix(in_oklch,var(--muted),transparent_55%)] px-3 py-6 text-center text-sm text-muted-foreground">{emptyLabel}</div>}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { Combobox }
