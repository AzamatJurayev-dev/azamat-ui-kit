import * as React from "react"

import { cn } from "@/lib/utils"

export type FloatButtonProps = React.ComponentProps<"button"> & {
  placement?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

const placementClassName = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "right-6 top-6",
  "top-left": "left-6 top-6",
}

function FloatButton({ placement = "bottom-right", className, ...props }: FloatButtonProps) {
  return (
    <button
      type="button"
      data-slot="float-button"
      className={cn("fixed z-50 inline-flex size-12 items-center justify-center rounded-full border bg-primary text-primary-foreground shadow-lg transition hover:opacity-90", placementClassName[placement], className)}
      {...props}
    />
  )
}

export { FloatButton }
