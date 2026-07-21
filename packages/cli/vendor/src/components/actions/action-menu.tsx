"use client"

import * as React from "react"
import { Loader2Icon, MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuItemDescription,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn, stopInteractivePropagation } from "@/lib/utils"

export type ActionMenuItem = {
  key: string
  label: React.ReactNode
  section?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  shortcut?: React.ReactNode
  disabled?: boolean
  loading?: boolean
  destructive?: boolean
  hidden?: boolean
  keepOpen?: boolean
  onSelect?: () => void | Promise<void>
}

export type ActionMenuProps = {
  actions: ActionMenuItem[]
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  label?: React.ReactNode
  triggerLabel?: string
  trigger?: React.ReactElement
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  disabled?: boolean
  triggerVariant?: React.ComponentProps<typeof Button>["variant"]
  triggerSize?: React.ComponentProps<typeof Button>["size"]
  showChevron?: boolean
  closeOnSelect?: boolean
  contentClassName?: string
  triggerClassName?: string
  itemClassName?: string
  emptyLabel?: React.ReactNode
  menuWidth?: number | string
  loadingLabel?: React.ReactNode
  persistIconSpace?: boolean
  itemRoleDescription?: string
  renderItem?: (action: ActionMenuItem, state: { loading: boolean; close: () => void }) => React.ReactNode
  onActionError?: (error: unknown, action: ActionMenuItem) => void
}

function ActionMenu({
  actions,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  label,
  triggerLabel = "Open actions",
  trigger,
  align = "end",
  side = "bottom",
  sideOffset = 4,
  disabled = false,
  triggerVariant = "ghost",
  triggerSize = "icon-sm",
  showChevron = false,
  closeOnSelect = true,
  contentClassName,
  triggerClassName,
  itemClassName,
  emptyLabel = "No actions",
  menuWidth,
  loadingLabel = "Working...",
  persistIconSpace = true,
  itemRoleDescription,
  renderItem,
  onActionError,
}: ActionMenuProps) {
  const visibleActions = actions.filter((action) => !action.hidden)
  const [loadingKey, setLoadingKey] = React.useState<string | null>(null)
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const open = openProp ?? internalOpen
  const lastInvokedActionKeyRef = React.useRef<string | null>(null)

  const setOpen = React.useCallback((nextOpen: boolean) => {
    if (openProp === undefined) setInternalOpen(nextOpen)
    onOpenChange?.(nextOpen)
  }, [onOpenChange, openProp])

  const handleSelect = async (action: ActionMenuItem) => {
    if (action.disabled || action.loading || loadingKey) return

    try {
      setLoadingKey(action.key)
      await action.onSelect?.()
      if (closeOnSelect && !action.keepOpen) setOpen(false)
    } catch (error) {
      onActionError?.(error, action)
      if (!onActionError) throw error
    } finally {
      setLoadingKey(null)
    }
  }

  const triggerAction = (action: ActionMenuItem) => {
    if (lastInvokedActionKeyRef.current === action.key) return
    lastInvokedActionKeyRef.current = action.key
    queueMicrotask(() => {
      if (lastInvokedActionKeyRef.current === action.key) {
        lastInvokedActionKeyRef.current = null
      }
    })
    void handleSelect(action)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        render={
          trigger ?? (
            <Button
              type="button"
              variant={triggerVariant}
              size={triggerSize}
              disabled={disabled}
              className={cn(
                "rounded-full border border-transparent text-muted-foreground shadow-none transition-[background-color,border-color,color,box-shadow] hover:border-border/70 hover:bg-accent hover:text-foreground focus-visible:border-[color:var(--aui-focus-ring,var(--ring))] focus-visible:shadow-[0_0_0_3px_var(--aui-focus-ring-soft,transparent)]",
                triggerClassName
              )}
              onMouseDown={stopInteractivePropagation}
              onDoubleClick={stopInteractivePropagation}
            />
          )
        }
      >
        {!trigger && <MoreHorizontalIcon />}
        {!trigger && showChevron && <span className="text-[10px] font-medium uppercase tracking-[0.18em]">Menu</span>}
        <span className="sr-only">{triggerLabel}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn("min-w-48 rounded-[var(--aui-card-radius,var(--radius-lg))]", contentClassName)}
        style={menuWidth ? { width: typeof menuWidth === "number" ? `${menuWidth}px` : menuWidth } : undefined}
      >
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {label && visibleActions.length > 0 && <DropdownMenuSeparator />}

        {visibleActions.length === 0 && (
          <DropdownMenuItem disabled>{emptyLabel}</DropdownMenuItem>
        )}

        {visibleActions.map((action, index) => {
          const isLoading = action.loading || loadingKey === action.key
          const previousSection = index > 0 ? visibleActions[index - 1]?.section : undefined
          const shouldRenderSection = Boolean(action.section && action.section !== previousSection)

          return (
            <React.Fragment key={action.key}>
              {shouldRenderSection ? (
                <>
                  {index > 0 ? <DropdownMenuSeparator /> : null}
                  <DropdownMenuLabel>{action.section}</DropdownMenuLabel>
                </>
              ) : null}
              <DropdownMenuItem
                disabled={action.disabled || isLoading}
                variant={action.destructive ? "destructive" : "default"}
                closeOnSelect={closeOnSelect && !action.keepOpen}
                aria-roledescription={itemRoleDescription}
                className={cn(
                  "min-h-11 items-start gap-3 rounded-[calc(var(--radius-md)+1px)] border border-transparent py-2.5 transition-[background-color,color,border-color,box-shadow] data-[highlighted]:shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--primary),transparent_76%)] data-[disabled]:opacity-45",
                  itemClassName
                )}
                onSelect={(event) => {
                  if (action.keepOpen || !closeOnSelect) {
                    event.preventDefault()
                  }
                  stopInteractivePropagation(event)
                  triggerAction(action)
                }}
                onClick={(event) => {
                  stopInteractivePropagation(event)
                  triggerAction(action)
                }}
                onMouseDown={stopInteractivePropagation}
                onDoubleClick={stopInteractivePropagation}
              >
                {renderItem?.(action, { loading: isLoading, close: () => setOpen(false) }) ?? (
                  <>
                    <span className={cn("mt-0.5 flex size-5 shrink-0 items-center justify-center text-muted-foreground", !persistIconSpace && !isLoading && !action.icon && "hidden")}>
                      {isLoading ? <Loader2Icon className="size-4 animate-spin" /> : action.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{action.label}</span>
                      {action.description ? (
                        <DropdownMenuItemDescription className="mt-0.5 truncate">
                          {isLoading ? loadingLabel : action.description}
                        </DropdownMenuItemDescription>
                      ) : null}
                    </span>
                    {action.shortcut && (
                      <DropdownMenuShortcut>{action.shortcut}</DropdownMenuShortcut>
                    )}
                  </>
                )}
              </DropdownMenuItem>
            </React.Fragment>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ActionMenu }
