import * as React from "react"

type SessionStorageOptions<T> = {
  serialize?: (value: T) => string
  deserialize?: (value: string) => T
}

type SetSessionStorageStateAction<T> = T | ((previousValue: T) => T)

const defaultSerialize = JSON.stringify
const defaultDeserialize = JSON.parse

function getInitialValue<T>(initialValue: T | (() => T)) {
  return typeof initialValue === "function"
    ? (initialValue as () => T)()
    : initialValue
}

function useSessionStorageState<T>(
  key: string,
  initialValue: T | (() => T),
  options: SessionStorageOptions<T> = {}
) {
  const { serialize = defaultSerialize, deserialize = defaultDeserialize } = options

  const readValue = React.useCallback(() => {
    const fallbackValue = getInitialValue(initialValue)

    if (typeof window === "undefined") {
      return fallbackValue
    }

    try {
      const item = window.sessionStorage.getItem(key)
      return item ? (deserialize(item) as T) : fallbackValue
    } catch {
      return fallbackValue
    }
  }, [deserialize, initialValue, key])

  const [state, setState] = React.useState<T>(readValue)

  const setValue = React.useCallback(
    (value: SetSessionStorageStateAction<T>) => {
      setState((previousValue) => {
        const nextValue =
          typeof value === "function"
            ? (value as (previousValue: T) => T)(previousValue)
            : value

        if (typeof window !== "undefined") {
          try {
            window.sessionStorage.setItem(key, serialize(nextValue))
          } catch {
            // Ignore storage failures. State still updates in memory.
          }
        }

        return nextValue
      })
    },
    [key, serialize]
  )

  const removeValue = React.useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(key)
      } catch {
        // Ignore storage failures.
      }
    }

    setState(getInitialValue(initialValue))
  }, [initialValue, key])

  React.useEffect(() => {
    setState(readValue())
  }, [readValue])

  return [state, setValue, removeValue] as const
}

export { useSessionStorageState }
export type { SessionStorageOptions, SetSessionStorageStateAction }
