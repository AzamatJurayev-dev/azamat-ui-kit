import * as React from "react"

import { cn } from "@/lib/utils"

export type WatermarkProps = React.ComponentProps<"div"> & {
  text?: string
}

function Watermark({ text = "Azamat UI", className, children, ...props }: WatermarkProps) {
  return (
    <div data-slot="watermark" className={cn("relative overflow-hidden", className)} {...props}>
      <div className="pointer-events-none absolute inset-0 z-0 grid place-items-center opacity-10">
        <span className="rotate-[-24deg] select-none text-4xl font-bold tracking-widest text-muted-foreground">{text}</span>
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export { Watermark }
