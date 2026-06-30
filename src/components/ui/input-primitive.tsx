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
        "h-11 w-full min-w-0 rounded-[var(--aui-control-radius,var(--radius-xl))] border border-[color:var(--aui-control-border-strong,var(--input))] bg-[color:var(--aui-control-surface,var(--background))] px-4 py-2.5 text-sm font-medium text-foreground shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04))] transition-[background-color,border-color,box-shadow,color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/78 hover:border-[color:var(--aui-control-hover-border,var(--ring))] hover:bg-[color:var(--aui-control-surface-hover,var(--background))] hover:shadow-[var(--aui-control-shadow,0_2px_6px_rgba(15,23,42,0.06))] focus-visible:border-[color:var(--ring)] focus-visible:ring-0 focus-visible:shadow-[var(--aui-control-shadow,0_1px_2px_rgba(15,23,42,0.04)),0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-[color:color-mix(in_oklch,var(--border),transparent_18%)] disabled:bg-[color:var(--aui-control-surface-disabled,var(--muted))] disabled:text-muted-foreground disabled:shadow-none disabled:opacity-100 read-only:bg-[color:var(--aui-control-surface-readonly,var(--muted))]",
        className
      )}
      {...props}
    />
  )
}

export { InputPrimitive }
