"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ConfirmVariant = React.ComponentProps<typeof Button>["variant"]
type ConfirmDialogSize = "sm" | "md" | "lg" | "xl" | "full"

type ConfirmDialogProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  size?: ConfirmDialogSize
  showCloseButton?: boolean
  contentClassName?: string
  headerClassName?: string
  bodyClassName?: string
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

function renderConfirmDialogTrigger(trigger: React.ReactNode) {
  if (!trigger) return null
  if (React.isValidElement(trigger)) return <DialogTrigger render={trigger} />
  return <DialogTrigger>{trigger}</DialogTrigger>
}

function ConfirmDialog({
  open,
  defaultOpen,
  trigger,
  title,
  description,
  children,
  size = "md",
  showCloseButton = true,
  contentClassName,
  headerClassName,
  bodyClassName,
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
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={handleOpenChange}>
      {renderConfirmDialogTrigger(trigger)}
      <DialogContent
        size={size}
        showCloseButton={showCloseButton && !resolvedLoading}
        className={contentClassName}
      >
        {(title || description) && (
          <DialogHeader className={headerClassName}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {children && (
          <div data-slot="confirm-dialog-body" className={cn("min-w-0", bodyClassName)}>
            {children}
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={cancelDisabled || resolvedLoading}
            onClick={handleCancel}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            disabled={confirmDisabled || resolvedLoading}
            loading={resolvedLoading}
            onClick={() => void handleConfirm()}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ConfirmDialog }
export type { ConfirmDialogProps }
