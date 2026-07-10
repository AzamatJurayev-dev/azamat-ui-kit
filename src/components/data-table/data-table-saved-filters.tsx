"use client"

import * as React from "react"
import { BookmarkIcon, SaveIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { stopInteractivePropagation } from "@/lib/utils"

export type SavedFilter = {
  id: string
  name: string
  filters: Record<string, unknown> // generic key-value filters
}

export type DataTableSavedFiltersProps = Omit<React.ComponentProps<"div">, "onSelect" | "onChange"> & {
  savedFilters: SavedFilter[]
  activeFilterId?: string
  onSelectFilter?: (id: string) => void
  onSaveFilter?: (name: string) => void
  onDeleteFilter?: (id: string) => void
  onClearFilters?: () => void
  triggerClassName?: string
}

function DataTableSavedFilters({
  savedFilters,
  activeFilterId,
  onSelectFilter,
  onSaveFilter,
  onDeleteFilter,
  onClearFilters,
  triggerClassName,
  className,
  ...props
}: DataTableSavedFiltersProps) {
  const [saveOpen, setSaveOpen] = React.useState(false)
  const [newFilterName, setNewFilterName] = React.useState("")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newFilterName.trim()) return
    onSaveFilter?.(newFilterName.trim())
    setNewFilterName("")
    setSaveOpen(false)
  }


  return (
    <div className={className} {...props}>
      <Select value={activeFilterId ?? null} onValueChange={(val) => { if (val) onSelectFilter?.(val) }}>
        <SelectTrigger className={triggerClassName}>
          <div className="flex items-center gap-2">
            <BookmarkIcon className="size-4 text-muted-foreground" />
            <SelectValue placeholder="Saved views" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Views</SelectLabel>
            {savedFilters.length === 0 && (
              <div className="px-2 py-1.5 text-sm text-muted-foreground">No saved views</div>
            )}
            {savedFilters.map((filter) => (
              <div key={filter.id} className="group relative flex items-center">
                <SelectItem value={filter.id} className="pr-8 w-full">
                  {filter.name}
                </SelectItem>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="absolute right-1 hidden group-hover:flex"
                  onClick={(e) => {
                    e.preventDefault()
                    stopInteractivePropagation(e)
                    onDeleteFilter?.(filter.id)
                  }}
                  onMouseDown={stopInteractivePropagation}
                  onDoubleClick={stopInteractivePropagation}
                >
                  <XIcon className="size-3" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            ))}
          </SelectGroup>
          <SelectSeparator />
          <div className="p-1">
            <Popover open={saveOpen} onOpenChange={setSaveOpen}>
              <PopoverTrigger render={<Button variant="ghost" size="sm" className="w-full justify-start gap-2" />}>
                <SaveIcon className="size-4" />
                Save current view
              </PopoverTrigger>
              <PopoverContent className="w-64" align="start">
                <form onSubmit={handleSave} className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Save View</h4>
                    <p className="text-sm text-muted-foreground">
                      Save current filters and sorting.
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="name"
                      placeholder="e.g. Active Users"
                      value={newFilterName}
                      onChange={(e) => setNewFilterName(e.target.value)}
                    />
                  </div>
                  <Button type="submit" disabled={!newFilterName.trim()}>
                    Save
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          </div>
          {activeFilterId && (
            <div className="p-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={(e) => {
                  e.preventDefault()
                  stopInteractivePropagation(e)
                  onClearFilters?.()
                }}
                onMouseDown={stopInteractivePropagation}
                onDoubleClick={stopInteractivePropagation}
              >
                <XIcon className="size-4" />
                Clear active view
              </Button>
            </div>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}

export { DataTableSavedFilters }
