"use client"

import * as React from "react"
import { ChevronRightIcon, MenuIcon, XIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-is-mobile"
import { Tooltip } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ControllableDetails } from "./controllable-details"
import { useSidebar } from "./sidebar-context"

export type SidebarItem = {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  href?: string
  items?: SidebarItem[]
  active?: boolean
  disabled?: boolean
  badge?: React.ReactNode
  hidden?: boolean
  sectionLabel?: React.ReactNode
  defaultExpanded?: boolean
  expanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  current?: React.AriaAttributes["aria-current"]
  tooltip?: React.ReactNode
  onSelect?: () => void
}

export type SidebarFooterAccount = {
  label: React.ReactNode
  description?: React.ReactNode
  avatar?: React.ReactNode
  href?: string
  tooltip?: React.ReactNode
  onSelect?: () => void
}

export type SidebarProps = React.ComponentProps<"aside"> & {
  header?: React.ReactNode
  footer?: React.ReactNode
  items?: SidebarItem[]
  collapsed?: boolean
  width?: React.CSSProperties["width"]
  collapsedWidth?: React.CSSProperties["width"]
  mobileWidth?: React.CSSProperties["width"]
  collapsedRail?: React.ReactNode
  railItems?: SidebarItem[]
  footerAccount?: SidebarFooterAccount
  secondaryActions?: SidebarItem[]
  footerSecondary?: React.ReactNode
  tooltipOnCollapsed?: boolean
  showSectionLabels?: boolean
  itemSize?: "sm" | "md" | "lg"
  activeIndicator?: "none" | "bar" | "pill"
  navigationLabel?: string
  responsive?: boolean
  mobileBreakpoint?: number
  mobileOpen?: boolean
  defaultMobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
  mobileTitle?: React.ReactNode
  mobileDescription?: React.ReactNode
  mobileToggleLabel?: string
  mobileCloseLabel?: string
  mobileToggleIcon?: React.ReactNode
  showMobileToggle?: boolean
  closeOnSelect?: boolean
  mobileToggleClassName?: string
  mobilePanelClassName?: string
  mobileOverlayClassName?: string
  footerClassName?: string
  renderMobileToggle?: (state: { open: boolean; setOpen: (open: boolean) => void }) => React.ReactNode
  onItemSelect?: (item: SidebarItem) => void
  renderItem?: (item: SidebarItem, state: { collapsed: boolean }) => React.ReactNode
  renderLink?: (props: React.ComponentProps<"a"> & { item: SidebarItem; [key: `data-${string}`]: string | boolean | undefined }) => React.ReactNode
}

const DEFAULT_SIDEBAR_BREAKPOINT = 1024
const DEFAULT_SIDEBAR_WIDTH = "18rem"
const DEFAULT_COLLAPSED_SIDEBAR_WIDTH = "4.75rem"
const DEFAULT_MOBILE_SIDEBAR_WIDTH = "min(88vw, 22rem)"

function getSidebarInteractiveClassName({
  active,
  disabled,
}: {
  active?: boolean
  disabled?: boolean
}) {
  return cn(
    "border border-transparent bg-transparent text-[color:color-mix(in_oklch,var(--sidebar-foreground),transparent_6%)] hover:border-[color:var(--aui-sidebar-item-active-border)] hover:bg-[color:var(--aui-sidebar-item-hover-bg)] hover:text-[color:var(--sidebar-foreground)] focus-visible:border-[color:var(--sidebar-ring)] focus-visible:bg-[color:var(--aui-sidebar-item-hover-bg)] focus-visible:text-[color:var(--sidebar-foreground)] focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--sidebar-ring),transparent_82%)]",
    active &&
      "border-[color:var(--aui-sidebar-item-active-border)] bg-[color:var(--aui-sidebar-item-active-bg)] text-[color:var(--aui-sidebar-item-active-fg)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_24px_color-mix(in_oklch,var(--sidebar-primary),transparent_88%)]",
    disabled && "hover:border-transparent hover:bg-transparent hover:text-[color:color-mix(in_oklch,var(--sidebar-foreground),transparent_6%)]"
  )
}

