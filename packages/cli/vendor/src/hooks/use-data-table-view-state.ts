import * as React from "react"

export type DataTableViewStorage = "local" | "session" | "memory"

export type UseDataTableViewStateOptions<TValue extends string> = {
  key: string
  defaultValue?: TValue
  allowedValues?: readonly TValue[]
  storage?: DataTableViewStorage
  syncAcrossTabs?: boolean
  serialize?: (value: TValue) => string
  deserialize?: (value: string) => TValue
  onValueChange?: (value: TValue | undefined) => void
}

export type UseDataTableViewStateReturn<TValue extends string> = {
  value: TValue | undefined
  setValue: (value: TValue | undefined) => void
  clearValue: () => void
  resetValue: () => void
  isDefaultValue: boolean
}

const defaultSerialize = <TValue extends string>(value: TValue) => value
const defaultDeserialize = <TValue extends string>(value: string) => value as TValue

function getStorage(storage: DataTableViewStorage) {
  if (typeof window === "undefined" || storage === "memory") return undefined
  return storage === "local" ? window.localStorage : window.sessionStorage
}

function isAllowedValue<TValue extends string>(
  value: TValue | undefined,
  allowedValues?: readonly TValue[]
) {
  if (value === undefined) return true
  if (!allowedValues?.length) return true
  return allowedValues.includes(value)
}

function useDataTableViewState<TValue extends string>({
  key,
  defaultValue,
  allowedValues,
  storage = "local",
  syncAcrossTabs = true,
  serialize = defaultSerialize,
  deserialize = defaultDeserialize,
  onValueChange,
}: UseDataTableViewStateOptions<TValue>): UseDataTableViewStateReturn<TValue> {
  const readValue = React.useCallback(() => {
    const fallbackValue = isAllowedValue(defaultValue, allowedValues) ? defaultValue : undefined
    const targetStorage = getStorage(storage)

    if (!targetStorage) return fallbackValue

    try {
      const storedValue = targetStorage.getItem(key)
      if (!storedValue) return fallbackValue

      const parsedValue = deserialize(storedValue)
      return isAllowedValue(parsedValue, allowedValues) ? parsedValue : fallbackValue
    } catch {
      return fallbackValue
    }
  }, [allowedValues, defaultValue, deserialize, key, storage])

  const [value, setInternalValue] = React.useState<TValue | undefined>(readValue)

  const setValue = React.useCallback(
    (nextValue: TValue | undefined) => {
      const normalizedValue = isAllowedValue(nextValue, allowedValues) ? nextValue : undefined
      const targetStorage = getStorage(storage)

      setInternalValue(normalizedValue)

      if (targetStorage) {
        try {
          if (normalizedValue === undefined) {
            targetStorage.removeItem(key)
          } else {
            targetStorage.setItem(key, serialize(normalizedValue))
          }
        } catch {
          // Ignore storage failures. State still updates in memory.
        }
      }

      onValueChange?.(normalizedValue)
    },
    [allowedValues, key, onValueChange, serialize, storage]
  )

  const clearValue = React.useCallback(() => setValue(undefined), [setValue])
  const resetValue = React.useCallback(() => setValue(defaultValue), [defaultValue, setValue])

  React.useEffect(() => {
    setInternalValue(readValue())
  }, [readValue])

  React.useEffect(() => {
    if (!syncAcrossTabs || storage !== "local" || typeof window === "undefined") return undefined

    const handleStorage = (event: StorageEvent) => {
      if (event.storageArea !== window.localStorage || event.key !== key) return
      setInternalValue(readValue())
    }

    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [key, readValue, storage, syncAcrossTabs])

  return {
    value,
    setValue,
    clearValue,
    resetValue,
    isDefaultValue: value === defaultValue,
  }
}

export { useDataTableViewState }
