import * as React from "react"

import { cn } from "@/lib/utils"

export type AppShellProps = React.ComponentProps<"div"> & {
  header?: React.ReactNode
  sidebar?: React.ReactNode
  aside?: React.ReactNode
  footer?: React.ReactNode
  sidebarCollapsed?: boolean
  contentClassName?: string
  mainClassName?: string
}

function AppShell({
  className,
  header,
  sidebar,
  aside,
  footer,
  sidebarCollapsed = false,
  contentClassName,
  mainClassName,
  children,
  ...props
}: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      data-sidebar-collapsed={sidebarCollapsed || undefined}
      className={cn("min-h-screen bg-background text-foreground", className)}
      {...props}
    >
      {sidebar && (
        <div
          data-slot="app-shell-sidebar"
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden border-r bg-sidebar md:block",
            sidebarCollapsed ? "w-16" : "w-64"
          )}
        >
          {sidebar}
        </div>
      )}

      <div
        data-slot="app-shell-content"
        className={cn(
          "flex min-h-screen min-w-0 flex-col",
          sidebar && (sidebarCollapsed ? "md:pl-16" : "md:pl-64"),
          contentClassName
        )}
      >
        {header}
        <div className="flex min-w-0 flex-1">
          <main data-slot="app-shell-main" className={cn("min-w-0 flex-1", mainClassName)}>
            {children}
          </main>
          {aside && (
            <aside data-slot="app-shell-aside" className="hidden w-80 shrink-0 border-l xl:block">
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
