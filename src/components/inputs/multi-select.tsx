"use client"

import * as React from "react"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type MultiSelectOption = {
  value: string
  label: React.ReactNode
  description?: React.ReactNode
  disabled?: boolean
}

export type MultiSelectProps = React.ComponentProps<"div"> & {
  options: MultiSelectOption[]
  value?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: React.ReactNode
  maxVisibleTags?: number
}

function MultiSelect({ options, value = [], onValueChange, placeholder = "Select options", maxVisibleTags = 3, className, ...props }: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const selected = options.filter((option) => value.includes(option.value))
  const hiddenCount = Math.max(0, selected.length - maxVisibleTags)

  const toggle = (optionValue: string) => {
    onValueChange?.(value.includes(optionValue) ? value.filter((item) => item !== optionValue) : [...value, optionValue])
  }

  return (
    <div data-slot="multi-select" className={cn("w-full", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button type="button" variant="outline" className="min-h-10 w-full justify-between" />}>
          <span className="flex min-w-0 flex-1 flex-wrap gap-1">
            {selected.length ? selected.slice(0, maxVisibleTags).map((option) => (
              <Badge key={option.value} label={option.label} variant="secondary" />
            )) : <span className="text-muted-foreground">{placeholder}</span>}
            {hiddenCount ? <Badge label={`+${hiddenCount}`} variant="secondary" /> : null}
          </span>
          <ChevronDownIcon className="size-4 opacity-70" />
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[var(--anchor-width)] p-1">
          <div className="grid gap-1">
            {options.map((option) => {
              const checked = value.includes(option.value)
              return (
                <button
                  key={option.value}
                  type="button"
                  disabled={option.disabled}
                  className="flex items-start gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
                  onClick={() => toggle(option.value)}
                >
                  <span className="mt-0.5 grid size-4 place-items-center rounded border">{checked ? <CheckIcon className="size-3" /> : null}</span>
                  <span className="grid min-w-0 flex-1">
                    <span className="truncate font-medium">{option.label}</span>
                    {option.description ? <span className="truncate text-xs text-muted-foreground">{option.description}</span> : null}
                  </span>
                </button>
              )
            })}
            {value.length ? <Button type="button" size="sm" variant="ghost" leftIcon={<XIcon className="size-3.5" />} onClick={() => onValueChange?.([])}>Clear</Button> : null}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { MultiSelect }
