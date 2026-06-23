import * as React from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"

import { cn } from "@/lib/utils"

const Tabs = BaseTabs.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof BaseTabs.List>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.List>
>(({ className, ...props }, ref) => (
    <BaseTabs.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-1 rounded-[var(--radius-2xl)] border border-border/85 bg-muted/88 p-1 text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur",
        className
      )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Tab>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Tab>
>(({ className, ...props }, ref) => (
    <BaseTabs.Tab
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex min-h-9 items-center justify-center whitespace-nowrap rounded-[calc(var(--radius-xl)-2px)] border border-transparent px-3.5 py-1.5 text-sm font-medium text-muted-foreground ring-offset-background transition-[background-color,color,box-shadow,border-color,transform] hover:bg-background/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[selected]:-translate-y-px data-[selected]:border-border/90 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-[0_1px_0_rgba(255,255,255,0.32),0_14px_28px_rgba(15,23,42,0.14)] dark:data-[selected]:border-white/12 dark:data-[selected]:bg-white/10 dark:data-[selected]:shadow-[0_1px_0_rgba(255,255,255,0.08),0_14px_32px_rgba(0,0,0,0.24)]",
        className
      )}
    {...props}
  />
))
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  React.ElementRef<typeof BaseTabs.Panel>,
  React.ComponentPropsWithoutRef<typeof BaseTabs.Panel>
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
