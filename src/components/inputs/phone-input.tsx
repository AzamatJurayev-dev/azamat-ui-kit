import * as React from "react"

import { MaskedInput, type MaskedInputProps } from "@/components/inputs/masked-input"

export type PhoneInputProps = Omit<MaskedInputProps, "mask" | "unmask" | "inputMode"> & {
  countryCode?: string
  maxDigits?: number
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "")
}

function formatPhoneDigits(digits: string, countryCode = "+998", maxDigits = 12) {
  const normalized = onlyDigits(digits).slice(0, maxDigits)
  const countryDigits = countryCode.replace(/\D/g, "")
  const withoutCountry = normalized.startsWith(countryDigits)
    ? normalized.slice(countryDigits.length)
    : normalized

  const part1 = withoutCountry.slice(0, 2)
  const part2 = withoutCountry.slice(2, 5)
  const part3 = withoutCountry.slice(5, 7)
  const part4 = withoutCountry.slice(7, 9)
  const parts = [part1, part2, part3, part4].filter(Boolean)

  return [countryCode, ...parts].join(" ").trim()
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ countryCode = "+998", maxDigits = 12, onValueChange, ...props }, ref) => {
    return (
      <MaskedInput
        ref={ref}
        inputMode="tel"
        mask={(rawValue) => formatPhoneDigits(rawValue, countryCode, maxDigits)}
        unmask={onlyDigits}
        onValueChange={(maskedValue, rawValue) => onValueChange?.(maskedValue, rawValue)}
        {...props}
      />
    )
  }
)
PhoneInput.displayName = "PhoneInput"

export { PhoneInput, formatPhoneDigits, onlyDigits }
