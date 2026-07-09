"use client"

import * as React from "react"
import { MenuIcon, XIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-is-mobile"
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

export type AppSidebarFooterAccount = {
  label: React.ReactNode
  description?: React.ReactNode
  avatar?: React.ReactNode
  href?: string
  tooltip?: React.ReactNode
  onSelect?: () => void
}

export type AppSidebarProps = React.ComponentProps<"aside"> & {
  header?: React.ReactNode
  footer?: React.ReactNode
  items?: AppSidebarNavItem[]
  collapsed?: boolean
  width?: React.CSSProperties["width"]
  collapsedWidth?: React.CSSProperties["width"]
  mobileWidth?: React.CSSProperties["width"]
  collapsedRail?: React.ReactNode
  railItems?: AppSidebarNavItem[]
  footerAccount?: AppSidebarFooterAccount
  secondaryActions?: AppSidebarNavItem[]
  footerSecondary?: React.ReactNode
  tooltipOnCollapsed?: boolean
  responsive?: boolean
  mobileBreakpoint?: number
  mobileOpen?: boolean
  defaultMobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
  mobileTitle?: React.ReactNode
  mobileDescription?: React.ReactNode
  mobileToggleLabel?: string
  mobileToggleIcon?: React.ReactNode
  showMobileToggle?: boolean
  closeOnSelect?: boolean
  mobileToggleClassName?: string
  mobilePanelClassName?: string
  mobileOverlayClassName?: string
  footerClassName?: string
  renderMobileToggle?: (state: { open: boolean; setOpen: (open: boolean) => void }) => React.ReactNode
  onItemSelect?: (item: AppSidebarNavItem) => void
  renderItem?: (item: AppSidebarNavItem, state: { collapsed: boolean }) => React.ReactNode
  renderLink?: (props: React.ComponentProps<"a"> & { item: AppSidebarNavItem; [key: `data-${string}`]: string | boolean | undefined }) => React.ReactNode
}

const DEFAULT_APP_SIDEBAR_BREAKPOINT = 1024
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
    "border-[color:transparent] text-foreground/80 hover:border-[color:var(--aui-divider)] hover:bg-[color:color-mix(in_oklch,var(--card),var(--primary)_4%)] hover:text-foreground focus-visible:border-[color:var(--aui-control-border-strong,var(--border))] focus-visible:bg-[color:color-mix(in_oklch,var(--card),var(--primary)_6%)] focus-visible:text-foreground focus-visible:shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary),transparent_86%)]",
    active && "border-[color:color-mix(in_oklch,var(--primary),transparent_76%)] bg-[color:color-mix(in_oklch,var(--primary),transparent_91%)] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
    disabled && "hover:border-transparent hover:bg-transparent hover:text-foreground/80"
  )
}

function hasVisibleSidebarChildren(item: AppSidebarNavItem) {
  return item.items?.some((child) => !child.hidden) ?? false
}

function isSidebarItemActive(item: AppSidebarNavItem): boolean {
  if (item.active) return true
  return item.items?.some((child) => isSidebarItemActive(child)) ?? false
}

