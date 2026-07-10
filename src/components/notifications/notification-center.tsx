import * as React from "react"
import { BellIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export type NotificationItem = {
  id: string
  title: React.ReactNode
  description?: React.ReactNode
  time?: React.ReactNode
  read?: boolean
  group?: React.ReactNode
}

export type NotificationCenterProps = React.ComponentProps<"div"> & {
  notifications: NotificationItem[]
  onMarkAllRead?: () => void
  onClearAll?: () => void
  onNotificationClick?: (notification: NotificationItem) => void
  emptyLabel?: React.ReactNode
  title?: React.ReactNode
}

function NotificationCenter({
  notifications,
  onMarkAllRead,
  onClearAll,
  onNotificationClick,
  emptyLabel = "No new notifications",
  title = "Notifications",
  className,
  ...props
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length
  const groupedNotifications = notifications.reduce<Record<string, NotificationItem[]>>((accumulator, notification) => {
    const key = String(notification.group ?? "Recent")
    accumulator[key] = [...(accumulator[key] ?? []), notification]
    return accumulator
  }, {})

  return (
    <div data-slot="notification-center" className={className} {...props}>
      <Popover>
        <Button
          render={<PopoverTrigger />}
          variant="ghost"
          size="icon"
          className="relative rounded-full border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-control-bg)] text-foreground shadow-sm hover:bg-[color:color-mix(in_srgb,var(--aui-control-bg)_82%,white_18%)]"
        >
          <BellIcon className="size-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-[color:var(--aui-brand-strong)] px-1.5 py-0.5 text-[10px] font-bold leading-none text-white shadow-[0_8px_20px_rgba(16,185,129,0.35)]">
              {unreadCount}
              <span className="sr-only">{unreadCount} unread notifications</span>
            </span>
          )}
        </Button>
        <PopoverContent
          className="w-[24rem] overflow-hidden rounded-3xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-page-bg)] p-0 shadow-[0_24px_60px_rgba(15,23,42,0.18)]"
          align="end"
        >
          <div className="flex items-center justify-between border-b border-[color:var(--aui-surface-border)] bg-[color:var(--aui-control-bg)] px-5 py-4">
            <div className="grid gap-0.5">
              <h4 className="font-semibold tracking-tight text-foreground">{title}</h4>
              <span className="text-xs text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread update${unreadCount > 1 ? "s" : ""}` : "You're all caught up"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && onMarkAllRead ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full border border-[color:var(--aui-surface-border)] px-3 text-xs font-semibold text-muted-foreground hover:bg-[color:var(--aui-page-bg)] hover:text-foreground"
                  onClick={onMarkAllRead}
                >
                  Mark all read
                </Button>
              ) : null}
              {notifications.length > 0 && onClearAll ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 rounded-full border border-[color:var(--aui-surface-border)] px-3 text-xs font-semibold text-muted-foreground hover:bg-[color:var(--aui-page-bg)] hover:text-foreground"
                  onClick={onClearAll}
                >
                  Clear all
                </Button>
              ) : null}
            </div>
          </div>
          <div className="max-h-[400px] overflow-y-auto bg-[color:var(--aui-page-bg)] p-2">
            {notifications.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[color:var(--aui-surface-border)] px-6 py-10 text-center text-sm text-muted-foreground">
                {emptyLabel}
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {Object.entries(groupedNotifications).map(([group, groupItems]) => (
                  <div key={group} className="grid gap-2">
                    <div className="px-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{group}</div>
                    {groupItems.map((notification) => (
                      <button
                        key={notification.id}
                        className={cn(
                          "flex flex-col gap-1 rounded-2xl border border-transparent px-4 py-3 text-left transition hover:border-[color:var(--aui-surface-border)] hover:bg-[color:var(--aui-control-bg)]",
                          !notification.read && "border-[color:color-mix(in_srgb,var(--aui-brand-strong)_16%,var(--aui-surface-border))] bg-[color:color-mix(in_srgb,var(--aui-brand-strong)_8%,var(--aui-control-bg))]"
                        )}
                        onClick={() => onNotificationClick?.(notification)}
                      >
                        <div className="flex w-full items-start justify-between gap-2">
                          <span className="text-sm font-semibold leading-tight text-foreground">
                            {notification.title}
                          </span>
                          {!notification.read && (
                            <span className="mt-1 flex size-2 shrink-0 rounded-full bg-[color:var(--aui-brand-strong)] shadow-[0_0_0_4px_color-mix(in_srgb,var(--aui-brand-strong)_14%,transparent)]" />
                          )}
                        </div>
                        {notification.description && (
                          <span className="line-clamp-2 text-xs leading-5 text-muted-foreground">
                            {notification.description}
                          </span>
                        )}
                        {notification.time && (
                          <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground/80">
                            {notification.time}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export { NotificationCenter }
