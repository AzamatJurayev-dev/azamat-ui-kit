import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

export type DrawerSide = "left" | "right" | "top" | "bottom"

export type DrawerProps = Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  side?: DrawerSide
  footer?: React.ReactNode
  contentClassName?: string
  showCloseButton?: boolean
  children?: React.ReactNode
}

const sideClassName: Record<DrawerSide, string> = {
  right: "left-auto right-0 top-0 h-dvh max-h-dvh w-full max-w-md translate-x-0 translate-y-0 rounded-none rounded-l-[var(--radius-3xl)] sm:max-w-lg",
  left: "left-0 top-0 h-dvh max-h-dvh w-full max-w-md translate-x-0 translate-y-0 rounded-none rounded-r-[var(--radius-3xl)] sm:max-w-lg",
  top: "left-0 top-0 h-auto max-h-[85dvh] w-full max-w-none translate-x-0 translate-y-0 rounded-none rounded-b-[var(--radius-3xl)]",
  bottom: "bottom-0 left-0 top-auto h-auto max-h-[85dvh] w-full max-w-none translate-x-0 translate-y-0 rounded-none rounded-t-[var(--radius-3xl)]",
}

function Drawer({
  trigger,
  title,
  description,
  side = "right",
  footer,
  contentClassName,
  showCloseButton = true,
  children,
  ...props
}: DrawerProps) {
  return (
    <Dialog {...props}>
      {trigger ? <DialogTrigger render={trigger as React.ReactElement} /> : null}
      <DialogContent showCloseButton={showCloseButton} className={cn("fixed p-0", sideClassName[side], contentClassName)}>
        {(title || description) && (
          <DialogHeader className="border-b border-border/70 p-6">
            {title ? <DialogTitle>{title}</DialogTitle> : null}
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>
        )}
        <div data-slot="drawer-body" className="min-h-0 flex-1 overflow-y-auto p-6">
          {children}
        </div>
        {footer ? <div data-slot="drawer-footer" className="border-t border-border/70 p-5">{footer}</div> : null}
      </DialogContent>
    </Dialog>
  )
}

function DrawerCloseButton({ children = "Close", ...props }: React.ComponentProps<typeof Button>) {
  return (
    <DialogClose render={() => <Button type="button" variant="outline" {...props}>{children}</Button>} />
  )
}

export { Drawer, DrawerCloseButton }
