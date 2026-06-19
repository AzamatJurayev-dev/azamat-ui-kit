import * as React from "react"

import { cn } from "@/lib/utils"

export type PropertyGridItem = {
  key: string
  label: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
  span?: 1 | 2 | 3 | 4
}

export type PropertyGridProps = React.ComponentProps<"div"> & {
  items: PropertyGridItem[]
  columns?: 1 | 2 | 3 | 4
  bordered?: boolean
}

function PropertyGrid({ items, columns = 3, bordered = true, className, ...props }: PropertyGridProps) {
  return (
    <div
      data-slot="property-grid"
      className={cn(
        "grid gap-3",
        columns === 1 && "grid-cols-1",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <div
          key={item.key}
          data-slot="property-grid-item"
          className={cn(
            "min-w-0 rounded-lg bg-card p-3",
            bordered && "border",
            item.span === 2 && "sm:col-span-2",
            item.span === 3 && "lg:col-span-3",
            item.span === 4 && "lg:col-span-4"
          )}
        >
          <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</div>
          <div className="mt-1 break-words text-sm font-medium text-foreground">{item.value}</div>
          {item.description && <div className="mt-1 text-xs text-muted-foreground">{item.description}</div>}
        </div>
      ))}
    </div>
  )
}

export { PropertyGrid }
