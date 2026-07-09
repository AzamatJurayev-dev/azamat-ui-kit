import * as React from "react"

import { cn } from "@/lib/utils"

export type RightClickMenuItem = {
  label: React.ReactNode
  icon?: React.ReactNode
  shortcut?: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
  variant?: "default" | "destructive"
}

export type RightClickMenuProps = React.ComponentProps<"div"> & {
  items: RightClickMenuItem[]
  label?: string
}

function getClampedPoint(x: number, y: number, width = 224, height: number) {
  if (typeof window === "undefined") {
    return { x, y }
  }

  const padding = 8
  return {
    x: Math.min(Math.max(padding, x), Math.max(padding, window.innerWidth - width - padding)),
    y: Math.min(Math.max(padding, y), Math.max(padding, window.innerHeight - height - padding)),
  }
}

function RightClickMenu({
  items,
  children,
  className,
  label = "Context menu",
  ...props
}: RightClickMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [point, setPoint] = React.useState({ x: 0, y: 0 })
  const [activeIndex, setActiveIndex] = React.useState(0)
  const rootRef = React.useRef<HTMLDivElement>(null)
  const itemRefs = React.useRef<Array<HTMLButtonElement | null>>([])
  const enabledItems = React.useMemo(
    () => items.map((item, index) => ({ item, index })).filter(({ item }) => !item.disabled),
    [items]
  )

  const openAt = React.useCallback(
    (x: number, y: number) => {
      const nextPoint = getClampedPoint(x, y, 224, Math.max(44, items.length * 42 + 12))
      setPoint(nextPoint)
      setActiveIndex(enabledItems[0]?.index ?? 0)
      setOpen(true)
    },
    [enabledItems, items.length]
  )

  React.useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("pointerdown", close)
    window.addEventListener("resize", close)
    window.addEventListener("scroll", close, true)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("pointerdown", close)
      window.removeEventListener("resize", close)
      window.removeEventListener("scroll", close, true)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    itemRefs.current[activeIndex]?.focus()
  }, [activeIndex, open])

  const focusNext = (direction: 1 | -1) => {
    if (enabledItems.length === 0) return
    const currentEnabledIndex = enabledItems.findIndex(({ index }) => index === activeIndex)
    const nextEnabled =
      enabledItems[(currentEnabledIndex + direction + enabledItems.length) % enabledItems.length]
    setActiveIndex(nextEnabled.index)
  }

  return (
    <div
      data-slot="right-click-menu"
      ref={rootRef}
      tabIndex={0}
      className={cn("contents focus:outline-none", className)}
      onContextMenu={(event) => {
        event.preventDefault()
        openAt(event.clientX, event.clientY)
      }}
      onKeyDown={(event) => {
        if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) {
          event.preventDefault()
          const rect = rootRef.current?.getBoundingClientRect()
          openAt(rect ? rect.left + 12 : 12, rect ? rect.top + 12 : 12)
        }
      }}
      {...props}
    >
      {children}
      {open ? (
        <div
          data-slot="right-click-menu-content"
          role="menu"
          aria-label={label}
          className="fixed z-50 min-w-56 max-w-[calc(100vw-1rem)] rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-[color:var(--aui-overlay-surface,var(--popover))] p-1.5 text-sm text-popover-foreground shadow-[var(--aui-popover-shadow,0_18px_42px_rgba(15,23,42,0.16))] outline-none"
          style={{ left: point.x, top: point.y }}
          onPointerDown={(event) => event.stopPropagation()}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault()
              focusNext(1)
            }
            if (event.key === "ArrowUp") {
              event.preventDefault()
              focusNext(-1)
            }
            if (event.key === "Home") {
              event.preventDefault()
              setActiveIndex(enabledItems[0]?.index ?? activeIndex)
            }
            if (event.key === "End") {
              event.preventDefault()
              setActiveIndex(enabledItems.at(-1)?.index ?? activeIndex)
            }
          }}
        >
          {items.map((item, index) => (
            <button
              key={index}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              data-variant={item.variant ?? "default"}
              className="group flex min-h-9 w-full items-center gap-2 rounded-[var(--radius-md)] px-2.5 py-2 text-left text-popover-foreground outline-none transition-[background-color,color] hover:bg-accent focus-visible:bg-accent data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-[color:color-mix(in_oklch,var(--destructive),transparent_90%)] data-[variant=destructive]:focus-visible:bg-[color:color-mix(in_oklch,var(--destructive),transparent_90%)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0"
              onClick={() => {
                if (item.disabled) return
                item.onSelect?.()
                setOpen(false)
              }}
            >
              {item.icon}
              <span className="min-w-0 flex-1 truncate">{item.label}</span>
              {item.shortcut ? (
                <span className="ml-3 text-[11px] font-medium tracking-[0.08em] text-muted-foreground group-hover:text-foreground group-focus-visible:text-foreground">
                  {item.shortcut}
                </span>
              ) : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { RightClickMenu }
