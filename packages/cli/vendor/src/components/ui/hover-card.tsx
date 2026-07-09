import * as React from "react"
import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card"

import { cn } from "@/lib/utils"

export type HoverCardProps = Omit<PreviewCardPrimitive.Root.Props, "children"> &
  Omit<React.ComponentProps<"span">, "content" | "children"> & {
  trigger: React.ReactNode
  content: React.ReactNode
  side?: PreviewCardPrimitive.Positioner.Props["side"]
  align?: PreviewCardPrimitive.Positioner.Props["align"]
  sideOffset?: PreviewCardPrimitive.Positioner.Props["sideOffset"]
  alignOffset?: PreviewCardPrimitive.Positioner.Props["alignOffset"]
  collisionPadding?: PreviewCardPrimitive.Positioner.Props["collisionPadding"]
  delay?: PreviewCardPrimitive.Trigger.Props["delay"]
  closeDelay?: PreviewCardPrimitive.Trigger.Props["closeDelay"]
  disabled?: boolean
  contentClassName?: string
}

function HoverCard({
  trigger,
  content,
  side = "bottom",
  align = "center",
  sideOffset = 10,
  alignOffset = 0,
  collisionPadding = 12,
  delay = 450,
  closeDelay = 180,
  disabled = false,
  contentClassName,
  className,
  ...props
}: HoverCardProps) {
  if (disabled) {
    return (
      <span data-slot="hover-card" className={cn("inline-flex", className)} {...props}>
        {trigger}
      </span>
    )
  }

  return (
    <PreviewCardPrimitive.Root>
      <PreviewCardPrimitive.Trigger
        data-slot="hover-card-trigger"
        delay={delay}
        closeDelay={closeDelay}
        render={<span data-slot="hover-card" className={cn("inline-flex", className)} {...props} />}
      >
        {trigger}
      </PreviewCardPrimitive.Trigger>
      <PreviewCardPrimitive.Portal>
        <PreviewCardPrimitive.Positioner
          className="isolate z-50"
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
          collisionPadding={collisionPadding}
        >
          <PreviewCardPrimitive.Popup
            data-slot="hover-card-content"
            className={cn(
              "z-50 min-w-60 max-w-[min(24rem,calc(100vw-1rem))] origin-(--transform-origin) rounded-[var(--aui-card-radius,var(--radius-xl))] border border-border/80 bg-popover/98 p-4 text-sm text-popover-foreground shadow-[0_18px_42px_color-mix(in_oklch,var(--foreground),transparent_86%)] ring-1 ring-foreground/8 outline-hidden backdrop-blur duration-150 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
              contentClassName
            )}
          >
            {content}
          </PreviewCardPrimitive.Popup>
        </PreviewCardPrimitive.Positioner>
      </PreviewCardPrimitive.Portal>
    </PreviewCardPrimitive.Root>
  )
}

export { HoverCard }
