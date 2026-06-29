import * as React from "react"

import { cn } from "@/lib/utils"

type InputChromeProps = React.ComponentProps<"div"> & {
  start?: React.ReactNode
  end?: React.ReactNode
  startClassName?: string
  endClassName?: string
}

function InputChrome({
  start,
  end,
  startClassName,
  endClassName,
  className,
  children,
  ...props
}: InputChromeProps) {
  return (
    <div
      data-slot="input-chrome"
      className={cn(
        "flex h-10 w-full min-w-0 items-center rounded-[var(--aui-control-radius,var(--radius-lg))] border border-[color:var(--aui-control-border-strong,var(--input))] bg-[color:var(--aui-control-surface,var(--background))] shadow-[var(--aui-control-shadow,none)] transition-[background-color,border-color,box-shadow] hover:border-[color:var(--aui-control-hover-border,var(--ring))] hover:bg-[color:var(--aui-control-surface-hover,var(--background))] focus-within:border-[color:var(--ring)] focus-within:shadow-[var(--aui-control-shadow,none),0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)]",
        className
      )}
      {...props}
    >
      {start && <span className={cn("shrink-0", startClassName)}>{start}</span>}
      {children}
      {end && <span className={cn("shrink-0", endClassName)}>{end}</span>}
    </div>
  )
}

export { InputChrome }
