"use client"

import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { InputDecorator } from "./decorator"

export type PasswordInputProps = Omit<
  React.ComponentProps<typeof InputDecorator>,
  "type" | "value" | "onChange"
> & {
  value?: string | null
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: string) => void
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
  showToggle?: boolean
  showCapsLockWarning?: boolean
  capsLockLabel?: string
  wrapperClassName?: string
  inputClassName?: string
  showLabel?: string
  hideLabel?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      value,
      onChange,
      onValueChange,
      visible,
      defaultVisible = false,
      onVisibleChange,
      showToggle = true,
      showCapsLockWarning = true,
      capsLockLabel = "Caps Lock is on",
      showLabel = "Show password",
      hideLabel = "Hide password",
      disabled,
      autoComplete = "current-password",
      trailing,
      onKeyDown,
      onKeyUp,
      ...props
    },
    ref
  ) => {
    const isControlled = visible !== undefined
    const [internalVisible, setInternalVisible] = React.useState(defaultVisible)
    const [capsLockOn, setCapsLockOn] = React.useState(false)
    const currentVisible = isControlled ? visible : internalVisible

    const setVisibleState = (nextVisible: boolean) => {
      if (!isControlled) {
        setInternalVisible(nextVisible)
      }

      onVisibleChange?.(nextVisible)
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      onChange?.(event)
      onValueChange?.(event.target.value)
    }

    const updateCapsLock = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showCapsLockWarning) return
      setCapsLockOn(event.getModifierState("CapsLock"))
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      updateCapsLock(event)
      onKeyDown?.(event)
    }

    const handleKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
      updateCapsLock(event)
      onKeyUp?.(event)
    }

    const trailingContent = (
      <>
        {trailing}
        {showCapsLockWarning && capsLockOn ? (
          <span data-slot="password-caps-lock" className="hidden text-xs text-amber-600 sm:inline" aria-live="polite">
            {capsLockLabel}
          </span>
        ) : null}
        {showToggle ? (
          <button
            type="button"
            disabled={disabled}
            aria-label={currentVisible ? hideLabel : showLabel}
            className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            onClick={() => setVisibleState(!currentVisible)}
          >
            {currentVisible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
          </button>
        ) : null}
      </>
    )

    return (
      <InputDecorator
        data-slot="password-input"
        ref={ref}
        type={currentVisible ? "text" : "password"}
        value={value ?? ""}
        disabled={disabled}
        autoComplete={autoComplete}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        trailingAction={trailingContent}
        {...props}
      />
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
