import * as React from "react"
import { AlertTriangleIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
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
  loading?: boolean
  onAction?: () => void | Promise<void>
  children?: React.ReactNode
}

function AlertDialog({
  title = "Are you sure?",
  description,
  icon = <AlertTriangleIcon />,
  cancelLabel = "Cancel",
  actionLabel = "Continue",
  actionTone = "destructive",
  loading = false,
  onAction,
  children,
  ...props
}: AlertDialogProps) {
  return (
    <Dialog {...props}>
      {children}
      <DialogContent>
        <DialogHeader>
          <div className="mb-3 inline-flex size-11 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive [&_svg]:size-5">
            {icon}
          </div>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={() => (
            <Button type="button" variant="outline" disabled={loading}>
              {cancelLabel}
            </Button>
          )} />
          <Button type="button" variant={actionTone === "destructive" ? "destructive" : "default"} loading={loading} onClick={() => void onAction?.()}>
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { AlertDialog }
