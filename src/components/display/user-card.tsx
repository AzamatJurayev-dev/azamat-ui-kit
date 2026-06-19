import * as React from "react"

import { Avatar, type AvatarProps } from "@/components/display/avatar"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type UserCardProps = React.ComponentProps<typeof Card> & {
  name: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
  avatar?: AvatarProps
  actions?: React.ReactNode
  selected?: boolean
}

function UserCard({ name, description, meta, avatar, actions, selected = false, className, ...props }: UserCardProps) {
  return (
    <Card
      data-slot="user-card"
      data-selected={selected || undefined}
      className={cn("flex items-start gap-3 p-4 data-[selected=true]:border-primary", className)}
      {...props}
    >
      <Avatar {...avatar} name={avatar?.name ?? (typeof name === "string" ? name : undefined)} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{name}</div>
        {description && <div className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{description}</div>}
        {meta && <div className="mt-2 text-xs text-muted-foreground">{meta}</div>}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </Card>
  )
}

export { UserCard }
