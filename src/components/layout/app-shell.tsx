import * as React from "react"
import { MenuIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type AppShellSidebarWidth = "sm" | "default" | "lg" | "xl"
export type AppShellAsideWidth = "sm" | "default" | "lg"

export type AppShellProps = React.ComponentProps<"div"> & {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  aside?: React.ReactNode
  footer?: React.ReactNode
  sidebarCollapsed?: boolean
  defaultSidebarCollapsed?: boolean
  onSidebarCollapsedChange?: (collapsed: boolean) => void
  mobileSidebarOpen?: boolean
  defaultMobileSidebarOpen?: boolean
  onMobileSidebarOpenChange?: (open: boolean) => void
  sidebarWidth?: AppShellSidebarWidth
  asideWidth?: AppShellAsideWidth
  sidebarMode?: "fixed" | "static"
  mobileSidebar?: React.ReactNode
  mobileOverlay?: boolean
  collapseBreakpoint?: "sm" | "md" | "lg" | "xl"
  showMobileMenuButton?: boolean
  mobileMenuLabel?: string
  mobileCloseLabel?: string
  contentClassName?: string
  mainClassName?: string
  mainWrapperClassName?: string
  sidebarClassName?: string
  mobileSidebarClassName?: string
  asideClassName?: string
}

const sidebarWidthClassName: Record<AppShellSidebarWidth, string> = {
  sm: "w-56",
  default: "w-64",
  lg: "w-72",
  xl: "w-80",
}

const sidebarPaddingClassName: Record<AppShellSidebarWidth, string> = {
  sm: "md:pl-56",
  default: "md:pl-64",
  lg: "md:pl-72",
  xl: "md:pl-80",
}

const asideWidthClassName: Record<AppShellAsideWidth, string> = {
  sm: "w-72",
  default: "w-80",
  lg: "w-96",
}

function useControllableState({
  value,
  defaultValue,
  onChange,
}: {
  value?: boolean
  defaultValue: boolean
  onChange?: (value: boolean) => void
}) {
  const controlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = controlled ? value : internalValue

  const setValue = React.useCallback(
    (nextValue: boolean) => {
      if (!controlled) {
        setInternalValue(nextValue)
      }

      onChange?.(nextValue)
    },
    [controlled, onChange]
  )

  return [currentValue, setValue] as const
}

function AppShell({
  className,
  header,
  sidebar,
  aside,
  footer,
  sidebarCollapsed,
  defaultSidebarCollapsed = false,
  onSidebarCollapsedChange,
  mobileSidebarOpen,
  defaultMobileSidebarOpen = false,
  onMobileSidebarOpenChange,
  sidebarWidth = "default",
  asideWidth = "default",
  sidebarMode = "fixed",
  mobileSidebar,
  mobileOverlay = true,
  showMobileMenuButton = true,
  mobileMenuLabel = "Open navigation",
  mobileCloseLabel = "Close navigation",
  contentClassName,
  mainClassName,
  mainWrapperClassName,
  sidebarClassName,
  mobileSidebarClassName,
  asideClassName,
  children,
  ...props
}: AppShellProps) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useControllableState({
    value: sidebarCollapsed,
    defaultValue: defaultSidebarCollapsed,
    onChange: onSidebarCollapsedChange,
  })
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useControllableState({
    value: mobileSidebarOpen,
    defaultValue: defaultMobileSidebarOpen,
    onChange: onMobileSidebarOpenChange,
  })
  const renderedMobileSidebar = mobileSidebar ?? sidebar
  const hasSidebar = Boolean(sidebar)
  const fixedSidebar = sidebarMode === "fixed"

  return (
    <div
      data-slot="app-shell"
      data-sidebar-collapsed={isSidebarCollapsed || undefined}
      data-mobile-sidebar-open={isMobileSidebarOpen || undefined}
      className={cn("min-h-screen bg-background text-foreground", className)}
      {...props}
    >
      {hasSidebar && fixedSidebar && (
        <div
          data-slot="app-shell-sidebar"
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden border-r bg-sidebar transition-[width] duration-200 md:block",
            isSidebarCollapsed ? "w-16" : sidebarWidthClassName[sidebarWidth],
            sidebarClassName
          )}
        >
          {sidebar}
        </div>
      )}

      {renderedMobileSidebar && (
        <div
          data-slot="app-shell-mobile-sidebar-root"
          data-open={isMobileSidebarOpen || undefined}
          className="md:hidden"
        >
          {mobileOverlay && isMobileSidebarOpen && (
            <button
              type="button"
              aria-label={mobileCloseLabel}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}

          <div
            data-slot="app-shell-mobile-sidebar"
            className={cn(
              "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r bg-sidebar text-sidebar-foreground shadow-lg transition-transform duration-200",
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
              mobileSidebarClassName
            )}
          >
            <div className="flex h-12 items-center justify-end border-b px-2">
              <Button type="button" variant="ghost" size="icon-sm" aria-label={mobileCloseLabel} onClick={() => setMobileSidebarOpen(false)}>
                <XIcon />
              </Button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">{renderedMobileSidebar}</div>
          </div>
        </div>
      )}

      <div
        data-slot="app-shell-content"
        className={cn(
          "flex min-h-screen min-w-0 flex-col",
          hasSidebar && fixedSidebar && (isSidebarCollapsed ? "md:pl-16" : sidebarPaddingClassName[sidebarWidth]),
          contentClassName
        )}
      >
        {header && (
          <div data-slot="app-shell-header" className="contents">
            {showMobileMenuButton && renderedMobileSidebar ? (
              <div className="md:hidden">
                <div className="flex h-12 items-center border-b px-3">
                  <Button type="button" variant="ghost" size="icon-sm" aria-label={mobileMenuLabel} onClick={() => setMobileSidebarOpen(true)}>
                    <MenuIcon />
                  </Button>
                </div>
              </div>
            ) : null}
            {header}
          </div>
        )}

        <div data-slot="app-shell-main-wrapper" className={cn("flex min-w-0 flex-1", mainWrapperClassName)}>
          {hasSidebar && !fixedSidebar && (
            <div
              data-slot="app-shell-sidebar-static"
              className={cn(
                "hidden shrink-0 border-r bg-sidebar md:block",
                isSidebarCollapsed ? "w-16" : sidebarWidthClassName[sidebarWidth],
                sidebarClassName
              )}
            >
              {sidebar}
            </div>
          )}

          <main data-slot="app-shell-main" className={cn("min-w-0 flex-1", mainClassName)}>
            {children}
          </main>

          {aside && (
            <aside
              data-slot="app-shell-aside"
              className={cn("hidden shrink-0 border-l xl:block", asideWidthClassName[asideWidth], asideClassName)}
            >
              {aside}
            </aside>
          )}
        </div>

        {footer}
      </div>
    </div>
  )
}

export { AppShell }
