import * as React from "react"

import { cn } from "@/lib/utils"

export type RightClickMenuItem = {
  label: React.ReactNode
  onSelect?: () => void
  disabled?: boolean
}

export type RightClickMenuProps = React.ComponentProps<"div"> & {
  items: RightClickMenuItem[]
}

function RightClickMenu({ items, children, className, ...props }: RightClickMenuProps) {
  const [open, setOpen] = React.useState(false)
  const [point, setPoint] = React.useState({ x: 0, y: 0 })

  React.useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener("click", close)
    return () => window.removeEventListener("click", close)
  }, [open])

  return (
    <div
      data-slot="right-click-menu"
      className={cn("contents", className)}
      onContextMenu={(event) => {
        event.preventDefault()
        setPoint({ x: event.clientX, y: event.clientY })
        setOpen(true)
      }}
      {...props}
    >
      {children}
      {open ? (
        <div className="fixed z-50 min-w-40 rounded-xl border border-border bg-popover p-1.5 text-sm text-popover-foreground shadow-xl" style={{ left: point.x, top: point.y }}>
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              disabled={item.disabled}
              className="block w-full rounded-lg px-3 py-2 text-left hover:bg-accent disabled:pointer-events-none disabled:opacity-50"
              onClick={() => {
                item.onSelect?.()
                setOpen(false)
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { RightClickMenu }
