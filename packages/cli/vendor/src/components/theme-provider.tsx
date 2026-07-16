"use client"

import * as React from "react"

type ThemeMode = "light" | "dark" | "system"
type ResolvedThemeMode = "light" | "dark"

type ThemeContextValue = {
  theme: ThemeMode
  resolvedTheme: ResolvedThemeMode
  mounted: boolean
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

const THEME_STORAGE_KEY = "tembro-theme"

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ResolvedThemeMode {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "system"

  const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (stored === "light" || stored === "dark" || stored === "system") return stored

  return "system"
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeMode>(resolveInitialTheme)
  const [mounted, setMounted] = React.useState(false)
  const [systemTheme, setSystemTheme] = React.useState<ResolvedThemeMode>(getSystemTheme)
  const resolvedTheme = theme === "system" ? systemTheme : theme

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const updateSystemTheme = () => setSystemTheme(media.matches ? "dark" : "light")

    updateSystemTheme()
    media.addEventListener("change", updateSystemTheme)
    return () => media.removeEventListener("change", updateSystemTheme)
  }, [])

  React.useEffect(() => {
    const root = window.document.documentElement
    root.classList.toggle("dark", resolvedTheme === "dark")
    root.style.colorScheme = resolvedTheme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [resolvedTheme, theme])

  const setTheme = React.useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setThemeState((current) => (current === "system" ? "dark" : current === "dark" ? "light" : "system"))
  }, [])

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, mounted, setTheme, toggleTheme }),
    [mounted, resolvedTheme, setTheme, theme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
