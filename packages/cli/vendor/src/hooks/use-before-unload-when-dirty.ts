import * as React from "react"

function useBeforeUnloadWhenDirty(isDirty: boolean, message = "Changes you made may not be saved.") {
  React.useEffect(() => {
    if (!isDirty) return

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = message
      return message
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isDirty, message])
}

export { useBeforeUnloadWhenDirty }
