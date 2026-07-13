import * as React from "react"
import { QRCode } from "@/index"

export function QRCodeShowcase() {
  const [value, setValue] = React.useState("https://tembro.dev/components/qr-code")
  return (
    <div className="mx-auto grid max-w-sm justify-items-center gap-4">
      <QRCode value={value} size={184} errorCorrectionLevel="H" />
      <input aria-label="QR code value" value={value} className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" onChange={(event) => setValue(event.target.value)} />
    </div>
  )
}
