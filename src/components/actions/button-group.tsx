import * as React from "react"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ButtonGroupItem = Omit<ButtonProps, "children"> & {
  key: string
  label: React.ReactNode
}

export type ButtonGroupProps = React.ComponentProps<"div"> & {
  items?: ButtonGroupItem[]
  attached?: boolean
  size?: ButtonProps["size"]
  variant?: ButtonProps["variant"]
}

function ButtonGroup({ items, attached = true, size = "sm", variant = "outline", className, children, ...props }: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      role="group"
      className={cn("inline-flex items-center", !attached && "gap-2", className)}
      {...props}
    >
      {items?.map(({ key, label, className: itemClassName, size: itemSize, variant: itemVariant, ...item }) => (
        <Button
          key={key}
          size={itemSize ?? size}
          variant={itemVariant ?? variant}
          className={cn(
            attached && "rounded-none first:rounded-l-md last:rounded-r-md -ml-px first:ml-0",
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
