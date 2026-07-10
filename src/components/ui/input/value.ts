import * as React from "react"

type InputValue = string | number | null | undefined

type CreateInputChangeHandlerOptions<TValue> = {
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onValueChange?: (value: TValue) => void
  mapValue?: (rawValue: string, event: React.ChangeEvent<HTMLInputElement>) => TValue
}

function getInputValue(value: InputValue) {
  return value == null ? "" : String(value)
}

function setInputElementValue(
  event: React.ChangeEvent<HTMLInputElement>,
  value: string
) {
  event.target.value = value
  event.currentTarget.value = value
}

function createInputChangeHandler<TValue = string>({
  onChange,
  onValueChange,
  mapValue,
}: CreateInputChangeHandlerOptions<TValue>) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event)

    if (!onValueChange) return

    const rawValue = event.target.value
    const nextValue = mapValue
      ? mapValue(rawValue, event)
      : (rawValue as TValue)

    onValueChange(nextValue)
  }
}

export { createInputChangeHandler, getInputValue, setInputElementValue }
