import type { ComponentDemoMock } from "../types"

export const colorPickerMock: ComponentDemoMock = {
  code: `import { ColorPicker } from "tembro"

export function Example() {
  return (
    <ColorPicker
      label="Brand color"
      defaultValue="#2563ebcc"
      showAlpha
    />
  )
}`,
  cliCommand: "npx tembro add color-picker",
  highlights: ["Controlled HEX and alpha value", "Keyboard-editable input and accessible swatches"],
  scenarios: [
    { title: "Brand settings", description: "Choose and validate theme colors with reusable presets." },
    { title: "Design tools", description: "Edit opaque or alpha-aware colors through one value contract." },
  ],
}
