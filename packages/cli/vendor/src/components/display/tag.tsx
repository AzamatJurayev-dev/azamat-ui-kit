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
  neutral:
    "border-[color:color-mix(in_oklch,var(--border),var(--foreground)_8%)] bg-[color:color-mix(in_oklch,var(--muted),var(--background)_18%)] text-foreground",
  info:
    "border-[color:color-mix(in_oklch,var(--aui-info,var(--primary)),transparent_62%)] bg-[color:color-mix(in_oklch,var(--aui-info,var(--primary)),transparent_84%)] text-[color:color-mix(in_oklch,var(--aui-info,var(--primary)),black_18%)] dark:text-[color:color-mix(in_oklch,var(--aui-info,var(--primary)),white_46%)]",
  success:
    "border-[color:color-mix(in_oklch,var(--aui-success,var(--primary)),transparent_58%)] bg-[color:color-mix(in_oklch,var(--aui-success,var(--primary)),transparent_82%)] text-[color:color-mix(in_oklch,var(--aui-success,var(--primary)),black_16%)] dark:text-[color:color-mix(in_oklch,var(--aui-success,var(--primary)),white_42%)]",
  warning:
    "border-[color:color-mix(in_oklch,var(--aui-warning,var(--primary)),transparent_52%)] bg-[color:color-mix(in_oklch,var(--aui-warning,var(--primary)),transparent_76%)] text-[color:color-mix(in_oklch,var(--aui-warning-foreground,var(--foreground)),black_6%)] dark:text-[color:color-mix(in_oklch,var(--aui-warning,var(--primary)),white_32%)]",
  danger:
    "border-[color:color-mix(in_oklch,var(--destructive),transparent_58%)] bg-[color:color-mix(in_oklch,var(--destructive),transparent_82%)] text-[color:color-mix(in_oklch,var(--destructive),black_16%)] dark:text-[color:color-mix(in_oklch,var(--destructive),white_40%)]",
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
      data-size={size}
      data-removable={removable || undefined}
      data-selected={selected ? "true" : undefined}
      tabIndex={removable ? 0 : props.tabIndex}
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border font-medium shadow-[inset_0_1px_0_color-mix(in_oklch,white,transparent_40%)] transition-[background-color,border-color,color,box-shadow] outline-none focus-visible:ring-3 focus-visible:ring-ring/35",
        toneClassName[tone],
        sizeClassName[size],
        selected && "border-[color:var(--aui-control-border-strong,var(--ring))] ring-2 ring-ring/45 ring-offset-1",
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
      <span className="min-w-0 truncate">{children}</span>
      {removable && (
        <button
          type="button"
          aria-label={removeLabel}
          className="-mr-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklch,currentColor,transparent_90%)] opacity-80 transition hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/35"
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
