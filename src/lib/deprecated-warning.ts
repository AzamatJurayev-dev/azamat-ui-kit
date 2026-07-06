const warnedDeprecatedComponents = new Set<string>()

export function warnDeprecatedComponent(name: string, replacement: string) {
  const nodeEnv = (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env?.NODE_ENV
  if (nodeEnv === "production") return

  if (warnedDeprecatedComponents.has(name)) return

  warnedDeprecatedComponents.add(name)
  if (console?.warn) {
    console.warn(
      `[azix] ${name} is deprecated. ${replacement} This alias is kept for compatibility only.`
    )
  }
}
