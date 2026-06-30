import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type DataListItem = {
  key: string
  label: React.ReactNode
  value?: React.ReactNode
  description?: React.ReactNode
  meta?: React.ReactNode
  icon?: React.ReactNode
  href?: string
  disabled?: boolean
  onClick?: () => void
}

export type DataListProps = React.ComponentProps<"div"> & {
  items: DataListItem[]
  density?: "compact" | "default" | "comfortable"
  showDividers?: boolean
}

const densityClassNames = {
  compact: "px-3 py-2",
  default: "px-4 py-3",
  comfortable: "px-5 py-4",
}

function DataList({ items, density = "default", showDividers = true, className, ...props }: DataListProps) {
  return (
    <div
      data-slot="data-list"
      className={cn("overflow-hidden rounded-[var(--aui-card-radius,var(--radius-xl))] border bg-card text-card-foreground", className)}
      {...props}
    >
      {items.map((item) => (
        <DataListRow key={item.key} item={item} density={density} showDivider={showDividers} />
      ))}
    </div>
  )
}

export type DataListRowProps = React.ComponentProps<"div"> & {
  item: DataListItem
  density?: DataListProps["density"]
  showDivider?: boolean
}

function DataListRow({ item, density = "default", showDivider = true, className, ...props }: DataListRowProps) {
  const interactive = Boolean(item.href || item.onClick)
  const rowClassName = cn(
    "group flex min-w-0 items-center gap-3 bg-card text-sm transition-colors",
    densityClassNames[density],
    showDivider && "border-b last:border-b-0",
    interactive && !item.disabled && "cursor-pointer hover:bg-muted/55",
    item.disabled && "pointer-events-none opacity-55",
    className
  )
  const content = (
    <>
      {item.icon && <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">{item.icon}</div>}
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-2">
          <div className="truncate font-medium text-foreground">{item.label}</div>
          {item.meta && <div className="shrink-0 text-xs text-muted-foreground">{item.meta}</div>}
        </div>
        {item.description && <div className="mt-0.5 line-clamp-2 text-xs leading-5 text-muted-foreground">{item.description}</div>}
      </div>
      {item.value && <div className="shrink-0 text-right font-medium text-foreground">{item.value}</div>}
      {interactive && <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />}
    </>
  )

  if (item.href) {
    return (
      <a data-slot="data-list-row" href={item.href} className={rowClassName} {...(props as React.ComponentProps<"a">)}>
        {content}
      </a>
    )
  }

  return (
    <div
      data-slot="data-list-row"
      role={interactive ? "button" : undefined}
      tabIndex={interactive && !item.disabled ? 0 : undefined}
      className={rowClassName}
      onClick={item.onClick}
      {...props}
    >
      {content}
    </div>
  )
}

export { DataList, DataListRow }
