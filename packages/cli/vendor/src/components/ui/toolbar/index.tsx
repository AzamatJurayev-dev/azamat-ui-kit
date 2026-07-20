"use client"

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar"

import { cn } from "@/lib/utils"

export type ToolbarProps = ToolbarPrimitive.Root.Props
export type ToolbarGroupProps = ToolbarPrimitive.Group.Props
export type ToolbarButtonProps = ToolbarPrimitive.Button.Props
export type ToolbarLinkProps = ToolbarPrimitive.Link.Props
export type ToolbarInputProps = ToolbarPrimitive.Input.Props
export type ToolbarSeparatorProps = ToolbarPrimitive.Separator.Props

function Toolbar({ className, orientation = "horizontal", ...props }: ToolbarProps) {
  return (
    <ToolbarPrimitive.Root
      data-slot="toolbar"
      orientation={orientation}
      className={cn(
        "flex min-w-0 items-center gap-1 rounded-[var(--radius-lg)] border border-border bg-card p-1 text-card-foreground shadow-xs",
        orientation === "vertical" && "w-max flex-col items-stretch",
        className
      )}
      {...props}
    />
  )
}

function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  return <ToolbarPrimitive.Group data-slot="toolbar-group" className={cn("flex min-w-0 items-center gap-1", className)} {...props} />
}

function ToolbarButton({ className, ...props }: ToolbarButtonProps) {
  return (
    <ToolbarPrimitive.Button
      data-slot="toolbar-button"
      className={cn("inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-[var(--radius-md)] px-2.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[pressed]:bg-muted data-[pressed]:text-foreground [&_svg]:size-4 [&_svg]:shrink-0", className)}
      {...props}
    />
  )
}

function ToolbarLink({ className, ...props }: ToolbarLinkProps) {
  return (
    <ToolbarPrimitive.Link
      data-slot="toolbar-link"
      className={cn("inline-flex h-8 items-center justify-center gap-1.5 rounded-[var(--radius-md)] px-2.5 text-sm font-medium text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring", className)}
      {...props}
    />
  )
}

function ToolbarInput({ className, ...props }: ToolbarInputProps) {
  return (
    <ToolbarPrimitive.Input
      data-slot="toolbar-input"
      className={cn("h-8 min-w-32 rounded-[var(--radius-md)] border border-input bg-background px-2.5 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring", className)}
      {...props}
    />
  )
}

function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
  return <ToolbarPrimitive.Separator data-slot="toolbar-separator" className={cn("mx-1 h-5 w-px bg-border data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full", className)} {...props} />
}

export { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarSeparator }
