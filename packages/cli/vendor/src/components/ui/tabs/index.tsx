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
        "inline-flex max-w-full items-center justify-start gap-1 rounded-[var(--radius-lg)] border border-border/72 bg-muted/45 p-1",
        variant === "underline" && "gap-4 rounded-none border-x-0 border-t-0 bg-transparent p-0",
        variant === "compact" && "rounded-[var(--radius-md)] p-0.5",
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
        "inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-[var(--radius-md)] px-4 text-sm font-medium text-muted-foreground outline-none transition-all hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-md data-[selected]:ring-1 data-[selected]:ring-border/30",
        variant === "pills" && "rounded-full px-5 data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:shadow-md data-[selected]:ring-0",
        variant === "underline" && "h-10 rounded-none border-b-2 border-transparent bg-transparent px-2 shadow-none hover:bg-transparent data-[selected]:border-primary data-[selected]:bg-transparent data-[selected]:shadow-none data-[selected]:ring-0",
        variant === "compact" && "h-8 rounded-[calc(var(--radius-md)-2px)] px-3 text-xs",
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
      className={cn("mt-3 outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
