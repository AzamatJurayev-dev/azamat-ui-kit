import type { ComponentDemoMock } from "../types"

export const otpInputMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { OtpInput } from "@azamatjurayevdev/azix-ui"

export function Example() {
  const [code, setCode] = React.useState("")

  return (
    <OtpInput
      value={code}
      onValueChange={setCode}
      length={6}
    />
  )
}`,
  highlights: ["Fixed-length code entry", "Auto-advance focus", "Paste handling", "Good for 2FA and verification flows"],
  scenarios: [
    { title: "Login verification", description: "Capture a 2FA code without forcing users through one input character at a time manually." },
    { title: "Sensitive action confirm", description: "Verify a short access code before dangerous changes." },
    { title: "Invite acceptance", description: "Handle compact confirmation codes in onboarding flows." },
  ],
  capabilityNotes: [
    "OTP is for short fixed codes, not general PIN builders with complex rules.",
    "Paste support matters because users often copy codes from mail or authenticator apps.",
    "Keep the surrounding copy minimal and precise.",
  ],
}
