import * as React from "react"

import { cn } from "@/lib/utils"

export type DescriptionItem = {
  key: string
  label: React.ReactNode
  value: React.ReactNode
  span?: 1 | 2 | 3 | 4
}

export type DescriptionsProps = React.ComponentProps<"div"> & {
  items: DescriptionItem[]
  title?: React.ReactNode
  extra?: React.ReactNode
  bordered?: boolean
  columns?: 1 | 2 | 3 | 4
  size?: "sm" | "md" | "lg"
  labelClassName?: string
  valueClassName?: string
}

const gapClassName = {
  sm: "gap-2 text-sm",
  md: "gap-3 text-sm",
  lg: "gap-4 text-base",
}

function Descriptions({
  items,
  title,
  extra,
  bordered = true,
  columns = 3,
  size = "md",
  labelClassName,
  valueClassName,
  className,
  ...props
}: DescriptionsProps) {
  return (
    <div data-slot="descriptions" className={cn("grid gap-3", className)} {...props}>
      {(title || extra) && (
        <div className="flex items-center justify-between gap-3">
          {title && <div className="text-base font-semibold text-foreground">{title}</div>}
          {extra}
        </div>
      )}
      <div
        className={cn(
          "grid overflow-hidden",
          bordered && "rounded-lg border bg-card",
          !bordered && gapClassName[size],
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        )}
      >
        {items.map((item) => (
          <div
            key={item.key}
            data-slot="descriptions-item"
            className={cn(
              "min-w-0",
              bordered ? "border-b border-r p-3 last:border-b-0" : "grid gap-1",
              item.span === 2 && "sm:col-span-2",
              item.span === 3 && "lg:col-span-3",
              item.span === 4 && "lg:col-span-4"
            )}
          >
            <div className={cn("text-xs font-medium uppercase tracking-wide text-muted-foreground", labelClassName)}>
              {item.label}
            </div>
            <div className={cn("mt-1 min-w-0 break-words text-sm text-foreground", valueClassName)}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { Descriptions }
