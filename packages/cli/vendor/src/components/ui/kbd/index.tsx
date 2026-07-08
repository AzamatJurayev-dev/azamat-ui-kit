import * as React from "react"

import { cn } from "@/lib/utils"

export type KbdProps = React.ComponentProps<"kbd"> & {
  size?: "sm" | "default" | "lg"
  variant?: "default" | "outline" | "ghost"
}

const sizeClassName = {
  sm: "h-5 px-1.5 text-[10px]",
  default: "h-6 px-2 text-xs",
  lg: "h-7 px-2.5 text-sm",
}

const variantClassName = {
  default: "border-border/80 bg-muted text-muted-foreground shadow-[inset_0_-1px_0_rgba(0,0,0,0.08)]",
  outline: "border-border bg-background text-foreground shadow-sm",
  ghost: "border-transparent bg-transparent text-muted-foreground shadow-none",
}

function Kbd({ className, size = "default", variant = "default", ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd"
      data-size={size}
      className={cn("inline-flex shrink-0 items-center justify-center rounded-md border font-mono font-medium leading-none", sizeClassName[size], variantClassName[variant], className)}
      {...props}
    />
  )
}

export { Kbd }
