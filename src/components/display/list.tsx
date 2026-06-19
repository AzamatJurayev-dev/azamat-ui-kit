import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type ListItem = {
  key: string
  title: React.ReactNode
  description?: React.ReactNode
  avatar?: React.ReactNode
  extra?: React.ReactNode
  href?: string
  disabled?: boolean
  onClick?: () => void
}

export type ListProps = React.ComponentProps<"div"> & {
  items?: ListItem[]
  bordered?: boolean
  split?: boolean
  size?: "sm" | "md" | "lg"
  renderItem?: (item: ListItem, index: number) => React.ReactNode
}

const itemPadding = {
  sm: "px-3 py-2",
  md: "px-4 py-3",
  lg: "px-5 py-4",
}

function List({ items, bordered = true, split = true, size = "md", renderItem, className, children, ...props }: ListProps) {
  return (
    <div
      data-slot="list"
      className={cn("overflow-hidden bg-card", bordered && "rounded-lg border", className)}
      {...props}
    >
      {items?.map((item, index) => renderItem?.(item, index) ?? <ListRow key={item.key} item={item} split={split} size={size} />)}
      {children}
    </div>
  )
}

export type ListRowProps = React.ComponentProps<"div"> & {
  item: ListItem
  split?: boolean
  size?: "sm" | "md" | "lg"
}

function ListRow({ item, split = true, size = "md", className, ...props }: ListRowProps) {
  const clickable = Boolean(item.href || item.onClick)
  const content = (
    <>
      {item.avatar && <div className="shrink-0">{item.avatar}</div>}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{item.title}</div>
        {item.description && <div className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{item.description}</div>}
      </div>
      {item.extra && <div className="shrink-0 text-sm text-muted-foreground">{item.extra}</div>}
      {clickable && <ChevronRightIcon className="size-4 shrink-0 text-muted-foreground" />}
    </>
  )

  const rowClassName = cn(
    "flex items-center gap-3 bg-card transition-colors",
    itemPadding[size],
    split && "border-b last:border-b-0",
    clickable && !item.disabled && "cursor-pointer hover:bg-muted/50",
    item.disabled && "pointer-events-none opacity-55",
    className
  )

  if (item.href) {
    return <a data-slot="list-row" href={item.href} className={rowClassName} {...props}>{content}</a>
  }

  return (
    <div data-slot="list-row" role={clickable ? "button" : undefined} tabIndex={clickable && !item.disabled ? 0 : undefined} className={rowClassName} onClick={item.onClick} {...props}>
      {content}
    </div>
  )
}

export { List, ListRow }
