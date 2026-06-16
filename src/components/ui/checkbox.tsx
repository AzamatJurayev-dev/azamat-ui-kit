import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CheckboxCheckedState = boolean | "indeterminate"

export type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "checked" | "defaultChecked" | "onChange" | "value"
> & {
  checked?: CheckboxCheckedState
  defaultChecked?: CheckboxCheckedState
  onCheckedChange?: (checked: boolean) => void
}

function getNextCheckedState(checked: CheckboxCheckedState) {
  return checked === true ? false : true
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      onClick,
      children,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = React.useState<CheckboxCheckedState>(defaultChecked)
    const currentChecked = isControlled ? checked : internalChecked
    const dataState = currentChecked === "indeterminate" ? "indeterminate" : currentChecked ? "checked" : "unchecked"

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      const nextChecked = getNextCheckedState(currentChecked)

      if (!isControlled) {
        setInternalChecked(nextChecked)
      }

      onCheckedChange?.(nextChecked)
      onClick?.(event)
    }

    return (
      <button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={currentChecked === "indeterminate" ? "mixed" : currentChecked}
        data-state={dataState}
        data-slot="checkbox"
        disabled={disabled}
        className={cn(
          "peer flex size-4 shrink-0 items-center justify-center rounded-[min(var(--radius-md),6px)] border border-input bg-transparent text-primary-foreground shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children ?? (
          <span className="flex items-center justify-center">
            {currentChecked === "indeterminate" ? (
              <MinusIcon className="size-3" />
            ) : currentChecked ? (
              <CheckIcon className="size-3" />
            ) : null}
          </span>
        )}
      </button>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
