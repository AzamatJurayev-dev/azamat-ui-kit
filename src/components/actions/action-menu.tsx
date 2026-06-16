import * as React from "react"
import { Loader2Icon, MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export type ActionMenuItem = {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  shortcut?: React.ReactNode
  disabled?: boolean
  loading?: boolean
  destructive?: boolean
  hidden?: boolean
  onSelect?: () => void | Promise<void>
}

export type ActionMenuProps = {
  actions: ActionMenuItem[]
  label?: React.ReactNode
  trigger?: React.ReactNode
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
  disabled?: boolean
  contentClassName?: string
  triggerClassName?: string
  emptyLabel?: React.ReactNode
}

function ActionMenu({
  actions,
  label,
  trigger,
  align = "end",
  side = "bottom",
  sideOffset = 4,
  disabled = false,
  contentClassName,
  triggerClassName,
  emptyLabel = "No actions",
}: ActionMenuProps) {
  const visibleActions = actions.filter((action) => !action.hidden)
  const [loadingKey, setLoadingKey] = React.useState<string | null>(null)

  const handleSelect = async (action: ActionMenuItem) => {
    if (action.disabled || action.loading || loadingKey) return

    try {
      setLoadingKey(action.key)
      await action.onSelect?.()
    } finally {
      setLoadingKey(null)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          trigger ?? (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              disabled={disabled}
              className={triggerClassName}
            />
          )
        }
      >
        {!trigger && <MoreHorizontalIcon />}
        <span className="sr-only">Open actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn("min-w-40", contentClassName)}
      >
        {label && <DropdownMenuLabel>{label}</DropdownMenuLabel>}
        {label && visibleActions.length > 0 && <DropdownMenuSeparator />}

        {visibleActions.length === 0 && (
          <DropdownMenuItem disabled>{emptyLabel}</DropdownMenuItem>
        )}

        {visibleActions.map((action) => {
          const isLoading = action.loading || loadingKey === action.key

          return (
            <DropdownMenuItem
              key={action.key}
              disabled={action.disabled || isLoading}
              variant={action.destructive ? "destructive" : "default"}
              onClick={() => void handleSelect(action)}
            >
              {isLoading ? <Loader2Icon className="animate-spin" /> : action.icon}
              <span className="min-w-0 flex-1 truncate">{action.label}</span>
              {action.shortcut && (
                <span className="ml-auto text-xs text-muted-foreground">{action.shortcut}</span>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ActionMenu }
