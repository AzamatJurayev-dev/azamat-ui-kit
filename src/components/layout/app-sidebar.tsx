import * as React from "react"

import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export type AppSidebarNavItem = {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  href?: string
  active?: boolean
  disabled?: boolean
  badge?: React.ReactNode
  hidden?: boolean
  onSelect?: () => void
}

export type AppSidebarProps = React.ComponentProps<"aside"> & {
  header?: React.ReactNode
  footer?: React.ReactNode
  items?: AppSidebarNavItem[]
  collapsed?: boolean
  onItemSelect?: (item: AppSidebarNavItem) => void
  renderItem?: (item: AppSidebarNavItem, state: { collapsed: boolean }) => React.ReactNode
}

function AppSidebar({
  className,
  header,
  footer,
  items = [],
  collapsed = false,
  onItemSelect,
  renderItem,
  children,
  ...props
}: AppSidebarProps) {
  const visibleItems = items.filter((item) => !item.hidden)

  return (
    <aside
      data-slot="app-sidebar"
      data-collapsed={collapsed || undefined}
      className={cn("flex h-full min-h-0 flex-col bg-sidebar text-sidebar-foreground", className)}
      {...props}
    >
      {header && <div className="shrink-0 border-b p-3">{header}</div>}

      <nav data-slot="app-sidebar-nav" className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
        {children ??
          visibleItems.map((item) =>
            renderItem ? (
              <React.Fragment key={item.key}>{renderItem(item, { collapsed })}</React.Fragment>
            ) : (
              item.href?.startsWith("/") ? (
                <Link
                  key={item.key}
                  to={item.href}
                  aria-current={item.active ? "page" : undefined}
                  aria-disabled={item.disabled || undefined}
                  data-active={item.active || undefined}
                  data-disabled={item.disabled || undefined}
                  className={cn(
                    "flex min-h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                    collapsed && "justify-center px-2"
                  )}
                  onClick={(event) => {
                    if (item.disabled) {
                      event.preventDefault()
                      return
                    }

                    item.onSelect?.()
                    onItemSelect?.(item)
                  }}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                  {!collapsed && item.badge && <span className="shrink-0">{item.badge}</span>}
                </Link>
              ) : item.href ? (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer noopener" : undefined}
                  aria-current={item.active ? "page" : undefined}
                  aria-disabled={item.disabled || undefined}
                  data-active={item.active || undefined}
                  data-disabled={item.disabled || undefined}
                  className={cn(
                    "flex min-h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                    collapsed && "justify-center px-2"
                  )}
                  onClick={(event) => {
                    if (item.disabled) {
                      event.preventDefault()
                      return
                    }

                    item.onSelect?.()
                    onItemSelect?.(item)
                  }}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                  {!collapsed && item.badge && <span className="shrink-0">{item.badge}</span>}
                </a>
              ) : (
                <button
                  key={item.key}
                  type="button"
                  disabled={item.disabled}
                  aria-current={item.active ? "page" : undefined}
                  aria-disabled={item.disabled || undefined}
                  data-active={item.active || undefined}
                  data-disabled={item.disabled || undefined}
                  className={cn(
                    "flex min-h-9 items-center gap-2 rounded-lg px-2.5 text-sm font-medium outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
                    collapsed && "justify-center px-2"
                  )}
                  onClick={() => {
                    item.onSelect?.()
                    onItemSelect?.(item)
                  }}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                  {!collapsed && item.badge && <span className="shrink-0">{item.badge}</span>}
                </button>
              )
            )
          )}
      </nav>

      {footer && <div className="shrink-0 border-t p-3">{footer}</div>}
    </aside>
  )
}

export { AppSidebar }
