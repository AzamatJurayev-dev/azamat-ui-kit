import * as React from "react"
import { SearchIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type CommandPaletteItem = {
  id: string
  label: React.ReactNode
  value?: string
  description?: React.ReactNode
  icon?: React.ReactNode
  shortcut?: React.ReactNode
  disabled?: boolean
  hidden?: boolean
  keywords?: string[]
  onSelect?: () => void
}

export type CommandPaletteGroup = {
  id: string
  label?: React.ReactNode
  items: CommandPaletteItem[]
}

export type CommandPaletteProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  placeholder?: string
  emptyLabel?: React.ReactNode
  groups: CommandPaletteGroup[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  contentClassName?: string
}

function itemText(item: CommandPaletteItem) {
  return [
    item.value,
    typeof item.label === "string" || typeof item.label === "number" ? String(item.label) : item.id,
    typeof item.description === "string" || typeof item.description === "number" ? String(item.description) : "",
    ...(item.keywords ?? []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase()
}

function CommandPalette({
  open,
  onOpenChange,
  title = "Command palette",
  description = "Search commands and actions.",
  placeholder = "Search...",
  emptyLabel = "No results found.",
  groups,
  value,
  onValueChange,
  className,
  contentClassName,
}: CommandPaletteProps) {
  const [internalValue, setInternalValue] = React.useState("")
  const search = value ?? internalValue
  const normalizedSearch = search.trim().toLowerCase()

  const setSearch = (nextValue: string) => {
    setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const visibleGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => {
        if (item.hidden) return false
        if (!normalizedSearch) return true
        return itemText(item).includes(normalizedSearch)
      }),
    }))
    .filter((group) => group.items.length > 0)

  const hasResults = visibleGroups.length > 0

  const handleSelect = (item: CommandPaletteItem) => {
    if (item.disabled) return
    item.onSelect?.()
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("overflow-hidden p-0 sm:max-w-xl", contentClassName)}>
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div
          data-slot="command-palette"
          className={cn("flex max-h-[28rem] flex-col overflow-hidden rounded-lg bg-popover text-popover-foreground", className)}
        >
          <div className="relative border-b p-2">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={placeholder}
              className="border-0 pl-8 shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="overflow-y-auto p-2">
            {!hasResults && (
              <div className="py-8 text-center text-sm text-muted-foreground">{emptyLabel}</div>
            )}

            {visibleGroups.map((group) => (
              <div key={group.id} className="py-1">
                {group.label && (
                  <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {group.label}
                  </div>
                )}

                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    disabled={item.disabled}
                    className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm outline-none hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                    onClick={() => handleSelect(item)}
                  >
                    {item.icon && <span className="shrink-0 text-muted-foreground [&_svg]:size-4">{item.icon}</span>}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{item.label}</span>
                      {item.description && (
                        <span className="block truncate text-xs text-muted-foreground">{item.description}</span>
                      )}
                    </span>
                    {item.shortcut && <span className="text-xs text-muted-foreground">{item.shortcut}</span>}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function useCommandPaletteShortcut(onOpenChange: (open: boolean) => void, enabled = true) {
  React.useEffect(() => {
    if (!enabled) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        onOpenChange(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [enabled, onOpenChange])
}

export { CommandPalette, useCommandPaletteShortcut }
