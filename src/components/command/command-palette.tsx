import * as React from "react"
import { Loader2Icon, SearchIcon } from "lucide-react"

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
  disabledReason?: React.ReactNode
  hidden?: boolean
  keywords?: string[]
  closeOnSelect?: boolean
  onSelect?: () => void | Promise<void>
}

export type CommandPaletteGroup = {
  id: string
  label?: React.ReactNode
  items?: CommandPaletteItem[]
  loadItems?: (search: string) => Promise<CommandPaletteItem[]>
  loadingLabel?: React.ReactNode
  emptyLabel?: React.ReactNode
  hidden?: boolean
}

export type CommandPaletteRecentConfig = {
  enabled?: boolean
  label?: React.ReactNode
  limit?: number
}

export type CommandPaletteProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  placeholder?: string
  emptyLabel?: React.ReactNode
  loadingLabel?: React.ReactNode
  groups: CommandPaletteGroup[]
  value?: string
  onValueChange?: (value: string) => void
  debounceMs?: number
  recent?: CommandPaletteRecentConfig | boolean
  filterItem?: (item: CommandPaletteItem, search: string) => boolean
  renderEmpty?: (search: string) => React.ReactNode
  renderLoading?: (search: string) => React.ReactNode
  onItemSelect?: (item: CommandPaletteItem, group: CommandPaletteGroup) => void
  className?: string
  contentClassName?: string
  inputClassName?: string
  listClassName?: string
}

type AsyncGroupState = {
  items: CommandPaletteItem[]
  loading: boolean
  error?: unknown
}

