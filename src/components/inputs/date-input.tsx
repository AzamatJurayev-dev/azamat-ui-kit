import * as React from "react"

import { createInputChangeHandler, getInputValue } from "@/components/inputs/input-value"
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
    const handleChange = createInputChangeHandler({ onChange, onValueChange })

    return (
      <Input
        ref={ref}
        type="date"
        value={getInputValue(value)}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
DateInput.displayName = "DateInput"

export { DateInput }
