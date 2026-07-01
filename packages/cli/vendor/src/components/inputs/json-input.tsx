import * as React from "react"

import { cn } from "@/lib/utils"

export type JsonInputProps = Omit<React.ComponentProps<"textarea">, "onChange"> & {
  value?: string
  onValueChange?: (value: string, parsed: unknown | null, valid: boolean) => void
  invalidText?: React.ReactNode
}

function JsonInput({ value = "", onValueChange, invalidText = "Invalid JSON", className, ...props }: JsonInputProps) {
  const [valid, setValid] = React.useState(true)

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const nextValue = event.target.value
    try {
      const parsed = nextValue.trim() ? JSON.parse(nextValue) : null
      setValid(true)
      onValueChange?.(nextValue, parsed, true)
    } catch {
      setValid(false)
      onValueChange?.(nextValue, null, false)
    }
  }

  return (
    <div data-slot="json-input" className="grid gap-1.5">
      <textarea value={value} spellCheck={false} className={cn("min-h-32 rounded-md border bg-background p-3 font-mono text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring", !valid && "border-destructive", className)} onChange={handleChange} {...props} />
      {!valid && <p className="text-sm text-destructive">{invalidText}</p>}
    </div>
  )
}

export { JsonInput }
