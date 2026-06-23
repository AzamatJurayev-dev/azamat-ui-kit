import * as React from "react"

import { Badge, badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type BadgeVariant = NonNullable<Parameters<typeof badgeVariants>[0]>["variant"]

export type StatusBadgeTone =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted"
  | "outline"

export type StatusBadgeProps = React.ComponentProps<typeof Badge> & {
  tone?: StatusBadgeTone
  dot?: boolean
}

const toneClassName: Record<StatusBadgeTone, string> = {
  default: "border-primary/10 bg-primary/8 text-primary shadow-sm",
  success: "border-emerald-500/20 bg-emerald-500/12 text-emerald-700 shadow-sm dark:text-emerald-300",
  warning: "border-amber-500/22 bg-amber-500/12 text-amber-700 shadow-sm dark:text-amber-300",
  danger: "border-destructive/18 bg-destructive/12 text-destructive shadow-sm",
  info: "border-blue-500/20 bg-blue-500/12 text-blue-700 shadow-sm dark:text-blue-300",
  muted: "border-border/70 bg-muted/80 text-muted-foreground",
  outline: "border-border/80 bg-background/90 text-foreground shadow-sm",
}

const toneVariant: Record<StatusBadgeTone, BadgeVariant> = {
  default: "default",
  success: "secondary",
  warning: "secondary",
  danger: "destructive",
  info: "secondary",
  muted: "secondary",
  outline: "outline",
}

function StatusBadge({
  className,
  tone = "default",
  dot = false,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <Badge
      data-slot="status-badge"
      variant={toneVariant[tone]}
      className={cn("rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-[0.01em]", toneClassName[tone], className)}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current shadow-[0_0_0_3px_color-mix(in_oklch,currentColor,transparent_82%)]" />}
      {children}
    </Badge>
  )
}

export { StatusBadge }
