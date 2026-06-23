import * as React from "react"

import { DataView, type DataViewProps } from "@/components/patterns/data-view"
import { EntityDetails, type EntityDetailsProps } from "@/components/patterns/entity-details"
import { cn } from "@/lib/utils"

export type ResourceSystemMode = "list" | "detail" | "split"

export type ResourceSystemProps<TItem = unknown> = React.ComponentProps<"div"> & {
  mode?: ResourceSystemMode
  title?: React.ReactNode
  description?: React.ReactNode
  actions?: React.ReactNode
  list: DataViewProps<TItem>
  detail?: React.ReactNode | EntityDetailsProps
  aside?: React.ReactNode
  splitSize?: "sm" | "md" | "lg"
  renderHeader?: () => React.ReactNode
  listClassName?: string
  detailClassName?: string
}

const splitClassName = {
  sm: "lg:grid-cols-[minmax(0,1fr)_320px]",
  md: "lg:grid-cols-[minmax(0,1fr)_420px]",
  lg: "lg:grid-cols-[minmax(0,1fr)_520px]",
}

function ResourceSystem<TItem = unknown>({ mode = "list", title, description, actions, list, detail, aside, splitSize = "md", renderHeader, listClassName, detailClassName, className, ...props }: ResourceSystemProps<TItem>) {
  const detailNode = isEntityDetailsProps(detail) ? <EntityDetails {...detail} /> : detail

  return (
    <div data-slot="resource-system" data-mode={mode} className={cn("grid gap-4", className)} {...props}>
      {renderHeader?.() ?? ((title || description || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="grid gap-1">
            {title && <h1 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h1>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      ))}
      {mode === "split" ? (
        <div className={cn("grid gap-4", splitClassName[splitSize])}>
          <DataView {...list} className={cn(list.className, listClassName)} />
          <div className={cn("min-w-0", detailClassName)}>{detailNode ?? aside}</div>
        </div>
      ) : mode === "detail" ? (
        <div className={detailClassName}>{detailNode ?? aside}</div>
      ) : (
        <DataView {...list} className={cn(list.className, listClassName)} />
      )}
    </div>
  )
}

function isEntityDetailsProps(value: unknown): value is EntityDetailsProps {
  return Boolean(value && typeof value === "object" && "title" in value)
}

export { ResourceSystem }
