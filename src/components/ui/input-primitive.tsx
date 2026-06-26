import * as React from "react"
import { Input as BaseInputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

export type InputPrimitiveProps = React.ComponentProps<"input"> & {
  type?: string
}

function InputPrimitive({ className, type, ...props }: InputPrimitiveProps) {
  return (
    <BaseInputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-[min(var(--radius-xl),16px)] border border-border/70 bg-background/84 px-3.5 py-2 text-sm text-foreground shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-[background-color,border-color,box-shadow,color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/78 hover:border-ring/34 hover:bg-background/92 focus-visible:border-ring/54 focus-visible:bg-background focus-visible:shadow-[0_0_0_1px_color-mix(in_oklch,var(--ring),transparent_44%),0_10px_24px_rgba(15,23,42,0.06)] focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border/55 disabled:bg-muted/30 disabled:text-muted-foreground/78 disabled:opacity-100 read-only:bg-muted/18 read-only:text-foreground/88 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/16 dark:border-white/10 dark:bg-white/[0.045] dark:hover:bg-white/[0.07] dark:focus-visible:bg-white/[0.08] dark:disabled:bg-white/[0.04] dark:read-only:bg-white/[0.035] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/30",
        className
      )}
      {...props}
    />
  )
}

export { InputPrimitive }
