import * as React from "react"
import { XIcon } from "lucide-react"

import { cn, stopInteractivePropagation } from "@/lib/utils"

export type TagTone = "neutral" | "info" | "success" | "warning" | "danger"
export type TagSize = "sm" | "default" | "lg"

export type TagProps = React.ComponentProps<"span"> & {
  tone?: TagTone
  size?: TagSize
  removable?: boolean
  selected?: boolean
  onRemove?: () => void
  removeLabel?: string
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

function Tag({ tone = "neutral", size = "default", removable, selected, onRemove, removeLabel = "Remove tag", className, children, onKeyDown, ...props }: TagProps) {
  const handleRemove = (event: React.SyntheticEvent) => {
    stopInteractivePropagation(event)
    onRemove?.()
  }

  return (
    <span
      data-slot="tag"
      data-tone={tone}
      data-selected={selected ? "true" : undefined}
      tabIndex={removable ? 0 : props.tabIndex}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/35",
        toneClassName[tone],
        sizeClassName[size],
        selected && "ring-2 ring-ring ring-offset-1",
        className
      )}
      onKeyDown={(event) => {
        if (removable && (event.key === "Backspace" || event.key === "Delete")) {
          event.preventDefault()
          onRemove?.()
        }
        onKeyDown?.(event)
      }}
      {...props}
    >
      <span>{children}</span>
      {removable && (
        <button
          type="button"
          aria-label={removeLabel}
          className="-mr-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full opacity-80 transition hover:bg-black/10 hover:opacity-100 focus-visible:ring-2 focus-visible:ring-current/35 dark:hover:bg-white/10"
          onClick={handleRemove}
          onMouseDown={stopInteractivePropagation}
          onDoubleClick={stopInteractivePropagation}
        >
          <XIcon className="size-3" />
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
