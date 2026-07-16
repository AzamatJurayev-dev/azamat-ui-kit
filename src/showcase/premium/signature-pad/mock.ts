import type { ComponentDemoMock } from "../types"

export const signaturePadMock: ComponentDemoMock = {
  code: `import { SignaturePad } from "tembro"

export function Example() {
  return (
    <SignaturePad
      onValueChange={(strokes) => console.log(strokes)}
      onStrokeEnd={(stroke) => console.log(stroke)}
    />
  )
}`,
  cliCommand: "npx tembro add signature-pad",
  highlights: ["Controlled normalized stroke data", "Undo, clear, pointer capture, and PNG export API"],
  scenarios: [
    { title: "Approval flow", description: "Capture a signature without coupling form state to canvas pixels." },
    { title: "Delivery proof", description: "Store normalized strokes or export the rendered signature as PNG." },
  ],
}
