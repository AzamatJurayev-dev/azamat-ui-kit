import * as React from "react"

import { cn } from "@/lib/utils"

export type AspectRatioProps = React.ComponentProps<"div"> & {
  ratio?: number
}

function AspectRatio({ ratio = 16 / 9, className, style, children, ...props }: AspectRatioProps) {
  return (
    <div
      data-slot="aspect-ratio"
      className={cn("relative w-full overflow-hidden", className)}
      style={{ aspectRatio: String(ratio), ...style }}
      {...props}
    >
      <div className="absolute inset-0">{children}</div>
    </div>
  )
}

export { AspectRatio }
