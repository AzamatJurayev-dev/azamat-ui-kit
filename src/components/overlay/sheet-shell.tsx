import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type SheetSide = "top" | "right" | "bottom" | "left"

type SheetShellProps = {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
  side?: SheetSide
  showCloseButton?: boolean
  contentClassName?: string
  headerClassName?: string
  bodyClassName?: string
}

const Sheet = DialogPrimitive.Root

function SheetTrigger({ ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetClose({ ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
      <DialogPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-foreground/12 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

const sheetSideClassName: Record<SheetSide, string> = {
  top: "inset-x-0 top-0 max-h-[85vh] rounded-b-xl border-b data-open:slide-in-from-top data-closed:slide-out-to-top",
  right:
    "inset-y-0 right-0 h-full w-3/4 max-w-sm border-l data-open:slide-in-from-right data-closed:slide-out-to-right sm:max-w-md",
  bottom:
    "inset-x-0 bottom-0 max-h-[85vh] rounded-t-xl border-t data-open:slide-in-from-bottom data-closed:slide-out-to-bottom",
  left: "inset-y-0 left-0 h-full w-3/4 max-w-sm border-r data-open:slide-in-from-left data-closed:slide-out-to-left sm:max-w-md",
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: DialogPrimitive.Popup.Props & {
  side?: SheetSide
  showCloseButton?: boolean
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background p-4 text-foreground shadow-xl outline-none duration-200 data-open:animate-in data-closed:animate-out",
          sheetSideClassName[side],
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetClose
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="absolute right-3 top-3"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetClose>
        )}
      </DialogPrimitive.Popup>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-2 pr-8", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("font-heading text-base font-medium leading-none", className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function renderSheetTrigger(trigger: React.ReactNode) {
  if (!trigger) return null

  if (React.isValidElement(trigger)) {
    return <SheetTrigger render={trigger} />
  }

  return <SheetTrigger>{trigger}</SheetTrigger>
}

function SheetShell({
  open,
  defaultOpen,
  onOpenChange,
  trigger,
  title,
  description,
  children,
  footer,
  side = "right",
  showCloseButton = true,
  contentClassName,
  headerClassName,
  bodyClassName,
}: SheetShellProps) {
  const hasHeader = Boolean(title || description)

  return (
    <Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {renderSheetTrigger(trigger)}
      <SheetContent
        side={side}
        showCloseButton={showCloseButton}
        className={contentClassName}
      >
        {hasHeader && (
          <SheetHeader className={headerClassName}>
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}

        {children && (
          <div data-slot="sheet-shell-body" className={cn("min-w-0 flex-1", bodyClassName)}>
            {children}
          </div>
        )}

        {footer && <SheetFooter>{footer}</SheetFooter>}
      </SheetContent>
    </Sheet>
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetShell,
  SheetTitle,
  SheetTrigger,
}
export type { SheetShellProps, SheetSide }
