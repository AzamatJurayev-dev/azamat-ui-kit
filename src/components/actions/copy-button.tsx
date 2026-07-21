"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { stopInteractivePropagation } from "@/lib/utils"

export type CopyButtonProps = Omit<React.ComponentProps<typeof Button>, "onClick"> & {
  value: string
  copiedLabel?: React.ReactNode
  copyLabel?: React.ReactNode
  copiedTimeout?: number
  onCopied?: (value: string) => void
  onCopyError?: (error: unknown) => void
  showIcon?: boolean
  copiedVariant?: React.ComponentProps<typeof Button>["variant"]
}

async function copyToClipboard(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value)
    return
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard is not available")
  }

  const textarea = document.createElement("textarea")
  textarea.value = value
  textarea.setAttribute("readonly", "")
  textarea.style.position = "fixed"
  textarea.style.left = "-9999px"
  document.body.appendChild(textarea)
  textarea.select()

  try {
    document.execCommand("copy")
  } finally {
    document.body.removeChild(textarea)
  }
}

function CopyButton({
  value,
  copiedLabel = "Copied",
  copyLabel = "Copy",
  copiedTimeout = 1600,
  onCopied,
  onCopyError,
  showIcon = true,
  copiedVariant,
  variant,
  disabled,
  children,
  type = "button",
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<number | undefined>(undefined)

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleCopy = React.useCallback(async () => {
    try {
      await copyToClipboard(value)
      setCopied(true)
      onCopied?.(value)

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setCopied(false), copiedTimeout)
    } catch (error) {
      onCopyError?.(error)
    }
  }, [copiedTimeout, onCopied, onCopyError, value])

  const handleButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    stopInteractivePropagation(event)
    void handleCopy()
  }

  return (
    <Button
      data-slot="copy-button"
      data-copied={copied || undefined}
      type={type}
      variant={copied ? (copiedVariant ?? "secondary") : variant}
      disabled={disabled || !value}
      onClick={handleButtonClick}
      onMouseDown={stopInteractivePropagation}
      onDoubleClick={stopInteractivePropagation}
      aria-live="polite"
      {...props}
    >
      {showIcon && (copied ? <CheckIcon data-icon="inline-start" className="size-3.5" /> : <CopyIcon data-icon="inline-start" className="size-3.5" />)}
      {children ?? (copied ? copiedLabel : copyLabel)}
    </Button>
  )
}

export { CopyButton }
