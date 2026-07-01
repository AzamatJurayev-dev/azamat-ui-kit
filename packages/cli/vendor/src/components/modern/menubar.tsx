import * as React from "react"

import { cn } from "@/lib/utils"

export type MenubarProps = React.ComponentProps<"nav">
export type MenubarMenuProps = React.ComponentProps<"div">
export type MenubarTriggerProps = React.ComponentProps<"button">
export type MenubarContentProps = React.ComponentProps<"div">
export type MenubarItemProps = React.ComponentProps<"button">

function Menubar({ className, ...props }: MenubarProps) {
  return <nav data-slot="menubar" className={cn("flex items-center gap-1 rounded-md border bg-background p-1", className)} {...props} />
}

function MenubarMenu({ className, ...props }: MenubarMenuProps) {
  return <div data-slot="menubar-menu" className={cn("relative", className)} {...props} />
}

function MenubarTrigger({ className, ...props }: MenubarTriggerProps) {
  return <button type="button" data-slot="menubar-trigger" className={cn("rounded-sm px-3 py-1.5 text-sm font-medium hover:bg-muted", className)} {...props} />
}

function MenubarContent({ className, ...props }: MenubarContentProps) {
  return <div data-slot="menubar-content" className={cn("absolute left-0 top-full z-50 mt-1 min-w-40 rounded-md border bg-popover p-1 text-popover-foreground shadow-md", className)} {...props} />
}

function MenubarItem({ className, ...props }: MenubarItemProps) {
  return <button type="button" data-slot="menubar-item" className={cn("flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm hover:bg-muted", className)} {...props} />
}

export { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger }
