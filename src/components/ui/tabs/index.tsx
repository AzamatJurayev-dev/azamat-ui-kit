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
        "inline-flex max-w-full min-h-11 items-center justify-start gap-1 rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:color-mix(in_oklch,var(--border),white_4%)] bg-[color:var(--aui-control-panel-bg,var(--muted))] p-1 text-muted-foreground shadow-[var(--aui-control-panel-shadow,var(--aui-control-shadow,none))] backdrop-blur",
        overflow === "scroll" && "overflow-x-auto overflow-y-hidden overscroll-x-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        overflow === "wrap" && "flex-wrap",
        variant === "underline" && "min-h-10 rounded-none border-x-0 border-t-0 bg-transparent p-0 shadow-none",
        variant === "compact" && "min-h-9 rounded-[var(--radius-lg)] p-0.5",
        variant === "pills" && "rounded-full",
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
        "inline-flex min-h-9 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-md)] border border-transparent px-3.5 py-1.5 text-sm font-medium text-muted-foreground ring-offset-background transition-[background-color,color,box-shadow,border-color] hover:bg-[color:color-mix(in_oklch,var(--background),transparent_18%)] hover:text-foreground data-[selected]:border-[color:color-mix(in_oklch,var(--border),var(--foreground)_8%)] data-[selected]:bg-[color:var(--aui-control-surface,var(--background))] data-[selected]:text-foreground data-[selected]:shadow-[var(--aui-control-shadow,none)] aria-selected:border-[color:color-mix(in_oklch,var(--border),var(--foreground)_8%)] aria-selected:bg-[color:var(--aui-control-surface,var(--background))] aria-selected:text-foreground aria-selected:shadow-[var(--aui-control-shadow,none)] focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-[var(--aui-control-shadow,none),0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
        variant === "underline" && "min-h-10 rounded-none border-b-2 px-2 shadow-none data-[selected]:border-b-primary data-[selected]:bg-transparent data-[selected]:shadow-none aria-selected:border-b-primary aria-selected:bg-transparent aria-selected:shadow-none",
        variant === "pills" && "rounded-full",
        variant === "compact" && "min-h-8 px-2.5 text-xs",
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
      className={cn(
      "mt-3 ring-offset-background focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-[0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)]",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
