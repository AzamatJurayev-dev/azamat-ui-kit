import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap outline-none select-none disabled:pointer-events-none disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
        secondary: "",
        ghost: "",
        destructive: "",
        warning: "",
        link: "",
      },
      size: {
        default: "",
        xs: "",
        sm: "",
        md: "",
        lg: "",
        xl: "",
        icon: "",
        "icon-xs": "",
        "icon-sm": "",
        "icon-lg": "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean
    loadingLabel?: string
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    iconOnly?: boolean
    fullWidth?: boolean
    pressed?: boolean
    labelClassName?: string
  }

function Button({
  className,
  variant = "default",
  size = "default",
  disabled,
  loading = false,
  loadingLabel = "Loading",
  leftIcon,
  rightIcon,
  iconOnly = false,
  fullWidth = false,
  pressed = false,
  labelClassName,
  children,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading
  const resolvedSize = iconOnly && (size === "default" || size === "md") ? "icon" : size

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant ?? "default"}
      data-size={resolvedSize ?? "default"}
      data-icon-only={iconOnly || undefined}
      data-loading={loading || undefined}
      data-pressed={pressed || undefined}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      aria-pressed={pressed || undefined}
      aria-label={ariaLabel}
      className={cn(
        buttonVariants({ variant, size: resolvedSize, className }),
        fullWidth && "w-full",
        pressed && ""
      )}
      {...props}
    >
      {loading ? (
        <span
          data-slot="button-spinner"
          aria-hidden="true"
        />
      ) : leftIcon ? (
        <span data-icon="inline-start" data-slot="button-icon" className="inline-flex shrink-0 items-center justify-center">
          {leftIcon}
        </span>
      ) : null}
      {children ? <span data-slot="button-label" className={cn("inline-flex min-w-0 items-center gap-[inherit]", labelClassName)}>{loading ? loadingLabel : children}</span> : null}
      {!loading && rightIcon ? (
        <span data-icon="inline-end" data-slot="button-icon" className="inline-flex shrink-0 items-center justify-center">
          {rightIcon}
        </span>
      ) : null}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
