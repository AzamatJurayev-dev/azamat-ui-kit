import * as React from "react"

import { ColorPicker } from "@/index"

export function ColorPickerShowcase() {
  const [color, setColor] = React.useState("#2563ebcc")

  return (
    <div className="mx-auto grid w-full max-w-sm gap-3">
      <ColorPicker label="Brand color" value={color} onValueChange={setColor} showAlpha />
      <code className="text-sm text-muted-foreground">{color}</code>
    </div>
  )
}
