import * as React from "react"

import { cn } from "@/lib/utils"

export type AppHeaderProps = React.ComponentProps<"header"> & {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
  sticky?: boolean
  heightClassName?: string
}

function AppHeader({
  className,
  left,
  center,
  right,
  sticky = true,
  heightClassName = "h-14",
  children,
  ...props
}: AppHeaderProps) {
  return (
    <header
      data-slot="app-header"
      data-sticky={sticky || undefined}
      className={cn(
        "z-30 flex shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80",
        sticky && "sticky top-0",
        heightClassName,
        className
      )}
      {...props}
    >
      {children ?? (
        <>
          {left && <div className="flex min-w-0 flex-1 items-center gap-2">{left}</div>}
          {center && <div className="hidden min-w-0 flex-1 items-center justify-center md:flex">{center}</div>}
          {right && <div className="ml-auto flex shrink-0 items-center gap-2">{right}</div>}
        </>
      )}
    </header>
  )
}

export { AppHeader }
