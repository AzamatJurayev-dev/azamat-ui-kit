/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import * as React from "react"
import cvModule from "@techstark/opencv-js"
import {
  CameraIcon,
  CameraOffIcon,
  CheckIcon,
  ChevronDownIcon,
  DownloadIcon,
  FileImageIcon,
  FlashlightIcon,
  FlashlightOffIcon,
  ImageIcon,
  ImagesIcon,
  LoaderCircleIcon,
  RefreshCwIcon,
  RotateCwIcon,
  ScanLineIcon,
  ShieldAlertIcon,
  Trash2Icon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Point = { x: number; y: number }
export type DocumentQuad = [Point, Point, Point, Point]

export type DocumentScannerStatus =
  | "idle"
  | "starting"
  | "ready"
  | "detecting"
  | "stable"
  | "capturing"
  | "processing"
  | "review"
  | "error"

export type DocumentPermissionState = "prompt" | "granted" | "denied" | "unsupported"
export type DocumentProcessingMode = "color" | "grayscale" | "black-white"

export type DocumentCameraDevice = {
  deviceId: string
  label: string
  groupId: string
}

export type DocumentDetection = {
  corners: DocumentQuad
  areaRatio: number
  confidence: number
  stableFrames: number
  stable: boolean
}

export type DocumentScanResult = {
  id: string
  blob: Blob
  dataUrl: string
  width: number
  height: number
  sourceWidth: number
  sourceHeight: number
  corners: DocumentQuad
  detected: boolean
  confidence: number
  processingMode: DocumentProcessingMode
  cameraId?: string
  createdAt: number
}

export type DocumentScannerSnapshot = {
  status: DocumentScannerStatus
  permission: DocumentPermissionState
  cameraActive: boolean
  cameraId?: string
  cameras: DocumentCameraDevice[]
  torchSupported: boolean
  torchEnabled: boolean
  detection: DocumentDetection | null
  scans: DocumentScanResult[]
  selectedScanId: string | null
  error: Error | null
}

export type DocumentScannerHandle = {
  start: () => Promise<void>
  stop: () => void
  scan: () => Promise<DocumentScanResult>
  scanFile: (file: File | Blob) => Promise<DocumentScanResult>
  listCameras: () => Promise<DocumentCameraDevice[]>
  switchCamera: (deviceId: string) => Promise<void>
  toggleTorch: (enabled?: boolean) => Promise<boolean>
  removeScan: (id: string) => void
  clearScans: () => void
  selectScan: (id: string | null) => void
  downloadScan: (id?: string) => void
  getSnapshot: () => DocumentScannerSnapshot
  video: HTMLVideoElement | null
}

export type DocumentScannerLabels = {
  start?: string
  stop?: string
  capture?: string
  captureAgain?: string
  importImage?: string
  cameras?: string
  selectCamera?: string
  torchOn?: string
  torchOff?: string
  autoCapture?: string
  autoCaptureReady?: string
  loadingEngine?: string
  requestingPermission?: string
  permissionDenied?: string
  insecureContext?: string
  cameraUnavailable?: string
  cameraNotReady?: string
  detecting?: string
  holdSteady?: string
  documentAligned?: string
  processing?: string
  documentNotFound?: string
  review?: string
  scans?: string
  remove?: string
  clear?: string
  download?: string
  noScans?: string
  color?: string
  grayscale?: string
  blackWhite?: string
  retry?: string
}

export type DocumentScannerStateContent = {
  idle?: React.ReactNode
  starting?: React.ReactNode
  permissionDenied?: React.ReactNode | ((error: Error | null, retry: () => void) => React.ReactNode)
  error?: React.ReactNode | ((error: Error, retry: () => void) => React.ReactNode)
  emptyReview?: React.ReactNode
}

export type DocumentScannerToolbarContext = DocumentScannerSnapshot & {
  processingMode: DocumentProcessingMode
  autoCapture: boolean
  actions: Pick<
    DocumentScannerHandle,
    | "start"
    | "stop"
    | "scan"
    | "listCameras"
    | "switchCamera"
    | "toggleTorch"
    | "removeScan"
    | "clearScans"
    | "selectScan"
    | "downloadScan"
  > & {
    openFilePicker: () => void
  }
}

export type DocumentScannerProps = Omit<React.ComponentProps<"div">, "onError"> & {
  autoStart?: boolean
  facingMode?: "user" | "environment"
  cameraId?: string
  defaultCameraId?: string
  onCameraIdChange?: (cameraId: string | undefined) => void
  preferredWidth?: number
  preferredHeight?: number
  preferredFrameRate?: number
  outputType?: "image/jpeg" | "image/png" | "image/webp"
  outputQuality?: number
  maxOutputWidth?: number
  maxOutputHeight?: number
  processingMode?: DocumentProcessingMode
  defaultProcessingMode?: DocumentProcessingMode
  onProcessingModeChange?: (mode: DocumentProcessingMode) => void
  blackWhiteThreshold?: number
  requireDocument?: boolean
  minDocumentAreaRatio?: number
  minDetectionConfidence?: number
  detectionIntervalMs?: number
  stabilityFrames?: number
  stabilityTolerance?: number
  autoCapture?: boolean
  autoCaptureDelayMs?: number
  stopAfterCapture?: boolean
  scans?: DocumentScanResult[]
  defaultScans?: DocumentScanResult[]
  onScansChange?: (scans: DocumentScanResult[]) => void
  maxScans?: number
  selectedScanId?: string | null
  defaultSelectedScanId?: string | null
  onSelectedScanIdChange?: (id: string | null) => void
  showToolbar?: boolean
  showReview?: boolean
  showCameraSelector?: boolean
  allowTorch?: boolean
  allowFileImport?: boolean
  fileAccept?: string
  labels?: DocumentScannerLabels
  stateContent?: DocumentScannerStateContent
  renderToolbar?: (context: DocumentScannerToolbarContext) => React.ReactNode
  renderReview?: (context: DocumentScannerToolbarContext) => React.ReactNode
  beforePreview?: React.ReactNode
  afterPreview?: React.ReactNode
  overlay?: React.ReactNode
  onScan?: (result: DocumentScanResult) => void
  onDetectionChange?: (detection: DocumentDetection | null) => void
  onStatusChange?: (status: DocumentScannerStatus) => void
  onPermissionChange?: (permission: DocumentPermissionState) => void
  onDevicesChange?: (devices: DocumentCameraDevice[]) => void
  onCameraChange?: (active: boolean) => void
  onTorchChange?: (enabled: boolean) => void
  onError?: (error: Error) => void
  videoClassName?: string
  previewClassName?: string
  toolbarClassName?: string
  reviewClassName?: string
}

type OpenCvRuntime = Record<string, any>
type DetectionCandidate = { corners: DocumentQuad; areaRatio: number; confidence: number }

let openCvPromise: Promise<OpenCvRuntime> | null = null

async function getOpenCv() {
  if (openCvPromise) return openCvPromise

  openCvPromise = (async () => {
    const candidate = await Promise.resolve(cvModule as unknown as Promise<unknown>) as OpenCvRuntime
    if (candidate.Mat) return candidate

    await new Promise<void>((resolve, reject) => {
      const timeout = window.setTimeout(
        () => reject(new Error("OpenCV runtime initialization timed out")),
        20000
      )
      candidate.onRuntimeInitialized = () => {
        window.clearTimeout(timeout)
        resolve()
      }
    })

    return candidate
  })().catch((error) => {
    openCvPromise = null
    throw error
  })

  return openCvPromise
}

function useLatest<T>(value: T) {
  const ref = React.useRef(value)
  ref.current = value
  return ref
}

function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value: T | undefined
  defaultValue: T
  onChange?: (value: T) => void
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const controlled = value !== undefined
  const currentValue = controlled ? value : internalValue

  const setValue = React.useCallback(
    (nextValue: T) => {
      if (!controlled) setInternalValue(nextValue)
      onChange?.(nextValue)
    },
    [controlled, onChange]
  )

  return [currentValue, setValue] as const
}

