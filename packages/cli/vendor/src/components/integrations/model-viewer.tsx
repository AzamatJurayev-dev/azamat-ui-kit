"use client"

import * as React from "react"

import "@google/model-viewer"

import { cn } from "@/lib/utils"

export type ModelViewerProgress = {
  totalProgress?: number
}

export type ModelViewerProps = Omit<React.HTMLAttributes<HTMLElement>, "onError" | "onLoad"> & {
  src: string
  alt: string
  poster?: string
  ar?: boolean
  arModes?: string
  cameraControls?: boolean
  autoRotate?: boolean
  autoRotateDelay?: number
  rotationPerSecond?: string
  autoplay?: boolean
  animationName?: string
  exposure?: number
  shadowIntensity?: number
  environmentImage?: string
  skyboxImage?: string
  cameraOrbit?: string
  minCameraOrbit?: string
  maxCameraOrbit?: string
  fieldOfView?: string
  loading?: "auto" | "lazy" | "eager"
  reveal?: "auto" | "interaction" | "manual"
  interactionPrompt?: "auto" | "none"
  onLoad?: (event: Event) => void
  onError?: (event: Event) => void
  onProgress?: (progress: ModelViewerProgress, event: Event) => void
}

type ModelViewerElementProps = React.HTMLAttributes<HTMLElement> &
  React.RefAttributes<HTMLElement> &
  Record<string, unknown>

function ModelViewer({
  src,
  alt,
  poster,
  ar = false,
  arModes = "webxr scene-viewer quick-look",
  cameraControls = true,
  autoRotate = false,
  autoRotateDelay,
  rotationPerSecond,
  autoplay = false,
  animationName,
  exposure,
  shadowIntensity,
  environmentImage,
  skyboxImage,
  cameraOrbit,
  minCameraOrbit,
  maxCameraOrbit,
  fieldOfView,
  loading = "lazy",
  reveal = "auto",
  interactionPrompt = "auto",
  onLoad,
  onError,
  onProgress,
  className,
  style,
  children,
  ...props
}: ModelViewerProps) {
  const elementRef = React.useRef<HTMLElement | null>(null)
  const callbacksRef = React.useRef({ onLoad, onError, onProgress })

  React.useEffect(() => {
    callbacksRef.current = { onLoad, onError, onProgress }
  }, [onError, onLoad, onProgress])

  React.useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const handleLoad = (event: Event) => callbacksRef.current.onLoad?.(event)
    const handleError = (event: Event) => callbacksRef.current.onError?.(event)
    const handleProgress = (event: Event) => {
      const detail = (event as CustomEvent<ModelViewerProgress>).detail ?? {}
      callbacksRef.current.onProgress?.(detail, event)
    }

    element.addEventListener("load", handleLoad)
    element.addEventListener("error", handleError)
    element.addEventListener("progress", handleProgress)

    return () => {
      element.removeEventListener("load", handleLoad)
      element.removeEventListener("error", handleError)
      element.removeEventListener("progress", handleProgress)
    }
  }, [])

  const elementProps: ModelViewerElementProps = {
    ...props,
    ref: (node: HTMLElement | null) => {
      elementRef.current = node
    },
    src,
    alt,
    poster,
    ar: ar ? "" : undefined,
    "ar-modes": ar ? arModes : undefined,
    "camera-controls": cameraControls ? "" : undefined,
    "auto-rotate": autoRotate ? "" : undefined,
    "auto-rotate-delay": autoRotateDelay,
    "rotation-per-second": rotationPerSecond,
    autoplay: autoplay ? "" : undefined,
    "animation-name": animationName,
    exposure,
    "shadow-intensity": shadowIntensity,
    "environment-image": environmentImage,
    "skybox-image": skyboxImage,
    "camera-orbit": cameraOrbit,
    "min-camera-orbit": minCameraOrbit,
    "max-camera-orbit": maxCameraOrbit,
    "field-of-view": fieldOfView,
    loading,
    reveal,
    "interaction-prompt": interactionPrompt,
    className: cn("block aspect-square min-h-72 w-full overflow-hidden rounded-lg border bg-muted", className),
    style,
    "data-slot": "model-viewer",
  }

  return React.createElement("model-viewer", elementProps, children)
}

export { ModelViewer }
