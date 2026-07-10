"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type OtpInputProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  length?: number
  disabled?: boolean
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  pattern?: string
  mask?: boolean
  labels?: {
    group?: string
    cell?: (index: number) => string
  }
}

function OtpInput({
  value,
  defaultValue = "",
  onValueChange,
  length = 6,
  disabled = false,
  inputMode = "numeric",
  pattern = "[0-9]*",
  mask = false,
  labels,
  className,
  ...props
}: OtpInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue.slice(0, length))
  const currentValue = (value ?? internalValue).slice(0, length)
  const inputRefs = React.useRef<Array<HTMLInputElement | null>>([])

  const updateValue = (nextValue: string) => {
    const trimmedValue = nextValue.slice(0, length)
    if (value === undefined) setInternalValue(trimmedValue)
    onValueChange?.(trimmedValue)
  }

  const setCharAt = (index: number, nextChar: string) => {
    const chars = String(Array.isArray(currentValue) ? currentValue.join("") : currentValue).padEnd(length, " ").split("")
    chars[index] = nextChar.slice(-1)
    updateValue(chars.join("").replace(/\s+$/g, ""))
  }

  const focusIndex = (index: number) => {
    inputRefs.current[Math.max(0, Math.min(index, length - 1))]?.focus()
  }

  return (
    <div
      data-slot="otp-input"
      role="group"
      aria-label={labels?.group ?? "One-time password"}
      className={cn("flex items-center gap-2", className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(node) => {
            inputRefs.current[index] = node
          }}
          aria-label={labels?.cell?.(index) ?? `Digit ${index + 1}`}
          inputMode={inputMode}
          pattern={pattern}
          type={mask ? "password" : "text"}
          autoComplete="one-time-code"
          maxLength={1}
          disabled={disabled}
          value={currentValue[index] ?? ""}
          className="flex size-10 rounded-md border bg-background text-center text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          onChange={(event) => {
            const nextChar = event.currentTarget.value
            setCharAt(index, nextChar)
            if (nextChar) focusIndex(index + 1)
          }}
          onKeyDown={(event) => {
            if (event.key === "Backspace" && !currentValue[index]) {
              event.preventDefault()
              focusIndex(index - 1)
              setCharAt(index - 1, "")
            }
            if (event.key === "ArrowLeft") focusIndex(index - 1)
            if (event.key === "ArrowRight") focusIndex(index + 1)
          }}
          onPaste={(event) => {
            event.preventDefault()
            const pasted = event.clipboardData.getData("text").trim()
            updateValue(pasted)
            focusIndex(Math.min(pasted.length, length - 1))
          }}
        />
      ))}
    </div>
  )
}

export { OtpInput }
