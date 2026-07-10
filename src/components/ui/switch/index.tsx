"use client"

import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

export type SwitchProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "onChange" | "value"
> & {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  size?: "sm" | "md" | "lg"
  loading?: boolean
  invalid?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
  labelPlacement?: "start" | "end" | "top" | "bottom"
  switchClassName?: string
  labelClassName?: string
  descriptionClassName?: string
}

const switchSizeClassName = {
  sm: "h-5 w-9",
  md: "h-6.5 w-11.5",
  lg: "h-8 w-14",
} satisfies Record<NonNullable<SwitchProps["size"]>, string>

const thumbSizeClassName = {
  sm: "size-4 data-[state=checked]:translate-x-4.5 data-[state=unchecked]:translate-x-0.5",
  md: "size-5 data-[state=checked]:translate-x-5.5 data-[state=unchecked]:translate-x-0.5",
  lg: "size-6 data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-1",
} satisfies Record<NonNullable<SwitchProps["size"]>, string>

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      size = "md",
      loading = false,
      invalid = false,
      label,
      description,
      labelPlacement = "end",
      switchClassName,
      labelClassName,
      descriptionClassName,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const isControlled = checked !== undefined
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked)
    const currentChecked = isControlled ? checked : internalChecked
    const isDisabled = disabled || loading

    const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      if (isDisabled) return
      const nextChecked = !currentChecked

      if (!isControlled) {
        setInternalChecked(nextChecked)
      }

      onCheckedChange?.(nextChecked)
      onClick?.(event)
    }

    const control = (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={currentChecked}
        aria-invalid={invalid || undefined}
        aria-busy={loading || undefined}
        data-state={currentChecked ? "checked" : "unchecked"}
        data-size={size}
        data-slot="switch"
        disabled={isDisabled}
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border border-border/78 bg-input/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-[background-color,border-color,box-shadow] outline-none hover:border-ring/30 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/45 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[state=checked]:border-primary/22 data-[state=checked]:bg-primary data-[state=checked]:shadow-[0_10px_22px_color-mix(in_oklch,var(--primary),transparent_82%)] dark:border-white/10 dark:bg-white/[0.08]",
          switchSizeClassName[size],
          switchClassName,
          !label && className
        )}
        onClick={handleClick}
        {...props}
      >
        <span
          data-slot="switch-thumb"
          data-state={currentChecked ? "checked" : "unchecked"}
          className={cn(
            "pointer-events-none flex items-center justify-center rounded-full bg-white shadow-[0_2px_10px_color-mix(in_oklch,var(--foreground),transparent_88%)] ring-1 ring-foreground/6 transition-transform dark:bg-[rgba(255,255,255,0.96)]",
            thumbSizeClassName[size]
          )}
        >
          {loading ? <Loader2Icon className="size-3 animate-spin text-muted-foreground" /> : null}
        </span>
      </button>
    )

    if (!label && !description) return control

    const labelBlock = (
      <span className="grid min-w-0 gap-0.5">
        {label ? <span className={cn("text-sm font-medium leading-5 text-foreground", labelClassName)}>{label}</span> : null}
        {description ? <span className={cn("text-xs leading-5 text-muted-foreground", descriptionClassName)}>{description}</span> : null}
      </span>
    )

    return (
      <label
        data-slot="switch-field"
        data-label-placement={labelPlacement}
        className={cn(
          "inline-flex min-w-0 gap-3",
          labelPlacement === "top" || labelPlacement === "bottom" ? "flex-col" : "items-start",
          labelPlacement === "start" && "flex-row-reverse justify-end",
          className
        )}
      >
        {labelPlacement === "bottom" ? <>{control}{labelBlock}</> : <>{labelBlock}{control}</>}
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
