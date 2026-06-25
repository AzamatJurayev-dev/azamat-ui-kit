import * as React from "react"

import {
  Input,
  type InputKind,
  type InputProps,
} from "@/components/ui/input"

export type AppInputKind = InputKind
export type AppInputProps = InputProps
export type UniversalInputProps = InputProps

/**
 * @deprecated Use {@link Input} with `kind` instead.
 */
const AppInput = React.forwardRef<HTMLInputElement | HTMLDivElement, AppInputProps>((props, ref) => {
  return <Input ref={ref as React.ForwardedRef<HTMLInputElement | HTMLDivElement>} {...props} />
})
AppInput.displayName = "AppInput"

/**
 * @deprecated Use {@link Input} with `kind` instead.
 */
const UniversalInput = AppInput

export { AppInput, UniversalInput }

