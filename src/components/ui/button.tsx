import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow,opacity] outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary/78 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_12%),var(--primary))] text-primary-foreground shadow-[0_1px_0_rgba(255,255,255,0.18),0_14px_34px_color-mix(in_oklch,var(--primary),transparent_72%)] hover:-translate-y-px hover:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--primary),white_18%),color-mix(in_oklch,var(--primary),white_4%))] hover:shadow-[0_1px_0_rgba(255,255,255,0.22),0_18px_38px_color-mix(in_oklch,var(--primary),transparent_66%)]",
        outline:
          "border-border/70 bg-background/82 text-foreground shadow-[0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-px hover:border-ring/34 hover:bg-accent/88 hover:text-foreground hover:shadow-[0_10px_20px_rgba(15,23,42,0.06)] aria-expanded:border-ring/34 aria-expanded:bg-accent/88 aria-expanded:text-foreground dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:hover:text-foreground",
        secondary:
          "border-border/65 bg-secondary/86 text-secondary-foreground shadow-[0_1px_0_rgba(255,255,255,0.08)] hover:-translate-y-px hover:border-border/78 hover:bg-secondary hover:text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "border-transparent bg-transparent text-foreground/86 shadow-none hover:border-border/50 hover:bg-accent/76 hover:text-foreground aria-expanded:border-border/50 aria-expanded:bg-accent/76 aria-expanded:text-foreground dark:text-foreground/84 dark:hover:bg-white/[0.07]",
        destructive:
          "border-destructive/34 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--destructive),white_8%),var(--destructive))] text-destructive-foreground shadow-[0_1px_0_rgba(255,255,255,0.16),0_14px_34px_color-mix(in_oklch,var(--destructive),transparent_74%)] hover:-translate-y-px hover:bg-[linear-gradient(180deg,color-mix(in_oklch,var(--destructive),white_6%),color-mix(in_oklch,var(--destructive),black_6%))] hover:shadow-[0_1px_0_rgba(255,255,255,0.2),0_18px_38px_color-mix(in_oklch,var(--destructive),transparent_68%)] focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-9 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xs: "h-7 gap-1 rounded-[min(var(--radius-lg),12px)] px-2.5 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-lg),14px)] px-3.5 text-[0.82rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-3.5",
        md: "h-9 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        lg: "h-10 gap-1.5 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        xl: "h-11 gap-2 px-5 text-base has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        icon: "size-9",
        "icon-xs":
          "size-7 rounded-[min(var(--radius-lg),12px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-lg),14px)] in-data-[slot=button-group]:rounded-lg",
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
