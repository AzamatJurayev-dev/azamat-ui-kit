import * as React from "react"

import { Input } from "@/components/ui/input"

export type CalendarProps = Omit<React.ComponentProps<typeof Input>, "type" | "onChange"> & {
  value?: string
  onValueChange?: (value: string) => void
}

function Calendar({ value, onValueChange, ...props }: CalendarProps) {
  return (
    <Input
      type="date"
      value={value ?? ""}
      onChange={(event) => onValueChange?.(event.target.value)}
      {...props}
    />
  )
}

export { Calendar }
