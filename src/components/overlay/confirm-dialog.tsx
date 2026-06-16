import * as React from "react"

import { DialogActionButton, DialogActions } from "@/components/overlay/dialog-actions"
import { ModalShell, type ModalShellProps } from "@/components/overlay/modal-shell"

type ConfirmVariant = React.ComponentProps<typeof DialogActionButton>["variant"]

type ConfirmDialogProps = Omit<ModalShellProps, "footer"> & {
  cancelText?: React.ReactNode
  confirmText?: React.ReactNode
  confirmVariant?: ConfirmVariant
  confirmDisabled?: boolean
  cancelDisabled?: boolean
  isLoading?: boolean
  onCancel?: () => void
  onConfirm?: () => void
}

function ConfirmDialog({
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmVariant = "default",
  confirmDisabled = false,
  cancelDisabled = false,
  isLoading = false,
  onCancel,
  onConfirm,
  onOpenChange,
  ...props
}: ConfirmDialogProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange?.(false)
  }

  return (
    <ModalShell
      onOpenChange={onOpenChange}
      footer={
        <DialogActions>
          <DialogActionButton
            type="button"
            variant="outline"
            disabled={cancelDisabled || isLoading}
            onClick={handleCancel}
          >
            {cancelText}
          </DialogActionButton>
          <DialogActionButton
            type="button"
            variant={confirmVariant}
            disabled={confirmDisabled}
            isLoading={isLoading}
            onClick={onConfirm}
          >
            {confirmText}
          </DialogActionButton>
        </DialogActions>
      }
      {...props}
    />
  )
}

export { ConfirmDialog }
export type { ConfirmDialogProps }
