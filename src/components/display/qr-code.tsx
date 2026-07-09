import * as React from "react"

import { cn } from "@/lib/utils"

export type QRCodeProps = React.ComponentProps<"div"> & {
  value: string
  src?: string
  alt?: string
  size?: number
  cells?: number
  visualOnlyLabel?: React.ReactNode
}

function hashValue(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function shouldFillCell(row: number, col: number, seed: number) {
  const finder = (row < 7 && col < 7) || (row < 7 && col > 20) || (row > 20 && col < 7)
  if (finder) return false
  const mixed = Math.imul(row + 17, 73856093) ^ Math.imul(col + 31, 19349663) ^ seed
  return (mixed >>> 0) % 5 < 2
}

function FinderPattern({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="7" height="7" fill="currentColor" />
      <rect x={x + 1} y={y + 1} width="5" height="5" fill="white" />
      <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
    </g>
  )
}

function QRCodeSvg({ value, cells = 29, title }: { value: string; cells?: number; title?: string }) {
  const seed = hashValue(value)
  const viewBox = `0 0 ${cells} ${cells}`
  const rows = Array.from({ length: cells }, (_, row) => row)
  const cols = Array.from({ length: cells }, (_, col) => col)

  return (
    <svg role="img" aria-label={title ?? value} viewBox={viewBox} className="size-full text-foreground" shapeRendering="crispEdges">
      <rect width={cells} height={cells} fill="white" />
      <FinderPattern x={0} y={0} />
      <FinderPattern x={cells - 7} y={0} />
      <FinderPattern x={0} y={cells - 7} />
      {rows.map((row) => cols.map((col) => shouldFillCell(row, col, seed) ? <rect key={`${row}-${col}`} x={col} y={row} width="1" height="1" fill="currentColor" /> : null))}
    </svg>
  )
}

function QRCode({ value, src, alt, size = 160, cells = 29, visualOnlyLabel = "Visual preview only. Provide src from a certified QR encoder for scan-critical use.", className, ...props }: QRCodeProps) {
  return (
    <div data-slot="qr-code" className={cn("inline-flex flex-col items-center gap-2 rounded-xl border bg-background p-3", className)} {...props}>
      <div className="rounded-md bg-white p-2" style={{ width: size, height: size }}>
        {src ? (
          <img src={src} alt={alt ?? value} width={size} height={size} className="size-full rounded-sm object-contain" />
        ) : (
          <QRCodeSvg value={value} cells={cells} title={alt} />
        )}
      </div>
      {!src && visualOnlyLabel && <div className="max-w-48 text-center text-xs text-muted-foreground">{visualOnlyLabel}</div>}
    </div>
  )
}

export { QRCode, QRCodeSvg }
