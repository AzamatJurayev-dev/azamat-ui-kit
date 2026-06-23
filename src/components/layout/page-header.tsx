import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const pageHeaderVariants = cva("flex flex-col border transition-[background-color,border-color,box-shadow]", {
  variants: {
    variant: {
      default: "border-border/75 bg-card/96 shadow-sm ring-1 ring-foreground/5",
      elevated: "border-border/70 bg-card shadow-[0_1px_2px_rgba(15,23,42,0.06),0_18px_45px_rgba(15,23,42,0.08)] ring-1 ring-foreground/5",
      outline: "border-border bg-transparent shadow-none",
      ghost: "border-transparent bg-transparent shadow-none",
      soft: "border-transparent bg-muted/45 shadow-none",
    },
    size: {
      sm: "gap-3 rounded-[var(--radius-2xl)] p-4",
      default: "gap-4 rounded-[var(--radius-3xl)] p-5",
      lg: "gap-5 rounded-[calc(var(--radius-3xl)*1.1)] p-6",
    },
    tone: {
      neutral: "",
      info: "border-blue-500/20 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),oklch(0.94_0.03_235)_28%),var(--card))]",
      success: "border-emerald-500/20 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),oklch(0.94_0.04_155)_30%),var(--card))]",
      warning: "border-amber-500/24 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),oklch(0.94_0.05_85)_30%),var(--card))]",
      danger: "border-destructive/24 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),var(--destructive)_8%),var(--card))]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    tone: "neutral",
  },
})

export type PageHeaderProps = React.ComponentProps<"div"> &
  VariantProps<typeof pageHeaderVariants> & {
    title?: React.ReactNode
    description?: React.ReactNode
    eyebrow?: React.ReactNode
    breadcrumbs?: React.ReactNode
    actions?: React.ReactNode
    meta?: React.ReactNode
    leading?: React.ReactNode
    footer?: React.ReactNode
    sticky?: boolean
    titleClassName?: string
    descriptionClassName?: string
    actionsClassName?: string
  }

function PageHeader({
  className,
  variant,
  size,
  tone,
  title,
  description,
  eyebrow,
  breadcrumbs,
  actions,
  meta,
  leading,
  footer,
  sticky = false,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      data-sticky={sticky || undefined}
      className={cn(
        pageHeaderVariants({ variant, size, tone }),
        sticky && "sticky top-0 z-30 bg-background/92 backdrop-blur supports-[backdrop-filter]:bg-background/78",
        className
      )}
      {...props}
    >
      {breadcrumbs && <div className="text-sm text-muted-foreground/95">{breadcrumbs}</div>}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-4">
          {leading ? <div className="shrink-0">{leading}</div> : null}
          <div className="min-w-0 space-y-2">
            {eyebrow && <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</div>}
            {title && <h1 className={cn("truncate text-3xl font-semibold tracking-[-0.03em] text-foreground", size === "sm" && "text-2xl", size === "lg" && "text-4xl", titleClassName)}>{title}</h1>}
            {description && <p className={cn("max-w-3xl text-sm leading-7 text-muted-foreground", descriptionClassName)}>{description}</p>}
            {meta && <div className="pt-1 text-sm text-muted-foreground">{meta}</div>}
          </div>
        </div>

        {actions && <div className={cn("flex shrink-0 flex-wrap items-center gap-2.5", actionsClassName)}>{actions}</div>}
      </div>

      {children}
      {footer && <div data-slot="page-header-footer" className="border-t border-border/70 pt-4">{footer}</div>}
    </div>
  )
}

export { PageHeader, pageHeaderVariants }
