import * as React from "react"

import { cn } from "@/lib/utils"

export type JsonInputProps = Omit<React.ComponentProps<"textarea">, "value" | "defaultValue"> & {
  value?: string
  defaultValue?: string
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

function JsonInput({ value: valueProp, defaultValue = "", onValueChange, invalidText = "Invalid JSON", className, onChange, ...props }: JsonInputProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const value = valueProp ?? internalValue
  const valid = parseJson(value).valid

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = event.target.value
    const result = parseJson(nextValue)
    if (valueProp === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue, result.parsed, result.valid)
    onChange?.(event)
  }

  return (
    <div data-slot="json-input" className="grid gap-1.5">
      <textarea
        value={value}
        spellCheck={false}
        aria-invalid={valid ? undefined : true}
        className={cn("min-h-32 rounded-md border bg-background p-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring", !valid && "border-destructive", className)}
        onChange={handleChange}
        {...props}
      />
      {!valid && <p role="alert" className="text-sm text-destructive">{invalidText}</p>}
    </div>
  )
}

export { JsonInput }
