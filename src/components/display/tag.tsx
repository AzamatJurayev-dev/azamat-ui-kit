import * as React from "react"

import { cn } from "@/lib/utils"

export type TagTone = "neutral" | "info" | "success" | "warning" | "danger"
export type TagSize = "sm" | "default" | "lg"

export type TagProps = React.ComponentProps<"span"> & {
  tone?: TagTone
  size?: TagSize
  removable?: boolean
  selected?: boolean
  onRemove?: () => void
}

export type TagGroupProps = React.ComponentProps<"div"> & {
  gap?: "sm" | "default" | "lg"
}

const toneClassName: Record<TagTone, string> = {
  neutral: "border-border bg-muted text-foreground",
  info: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900 dark:bg-sky-950 dark:text-sky-300",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  danger: "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
}

const sizeClassName: Record<TagSize, string> = {
  sm: "h-6 px-2 text-xs",
  default: "h-7 px-2.5 text-sm",
  lg: "h-8 px-3 text-sm",
}

function Tag({ tone = "neutral", size = "default", removable, selected, onRemove, className, children, ...props }: TagProps) {
  return (
    <span
      data-slot="tag"
      data-tone={tone}
      data-selected={selected ? "true" : undefined}
      className={cn("inline-flex items-center gap-1 rounded-full border font-medium transition-colors", toneClassName[tone], sizeClassName[size], selected && "ring-2 ring-ring ring-offset-1", className)}
      {...props}
    >
      <span>{children}</span>
      {removable && (
        <button type="button" aria-label="Remove tag" className="-mr-1 inline-flex size-4 items-center justify-center rounded-full hover:bg-black/10 dark:hover:bg-white/10" onClick={onRemove}>
          ×
        </button>
      )}
    </span>
  )
}

function Chip(props: TagProps) {
  return <Tag {...props} />
}

function TagGroup({ gap = "default", className, ...props }: TagGroupProps) {
  return <div data-slot="tag-group" className={cn("flex flex-wrap items-center", gap === "sm" && "gap-1", gap === "default" && "gap-2", gap === "lg" && "gap-3", className)} {...props} />
}

export { Chip, Tag, TagGroup }
