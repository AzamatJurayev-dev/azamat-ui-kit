import * as React from "react"
import type { Row } from "@tanstack/react-table"

import {
  ActionMenu,
  type ActionMenuItem,
  type ActionMenuProps,
} from "@/components/actions/action-menu"

export type DataTableRowAction<TData> = Omit<ActionMenuItem, "onSelect"> & {
  onSelect?: (row: Row<TData>, original: TData) => void | Promise<void>
}

export type DataTableRowActionsProps<TData> = Omit<ActionMenuProps, "actions"> & {
  row: Row<TData>
  actions?: DataTableRowAction<TData>[]
  getActions?: (row: Row<TData>, original: TData) => DataTableRowAction<TData>[]
}

function resolveRowActions<TData>(
  row: Row<TData>,
  actions?: DataTableRowAction<TData>[],
  getActions?: (row: Row<TData>, original: TData) => DataTableRowAction<TData>[]
): ActionMenuItem[] {
  const resolvedActions = getActions?.(row, row.original) ?? actions ?? []

  return resolvedActions.map((action) => ({
    ...action,
    onSelect: action.onSelect
      ? () => action.onSelect?.(row, row.original)
      : undefined,
  }))
}

function DataTableRowActions<TData>({
  row,
  actions,
  getActions,
  ...props
}: DataTableRowActionsProps<TData>) {
  return (
    <ActionMenu
      actions={resolveRowActions(row, actions, getActions)}
      {...props}
    />
  )
}

export { DataTableRowActions, resolveRowActions }
