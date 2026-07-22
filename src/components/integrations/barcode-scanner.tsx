"use client"

import * as React from "react"
import {
  BrowserCodeReader,
  BrowserMultiFormatReader,
  BrowserQRCodeReader,
  type IScannerControls,
} from "@zxing/browser"
import {
  BarcodeFormat,
  DecodeHintType,
  NotFoundException,
  type Result,
} from "@zxing/library"
import {
  CameraIcon,
  CameraOffIcon,
  CheckIcon,
  ChevronDownIcon,
  ClipboardIcon,
  FlashlightIcon,
  FlashlightOffIcon,
  HistoryIcon,
  ImageIcon,
  PauseIcon,
  PlayIcon,
  RefreshCwIcon,
  ScanBarcodeIcon,
  Trash2Icon,
  UploadIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ScannerMode = "barcode" | "qr"
export type ScannerStatus = "idle" | "starting" | "scanning" | "paused" | "success" | "error"
export type ScannerPermission = "prompt" | "granted" | "denied" | "unsupported"

export type ScannerDevice = {
  deviceId: string
  label: string
  groupId?: string
}

export type ScannerRegion = {
  x: number
  y: number
  width: number
  height: number
}

export type ScannerHistoryItem = {
  id: string
  value: string
  format: string
  rawBytes?: Uint8Array
  source: "camera" | "image"
  deviceId?: string
  createdAt: number
}

export type BarcodeScannerSnapshot = {
  status: ScannerStatus
  permission: ScannerPermission
  running: boolean
  paused: boolean
  torchSupported: boolean
  torchEnabled: boolean
  deviceId?: string
  devices: ScannerDevice[]
  history: ScannerHistoryItem[]
  lastResult: ScannerHistoryItem | null
}

export type BarcodeScannerHandle = {
  start: () => Promise<void>
  stop: () => void
  pause: () => void
  resume: () => Promise<void>
  retry: () => Promise<void>
  listDevices: () => Promise<ScannerDevice[]>
  switchDevice: (deviceId: string) => Promise<void>
  toggleTorch: (enabled?: boolean) => Promise<boolean>
  decodeFile: (file: File) => Promise<ScannerHistoryItem>
  clearHistory: () => void
  removeHistoryItem: (id: string) => void
  copyResult: (id?: string) => Promise<void>
  getSnapshot: () => BarcodeScannerSnapshot
  video: HTMLVideoElement | null
}

export type BarcodeScannerStateContent = {
  idle?: React.ReactNode | ((start: () => Promise<void>) => React.ReactNode)
  permissionDenied?: React.ReactNode | ((error: Error, retry: () => Promise<void>) => React.ReactNode)
  error?: React.ReactNode | ((error: Error, retry: () => Promise<void>) => React.ReactNode)
  emptyHistory?: React.ReactNode
}

export type BarcodeScannerToolbarContext = BarcodeScannerSnapshot & {
  mode: ScannerMode
  selectedFormats: BarcodeFormat[]
  actions: BarcodeScannerHandle
}

export type BarcodeScannerHistoryContext = BarcodeScannerSnapshot & {
  actions: BarcodeScannerHandle
}

export type BarcodeScannerProps = Omit<React.ComponentProps<"div">, "onError"> & {
  mode?: ScannerMode
  deviceId?: string
  defaultDeviceId?: string
  onDeviceIdChange?: (deviceId: string) => void
  facingMode?: "user" | "environment"
  preferredWidth?: number
  preferredHeight?: number
  preferredFrameRate?: number
  paused?: boolean
  defaultPaused?: boolean
  onPausedChange?: (paused: boolean) => void
  formats?: BarcodeFormat[]
  tryHarder?: boolean
  scanRegion?: ScannerRegion
  scanDelay?: number
  duplicateWindowMs?: number
  stopAfterResult?: boolean
  pauseAfterResult?: boolean
  resumeDelayMs?: number
  maxHistory?: number
  history?: ScannerHistoryItem[]
  defaultHistory?: ScannerHistoryItem[]
  onHistoryChange?: (history: ScannerHistoryItem[]) => void
  allowTorch?: boolean
  allowImageUpload?: boolean
  showDeviceSelect?: boolean
  showControls?: boolean
  showHistory?: boolean
  showResultOverlay?: boolean
  autoStart?: boolean
  beep?: boolean
  vibrate?: boolean | number[]
  onResult?: (item: ScannerHistoryItem, result: Result) => void
  onError?: (error: Error) => void
  onStatusChange?: (status: ScannerStatus) => void
  onPermissionChange?: (permission: ScannerPermission) => void
  onDevicesChange?: (devices: ScannerDevice[]) => void
  onTorchChange?: (enabled: boolean, supported: boolean) => void
  renderToolbar?: (context: BarcodeScannerToolbarContext) => React.ReactNode
  renderHistory?: (context: BarcodeScannerHistoryContext) => React.ReactNode
  stateContent?: BarcodeScannerStateContent
  beforePreview?: React.ReactNode
  afterPreview?: React.ReactNode
  overlay?: React.ReactNode
  videoClassName?: string
  previewClassName?: string
  toolbarClassName?: string
  historyClassName?: string
  labels?: {
    start?: string
    stop?: string
    pause?: string
    resume?: string
    retry?: string
    camera?: string
    noCamera?: string
    permissionError?: string
    scanning?: string
    paused?: string
    uploadImage?: string
    history?: string
    clearHistory?: string
    copy?: string
    remove?: string
    torchOn?: string
    torchOff?: string
    noResult?: string
  }
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
  const setValue = React.useCallback((nextValue: T) => {
    if (!controlled) setInternalValue(nextValue)
    onChange?.(nextValue)
  }, [controlled, onChange])
  return [currentValue, setValue] as const
}

function createError(cause: unknown, fallback: string) {
  return cause instanceof Error ? cause : new Error(fallback)
}

function mapPermission(error: Error): ScannerPermission {
  if (error.name === "NotAllowedError" || error.name === "SecurityError") return "denied"
  if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) return "unsupported"
  return "prompt"
}

