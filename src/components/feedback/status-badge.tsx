import * as React from "react"

import { Badge, type badgeVariants } from "@/components/ui/badge"
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
  default: "",
  success: "bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300",
  warning: "bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-300",
  danger: "bg-destructive/10 text-destructive ring-1 ring-destructive/20",
  info: "bg-blue-500/10 text-blue-700 ring-1 ring-blue-500/20 dark:text-blue-300",
  muted: "bg-muted text-muted-foreground",
  outline: "border-border text-foreground",
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
      className={cn(toneClassName[tone], className)}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </Badge>
  )
}

export { StatusBadge }
