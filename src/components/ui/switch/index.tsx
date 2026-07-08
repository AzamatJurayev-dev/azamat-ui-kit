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
          "peer inline-flex h-6.5 w-11.5 shrink-0 cursor-pointer items-center rounded-full border border-border/78 bg-input/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,border-color,box-shadow] outline-none hover:border-ring/30 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/45 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary/22 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_10px_22px_color-mix(in_oklch,var(--primary),transparent_82%)] dark:border-white/10 dark:bg-white/[0.08]",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <span
          data-slot="switch-thumb"
          data-state={currentChecked ? "checked" : "unchecked"}
          className={cn(
            "pointer-events-none block size-5 rounded-full bg-white shadow-[0_2px_10px_color-mix(in_oklch,var(--foreground),transparent_88%)] ring-1 ring-foreground/6 transition-transform data-[state=checked]:translate-x-5.5 data-[state=unchecked]:translate-x-0.5 dark:bg-[rgba(255,255,255,0.96)]"
          )}
        />
      </button>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
