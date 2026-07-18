"use client"

import * as React from "react"
import { RotateCcwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useToast, type CreateToastInput, type ToastShortcutInput } from "@/components/notifications/toast"

export type ActionToastOptions = Omit<CreateToastInput, "action"> & {
  actionLabel?: React.ReactNode
  onAction?: () => void
  undoLabel?: React.ReactNode
  onUndo?: () => void
}

export type ActionToastButtonProps = React.ComponentProps<typeof Button> & {
  toast: ActionToastOptions
}

function ActionToastButton({ toast, children, onClick, ...props }: ActionToastButtonProps) {
  const toaster = useToast()

  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return
        showActionToast(toaster, toast)
      }}
    >
      {children}
    </Button>
  )
}

function ActionToastUndoButton({ onUndo, label = "Undo" }: { onUndo?: () => void; label?: React.ReactNode }) {
  return (
    <Button type="button" size="sm" variant="outline" leftIcon={<RotateCcwIcon className="size-3.5" />} onClick={onUndo}>
      {label}
    </Button>
  )
}

function showActionToast(
  toaster: ReturnType<typeof useToast>,
  {
    actionLabel = "Action",
    onAction,
    undoLabel,
    onUndo,
    ...toast
  }: ActionToastOptions
) {
  const action = onUndo ? (
    <ActionToastUndoButton onUndo={onUndo} label={undoLabel} />
  ) : onAction ? (
    <Button type="button" size="sm" variant="outline" onClick={onAction}>{actionLabel}</Button>
  ) : undefined

  return toaster.addToast({ ...toast, action })
}

function useActionToast() {
  const toaster = useToast()

  return React.useCallback(
    (toast: ActionToastOptions | ToastShortcutInput) => {
      if (typeof toast === "object" && toast !== null && !React.isValidElement(toast) && !Array.isArray(toast)) {
        return showActionToast(toaster, toast as ActionToastOptions)
      }
      return toaster.info(toast)
    },
    [toaster]
  )
}

export { ActionToastButton, showActionToast, useActionToast }
