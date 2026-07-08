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
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  contentClassName?: string
  showCloseButton?: boolean
  children?: React.ReactNode
}

const sideClassName: Record<DrawerSide, string> = {
  right: "left-auto right-0 top-0 h-dvh max-h-dvh w-full max-w-md translate-x-0 translate-y-0 rounded-none rounded-l-[var(--radius-3xl)] data-open:slide-in-from-right data-closed:slide-out-to-right sm:max-w-lg",
  left: "left-0 top-0 h-dvh max-h-dvh w-full max-w-md translate-x-0 translate-y-0 rounded-none rounded-r-[var(--radius-3xl)] data-open:slide-in-from-left data-closed:slide-out-to-left sm:max-w-lg",
  top: "left-0 top-0 h-auto max-h-[85dvh] w-full max-w-none translate-x-0 translate-y-0 rounded-none rounded-b-[var(--radius-3xl)] data-open:slide-in-from-top data-closed:slide-out-to-top",
  bottom: "bottom-0 left-0 top-auto h-auto max-h-[85dvh] w-full max-w-none translate-x-0 translate-y-0 rounded-none rounded-t-[var(--radius-3xl)] data-open:slide-in-from-bottom data-closed:slide-out-to-bottom",
}

function Drawer({
  trigger,
  title,
  description,
  side = "right",
  footer,
  headerClassName,
  bodyClassName,
  footerClassName,
  contentClassName,
  showCloseButton = true,
  children,
  ...props
}: DrawerProps) {
  return (
    <Dialog {...props}>
      {trigger ? <DialogTrigger render={trigger as React.ReactElement} /> : null}
      <DialogContent
        size="full"
        showCloseButton={showCloseButton}
        className={cn("fixed grid grid-rows-[auto_minmax(0,1fr)_auto] gap-0 p-0", sideClassName[side], contentClassName)}
      >
        {(title || description) && (
          <DialogHeader className={cn("border-b border-border/70 p-6", headerClassName)}>
            {title ? <DialogTitle>{title}</DialogTitle> : null}
            {description ? <DialogDescription>{description}</DialogDescription> : null}
          </DialogHeader>
        )}
        <div data-slot="drawer-body" className={cn("min-h-0 flex-1 overflow-y-auto p-6", bodyClassName)}>
          {children}
        </div>
        {footer ? <div data-slot="drawer-footer" className={cn("border-t border-border/70 p-5", footerClassName)}>{footer}</div> : null}
      </DialogContent>
    </Dialog>
  )
}

function DrawerCloseButton({ children = "Close", ...props }: React.ComponentProps<typeof Button>) {
  return (
    <DialogClose render={<Button type="button" variant="outline" {...props} />}>
      {children}
    </DialogClose>
  )
}

export { Drawer, DrawerCloseButton }
