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
          "peer flex size-5 shrink-0 items-center justify-center rounded-[10px] border border-input/88 bg-background text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] outline-none transition-[background-color,border-color,box-shadow,color,transform] hover:border-ring/30 hover:bg-background focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/45 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary/28 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_10px_24px_color-mix(in_oklch,var(--primary),transparent_82%)] data-[state=indeterminate]:border-primary/28 data-[state=indeterminate]:bg-primary data-[state=indeterminate]:shadow-[0_10px_24px_color-mix(in_oklch,var(--primary),transparent_82%)] dark:border-white/12 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children ?? (
          <span className="flex items-center justify-center">
            {currentChecked === "indeterminate" ? (
              <MinusIcon className="size-3.5" />
            ) : currentChecked ? (
              <CheckIcon className="size-3.5" />
            ) : null}
          </span>
        )}
      </button>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
