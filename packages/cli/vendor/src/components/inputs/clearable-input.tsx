import * as React from "react"
import { XIcon } from "lucide-react"

import { InputDecorator } from "@/components/inputs/input-decorator"
import { createInputChangeHandler, getInputValue } from "@/components/inputs/input-value"
import { stopInteractivePropagation } from "@/lib/utils"

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
  replaceTrailingWhenClear?: boolean
  leadingIcon?: React.ReactNode
  trailing?: React.ReactNode
  trailingAction?: React.ReactNode
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
      replaceTrailingWhenClear = true,
      leadingIcon,
      trailing,
      trailingAction,
      disabled,
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const stringValue = getInputValue(value)
    const canClear = clearable && stringValue.length > 0 && !disabled && !props.readOnly
    const handleChange = createInputChangeHandler({ onChange, onValueChange })

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    const clearValue = () => {
      if (!canClear) return
      onValueChange?.("")
      onClear?.()
      if (focusAfterClear) inputRef.current?.focus()
    }

    const handleClearClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      stopInteractivePropagation(event)
      clearValue()
    }

    const handleClearMouseDown: React.MouseEventHandler<HTMLButtonElement> = (event) => {
      stopInteractivePropagation(event)
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
        trailing={canClear && replaceTrailingWhenClear ? null : trailing}
        trailingAction={
          <>
            {trailingAction}
            {canClear && (
              <button
                type="button"
                data-slot="clearable-input-clear"
                aria-label={clearLabel}
                className="inline-flex size-7 items-center justify-center rounded-full border border-transparent bg-transparent text-muted-foreground/74 transition hover:border-border/60 hover:bg-muted/58 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/30"
                onClick={handleClearClick}
                onMouseDown={handleClearMouseDown}
                onDoubleClick={handleClearMouseDown}
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
