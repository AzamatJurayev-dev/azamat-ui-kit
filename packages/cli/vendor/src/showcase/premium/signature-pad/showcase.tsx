import * as React from "react"

import { SignaturePad, type SignatureStroke } from "@/index"

export function SignaturePadShowcase() {
  const [strokes, setStrokes] = React.useState<SignatureStroke[]>([])

  return (
    <div className="mx-auto grid w-full max-w-xl gap-3">
      <SignaturePad value={strokes} onValueChange={setStrokes} />
      <p className="text-sm text-muted-foreground">{strokes.length} stroke{strokes.length === 1 ? "" : "s"} captured</p>
    </div>
  )
}
