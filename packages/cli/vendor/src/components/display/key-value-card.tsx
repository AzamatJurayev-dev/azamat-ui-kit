import * as React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, type CardProps } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type KeyValueCardItem = {
  key: string
  label: React.ReactNode
  value: React.ReactNode
  description?: React.ReactNode
}

export type KeyValueCardProps = Omit<CardProps, "children"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  items: KeyValueCardItem[]
  columns?: 1 | 2
}

function KeyValueCard({ title, description, items, columns = 1, className, ...props }: KeyValueCardProps) {
  return (
    <Card data-slot="key-value-card" className={className} {...props}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>
        <dl
          className={cn(
            "grid gap-3",
            columns === 1 && "grid-cols-1",
            columns === 2 && "grid-cols-1 sm:grid-cols-2"
          )}
        >
          {items.map((item) => (
            <div key={item.key} data-slot="key-value-card-item" className="min-w-0 rounded-lg border bg-muted/25 p-3">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</dt>
              <dd className="mt-1 break-words text-sm font-semibold text-foreground">{item.value}</dd>
              {item.description && <dd className="mt-1 text-xs leading-5 text-muted-foreground">{item.description}</dd>}
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}

export { KeyValueCard }
