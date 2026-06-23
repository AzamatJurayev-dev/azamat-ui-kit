import * as React from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { InputDecorator } from "@/components/inputs/input-decorator"

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
      showLabel = "Show password",
      hideLabel = "Hide password",
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = visible !== undefined
    const [internalVisible, setInternalVisible] = React.useState(defaultVisible)
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

    return (
      <InputDecorator
        data-slot="password-input"
        ref={ref}
        type={currentVisible ? "text" : "password"}
        value={value ?? ""}
        disabled={disabled}
        onChange={handleChange}
        trailing={
          showToggle ? (
            <button
              type="button"
              disabled={disabled}
              aria-label={currentVisible ? hideLabel : showLabel}
              className="rounded-sm p-0.5 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              onClick={() => setVisibleState(!currentVisible)}
            >
              {currentVisible ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
            </button>
          ) : null
        }
        {...props}
      />
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
