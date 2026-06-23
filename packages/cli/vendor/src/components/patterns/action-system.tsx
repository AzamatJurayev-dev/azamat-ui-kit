import * as React from "react"
import { MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type MaybeFn<TItem, TResult> = TResult | ((item: TItem) => TResult)

function resolveMaybeFn<TItem, TResult>(value: MaybeFn<TItem, TResult> | undefined, item: TItem): TResult | undefined {
  return typeof value === "function" ? (value as (item: TItem) => TResult)(item) : value
}

export type ActionSystemAction<TItem = unknown> = {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  description?: React.ReactNode
  variant?: React.ComponentProps<typeof Button>["variant"]
  disabled?: MaybeFn<TItem, boolean>
  hidden?: MaybeFn<TItem, boolean>
  confirm?: MaybeFn<TItem, string | { title?: string; description?: string } | undefined>
  onClick?: (item: TItem, action: ActionSystemAction<TItem>) => void
}

export type ActionSystemLabels = {
  more?: React.ReactNode
  menu?: React.ReactNode
  confirmFallback?: string
}

export type ActionSystemProps<TItem = unknown> = React.ComponentProps<"div"> & {
  item: TItem
  actions: ActionSystemAction<TItem>[]
  mode?: "inline" | "menu" | "hybrid"
  maxInline?: number
  size?: React.ComponentProps<typeof Button>["size"]
  labels?: ActionSystemLabels
  onAction?: (item: TItem, action: ActionSystemAction<TItem>) => void
  renderAction?: (action: ActionSystemAction<TItem>, item: TItem, state: { disabled: boolean }) => React.ReactNode
  renderMenuItem?: (action: ActionSystemAction<TItem>, item: TItem, state: { disabled: boolean }) => React.ReactNode
}

function ActionSystem<TItem = unknown>({
  item,
  actions,
  mode = "hybrid",
  maxInline = 2,
  size = "sm",
  labels,
  onAction,
  renderAction,
  renderMenuItem,
  className,
  ...props
}: ActionSystemProps<TItem>) {
  const visibleActions = actions.filter((action) => !resolveMaybeFn(action.hidden, item))
  const inlineActions = mode === "menu" ? [] : visibleActions.slice(0, mode === "inline" ? visibleActions.length : maxInline)
  const menuActions = mode === "inline" ? [] : visibleActions.slice(mode === "menu" ? 0 : maxInline)

  const runAction = (action: ActionSystemAction<TItem>) => {
    const confirm = resolveMaybeFn(action.confirm, item)
    if (confirm) {
      const message = typeof confirm === "string" ? confirm : confirm.description ?? confirm.title ?? labels?.confirmFallback ?? "Are you sure?"
      if (typeof window !== "undefined" && !window.confirm(message)) return
    }

    action.onClick?.(item, action)
    onAction?.(item, action)
  }

  return (
    <div data-slot="action-system" className={cn("inline-flex items-center gap-2", className)} {...props}>
      {inlineActions.map((action) => {
        const disabled = Boolean(resolveMaybeFn(action.disabled, item))
        return renderAction?.(action, item, { disabled }) ?? (
          <Button key={action.key} type="button" size={size} variant={action.variant ?? "outline"} disabled={disabled} onClick={() => runAction(action)}>
            {action.icon}
            {action.label}
          </Button>
        )
      })}
      {menuActions.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button type="button" size={size} variant="outline" />}>
            <MoreHorizontalIcon />
            <span className="sr-only">{labels?.more ?? "More actions"}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-48">
            {labels?.menu && <DropdownMenuLabel>{labels.menu}</DropdownMenuLabel>}
            {menuActions.map((action) => {
              const disabled = Boolean(resolveMaybeFn(action.disabled, item))
              return renderMenuItem?.(action, item, { disabled }) ?? (
                <DropdownMenuItem key={action.key} disabled={disabled} variant={action.variant === "destructive" ? "destructive" : "default"} onClick={() => runAction(action)}>
                  {action.icon}
                  <span className="grid gap-0.5">
                    <span>{action.label}</span>
                    {action.description && <span className="text-xs text-muted-foreground">{action.description}</span>}
                  </span>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export { ActionSystem }
