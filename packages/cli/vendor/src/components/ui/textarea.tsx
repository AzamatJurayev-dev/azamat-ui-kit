import * as React from "react"

import { cn } from "@/lib/utils"

export type TextareaProps = React.ComponentProps<"textarea">

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-28 w-full rounded-[var(--aui-control-radius,var(--radius-2xl))] border border-[color:var(--aui-control-border-strong,var(--input))] bg-[color:var(--aui-control-surface,var(--background))] px-4 py-3.5 text-sm font-medium text-foreground shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04))] transition-[background-color,border-color,box-shadow,color] outline-none placeholder:text-muted-foreground/78 hover:border-[color:var(--aui-control-hover-border,var(--ring))] hover:bg-[color:var(--aui-control-surface-hover,var(--background))] hover:shadow-[var(--aui-control-shadow,0_2px_6px_rgba(15,23,42,0.06))] focus-visible:border-[color:var(--ring)] focus-visible:ring-0 focus-visible:shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04)),0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)] disabled:cursor-not-allowed disabled:border-[color:color-mix(in_oklch,var(--border),transparent_18%)] disabled:bg-[color:var(--aui-control-surface-disabled,var(--muted))] disabled:text-muted-foreground disabled:shadow-none disabled:opacity-100 aria-invalid:border-destructive aria-invalid:shadow-[0_0_0_1px_color-mix(in_oklch,var(--destructive),transparent_32%)] read-only:bg-[color:var(--aui-control-surface-readonly,var(--muted))]",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
