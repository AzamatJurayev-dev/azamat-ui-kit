"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type JsonInputProps = React.ComponentProps<"textarea"> & {
  value?: string
  onValueChange?: (value: string, parsed: unknown | null, valid: boolean) => void
  invalidText?: React.ReactNode
}

function parseJson(value: string) {
  if (!value.trim()) return { parsed: null, valid: true }

  try {
    return { parsed: JSON.parse(value), valid: true }
  } catch {
    return { parsed: null, valid: false }
  }
}

function JsonInput({ value = "", onValueChange, invalidText = "Invalid JSON", className, onChange, ...props }: JsonInputProps) {
  const [valid, setValid] = React.useState(true)

  React.useEffect(() => {
    setValid(parseJson(value).valid)
  }, [value])

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = event.target.value
    const result = parseJson(nextValue)
    setValid(result.valid)
    onValueChange?.(nextValue, result.parsed, result.valid)
    onChange?.(event)
  }

  return (
    <div data-slot="json-input" className="grid gap-1.5">
      <textarea value={value} spellCheck={false} className={cn("min-h-32 rounded-md border bg-background p-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring", !valid && "border-destructive", className)} onChange={handleChange} {...props} />
      {!valid && <p className="text-sm text-destructive">{invalidText}</p>}
    </div>
  )
}

export { JsonInput }
