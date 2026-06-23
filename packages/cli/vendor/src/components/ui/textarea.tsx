import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-24 w-full rounded-[var(--radius-2xl)] border border-input/85 bg-background/92 px-3.5 py-3 text-base shadow-sm transition-[background-color,border-color,box-shadow,color] outline-none placeholder:text-muted-foreground/95 hover:border-border focus-visible:border-ring focus-visible:bg-background focus-visible:ring-3 focus-visible:ring-ring/45 disabled:cursor-not-allowed disabled:bg-input/55 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:hover:bg-input/45 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