function getFormatName(result: Result) {
  try {
    return BarcodeFormat[result.getBarcodeFormat()] ?? String(result.getBarcodeFormat())
  } catch {
    return "UNKNOWN"
  }
}

function createReader(mode: ScannerMode, formats: BarcodeFormat[] | undefined, tryHarder: boolean) {
  if (mode === "qr" && (!formats || formats.length === 0 || (formats.length === 1 && formats[0] === BarcodeFormat.QR_CODE))) {
    return new BrowserQRCodeReader()
  }

  const hints = new Map<DecodeHintType, unknown>()
  if (formats?.length) hints.set(DecodeHintType.POSSIBLE_FORMATS, formats)
  if (tryHarder) hints.set(DecodeHintType.TRY_HARDER, true)
  return new BrowserMultiFormatReader(hints)
}

function createHistoryItem(result: Result, source: "camera" | "image", deviceId?: string): ScannerHistoryItem {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    value: result.getText(),
    format: getFormatName(result),
    rawBytes: result.getRawBytes() ?? undefined,
    source,
    deviceId: deviceId || undefined,
    createdAt: Date.now(),
  }
}

function BarcodeScannerComponent({
  mode = "barcode",
  deviceId,
  defaultDeviceId = "",
  onDeviceIdChange,
  facingMode = "environment",
  preferredWidth = 1920,
  preferredHeight = 1080,
  preferredFrameRate = 30,
  paused,
  defaultPaused = false,
  onPausedChange,
  formats,
  tryHarder = true,
  scanRegion = { x: 12, y: 18, width: 76, height: 64 },
  scanDelay = 250,
  duplicateWindowMs = 1500,
  stopAfterResult = false,
  pauseAfterResult = false,
  resumeDelayMs = 900,
  maxHistory = 20,
  history,
  defaultHistory = [],
  onHistoryChange,
  allowTorch = true,
  allowImageUpload = true,
  showDeviceSelect = true,
  showControls = true,
  showHistory = true,
  showResultOverlay = true,
  autoStart = true,
  beep = false,
  vibrate = false,
  onResult,
  onError,
  onStatusChange,
  onPermissionChange,
  onDevicesChange,
  onTorchChange,
  renderToolbar,
  renderHistory,
  stateContent,
  beforePreview,
  afterPreview,
  overlay,
  className,
  videoClassName,
  previewClassName,
  toolbarClassName,
  historyClassName,
  labels,
  ...props
}: BarcodeScannerProps, forwardedRef: React.ForwardedRef<BarcodeScannerHandle>) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const controlsRef = React.useRef<IScannerControls | null>(null)
  const readerRef = React.useRef<BrowserCodeReader | null>(null)
  const lastResultRef = React.useRef<{ value: string; timestamp: number } | null>(null)
  const resumeTimerRef = React.useRef<number | null>(null)
  const [devices, setDevices] = React.useState<ScannerDevice[]>([])
  const [status, setStatusState] = React.useState<ScannerStatus>("idle")
  const [permission, setPermissionState] = React.useState<ScannerPermission>("prompt")
  const [error, setError] = React.useState<Error | null>(null)
  const [torchSupported, setTorchSupported] = React.useState(false)
  const [torchEnabled, setTorchEnabled] = React.useState(false)
  const [lastResult, setLastResult] = React.useState<ScannerHistoryItem | null>(null)

  const [selectedDeviceId, setSelectedDeviceId] = useControllableState({
    value: deviceId,
    defaultValue: defaultDeviceId,
    onChange: onDeviceIdChange,
  })
  const [currentPaused, setCurrentPaused] = useControllableState({
    value: paused,
    defaultValue: defaultPaused,
    onChange: onPausedChange,
  })
  const [currentHistory, setCurrentHistory] = useControllableState({
    value: history,
    defaultValue: defaultHistory,
    onChange: onHistoryChange,
  })

  const setStatus = React.useCallback((nextStatus: ScannerStatus) => {
    setStatusState(nextStatus)
    onStatusChange?.(nextStatus)
  }, [onStatusChange])

  const setPermission = React.useCallback((nextPermission: ScannerPermission) => {
    setPermissionState(nextPermission)
    onPermissionChange?.(nextPermission)
  }, [onPermissionChange])

  const stop = React.useCallback(() => {
    if (resumeTimerRef.current != null) window.clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = null
    controlsRef.current?.stop()
    controlsRef.current = null
    readerRef.current = null
    const stream = videoRef.current?.srcObject
    if (stream instanceof MediaStream) stream.getTracks().forEach((track) => track.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setTorchSupported(false)
    setTorchEnabled(false)
    setStatus("idle")
  }, [setStatus])

  const listDevices = React.useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      setPermission("unsupported")
      throw new Error("MediaDevices API is unavailable")
    }
    const inputs = await BrowserCodeReader.listVideoInputDevices()
    const nextDevices = inputs.map((item, index) => ({
      deviceId: item.deviceId,
      groupId: item.groupId,
      label: item.label || `${labels?.camera ?? "Camera"} ${index + 1}`,
    }))
    setDevices(nextDevices)
    onDevicesChange?.(nextDevices)
    if (!selectedDeviceId && nextDevices[0]) setSelectedDeviceId(nextDevices[0].deviceId)
    return nextDevices
  }, [labels?.camera, onDevicesChange, selectedDeviceId, setPermission, setSelectedDeviceId])

  const emitFeedback = React.useCallback(() => {
    if (vibrate && navigator.vibrate) navigator.vibrate(vibrate === true ? 80 : vibrate)
    if (beep && typeof AudioContext !== "undefined") {
      const context = new AudioContext()
      const oscillator = context.createOscillator()
      const gain = context.createGain()
      oscillator.frequency.value = 880
      gain.gain.value = 0.04
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start()
      oscillator.stop(context.currentTime + 0.08)
      oscillator.addEventListener("ended", () => void context.close(), { once: true })
    }
  }, [beep, vibrate])

  const appendResult = React.useCallback((result: Result, source: "camera" | "image") => {
    const item = createHistoryItem(result, source, selectedDeviceId)
    const now = Date.now()
    const previous = lastResultRef.current
    if (previous?.value === item.value && now - previous.timestamp < duplicateWindowMs) return null
    lastResultRef.current = { value: item.value, timestamp: now }
    const nextHistory = [item, ...currentHistory].slice(0, Math.max(maxHistory, 1))
    setCurrentHistory(nextHistory)
    setLastResult(item)
    setStatus("success")
    emitFeedback()
    onResult?.(item, result)
    return item
  }, [currentHistory, duplicateWindowMs, emitFeedback, maxHistory, onResult, selectedDeviceId, setCurrentHistory, setStatus])

  const updateTorchSupport = React.useCallback(() => {
    const controls = controlsRef.current as (IScannerControls & { switchTorch?: (onOff: boolean) => Promise<void> }) | null
    const supported = typeof controls?.switchTorch === "function"
    setTorchSupported(supported)
    if (!supported) setTorchEnabled(false)
    onTorchChange?.(supported ? torchEnabled : false, supported)
  }, [onTorchChange, torchEnabled])

  const start = React.useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      const nextError = new Error("Camera scanning is unsupported in this browser")
      setPermission("unsupported")
      setError(nextError)
      setStatus("error")
      onError?.(nextError)
      throw nextError
    }
    if (typeof window !== "undefined" && !window.isSecureContext) {
      const nextError = new Error("Camera access requires HTTPS or localhost")
      setPermission("denied")
      setError(nextError)
      setStatus("error")
      onError?.(nextError)
      throw nextError
    }

    stop()
    setStatus("starting")
    setError(null)
    const reader = createReader(mode, formats, tryHarder)
    readerRef.current = reader

    try {
      const constraints: MediaStreamConstraints = {
        audio: false,
        video: selectedDeviceId
          ? { deviceId: { exact: selectedDeviceId } }
          : {
              facingMode: { ideal: facingMode },
              width: { ideal: preferredWidth },
              height: { ideal: preferredHeight },
              frameRate: { ideal: preferredFrameRate },
            },
      }

      const controls = selectedDeviceId
        ? await reader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, scanError) => {
            if (result) {
              const item = appendResult(result, "camera")
              if (!item) return
              if (stopAfterResult) stop()
              else if (pauseAfterResult) {
                setCurrentPaused(true)
                controlsRef.current?.stop()
                setStatus("paused")
                resumeTimerRef.current = window.setTimeout(() => {
                  setCurrentPaused(false)
                }, resumeDelayMs)
              } else setStatus("scanning")
            } else if (scanError && !(scanError instanceof NotFoundException)) {
              onError?.(createError(scanError, "Barcode decoding failed"))
            }
          })
        : await reader.decodeFromConstraints(constraints, videoRef.current, (result, scanError) => {
            if (result) {
              const item = appendResult(result, "camera")
              if (!item) return
              if (stopAfterResult) stop()
              else if (pauseAfterResult) {
                setCurrentPaused(true)
                controlsRef.current?.stop()
                setStatus("paused")
                resumeTimerRef.current = window.setTimeout(() => setCurrentPaused(false), resumeDelayMs)
              } else setStatus("scanning")
            } else if (scanError && !(scanError instanceof NotFoundException)) {
              onError?.(createError(scanError, "Barcode decoding failed"))
            }
          })

      controlsRef.current = controls
      setPermission("granted")
      setStatus("scanning")
      await listDevices().catch(() => [])
      updateTorchSupport()
    } catch (cause: unknown) {
      const nextError = createError(cause, "Camera could not be started")
      setPermission(mapPermission(nextError))
      setError(nextError)
      setStatus("error")
      onError?.(nextError)
      throw nextError
    }
  }, [appendResult, facingMode, formats, listDevices, mode, onError, pauseAfterResult, preferredFrameRate, preferredHeight, preferredWidth, resumeDelayMs, selectedDeviceId, setCurrentPaused, setPermission, setStatus, stop, stopAfterResult, tryHarder, updateTorchSupport])

  const pause = React.useCallback(() => {
    setCurrentPaused(true)
    controlsRef.current?.stop()
    controlsRef.current = null
    setStatus("paused")
  }, [setCurrentPaused, setStatus])

  const resume = React.useCallback(async () => {
    setCurrentPaused(false)
    await start()
  }, [setCurrentPaused, start])

  const retry = React.useCallback(async () => {
    setError(null)
    await start()
  }, [start])

  const switchDevice = React.useCallback(async (nextDeviceId: string) => {
    setSelectedDeviceId(nextDeviceId)
    stop()
    await Promise.resolve()
  }, [setSelectedDeviceId, stop])

  const toggleTorch = React.useCallback(async (enabled?: boolean) => {
    if (!allowTorch) return false
    const controls = controlsRef.current as (IScannerControls & { switchTorch?: (onOff: boolean) => Promise<void> }) | null
    if (!controls?.switchTorch) return false
    const nextEnabled = enabled ?? !torchEnabled
    await controls.switchTorch(nextEnabled)
    setTorchEnabled(nextEnabled)
    onTorchChange?.(nextEnabled, true)
    return nextEnabled
  }, [allowTorch, onTorchChange, torchEnabled])

  const decodeFile = React.useCallback(async (file: File) => {
    const reader = createReader(mode, formats, tryHarder)
    const url = URL.createObjectURL(file)
    try {
      const result = await reader.decodeFromImageUrl(url)
      const item = appendResult(result, "image")
      if (!item) throw new Error("Duplicate result was suppressed")
      return item
    } catch (cause: unknown) {
      const nextError = createError(cause, "No supported code was found in the image")
      setError(nextError)
      onError?.(nextError)
      throw nextError
    } finally {
      URL.revokeObjectURL(url)
    }
  }, [appendResult, formats, mode, onError, tryHarder])

  const removeHistoryItem = React.useCallback((id: string) => {
    setCurrentHistory(currentHistory.filter((item) => item.id !== id))
    if (lastResult?.id === id) setLastResult(null)
  }, [currentHistory, lastResult?.id, setCurrentHistory])

  const clearHistory = React.useCallback(() => {
    setCurrentHistory([])
    setLastResult(null)
  }, [setCurrentHistory])

  const copyResult = React.useCallback(async (id?: string) => {
    const item = id ? currentHistory.find((entry) => entry.id === id) : lastResult
    if (!item) return
    await navigator.clipboard.writeText(item.value)
  }, [currentHistory, lastResult])

  const getSnapshot = React.useCallback((): BarcodeScannerSnapshot => ({
    status,
    permission,
    running: status === "scanning" || status === "success",
    paused: currentPaused,
    torchSupported,
    torchEnabled,
    deviceId: selectedDeviceId || undefined,
    devices,
    history: currentHistory,
    lastResult,
  }), [currentHistory, currentPaused, devices, lastResult, permission, selectedDeviceId, status, torchEnabled, torchSupported])

  const actions = React.useMemo<BarcodeScannerHandle>(() => ({
    start,
    stop,
    pause,
    resume,
    retry,
    listDevices,
    switchDevice,
    toggleTorch,
    decodeFile,
    clearHistory,
    removeHistoryItem,
    copyResult,
    getSnapshot,
    video: videoRef.current,
  }), [clearHistory, copyResult, decodeFile, getSnapshot, listDevices, pause, removeHistoryItem, resume, retry, start, stop, switchDevice, toggleTorch])

  React.useImperativeHandle(forwardedRef, () => actions, [actions])

  React.useEffect(() => {
    if (!navigator.mediaDevices?.addEventListener) return
    const handleDeviceChange = () => void listDevices().catch(() => [])
    navigator.mediaDevices.addEventListener("devicechange", handleDeviceChange)
    return () => navigator.mediaDevices.removeEventListener("devicechange", handleDeviceChange)
  }, [listDevices])

  React.useEffect(() => {
    if (!autoStart || currentPaused) return
    void start().catch(() => undefined)
    return stop
  }, [autoStart, currentPaused, selectedDeviceId, start, stop])

  React.useEffect(() => stop, [stop])

  const snapshot = getSnapshot()
  const toolbarContext: BarcodeScannerToolbarContext = {
    ...snapshot,
    mode,
    selectedFormats: formats ?? (mode === "qr" ? [BarcodeFormat.QR_CODE] : []),
    actions,
  }
  const historyContext: BarcodeScannerHistoryContext = { ...snapshot, actions }

  const defaultToolbar = (
    <div className={cn("flex flex-wrap items-center justify-between gap-2", toolbarClassName)} data-slot="scanner-toolbar">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        {showDeviceSelect && devices.length > 1 ? (
          <label className="relative min-w-44 flex-1 sm:max-w-xs">
            <span className="sr-only">{labels?.camera ?? "Camera"}</span>
            <select
              value={selectedDeviceId}
              onChange={(event) => void switchDevice(event.target.value)}
              className="h-9 w-full appearance-none rounded-md border bg-background px-3 pr-8 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {devices.map((device) => <option key={device.deviceId} value={device.deviceId}>{device.label}</option>)}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </label>
        ) : <span className="text-sm text-muted-foreground">{status === "scanning" ? labels?.scanning ?? "Scanning" : labels?.paused ?? "Scanner paused"}</span>}

        {allowTorch && torchSupported ? (
          <Button type="button" size="icon-sm" variant={torchEnabled ? "secondary" : "outline"} iconOnly aria-label={torchEnabled ? labels?.torchOff ?? "Turn torch off" : labels?.torchOn ?? "Turn torch on"} onClick={() => void toggleTorch()}>
            {torchEnabled ? <FlashlightOffIcon className="size-4" /> : <FlashlightIcon className="size-4" />}
          </Button>
        ) : null}
      </div>

      {showControls ? (
        <div className="flex items-center gap-2">
          {allowImageUpload ? (
            <Button type="button" size="sm" variant="outline" leftIcon={<UploadIcon className="size-4" />} onClick={() => fileInputRef.current?.click()}>
              {labels?.uploadImage ?? "Image"}
            </Button>
          ) : null}
          {status === "scanning" || status === "success" ? (
            <Button type="button" size="sm" variant="outline" leftIcon={<PauseIcon className="size-4" />} onClick={pause}>{labels?.pause ?? "Pause"}</Button>
          ) : currentPaused || status === "paused" ? (
            <Button type="button" size="sm" leftIcon={<PlayIcon className="size-4" />} onClick={() => void resume()}>{labels?.resume ?? "Resume"}</Button>
          ) : (
            <Button type="button" size="sm" leftIcon={error ? <RefreshCwIcon className="size-4" /> : <CameraIcon className="size-4" />} onClick={() => void retry()}>
              {error ? labels?.retry ?? "Retry" : labels?.start ?? "Start"}
            </Button>
          )}
          {(status === "scanning" || status === "success" || status === "paused") ? (
            <Button type="button" size="icon-sm" variant="ghost" iconOnly aria-label={labels?.stop ?? "Stop scanner"} onClick={stop}><CameraOffIcon className="size-4" /></Button>
          ) : null}
        </div>
      ) : null}
    </div>
  )

  const defaultHistory = (
    <div className={cn("rounded-lg border bg-muted/20 p-3", historyClassName)} data-slot="scanner-history">
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-semibold"><HistoryIcon className="size-4" />{labels?.history ?? "Scan history"}<span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{currentHistory.length}</span></p>
        {currentHistory.length ? <Button type="button" size="xs" variant="ghost" leftIcon={<Trash2Icon className="size-3.5" />} onClick={clearHistory}>{labels?.clearHistory ?? "Clear"}</Button> : null}
      </div>
      {currentHistory.length ? (
        <div className="grid max-h-64 gap-2 overflow-auto">
          {currentHistory.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-md border bg-background p-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">{item.source === "image" ? <ImageIcon className="size-4" /> : <ScanBarcodeIcon className="size-4" />}</span>
              <div className="min-w-0 flex-1"><p className="truncate font-mono text-xs font-semibold">{item.value}</p><p className="mt-1 text-[11px] text-muted-foreground">{item.format} · {new Date(item.createdAt).toLocaleTimeString()}</p></div>
              <Button type="button" size="icon-xs" variant="ghost" iconOnly aria-label={labels?.copy ?? "Copy"} onClick={() => void copyResult(item.id)}><ClipboardIcon className="size-3.5" /></Button>
              <Button type="button" size="icon-xs" variant="ghost" iconOnly aria-label={labels?.remove ?? "Remove"} onClick={() => removeHistoryItem(item.id)}><XIcon className="size-3.5" /></Button>
            </div>
          ))}
        </div>
      ) : stateContent?.emptyHistory ?? <p className="py-6 text-center text-sm text-muted-foreground">{labels?.noResult ?? "No codes scanned yet"}</p>}
    </div>
  )

  return (
    <div data-slot="barcode-scanner" data-status={status} className={cn("grid gap-3", className)} {...props}>
      {beforePreview}
      <div className={cn("relative aspect-video min-h-64 overflow-hidden rounded-lg border bg-black", previewClassName)}>
        <video ref={videoRef} muted playsInline aria-label={labels?.scanning ?? "Camera scanner preview"} className={cn("h-full w-full object-cover", videoClassName)} />
        <div aria-hidden="true" className="pointer-events-none absolute rounded-xl border-2 border-white/85 shadow-[0_0_0_9999px_rgb(0_0_0/0.45)]" style={{ left: `${scanRegion.x}%`, top: `${scanRegion.y}%`, width: `${scanRegion.width}%`, height: `${scanRegion.height}%` }}>
          {status === "scanning" ? <div className="absolute inset-x-3 top-1/2 h-0.5 animate-pulse bg-red-500 shadow-[0_0_12px_rgba(239,68,68,.9)]" /> : null}
        </div>
        {overlay}

        {lastResult && showResultOverlay ? (
          <div className="absolute bottom-4 left-1/2 z-20 flex max-w-[90%] -translate-x-1/2 items-center gap-3 rounded-xl border border-emerald-400/30 bg-emerald-950/85 px-4 py-3 text-white shadow-xl backdrop-blur" role="status">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-400 text-emerald-950"><CheckIcon className="size-4" /></span>
            <div className="min-w-0"><p className="truncate font-mono text-xs font-semibold">{lastResult.value}</p><p className="text-[10px] text-emerald-200">{lastResult.format}</p></div>
          </div>
        ) : null}

        {status === "idle" && !error ? (
          <div className="absolute inset-0 grid place-items-center bg-black/35 p-6 text-center text-white">
            {typeof stateContent?.idle === "function" ? stateContent.idle(start) : stateContent?.idle ?? <div><CameraIcon className="mx-auto size-9" /><p className="mt-3 text-sm">{labels?.start ?? "Start camera scanner"}</p></div>}
          </div>
        ) : null}

        {error ? (
          <div className="absolute inset-0 z-30 grid place-items-center bg-black/80 p-6 text-center text-white" role="alert">
            {permission === "denied" && typeof stateContent?.permissionDenied === "function"
              ? stateContent.permissionDenied(error, retry)
              : typeof stateContent?.error === "function"
                ? stateContent.error(error, retry)
                : stateContent?.error ?? <div><CameraOffIcon className="mx-auto size-9" /><p className="mt-3 max-w-sm text-sm">{labels?.permissionError ?? error.message}</p><Button className="mt-4" size="sm" variant="secondary" leftIcon={<RefreshCwIcon className="size-4" />} onClick={() => void retry()}>{labels?.retry ?? "Retry"}</Button></div>}
          </div>
        ) : null}
      </div>
      {afterPreview}
      {renderToolbar ? renderToolbar(toolbarContext) : defaultToolbar}
      {showHistory ? (renderHistory ? renderHistory(historyContext) : defaultHistory) : null}
      <input ref={fileInputRef} hidden type="file" accept="image/*" onChange={(event) => { const file = event.currentTarget.files?.[0]; if (file) void decodeFile(file); event.currentTarget.value = "" }} />
    </div>
  )
}

const BarcodeScanner = React.forwardRef<BarcodeScannerHandle, BarcodeScannerProps>(BarcodeScannerComponent)
BarcodeScanner.displayName = "BarcodeScanner"

export type QrScannerProps = Omit<BarcodeScannerProps, "mode" | "formats">

const QrScanner = React.forwardRef<BarcodeScannerHandle, QrScannerProps>(function QrScanner(props, ref) {
  return <BarcodeScanner ref={ref} mode="qr" formats={[BarcodeFormat.QR_CODE]} {...props} />
})
QrScanner.displayName = "QrScanner"

export { BarcodeScanner, QrScanner }
