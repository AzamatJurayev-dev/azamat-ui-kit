"use client"

import * as React from "react"

type ControllableDetailsProps = Omit<React.ComponentProps<"details">, "open" | "onToggle"> & {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function ControllableDetails({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: ControllableDetailsProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen)
  const isControlled = open !== undefined

  return (
    <details
      {...props}
      open={isControlled ? open : uncontrolledOpen}
      onToggle={(event) => {
        const nextOpen = event.currentTarget.open
        if (!isControlled) setUncontrolledOpen(nextOpen)
        onOpenChange?.(nextOpen)
      }}
    >
      {children}
    </details>
  )
}

export { ControllableDetails }
export type { ControllableDetailsProps }
