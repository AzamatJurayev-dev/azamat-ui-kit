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
        "h-11 w-full min-w-0 rounded-[min(var(--radius-xl),18px)] border border-border/66 bg-background px-4 py-2.5 text-sm text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.02)] transition-[background-color,border-color,box-shadow,color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/68 hover:border-border/82 hover:bg-background focus-visible:border-ring/48 focus-visible:bg-background focus-visible:shadow-[0_0_0_1px_color-mix(in_oklch,var(--ring),transparent_56%),0_0_0_5px_color-mix(in_oklch,var(--ring),transparent_84%)] focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border/48 disabled:bg-muted/22 disabled:text-muted-foreground/72 disabled:shadow-none disabled:opacity-100 read-only:border-border/58 read-only:bg-muted/16 read-only:text-foreground/84 read-only:shadow-none aria-invalid:border-destructive/60 aria-invalid:shadow-[0_0_0_1px_color-mix(in_oklch,var(--destructive),transparent_64%),0_0_0_5px_color-mix(in_oklch,var(--destructive),transparent_88%)] dark:border-white/10 dark:bg-white/[0.045] dark:hover:border-white/14 dark:hover:bg-white/[0.06] dark:focus-visible:bg-white/[0.07] dark:disabled:bg-white/[0.032] dark:read-only:bg-white/[0.028] dark:aria-invalid:border-destructive/50 dark:aria-invalid:shadow-[0_0_0_1px_color-mix(in_oklch,var(--destructive),transparent_68%),0_0_0_5px_color-mix(in_oklch,var(--destructive),transparent_88%)]",
        className
      )}
      {...props}
    />
  )
}

export { InputPrimitive }
