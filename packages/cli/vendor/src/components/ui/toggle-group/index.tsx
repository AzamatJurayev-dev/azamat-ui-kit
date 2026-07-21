"use client"

import { Toggle } from "@base-ui/react/toggle"
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group"

import { cn } from "@/lib/utils"

export type ToggleGroupProps<TValue extends string = string> = ToggleGroupPrimitive.Props<TValue> & {
  variant?: "default" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}
export type ToggleGroupItemProps<TValue extends string = string> = Toggle.Props<TValue> & {
  variant?: ToggleGroupProps<TValue>["variant"]
  size?: ToggleGroupProps<TValue>["size"]
}

const sizeClassName = {
  sm: "h-8 min-w-8 px-2 text-xs",
  md: "h-9 min-w-9 px-3 text-sm",
  lg: "h-10 min-w-10 px-3.5 text-sm",
}

function ToggleGroup<TValue extends string = string>({
  className,
  variant = "default",
  size = "md",
  orientation = "horizontal",
  ...props
}: ToggleGroupProps<TValue>) {
  return (
    <ToggleGroupPrimitive
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      orientation={orientation}
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-lg)]",
        variant === "default" && "border border-border/72 bg-muted/45 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
        variant === "outline" && "gap-0 overflow-hidden rounded-[var(--radius-lg)] border border-border/78 bg-background",
        orientation === "vertical" && "flex-col items-stretch",
        className
      )}
      {...props}
    />
  )
}

function ToggleGroupItem<TValue extends string = string>({
  className,
  variant = "default",
  size = "md",
  ...props
}: ToggleGroupItemProps<TValue>) {
  return (
    <Toggle
      data-slot="toggle-group-item"
      data-variant={variant}
      data-size={size}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 whitespace-nowrap font-medium outline-none transition-[background-color,color,border-color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 data-[pressed]:text-foreground focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4 [&_svg]:shrink-0",
        sizeClassName[size],
        variant === "default" && "rounded-[calc(var(--radius-md)-1px)] text-muted-foreground hover:bg-background/70 hover:text-foreground data-[pressed]:-translate-y-px data-[pressed]:bg-background data-[pressed]:shadow-sm",
        variant === "outline" && "-m-px border border-border/78 text-muted-foreground hover:bg-muted/60 hover:text-foreground data-[pressed]:bg-primary data-[pressed]:text-primary-foreground data-[pressed]:shadow-inner first:rounded-l-[var(--radius-md)] last:rounded-r-[var(--radius-md)]",
        variant === "ghost" && "rounded-[var(--radius-md)] text-muted-foreground hover:bg-muted/70 hover:text-foreground data-[pressed]:bg-accent data-[pressed]:text-accent-foreground",
        className
      )}
      {...props}
    />
  )
}

export { ToggleGroup, ToggleGroupItem }
