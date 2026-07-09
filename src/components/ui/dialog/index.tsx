import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { XIcon } from "lucide-react"

export type DialogRootProps = DialogPrimitive.Root.Props
export type DialogTriggerProps = DialogPrimitive.Trigger.Props
export type DialogPortalProps = DialogPrimitive.Portal.Props
export type DialogCloseProps = DialogPrimitive.Close.Props
export type DialogOverlayProps = DialogPrimitive.Backdrop.Props
export type DialogPopupProps = DialogPrimitive.Popup.Props & {
  showCloseButton?: boolean
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full"
  surface?: "default" | "plain"
}
export type DialogHeaderProps = React.ComponentProps<"div">
export type DialogFooterProps = React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}
export type DialogTitleProps = DialogPrimitive.Title.Props
export type DialogDescriptionProps = DialogPrimitive.Description.Props

function Dialog({ ...props }: DialogRootProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({ ...props }: DialogTriggerProps) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({ ...props }: DialogPortalProps) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({ ...props }: DialogCloseProps) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: DialogOverlayProps) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-[color-mix(in_oklch,var(--foreground),transparent_80%)] duration-100 supports-backdrop-filter:backdrop-blur-md data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showCloseButton = true,
  size = "md",
  surface = "default",
  ...props
}: DialogPopupProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        data-size={size}
        data-surface={surface}
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid max-h-[min(92vh,calc(100dvh-2rem))] w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-5 overflow-y-auto overscroll-contain rounded-[var(--radius-3xl)] border border-[color:var(--aui-card-border,var(--border))] bg-[color:var(--aui-overlay-surface,var(--popover))] p-6 text-sm text-popover-foreground shadow-[var(--aui-control-panel-shadow,0_24px_70px_rgba(15,23,42,0.22))] backdrop-blur duration-100 outline-none data-[surface=plain]:overflow-visible data-[surface=plain]:border-transparent data-[surface=plain]:bg-transparent data-[surface=plain]:p-0 data-[surface=plain]:shadow-none data-[size=xs]:sm:max-w-sm data-[size=sm]:sm:max-w-md data-[size=md]:sm:max-w-lg data-[size=lg]:sm:max-w-2xl data-[size=xl]:sm:max-w-4xl data-[size=full]:h-[min(92vh,56rem)] data-[size=full]:max-w-[min(96vw,84rem)] data-[size=full]:grid-rows-[auto_minmax(0,1fr)] data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3 rounded-full border border-transparent hover:border-border/50 hover:bg-muted/50"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: DialogHeaderProps) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2.5", className)}
      {...props}
    />
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: DialogFooterProps) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "-mx-6 -mb-6 flex flex-col-reverse gap-2 border-t border-border/70 bg-muted/20 p-5 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitive.Close render={<Button variant="outline" />}>
          Close
        </DialogPrimitive.Close>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn(
        "font-heading text-xl leading-tight font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn(
        "text-sm leading-6 text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
