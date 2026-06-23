import * as React from "react"

import { cn } from "@/lib/utils"

export type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "onChange" | "value"
> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const currentChecked = isControlled ? checked : internalChecked

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      const nextChecked = !currentChecked

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
        role="switch"
        aria-checked={currentChecked}
        data-state={currentChecked ? "checked" : "unchecked"}
        data-slot="switch"
        disabled={disabled}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-border/70 bg-input/85 shadow-sm transition-[background-color,border-color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/45 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_10px_22px_color-mix(in_oklch,var(--primary),transparent_82%)] dark:bg-input/80",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span
          data-slot="switch-thumb"
          data-state={currentChecked ? "checked" : "unchecked"}
          className={cn(
            "pointer-events-none block size-5 rounded-full bg-background shadow-[0_2px_10px_color-mix(in_oklch,var(--foreground),transparent_86%)] ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0.5"
          )}
        />
      </button>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
