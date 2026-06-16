import * as React from "react"
import { XIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type ClearableInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange"
> & {
  value?: string | number | null
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string) => void
  onClear?: () => void
  clearable?: boolean
  clearLabel?: string
  leadingIcon?: React.ReactNode
  trailing?: React.ReactNode
  wrapperClassName?: string
  inputClassName?: string
}

const ClearableInput = React.forwardRef<HTMLInputElement, ClearableInputProps>(
  (
    {
      className,
      value,
      onChange,
      onValueChange,
      onClear,
      clearable = true,
      clearLabel = "Clear",
      leadingIcon,
      trailing,
      wrapperClassName,
      inputClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const stringValue = value == null ? "" : String(value)
    const canClear = clearable && stringValue.length > 0 && !disabled

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(event)
      onValueChange?.(event.target.value)
    }

    const handleClear = () => {
      onValueChange?.("")
      onClear?.()
    }

    return (
      <div
        data-slot="clearable-input"
        className={cn("relative flex w-full items-center", wrapperClassName)}
      >
        {leadingIcon && (
          <span className="pointer-events-none absolute left-2.5 flex text-muted-foreground [&_svg]:size-4">
            {leadingIcon}
          </span>
        )}

        <Input
          ref={ref}
          value={stringValue}
          disabled={disabled}
          onChange={handleChange}
          className={cn(
            leadingIcon && "pl-8",
            (canClear || trailing) && "pr-8",
            inputClassName,
            className
          )}
          {...props}
        />

        <span className="absolute right-2 flex items-center gap-1">
          {trailing}
          {canClear && (
            <button
              type="button"
              aria-label={clearLabel}
              className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={handleClear}
            >
              <XIcon className="size-4" />
            </button>
          )}
        </span>
      </div>
    )
  }
)
ClearableInput.displayName = "ClearableInput"

export { ClearableInput }
