import * as React from "react"

import { Button, QRCode } from "@/index"

const urls = ["https://azamat-ui.vercel.app", "https://github.com", "mailto:hello@example.com"]

export function QRCodeShowcase() {
  const [index, setIndex] = React.useState(0)
  const value = urls[index % urls.length]

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Button size="sm" onClick={() => setIndex((value) => (value + 1) % urls.length)}>
          Next payload
        </Button>
      </div>
      <QRCode value={value} alt={value} size={176} />
      <p className="text-xs text-muted-foreground">Payload: {value}</p>
    </div>
  )
}

