"use client"

import * as React from "react"
import type { QRCodeErrorCorrectionLevel } from "qrcode"

import { cn } from "@/lib/utils"

export type QRCodeProps = Omit<React.ComponentProps<"div">, "children"> & {
  value: string
  src?: string
  alt?: string
  size?: number
  margin?: number
  errorCorrectionLevel?: QRCodeErrorCorrectionLevel
  foreground?: string
  background?: string
  loadingFallback?: React.ReactNode
  errorFallback?: React.ReactNode
  onError?: (error: Error) => void
}

function QRCode({
  value,
  src,
  alt,
  size = 160,
  margin = 2,
  errorCorrectionLevel = "M",
  foreground = "#111827",
  background = "#ffffff",
  loadingFallback = "Generating QR code...",
  errorFallback = "QR code could not be generated.",
  onError,
  className,
  ...props
}: QRCodeProps) {
  const [svg, setSvg] = React.useState("")
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    if (src) return
    let active = true
    setSvg("")
    setError(null)

    import("qrcode")
      .then((module) => {
        const moduleValue = module as typeof import("qrcode") & { default?: typeof import("qrcode") }
        const encoder = moduleValue.default?.toString ? moduleValue.default : moduleValue
        return encoder.toString(value, {
          type: "svg",
          width: size,
          margin,
          errorCorrectionLevel,
          color: { dark: foreground, light: background },
        })
      })
      .then((nextSvg) => {
        if (active) setSvg(nextSvg)
      })
      .catch((reason: unknown) => {
        if (!active) return
        const nextError = reason instanceof Error ? reason : new Error("QR code generation failed")
        setError(nextError)
        onError?.(nextError)
      })

    return () => {
      active = false
    }
  }, [background, errorCorrectionLevel, foreground, margin, onError, size, src, value])

  return (
    <div
      data-slot="qr-code"
      data-state={error ? "error" : src || svg ? "ready" : "loading"}
      className={cn("inline-grid place-items-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      {src ? (
        <img src={src} alt={alt ?? value} width={size} height={size} className="size-full object-contain" />
      ) : error ? (
        <div role="alert" className="p-3 text-center text-xs text-destructive">{errorFallback}</div>
      ) : svg ? (
        <div
          role="img"
          aria-label={alt ?? `QR code for ${value}`}
          className="size-full [&>svg]:size-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <div role="status" className="p-3 text-center text-xs text-muted-foreground">{loadingFallback}</div>
      )}
    </div>
  )
}

const QRCodeSvg = QRCode

export { QRCode, QRCodeSvg }
