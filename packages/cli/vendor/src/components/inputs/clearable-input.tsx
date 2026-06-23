import * as React from "react"
import { XIcon } from "lucide-react"

import { InputDecorator } from "@/components/inputs/input-decorator"
import { createInputChangeHandler, getInputValue } from "@/components/inputs/input-value"

export type ClearableInputProps = Omit<
  React.ComponentProps<typeof InputDecorator>,
  "value" | "onChange"
> & {
  value?: string | number | null
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string) => void
  onClear?: () => void
  clearable?: boolean
  clearLabel?: string
  leadingIcon?: React.ReactNode
  trailing?: React.ReactNode
  wrapperClassName?: string
  inputClassName?: string
}

const ClearableInput = React.forwardRef<HTMLInputElement, ClearableInputProps>(
  (
    {
      value,
      onChange,
      onValueChange,
      onClear,
      clearable = true,
      clearLabel = "Clear",
      leadingIcon,
      trailing,
      disabled,
      ...props
    },
    ref
  ) => {
    const stringValue = getInputValue(value)
    const canClear = clearable && stringValue.length > 0 && !disabled
    const handleChange = createInputChangeHandler({ onChange, onValueChange })

    const handleClear = () => {
      onValueChange?.("")
      onClear?.()
    }

    return (
      <InputDecorator
        data-slot="clearable-input"
        ref={ref}
        value={stringValue}
        disabled={disabled}
        onChange={handleChange}
        leading={leadingIcon}
        trailing={
          <>
            {trailing}
            {canClear && (
              <button
                type="button"
                aria-label={clearLabel}
                className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={handleClear}
              >
                <XIcon className="size-4" />
              </button>
            )}
          </>
        }
        {...props}
      />
    )
  }
)
ClearableInput.displayName = "ClearableInput"

export { ClearableInput }
