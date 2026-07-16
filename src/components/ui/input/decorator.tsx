import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { InputPrimitive } from "./primitive"
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

export type InputDecoratorProps = Omit<React.ComponentProps<typeof InputPrimitive>, "value"> &
  VariantProps<typeof inputDecoratorVariants> & {
    value?: string | number | readonly string[] | null
    leading?: React.ReactNode
    trailing?: React.ReactNode
    trailingAction?: React.ReactNode
    leadingPointerEvents?: boolean
    trailingPointerEvents?: boolean
    trailingActionPointerEvents?: boolean
    wrapperClassName?: string
    inputClassName?: string
    leadingClassName?: string
    trailingClassName?: string
    trailingActionClassName?: string
  }

const InputDecorator = React.forwardRef<HTMLInputElement, InputDecoratorProps>(
  (
    {
      className,
      value,
      leading,
      trailing,
      trailingAction,
      leadingPointerEvents = false,
      trailingPointerEvents = true,
      trailingActionPointerEvents = true,
      wrapperClassName,
      inputClassName,
      leadingClassName,
      trailingClassName,
      trailingActionClassName,
      density,
      tone,
      ...props
    },
    ref
    ) => {
      const hasLeading = Boolean(leading)
      const hasTrailing = Boolean(trailing)
      const hasTrailingAction = Boolean(trailingAction)
      const resolvedValue =
        value == null
        ? value === null
          ? ""
          : undefined
        : Array.isArray(value)
          ? value
          : String(value)

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
              "absolute left-4 z-10 flex items-center text-muted-foreground/74 [&_svg]:size-4",
              !leadingPointerEvents && "pointer-events-none",
              leadingClassName
            )}
          >
            {leading}
          </span>
        )}

        <InputPrimitive
          ref={ref}
          value={resolvedValue}
          className={cn(
            hasLeading && "pl-11",
            hasTrailing && hasTrailingAction ? "pr-28" : hasTrailing || hasTrailingAction ? "pr-12" : undefined,
            inputClassName,
            className
          )}
          {...props}
        />

        {hasTrailing && (
          <span
            data-slot="input-trailing"
            className={cn(
              "absolute right-12 z-10 flex items-center gap-1.5 text-muted-foreground/74",
              !trailingPointerEvents && "pointer-events-none",
              trailingClassName
            )}
          >
            {trailing}
          </span>
        )}

        {hasTrailingAction && (
          <span
            data-slot="input-trailing-action"
            className={cn(
              "absolute right-3 z-10 flex items-center gap-1.5 text-muted-foreground/74",
              !trailingActionPointerEvents && "pointer-events-none",
              trailingActionClassName
            )}
          >
            {trailingAction}
          </span>
        )}
      </div>
    )
  }
)
InputDecorator.displayName = "InputDecorator"

export { InputDecorator, inputDecoratorVariants }
