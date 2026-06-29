import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--aui-control-radius,var(--radius-lg))] border border-[color:var(--aui-control-border-strong,var(--border))] bg-[color:var(--aui-control-surface,var(--background))] bg-clip-padding text-sm font-semibold text-foreground whitespace-nowrap shadow-[var(--aui-control-shadow,none)] transition-[transform,background-color,border-color,color,box-shadow,opacity] outline-none select-none hover:border-[color:var(--aui-control-hover-border,var(--ring))] hover:bg-[color:var(--aui-control-surface-hover,var(--muted))] focus-visible:ring-0 focus-visible:shadow-[var(--aui-control-shadow,none),0_0_0_1px_var(--aui-focus-ring,var(--ring)),0_0_0_5px_var(--aui-focus-ring-soft,transparent)] active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:border-[color:color-mix(in_oklch,var(--border),transparent_24%)] disabled:bg-[color:var(--aui-control-surface-disabled,var(--muted))] disabled:text-muted-foreground disabled:shadow-none disabled:opacity-100 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:translate-y-0 aria-disabled:opacity-100 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "border-primary bg-primary text-primary-foreground shadow-[var(--aui-button-primary-shadow,var(--aui-control-shadow,none))] hover:bg-[color:color-mix(in_oklch,var(--primary),white_10%)]",
        outline: "bg-[color:var(--aui-control-surface,var(--background))] text-foreground shadow-none",
        secondary: "border-border bg-secondary text-secondary-foreground",
        ghost: "border-transparent bg-transparent shadow-none hover:border-[color:var(--aui-control-border-strong,var(--border))]",
        destructive: "border-destructive bg-destructive text-[color:var(--aui-danger-foreground,var(--primary-foreground))] shadow-[var(--aui-button-danger-shadow,var(--aui-control-shadow,none))] hover:bg-[color:color-mix(in_oklch,var(--destructive),white_10%)]",
        warning: "border-[color:color-mix(in_oklch,var(--aui-warning,var(--primary)),transparent_64%)] bg-[color:color-mix(in_oklch,var(--aui-warning,var(--primary)),transparent_82%)] text-[color:var(--aui-warning-foreground,var(--foreground))]",
        link: "rounded-none border-transparent bg-transparent p-0 shadow-none underline-offset-4",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-md px-2.5 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-md px-3.5 text-[0.82rem] in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-9 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xl: "h-11 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-9",
        "icon-xs":
          "size-7 rounded-md in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-md in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
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
  children,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant ?? "default"}
      data-size={size ?? "default"}
      data-loading={loading || undefined}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {loading ? (
        <span
          data-slot="button-spinner"
          aria-hidden="true"
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80"
        />
      ) : leftIcon ? (
        <span data-icon="inline-start" data-slot="button-icon" className="inline-flex shrink-0 items-center justify-center">
          {leftIcon}
        </span>
      ) : null}
      {children ? <span data-slot="button-label">{loading ? loadingLabel : children}</span> : null}
      {!loading && rightIcon ? (
        <span data-icon="inline-end" data-slot="button-icon" className="inline-flex shrink-0 items-center justify-center">
          {rightIcon}
        </span>
      ) : null}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
