import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-[var(--aui-card-radius,var(--radius-xl))] border py-(--card-spacing) text-sm text-card-foreground transition-[background-color,border-color,box-shadow,transform,opacity] [--card-spacing:--spacing(5)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-[var(--aui-card-radius,var(--radius-xl))] *:[img:last-child]:rounded-b-[var(--aui-card-radius,var(--radius-xl))]",
  {
    variants: {
      variant: {
        default: "",
        elevated: "",
        outline: "",
        soft: "",
        ghost: "border-transparent bg-transparent shadow-none ring-0",
      },
      size: {
        sm: "[--card-spacing:--spacing(4)] data-[has-footer=true]:pb-0",
        default: "[--card-spacing:--spacing(5)]",
        lg: "[--card-spacing:--spacing(6)]",
      },
      density: {
        compact: "text-xs",
        default: "text-sm",
        comfortable: "text-base",
      },
      tone: {
        neutral: "",
        info: "",
        success: "",
        warning: "",
        danger: "",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-0",
        false: "",
      },
      selected: {
        true: "",
        false: "",
      },
      disabled: {
        true: "pointer-events-none opacity-55",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      density: "default",
      tone: "neutral",
      interactive: false,
      selected: false,
      disabled: false,
    },
  }
)

export type CardProps = React.ComponentProps<"div"> & VariantProps<typeof cardVariants>

function Card({
  className,
  variant,
  size,
  density,
  tone,
  interactive,
  selected,
  disabled,
  tabIndex,
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size ?? "default"}
      data-variant={variant ?? "default"}
      data-tone={tone ?? "neutral"}
      data-density={density ?? "default"}
      data-interactive={interactive || undefined}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      aria-disabled={disabled || undefined}
      tabIndex={interactive && !disabled ? tabIndex ?? 0 : tabIndex}
      className={cn(cardVariants({ variant, size, density, tone, interactive, selected, disabled }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-[var(--aui-card-radius,var(--radius-xl))] px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-heading text-[1.05rem] leading-snug font-semibold tracking-tight group-data-[size=sm]/card:text-sm group-data-[size=lg]/card:text-xl",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-6 text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-(--card-spacing)", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center rounded-b-[var(--aui-card-radius,var(--radius-xl))] border-t border-border/60 bg-muted/22 p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
