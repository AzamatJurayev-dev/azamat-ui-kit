"use client"

import * as React from "react"
import { BookmarkIcon, SaveIcon, Trash2Icon, CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn, stopInteractivePropagation } from "@/lib/utils"

export type SavedFilterItem = {
  value: string
  label: string
  description?: string
}

export type SavedFilterSelectProps = Omit<React.ComponentProps<"div">, "value" | "onChange"> & {
  value?: string
  onValueChange?: (value: string | undefined) => void
  filters: SavedFilterItem[]
  onSave?: (name: string) => void
  onDelete?: (value: string) => void
  placeholder?: string
  saveLabel?: string
  savePlaceholder?: string
  emptyMessage?: React.ReactNode
  saveValue?: string
  onSaveValueChange?: (value: string) => void
}

function SavedFilterSelect({
  value,
  onValueChange,
  filters,
  onSave,
  onDelete,
  placeholder = "Views",
  saveLabel = "Save current view",
  savePlaceholder = "Name this view",
  emptyMessage = "No saved views",
  saveValue,
  onSaveValueChange,
  className,
  ...props
}: SavedFilterSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [internalSaveValue, setInternalSaveValue] = React.useState("")
  const selectedFilter = filters.find((f) => f.value === value)
  const nextSaveValue = saveValue ?? internalSaveValue

  function setNextSaveValue(nextValue: string) {
    if (saveValue === undefined) setInternalSaveValue(nextValue)
    onSaveValueChange?.(nextValue)
  }

  function handleSave() {
    const normalizedValue = nextSaveValue.trim()
    if (!normalizedValue || !onSave) return
    onSave(normalizedValue)
    setNextSaveValue("")
    setOpen(false)
  }

  return (
    <div data-slot="saved-filter-select" className={className} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <Button
          render={<PopoverTrigger />}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
            <div className="flex items-center gap-2 truncate">
              <BookmarkIcon className="size-4 shrink-0 opacity-50" />
              <span className="truncate">{selectedFilter ? selectedFilter.label : placeholder}</span>
            </div>
            <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
        </Button>
        <PopoverContent className="w-[250px] p-0" align="start">
          <div className="max-h-[300px] overflow-y-auto p-1">
            {filters.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">{emptyMessage}</div>
            ) : (
              <div className="grid gap-1">
                {filters.map((filter) => {
                  const isSelected = value === filter.value
                  return (
                    <div
                      key={filter.value}
                      className={cn(
                        "group relative flex items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                        isSelected && "bg-accent text-accent-foreground"
                      )}
                    >
                      <button
                        className="flex min-w-0 flex-1 items-center gap-2 text-left"
                        onClick={() => {
                          onValueChange?.(isSelected ? undefined : filter.value)
                          setOpen(false)
                        }}
                      >
                        <span className="flex size-4 shrink-0 items-center justify-center">
                          {isSelected && <CheckIcon className="size-4" />}
                        </span>
                        <div className="grid gap-0.5">
                          <span className="truncate font-medium">{filter.label}</span>
                          {filter.description && (
                            <span className="truncate text-xs text-muted-foreground">
                              {filter.description}
                            </span>
                          )}
                        </div>
                      </button>
                      
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6 shrink-0 opacity-0 group-hover:opacity-100 hover:text-destructive"
                          onClick={(e) => {
                            stopInteractivePropagation(e)
                            onDelete(filter.value)
                          }}
                          onMouseDown={stopInteractivePropagation}
                          onDoubleClick={stopInteractivePropagation}
                        >
                          <Trash2Icon className="size-3" />
                        </Button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          
          {onSave && (
            <div className="grid gap-2 border-t p-2">
              <Input
                value={nextSaveValue}
                placeholder={savePlaceholder}
                onChange={(event) => setNextSaveValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault()
                    handleSave()
                  }
                }}
              />
              <Button variant="outline" className="w-full justify-center text-sm font-medium" disabled={!nextSaveValue.trim()} onClick={handleSave}>
                <SaveIcon className="mr-2 size-4" />
                {saveLabel}
              </Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { SavedFilterSelect }
