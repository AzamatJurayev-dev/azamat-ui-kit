import * as React from "react"

function useDebouncedValue<TValue>(value: TValue, delay = 300) {
  const [debouncedValue, setDebouncedValue] = React.useState(value)

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      window.clearTimeout(timer)
    }
  }, [delay, value])

  return debouncedValue
}

function useDebouncedCallback<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delay = 300
) {
  const callbackRef = React.useRef(callback)
  const timerRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  React.useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  return React.useCallback(
    (...args: TArgs) => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }

      timerRef.current = window.setTimeout(() => {
        callbackRef.current(...args)
      }, delay)
    },
    [delay]
  )
}

export { useDebouncedCallback, useDebouncedValue }
