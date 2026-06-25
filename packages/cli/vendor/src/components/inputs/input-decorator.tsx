import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const inputDecoratorVariants = cva("relative flex w-full items-center", {
  variants: {
    density: {
      compact: "text-xs",
      default: "text-sm",
      comfortable: "text-base",
    },
    tone: {
      neutral: "",
      info: "[&_[data-slot=input]]:border-blue-500/30 [&_[data-slot=input]]:focus-visible:ring-blue-500/20",
      success: "[&_[data-slot=input]]:border-emerald-500/30 [&_[data-slot=input]]:focus-visible:ring-emerald-500/20",
      warning: "[&_[data-slot=input]]:border-amber-500/35 [&_[data-slot=input]]:focus-visible:ring-amber-500/20",
      danger: "[&_[data-slot=input]]:border-destructive/40 [&_[data-slot=input]]:focus-visible:ring-destructive/20",
    },
  },
  defaultVariants: {
    density: "default",
    tone: "neutral",
  },
})

export type InputDecoratorProps = Omit<React.ComponentProps<typeof Input>, "value"> &
  VariantProps<typeof inputDecoratorVariants> & {
    value?: string | number | null
    leading?: React.ReactNode
    trailing?: React.ReactNode
    leadingPointerEvents?: boolean
    trailingPointerEvents?: boolean
    wrapperClassName?: string
    inputClassName?: string
    leadingClassName?: string
    trailingClassName?: string
  }

const InputDecorator = React.forwardRef<HTMLInputElement, InputDecoratorProps>(
  (
    {
      className,
      value,
      leading,
      trailing,
      leadingPointerEvents = false,
      trailingPointerEvents = true,
      wrapperClassName,
      inputClassName,
      leadingClassName,
      trailingClassName,
      density,
      tone,
      ...props
    },
    ref
  ) => {
    const hasLeading = Boolean(leading)
    const hasTrailing = Boolean(trailing)

    return (
      <div
        data-slot="input-decorator"
        data-has-leading={hasLeading || undefined}
        data-has-trailing={hasTrailing || undefined}
        className={cn(inputDecoratorVariants({ density, tone }), wrapperClassName)}
      >
        {hasLeading && (
          <span
            data-slot="input-leading"
            className={cn(
              "absolute left-2.5 z-10 flex items-center text-muted-foreground [&_svg]:size-4",
              !leadingPointerEvents && "pointer-events-none",
              leadingClassName
            )}
          >
            {leading}
          </span>
        )}

        <Input
          ref={ref}
          value={value == null ? "" : String(value)}
          className={cn(hasLeading && "pl-8", hasTrailing && "pr-9", inputClassName, className)}
          {...props}
        />

        {hasTrailing && (
          <span
            data-slot="input-trailing"
            className={cn(
              "absolute right-2 z-10 flex items-center gap-1 text-muted-foreground",
              !trailingPointerEvents && "pointer-events-none",
              trailingClassName
            )}
          >
            {trailing}
          </span>
        )}
      </div>
    )
  }
)
InputDecorator.displayName = "InputDecorator"

export { InputDecorator, inputDecoratorVariants }
