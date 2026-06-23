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
        "flex h-8 w-full min-w-0 items-center rounded-lg border border-input bg-transparent transition-colors focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
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
