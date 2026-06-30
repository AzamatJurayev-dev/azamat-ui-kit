import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

export type TabsRootProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Root>
export type TabsListProps = React.ComponentPropsWithoutRef<typeof BaseTabs.List>
export type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
export type TabsContentProps = React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>

const Tabs = BaseTabs.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabs.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
    <BaseTabs.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-1 rounded-[var(--radius-2xl)] border p-1 text-muted-foreground backdrop-blur",
        className
      )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Tab>,
  TabsTriggerProps
>(({ className, ...props }, ref) => (
    <BaseTabs.Tab
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-[calc(var(--radius-xl)-2px)] border border-transparent px-3.5 py-1.5 text-sm font-medium ring-offset-background transition-[background-color,color,box-shadow,border-color] focus-visible:outline-none focus-visible:ring-0 disabled:pointer-events-none disabled:opacity-50",
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
      className={cn(
      "mt-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
