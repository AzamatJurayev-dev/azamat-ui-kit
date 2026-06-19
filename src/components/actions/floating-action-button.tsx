import * as React from "react"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type FloatingActionButtonProps = React.ComponentProps<typeof Button> & {
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
  icon?: React.ReactNode
}

const positionClassName = {
  "bottom-right": "bottom-6 right-6",
  "bottom-left": "bottom-6 left-6",
  "top-right": "right-6 top-6",
  "top-left": "left-6 top-6",
}

function FloatingActionButton({ position = "bottom-right", icon, className, children, ...props }: FloatingActionButtonProps) {
  return (
    <Button
      data-slot="floating-action-button"
      size={children ? "lg" : "icon-lg"}
      className={cn("fixed z-40 rounded-full shadow-lg", positionClassName[position], className)}
      {...props}
    >
      {icon ?? <PlusIcon />}
      {children}
    </Button>
  )
}

export { FloatingActionButton }
