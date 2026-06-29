import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Tooltip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export type SidebarNavItem = {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  badge?: React.ReactNode
  href?: string
  items?: SidebarNavItem[]
  active?: boolean
  current?: React.AriaAttributes["aria-current"]
  disabled?: boolean
  hidden?: boolean
  sectionLabel?: React.ReactNode
  defaultExpanded?: boolean
  tooltip?: React.ReactNode
  onSelect?: () => void
}

export type SidebarNavProps = React.ComponentProps<"nav"> & {
  items: SidebarNavItem[]
  collapsed?: boolean
  tooltipOnCollapsed?: boolean
  itemClassName?: string
  activeItemClassName?: string
  renderItem?: (item: SidebarNavItem, element: React.ReactNode) => React.ReactNode
  renderLink?: (props: React.ComponentProps<"a"> & { item: SidebarNavItem; [key: `data-${string}`]: string | boolean | undefined }) => React.ReactNode
}

function hasVisibleChildren(item: SidebarNavItem) {
  return item.items?.some((child) => !child.hidden) ?? false
}

function isActiveItem(item: SidebarNavItem): boolean {
  if (item.active) return true
  return item.items?.some((child) => isActiveItem(child)) ?? false
}

function SidebarLeaf({
  item,
  collapsed,
  depth,
  itemClassName,
  activeItemClassName,
  renderLink,
}: {
  item: SidebarNavItem
  collapsed: boolean
  depth: number
  itemClassName?: string
  activeItemClassName?: string
  renderLink?: SidebarNavProps["renderLink"]
}) {
  const currentValue: React.AriaAttributes["aria-current"] = item.current ?? (item.active ? "page" : undefined)
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
    "group flex min-h-8 items-center gap-2 rounded-lg border border-transparent px-2 text-sm font-medium transition-[background-color,border-color,color,box-shadow] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
    collapsed && "justify-center px-0",
    depth > 0 && !collapsed && "pl-3",
    itemClassName,
    item.active && activeItemClassName
  )

  const wrapCollapsed = (node: React.ReactNode) =>
    collapsed ? (
      <Tooltip content={item.tooltip ?? item.label} side="right">
        <span className="block">{node}</span>
      </Tooltip>
    ) : (
      node
    )

  const internal = item.href && item.href.startsWith("/")

  if (internal) {
    if (renderLink) {
      return wrapCollapsed(
        renderLink({
          item,
          href: item.href,
          "data-slot": "sidebar-nav-item",
          "data-depth": String(depth),
          "data-active": item.active || undefined,
          "data-disabled": item.disabled || undefined,
          "aria-current": currentValue,
          className: commonClassName,
          onClick: (event) => {
            if (item.disabled) {
              event.preventDefault()
              return
            }
            item.onSelect?.()
          },
          children: content,
        })
      )
    }

    return wrapCollapsed(
      <a
        href={item.href}
        data-slot="sidebar-nav-item"
        data-depth={depth}
        data-active={item.active || undefined}
        data-disabled={item.disabled || undefined}
        aria-current={currentValue}
        className={commonClassName}
        onClick={(event) => {
          if (item.disabled) {
            event.preventDefault()
            return
          }
          item.onSelect?.()
        }}
      >
        {content}
      </a>
    )
  }

  if (item.href) {
    return wrapCollapsed(
      <button
        type="button"
        data-slot="sidebar-nav-item"
        data-depth={depth}
        data-active={item.active || undefined}
        data-disabled={item.disabled || undefined}
        aria-current={currentValue}
        className={cn("w-full text-left", commonClassName)}
        onClick={() => {
          if (item.disabled) return
          const href = item.href
          if (!href) return
          item.onSelect?.()
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

  return wrapCollapsed(
    <button
      type="button"
      data-slot="sidebar-nav-item"
      data-depth={depth}
      data-active={item.active || undefined}
      data-disabled={item.disabled || undefined}
      aria-current={currentValue}
      disabled={item.disabled}
      className={cn("w-full text-left", commonClassName)}
      onClick={item.onSelect}
    >
      {content}
    </button>
  )
}

function SidebarTree({
  items,
  collapsed,
  depth,
  itemClassName,
  activeItemClassName,
  renderItem,
  renderLink,
}: {
  items: SidebarNavItem[]
  collapsed: boolean
  depth: number
  itemClassName?: string
  activeItemClassName?: string
  renderItem?: SidebarNavProps["renderItem"]
  renderLink?: SidebarNavProps["renderLink"]
}) {
  return items.map((item) => {
    if (item.hidden) return null

    const showSectionLabel = !collapsed && depth === 0 && item.sectionLabel
    const hasChildren = hasVisibleChildren(item)

    if (!hasChildren) {
      const element = (
        <SidebarLeaf
          item={item}
          collapsed={collapsed}
          depth={depth}
          itemClassName={itemClassName}
          activeItemClassName={activeItemClassName}
          renderLink={renderLink}
        />
      )

      return (
        <React.Fragment key={item.key}>
          {showSectionLabel ? (
            <div
              data-slot="sidebar-nav-group-label"
              className="px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground first:pt-0"
            >
              {item.sectionLabel}
            </div>
          ) : null}
          {renderItem ? renderItem(item, element) : element}
        </React.Fragment>
      )
    }

    const isExpanded = item.defaultExpanded ?? isActiveItem(item)
    const trigger = (
      <summary
        data-slot="sidebar-nav-group-trigger"
        className={cn(
          "flex min-h-8 list-none items-center gap-2 rounded-lg border border-transparent text-sm font-medium transition-[background-color,border-color,color,box-shadow]",
          collapsed ? "justify-center px-0" : "px-2"
        )}
      >
        {item.icon ? (
          collapsed ? (
            <Tooltip content={item.tooltip ?? item.label} side="right">
              <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
            </Tooltip>
          ) : (
            <span className="shrink-0 [&_svg]:size-4">{item.icon}</span>
          )
        ) : null}
        {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
        {!collapsed && item.badge ? (
          <Badge variant="secondary" className="h-5 shrink-0 px-1.5">
            {item.badge}
          </Badge>
        ) : null}
        {!collapsed && (
          <span
            data-slot="sidebar-nav-group-chevron"
            className="ml-auto text-xs text-muted-foreground transition-transform group-open/sidebar-nav-details:rotate-90"
          >
            ›
          </span>
        )}
      </summary>
    )

    const groupElement = (
      <div data-slot="sidebar-nav-group" data-depth={depth}>
        {showSectionLabel ? (
          <div
            data-slot="sidebar-nav-group-label"
            className="px-2 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground first:pt-0"
          >
            {item.sectionLabel}
          </div>
        ) : null}
        <details
          data-slot="sidebar-nav-group-details"
          open={isExpanded}
          className="group/sidebar-nav-details"
        >
          {trigger}
          <div
            data-slot="sidebar-nav-group-content"
            className={cn("mt-1 grid gap-1", !collapsed && "ml-3 border-l border-border/55 pl-2")}
          >
            <SidebarTree
              items={item.items ?? []}
              collapsed={collapsed}
              depth={depth + 1}
              itemClassName={itemClassName}
              activeItemClassName={activeItemClassName}
              renderItem={renderItem}
              renderLink={renderLink}
            />
          </div>
        </details>
      </div>
    )

    return renderItem ? <React.Fragment key={item.key}>{renderItem(item, groupElement)}</React.Fragment> : <React.Fragment key={item.key}>{groupElement}</React.Fragment>
  })
}

function SidebarNav({
  className,
  items,
  collapsed = false,
  itemClassName,
  activeItemClassName,
  renderItem,
  renderLink,
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
      <SidebarTree
        items={visibleItems}
        collapsed={collapsed}
        depth={0}
        itemClassName={itemClassName}
        activeItemClassName={activeItemClassName}
        renderItem={renderItem}
        renderLink={renderLink}
      />
    </nav>
  )
}

export { SidebarNav }
