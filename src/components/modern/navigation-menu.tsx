import * as React from "react"

import { cn } from "@/lib/utils"

export type NavigationMenuProps = React.ComponentProps<"nav">
export type NavigationMenuListProps = React.ComponentProps<"ul">
export type NavigationMenuItemProps = React.ComponentProps<"li">
export type NavigationMenuLinkProps = React.ComponentProps<"a"> & { active?: boolean }

function NavigationMenu({ className, ...props }: NavigationMenuProps) {
  return <nav data-slot="navigation-menu" className={cn("flex items-center", className)} {...props} />
}

function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return <ul data-slot="navigation-menu-list" className={cn("flex items-center gap-1", className)} {...props} />
}

function NavigationMenuItem(props: NavigationMenuItemProps) {
  return <li data-slot="navigation-menu-item" {...props} />
}

function NavigationMenuLink({ active, className, ...props }: NavigationMenuLinkProps) {
  return <a data-slot="navigation-menu-link" data-active={active ? "true" : undefined} className={cn("rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground", active && "bg-muted text-foreground", className)} {...props} />
}

export { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList }
