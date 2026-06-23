import * as React from "react"
import { CalendarDaysIcon } from "lucide-react"

import { InputDecorator } from "@/components/inputs/input-decorator"
import { createInputChangeHandler, getInputValue } from "@/components/inputs/input-value"

export type DateInputProps = Omit<
  React.ComponentProps<typeof InputDecorator>,
  "type" | "value" | "onChange"
> & {
  value?: string | null
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string) => void
  showIcon?: boolean
  icon?: React.ReactNode
}

const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onChange, onValueChange, showIcon = true, icon, leading, ...props }, ref) => {
    const handleChange = createInputChangeHandler({ onChange, onValueChange })

    return (
      <InputDecorator
        ref={ref}
        type="date"
        value={getInputValue(value)}
        leading={showIcon ? icon ?? leading ?? <CalendarDaysIcon /> : leading}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
DateInput.displayName = "DateInput"

export { DateInput }
