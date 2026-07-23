import * as React from "react"
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

export type TooltipProps = Omit<TooltipPrimitive.Root.Props, "children"> &
  Omit<React.ComponentProps<"span">, "content" | "children"> & {
  content: React.ReactNode
  children: React.ReactNode
  side?: TooltipPrimitive.Positioner.Props["side"]
  align?: TooltipPrimitive.Positioner.Props["align"]
  sideOffset?: TooltipPrimitive.Positioner.Props["sideOffset"]
  alignOffset?: TooltipPrimitive.Positioner.Props["alignOffset"]
  collisionPadding?: TooltipPrimitive.Positioner.Props["collisionPadding"]
  delay?: TooltipPrimitive.Trigger.Props["delay"]
  closeDelay?: TooltipPrimitive.Trigger.Props["closeDelay"]
  disabled?: boolean
}

function getPlainText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(getPlainText).join("")
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) return getPlainText(node.props.children)
  return ""
}

function Tooltip({
  content,
  side = "top",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  collisionPadding = 8,
  delay = 200,
  closeDelay = 0,
  disabled = false,
  className,
  children,
  ...props
}: TooltipProps) {
  const trigger = React.isValidElement(children) ? (
    children
  ) : (
    <span className="inline-flex">{children}</span>
  )
  const contentText = getPlainText(content)
  const shouldRenderFallbackLabel =
    !disabled && contentText.length > 0 && !getPlainText(children).includes(contentText)

  return (
    <TooltipPrimitive.Root disabled={disabled}>
      <TooltipPrimitive.Trigger
        data-slot="tooltip-trigger"
        delay={delay}
        closeDelay={closeDelay}
        disabled={disabled}
        render={<span data-slot="tooltip" className={cn("inline-flex", className)} {...props} />}
      >
        {trigger}
        {shouldRenderFallbackLabel ? <span className="sr-only">{content}</span> : null}
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner
          className="isolate z-50"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionPadding={collisionPadding}
        >
          <TooltipPrimitive.Popup
            data-slot="tooltip-content"
            className="z-50 max-w-64 origin-(--transform-origin) rounded-[var(--radius-lg)] border border-border/75 bg-popover/98 px-2.5 py-1.5 text-[11px] font-medium leading-4 text-popover-foreground shadow-[0_16px_42px_color-mix(in_oklch,var(--foreground),transparent_86%)] outline-hidden backdrop-blur duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
          >
            {content}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

export { Tooltip }
