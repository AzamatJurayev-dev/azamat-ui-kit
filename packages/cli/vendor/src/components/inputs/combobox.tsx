import * as React from "react"
import { CheckIcon, ChevronDownIcon, SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
}

function Combobox<TValue extends string = string>({
  value,
  options,
  onValueChange,
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyLabel = "No option found",
  disabled = false,
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
    <div data-slot="combobox" className={cn("relative grid gap-2", className)} {...props}>
      <Button type="button" variant="outline" disabled={disabled} className="w-full justify-between" onClick={() => setOpen((value) => !value)}>
        <span className={cn("truncate", !selectedOption && "text-muted-foreground")}>{selectedOption?.label ?? placeholder}</span>
        <ChevronDownIcon className="size-4 opacity-60" />
      </Button>
      {open && (
        <div className="absolute top-full z-30 mt-2 w-full rounded-md border bg-popover p-2 text-popover-foreground shadow-md">
          <div className="relative mb-2">
            <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} className="h-9 pl-8" />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length ? filteredOptions.map((option) => {
              const active = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  className={cn("flex w-full items-start gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted disabled:pointer-events-none disabled:opacity-50", active && "bg-muted")}
                  onClick={() => {
                    onValueChange?.(option.value, option)
                    setOpen(false)
                  }}
                >
                  <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center">{active && <CheckIcon className="size-4" />}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{option.label}</span>
                    {option.description && <span className="block text-xs text-muted-foreground">{option.description}</span>}
                  </span>
                </button>
              )
            }) : <div className="px-2 py-6 text-center text-sm text-muted-foreground">{emptyLabel}</div>}
          </div>
        </div>
      )}
    </div>
  )
}

export { Combobox }
