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
        "h-11 w-full min-w-0 rounded-[min(var(--radius-xl),18px)] border px-4 py-2.5 text-sm text-foreground transition-[background-color,border-color,box-shadow,color] outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/72 focus-visible:ring-0 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-100",
        className
      )}
      {...props}
    />
  )
}

export { InputPrimitive }
