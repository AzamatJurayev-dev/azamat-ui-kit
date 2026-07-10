"use client"

import * as React from "react"
import { AlertTriangleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type AlertDialogProps = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  cancelLabel?: React.ReactNode
  actionLabel?: React.ReactNode
  actionTone?: "default" | "destructive"
  cancelVariant?: React.ComponentProps<typeof Button>["variant"]
  loading?: boolean
  closeOnAction?: boolean
  confirmValue?: string
  confirmLabel?: React.ReactNode
  confirmPlaceholder?: string
  confirmDescription?: React.ReactNode
  confirmCaseSensitive?: boolean
  severityNote?: React.ReactNode
  onAction?: () => void | Promise<void>
  children?: React.ReactNode
  preventCloseWhileLoading?: boolean
  actionButtonProps?: Omit<React.ComponentProps<typeof Button>, "type" | "variant" | "loading" | "disabled" | "onClick" | "children">
  cancelButtonProps?: Omit<React.ComponentProps<typeof Button>, "type" | "variant" | "disabled" | "children">
}

function AlertDialog({
  title = "Are you sure?",
  description,
  icon = <AlertTriangleIcon />,
  cancelLabel = "Cancel",
  actionLabel = "Continue",
  actionTone = "destructive",
  cancelVariant = "outline",
  loading = false,
  closeOnAction = true,
  confirmValue,
  confirmLabel = "Type to confirm",
  confirmPlaceholder,
  confirmDescription,
  confirmCaseSensitive = true,
  severityNote,
  onAction,
  children,
  onOpenChange,
  ...props
}: AlertDialogProps) {
  const [pending, setPending] = React.useState(false)
  const [confirmationInput, setConfirmationInput] = React.useState("")
  const resolvedLoading = loading || pending
  const requiresTypedConfirmation = Boolean(confirmValue?.trim())
  const expectedConfirmation = confirmCaseSensitive ? confirmValue?.trim() : confirmValue?.trim().toLowerCase()
  const actualConfirmation = confirmCaseSensitive ? confirmationInput.trim() : confirmationInput.trim().toLowerCase()
  const canConfirm = !requiresTypedConfirmation || actualConfirmation === expectedConfirmation

  React.useEffect(() => {
    if (!props.open) {
      setConfirmationInput("")
    }
  }, [props.open])

  const closeDialog = () => {
    ;(onOpenChange as ((open: boolean, eventDetails: never) => void) | undefined)?.(false, undefined as never)
  }

  const handleAction = async () => {
    if (!canConfirm || resolvedLoading) return
    if (!onAction) {
      if (closeOnAction) closeDialog()
      return
    }

    try {
      setPending(true)
      await onAction()
      if (closeOnAction) closeDialog()
    } finally {
      setPending(false)
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange} {...props}>
      {children}
      <DialogContent>
        <DialogHeader>
          <div className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive [&_svg]:size-5">
            {icon}
          </div>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        {requiresTypedConfirmation ? (
          <div className="grid gap-2.5">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">{confirmLabel}</p>
              <p className="text-xs leading-5 text-muted-foreground">
                {confirmDescription ?? (
                  <>
                    Type <span className="font-semibold text-foreground">{confirmValue}</span> to continue.
                  </>
                )}
              </p>
            </div>
            <Input
              value={confirmationInput}
              onValueChange={setConfirmationInput}
              placeholder={confirmPlaceholder ?? confirmValue}
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        ) : null}
        {severityNote ? (
          <div className="rounded-2xl border border-border/70 bg-muted/35 px-3.5 py-3 text-sm leading-6 text-muted-foreground">
            {severityNote}
          </div>
        ) : null}
        <DialogFooter>
          <DialogClose render={() => (
            <Button type="button" variant={cancelVariant} disabled={resolvedLoading}>
              {cancelLabel}
            </Button>
          )} />
          <Button
            type="button"
            variant={actionTone === "destructive" ? "destructive" : "default"}
            loading={resolvedLoading}
            disabled={!canConfirm && !resolvedLoading}
            onClick={() => void handleAction()}
          >
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AlertDialog }
