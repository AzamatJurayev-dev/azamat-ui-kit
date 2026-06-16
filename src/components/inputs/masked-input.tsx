import * as React from "react"

import { Input } from "@/components/ui/input"

export type MaskedInputProps = Omit<
  React.ComponentProps<typeof Input>,
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

      event.target.value = maskedValue
      onChange?.(event)
      onValueChange?.(maskedValue, rawValue)
    }

    return <Input ref={ref} value={value ?? ""} onChange={handleChange} {...props} />
  }
)
MaskedInput.displayName = "MaskedInput"

export { MaskedInput }
