"use client"

import * as React from "react"
import { MenuIcon, PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { useIsMobile } from "@/hooks/use-is-mobile"

export type SidebarContextValue = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  toggleCollapsed: () => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  toggleMobile: () => void
}

export type SidebarProviderProps = React.ComponentProps<"div"> & {
  collapsed?: boolean
  defaultCollapsed?: boolean
  onCollapsedChange?: (collapsed: boolean) => void
  mobileOpen?: boolean
  defaultMobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue | null>(null)

function SidebarProvider({
  collapsed: collapsedProp,
  defaultCollapsed = false,
  onCollapsedChange,
  mobileOpen: mobileOpenProp,
  defaultMobileOpen = false,
  onMobileOpenChange,
  children,
  className,
  ...props
}: SidebarProviderProps) {
  const [internalCollapsed, setInternalCollapsed] = React.useState(defaultCollapsed)
  const [internalMobileOpen, setInternalMobileOpen] = React.useState(defaultMobileOpen)
  const collapsed = collapsedProp ?? internalCollapsed
  const mobileOpen = mobileOpenProp ?? internalMobileOpen

  const setCollapsed = React.useCallback((next: boolean) => {
    if (collapsedProp === undefined) setInternalCollapsed(next)
    onCollapsedChange?.(next)
  }, [collapsedProp, onCollapsedChange])

  const setMobileOpen = React.useCallback((next: boolean) => {
    if (mobileOpenProp === undefined) setInternalMobileOpen(next)
    onMobileOpenChange?.(next)
  }, [mobileOpenProp, onMobileOpenChange])

  const value = React.useMemo<SidebarContextValue>(() => ({
    collapsed,
    setCollapsed,
    toggleCollapsed: () => setCollapsed(!collapsed),
    mobileOpen,
    setMobileOpen,
    toggleMobile: () => setMobileOpen(!mobileOpen),
  }), [collapsed, mobileOpen, setCollapsed, setMobileOpen])

  return (
    <SidebarContext.Provider value={value}>
      <div data-slot="sidebar-provider" className={className ?? "contents"} {...props}>{children}</div>
    </SidebarContext.Provider>
  )
}

function useSidebar(optional?: false): SidebarContextValue
function useSidebar(optional: true): SidebarContextValue | null
function useSidebar(optional = false) {
  const context = React.useContext(SidebarContext)
  if (!context && !optional) {
    throw new Error("useSidebar must be used within SidebarProvider")
  }
  return context
}

export type SidebarTriggerProps = Omit<ButtonProps, "onClick"> & {
  breakpoint?: number
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function SidebarTrigger({ breakpoint = 1024, onClick, children, ...props }: SidebarTriggerProps) {
  const sidebar = useSidebar()
  const mobile = useIsMobile(breakpoint)
  const label = mobile
    ? sidebar.mobileOpen ? "Close navigation" : "Open navigation"
    : sidebar.collapsed ? "Expand navigation" : "Collapse navigation"
  const icon = mobile
    ? <MenuIcon aria-hidden="true" />
    : sidebar.collapsed
      ? <PanelLeftOpenIcon aria-hidden="true" />
      : <PanelLeftCloseIcon aria-hidden="true" />

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      aria-expanded={mobile ? sidebar.mobileOpen : !sidebar.collapsed}
      data-slot="sidebar-trigger"
      onClick={(event) => {
        if (mobile) sidebar.toggleMobile()
        else sidebar.toggleCollapsed()
        onClick?.(event)
      }}
      {...props}
    >
      {children ?? icon}
    </Button>
  )
}

export { SidebarProvider, SidebarTrigger, useSidebar }
