import * as React from "react"

import { Tooltip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type AppSidebarNavItem = {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  href?: string
  items?: AppSidebarNavItem[]
  active?: boolean
  disabled?: boolean
  badge?: React.ReactNode
  hidden?: boolean
  sectionLabel?: React.ReactNode
  defaultExpanded?: boolean
  current?: React.AriaAttributes["aria-current"]
  tooltip?: React.ReactNode
  onSelect?: () => void
}

export type AppSidebarProps = React.ComponentProps<"aside"> & {
  header?: React.ReactNode
  footer?: React.ReactNode
  items?: AppSidebarNavItem[]
  collapsed?: boolean
  collapsedRail?: React.ReactNode
  footerSecondary?: React.ReactNode
  tooltipOnCollapsed?: boolean
  onItemSelect?: (item: AppSidebarNavItem) => void
  renderItem?: (item: AppSidebarNavItem, state: { collapsed: boolean }) => React.ReactNode
  renderLink?: (props: React.ComponentProps<"a"> & { item: AppSidebarNavItem; [key: `data-${string}`]: string | boolean | undefined }) => React.ReactNode
}

function hasVisibleSidebarChildren(item: AppSidebarNavItem) {
  return item.items?.some((child) => !child.hidden) ?? false
}

function isSidebarItemActive(item: AppSidebarNavItem): boolean {
  if (item.active) return true
  return item.items?.some((child) => isSidebarItemActive(child)) ?? false
}

function SidebarLeafItem({
  item,
  collapsed,
  depth,
  onItemSelect,
  renderLink,
}: {
  item: AppSidebarNavItem
  collapsed: boolean
  depth: number
  onItemSelect?: (item: AppSidebarNavItem) => void
  renderLink?: AppSidebarProps["renderLink"]
}) {
  const currentValue: React.AriaAttributes["aria-current"] = item.current ?? (item.active ? "page" : undefined)
  const commonProps = {
    "aria-current": currentValue,
    "aria-disabled": item.disabled || undefined,
    "data-slot": "app-sidebar-item" as const,
    "data-active": item.active || undefined,
    "data-disabled": item.disabled || undefined,
    "data-depth": String(depth),
    className: cn(
      "flex min-h-9 items-center gap-2 rounded-lg border border-transparent px-2.5 text-sm font-medium outline-none transition-[background-color,border-color,color,box-shadow] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      collapsed && "justify-center px-2"
    ),
  }

  const content = (
    <>
      {item.icon && <span className="shrink-0">{item.icon}</span>}
      {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
      {!collapsed && item.badge && <span className="shrink-0">{item.badge}</span>}
    </>
  )

  const wrapCollapsedContent = (node: React.ReactNode) =>
    collapsed ? (
      <Tooltip content={item.tooltip ?? item.label} side="right">
        <span className="block">{node}</span>
      </Tooltip>
    ) : (
      node
    )

  if (item.href?.startsWith("/")) {
    if (renderLink) {
      return wrapCollapsedContent(
        <>
          {renderLink({
            item,
            href: item.href,
            ...commonProps,
            onClick: (event) => {
              if (item.disabled) {
                event.preventDefault()
                return
              }
              item.onSelect?.()
              onItemSelect?.(item)
            },
            children: content,
          })}
        </>
      )
    }

    return wrapCollapsedContent(
      <a
        href={item.href}
        {...commonProps}
        onClick={(event) => {
          if (item.disabled) {
            event.preventDefault()
            return
          }
          item.onSelect?.()
          onItemSelect?.(item)
        }}
      >
        {content}
      </a>
    )
  }

  if (item.href) {
    return wrapCollapsedContent(
      <button
        type="button"
        {...commonProps}
        className={cn(commonProps.className, "w-full")}
        onClick={() => {
          if (item.disabled) return
          const href = item.href
          if (!href) return
          item.onSelect?.()
          onItemSelect?.(item)
          if (href.startsWith("http")) {
            window.open(href, "_blank", "noopener,noreferrer")
            return
          }
          window.location.assign(href)
        }}
      >
        {content}
      </button>
    )
  }

  return wrapCollapsedContent(
    <button
      type="button"
      disabled={item.disabled}
      {...commonProps}
      onClick={() => {
        item.onSelect?.()
        onItemSelect?.(item)
      }}
    >
      {content}
    </button>
  )
}

function SidebarTree({
  items,
  collapsed,
  depth,
  onItemSelect,
  renderLink,
}: {
  items: AppSidebarNavItem[]
  collapsed: boolean
  depth: number
  onItemSelect?: (item: AppSidebarNavItem) => void
  renderLink?: AppSidebarProps["renderLink"]
}) {
  return items.map((item) => {
    if (item.hidden) return null

    const hasChildren = hasVisibleSidebarChildren(item)
    const active = isSidebarItemActive(item)
    const showSectionLabel = !collapsed && depth === 0 && item.sectionLabel

    if (!hasChildren) {
      return (
        <React.Fragment key={item.key}>
          {showSectionLabel ? (
            <div
              data-slot="app-sidebar-group-label"
              className="px-2.5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground first:pt-0"
            >
              {item.sectionLabel}
            </div>
          ) : null}
          <SidebarLeafItem
            item={item}
            collapsed={collapsed}
            depth={depth}
            onItemSelect={onItemSelect}
            renderLink={renderLink}
          />
        </React.Fragment>
      )
    }

    const defaultExpanded = item.defaultExpanded ?? active

    return (
      <div key={item.key} data-slot="app-sidebar-group" data-depth={depth}>
        {showSectionLabel && (
          <div
            data-slot="app-sidebar-group-label"
            className="px-2.5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground first:pt-0"
          >
            {item.sectionLabel}
          </div>
        )}
        <details data-slot="app-sidebar-group-details" open={defaultExpanded} className="group/app-sidebar-details">
          <summary
            data-slot="app-sidebar-group-trigger"
            className={cn(
              "flex min-h-9 list-none items-center gap-2 rounded-lg border border-transparent text-sm font-medium outline-none transition-[background-color,border-color,color,box-shadow]",
              collapsed ? "justify-center px-2" : "px-2.5"
            )}
          >
            {item.icon ? (
              collapsed ? (
                <Tooltip content={item.tooltip ?? item.label} side="right">
                  <span className="shrink-0">{item.icon}</span>
                </Tooltip>
              ) : (
                <span className="shrink-0">{item.icon}</span>
              )
            ) : null}
            {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
            {!collapsed && item.badge && <span className="shrink-0">{item.badge}</span>}
            {!collapsed && <span data-slot="app-sidebar-group-chevron" className="ml-auto text-xs text-muted-foreground transition-transform group-open/app-sidebar-details:rotate-90">›</span>}
          </summary>
          <div data-slot="app-sidebar-group-content" className={cn("mt-1 space-y-1", !collapsed && "pl-3")}>
            <SidebarTree
              items={item.items ?? []}
              collapsed={collapsed}
              depth={depth + 1}
              onItemSelect={onItemSelect}
              renderLink={renderLink}
            />
          </div>
        </details>
      </div>
    )
  })
}

function AppSidebar({
  className,
  header,
  footer,
  items = [],
  collapsed = false,
  collapsedRail,
  footerSecondary,
  tooltipOnCollapsed = true,
  onItemSelect,
  renderItem,
  renderLink,
  children,
  ...props
}: AppSidebarProps) {
  const visibleItems = items.filter((item) => !item.hidden)

  return (
    <aside
      data-slot="app-sidebar"
      data-collapsed={collapsed || undefined}
      className={cn("flex h-full min-h-0 flex-col", className)}
      {...props}
    >
      {header && <div data-slot="app-sidebar-header" className="shrink-0 border-b p-3">{header}</div>}

      <nav data-slot="app-sidebar-nav" className="min-h-0 flex-1 space-y-1 overflow-y-auto p-2">
        {children ??
          visibleItems.map((item) => {
            if (!renderItem) return null

            const renderedItem = renderItem(item, { collapsed })
            if (!collapsed || !tooltipOnCollapsed) {
              return <React.Fragment key={item.key}>{renderedItem}</React.Fragment>
            }

            return (
              <Tooltip key={item.key} content={item.tooltip ?? item.label} side="right">
                <span className="block">{renderedItem}</span>
              </Tooltip>
            )
          })}
        {!children && !renderItem && (
          <SidebarTree
            items={visibleItems}
            collapsed={collapsed}
            depth={0}
            onItemSelect={onItemSelect}
            renderLink={renderLink}
          />
        )}
      </nav>

      {(footerSecondary || footer || (collapsed && collapsedRail)) && (
        <div data-slot="app-sidebar-footer" className="shrink-0 border-t p-3">
          {collapsed && collapsedRail ? <div data-slot="app-sidebar-rail">{collapsedRail}</div> : null}
          {!collapsed && footerSecondary ? (
            <div data-slot="app-sidebar-footer-secondary" className="mb-3">
              {footerSecondary}
            </div>
          ) : null}
          {!collapsed && footer}
        </div>
      )}
    </aside>
  )
}

export { AppSidebar }