function triggerSidebarItem(item: AppSidebarNavItem, onItemSelect?: (item: AppSidebarNavItem) => void) {
  item.onSelect?.()
  onItemSelect?.(item)
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
      getSidebarInteractiveClassName({ active: item.active, disabled: item.disabled }),
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
              getSidebarInteractiveClassName({ active }),
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
            {!collapsed && (
              <span
                data-slot="app-sidebar-group-chevron"
                className="ml-auto text-xs text-muted-foreground transition-transform group-open/app-sidebar-details:rotate-90"
              >
                ›
              </span>
            )}
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

function SidebarActionButton({
  item,
  collapsed,
  onItemSelect,
}: {
  item: AppSidebarNavItem
  collapsed: boolean
  onItemSelect?: (item: AppSidebarNavItem) => void
}) {
  const content = (
    <button
      type="button"
      data-slot="app-sidebar-action"
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
  account: AppSidebarFooterAccount
  collapsed: boolean
  onAfterSelect?: () => void
}) {
  const body = (
    <button
      type="button"
      data-slot="app-sidebar-account"
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
          data-slot="app-sidebar-account-avatar"
          className="inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/65 bg-muted/45 text-sm font-semibold"
        >
          {account.avatar}
        </span>
      ) : null}
      {!collapsed ? (
        <span className="min-w-0 flex-1">
          <span data-slot="app-sidebar-account-label" className="block truncate text-sm font-semibold text-foreground">
            {account.label}
          </span>
          {account.description ? (
            <span data-slot="app-sidebar-account-description" className="block truncate text-xs text-muted-foreground">
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
  onItemSelect,
  renderItem,
  renderLink,
  children,
  mobile,
  mobileTitle,
  mobileDescription,
  onRequestClose,
  closeOnSelect = true,
  ...props
}: Omit<AppSidebarProps, "responsive" | "mobileBreakpoint" | "mobileOpen" | "defaultMobileOpen" | "onMobileOpenChange" | "mobileToggleLabel" | "mobileToggleIcon" | "showMobileToggle" | "mobileToggleClassName" | "mobilePanelClassName" | "mobileOverlayClassName" | "renderMobileToggle"> & {
  mobile?: boolean
  onRequestClose?: () => void
}) {
  const visibleItems = items.filter((item) => !item.hidden)
  const visibleRailItems = railItems.filter((item) => !item.hidden)
  const visibleSecondaryActions = secondaryActions.filter((item) => !item.hidden)

  const handleSelect = React.useCallback((item: AppSidebarNavItem) => {
    onItemSelect?.(item)
    if (mobile && closeOnSelect) onRequestClose?.()
  }, [closeOnSelect, mobile, onItemSelect, onRequestClose])

  const showMobileHeader = mobile && (mobileTitle || mobileDescription || onRequestClose)

  return (
    <aside
      data-slot="app-sidebar"
      data-collapsed={collapsed || undefined}
      data-mobile={mobile || undefined}
      className={cn("flex h-full min-h-0 flex-col overflow-hidden", className)}
      style={{
        width: collapsed ? collapsedWidth : width,
        minWidth: collapsed ? collapsedWidth : width,
        ...style,
      }}
      {...props}
    >
      {(header || showMobileHeader) && (
        <div data-slot="app-sidebar-header" className="shrink-0 border-b p-3">
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
                aria-label="Close navigation"
                data-slot="app-sidebar-mobile-close"
                className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] text-[color:var(--aui-page-foreground)] transition hover:bg-[color:var(--aui-control-bg)]"
                onClick={onRequestClose}
              >
                <XIcon className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
      )}

      <nav data-slot="app-sidebar-nav" className="min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain p-2">
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
            onItemSelect={handleSelect}
            renderLink={renderLink}
          />
        )}
      </nav>

      {(footerAccount || footerSecondary || footer || visibleSecondaryActions.length > 0 || (collapsed && (collapsedRail || visibleRailItems.length > 0))) && (
        <div data-slot="app-sidebar-footer" className={cn("shrink-0 border-t p-3", footerClassName)}>
          {collapsed ? (
            <>
              {visibleRailItems.length > 0 ? (
                <div data-slot="app-sidebar-rail-actions" className="grid gap-2">
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
              {collapsedRail ? <div data-slot="app-sidebar-rail">{collapsedRail}</div> : null}
            </>
          ) : null}
          {!collapsed && footerAccount ? (
            <div data-slot="app-sidebar-account-wrap" className="mb-3">
              <SidebarFooterAccount account={footerAccount} collapsed={false} onAfterSelect={() => {
                if (mobile && closeOnSelect) onRequestClose?.()
              }} />
            </div>
          ) : null}
          {!collapsed && visibleSecondaryActions.length > 0 ? (
            <div data-slot="app-sidebar-secondary-actions" className="mb-3 grid gap-2">
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
            <div data-slot="app-sidebar-footer-secondary" className="mb-3">
              {footerSecondary}
            </div>
          ) : null}
          {collapsed && footerAccount ? (
            <div data-slot="app-sidebar-account-wrap">
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

function AppSidebar({
  className,
  header,
  footer,
  items = [],
  collapsed = false,
  width = DEFAULT_SIDEBAR_WIDTH,
  collapsedWidth = DEFAULT_COLLAPSED_SIDEBAR_WIDTH,
  mobileWidth = DEFAULT_MOBILE_SIDEBAR_WIDTH,
  collapsedRail,
  railItems = [],
  footerAccount,
  secondaryActions = [],
  footerSecondary,
  tooltipOnCollapsed = true,
  responsive = true,
  mobileBreakpoint = DEFAULT_APP_SIDEBAR_BREAKPOINT,
  mobileOpen: mobileOpenProp,
  defaultMobileOpen = false,
  onMobileOpenChange,
  mobileTitle,
  mobileDescription,
  mobileToggleLabel = "Open navigation",
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
}: AppSidebarProps) {
  const isMobile = responsive ? useIsMobile(mobileBreakpoint) : false
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = React.useState(defaultMobileOpen)
  const mobileOpen = mobileOpenProp ?? uncontrolledMobileOpen

  const setMobileOpen = React.useCallback((nextOpen: boolean) => {
    if (mobileOpenProp == null) {
      setUncontrolledMobileOpen(nextOpen)
    }
    onMobileOpenChange?.(nextOpen)
  }, [mobileOpenProp, onMobileOpenChange])

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
      aria-label={mobileOpen ? "Close navigation" : mobileToggleLabel}
      data-slot="app-sidebar-mobile-trigger"
      data-state={mobileOpen ? "open" : "closed"}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] px-3 text-sm font-medium text-[color:var(--aui-page-foreground)] shadow-sm transition hover:bg-[color:var(--aui-page-bg-alt)]",
        mobileToggleClassName
      )}
      onClick={() => setMobileOpen(!mobileOpen)}
    >
      <span className="inline-flex size-8 items-center justify-center rounded-lg bg-[color:var(--aui-page-bg-alt)]">
        {mobileToggleIcon ?? <MenuIcon className="size-4" />}
      </span>
      <span>{mobileOpen ? "Close navigation" : mobileToggleLabel}</span>
    </button>
  )

  return (
    <>
      {showMobileToggle
        ? renderMobileToggle
          ? renderMobileToggle({ open: mobileOpen, setOpen: setMobileOpen })
          : defaultTrigger
        : null}
      <div data-slot="app-sidebar-mobile-root" className="relative z-40">
        <button
          type="button"
          aria-label="Dismiss navigation"
          data-slot="app-sidebar-mobile-overlay"
          data-state={mobileOpen ? "open" : "closed"}
          className={cn(
            "fixed inset-0 z-40 bg-black/45 transition-opacity duration-200",
            mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
            mobileOverlayClassName
          )}
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
            "fixed inset-y-0 left-0 z-50 max-w-[22rem] border-r border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] shadow-2xl transition-transform duration-200 ease-out",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
            mobilePanelClassName,
            className
          )}
          style={{
            width: mobileWidth,
            minWidth: mobileWidth,
          }}
        />
      </div>
    </>
  )
}

/**
 * Canonical sidebar surface for new usage.
 */
const Sidebar = AppSidebar

/**
 * @deprecated Use {@link Sidebar} instead. `AppSidebar` remains as a compatibility alias.
 */
export { AppSidebar, Sidebar }
export type {
  AppSidebarFooterAccount as SidebarFooterAccount,
  AppSidebarNavItem as SidebarItem,
  AppSidebarProps as SidebarProps,
}
