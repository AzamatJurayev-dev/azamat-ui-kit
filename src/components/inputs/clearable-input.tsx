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
  clearOnEscape?: boolean
  focusAfterClear?: boolean
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
      clearOnEscape = true,
      focusAfterClear = true,
      leadingIcon,
      trailing,
      disabled,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const stringValue = getInputValue(value)
    const canClear = clearable && stringValue.length > 0 && !disabled
    const handleChange = createInputChangeHandler({ onChange, onValueChange })

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const clearValue = () => {
      if (!canClear) return
      onValueChange?.("")
      onClear?.()
      if (focusAfterClear) inputRef.current?.focus()
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      onKeyDown?.(event)
      if (event.defaultPrevented) return
      if (clearOnEscape && event.key === "Escape" && canClear) {
        event.preventDefault()
        clearValue()
      }
    }

    return (
      <InputDecorator
        data-slot="clearable-input"
        ref={inputRef}
        value={stringValue}
        disabled={disabled}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        leading={leadingIcon}
        trailing={
          <>
            {trailing}
            {canClear && (
              <button
                type="button"
                aria-label={clearLabel}
                className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={clearValue}
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
