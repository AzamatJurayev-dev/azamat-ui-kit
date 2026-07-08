import type { ComponentDemoMock } from "../types"

export const passwordInputMock: ComponentDemoMock = {
  code: `import * as React from "react"
import { PasswordInput } from "tembro"

export function Example() {
  const [value, setValue] = React.useState("")

  return (
    <PasswordInput
      value={value}
      onValueChange={setValue}
      placeholder="Enter workspace password"
      showCapsLockWarning
    />
  )
}`,
  highlights: ["Visibility toggle", "Caps Lock warning support", "Controlled or uncontrolled visibility", "Secure field wrapper without extra composition boilerplate"],
  scenarios: [
    { title: "Login form", description: "Expose visibility toggle in auth screens without building a custom wrapper." },
    { title: "Sensitive confirmation", description: "Require current password before destructive account actions." },
    { title: "Internal admin area", description: "Use in restricted operational tools with direct validation feedback." },
  ],
  capabilityNotes: [
    "Use password input where visibility toggle genuinely reduces user errors.",
    "Keep password actions close to the field, not in a separate row.",
    "Caps Lock warning is helpful for desktop-heavy admin flows.",
  ],
}
