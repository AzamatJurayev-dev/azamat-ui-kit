import * as React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ButtonProps = React.ComponentProps<typeof Button>

export type ButtonGroupItem = Omit<ButtonProps, "children"> & {
  key: string
  label: React.ReactNode
}

export type ButtonGroupProps = React.ComponentProps<"div"> & {
  items?: ButtonGroupItem[]
  attached?: boolean
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
  orientation?: "horizontal" | "vertical"
  fullWidth?: boolean
}

function ButtonGroup({
  items,
  attached = true,
  size = "sm",
  variant = "outline",
  orientation = "horizontal",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonGroupProps) {
  const isVertical = orientation === "vertical"

  return (
    <div
      data-slot="button-group"
      role="group"
      data-orientation={orientation}
      className={cn(
        "inline-flex",
        isVertical ? "flex-col" : "items-center",
        fullWidth && "w-full",
        attached
          ? "overflow-hidden rounded-[var(--aui-control-radius,var(--radius-md))] border border-[color:var(--aui-control-border,var(--border))] bg-[color:var(--aui-control-surface,var(--background))] shadow-[var(--aui-control-shadow,none)]"
          : "gap-2",
        className
      )}
      {...props}
    >
      {items?.map(({ key, label, className: itemClassName, size: itemSize, variant: itemVariant, ...item }) => (
        <Button
          key={key}
          size={itemSize ?? size}
          variant={itemVariant ?? variant}
          className={cn(
            attached &&
              cn(
                "relative rounded-none border-0 shadow-none first:ml-0",
                fullWidth && "flex-1",
                isVertical
                  ? "w-full border-t border-[color:var(--aui-control-border,var(--border))] first:border-t-0"
                  : "border-l border-[color:var(--aui-control-border,var(--border))] first:border-l-0"
              ),
            itemClassName
          )}
          {...item}
        >
          {label}
        </Button>
      ))}
      {children}
    </div>
  )
}

export { ButtonGroup }