function getSidebarItemLayoutClassName({
  collapsed,
  depth,
  itemSize,
  activeIndicator,
}: {
  collapsed: boolean
  depth: number
  itemSize: NonNullable<SidebarProps["itemSize"]>
  activeIndicator: NonNullable<SidebarProps["activeIndicator"]>
}) {
  return cn(
    "relative w-full rounded-[min(var(--radius-xl),14px)] py-2",
    itemSize === "sm" && "min-h-8 text-xs",
    itemSize === "md" && "min-h-9 text-sm",
    itemSize === "lg" && "min-h-11 text-sm",
    collapsed ? "justify-center px-2" : "px-2.5",
    !collapsed && depth > 0 && "pl-3",
    activeIndicator === "bar" &&
      "data-[active=true]:pl-4 before:pointer-events-none before:absolute before:left-1.5 before:top-1/2 before:hidden before:h-5 before:w-1 before:-translate-y-1/2 before:rounded-full before:bg-[color:var(--sidebar-primary)] data-[active=true]:before:block",
    activeIndicator === "pill" && "rounded-full",
    activeIndicator === "none" && "data-[active=true]:shadow-none"
  )
}

function hasVisibleSidebarChildren(item: SidebarItem) {
  return item.items?.some((child) => !child.hidden) ?? false
}

function isSidebarItemActive(item: SidebarItem): boolean {
  if (item.active) return true
  return item.items?.some((child) => isSidebarItemActive(child)) ?? false
}

function triggerSidebarItem(item: SidebarItem, onItemSelect?: (item: SidebarItem) => void) {
  item.onSelect?.()
  onItemSelect?.(item)
}

