import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-[var(--radius-2xl)] border py-(--card-spacing) text-sm text-card-foreground transition-[background-color,border-color,box-shadow,transform,opacity] [--card-spacing:--spacing(5)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-[var(--radius-2xl)] *:[img:last-child]:rounded-b-[var(--radius-2xl)]",
  {
    variants: {
      variant: {
        default:
          "border-border/72 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),white_10%),var(--card))] shadow-[0_8px_24px_rgba(15,23,42,0.05)] ring-1 ring-foreground/4",
        elevated:
          "border-border/68 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),white_14%),var(--card))] shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_rgba(15,23,42,0.07)] ring-1 ring-foreground/4",
        outline: "border-border/72 bg-card shadow-none",
        soft: "border-border/40 bg-muted/34 shadow-none",
        ghost: "border-transparent bg-transparent shadow-none",
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
        info: "border-blue-500/20 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),oklch(0.94_0.03_235)_32%),var(--card))]",
        success: "border-emerald-500/20 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),oklch(0.94_0.04_155)_34%),var(--card))]",
        warning: "border-amber-500/24 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),oklch(0.94_0.05_85)_34%),var(--card))]",
        danger: "border-destructive/24 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--card),var(--destructive)_10%),var(--card))]",
      },
      interactive: {
        true: "cursor-pointer hover:-translate-y-0.5 hover:border-ring/35 hover:shadow-[0_14px_34px_rgba(15,23,42,0.10)] focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/35",
        false: "",
      },
      selected: {
        true: "border-primary/40 ring-2 ring-primary/18",
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
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-[var(--radius-2xl)] px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
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
        "flex items-center rounded-b-[var(--radius-2xl)] border-t border-border/60 bg-[linear-gradient(180deg,color-mix(in_oklch,var(--muted),transparent_38%),color-mix(in_oklch,var(--muted),transparent_16%))] p-(--card-spacing)",
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
