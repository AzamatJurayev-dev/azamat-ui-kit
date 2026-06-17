import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export type SidebarNavItem = {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  href?: string
  active?: boolean
  disabled?: boolean
  hidden?: boolean
  onSelect?: () => void
}

export type SidebarNavProps = React.ComponentProps<"nav"> & {
  items: SidebarNavItem[]
  collapsed?: boolean
  itemClassName?: string
  activeItemClassName?: string
  renderItem?: (item: SidebarNavItem, element: React.ReactNode) => React.ReactNode
}

function SidebarNav({
  className,
  items,
  collapsed = false,
  itemClassName,
  activeItemClassName,
  renderItem,
  ...props
}: SidebarNavProps) {
  const visibleItems = items.filter((item) => !item.hidden)

  return (
    <nav
      data-slot="sidebar-nav"
      data-collapsed={collapsed || undefined}
      className={cn("grid gap-1", className)}
      {...props}
    >
      {visibleItems.map((item) => {
        const content = (
          <>
            {item.icon && <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>}
            {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
            {!collapsed && item.badge && (
              <Badge variant="secondary" className="ml-auto h-5 shrink-0 px-1.5">
                {item.badge}
              </Badge>
            )}
          </>
        )

        const commonClassName = cn(
          "group flex min-h-8 items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground data-[active=true]:bg-muted data-[active=true]:text-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
          collapsed && "justify-center px-0",
          itemClassName,
          item.active && activeItemClassName
        )

        const isInternalLink = item.href && item.href.startsWith("/")

        const element = item.href && isInternalLink ? (
          <Link
            key={item.key}
            to={item.href}
            data-active={item.active || undefined}
            data-disabled={item.disabled || undefined}
            aria-current={item.active ? "page" : undefined}
            className={commonClassName}
            onClick={(event) => {
              if (item.disabled) event.preventDefault()
              item.onSelect?.()
            }}
          >
            {content}
          </Link>
        ) : item.href ? (
          <a
            key={item.key}
            href={item.href}
            data-active={item.active || undefined}
            data-disabled={item.disabled || undefined}
            aria-current={item.active ? "page" : undefined}
            className={commonClassName}
            onClick={(event) => {
              if (item.disabled) event.preventDefault()
              item.onSelect?.()
            }}
          >
            {content}
          </a>
        ) : (
          <button
            key={item.key}
            type="button"
            data-active={item.active || undefined}
            data-disabled={item.disabled || undefined}
            disabled={item.disabled}
            className={cn("w-full text-left", commonClassName)}
            onClick={item.onSelect}
          >
            {content}
          </button>
        )

        return renderItem ? (
          <React.Fragment key={item.key}>{renderItem(item, element)}</React.Fragment>
        ) : (
          element
        )
      })}
    </nav>
  )
}

export { SidebarNav }
