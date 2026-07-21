"use client"

import * as React from "react"
import cvModule from "@techstark/opencv-js"
import { CameraIcon, CameraOffIcon, ScanLineIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Point = { x: number; y: number }
type Quad = [Point, Point, Point, Point]

export type DocumentScanResult = {
  blob: Blob
  dataUrl: string
  width: number
  height: number
  corners: Quad
}

export type DocumentScannerHandle = {
  start: () => Promise<void>
  stop: () => void
  scan: () => Promise<DocumentScanResult>
  video: HTMLVideoElement | null
}

export type DocumentScannerProps = Omit<React.ComponentProps<"div">, "onError"> & {
  autoStart?: boolean
  facingMode?: "user" | "environment"
  cameraId?: string
  outputType?: "image/jpeg" | "image/png" | "image/webp"
  outputQuality?: number
  requireDocument?: boolean
  minDocumentAreaRatio?: number
  onScan?: (result: DocumentScanResult) => void
  onError?: (error: Error) => void
  onCameraChange?: (active: boolean) => void
  overlay?: React.ReactNode
  videoClassName?: string
  labels?: {
    start?: string
    stop?: string
    scan?: string
    loadingEngine?: string
    permissionError?: string
    documentNotFound?: string
  }
}

async function getOpenCv() {
  const candidate = await Promise.resolve(cvModule as unknown as Promise<unknown>) as Record<string, unknown>
  if (candidate.Mat) return candidate as any

  await new Promise<void>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("OpenCV runtime initialization timed out")), 20000)
    ;(candidate as any).onRuntimeInitialized = () => {
      clearTimeout(timeout)
      resolve()
    }
  })

  return candidate as any
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function orderQuad(points: Point[]): Quad {
  if (points.length !== 4) throw new Error("A document contour must contain four points")

  const bySum = [...points].sort((a, b) => a.x + a.y - (b.x + b.y))
  const byDiff = [...points].sort((a, b) => a.y - a.x - (b.y - b.x))

  return [bySum[0], byDiff[0], bySum[3], byDiff[3]]
}

function fullFrameQuad(width: number, height: number): Quad {
  return [
    { x: 0, y: 0 },
    { x: width - 1, y: 0 },
    { x: width - 1, y: height - 1 },
    { x: 0, y: height - 1 },
  ]
}

function findDocumentQuad(cv: any, source: any, minArea: number): Quad | null {
  const gray = new cv.Mat()
  const blurred = new cv.Mat()
  const edges = new cv.Mat()
  const contours = new cv.MatVector()
  const hierarchy = new cv.Mat()
  let best: { area: number; points: Point[] } | null = null

  try {
    cv.cvtColor(source, gray, cv.COLOR_RGBA2GRAY)
    cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT)
    cv.Canny(blurred, edges, 60, 180)
    cv.findContours(edges, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)

    for (let index = 0; index < contours.size(); index += 1) {
      const contour = contours.get(index)
      const approximation = new cv.Mat()

      try {
        const perimeter = cv.arcLength(contour, true)
        cv.approxPolyDP(contour, approximation, 0.02 * perimeter, true)
        const area = Math.abs(cv.contourArea(approximation, false))

        if (approximation.rows === 4 && area >= minArea && (!best || area > best.area)) {
          const values = approximation.data32S
          const points: Point[] = []
          for (let offset = 0; offset < values.length; offset += 2) {
            points.push({ x: values[offset], y: values[offset + 1] })
          }
          best = { area, points }
        }
      } finally {
        approximation.delete()
        contour.delete()
      }
    }
  } finally {
    gray.delete()
    blurred.delete()
    edges.delete()
    contours.delete()
    hierarchy.delete()
  }

  return best ? orderQuad(best.points) : null
}

function warpDocument(cv: any, source: any, corners: Quad) {
  const [topLeft, topRight, bottomRight, bottomLeft] = corners
  const width = Math.max(
    1,
    Math.round(Math.max(distance(topLeft, topRight), distance(bottomLeft, bottomRight)))
  )
  const height = Math.max(
    1,
    Math.round(Math.max(distance(topLeft, bottomLeft), distance(topRight, bottomRight)))
  )
  const sourcePoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
    topLeft.x,
    topLeft.y,
    topRight.x,
    topRight.y,
    bottomRight.x,
    bottomRight.y,
    bottomLeft.x,
    bottomLeft.y,
  ])
  const destinationPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
    0,
    0,
    width - 1,
    0,
    width - 1,
    height - 1,
    0,
    height - 1,
  ])
  const transform = cv.getPerspectiveTransform(sourcePoints, destinationPoints)
  const output = new cv.Mat()

  try {
    cv.warpPerspective(
      source,
      output,
      transform,
      new cv.Size(width, height),
      cv.INTER_LINEAR,
      cv.BORDER_CONSTANT,
      new cv.Scalar()
    )
    return { output, width, height }
  } finally {
    sourcePoints.delete()
    destinationPoints.delete()
    transform.delete()
  }
}

