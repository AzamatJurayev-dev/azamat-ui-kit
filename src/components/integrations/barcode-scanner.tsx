"use client"

import * as React from "react"
import {
  BrowserCodeReader,
  BrowserMultiFormatReader,
  BrowserQRCodeReader,
  type IScannerControls,
} from "@zxing/browser"
import { CameraIcon, CameraOffIcon, RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ScannerDevice = {
  deviceId: string
  label: string
}

export type BarcodeScannerProps = Omit<React.ComponentProps<"div">, "onError"> & {
  mode?: "barcode" | "qr"
  deviceId?: string
  facingMode?: "user" | "environment"
  paused?: boolean
  scanDelay?: number
  stopAfterResult?: boolean
  showDeviceSelect?: boolean
  showControls?: boolean
  onResult?: (value: string, result: unknown) => void
  onError?: (error: Error) => void
  onDevicesChange?: (devices: ScannerDevice[]) => void
  videoClassName?: string
  overlay?: React.ReactNode
  labels?: {
    start?: string
    stop?: string
    retry?: string
    camera?: string
    noCamera?: string
    permissionError?: string
    scanning?: string
  }
}

function BarcodeScanner({
  mode = "barcode",
  deviceId,
  facingMode = "environment",
  paused = false,
  scanDelay = 750,
  stopAfterResult = false,
  showDeviceSelect = true,
  showControls = true,
  onResult,
  onError,
  onDevicesChange,
  className,
  videoClassName,
  overlay,
  labels,
  ...props
}: BarcodeScannerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const controlsRef = React.useRef<IScannerControls | null>(null)
  const lastResultRef = React.useRef<{ value: string; timestamp: number } | null>(null)
  const [devices, setDevices] = React.useState<ScannerDevice[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = React.useState(deviceId ?? "")
  const [running, setRunning] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [restartKey, setRestartKey] = React.useState(0)

  const stop = React.useCallback(() => {
    controlsRef.current?.stop()
    controlsRef.current = null

    const stream = videoRef.current?.srcObject
    if (stream instanceof MediaStream) {
      for (const track of stream.getTracks()) track.stop()
    }
    if (videoRef.current) videoRef.current.srcObject = null
    setRunning(false)
  }, [])

  React.useEffect(() => {
    setSelectedDeviceId(deviceId ?? "")
  }, [deviceId])

  React.useEffect(() => {
    let disposed = false

    BrowserCodeReader.listVideoInputDevices()
      .then((videoDevices) => {
        if (disposed) return
        const nextDevices = videoDevices.map((item, index) => ({
          deviceId: item.deviceId,
          label: item.label || `${labels?.camera ?? "Camera"} ${index + 1}`,
        }))
        setDevices(nextDevices)
        onDevicesChange?.(nextDevices)
        setSelectedDeviceId((current) => current || nextDevices[0]?.deviceId || "")
      })
      .catch((cause: unknown) => {
        if (disposed) return
        const nextError = cause instanceof Error ? cause : new Error("Camera devices could not be listed")
        setError(nextError)
        onError?.(nextError)
      })

    return () => {
      disposed = true
    }
  }, [labels?.camera, onDevicesChange, onError])

  React.useEffect(() => {
    if (paused || !videoRef.current) {
      stop()
      return
    }

    let disposed = false
    const reader = mode === "qr" ? new BrowserQRCodeReader() : new BrowserMultiFormatReader()

    setError(null)

    const handleResult = (result: { getText: () => string } | undefined) => {
      if (!result || disposed) return

      const value = result.getText()
      const now = Date.now()
      const previous = lastResultRef.current
      if (previous?.value === value && now - previous.timestamp < scanDelay) return

      lastResultRef.current = { value, timestamp: now }
      onResult?.(value, result)
      if (stopAfterResult) stop()
    }

    const start = async () => {
      try {
        const controls = selectedDeviceId
          ? await reader.decodeFromVideoDevice(
              selectedDeviceId,
              videoRef.current,
              (result) => handleResult(result ?? undefined)
            )
          : await reader.decodeFromConstraints(
              { video: { facingMode: { ideal: facingMode } }, audio: false },
              videoRef.current,
              (result) => handleResult(result ?? undefined)
            )

        if (disposed) {
          controls.stop()
          return
        }

        controlsRef.current = controls
        setRunning(true)
      } catch (cause: unknown) {
        if (disposed) return
        const nextError = cause instanceof Error ? cause : new Error("Camera could not be started")
        setError(nextError)
        setRunning(false)
        onError?.(nextError)
      }
    }

    void start()

    return () => {
      disposed = true
      stop()
    }
  }, [facingMode, mode, onError, onResult, paused, restartKey, scanDelay, selectedDeviceId, stop, stopAfterResult])

  return (
    <div
      data-slot="barcode-scanner"
      data-running={running || undefined}
      className={cn("grid gap-3", className)}
      {...props}
    >
      <div className="relative aspect-video min-h-56 overflow-hidden rounded-lg border bg-black">
        <video
          ref={videoRef}
          data-slot="scanner-video"
          muted
          playsInline
          aria-label={labels?.scanning ?? "Camera scanner preview"}
          className={cn("h-full w-full object-cover", videoClassName)}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[12%] rounded-lg border-2 border-white/80 shadow-[0_0_0_9999px_rgb(0_0_0/0.35)]"
        />
        {overlay}

        {!running && !error ? (
          <div className="absolute inset-0 grid place-items-center text-white/80" role="status">
            <CameraIcon className="size-8" aria-hidden="true" />
          </div>
        ) : null}

        {error ? (
          <div className="absolute inset-0 grid place-items-center gap-3 bg-black/70 p-6 text-center text-white" role="alert">
            <div className="grid justify-items-center gap-2">
              <CameraOffIcon className="size-8" aria-hidden="true" />
              <p className="max-w-sm text-sm">
                {labels?.permissionError ?? error.message}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        {showDeviceSelect && devices.length > 1 ? (
          <label className="flex min-w-0 flex-1 items-center gap-2 text-sm text-muted-foreground">
            <span className="shrink-0">{labels?.camera ?? "Camera"}</span>
            <select
              value={selectedDeviceId}
              className="h-9 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onChange={(event) => {
                stop()
                setSelectedDeviceId(event.target.value)
              }}
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </label>
        ) : devices.length === 0 && error ? (
          <span className="text-sm text-muted-foreground">{labels?.noCamera ?? "No camera available"}</span>
        ) : (
          <span className="text-sm text-muted-foreground">
            {running ? labels?.scanning ?? "Scanning" : labels?.stop ?? "Camera stopped"}
          </span>
        )}

        {showControls ? (
          <div className="flex items-center gap-2">
            {running ? (
              <Button type="button" variant="outline" size="sm" onClick={stop}>
                <CameraOffIcon className="size-4" aria-hidden="true" />
                {labels?.stop ?? "Stop"}
              </Button>
            ) : (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setError(null)
                  setRestartKey((value) => value + 1)
                }}
              >
                {error ? (
                  <RefreshCwIcon className="size-4" aria-hidden="true" />
                ) : (
                  <CameraIcon className="size-4" aria-hidden="true" />
                )}
                {error ? labels?.retry ?? "Retry" : labels?.start ?? "Start"}
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export type QrScannerProps = Omit<BarcodeScannerProps, "mode">

function QrScanner(props: QrScannerProps) {
  return <BarcodeScanner mode="qr" {...props} />
}

export { BarcodeScanner, QrScanner }
