import * as React from "react"

import { Badge, type BadgeProps } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type TagTone = "neutral" | "info" | "success" | "warning" | "danger"
export type TagSize = "sm" | "default" | "lg"
export type TagProps = Omit<BadgeProps, "status" | "dot" | "label" | "count" | "tone"> & {
  tone?: TagTone
}
export type TagGroupProps = React.ComponentProps<"div"> & { gap?: "sm" | "default" | "lg" }

/** @deprecated Use Badge with className="rounded-full". */
function Tag({ tone = "neutral", className, children, ...props }: TagProps) {
  return (
    <Badge
      data-slot="tag"
      tone={tone}
      variant="soft"
      className={cn("max-w-full rounded-full", className)}
      {...props}
    >
      {children}
    </Badge>
  )
}

/** @deprecated Use Badge. */
function Chip(props: TagProps) {
  return <Tag {...props} />
}

function TagGroup({ gap = "default", className, ...props }: TagGroupProps) {
  return <div data-slot="tag-group" className={cn("flex flex-wrap items-center", gap === "sm" && "gap-1", gap === "default" && "gap-2", gap === "lg" && "gap-3", className)} {...props} />
}

export { Chip, Tag, TagGroup }
