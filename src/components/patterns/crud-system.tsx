import * as React from "react"

import { ActionSystem, type ActionSystemAction } from "@/components/patterns/action-system"
import { ResourceSystem, type ResourceSystemProps } from "@/components/patterns/resource-system"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type CrudSystemLabels = {
  create?: React.ReactNode
  edit?: React.ReactNode
  delete?: React.ReactNode
  view?: React.ReactNode
}

export type CrudSystemProps<TItem = unknown> = Omit<ResourceSystemProps<TItem>, "actions"> & {
  labels?: CrudSystemLabels
  canCreate?: boolean
  createAction?: React.ReactNode
  extraActions?: React.ReactNode
  itemActions?: ActionSystemAction<TItem>[]
  onCreate?: () => void
  onView?: (item: TItem) => void
  onEdit?: (item: TItem) => void
  onDelete?: (item: TItem) => void
  renderActions?: (args: { createAction?: React.ReactNode; extraActions?: React.ReactNode }) => React.ReactNode
  actionsClassName?: string
}

function CrudSystem<TItem = unknown>({ labels, canCreate = true, createAction, extraActions, itemActions, onCreate, onView, onEdit, onDelete, renderActions, actionsClassName, list, ...props }: CrudSystemProps<TItem>) {
  const resolvedItemActions = itemActions ?? [
    onView && { key: "view", label: labels?.view ?? "View", onClick: onView },
    onEdit && { key: "edit", label: labels?.edit ?? "Edit", onClick: onEdit },
    onDelete && { key: "delete", label: labels?.delete ?? "Delete", variant: "destructive" as const, confirm: "Are you sure?", onClick: onDelete },
  ].filter(Boolean) as ActionSystemAction<TItem>[]

  const actions = renderActions?.({ createAction, extraActions }) ?? (
    <div className={cn("flex items-center gap-2", actionsClassName)}>
      {extraActions}
      {canCreate && (createAction ?? <Button type="button" onClick={onCreate}>{labels?.create ?? "Create"}</Button>)}
    </div>
  )

  const renderItem = list.renderItem ?? (resolvedItemActions.length ? (item: TItem, index: number) => (
    <div className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
      <pre className="min-w-0 flex-1 overflow-hidden text-xs">{JSON.stringify(item, null, 2)}</pre>
      <ActionSystem item={item} actions={resolvedItemActions} />
    </div>
  ) : undefined)

  return <ResourceSystem {...props} actions={actions} list={{ ...list, renderItem }} />
}

export { CrudSystem }