function createError(cause: unknown, fallback: string) {
  return cause instanceof Error ? cause : new Error(fallback)
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID()
  return `scan-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function orderQuad(points: Point[]): DocumentQuad {
  if (points.length !== 4) throw new Error("A document contour must contain four points")

  const bySum = [...points].sort((a, b) => a.x + a.y - (b.x + b.y))
  const byDiff = [...points].sort((a, b) => a.y - a.x - (b.y - b.x))
  return [bySum[0], byDiff[0], bySum[3], byDiff[3]]
}

function fullFrameQuad(width: number, height: number): DocumentQuad {
  return [
    { x: 0, y: 0 },
    { x: width - 1, y: 0 },
    { x: width - 1, y: height - 1 },
    { x: 0, y: height - 1 },
  ]
}

function normalizeQuad(corners: DocumentQuad, width: number, height: number): DocumentQuad {
  return corners.map((point) => ({
    x: point.x / Math.max(width, 1),
    y: point.y / Math.max(height, 1),
  })) as DocumentQuad
}

function quadDelta(previous: DocumentQuad, next: DocumentQuad) {
  return previous.reduce((total, point, index) => total + distance(point, next[index]), 0) / 4
}

function calculateConfidence(corners: DocumentQuad, width: number, height: number, areaRatio: number) {
  const normalized = normalizeQuad(corners, width, height)
  const top = distance(normalized[0], normalized[1])
  const bottom = distance(normalized[3], normalized[2])
  const left = distance(normalized[0], normalized[3])
  const right = distance(normalized[1], normalized[2])
  const symmetry = 1 - Math.min(1, (Math.abs(top - bottom) + Math.abs(left - right)) / 2)
  const centered = 1 - Math.min(
    1,
    Math.abs((normalized[0].x + normalized[1].x + normalized[2].x + normalized[3].x) / 4 - 0.5) +
      Math.abs((normalized[0].y + normalized[1].y + normalized[2].y + normalized[3].y) / 4 - 0.5)
  )
  return Math.max(0, Math.min(1, areaRatio * 0.6 + symmetry * 0.25 + centered * 0.15))
}

function findDocument(cv: OpenCvRuntime, source: any, minArea: number): DetectionCandidate | null {
  const gray = new cv.Mat()
  const blurred = new cv.Mat()
  const edges = new cv.Mat()
  const contours = new cv.MatVector()
  const hierarchy = new cv.Mat()
  let best: { area: number; points: Point[] } | null = null

  try {
    cv.cvtColor(source, gray, cv.COLOR_RGBA2GRAY)
    cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0, 0, cv.BORDER_DEFAULT)
    cv.Canny(blurred, edges, 55, 175)
    cv.findContours(edges, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE)

    for (let index = 0; index < contours.size(); index += 1) {
      const contour = contours.get(index)
      const approximation = new cv.Mat()

      try {
        const perimeter = cv.arcLength(contour, true)
        cv.approxPolyDP(contour, approximation, 0.02 * perimeter, true)
        const area = Math.abs(cv.contourArea(approximation, false))

        if (approximation.rows === 4 && cv.isContourConvex(approximation) && area >= minArea && (!best || area > best.area)) {
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

  if (!best) return null
  const corners = orderQuad(best.points)
  const areaRatio = best.area / Math.max(source.cols * source.rows, 1)
  return {
    corners,
    areaRatio,
    confidence: calculateConfidence(corners, source.cols, source.rows, areaRatio),
  }
}

function warpDocument(cv: OpenCvRuntime, source: any, corners: DocumentQuad) {
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
    topLeft.x, topLeft.y,
    topRight.x, topRight.y,
    bottomRight.x, bottomRight.y,
    bottomLeft.x, bottomLeft.y,
  ])
  const destinationPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
    0, 0,
    width - 1, 0,
    width - 1, height - 1,
    0, height - 1,
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

function processOutput(cv: OpenCvRuntime, source: any, mode: DocumentProcessingMode, threshold: number) {
  if (mode === "color") return source

  const output = new cv.Mat()
  cv.cvtColor(source, output, cv.COLOR_RGBA2GRAY)

  if (mode === "black-white") {
    cv.threshold(output, output, threshold, 255, cv.THRESH_BINARY)
  }

  return output
}

function fitOutputDimensions(width: number, height: number, maxWidth?: number, maxHeight?: number) {
  const widthRatio = maxWidth ? maxWidth / width : 1
  const heightRatio = maxHeight ? maxHeight / height : 1
  const ratio = Math.min(1, widthRatio, heightRatio)
  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
  }
}

async function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: DocumentScannerProps["outputType"],
  quality: number
) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (value) => value ? resolve(value) : reject(new Error("Scanned image could not be encoded")),
      type,
      quality
    )
  })
}

function resolveStateContent<T extends unknown[]>(
  content: React.ReactNode | ((...args: T) => React.ReactNode) | undefined,
  fallback: React.ReactNode,
  ...args: T
) {
  if (typeof content === "function") return content(...args)
  return content ?? fallback
}

function DefaultIdleState({ labels, start }: { labels?: DocumentScannerLabels; start: () => void }) {
  return (
    <div className="grid max-w-sm place-items-center text-center text-white">
      <span className="grid size-14 place-items-center rounded-2xl bg-white/10 backdrop-blur">
        <CameraIcon className="size-7" aria-hidden="true" />
      </span>
      <p className="mt-4 text-sm font-semibold">Camera is stopped</p>
      <p className="mt-1 text-xs text-white/65">Start the camera or import an existing image.</p>
      <Button className="mt-4" size="sm" variant="secondary" onClick={start}>
        {labels?.start ?? "Start camera"}
      </Button>
    </div>
  )
}

function DefaultPermissionState({
  error,
  labels,
  retry,
}: {
  error: Error | null
  labels?: DocumentScannerLabels
  retry: () => void
}) {
  return (
    <div className="grid max-w-md place-items-center text-center text-white" role="alert">
      <span className="grid size-14 place-items-center rounded-2xl bg-red-500/15 text-red-300">
        <ShieldAlertIcon className="size-7" aria-hidden="true" />
      </span>
      <p className="mt-4 text-sm font-semibold">{labels?.permissionDenied ?? "Camera permission is unavailable"}</p>
      <p className="mt-1 text-xs leading-5 text-white/65">{error?.message ?? "Allow camera access in the browser or import an image instead."}</p>
      <Button className="mt-4" size="sm" variant="secondary" onClick={retry} leftIcon={<RefreshCwIcon className="size-4" />}>
        {labels?.retry ?? "Try again"}
      </Button>
    </div>
  )
}

const DocumentScanner = React.forwardRef<DocumentScannerHandle, DocumentScannerProps>(
  function DocumentScanner(
    {
      autoStart = true,
      facingMode = "environment",
      cameraId,
      defaultCameraId,
      onCameraIdChange,
      preferredWidth = 1920,
      preferredHeight = 1080,
      preferredFrameRate = 30,
      outputType = "image/jpeg",
      outputQuality = 0.92,
      maxOutputWidth = 2480,
      maxOutputHeight = 3508,
      processingMode,
      defaultProcessingMode = "color",
      onProcessingModeChange,
      blackWhiteThreshold = 155,
      requireDocument = false,
      minDocumentAreaRatio = 0.12,
      minDetectionConfidence = 0.5,
      detectionIntervalMs = 240,
      stabilityFrames = 4,
      stabilityTolerance = 0.025,
      autoCapture = false,
      autoCaptureDelayMs = 700,
      stopAfterCapture = false,
      scans,
      defaultScans = [],
      onScansChange,
      maxScans = 20,
      selectedScanId,
      defaultSelectedScanId = null,
      onSelectedScanIdChange,
      showToolbar = true,
      showReview = true,
      showCameraSelector = true,
      allowTorch = true,
      allowFileImport = true,
      fileAccept = "image/*",
      labels,
      stateContent,
      renderToolbar,
      renderReview,
      beforePreview,
      afterPreview,
      overlay,
      onScan,
      onDetectionChange,
      onStatusChange,
      onPermissionChange,
      onDevicesChange,
      onCameraChange,
      onTorchChange,
      onError,
      className,
      videoClassName,
      previewClassName,
      toolbarClassName,
      reviewClassName,
      ...props
    },
    forwardedRef
  ) {
    const rootRef = React.useRef<HTMLDivElement>(null)
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const sourceCanvasRef = React.useRef<HTMLCanvasElement>(null)
    const outputCanvasRef = React.useRef<HTMLCanvasElement>(null)
    const fileInputRef = React.useRef<HTMLInputElement>(null)
    const streamRef = React.useRef<MediaStream | null>(null)
    const detectionTimerRef = React.useRef<number | null>(null)
    const autoCaptureTimerRef = React.useRef<number | null>(null)
    const previousDetectionRef = React.useRef<DocumentQuad | null>(null)
    const stableFramesRef = React.useRef(0)
    const scanInProgressRef = React.useRef(false)
    const callbacksRef = useLatest({
      onScan,
      onDetectionChange,
      onStatusChange,
      onPermissionChange,
      onDevicesChange,
      onCameraChange,
      onTorchChange,
      onError,
    })

    const [currentCameraId, setCurrentCameraId] = useControllableState({
      value: cameraId,
      defaultValue: defaultCameraId,
      onChange: onCameraIdChange,
    })
    const [currentProcessingMode, setCurrentProcessingMode] = useControllableState({
      value: processingMode,
      defaultValue: defaultProcessingMode,
      onChange: onProcessingModeChange,
    })
    const [currentScans, setCurrentScans] = useControllableState({
      value: scans,
      defaultValue: defaultScans,
      onChange: onScansChange,
    })
    const [currentSelectedScanId, setCurrentSelectedScanId] = useControllableState({
      value: selectedScanId,
      defaultValue: defaultSelectedScanId,
      onChange: onSelectedScanIdChange,
    })

    const [status, setStatusState] = React.useState<DocumentScannerStatus>("idle")
    const [permission, setPermissionState] = React.useState<DocumentPermissionState>(
      typeof navigator === "undefined" || !navigator.mediaDevices ? "unsupported" : "prompt"
    )
    const [cameraActive, setCameraActive] = React.useState(false)
    const [cameras, setCameras] = React.useState<DocumentCameraDevice[]>([])
    const [torchSupported, setTorchSupported] = React.useState(false)
    const [torchEnabled, setTorchEnabled] = React.useState(false)
    const [detection, setDetectionState] = React.useState<DocumentDetection | null>(null)
    const [error, setError] = React.useState<Error | null>(null)
    const [engineLoading, setEngineLoading] = React.useState(false)

    const setStatus = React.useCallback((nextStatus: DocumentScannerStatus) => {
      setStatusState(nextStatus)
      callbacksRef.current.onStatusChange?.(nextStatus)
    }, [callbacksRef])

    const setPermission = React.useCallback((nextPermission: DocumentPermissionState) => {
      setPermissionState(nextPermission)
      callbacksRef.current.onPermissionChange?.(nextPermission)
    }, [callbacksRef])

    const setDetection = React.useCallback((nextDetection: DocumentDetection | null) => {
      setDetectionState(nextDetection)
      callbacksRef.current.onDetectionChange?.(nextDetection)
    }, [callbacksRef])

    const reportError = React.useCallback((cause: unknown, fallback: string) => {
      const nextError = createError(cause, fallback)
      setError(nextError)
      setStatus("error")
      callbacksRef.current.onError?.(nextError)
      return nextError
    }, [callbacksRef, setStatus])

    const clearTimers = React.useCallback(() => {
      if (detectionTimerRef.current != null) window.clearTimeout(detectionTimerRef.current)
      if (autoCaptureTimerRef.current != null) window.clearTimeout(autoCaptureTimerRef.current)
      detectionTimerRef.current = null
      autoCaptureTimerRef.current = null
    }, [])

    const listCameras = React.useCallback(async () => {
      if (!navigator.mediaDevices?.enumerateDevices) return []
      const devices = await navigator.mediaDevices.enumerateDevices()
      const nextCameras = devices
        .filter((device) => device.kind === "videoinput")
        .map((device, index) => ({
          deviceId: device.deviceId,
          groupId: device.groupId,
          label: device.label || `Camera ${index + 1}`,
        }))
      setCameras(nextCameras)
      callbacksRef.current.onDevicesChange?.(nextCameras)
      return nextCameras
    }, [callbacksRef])

    const stop = React.useCallback(() => {
      clearTimers()
      for (const track of streamRef.current?.getTracks() ?? []) track.stop()
      streamRef.current = null
      if (videoRef.current) videoRef.current.srcObject = null
      previousDetectionRef.current = null
      stableFramesRef.current = 0
      scanInProgressRef.current = false
      setCameraActive(false)
      setTorchSupported(false)
      setTorchEnabled(false)
      setDetection(null)
      setStatus("idle")
      callbacksRef.current.onCameraChange?.(false)
      callbacksRef.current.onTorchChange?.(false)
    }, [callbacksRef, clearTimers, setDetection, setStatus])

    const start = React.useCallback(async () => {
      if (!window.isSecureContext && window.location.hostname !== "localhost") {
        setPermission("unsupported")
        reportError(new Error(labels?.insecureContext ?? "Camera access requires HTTPS or localhost"), "Camera access is unavailable")
        return
      }
      if (!navigator.mediaDevices?.getUserMedia) {
        setPermission("unsupported")
        reportError(new Error(labels?.cameraUnavailable ?? "MediaDevices is not supported"), "Camera access is unavailable")
        return
      }

      try {
        stop()
        setStatus("starting")
        setError(null)
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: currentCameraId
            ? {
                deviceId: { exact: currentCameraId },
                width: { ideal: preferredWidth },
                height: { ideal: preferredHeight },
                frameRate: { ideal: preferredFrameRate },
              }
            : {
                facingMode: { ideal: facingMode },
                width: { ideal: preferredWidth },
                height: { ideal: preferredHeight },
                frameRate: { ideal: preferredFrameRate },
              },
        })

        streamRef.current = stream
        const videoTrack = stream.getVideoTracks()[0]
        const settings = videoTrack?.getSettings()
        const capabilities = videoTrack?.getCapabilities?.() as MediaTrackCapabilities & { torch?: boolean }
        if (settings?.deviceId && settings.deviceId !== currentCameraId) setCurrentCameraId(settings.deviceId)
        setTorchSupported(Boolean(capabilities?.torch))

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }

        setPermission("granted")
        setCameraActive(true)
        setStatus("ready")
        callbacksRef.current.onCameraChange?.(true)
        await listCameras()
      } catch (cause: unknown) {
        const nextError = createError(cause, "Camera could not be started")
        if (nextError.name === "NotAllowedError" || nextError.name === "SecurityError") setPermission("denied")
        reportError(nextError, "Camera could not be started")
      }
    }, [callbacksRef, currentCameraId, facingMode, labels?.cameraUnavailable, labels?.insecureContext, listCameras, preferredFrameRate, preferredHeight, preferredWidth, reportError, setCurrentCameraId, setPermission, setStatus, stop])

    const switchCamera = React.useCallback(async (deviceId: string) => {
      setCurrentCameraId(deviceId)
      await new Promise<void>((resolve) => window.requestAnimationFrame(() => resolve()))
    }, [setCurrentCameraId])

    React.useEffect(() => {
      if (!cameraActive || !currentCameraId) return
      const activeDevice = streamRef.current?.getVideoTracks()[0]?.getSettings().deviceId
      if (activeDevice && activeDevice !== currentCameraId) void start()
    }, [cameraActive, currentCameraId, start])

    const toggleTorch = React.useCallback(async (enabled?: boolean) => {
      const track = streamRef.current?.getVideoTracks()[0]
      if (!track || !torchSupported) return false
      const nextEnabled = enabled ?? !torchEnabled
      try {
        await track.applyConstraints({ advanced: [{ torch: nextEnabled } as MediaTrackConstraintSet] })
        setTorchEnabled(nextEnabled)
        callbacksRef.current.onTorchChange?.(nextEnabled)
        return nextEnabled
      } catch (cause: unknown) {
        reportError(cause, "Torch could not be changed")
        return torchEnabled
      }
    }, [callbacksRef, reportError, torchEnabled, torchSupported])

    const appendScan = React.useCallback((result: DocumentScanResult) => {
      const nextScans = [...currentScans, result].slice(-Math.max(1, maxScans))
      setCurrentScans(nextScans)
      setCurrentSelectedScanId(result.id)
      callbacksRef.current.onScan?.(result)
    }, [callbacksRef, currentScans, maxScans, setCurrentScans, setCurrentSelectedScanId])

    const processCanvas = React.useCallback(async (
      canvas: HTMLCanvasElement,
      detectedCandidate?: DetectionCandidate | null
    ) => {
      const outputCanvas = outputCanvasRef.current
      if (!outputCanvas) throw new Error("Output canvas is unavailable")

      setStatus("processing")
      setEngineLoading(true)
      const cv = await getOpenCv()
      setEngineLoading(false)
      const source = cv.imread(canvas)

      try {
        const minimumArea = canvas.width * canvas.height * minDocumentAreaRatio
        const candidate = detectedCandidate ?? findDocument(cv, source, minimumArea)
        if (!candidate && requireDocument) {
          throw new Error(labels?.documentNotFound ?? "Document edges were not found")
        }

        const corners = candidate?.corners ?? fullFrameQuad(canvas.width, canvas.height)
        const warped = warpDocument(cv, source, corners)

        try {
          const processed = processOutput(cv, warped.output, currentProcessingMode, blackWhiteThreshold)
          try {
            const dimensions = fitOutputDimensions(warped.width, warped.height, maxOutputWidth, maxOutputHeight)
            let renderSource = processed
            let resized: any | null = null

            if (dimensions.width !== warped.width || dimensions.height !== warped.height) {
              resized = new cv.Mat()
              cv.resize(processed, resized, new cv.Size(dimensions.width, dimensions.height), 0, 0, cv.INTER_AREA)
              renderSource = resized
            }

            try {
              outputCanvas.width = dimensions.width
              outputCanvas.height = dimensions.height
              cv.imshow(outputCanvas, renderSource)
              const blob = await canvasToBlob(outputCanvas, outputType, outputQuality)
              return {
                id: createId(),
                blob,
                dataUrl: outputCanvas.toDataURL(outputType, outputQuality),
                width: dimensions.width,
                height: dimensions.height,
                sourceWidth: canvas.width,
                sourceHeight: canvas.height,
                corners,
                detected: Boolean(candidate),
                confidence: candidate?.confidence ?? 0,
                processingMode: currentProcessingMode,
                cameraId: currentCameraId,
                createdAt: Date.now(),
              } satisfies DocumentScanResult
            } finally {
              resized?.delete()
            }
          } finally {
            if (processed !== warped.output) processed.delete()
          }
        } finally {
          warped.output.delete()
        }
      } finally {
        source.delete()
      }
    }, [blackWhiteThreshold, currentCameraId, currentProcessingMode, labels?.documentNotFound, maxOutputHeight, maxOutputWidth, minDocumentAreaRatio, outputQuality, outputType, requireDocument, setStatus])

    const scan = React.useCallback(async () => {
      if (scanInProgressRef.current) throw new Error("A scan is already in progress")
      const video = videoRef.current
      const sourceCanvas = sourceCanvasRef.current
      if (!video || !sourceCanvas || !video.videoWidth || !video.videoHeight) {
        throw reportError(new Error(labels?.cameraNotReady ?? "Camera frame is not ready"), "Camera frame is not ready")
      }

      scanInProgressRef.current = true
      clearTimers()
      setStatus("capturing")
      setError(null)

      try {
        const context = sourceCanvas.getContext("2d", { willReadFrequently: true })
        if (!context) throw new Error("Canvas 2D context is unavailable")
        sourceCanvas.width = video.videoWidth
        sourceCanvas.height = video.videoHeight
        context.drawImage(video, 0, 0, sourceCanvas.width, sourceCanvas.height)
        const candidate = detection
          ? { corners: detection.corners, areaRatio: detection.areaRatio, confidence: detection.confidence }
          : null
        const result = await processCanvas(sourceCanvas, candidate)
        appendScan(result)
        setStatus(showReview ? "review" : "ready")
        if (stopAfterCapture) stop()
        return result
      } catch (cause: unknown) {
        throw reportError(cause, "Document could not be scanned")
      } finally {
        scanInProgressRef.current = false
        setEngineLoading(false)
      }
    }, [appendScan, clearTimers, detection, labels?.cameraNotReady, processCanvas, reportError, setStatus, showReview, stop, stopAfterCapture])

    const scanFile = React.useCallback(async (file: File | Blob) => {
      if (scanInProgressRef.current) throw new Error("A scan is already in progress")
      const sourceCanvas = sourceCanvasRef.current
      if (!sourceCanvas) throw new Error("Source canvas is unavailable")
      scanInProgressRef.current = true
      setStatus("processing")
      setError(null)
      const url = URL.createObjectURL(file)

      try {
        const image = new window.Image()
        image.decoding = "async"
        image.src = url
        await image.decode()
        const context = sourceCanvas.getContext("2d", { willReadFrequently: true })
        if (!context) throw new Error("Canvas 2D context is unavailable")
        sourceCanvas.width = image.naturalWidth
        sourceCanvas.height = image.naturalHeight
        context.drawImage(image, 0, 0)
        const result = await processCanvas(sourceCanvas)
        appendScan(result)
        setStatus(showReview ? "review" : cameraActive ? "ready" : "idle")
        return result
      } catch (cause: unknown) {
        throw reportError(cause, "Imported image could not be scanned")
      } finally {
        URL.revokeObjectURL(url)
        scanInProgressRef.current = false
        setEngineLoading(false)
      }
    }, [appendScan, cameraActive, processCanvas, reportError, setStatus, showReview])

    const removeScan = React.useCallback((id: string) => {
      const nextScans = currentScans.filter((scanResult) => scanResult.id !== id)
      setCurrentScans(nextScans)
      if (currentSelectedScanId === id) setCurrentSelectedScanId(nextScans.at(-1)?.id ?? null)
    }, [currentScans, currentSelectedScanId, setCurrentScans, setCurrentSelectedScanId])

    const clearScans = React.useCallback(() => {
      setCurrentScans([])
      setCurrentSelectedScanId(null)
    }, [setCurrentScans, setCurrentSelectedScanId])

    const downloadScan = React.useCallback((id?: string) => {
      const target = currentScans.find((scanResult) => scanResult.id === (id ?? currentSelectedScanId))
      if (!target) return
      const anchor = window.document.createElement("a")
      anchor.href = target.dataUrl
      anchor.download = `document-scan-${new Date(target.createdAt).toISOString().replace(/[:.]/g, "-")}.${outputType?.split("/")[1] ?? "jpg"}`
      anchor.click()
    }, [currentScans, currentSelectedScanId, outputType])

    const getSnapshot = React.useCallback((): DocumentScannerSnapshot => ({
      status,
      permission,
      cameraActive,
      cameraId: currentCameraId,
      cameras,
      torchSupported,
      torchEnabled,
      detection,
      scans: currentScans,
      selectedScanId: currentSelectedScanId,
      error,
    }), [cameraActive, cameras, currentCameraId, currentScans, currentSelectedScanId, detection, error, permission, status, torchEnabled, torchSupported])

    const runDetection = React.useCallback(async () => {
      if (!cameraActive || scanInProgressRef.current) return
      const video = videoRef.current
      const canvas = sourceCanvasRef.current
      if (!video || !canvas || !video.videoWidth || !video.videoHeight) return

      try {
        setStatus(stableFramesRef.current ? "detecting" : "ready")
        const scale = Math.min(1, 720 / video.videoWidth)
        canvas.width = Math.max(1, Math.round(video.videoWidth * scale))
        canvas.height = Math.max(1, Math.round(video.videoHeight * scale))
        const context = canvas.getContext("2d", { willReadFrequently: true })
        if (!context) return
        context.drawImage(video, 0, 0, canvas.width, canvas.height)
        const cv = await getOpenCv()
        const source = cv.imread(canvas)

        try {
          const candidate = findDocument(cv, source, canvas.width * canvas.height * minDocumentAreaRatio)
          if (!candidate || candidate.confidence < minDetectionConfidence) {
            previousDetectionRef.current = null
            stableFramesRef.current = 0
            setDetection(null)
            setStatus("detecting")
            return
          }

          const normalized = normalizeQuad(candidate.corners, canvas.width, canvas.height)
          const previous = previousDetectionRef.current
          stableFramesRef.current = previous && quadDelta(previous, normalized) <= stabilityTolerance
            ? stableFramesRef.current + 1
            : 1
          previousDetectionRef.current = normalized
          const stable = stableFramesRef.current >= stabilityFrames
          const scaledCorners = candidate.corners.map((point) => ({
            x: point.x / scale,
            y: point.y / scale,
          })) as DocumentQuad
          const nextDetection = {
            corners: scaledCorners,
            areaRatio: candidate.areaRatio,
            confidence: candidate.confidence,
            stableFrames: stableFramesRef.current,
            stable,
          }
          setDetection(nextDetection)
          setStatus(stable ? "stable" : "detecting")

          if (autoCapture && stable && autoCaptureTimerRef.current == null) {
            autoCaptureTimerRef.current = window.setTimeout(() => {
              autoCaptureTimerRef.current = null
              void scan()
            }, autoCaptureDelayMs)
          } else if ((!autoCapture || !stable) && autoCaptureTimerRef.current != null) {
            window.clearTimeout(autoCaptureTimerRef.current)
            autoCaptureTimerRef.current = null
          }
        } finally {
          source.delete()
        }
      } catch (cause: unknown) {
        callbacksRef.current.onError?.(createError(cause, "Document detection failed"))
      } finally {
        if (cameraActive && !scanInProgressRef.current) {
          detectionTimerRef.current = window.setTimeout(() => void runDetection(), Math.max(80, detectionIntervalMs))
        }
      }
    }, [autoCapture, autoCaptureDelayMs, callbacksRef, cameraActive, detectionIntervalMs, minDetectionConfidence, minDocumentAreaRatio, scan, setDetection, setStatus, stabilityFrames, stabilityTolerance])

    React.useEffect(() => {
      clearTimers()
      if (cameraActive) detectionTimerRef.current = window.setTimeout(() => void runDetection(), 120)
      return clearTimers
    }, [cameraActive, clearTimers, runDetection])

    React.useEffect(() => {
      if (autoStart) void start()
      return stop
    }, [autoStart, start, stop])

    React.useEffect(() => {
      const onDeviceChange = () => void listCameras()
      navigator.mediaDevices?.addEventListener?.("devicechange", onDeviceChange)
      return () => navigator.mediaDevices?.removeEventListener?.("devicechange", onDeviceChange)
    }, [listCameras])

    React.useImperativeHandle(
      forwardedRef,
      () => ({
        start,
        stop,
        scan,
        scanFile,
        listCameras,
        switchCamera,
        toggleTorch,
        removeScan,
        clearScans,
        selectScan: setCurrentSelectedScanId,
        downloadScan,
        getSnapshot,
        video: videoRef.current,
      }),
      [clearScans, downloadScan, getSnapshot, listCameras, removeScan, scan, scanFile, setCurrentSelectedScanId, start, stop, switchCamera, toggleTorch]
    )

    const normalizedDetectionPoints = React.useMemo(() => {
      const video = videoRef.current
      if (!detection || !video?.videoWidth || !video.videoHeight) return ""
      return detection.corners
        .map((point) => `${(point.x / video.videoWidth) * 100},${(point.y / video.videoHeight) * 100}`)
        .join(" ")
    }, [detection])

    const selectedScan = currentScans.find((scanResult) => scanResult.id === currentSelectedScanId) ?? null
    const openFilePicker = React.useCallback(() => fileInputRef.current?.click(), [])

    const actions = React.useMemo<DocumentScannerToolbarContext["actions"]>(() => ({
      start,
      stop,
      scan,
      listCameras,
      switchCamera,
      toggleTorch,
      removeScan,
      clearScans,
      selectScan: setCurrentSelectedScanId,
      downloadScan,
      openFilePicker,
    }), [clearScans, downloadScan, listCameras, openFilePicker, removeScan, scan, setCurrentSelectedScanId, start, stop, switchCamera, toggleTorch])

    const toolbarContext = React.useMemo<DocumentScannerToolbarContext>(() => ({
      ...getSnapshot(),
      processingMode: currentProcessingMode,
      autoCapture,
      actions,
    }), [actions, autoCapture, currentProcessingMode, getSnapshot])

    const previewMessage = detection?.stable
      ? labels?.documentAligned ?? "Document aligned"
      : detection
        ? labels?.holdSteady ?? "Hold steady"
        : labels?.detecting ?? "Looking for document edges"

    const defaultToolbar = (
      <div className={cn("flex flex-wrap items-center justify-between gap-2 border-t bg-background p-2", toolbarClassName)} data-slot="document-scanner-toolbar">
        <div className="flex flex-wrap items-center gap-2">
          {showCameraSelector && cameras.length > 1 ? (
            <label className="relative">
              <span className="sr-only">{labels?.selectCamera ?? "Select camera"}</span>
              <select
                value={currentCameraId ?? ""}
                onChange={(event) => void switchCamera(event.target.value)}
                className="h-9 max-w-44 appearance-none rounded-lg border bg-background py-0 pl-3 pr-8 text-xs outline-none"
              >
                {cameras.map((camera) => <option key={camera.deviceId} value={camera.deviceId}>{camera.label}</option>)}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
            </label>
          ) : null}

          <div className="flex rounded-lg border bg-muted/30 p-0.5">
            {(["color", "grayscale", "black-white"] as DocumentProcessingMode[]).map((mode) => (
              <Button
                key={mode}
                type="button"
                size="xs"
                variant={currentProcessingMode === mode ? "secondary" : "ghost"}
                onClick={() => setCurrentProcessingMode(mode)}
              >
                {mode === "color" ? labels?.color ?? "Color" : mode === "grayscale" ? labels?.grayscale ?? "Gray" : labels?.blackWhite ?? "B&W"}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {allowFileImport ? (
            <Button type="button" variant="ghost" size="sm" onClick={openFilePicker} leftIcon={<UploadIcon className="size-4" />}>
              {labels?.importImage ?? "Import"}
            </Button>
          ) : null}
          {allowTorch && torchSupported ? (
            <Button type="button" variant={torchEnabled ? "secondary" : "ghost"} size="icon-sm" iconOnly aria-label={torchEnabled ? labels?.torchOff ?? "Turn torch off" : labels?.torchOn ?? "Turn torch on"} onClick={() => void toggleTorch()}>
              {torchEnabled ? <FlashlightOffIcon className="size-4" /> : <FlashlightIcon className="size-4" />}
            </Button>
          ) : null}
          {cameraActive ? (
            <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.stop ?? "Stop camera"} onClick={stop}>
              <CameraOffIcon className="size-4" />
            </Button>
          ) : (
            <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.start ?? "Start camera"} onClick={() => void start()}>
              <CameraIcon className="size-4" />
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            disabled={!cameraActive || scanInProgressRef.current || currentScans.length >= maxScans}
            loading={status === "capturing" || status === "processing"}
            onClick={() => void scan()}
            leftIcon={<ScanLineIcon className="size-4" />}
          >
            {engineLoading ? labels?.loadingEngine ?? "Loading engine" : labels?.capture ?? "Capture"}
          </Button>
        </div>
      </div>
    )

    const defaultReview = (
      <aside className={cn("flex min-h-0 w-full flex-col border-t bg-muted/20 lg:w-80 lg:border-l lg:border-t-0", reviewClassName)} data-slot="document-scanner-review">
        <div className="flex items-center justify-between border-b p-3">
          <div>
            <p className="text-sm font-semibold">{labels?.review ?? "Review scans"}</p>
            <p className="text-xs text-muted-foreground">{currentScans.length} / {maxScans} {labels?.scans ?? "pages"}</p>
          </div>
          <div className="flex gap-1">
            <Button type="button" size="icon-sm" variant="ghost" iconOnly aria-label={labels?.download ?? "Download selected scan"} disabled={!selectedScan} onClick={() => downloadScan()}>
              <DownloadIcon className="size-4" />
            </Button>
            <Button type="button" size="icon-sm" variant="ghost" iconOnly aria-label={labels?.clear ?? "Clear scans"} disabled={!currentScans.length} onClick={clearScans}>
              <Trash2Icon className="size-4" />
            </Button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto p-3">
          {selectedScan ? (
            <div>
              <div className="relative overflow-hidden rounded-xl border bg-background">
                <img src={selectedScan.dataUrl} alt={`Scanned document ${currentScans.findIndex((item) => item.id === selectedScan.id) + 1}`} className="aspect-[3/4] w-full object-contain" />
                <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-semibold text-white">
                  {selectedScan.detected ? `${Math.round(selectedScan.confidence * 100)}% detected` : "Full frame"}
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] text-muted-foreground">
                <span>{selectedScan.width} × {selectedScan.height}</span>
                <span className="text-right capitalize">{selectedScan.processingMode}</span>
              </div>
            </div>
          ) : (
            stateContent?.emptyReview ?? (
              <div className="grid min-h-64 place-items-center rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                <div><ImagesIcon className="mx-auto mb-3 size-8 opacity-50" /><p>{labels?.noScans ?? "Captured pages appear here."}</p></div>
              </div>
            )
          )}

          {currentScans.length ? (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {currentScans.map((scanResult, index) => (
                <button
                  key={scanResult.id}
                  type="button"
                  onClick={() => setCurrentSelectedScanId(scanResult.id)}
                  className={cn("group relative overflow-hidden rounded-lg border bg-background p-1", currentSelectedScanId === scanResult.id && "border-primary ring-2 ring-primary/20")}
                >
                  <img src={scanResult.dataUrl} alt={`Scan ${index + 1}`} className="aspect-[3/4] w-full object-cover" />
                  <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1 text-[8px] font-bold text-white">{index + 1}</span>
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`${labels?.remove ?? "Remove"} ${index + 1}`}
                    onClick={(event) => { event.stopPropagation(); removeScan(scanResult.id) }}
                    onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.stopPropagation(); removeScan(scanResult.id) } }}
                    className="absolute right-1 top-1 grid size-5 place-items-center rounded-full bg-black/70 text-white opacity-0 transition group-hover:opacity-100 focus:opacity-100"
                  >
                    <XIcon className="size-3" />
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </aside>
    )

    const renderedToolbar = renderToolbar ? renderToolbar(toolbarContext) : defaultToolbar
    const renderedReview = renderReview ? renderReview(toolbarContext) : defaultReview
    const polygonTone = detection?.stable ? "#22c55e" : detection ? "#f59e0b" : "#ffffff"

    return (
      <div ref={rootRef} data-slot="document-scanner" data-status={status} className={cn("overflow-hidden rounded-xl border bg-background", className)} {...props}>
        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept={fileAccept}
          onChange={(event) => {
            const file = event.currentTarget.files?.[0]
            event.currentTarget.value = ""
            if (file) void scanFile(file)
          }}
        />
        {beforePreview}
        <div className={cn("grid min-h-[420px] lg:grid-cols-[minmax(0,1fr)_auto]", previewClassName)}>
          <section className="flex min-w-0 flex-col">
            <div className="relative aspect-[4/3] min-h-80 overflow-hidden bg-black">
              <video ref={videoRef} muted playsInline aria-label="Document camera preview" className={cn("h-full w-full object-cover", videoClassName)} />

              {cameraActive ? (
                <>
                  <div aria-hidden="true" className="pointer-events-none absolute inset-[7%] rounded-xl border border-white/25 shadow-[0_0_0_9999px_rgb(0_0_0/0.3)]" />
                  {normalizedDetectionPoints ? (
                    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                      <polygon points={normalizedDetectionPoints} fill={`${polygonTone}20`} stroke={polygonTone} strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
                      {normalizedDetectionPoints.split(" ").map((point, index) => {
                        const [x, y] = point.split(",")
                        return <circle key={index} cx={x} cy={y} r="1.2" fill={polygonTone} />
                      })}
                    </svg>
                  ) : null}
                  <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                    <span className="inline-flex items-center gap-2">
                      <span className={cn("size-2 rounded-full", detection?.stable ? "bg-green-400" : detection ? "bg-amber-400" : "bg-white/50")} />
                      {autoCapture && detection?.stable ? labels?.autoCaptureReady ?? "Auto capture ready" : previewMessage}
                    </span>
                  </div>
                  {autoCapture && detection?.stable ? <div className="pointer-events-none absolute inset-0 animate-pulse border-4 border-green-400/60" /> : null}
                </>
              ) : null}

              {!cameraActive && permission !== "denied" && permission !== "unsupported" ? (
                <div className="absolute inset-0 grid place-items-center bg-black/75 p-6">
                  {stateContent?.idle ?? <DefaultIdleState labels={labels} start={() => void start()} />}
                </div>
              ) : null}

              {(status === "starting" || engineLoading) ? (
                <div className="absolute inset-0 z-20 grid place-items-center bg-black/65 text-white backdrop-blur-sm" role="status">
                  <span className="inline-flex items-center gap-3 text-sm font-semibold"><LoaderCircleIcon className="size-5 animate-spin" />{engineLoading ? labels?.loadingEngine ?? "Loading scan engine" : labels?.requestingPermission ?? "Starting camera"}</span>
                </div>
              ) : null}

              {(permission === "denied" || permission === "unsupported") ? (
                <div className="absolute inset-0 z-30 grid place-items-center bg-black/80 p-6">
                  {resolveStateContent(stateContent?.permissionDenied, <DefaultPermissionState error={error} labels={labels} retry={() => void start()} />, error, () => void start())}
                </div>
              ) : null}

              {error && permission !== "denied" && permission !== "unsupported" ? (
                <div className="absolute inset-0 z-30 grid place-items-center bg-black/80 p-6">
                  {resolveStateContent(stateContent?.error, <DefaultPermissionState error={error} labels={labels} retry={() => void start()} />, error, () => void start())}
                </div>
              ) : null}

              {status === "capturing" || status === "processing" ? (
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                  <div className="absolute inset-x-0 h-1/2 -translate-y-full animate-[scan_1.3s_ease-in-out_infinite] border-b-2 border-cyan-400 bg-gradient-to-b from-transparent to-cyan-400/25" />
                </div>
              ) : null}

              {overlay}
            </div>
            {showToolbar ? renderedToolbar : null}
          </section>
          {showReview ? renderedReview : null}
        </div>
        {afterPreview}
        <canvas ref={sourceCanvasRef} hidden />
        <canvas ref={outputCanvasRef} hidden />
      </div>
    )
  }
)

DocumentScanner.displayName = "DocumentScanner"

export { DocumentScanner }
