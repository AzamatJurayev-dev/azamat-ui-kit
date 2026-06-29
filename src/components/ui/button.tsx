import * as React from "react"
import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-[transform,background-color,border-color,color,box-shadow,opacity] outline-none select-none focus-visible:border-ring/60 focus-visible:ring-2 focus-visible:ring-ring/35 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none disabled:opacity-100 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:translate-y-0 aria-disabled:shadow-none aria-disabled:opacity-100 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/35 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "border-primary/20 bg-primary text-primary-foreground shadow-sm hover:-translate-y-px hover:bg-[color-mix(in_oklch,var(--primary),white_7%)] hover:shadow-md disabled:border-primary/10 disabled:bg-primary/45 disabled:text-primary-foreground/70 dark:disabled:bg-primary/34",
        outline:
          "border-border/80 bg-background text-foreground shadow-none hover:-translate-y-px hover:border-ring/38 hover:bg-accent/72 hover:text-foreground hover:shadow-sm aria-expanded:border-ring/38 aria-expanded:bg-accent/72 aria-expanded:text-foreground disabled:border-border/48 disabled:bg-muted/24 disabled:text-muted-foreground/70 dark:border-white/14 dark:bg-white/[0.045] dark:hover:bg-white/[0.08] dark:hover:text-foreground dark:disabled:bg-white/[0.035]",
        secondary:
          "border-border/70 bg-secondary text-secondary-foreground shadow-sm hover:-translate-y-px hover:border-border/86 hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] hover:text-secondary-foreground aria-expanded:bg-secondary aria-expanded:text-secondary-foreground disabled:border-border/44 disabled:bg-muted/28 disabled:text-muted-foreground/72 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] dark:disabled:bg-white/[0.035]",
        ghost:
          "border-transparent bg-transparent text-foreground/88 shadow-none hover:border-border/48 hover:bg-accent/68 hover:text-foreground aria-expanded:border-border/48 aria-expanded:bg-accent/68 aria-expanded:text-foreground disabled:text-muted-foreground/64 dark:text-foreground/86 dark:hover:bg-white/[0.075] dark:disabled:text-muted-foreground/58",
        destructive:
          "border-destructive/20 bg-destructive text-destructive-foreground shadow-sm hover:-translate-y-px hover:bg-[color-mix(in_oklch,var(--destructive),white_7%)] hover:shadow-md focus-visible:border-destructive/45 focus-visible:ring-destructive/24 disabled:border-destructive/10 disabled:bg-destructive/42 disabled:text-destructive-foreground/70 dark:focus-visible:ring-destructive/35 dark:disabled:bg-destructive/34",
        link: "text-primary underline-offset-4 hover:underline",
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
