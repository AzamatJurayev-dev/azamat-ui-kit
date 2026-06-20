import * as React from "react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type InputDecoratorProps = Omit<React.ComponentProps<typeof Input>, "value"> & {
  value?: string | number | null
  leading?: React.ReactNode
  trailing?: React.ReactNode
  wrapperClassName?: string
  inputClassName?: string
}

const InputDecorator = React.forwardRef<HTMLInputElement, InputDecoratorProps>(
  (
    {
      className,
      value,
      leading,
      trailing,
      wrapperClassName,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const hasLeading = Boolean(leading)
    const hasTrailing = Boolean(trailing)

    return (
      <div
        data-slot="input-decorator"
        className={cn("relative flex w-full items-center", wrapperClassName)}
      >
        {hasLeading && (
          <span className="pointer-events-none absolute left-2.5 flex text-muted-foreground [&_svg]:size-4">
            {leading}
          </span>
        )}

        <Input
          ref={ref}
          value={value == null ? "" : String(value)}
          className={cn(
            hasLeading && "pl-8",
            hasTrailing && "pr-9",
            inputClassName,
            className
          )}
          {...props}
        />

        {hasTrailing && (
          <span className="absolute right-2 flex items-center gap-1">
            {trailing}
          </span>
        )}
      </div>
    )
  }
)
InputDecorator.displayName = "InputDecorator"

export { InputDecorator }
