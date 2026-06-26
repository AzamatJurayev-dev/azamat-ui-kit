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
        "h-11 w-full min-w-0 rounded-[min(var(--radius-xl),18px)] border border-border/64 bg-background/92 px-4 py-2.5 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_20px_rgba(15,23,42,0.03)] transition-[background-color,border-color,box-shadow,color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/72 hover:border-ring/30 hover:bg-background focus-visible:border-ring/46 focus-visible:bg-background focus-visible:shadow-[0_0_0_1px_color-mix(in_oklch,var(--ring),transparent_56%),0_14px_28px_rgba(15,23,42,0.05)] focus-visible:ring-3 focus-visible:ring-ring/22 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border/48 disabled:bg-muted/24 disabled:text-muted-foreground/72 disabled:shadow-none disabled:opacity-100 read-only:border-border/52 read-only:bg-muted/16 read-only:text-foreground/84 read-only:shadow-none aria-invalid:border-destructive/60 aria-invalid:ring-3 aria-invalid:ring-destructive/14 dark:border-white/9 dark:bg-white/[0.05] dark:hover:bg-white/[0.065] dark:focus-visible:bg-white/[0.075] dark:disabled:bg-white/[0.035] dark:read-only:bg-white/[0.03] dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/24",
        className
      )}
      {...props}
    />
  )
}

export { InputPrimitive }