const DocumentScanner = React.forwardRef<DocumentScannerHandle, DocumentScannerProps>(
  function DocumentScanner(
    {
      autoStart = true,
      facingMode = "environment",
      cameraId,
      outputType = "image/jpeg",
      outputQuality = 0.92,
      requireDocument = false,
      minDocumentAreaRatio = 0.15,
      onScan,
      onError,
      onCameraChange,
      overlay,
      className,
      videoClassName,
      labels,
      ...props
    },
    forwardedRef
  ) {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const sourceCanvasRef = React.useRef<HTMLCanvasElement>(null)
    const outputCanvasRef = React.useRef<HTMLCanvasElement>(null)
    const streamRef = React.useRef<MediaStream | null>(null)
    const [cameraActive, setCameraActive] = React.useState(false)
    const [scanning, setScanning] = React.useState(false)
    const [engineLoading, setEngineLoading] = React.useState(false)
    const [error, setError] = React.useState<Error | null>(null)

    const stop = React.useCallback(() => {
      for (const track of streamRef.current?.getTracks() ?? []) track.stop()
      streamRef.current = null
      if (videoRef.current) videoRef.current.srcObject = null
      setCameraActive(false)
      onCameraChange?.(false)
    }, [onCameraChange])

    const start = React.useCallback(async () => {
      try {
        stop()
        setError(null)
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: cameraId
            ? { deviceId: { exact: cameraId } }
            : { facingMode: { ideal: facingMode } },
        })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        setCameraActive(true)
        onCameraChange?.(true)
      } catch (cause: unknown) {
        const nextError = cause instanceof Error ? cause : new Error("Camera could not be started")
        setError(nextError)
        onError?.(nextError)
      }
    }, [cameraId, facingMode, onCameraChange, onError, stop])

    const scan = React.useCallback(async () => {
      const video = videoRef.current
      const sourceCanvas = sourceCanvasRef.current
      const outputCanvas = outputCanvasRef.current
      if (!video || !sourceCanvas || !outputCanvas || !video.videoWidth || !video.videoHeight) {
        throw new Error("Camera frame is not ready")
      }

      setScanning(true)
      setEngineLoading(true)
      setError(null)

      try {
        const sourceContext = sourceCanvas.getContext("2d", { willReadFrequently: true })
        if (!sourceContext) throw new Error("Canvas 2D context is unavailable")

        sourceCanvas.width = video.videoWidth
        sourceCanvas.height = video.videoHeight
        sourceContext.drawImage(video, 0, 0, sourceCanvas.width, sourceCanvas.height)

        const cv = await getOpenCv()
        setEngineLoading(false)
        const source = cv.imread(sourceCanvas)

        try {
          const minimumArea = sourceCanvas.width * sourceCanvas.height * minDocumentAreaRatio
          const detected = findDocumentQuad(cv, source, minimumArea)
          if (!detected && requireDocument) {
            throw new Error(labels?.documentNotFound ?? "Document edges were not found")
          }

          const corners = detected ?? fullFrameQuad(sourceCanvas.width, sourceCanvas.height)
          const warped = warpDocument(cv, source, corners)

          try {
            outputCanvas.width = warped.width
            outputCanvas.height = warped.height
            cv.imshow(outputCanvas, warped.output)

            const blob = await new Promise<Blob>((resolve, reject) => {
              outputCanvas.toBlob(
                (value) => value ? resolve(value) : reject(new Error("Scanned image could not be encoded")),
                outputType,
                outputQuality
              )
            })
            const dataUrl = outputCanvas.toDataURL(outputType, outputQuality)
            const result: DocumentScanResult = {
              blob,
              dataUrl,
              width: warped.width,
              height: warped.height,
              corners,
            }
            onScan?.(result)
            return result
          } finally {
            warped.output.delete()
          }
        } finally {
          source.delete()
        }
      } catch (cause: unknown) {
        const nextError = cause instanceof Error ? cause : new Error("Document could not be scanned")
        setError(nextError)
        onError?.(nextError)
        throw nextError
      } finally {
        setEngineLoading(false)
        setScanning(false)
      }
    }, [labels?.documentNotFound, minDocumentAreaRatio, onError, onScan, outputQuality, outputType, requireDocument])

    React.useImperativeHandle(
      forwardedRef,
      () => ({
        start,
        stop,
        scan,
        video: videoRef.current,
      }),
      [scan, start, stop]
    )

    React.useEffect(() => {
      if (autoStart) void start()
      return stop
    }, [autoStart, start, stop])

    return (
      <div data-slot="document-scanner" className={cn("grid gap-3", className)} {...props}>
        <div className="relative aspect-[4/3] min-h-72 overflow-hidden rounded-lg border bg-black">
          <video
            ref={videoRef}
            muted
            playsInline
            aria-label="Document camera preview"
            className={cn("h-full w-full object-cover", videoClassName)}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[8%] rounded-lg border-2 border-white/90 shadow-[0_0_0_9999px_rgb(0_0_0/0.35)]"
          />
          {overlay}
          {error ? (
            <div className="absolute inset-0 grid place-items-center bg-black/70 p-6 text-center text-sm text-white" role="alert">
              {labels?.permissionError ?? error.message}
            </div>
          ) : null}
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          {cameraActive ? (
            <Button type="button" variant="outline" size="sm" onClick={stop}>
              <CameraOffIcon className="size-4" aria-hidden="true" />
              {labels?.stop ?? "Stop camera"}
            </Button>
          ) : (
            <Button type="button" variant="outline" size="sm" onClick={() => void start()}>
              <CameraIcon className="size-4" aria-hidden="true" />
              {labels?.start ?? "Start camera"}
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            disabled={!cameraActive || scanning}
            loading={scanning}
            onClick={() => void scan()}
          >
            <ScanLineIcon className="size-4" aria-hidden="true" />
            {engineLoading ? labels?.loadingEngine ?? "Loading engine" : labels?.scan ?? "Scan document"}
          </Button>
        </div>

        <canvas ref={sourceCanvasRef} hidden />
        <canvas ref={outputCanvasRef} hidden />
      </div>
    )
  }
)

export { DocumentScanner }
