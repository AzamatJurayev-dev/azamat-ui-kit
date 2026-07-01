import * as React from "react"

import { cn } from "@/lib/utils"

export type QRCodeProps = React.ComponentProps<"div"> & {
  value: string
  src?: string
  alt?: string
  size?: number
}

function QRCode({ value, src, alt, size = 160, className, ...props }: QRCodeProps) {
  return (
    <div data-slot="qr-code" className={cn("inline-flex flex-col items-center gap-2 rounded-xl border bg-background p-3", className)} {...props}>
      {src ? (
        <img src={src} alt={alt ?? value} width={size} height={size} className="rounded-md" />
      ) : (
        <div className="grid place-items-center rounded-md border bg-muted text-center text-xs text-muted-foreground" style={{ width: size, height: size }} aria-label={alt ?? value}>
          QR image source required
        </div>
      )}
    </div>
  )
}

export { QRCode }
