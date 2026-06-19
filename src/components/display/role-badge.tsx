import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type RoleBadgeTone = "owner" | "admin" | "manager" | "member" | "guest"

export type RoleBadgeProps = React.ComponentProps<typeof Badge> & {
  role: React.ReactNode
  tone?: RoleBadgeTone
}

const toneClassName: Record<RoleBadgeTone, string> = {
  owner: "border-primary/20 bg-primary/10 text-primary",
  admin: "border-destructive/20 bg-destructive/10 text-destructive",
  manager: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  member: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  guest: "border-border bg-muted text-muted-foreground",
}

function RoleBadge({ role, tone = "member", className, variant = "outline", ...props }: RoleBadgeProps) {
  return (
    <Badge data-slot="role-badge" variant={variant} className={cn(toneClassName[tone], className)} {...props}>
      {role}
    </Badge>
  )
}

export { RoleBadge }
