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
}

export type NotificationCenterProps = React.ComponentProps<"div"> & {
  notifications: NotificationItem[]
  onMarkAllRead?: () => void
  onNotificationClick?: (notification: NotificationItem) => void
  emptyLabel?: React.ReactNode
  title?: React.ReactNode
}

function NotificationCenter({
  notifications,
  onMarkAllRead,
  onNotificationClick,
  emptyLabel = "No new notifications",
  title = "Notifications",
  className,
  ...props
}: NotificationCenterProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div data-slot="notification-center" className={className} {...props}>
      <Popover>
        <Button render={<PopoverTrigger />} variant="ghost" size="icon" className="relative">
          <BellIcon className="size-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex size-2 items-center justify-center rounded-full bg-destructive">
                <span className="sr-only">{unreadCount} unread notifications</span>
              </span>
            )}
          </Button>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h4 className="font-semibold">{title}</h4>
            {unreadCount > 0 && onMarkAllRead && (
              <Button
                variant="ghost"
                size="sm"
                className="h-auto px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
                onClick={onMarkAllRead}
              >
                Mark all read
              </Button>
            )}
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                {emptyLabel}
              </div>
            ) : (
              <div className="flex flex-col">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    className={cn(
                      "flex flex-col gap-1 border-b px-4 py-3 text-left transition-colors hover:bg-muted/50 last:border-0",
                      !notification.read && "bg-muted/20"
                    )}
                    onClick={() => onNotificationClick?.(notification)}
                  >
                    <div className="flex w-full items-start justify-between gap-2">
                      <span className="font-medium text-sm leading-tight">
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <span className="mt-1 flex size-2 shrink-0 rounded-full bg-primary" />
                      )}
                    </div>
                    {notification.description && (
                      <span className="line-clamp-2 text-xs text-muted-foreground">
                        {notification.description}
                      </span>
                    )}
                    {notification.time && (
                      <span className="mt-1 text-[10px] font-medium text-muted-foreground/80">
                        {notification.time}
                      </span>
                    )}
                  </button>
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
