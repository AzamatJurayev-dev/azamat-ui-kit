import * as React from "react"

import { cn } from "@/lib/utils"

export type WorkspaceShellProps = React.ComponentProps<"div"> & {
  sidebar?: React.ReactNode
  header?: React.ReactNode
  footer?: React.ReactNode
  breadcrumbs?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  aside?: React.ReactNode
  sidebarWidth?: string
  asideWidth?: string
  contentClassName?: string
  mainClassName?: string
}

function WorkspaceShell({ sidebar, header, footer, breadcrumbs, title, description, actions, aside, sidebarWidth = "280px", asideWidth = "360px", contentClassName, mainClassName, className, children, ...props }: WorkspaceShellProps) {
  return (
    <div data-slot="workspace-shell" className={cn("min-h-screen bg-background", className)} {...props}>
      {header}
      <div className="grid min-h-screen" style={{ gridTemplateColumns: sidebar ? `${sidebarWidth} minmax(0, 1fr)` : "minmax(0, 1fr)" }}>
        {sidebar && <aside data-slot="workspace-shell-sidebar" className="border-r bg-card">{sidebar}</aside>}
        <div className={cn("grid min-w-0 grid-rows-[auto_minmax(0,1fr)_auto]", contentClassName)}>
          {(breadcrumbs || title || description || actions) && (
            <div data-slot="workspace-shell-page-header" className="border-b bg-background px-6 py-4">
              {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="grid gap-1">
                  {title && <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>}
                  {description && <p className="text-sm text-muted-foreground">{description}</p>}
                </div>
                {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
              </div>
            </div>
          )}
          <main data-slot="workspace-shell-main" className={cn("grid min-h-0 gap-4 p-6", mainClassName)} style={{ gridTemplateColumns: aside ? `minmax(0, 1fr) ${asideWidth}` : undefined }}>
            <div className="min-w-0">{children}</div>
            {aside && <aside data-slot="workspace-shell-aside" className="min-w-0">{aside}</aside>}
          </main>
          {footer}
        </div>
      </div>
    </div>
  )
}

export { WorkspaceShell }
