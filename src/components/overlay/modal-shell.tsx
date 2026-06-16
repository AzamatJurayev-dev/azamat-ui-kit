import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

type ModalShellSize = "sm" | "md" | "lg" | "xl" | "full"

const modalSizeClassName: Record<ModalShellSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
  full: "sm:max-w-[calc(100vw-2rem)] sm:h-[calc(100vh-2rem)]",
}

export type ModalShellProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  size?: ModalShellSize
  showCloseButton?: boolean
  contentClassName?: string
  headerClassName?: string
  bodyClassName?: string
}

function renderDialogTrigger(trigger: React.ReactNode) {
  if (!trigger) return null

  if (React.isValidElement(trigger)) {
    return <DialogTrigger render={trigger} />
  }

  return <DialogTrigger>{trigger}</DialogTrigger>
}

function ModalShell({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  size = "md",
  showCloseButton = true,
  contentClassName,
  headerClassName,
  bodyClassName,
}: ModalShellProps) {
  const hasHeader = Boolean(title || description)

  return (
    <Dialog open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {renderDialogTrigger(trigger)}
      <DialogContent
        showCloseButton={showCloseButton}
        className={cn(modalSizeClassName[size], contentClassName)}
      >
        {hasHeader && (
          <DialogHeader className={headerClassName}>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}

        {children && (
          <div data-slot="modal-shell-body" className={cn("min-w-0", bodyClassName)}>
            {children}
          </div>
        )}

        {footer && <div data-slot="modal-shell-footer">{footer}</div>}
      </DialogContent>
    </Dialog>
  )
}

export { ModalShell }
export type { ModalShellSize }
