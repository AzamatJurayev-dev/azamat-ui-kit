import * as React from "react"

const DEFAULT_MOBILE_BREAKPOINT = 768

function useIsMobile(breakpoint = DEFAULT_MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const query = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)

    const update = () => {
      setIsMobile(query.matches)
    }

    update()
    query.addEventListener("change", update)

    return () => {
      query.removeEventListener("change", update)
    }
  }, [breakpoint])

  return isMobile
}

export { useIsMobile, DEFAULT_MOBILE_BREAKPOINT }
