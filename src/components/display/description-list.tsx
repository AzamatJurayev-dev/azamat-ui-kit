import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type DescriptionListColumn = 1 | 2 | 3 | 4

export type DescriptionListItem = {
  key: string
  label: React.ReactNode
  value?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  span?: DescriptionListColumn
  hidden?: boolean
  className?: string
  labelClassName?: string
  valueClassName?: string
}

export type DescriptionListProps = React.ComponentProps<typeof Card> & {
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  items: DescriptionListItem[]
  columns?: DescriptionListColumn
  bordered?: boolean
  compact?: boolean
  emptyValue?: React.ReactNode
  itemClassName?: string
  labelClassName?: string
  valueClassName?: string
  contentClassName?: string
}

const columnsClassName: Record<DescriptionListColumn, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 xl:grid-cols-4",
}

const spanClassName: Record<DescriptionListColumn, string> = {
  1: "col-span-1",
  2: "md:col-span-2",
  3: "xl:col-span-3",
  4: "xl:col-span-4",
}

function isEmptyValue(value: React.ReactNode) {
  return value === null || value === undefined || value === ""
}

function DescriptionList({
  title,
  description,
  actions,
  items,
  columns = 2,
  bordered = true,
  compact = false,
  emptyValue = "-",
  itemClassName,
  labelClassName,
  valueClassName,
  contentClassName,
  className,
  ...props
}: DescriptionListProps) {
  const visibleItems = items.filter((item) => !item.hidden)
  const hasHeader = Boolean(title || description || actions)

  return (
    <Card data-slot="description-list" className={cn("min-w-0", className)} {...props}>
      {hasHeader && (
        <CardHeader>
          <div className="flex min-w-0 items-start justify-between gap-3">
            <div className="min-w-0 space-y-1">
              {title && <CardTitle>{title}</CardTitle>}
              {description && <CardDescription>{description}</CardDescription>}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className={cn("grid gap-2", columnsClassName[columns], contentClassName)}>
        {visibleItems.map((item) => (
          <div
            key={item.key}
            data-slot="description-list-item"
            className={cn(
              "min-w-0 rounded-lg",
              bordered && "border bg-muted/20",
              compact ? "p-2" : "p-3",
              item.span && item.span > 1 && spanClassName[item.span],
              itemClassName,
              item.className
            )}
          >
            <div className="flex min-w-0 items-start gap-2">
              {item.icon && <span className="mt-0.5 shrink-0 text-muted-foreground [&_svg]:size-4">{item.icon}</span>}
              <div className="min-w-0 flex-1 space-y-1">
                <div className={cn("text-xs font-medium uppercase tracking-wide text-muted-foreground", labelClassName, item.labelClassName)}>
                  {item.label}
                </div>
                <div className={cn("min-w-0 break-words text-sm font-medium text-foreground", valueClassName, item.valueClassName)}>
                  {isEmptyValue(item.value) ? emptyValue : item.value}
                </div>
                {item.description && <div className="text-xs leading-5 text-muted-foreground">{item.description}</div>}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export { DescriptionList }
