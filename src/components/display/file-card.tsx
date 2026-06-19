import * as React from "react"
import { FileIcon, MoreHorizontalIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type FileCardProps = React.ComponentProps<"div"> & {
  name: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
  icon?: React.ReactNode
  preview?: React.ReactNode
  actions?: React.ReactNode
  selected?: boolean
  disabled?: boolean
  onOpen?: () => void
}

function FileCard({ name, description, meta, icon, preview, actions, selected = false, disabled = false, onOpen, className, ...props }: FileCardProps) {
  return (
    <div
      data-slot="file-card"
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      className={cn(
        "group grid gap-3 rounded-lg border bg-card p-3 transition-colors hover:bg-muted/35 data-[selected=true]:border-primary data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-55",
        onOpen && "cursor-pointer",
        className
      )}
      onClick={onOpen}
      {...props}
    >
      {preview && <div className="overflow-hidden rounded-md bg-muted">{preview}</div>}
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
          {icon ?? <FileIcon className="size-4" />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium text-foreground">{name}</div>
          {description && <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{description}</div>}
          {meta && <div className="mt-2 text-xs text-muted-foreground">{meta}</div>}
        </div>
        {actions ?? (
          <Button type="button" variant="ghost" size="icon-xs" onClick={(event) => event.stopPropagation()}>
            <MoreHorizontalIcon />
            <span className="sr-only">File actions</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export { FileCard }
