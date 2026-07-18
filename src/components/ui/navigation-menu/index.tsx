"use client"

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type NavigationMenuProps = NavigationMenuPrimitive.Root.Props
export type NavigationMenuListProps = NavigationMenuPrimitive.List.Props
export type NavigationMenuItemProps = NavigationMenuPrimitive.Item.Props
export type NavigationMenuTriggerProps = NavigationMenuPrimitive.Trigger.Props
export type NavigationMenuContentProps = NavigationMenuPrimitive.Content.Props
export type NavigationMenuLinkProps = NavigationMenuPrimitive.Link.Props
export type NavigationMenuViewportProps = NavigationMenuPrimitive.Viewport.Props
export type NavigationMenuPositionerProps = NavigationMenuPrimitive.Positioner.Props
export type NavigationMenuArrowProps = NavigationMenuPrimitive.Arrow.Props

function NavigationMenu({ className, ...props }: NavigationMenuProps) {
  return <NavigationMenuPrimitive.Root data-slot="navigation-menu" className={cn("relative z-10 flex max-w-max flex-1 items-center justify-center", className)} {...props} />
}

function NavigationMenuList({ className, ...props }: NavigationMenuListProps) {
  return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" className={cn("flex flex-1 list-none items-center justify-center gap-1", className)} {...props} />
}

function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) {
  return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" className={cn("relative", className)} {...props} />
}

function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuTriggerProps) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn("group inline-flex h-10 items-center justify-center gap-1 rounded-[var(--radius-md)] px-4 py-2 text-sm font-medium outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-[popup-open]:bg-accent data-[popup-open]:text-accent-foreground disabled:pointer-events-none disabled:opacity-50", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 shrink-0 transition-transform duration-200 group-data-[popup-open]:rotate-180" />
    </NavigationMenuPrimitive.Trigger>
  )
}

function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn("left-0 top-0 w-full p-4 md:absolute md:w-auto", className)}
      {...props}
    />
  )
}

function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn("block select-none rounded-[var(--radius-md)] p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-[active]:bg-accent data-[active]:text-accent-foreground", className)}
      {...props}
    />
  )
}

function NavigationMenuPositioner({ className, sideOffset = 8, ...props }: NavigationMenuPositionerProps) {
  return (
    <NavigationMenuPrimitive.Portal>
      <NavigationMenuPrimitive.Positioner
        data-slot="navigation-menu-positioner"
        sideOffset={sideOffset}
        className={cn("isolate z-50 flex justify-center", className)}
        {...props}
      />
    </NavigationMenuPrimitive.Portal>
  )
}

function NavigationMenuViewport({ className, ...props }: NavigationMenuViewportProps) {
  return (
    <NavigationMenuPrimitive.Viewport
      data-slot="navigation-menu-viewport"
      className={cn("relative h-(--height) w-full min-w-80 origin-(--transform-origin) overflow-hidden rounded-[var(--radius-lg)] border border-border bg-popover text-popover-foreground shadow-lg duration-100 md:w-(--width) data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className)}
      {...props}
    />
  )
}

function NavigationMenuArrow({ className, ...props }: NavigationMenuArrowProps) {
  return <NavigationMenuPrimitive.Arrow data-slot="navigation-menu-arrow" className={cn("z-50 flex size-3 rotate-45 border border-border bg-popover", className)} {...props} />
}

export {
  NavigationMenu,
  NavigationMenuArrow,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
}
