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
  label?: React.ReactNode
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
}

function ActionMenu({
  actions,
  label,
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
}: ActionMenuProps) {
  const visibleActions = actions.filter((action) => !action.hidden)
  const [loadingKey, setLoadingKey] = React.useState<string | null>(null)
  const [open, setOpen] = React.useState(false)

  const handleSelect = async (action: ActionMenuItem) => {
    if (action.disabled || action.loading || loadingKey) return

    try {
      setLoadingKey(action.key)
      await action.onSelect?.()
      if (closeOnSelect && !action.keepOpen) setOpen(false)
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
        <span className="sr-only">Open actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn("min-w-48 rounded-[var(--aui-card-radius,var(--radius-lg))]", contentClassName)}
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
            <DropdownMenuItem
              key={action.key}
              disabled={action.disabled || isLoading}
              variant={action.destructive ? "destructive" : "default"}
              className={cn(
                "transition-[background-color,color,border-color] hover:bg-accent hover:text-accent-foreground data-[disabled]:opacity-45",
                itemClassName
              )}
              onClick={(event) => {
                stopInteractivePropagation(event)
                void handleSelect(action)
              }}
              onMouseDown={stopInteractivePropagation}
              onDoubleClick={stopInteractivePropagation}
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : action.icon}
              <span className="min-w-0 flex-1">
                <span className="block truncate">{action.label}</span>
                {action.description ? (
                  <span className="block truncate text-[11px] font-normal text-muted-foreground">{action.description}</span>
                ) : null}
              </span>
              {action.shortcut && (
                <span className="ml-auto pl-3 text-[11px] tracking-[0.14em] text-muted-foreground">{action.shortcut}</span>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ActionMenu }
