"use client"

import * as React from "react"
import Cropper, { type Area, type Point } from "react-easy-crop"
import { RotateCwIcon, ZoomInIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function degreesToRadians(degrees: number) {
  return (degrees * Math.PI) / 180
}

function getRotatedSize(width: number, height: number, rotation: number) {
  const radians = degreesToRadians(rotation)
  return {
    width: Math.abs(Math.cos(radians) * width) + Math.abs(Math.sin(radians) * height),
    height: Math.abs(Math.sin(radians) * width) + Math.abs(Math.cos(radians) * height),
  }
}

function loadImage(src: string, crossOrigin?: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    if (crossOrigin) image.crossOrigin = crossOrigin
    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Crop source image could not be loaded"))
    image.src = src
  })
}

export async function createCroppedImageBlob({
  src,
  crop,
  rotation = 0,
  type = "image/png",
  quality = 0.92,
  crossOrigin = "anonymous",
}: {
  src: string
  crop: Area
  rotation?: number
  type?: string
  quality?: number
  crossOrigin?: string
}) {
  const image = await loadImage(src, crossOrigin)
  const rotatedSize = getRotatedSize(image.naturalWidth, image.naturalHeight, rotation)
  const sourceCanvas = document.createElement("canvas")
  sourceCanvas.width = Math.ceil(rotatedSize.width)
  sourceCanvas.height = Math.ceil(rotatedSize.height)
  const sourceContext = sourceCanvas.getContext("2d")
  if (!sourceContext) throw new Error("Canvas 2D context is unavailable")

  sourceContext.translate(sourceCanvas.width / 2, sourceCanvas.height / 2)
  sourceContext.rotate(degreesToRadians(rotation))
  sourceContext.translate(-image.naturalWidth / 2, -image.naturalHeight / 2)
  sourceContext.drawImage(image, 0, 0)

  const outputCanvas = document.createElement("canvas")
  outputCanvas.width = Math.max(1, Math.round(crop.width))
  outputCanvas.height = Math.max(1, Math.round(crop.height))
  const outputContext = outputCanvas.getContext("2d")
  if (!outputContext) throw new Error("Canvas 2D context is unavailable")
  outputContext.drawImage(
    sourceCanvas,
    Math.round(crop.x),
    Math.round(crop.y),
    Math.round(crop.width),
    Math.round(crop.height),
    0,
    0,
    outputCanvas.width,
    outputCanvas.height
  )

  return new Promise<Blob>((resolve, reject) => {
    outputCanvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Cropped image could not be encoded"))),
      type,
      quality
    )
  })
}

export type ImageCropperProps = Omit<React.ComponentProps<"div">, "onChange"> & {
  src: string
  alt?: string
  crop?: Point
  defaultCrop?: Point
  onCropChange?: (crop: Point) => void
  zoom?: number
  defaultZoom?: number
  onZoomChange?: (zoom: number) => void
  rotation?: number
  defaultRotation?: number
  onRotationChange?: (rotation: number) => void
  onCropComplete?: (area: Area, areaPixels: Area) => void
  aspect?: number
  cropShape?: "rect" | "round"
  objectFit?: "contain" | "cover" | "horizontal-cover" | "vertical-cover"
  minZoom?: number
  maxZoom?: number
  zoomStep?: number
  showGrid?: boolean
  disabled?: boolean
  labels?: {
    cropper?: string
    zoom?: string
    rotation?: string
  }
}

function ImageCropper({
  src,
  alt = "Image crop preview",
  crop,
  defaultCrop = { x: 0, y: 0 },
  onCropChange,
  zoom,
  defaultZoom = 1,
  onZoomChange,
  rotation,
  defaultRotation = 0,
  onRotationChange,
  onCropComplete,
  aspect = 1,
  cropShape = "rect",
  objectFit = "contain",
  minZoom = 1,
  maxZoom = 3,
  zoomStep = 0.1,
  showGrid = true,
  disabled = false,
  labels,
  className,
  ...props
}: ImageCropperProps) {
  const [internalCrop, setInternalCrop] = React.useState(defaultCrop)
  const [internalZoom, setInternalZoom] = React.useState(defaultZoom)
  const [internalRotation, setInternalRotation] = React.useState(defaultRotation)
  const currentCrop = crop ?? internalCrop
  const currentZoom = zoom ?? internalZoom
  const currentRotation = rotation ?? internalRotation

  return (
    <div data-slot="image-cropper" data-disabled={disabled || undefined} className={cn("grid gap-3 data-[disabled]:opacity-60", className)} {...props}>
      <div
        role="img"
        aria-label={labels?.cropper ?? alt}
        className={cn("relative min-h-64 overflow-hidden rounded-md bg-black", disabled && "pointer-events-none")}
        style={{ aspectRatio: aspect }}
      >
        <Cropper
          image={src}
          crop={currentCrop}
          zoom={currentZoom}
          rotation={currentRotation}
          aspect={aspect}
          cropShape={cropShape}
          objectFit={objectFit}
          minZoom={minZoom}
          maxZoom={maxZoom}
          zoomSpeed={zoomStep}
          showGrid={showGrid}
          onCropChange={(nextCrop) => {
            if (crop === undefined) setInternalCrop(nextCrop)
            onCropChange?.(nextCrop)
          }}
          onZoomChange={(nextZoom) => {
            if (zoom === undefined) setInternalZoom(nextZoom)
            onZoomChange?.(nextZoom)
          }}
          onRotationChange={(nextRotation) => {
            if (rotation === undefined) setInternalRotation(nextRotation)
            onRotationChange?.(nextRotation)
          }}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="grid grid-cols-[auto_1fr_auto] items-center gap-2 text-xs text-muted-foreground">
          <ZoomInIcon className="size-4" aria-hidden="true" />
          <span className="sr-only">{labels?.zoom ?? "Zoom"}</span>
          <input
            type="range"
            min={minZoom}
            max={maxZoom}
            step={zoomStep}
            value={currentZoom}
            disabled={disabled}
            aria-label={labels?.zoom ?? "Zoom"}
            className="w-full accent-foreground"
            onChange={(event) => {
              const nextZoom = Number(event.target.value)
              if (zoom === undefined) setInternalZoom(nextZoom)
              onZoomChange?.(nextZoom)
            }}
          />
          <span className="w-9 text-right tabular-nums">{currentZoom.toFixed(1)}x</span>
        </label>
        <label className="grid grid-cols-[auto_1fr_auto] items-center gap-2 text-xs text-muted-foreground">
          <RotateCwIcon className="size-4" aria-hidden="true" />
          <span className="sr-only">{labels?.rotation ?? "Rotation"}</span>
          <input
            type="range"
            min="-180"
            max="180"
            step="1"
            value={currentRotation}
            disabled={disabled}
            aria-label={labels?.rotation ?? "Rotation"}
            className="w-full accent-foreground"
            onChange={(event) => {
              const nextRotation = Number(event.target.value)
              if (rotation === undefined) setInternalRotation(nextRotation)
              onRotationChange?.(nextRotation)
            }}
          />
          <span className="w-10 text-right tabular-nums">{Math.round(currentRotation)}°</span>
        </label>
      </div>
    </div>
  )
}

export { ImageCropper }
