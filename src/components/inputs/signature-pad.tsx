"use client"

import * as React from "react"
import { RotateCcwIcon, Trash2Icon } from "lucide-react"

import { cn } from "@/lib/utils"

export type SignaturePoint = { x: number; y: number; pressure: number }
export type SignatureStroke = SignaturePoint[]

export type SignaturePadHandle = {
  clear: () => void
  undo: () => void
  toDataURL: (type?: string, quality?: number) => string
}

export type SignaturePadProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: SignatureStroke[]
  defaultValue?: SignatureStroke[]
  onValueChange?: (strokes: SignatureStroke[]) => void
  onStrokeEnd?: (stroke: SignatureStroke) => void
  width?: number
  height?: number
  lineWidth?: number
  color?: string
  backgroundColor?: string
  disabled?: boolean
  labels?: {
    canvas?: string
    undo?: string
    clear?: string
  }
}

function drawSignature(
  canvas: HTMLCanvasElement,
  strokes: SignatureStroke[],
  options: { color: string; lineWidth: number; backgroundColor: string }
) {
  const context = canvas.getContext("2d")
  if (!context) return

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = options.backgroundColor
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = options.color
  context.fillStyle = options.color
  context.lineCap = "round"
  context.lineJoin = "round"

  for (const stroke of strokes) {
    if (stroke.length === 0) continue
    if (stroke.length === 1) {
      const point = stroke[0]
      context.beginPath()
      context.arc(point.x * canvas.width, point.y * canvas.height, options.lineWidth / 2, 0, Math.PI * 2)
      context.fill()
      continue
    }

    context.beginPath()
    stroke.forEach((point, index) => {
      const x = point.x * canvas.width
      const y = point.y * canvas.height
      if (index === 0) context.moveTo(x, y)
      else context.lineTo(x, y)
    })
    context.lineWidth = options.lineWidth
    context.stroke()
  }
}

const SignaturePad = React.forwardRef<SignaturePadHandle, SignaturePadProps>(function SignaturePad(
  {
    value,
    defaultValue = [],
    onValueChange,
    onStrokeEnd,
    width = 640,
    height = 240,
    lineWidth = 2.5,
    color = "#111827",
    backgroundColor = "#ffffff",
    disabled = false,
    labels,
    className,
    ...props
  },
  ref
) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const activeStrokeRef = React.useRef<{ base: SignatureStroke[]; stroke: SignatureStroke } | null>(null)
  const [internalValue, setInternalValue] = React.useState<SignatureStroke[]>(defaultValue)
  const strokes = value ?? internalValue

  const updateValue = React.useCallback(
    (nextValue: SignatureStroke[]) => {
      if (value === undefined) setInternalValue(nextValue)
      onValueChange?.(nextValue)
    },
    [onValueChange, value]
  )

  const clear = React.useCallback(() => updateValue([]), [updateValue])
  const undo = React.useCallback(() => updateValue(strokes.slice(0, -1)), [strokes, updateValue])

  React.useImperativeHandle(
    ref,
    () => ({
      clear,
      undo,
      toDataURL: (type = "image/png", quality) => canvasRef.current?.toDataURL(type, quality) ?? "",
    }),
    [clear, undo]
  )

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) drawSignature(canvas, strokes, { color, lineWidth, backgroundColor })
  }, [backgroundColor, color, height, lineWidth, strokes, width])

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>): SignaturePoint => {
    const rect = event.currentTarget.getBoundingClientRect()
    return {
      x: Math.min(1, Math.max(0, (event.clientX - rect.left) / Math.max(rect.width, 1))),
      y: Math.min(1, Math.max(0, (event.clientY - rect.top) / Math.max(rect.height, 1))),
      pressure: event.pressure || 0.5,
    }
  }

  return (
    <div data-slot="signature-pad" className={cn("grid gap-2", className)} {...props}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        role="img"
        aria-label={labels?.canvas ?? "Signature pad"}
        data-disabled={disabled || undefined}
        className="w-full touch-none rounded-md border bg-white shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60"
        style={{ aspectRatio: `${width} / ${height}` }}
        tabIndex={disabled ? -1 : 0}
        onPointerDown={(event) => {
          if (disabled) return
          const stroke = [getPoint(event)]
          activeStrokeRef.current = { base: strokes, stroke }
          event.currentTarget.setPointerCapture(event.pointerId)
          updateValue([...strokes, stroke])
        }}
        onPointerMove={(event) => {
          const active = activeStrokeRef.current
          if (!active || disabled || !event.currentTarget.hasPointerCapture(event.pointerId)) return
          const nextStroke = [...active.stroke, getPoint(event)]
          activeStrokeRef.current = { ...active, stroke: nextStroke }
          updateValue([...active.base, nextStroke])
        }}
        onPointerUp={(event) => {
          const active = activeStrokeRef.current
          if (!active) return
          activeStrokeRef.current = null
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
          onStrokeEnd?.(active.stroke)
        }}
        onPointerCancel={() => {
          activeStrokeRef.current = null
        }}
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          disabled={disabled || strokes.length === 0}
          className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          onClick={undo}
        >
          <RotateCcwIcon className="size-4" aria-hidden="true" />
          {labels?.undo ?? "Undo"}
        </button>
        <button
          type="button"
          disabled={disabled || strokes.length === 0}
          className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-sm font-medium outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          onClick={clear}
        >
          <Trash2Icon className="size-4" aria-hidden="true" />
          {labels?.clear ?? "Clear"}
        </button>
      </div>
    </div>
  )
})

export { SignaturePad, drawSignature }