type RuntimeCommandPaletteGroup = CommandPaletteGroup & AsyncGroupState & {
  items: CommandPaletteItem[]
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

function defaultFilterItem(item: CommandPaletteItem, search: string) {
  if (!search) return true
  return itemText(item).includes(search.trim().toLowerCase())
}

function resolveRecentConfig(recent?: CommandPaletteRecentConfig | boolean): Required<CommandPaletteRecentConfig> {
  if (recent === false) {
    return { enabled: false, label: "Recent", limit: 5 }
  }

  if (recent === true || recent === undefined) {
    return { enabled: true, label: "Recent", limit: 5 }
  }

  return {
    enabled: recent.enabled ?? true,
    label: recent.label ?? "Recent",
    limit: recent.limit ?? 5,
  }
}

function CommandPalette({
  open,
  onOpenChange,
  title = "Command palette",
  description = "Search commands and actions.",
  placeholder = "Search...",
  emptyLabel = "No results found.",
  loadingLabel = "Loading commands...",
  groups,
  value,
  onValueChange,
  debounceMs = 180,
  recent,
  filterItem = defaultFilterItem,
  renderEmpty,
  renderLoading,
  onItemSelect,
  className,
  contentClassName,
  inputClassName,
  listClassName,
}: CommandPaletteProps) {
  const [internalValue, setInternalValue] = React.useState("")
  const [debouncedSearch, setDebouncedSearch] = React.useState("")
  const [asyncGroups, setAsyncGroups] = React.useState<Record<string, AsyncGroupState>>({})
  const [recentItems, setRecentItems] = React.useState<CommandPaletteItem[]>([])
  const [loadingKey, setLoadingKey] = React.useState<string | null>(null)
  const search = value ?? internalValue
  const normalizedSearch = search.trim().toLowerCase()
  const recentConfig = resolveRecentConfig(recent)

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedSearch(search), debounceMs)
    return () => window.clearTimeout(timeout)
  }, [debounceMs, search])

  React.useEffect(() => {
    if (!open) return

    let active = true
    const asyncLoaders = groups.filter((group) => !group.hidden && group.loadItems)

    asyncLoaders.forEach((group) => {
      setAsyncGroups((current) => ({
        ...current,
        [group.id]: {
          items: current[group.id]?.items ?? [],
          loading: true,
          error: undefined,
        },
      }))

      void group.loadItems?.(debouncedSearch).then(
        (items) => {
          if (!active) return
          setAsyncGroups((current) => ({ ...current, [group.id]: { items, loading: false } }))
        },
        (error) => {
          if (!active) return
          setAsyncGroups((current) => ({ ...current, [group.id]: { items: [], loading: false, error } }))
        },
      )
    })

    return () => {
      active = false
    }
  }, [debouncedSearch, groups, open])

  const setSearch = (nextValue: string) => {
    setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const allItemsById = React.useMemo(() => {
    const map = new Map<string, CommandPaletteItem>()

    groups.forEach((group) => {
      group.items?.forEach((item) => map.set(item.id, item))
      asyncGroups[group.id]?.items.forEach((item) => map.set(item.id, item))
    })

    return map
  }, [asyncGroups, groups])

  const visibleGroups = React.useMemo<RuntimeCommandPaletteGroup[]>(
    () =>
      groups
        .filter((group) => !group.hidden)
        .map((group) => {
          const asyncState = asyncGroups[group.id]
          const mergedItems = [...(group.items ?? []), ...(asyncState?.items ?? [])]
          const items = mergedItems.filter((item) => {
            if (item.hidden) return false
            return filterItem(item, normalizedSearch)
          })

          return {
            ...group,
            items,
            loading: asyncState?.loading ?? false,
            error: asyncState?.error,
          } as RuntimeCommandPaletteGroup
        })
        .filter((group) => group.items.length > 0 || group.loading || group.error),
    [asyncGroups, filterItem, groups, normalizedSearch],
  )

  const recentGroup = React.useMemo(() => {
    if (!recentConfig.enabled || normalizedSearch || recentItems.length === 0) return null

    return {
      id: "__recent",
      label: recentConfig.label,
      items: recentItems.slice(0, recentConfig.limit),
      loading: false,
      error: undefined,
    } as RuntimeCommandPaletteGroup
  }, [normalizedSearch, recentConfig.enabled, recentConfig.label, recentConfig.limit, recentItems])

  const renderedGroups = recentGroup ? [recentGroup, ...visibleGroups] : visibleGroups
  const hasResults = renderedGroups.some((group) => group.items.length > 0)
  const hasLoading = renderedGroups.some((group) => group.loading)

  const pushRecentItem = (item: CommandPaletteItem) => {
    if (!recentConfig.enabled) return

    const source = allItemsById.get(item.id) ?? item
    setRecentItems((current) => [source, ...current.filter((entry) => entry.id !== item.id)].slice(0, recentConfig.limit))
  }

  const handleSelect = async (item: CommandPaletteItem, group: RuntimeCommandPaletteGroup) => {
    if (item.disabled || loadingKey) return

    try {
      setLoadingKey(item.id)
      await item.onSelect?.()
      onItemSelect?.(item, group)
      pushRecentItem(item)
      if (item.closeOnSelect !== false) {
        onOpenChange?.(false)
      }
    } finally {
      setLoadingKey(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "overflow-hidden rounded-[var(--radius-3xl)] border-border/80 bg-popover/98 p-0 shadow-[0_28px_90px_rgba(15,23,42,0.24)] backdrop-blur sm:max-w-xl",
          contentClassName
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div
          data-slot="command-palette"
          className={cn(
            "flex max-h-[32rem] flex-col overflow-hidden rounded-[var(--radius-3xl)] bg-popover/98 text-popover-foreground",
            className
          )}
        >
          <div className="relative border-b border-border/70 bg-muted/20 p-3">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={placeholder}
              className={cn(
                "h-11 rounded-full border-border/75 bg-background/96 pl-10 shadow-[0_1px_0_rgba(255,255,255,0.05)] focus-visible:ring-2",
                inputClassName
              )}
              autoFocus
            />
          </div>

          <div className={cn("overflow-y-auto p-3", listClassName)}>
            {!hasResults && hasLoading && (
              <div className="flex items-center justify-center gap-2 rounded-[min(var(--radius-xl),16px)] border border-border/70 bg-muted/30 py-8 text-sm text-muted-foreground">
                {renderLoading?.(search) ?? (
                  <>
                    <Loader2Icon className="size-4 animate-spin" />
                    {loadingLabel}
                  </>
                )}
              </div>
            )}

            {!hasResults && !hasLoading && (
              <div className="rounded-[min(var(--radius-xl),16px)] border border-border/70 bg-muted/30 py-8 text-center text-sm text-muted-foreground">
                {renderEmpty?.(search) ?? emptyLabel}
              </div>
            )}

            {renderedGroups.map((group) => (
              <div key={group.id} className="py-1">
                {group.label && (
                  <div className="flex items-center justify-between px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    <span>{group.label}</span>
                    {group.loading && <Loader2Icon className="size-3.5 animate-spin" />}
                  </div>
                )}

                {group.error ? (
                  <div className="rounded-[min(var(--radius-xl),16px)] border border-destructive/20 bg-destructive/8 px-3 py-2 text-xs text-destructive">
                    Could not load commands.
                  </div>
                ) : null}

                {group.loading && group.items.length === 0 && (
                  <div className="rounded-[min(var(--radius-xl),16px)] border border-border/70 bg-muted/25 px-3 py-2 text-xs text-muted-foreground">
                    {group.loadingLabel ?? loadingLabel}
                  </div>
                )}

                {group.items.length === 0 && !group.loading && !group.error && group.emptyLabel && (
                  <div className="rounded-[min(var(--radius-xl),16px)] border border-border/70 bg-muted/25 px-3 py-2 text-xs text-muted-foreground">{group.emptyLabel}</div>
                )}

                {group.items.map((item) => {
                  const isLoading = loadingKey === item.id

                  return (
                    <button
                      key={item.id}
                      type="button"
                      disabled={item.disabled || isLoading}
                      data-disabled={item.disabled || undefined}
                      className="flex w-full items-start gap-3 rounded-[min(var(--radius-xl),16px)] border border-transparent px-3 py-2.5 text-left text-sm outline-none transition-colors hover:border-border/70 hover:bg-accent/60 hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                      onClick={() => void handleSelect(item, group)}
                    >
                      {item.icon && <span className="shrink-0 text-muted-foreground [&_svg]:size-4">{item.icon}</span>}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{item.label}</span>
                        {(item.description || item.disabledReason) && (
                          <span className="block truncate text-xs text-muted-foreground">
                            {item.disabled ? item.disabledReason ?? item.description : item.description}
                          </span>
                        )}
                      </span>
                      {isLoading && <Loader2Icon className="size-3.5 animate-spin text-muted-foreground" />}
                      {item.shortcut && <span className="text-xs text-muted-foreground">{item.shortcut}</span>}
                    </button>
                  )
                })}
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
