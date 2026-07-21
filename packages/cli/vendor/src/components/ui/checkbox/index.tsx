"use client"

import * as React from "react"
import { CheckIcon, MinusIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type CheckboxCheckedState = boolean | "indeterminate"

export type CheckboxProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "checked" | "defaultChecked" | "name" | "onChange" | "required" | "value"
> & {
  checked?: CheckboxCheckedState
  defaultChecked?: CheckboxCheckedState
  name?: string
  value?: string
  required?: boolean
  onCheckedChange?: (checked: boolean) => void
  onCheckedStateChange?: (checked: CheckboxCheckedState) => void
  size?: "sm" | "md" | "lg"
  invalid?: boolean
  allowIndeterminate?: boolean
}

function getNextCheckedState(checked: CheckboxCheckedState, allowIndeterminate: boolean) {
  if (!allowIndeterminate) {
    return checked === true ? false : true
  }

  if (checked === false) return "indeterminate"
  if (checked === "indeterminate") return true
  return false
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      className,
      checked,
      defaultChecked = false,
      onCheckedChange,
      onCheckedStateChange,
      size = "md",
      invalid = false,
      allowIndeterminate = false,
      disabled,
      name,
      value = "on",
      required,
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
      event.preventDefault()
      event.stopPropagation()
      const nextChecked = getNextCheckedState(currentChecked, allowIndeterminate)

      if (!isControlled) {
        setInternalChecked(nextChecked)
      }

      onCheckedStateChange?.(nextChecked)
      onCheckedChange?.(nextChecked === true)
      onClick?.(event)
    }

    return (
      <>
        {name ? (
          <input
            type="checkbox"
            aria-hidden="true"
            tabIndex={-1}
            className="sr-only"
            name={name}
            value={value}
            checked={currentChecked === true}
            required={required}
            disabled={disabled}
            readOnly
          />
        ) : null}
        <button
          ref={ref}
          type="button"
          role="checkbox"
          aria-checked={currentChecked === "indeterminate" ? "mixed" : currentChecked}
          data-state={dataState}
          data-size={size}
          data-slot="checkbox"
          disabled={disabled}
          aria-invalid={invalid || undefined}
          className={cn(
            "peer flex shrink-0 items-center justify-center rounded-[10px] border border-input/88 bg-background text-primary-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.10)] outline-none transition-[background-color,border-color,box-shadow,color,transform] hover:border-ring/30 hover:bg-background focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/45 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/25 data-[size=sm]:size-4 data-[size=md]:size-5 data-[size=lg]:size-6 data-[state=checked]:border-primary/28 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-[0_10px_24px_color-mix(in_oklch,var(--primary),transparent_82%)] data-[state=indeterminate]:border-primary/28 data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground data-[state=indeterminate]:shadow-[0_10px_24px_color-mix(in_oklch,var(--primary),transparent_82%)] dark:data-[state=unchecked]:border-white/12 dark:data-[state=unchecked]:bg-white/[0.04] dark:data-[state=unchecked]:hover:bg-white/[0.08] [&_svg]:stroke-[2.6]",
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
      </>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