function SidebarLeafItem({
  item,
  collapsed,
  depth,
  itemSize,
  activeIndicator,
  onItemSelect,
  renderLink,
}: {
  item: SidebarItem
  collapsed: boolean
  depth: number
  itemSize: NonNullable<SidebarProps["itemSize"]>
  activeIndicator: NonNullable<SidebarProps["activeIndicator"]>
  onItemSelect?: (item: SidebarItem) => void
  renderLink?: SidebarProps["renderLink"]
}) {
  const currentValue: React.AriaAttributes["aria-current"] = item.current ?? (item.active ? "page" : undefined)
  const commonProps = {
    "aria-current": currentValue,
    "aria-disabled": item.disabled || undefined,
    "data-slot": "sidebar-item" as const,
    "data-active": item.active || undefined,
    "data-disabled": item.disabled || undefined,
    "data-depth": String(depth),
    "data-size": itemSize,
    "data-active-indicator": activeIndicator,
    className: cn(
      "flex items-center gap-2 border border-transparent font-medium outline-none transition-[background-color,border-color,color,box-shadow] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
      getSidebarInteractiveClassName({ active: item.active, disabled: item.disabled }),
      getSidebarItemLayoutClassName({ collapsed, depth, itemSize, activeIndicator })
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
              triggerSidebarItem(item, onItemSelect)
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
          triggerSidebarItem(item, onItemSelect)
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
          triggerSidebarItem(item, onItemSelect)
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
        if (item.disabled) return
        triggerSidebarItem(item, onItemSelect)
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
  showSectionLabels,
  itemSize,
  activeIndicator,
  onItemSelect,
  renderLink,
}: {
  items: SidebarItem[]
  collapsed: boolean
  depth: number
  showSectionLabels: boolean
  itemSize: NonNullable<SidebarProps["itemSize"]>
  activeIndicator: NonNullable<SidebarProps["activeIndicator"]>
  onItemSelect?: (item: SidebarItem) => void
  renderLink?: SidebarProps["renderLink"]
}) {
  return items.map((item) => {
    if (item.hidden) return null

    const hasChildren = hasVisibleSidebarChildren(item)
    const active = isSidebarItemActive(item)
    const showSectionLabel = showSectionLabels && !collapsed && depth === 0 && item.sectionLabel

    if (!hasChildren) {
      return (
        <React.Fragment key={item.key}>
          {showSectionLabel ? (
            <div
              data-slot="sidebar-group-label"
              className="px-2.5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklch,var(--sidebar-foreground),transparent_42%)] first:pt-0"
            >
              {item.sectionLabel}
            </div>
          ) : null}
          <SidebarLeafItem
            item={item}
            collapsed={collapsed}
            depth={depth}
            itemSize={itemSize}
            activeIndicator={activeIndicator}
            onItemSelect={onItemSelect}
            renderLink={renderLink}
          />
        </React.Fragment>
      )
    }

    const defaultExpanded = item.defaultExpanded ?? active

    return (
      <div key={item.key} data-slot="sidebar-group" data-depth={depth}>
        {showSectionLabel && (
          <div
            data-slot="sidebar-group-label"
            className="px-2.5 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:color-mix(in_oklch,var(--sidebar-foreground),transparent_42%)] first:pt-0"
          >
            {item.sectionLabel}
          </div>
        )}
        <ControllableDetails
          data-slot="sidebar-group-details"
          open={item.expanded}
          defaultOpen={defaultExpanded}
          className="group/sidebar-details"
          onOpenChange={item.onExpandedChange}
        >
          <summary
            data-slot="sidebar-group-trigger"
            data-size={itemSize}
            data-active={active || undefined}
            data-active-indicator={activeIndicator}
            className={cn(
              "flex list-none items-center gap-2 border border-transparent font-medium outline-none transition-[background-color,border-color,color,box-shadow]",
              getSidebarInteractiveClassName({ active }),
              getSidebarItemLayoutClassName({ collapsed, depth, itemSize, activeIndicator })
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
            {!collapsed && (
              <ChevronRightIcon
                data-slot="sidebar-group-chevron"
                className="ml-auto size-3.5 shrink-0 text-[color:color-mix(in_oklch,var(--sidebar-foreground),transparent_42%)] transition-transform group-open/sidebar-details:rotate-90"
              />
            )}
          </summary>
          <div data-slot="sidebar-group-content" className={cn("mt-1 flex flex-col gap-1", !collapsed && "pl-3")}>
            <SidebarTree
              items={item.items ?? []}
              collapsed={collapsed}
              depth={depth + 1}
              showSectionLabels={showSectionLabels}
              itemSize={itemSize}
              activeIndicator={activeIndicator}
              onItemSelect={onItemSelect}
              renderLink={renderLink}
            />
          </div>
        </ControllableDetails>
      </div>
    )
  })
}

function SidebarActionButton({
  item,
  collapsed,
  onItemSelect,
}: {
  item: SidebarItem
  collapsed: boolean
  onItemSelect?: (item: SidebarItem) => void
}) {
  const content = (
    <button
      type="button"
      data-slot="sidebar-action"
      data-active={item.active || undefined}
      data-disabled={item.disabled || undefined}
      className={cn(
        "flex min-h-9 items-center gap-2 rounded-lg border border-transparent px-2.5 text-sm font-medium outline-none transition-[background-color,border-color,color,box-shadow] data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
        getSidebarInteractiveClassName({ active: item.active, disabled: item.disabled }),
        collapsed && "justify-center px-2"
      )}
      disabled={item.disabled}
      onClick={() => {
        if (item.disabled) return
        triggerSidebarItem(item, onItemSelect)
      }}
    >
      {item.icon ? <span className="shrink-0">{item.icon}</span> : null}
      {!collapsed ? <span className="min-w-0 flex-1 truncate">{item.label}</span> : null}
      {!collapsed && item.badge ? <span className="shrink-0">{item.badge}</span> : null}
    </button>
  )

  return collapsed ? (
    <Tooltip content={item.tooltip ?? item.label} side="right">
      <span className="block">{content}</span>
    </Tooltip>
  ) : (
    content
  )
}

function SidebarFooterAccount({
  account,
  collapsed,
  onAfterSelect,
}: {
  account: SidebarFooterAccount
  collapsed: boolean
  onAfterSelect?: () => void
}) {
  const body = (
    <button
      type="button"
      data-slot="sidebar-account"
      className={cn(
        "flex w-full items-center gap-3 rounded-[min(var(--radius-xl),16px)] border border-transparent text-left transition-[background-color,border-color,color,box-shadow]",
        getSidebarInteractiveClassName({}),
        collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
      )}
      onClick={() => {
        account.onSelect?.()
        onAfterSelect?.()
        if (!account.href) return
        if (account.href.startsWith("http")) {
          window.open(account.href, "_blank", "noopener,noreferrer")
          return
        }
        window.location.assign(account.href)
      }}
    >
      {account.avatar ? (
        <span
          data-slot="sidebar-account-avatar"
          className="inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/65 bg-muted/45 text-sm font-semibold"
        >
          {account.avatar}
        </span>
      ) : null}
      {!collapsed ? (
        <span className="min-w-0 flex-1">
          <span data-slot="sidebar-account-label" className="block truncate text-sm font-semibold text-[color:var(--sidebar-foreground)]">
            {account.label}
          </span>
          {account.description ? (
            <span data-slot="sidebar-account-description" className="block truncate text-xs text-[color:color-mix(in_oklch,var(--sidebar-foreground),transparent_36%)]">
              {account.description}
            </span>
          ) : null}
        </span>
      ) : null}
    </button>
  )

  return collapsed ? (
    <Tooltip content={account.tooltip ?? account.label} side="right">
      <span className="block">{body}</span>
    </Tooltip>
  ) : (
    body
  )
}

function SidebarSurface({
  className,
  style,
  header,
  footer,
  items = [],
  collapsed = false,
  width = DEFAULT_SIDEBAR_WIDTH,
  collapsedWidth = DEFAULT_COLLAPSED_SIDEBAR_WIDTH,
  collapsedRail,
  railItems = [],
  footerAccount,
  secondaryActions = [],
  footerSecondary,
  footerClassName,
  tooltipOnCollapsed,
  showSectionLabels = true,
  itemSize = "md",
  activeIndicator = "bar",
  navigationLabel = "Primary navigation",
  onItemSelect,
  renderItem,
  renderLink,
  children,
  mobile,
  mobileTitle,
  mobileDescription,
  mobileCloseLabel = "Close navigation",
  onRequestClose,
  closeOnSelect = true,
  ...props
}: Omit<SidebarProps, "responsive" | "mobileBreakpoint" | "mobileOpen" | "defaultMobileOpen" | "onMobileOpenChange" | "mobileToggleLabel" | "mobileToggleIcon" | "showMobileToggle" | "mobileToggleClassName" | "mobilePanelClassName" | "mobileOverlayClassName" | "renderMobileToggle"> & {
  mobile?: boolean
  onRequestClose?: () => void
}) {
  const visibleItems = items.filter((item) => !item.hidden)
  const visibleRailItems = railItems.filter((item) => !item.hidden)
  const visibleSecondaryActions = secondaryActions.filter((item) => !item.hidden)

  const handleSelect = React.useCallback((item: SidebarItem) => {
    onItemSelect?.(item)
    if (mobile && closeOnSelect) onRequestClose?.()
  }, [closeOnSelect, mobile, onItemSelect, onRequestClose])

  const showMobileHeader = mobile && (mobileTitle || mobileDescription || onRequestClose)

  return (
    <aside
      data-slot="sidebar"
      data-collapsed={collapsed || undefined}
      data-mobile={mobile || undefined}
      className={cn("group/sidebar flex h-full min-h-0 flex-col overflow-hidden", className)}
      style={{
        width: collapsed ? collapsedWidth : width,
        minWidth: collapsed ? collapsedWidth : width,
        ...style,
      }}
      {...props}
    >
      {(header || showMobileHeader) && (
        <div data-slot="sidebar-header" className="shrink-0 border-b p-3">
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              {header ?? null}
              {showMobileHeader ? (
                <div className={cn(header && "mt-3")}>
                  {mobileTitle ? (
                    <p className="text-sm font-semibold text-foreground">{mobileTitle}</p>
                  ) : null}
                  {mobileDescription ? (
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{mobileDescription}</p>
                  ) : null}
                </div>
              ) : null}
            </div>
            {mobile && onRequestClose ? (
              <button
                type="button"
                aria-label={mobileCloseLabel}
                data-slot="sidebar-mobile-close"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--aui-divider,var(--border))] bg-[color:var(--aui-page-bg-alt,var(--muted))] text-[color:var(--aui-page-foreground,var(--foreground))] transition hover:bg-[color:var(--aui-control-bg,var(--muted))]"
                onClick={onRequestClose}
              >
                <XIcon className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
      )}

      <nav
        data-slot="sidebar-nav"
        aria-label={navigationLabel}
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-2"
      >
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
            showSectionLabels={showSectionLabels}
            itemSize={itemSize}
            activeIndicator={activeIndicator}
            onItemSelect={handleSelect}
            renderLink={renderLink}
          />
        )}
      </nav>

      {(footerAccount || footerSecondary || footer || visibleSecondaryActions.length > 0 || (collapsed && (collapsedRail || visibleRailItems.length > 0))) && (
        <div data-slot="sidebar-footer" className={cn("shrink-0 border-t p-3", footerClassName)}>
          {collapsed ? (
            <>
              {visibleRailItems.length > 0 ? (
                <div data-slot="sidebar-rail-actions" className="grid gap-2">
                  {visibleRailItems.map((item) => (
                    <SidebarActionButton
                      key={item.key}
                      item={item}
                      collapsed
                      onItemSelect={handleSelect}
                    />
                  ))}
                </div>
              ) : null}
              {collapsedRail ? <div data-slot="sidebar-rail">{collapsedRail}</div> : null}
            </>
          ) : null}
          {!collapsed && footerAccount ? (
            <div data-slot="sidebar-account-wrap" className="mb-3">
              <SidebarFooterAccount account={footerAccount} collapsed={false} onAfterSelect={() => {
                if (mobile && closeOnSelect) onRequestClose?.()
              }} />
            </div>
          ) : null}
          {!collapsed && visibleSecondaryActions.length > 0 ? (
            <div data-slot="sidebar-secondary-actions" className="mb-3 grid gap-2">
              {visibleSecondaryActions.map((item) => (
                <SidebarActionButton
                  key={item.key}
                  item={item}
                  collapsed={false}
                  onItemSelect={handleSelect}
                />
              ))}
            </div>
          ) : null}
          {!collapsed && footerSecondary ? (
            <div data-slot="sidebar-footer-secondary" className="mb-3">
              {footerSecondary}
            </div>
          ) : null}
          {collapsed && footerAccount ? (
            <div data-slot="sidebar-account-wrap">
              <SidebarFooterAccount
                account={footerAccount}
                collapsed
                onAfterSelect={() => {
                  if (mobile && closeOnSelect) onRequestClose?.()
                }}
              />
            </div>
          ) : null}
          {!collapsed && footer}
        </div>
      )}
    </aside>
  )
}

function Sidebar({
  className,
  header,
  footer,
  items = [],
  collapsed: collapsedProp,
  width = DEFAULT_SIDEBAR_WIDTH,
  collapsedWidth = DEFAULT_COLLAPSED_SIDEBAR_WIDTH,
  mobileWidth = DEFAULT_MOBILE_SIDEBAR_WIDTH,
  collapsedRail,
  railItems = [],
  footerAccount,
  secondaryActions = [],
  footerSecondary,
  tooltipOnCollapsed = true,
  showSectionLabels = true,
  itemSize = "md",
  activeIndicator = "bar",
  navigationLabel = "Primary navigation",
  responsive = true,
  mobileBreakpoint = DEFAULT_SIDEBAR_BREAKPOINT,
  mobileOpen: mobileOpenProp,
  defaultMobileOpen = false,
  onMobileOpenChange,
  mobileTitle,
  mobileDescription,
  mobileToggleLabel = "Open navigation",
  mobileCloseLabel = "Close navigation",
  mobileToggleIcon,
  showMobileToggle = true,
  closeOnSelect = true,
  mobileToggleClassName,
  mobilePanelClassName,
  mobileOverlayClassName,
  renderMobileToggle,
  onItemSelect,
  renderItem,
  renderLink,
  children,
  ...props
}: SidebarProps) {
  const sidebarContext = useSidebar(true)
  const collapsed = collapsedProp ?? sidebarContext?.collapsed ?? false
  const matchesMobileBreakpoint = useIsMobile(mobileBreakpoint)
  const isMobile = responsive && matchesMobileBreakpoint
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = React.useState(defaultMobileOpen)
  const mobileOpen = mobileOpenProp ?? sidebarContext?.mobileOpen ?? uncontrolledMobileOpen

  const setMobileOpen = React.useCallback((nextOpen: boolean) => {
    if (mobileOpenProp == null && sidebarContext) {
      sidebarContext.setMobileOpen(nextOpen)
    } else if (mobileOpenProp == null) {
      setUncontrolledMobileOpen(nextOpen)
    }
    onMobileOpenChange?.(nextOpen)
  }, [mobileOpenProp, onMobileOpenChange, sidebarContext])

  React.useEffect(() => {
    if (!isMobile && mobileOpen) {
      setMobileOpen(false)
    }
  }, [isMobile, mobileOpen, setMobileOpen])

  React.useEffect(() => {
    if (!isMobile || !mobileOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isMobile, mobileOpen, setMobileOpen])

  const baseProps = {
    className,
    header,
    footer,
    items,
    collapsed,
    width,
    collapsedWidth,
    collapsedRail,
    railItems,
    footerAccount,
    secondaryActions,
    footerSecondary,
    tooltipOnCollapsed,
    showSectionLabels,
    itemSize,
    activeIndicator,
    navigationLabel,
    mobileCloseLabel,
    closeOnSelect,
    onItemSelect,
    renderItem,
    renderLink,
    children,
    ...props,
  }

  if (!responsive || !isMobile) {
    return <SidebarSurface {...baseProps} />
  }

  const defaultTrigger = (
    <button
      type="button"
      aria-label={mobileOpen ? mobileCloseLabel : mobileToggleLabel}
      data-slot="sidebar-mobile-trigger"
      data-state={mobileOpen ? "open" : "closed"}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-xl border border-[color:var(--aui-divider,var(--border))] bg-[color:var(--aui-page-bg,var(--background))] px-3 text-sm font-medium text-[color:var(--aui-page-foreground,var(--foreground))] shadow-sm transition hover:bg-[color:var(--aui-page-bg-alt,var(--muted))]",
        mobileToggleClassName
      )}
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[color:var(--aui-page-bg-alt,var(--muted))]">
        {mobileToggleIcon ?? <MenuIcon className="size-4" />}
      </span>
      <span>{mobileOpen ? mobileCloseLabel : mobileToggleLabel}</span>
    </button>
  )

  return (
    <>
      {showMobileToggle
        ? renderMobileToggle
          ? renderMobileToggle({ open: mobileOpen, setOpen: setMobileOpen })
          : defaultTrigger
        : null}
      <div data-slot="sidebar-mobile-root" className="relative z-40">
        <button
          type="button"
          aria-label="Dismiss navigation"
          data-slot="sidebar-mobile-overlay"
          data-state={mobileOpen ? "open" : "closed"}
          className={cn(
            "fixed inset-0 z-40 bg-black/45 transition-opacity duration-200",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
            mobileOverlayClassName
          )}
          style={{
            opacity: mobileOpen ? 1 : 0,
            pointerEvents: mobileOpen ? "auto" : "none",
          }}
          onClick={() => setMobileOpen(false)}
        />
        <SidebarSurface
          {...baseProps}
          mobile
          collapsed={false}
          mobileTitle={mobileTitle}
          mobileDescription={mobileDescription}
          onRequestClose={() => setMobileOpen(false)}
          data-state={mobileOpen ? "open" : "closed"}
          role="dialog"
          aria-modal="true"
          aria-label={typeof mobileTitle === "string" ? mobileTitle : "Navigation"}
          className={cn(
            "fixed inset-y-0 left-0 z-50 max-w-[22rem] border-r border-[color:var(--aui-divider,var(--border))] bg-[color:var(--aui-page-bg,var(--background))] shadow-2xl transition-transform duration-200 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
            mobilePanelClassName,
            className
          )}
          style={{
            width: mobileWidth,
            minWidth: mobileWidth,
            translate: mobileOpen ? "0 0" : "-100% 0",
          }}
        />
      </div>
    </>
  )
}

export { Sidebar }
