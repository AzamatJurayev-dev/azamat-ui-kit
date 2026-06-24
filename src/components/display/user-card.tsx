import * as React from "react"

import { Avatar } from "@/components/display/avatar"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type UserCardProps = React.ComponentProps<typeof Card> & {
  name: React.ReactNode
  description?: React.ReactNode
  src?: string
  alt?: string
  meta?: React.ReactNode
  actions?: React.ReactNode
}

function UserCard({ name, description, src, alt, meta, actions, className, ...props }: UserCardProps) {
  return (
    <Card className={cn("flex items-center gap-4 p-4", className)} {...props}>
      <Avatar src={src} alt={alt} name={typeof name === "string" ? name : undefined} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{name}</p>
        {description ? <p className="truncate text-sm text-muted-foreground">{description}</p> : null}
        {meta ? <div className="mt-2 text-xs text-muted-foreground">{meta}</div> : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </Card>
  )
}

export { UserCard }
