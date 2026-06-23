import * as React from "react"

export type UseDisclosureOptions = {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

function useDisclosure({ defaultOpen = false, open, onOpenChange }: UseDisclosureOptions = {}) {
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen)
  const currentOpen = isControlled ? open : internalOpen

  const setOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    },
    [isControlled, onOpenChange]
  )

  const openDisclosure = React.useCallback(() => setOpen(true), [setOpen])
  const closeDisclosure = React.useCallback(() => setOpen(false), [setOpen])
  const toggleDisclosure = React.useCallback(() => setOpen(!currentOpen), [currentOpen, setOpen])

  return {
    open: currentOpen,
    setOpen,
    openDisclosure,
    closeDisclosure,
    toggleDisclosure,
  } as const
}

export { useDisclosure }
