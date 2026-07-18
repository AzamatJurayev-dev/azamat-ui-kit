"use client"

import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "@/lib/utils"

export type HoverCardProps = PreviewCardPrimitive.Root.Props
export type HoverCardTriggerProps = PreviewCardPrimitive.Trigger.Props
export type HoverCardContentProps = PreviewCardPrimitive.Popup.Props &
  Pick<
    PreviewCardPrimitive.Positioner.Props,
    "align" | "alignOffset" | "collisionBoundary" | "collisionPadding" | "side" | "sideOffset"
  >
export type HoverCardArrowProps = PreviewCardPrimitive.Arrow.Props

function HoverCard({ ...props }: HoverCardProps) {
  return <PreviewCardPrimitive.Root data-slot="hover-card" {...props} />
}

function HoverCardTrigger({ ...props }: HoverCardTriggerProps) {
  if (!("render" in props) && React.isValidElement(props.children)) {
    const { children, ...rest } = props
    return <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" render={children} {...rest} />
  }

  return <PreviewCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
}

function HoverCardContent({
  className,
  align = "center",
  alignOffset = 0,
  collisionPadding = 12,
  side = "bottom",
  sideOffset = 8,
  ...props
}: HoverCardContentProps) {
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50 outline-none"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn(
            "z-50 grid max-h-[min(var(--available-height),calc(100dvh-1rem))] w-80 max-w-[calc(100vw-1rem)] origin-(--transform-origin) gap-3 overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  )
}

function HoverCardArrow({ className, ...props }: HoverCardArrowProps) {
  return (
    <PreviewCardPrimitive.Arrow
      data-slot="hover-card-arrow"
      className={cn("z-50 flex size-3 rotate-45 border border-border bg-popover", className)}
      {...props}
    />
  )
}

export { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger }
