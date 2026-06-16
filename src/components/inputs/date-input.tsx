import * as React from "react"

import { Input } from "@/components/ui/input"

export type DateInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "value" | "onChange"
> & {
  value?: string | null
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string) => void
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onChange, onValueChange, ...props }, ref) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(event)
      onValueChange?.(event.target.value)
    }

    return (
      <Input
        ref={ref}
        type="date"
        value={value ?? ""}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
DateInput.displayName = "DateInput"

export { DateInput }
