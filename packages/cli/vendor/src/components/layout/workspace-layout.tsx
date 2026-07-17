import * as React from "react"

import { cn } from "@/lib/utils"

export type WorkspaceLayoutProps = React.ComponentProps<"div"> & {
  viewport?: boolean
}

function WorkspaceLayout({ viewport = true, className, ...props }: WorkspaceLayoutProps) {
  return (
    <div
      data-slot="workspace-layout"
      data-viewport={viewport || undefined}
      className={cn(
        "flex min-h-0 min-w-0 bg-[color:var(--aui-page-bg,var(--background))] text-foreground",
        viewport && "h-dvh max-h-dvh w-full overflow-hidden overscroll-none",
        className
      )}
      {...props}
    />
  )
}

export type WorkspaceContentProps = React.ComponentProps<"div">

function WorkspaceContent({ className, ...props }: WorkspaceContentProps) {
  return (
    <div
      data-slot="workspace-content"
      className={cn("isolate flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden", className)}
      {...props}
    />
  )
}

export type WorkspaceMainProps = React.ComponentProps<"main"> & {
  scrollable?: boolean
  padded?: boolean
}

function WorkspaceMain({ scrollable = true, padded = false, className, ...props }: WorkspaceMainProps) {
  return (
    <main
      data-slot="workspace-main"
      data-scrollable={scrollable || undefined}
      className={cn(
        "min-h-0 min-w-0 flex-1",
        scrollable && "overflow-x-hidden overflow-y-auto overscroll-contain [scrollbar-gutter:stable]",
        padded && "p-4 md:p-6",
        className
      )}
      {...props}
    />
  )
}

export { WorkspaceContent, WorkspaceLayout, WorkspaceMain }
