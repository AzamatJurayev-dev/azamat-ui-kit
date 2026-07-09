import * as React from "react"

import { InputDecorator } from "./decorator"
import { getInputValue, setInputElementValue } from "./value"

export type MaskedInputProps = Omit<
  React.ComponentProps<typeof InputDecorator>,
  "value" | "onChange"
> & {
  value?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string, rawValue: string) => void
  mask?: (rawValue: string) => string
  unmask?: (maskedValue: string) => string
}

function defaultMask(value: string) {
  return value
}

function defaultUnmask(value: string) {
  return value
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  (
    {
      value,
      onChange,
      onValueChange,
      mask = defaultMask,
      unmask = defaultUnmask,
      ...props
    },
    ref
  ) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const rawValue = unmask(event.target.value)
      const maskedValue = mask(rawValue)

      setInputElementValue(event, maskedValue)
      onChange?.(event)
      onValueChange?.(maskedValue, rawValue)
    }

    return <InputDecorator ref={ref} value={getInputValue(value)} onChange={handleChange} {...props} />
  }
)
MaskedInput.displayName = "MaskedInput"

export { MaskedInput }
