const warnedDeprecatedComponents = new Set<string>()

export function warnDeprecatedComponent(name: string, replacement: string) {
  if (process.env.NODE_ENV === "production") return

  if (warnedDeprecatedComponents.has(name)) return

  warnedDeprecatedComponents.add(name)
  if (console?.warn) {
    console.warn(
      `[azamat-ui-kit] ${name} is deprecated. ${replacement} This alias is kept for compatibility only.`
    )
  }
}

