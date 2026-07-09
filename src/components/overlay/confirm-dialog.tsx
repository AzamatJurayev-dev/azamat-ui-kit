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
  closeOnConfirm?: boolean
  onConfirmError?: (error: unknown) => void
  onCancel?: () => void
  onConfirm?: () => void | Promise<void>
}

function ConfirmDialog({
  cancelText = "Cancel",
  confirmText = "Confirm",
  confirmVariant = "default",
  confirmDisabled = false,
  cancelDisabled = false,
  isLoading = false,
  closeOnConfirm = true,
  onConfirmError,
  onCancel,
  onConfirm,
  onOpenChange,
  ...props
}: ConfirmDialogProps) {
  const [pending, setPending] = React.useState(false)
  const resolvedLoading = isLoading || pending

  const handleOpenChange = (open: boolean) => {
    if (resolvedLoading && open === false) {
      return
    }

    onOpenChange?.(open)
  }

  const handleCancel = () => {
    onCancel?.()
    if (!resolvedLoading) {
      onOpenChange?.(false)
    }
  }

  const handleConfirm = async () => {
    if (confirmDisabled || resolvedLoading) return

    try {
      setPending(true)
      await onConfirm?.()
      if (closeOnConfirm) {
        onOpenChange?.(false)
      }
    } catch (error) {
      onConfirmError?.(error)
    } finally {
      setPending(false)
    }
  }

  return (
    <ModalShell
      showCloseButton={!resolvedLoading}
      onOpenChange={handleOpenChange}
      footer={
        <DialogActions>
          <DialogActionButton
            type="button"
            variant="outline"
            disabled={cancelDisabled || resolvedLoading}
            onClick={handleCancel}
          >
            {cancelText}
          </DialogActionButton>
          <DialogActionButton
            type="button"
            variant={confirmVariant}
            disabled={confirmDisabled || resolvedLoading}
            isLoading={resolvedLoading}
            onClick={() => void handleConfirm()}
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
