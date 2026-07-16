import * as React from "react"
import { ImageCropper } from "@/index"

const demoImage = "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"

export function ImageCropperShowcase() {
  const [cropSummary, setCropSummary] = React.useState("Move or zoom the image")
  return (
    <div className="grid gap-3">
      <ImageCropper src={demoImage} aspect={16 / 9} onCropComplete={(_, pixels) => setCropSummary(`${Math.round(pixels.width)} × ${Math.round(pixels.height)} px`)} />
      <p className="text-xs text-muted-foreground">Crop: {cropSummary}</p>
    </div>
  )
}
