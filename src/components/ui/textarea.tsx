import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps = React.ComponentProps<"textarea">

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-[var(--radius-2xl)] border border-input/90 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--background),white_12%),var(--background))] px-4 py-3.5 text-base text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_0_rgba(255,255,255,0.06)] transition-[background-color,border-color,box-shadow,color] outline-none placeholder:text-muted-foreground/92 hover:border-ring/30 hover:bg-background focus-visible:border-ring focus-visible:bg-background focus-visible:shadow-[0_0_0_1px_color-mix(in_oklch,var(--ring),transparent_45%),0_10px_24px_rgba(15,23,42,0.08)] focus-visible:ring-3 focus-visible:ring-ring/45 disabled:cursor-not-allowed disabled:bg-input/55 disabled:text-muted-foreground disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:border-white/12 dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.05))] dark:hover:bg-white/8 dark:focus-visible:bg-white/8 dark:disabled:bg-white/8 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
