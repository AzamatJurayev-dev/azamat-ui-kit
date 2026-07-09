function clampNumericValue(value: number, min?: number, max?: number) {
  let nextValue = value

  if (typeof min === "number") nextValue = Math.max(nextValue, min)
  if (typeof max === "number") nextValue = Math.min(nextValue, max)

  return nextValue
}

function normalizeDecimalInput(value: string) {
  return value.trim().replace(/\s/g, "").replace(/,/g, ".")
}

function parseNormalizedNumber(value: string) {
  if (!value || value === "-" || value === "." || value === "-.") {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function parseDecimalInput(value: string) {
  return parseNormalizedNumber(normalizeDecimalInput(value))
}

function parseMoneyLikeInput(value: string) {
  return parseNormalizedNumber(
    normalizeDecimalInput(value).replace(/[^0-9.-]/g, "")
  )
}

export {
  clampNumericValue,
  normalizeDecimalInput,
  parseDecimalInput,
  parseMoneyLikeInput,
  parseNormalizedNumber,
}
