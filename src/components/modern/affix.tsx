import * as React from "react"

import { cn } from "@/lib/utils"

export type AffixProps = React.ComponentProps<"div"> & {
  offsetTop?: number
  zIndex?: number
}

function Affix({ offsetTop = 0, zIndex = 30, className, style, ...props }: AffixProps) {
  return (
    <div
      data-slot="affix"
      className={cn("sticky", className)}
      style={{ top: offsetTop, zIndex, ...style }}
      {...props}
    />
  )
}

export { Affix }
