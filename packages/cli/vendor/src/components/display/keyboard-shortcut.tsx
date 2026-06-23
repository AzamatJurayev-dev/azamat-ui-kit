import * as React from "react"

import { cn } from "@/lib/utils"

export type KeyboardShortcutProps = React.ComponentProps<"kbd"> & {
  keys?: React.ReactNode[]
  separator?: React.ReactNode
}

function KeyboardShortcut({ keys, separator = "+", className, children, ...props }: KeyboardShortcutProps) {
  const content = keys?.length
    ? keys.map((key, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="text-muted-foreground">{separator}</span>}
          <span>{key}</span>
        </React.Fragment>
      ))
    : children

  return (
    <kbd
      data-slot="keyboard-shortcut"
      className={cn("inline-flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 font-mono text-[11px] font-medium text-muted-foreground", className)}
      {...props}
    >
      {content}
    </kbd>
  )
}

export { KeyboardShortcut }
