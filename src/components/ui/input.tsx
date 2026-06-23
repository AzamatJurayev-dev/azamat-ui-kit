import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-xl border border-input/90 bg-background/96 px-3 py-2 text-base text-foreground shadow-[0_1px_0_rgba(255,255,255,0.06)] transition-[background-color,border-color,box-shadow,color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/92 hover:border-ring/30 hover:bg-background focus-visible:border-ring focus-visible:bg-background focus-visible:shadow-[0_0_0_1px_color-mix(in_oklch,var(--ring),transparent_45%)] focus-visible:ring-3 focus-visible:ring-ring/45 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/55 disabled:text-muted-foreground disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:border-white/12 dark:bg-white/6 dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:disabled:bg-white/8 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Input }
