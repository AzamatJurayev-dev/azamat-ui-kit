import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

export type TabsRootProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Root>
export type TabsListProps = React.ComponentPropsWithoutRef<typeof BaseTabs.List> & {
  variant?: "default" | "pills" | "underline" | "compact"
  overflow?: "wrap" | "scroll"
}
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Tab> & {
  variant?: "default" | "pills" | "underline" | "compact"
}
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>

const Tabs = BaseTabs.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabs.List>,
  TabsListProps
>(({ className, variant = "default", overflow = "scroll", ...props }, ref) => (
    <BaseTabs.List
      ref={ref}
      data-slot="tabs-list"
      data-variant={variant}
      data-overflow={overflow}
      className={cn(
        "inline-flex max-w-full items-center justify-start",
        overflow === "scroll" && "overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        overflow === "wrap" && "flex-wrap",
        className
      )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Tab>,
  TabsTriggerProps
>(({ className, variant = "default", ...props }, ref) => (
    <BaseTabs.Tab
      ref={ref}
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(
        "inline-flex shrink-0 items-center justify-center whitespace-nowrap disabled:pointer-events-none",
        className
      )}
    {...props}
  />
))
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Panel>,
  TabsContentProps
>(({ className, ...props }, ref) => (
    <BaseTabs.Panel
      ref={ref}
      data-slot="tabs-content"
      className={className}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
