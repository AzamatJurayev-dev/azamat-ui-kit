"use client"

import * as React from "react"

export type ThemeName = string
export type ThemeMode = ThemeName | "system"
export type ThemeColorScheme = "light" | "dark"

export type ThemeProviderProps = {
  children: React.ReactNode
  themes?: ThemeName[]
  defaultTheme?: ThemeMode
  forcedTheme?: ThemeName
  storageKey?: string
  enableSystem?: boolean
  attribute?: "class" | "data-theme" | "both"
  colorSchemes?: Record<ThemeName, ThemeColorScheme>
  disableTransitionOnChange?: boolean
  onThemeChange?: (theme: ThemeMode, resolvedTheme: ThemeName) => void
}

type ThemeContextValue = {
  theme: ThemeMode
  resolvedTheme: ThemeName
  systemTheme: ThemeColorScheme
  themes: ThemeName[]
  mounted: boolean
  setTheme: (theme: ThemeMode) => void
  toggleTheme: () => void
}

const THEME_STORAGE_KEY = "tembro-theme"
const defaultThemes = ["light", "dark"]
const defaultColorSchemes: Record<string, ThemeColorScheme> = { light: "light", dark: "dark", dim: "dark" }

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function getSystemTheme(): ThemeColorScheme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeProvider({
  children,
  themes = defaultThemes,
  defaultTheme = "system",
  forcedTheme,
  storageKey = THEME_STORAGE_KEY,
  enableSystem = true,
  attribute = "both",
  colorSchemes = defaultColorSchemes,
  disableTransitionOnChange = true,
  onThemeChange,
}: ThemeProviderProps) {
  const availableThemes = React.useMemo(() => Array.from(new Set(themes.length ? themes : defaultThemes)), [themes])
  const [theme, setThemeState] = React.useState<ThemeMode>(() => {
    if (typeof window === "undefined") return defaultTheme
    const stored = window.localStorage.getItem(storageKey)
    if (stored === "system" && enableSystem) return stored
    if (stored && availableThemes.includes(stored)) return stored
    return defaultTheme
  })
  const [mounted, setMounted] = React.useState(false)
  const [systemTheme, setSystemTheme] = React.useState<ThemeColorScheme>(getSystemTheme)
  const appliedClassRef = React.useRef<string | undefined>(undefined)
  const activeTheme = forcedTheme ?? theme
  const resolvedTheme = activeTheme === "system"
    ? (availableThemes.includes(systemTheme) ? systemTheme : availableThemes[0] ?? "light")
    : activeTheme
  const colorScheme = colorSchemes[resolvedTheme] ?? defaultColorSchemes[resolvedTheme] ?? (resolvedTheme === "dark" ? "dark" : "light")

  React.useEffect(() => { setMounted(true) }, [])

  React.useEffect(() => {
    if (!enableSystem) return
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const updateSystemTheme = () => setSystemTheme(media.matches ? "dark" : "light")
    updateSystemTheme()
    media.addEventListener("change", updateSystemTheme)
    return () => media.removeEventListener("change", updateSystemTheme)
  }, [enableSystem])

  React.useEffect(() => {
    const root = window.document.documentElement
    let restoreTransitions: (() => void) | undefined
    if (disableTransitionOnChange) {
      const style = document.createElement("style")
      style.textContent = "*,*::before,*::after{transition:none!important}"
      document.head.append(style)
      void window.getComputedStyle(root).opacity
      restoreTransitions = () => window.setTimeout(() => style.remove(), 0)
    }

    if (attribute === "class" || attribute === "both") {
      if (appliedClassRef.current) root.classList.remove(appliedClassRef.current)
      root.classList.remove("light", "dark")
      root.classList.add(resolvedTheme)
      if (colorScheme === "dark" && resolvedTheme !== "dark") root.classList.add("dark")
      appliedClassRef.current = resolvedTheme
    }
    if (attribute === "data-theme" || attribute === "both") root.dataset.theme = resolvedTheme
    root.style.colorScheme = colorScheme
    if (!forcedTheme) window.localStorage.setItem(storageKey, theme)
    onThemeChange?.(theme, resolvedTheme)
    restoreTransitions?.()
  }, [attribute, colorScheme, disableTransitionOnChange, forcedTheme, onThemeChange, resolvedTheme, storageKey, theme])

  const setTheme = React.useCallback((nextTheme: ThemeMode) => {
    if (nextTheme === "system" ? enableSystem : availableThemes.includes(nextTheme)) setThemeState(nextTheme)
  }, [availableThemes, enableSystem])

  const toggleTheme = React.useCallback(() => {
    const cycle: ThemeMode[] = [...availableThemes, ...(enableSystem ? ["system" as const] : [])]
    setThemeState((current) => cycle[(cycle.indexOf(current) + 1) % cycle.length] ?? availableThemes[0] ?? "light")
  }, [availableThemes, enableSystem])

  const value = React.useMemo<ThemeContextValue>(() => ({ theme, resolvedTheme, systemTheme, themes: availableThemes, mounted, setTheme, toggleTheme }), [availableThemes, mounted, resolvedTheme, setTheme, systemTheme, theme, toggleTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
