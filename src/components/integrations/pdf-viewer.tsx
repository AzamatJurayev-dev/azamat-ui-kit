"use client"

import * as React from "react"
import {
  DownloadIcon,
  LoaderCircleIcon,
  MinusIcon,
  PlusIcon,
  RotateCwIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import {
  GlobalWorkerOptions,
  getDocument,
  type PDFDocumentProxy,
  type RenderTask,
} from "pdfjs-dist"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined" && !GlobalWorkerOptions.workerSrc) {
  GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString()
}

export type PdfSource = string | URL | Uint8Array | ArrayBuffer

export type PdfViewerLabels = {
  previousPage?: string
  nextPage?: string
  zoomOut?: string
  zoomIn?: string
  rotate?: string
  download?: string
  loading?: string
  error?: string
  page?: string
  of?: string
}

export type PdfViewerProps = Omit<React.ComponentProps<"div">, "onError"> & {
  src: PdfSource
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  scale?: number
  defaultScale?: number
  onScaleChange?: (scale: number) => void
  rotation?: number
  defaultRotation?: number
  onRotationChange?: (rotation: number) => void
  minScale?: number
  maxScale?: number
  scaleStep?: number
  showToolbar?: boolean
  showDownload?: boolean
  downloadName?: string
  onLoad?: (document: PDFDocumentProxy) => void
  onError?: (error: Error) => void
  labels?: PdfViewerLabels
  canvasClassName?: string
  viewportClassName?: string
}

function normalizePdfSource(src: PdfSource) {
  if (src instanceof ArrayBuffer) return { data: new Uint8Array(src) }
  if (src instanceof Uint8Array) return { data: src }
  if (src instanceof URL) return src.toString()
  return src
}

function PdfViewer({
  src,
  page,
  defaultPage = 1,
  onPageChange,
  scale,
  defaultScale = 1,
  onScaleChange,
  rotation,
  defaultRotation = 0,
  onRotationChange,
  minScale = 0.5,
  maxScale = 3,
  scaleStep = 0.25,
  showToolbar = true,
  showDownload = true,
  downloadName = "document.pdf",
  onLoad,
  onError,
  labels,
  className,
  canvasClassName,
  viewportClassName,
  ...props
}: PdfViewerProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const renderTaskRef = React.useRef<RenderTask | null>(null)
  const [document, setDocument] = React.useState<PDFDocumentProxy | null>(null)
  const [pageCount, setPageCount] = React.useState(0)
  const [internalPage, setInternalPage] = React.useState(defaultPage)
  const [internalScale, setInternalScale] = React.useState(defaultScale)
  const [internalRotation, setInternalRotation] = React.useState(defaultRotation)
  const [loading, setLoading] = React.useState(true)
  const [rendering, setRendering] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)

  const currentPage = page ?? internalPage
  const currentScale = scale ?? internalScale
  const currentRotation = rotation ?? internalRotation

  const updatePage = React.useCallback(
    (nextPage: number) => {
      const normalized = Math.min(Math.max(1, nextPage), Math.max(pageCount, 1))
      if (page === undefined) setInternalPage(normalized)
      onPageChange?.(normalized)
    },
    [onPageChange, page, pageCount]
  )

  const updateScale = React.useCallback(
    (nextScale: number) => {
      const normalized = Math.min(Math.max(minScale, nextScale), maxScale)
      if (scale === undefined) setInternalScale(normalized)
      onScaleChange?.(normalized)
    },
    [maxScale, minScale, onScaleChange, scale]
  )

  const updateRotation = React.useCallback(
    (nextRotation: number) => {
      const normalized = ((nextRotation % 360) + 360) % 360
      if (rotation === undefined) setInternalRotation(normalized)
      onRotationChange?.(normalized)
    },
    [onRotationChange, rotation]
  )

  React.useEffect(() => {
    let disposed = false
    const loadingTask = getDocument(normalizePdfSource(src))

    setLoading(true)
    setError(null)
    setDocument(null)
    setPageCount(0)

    loadingTask.promise
      .then((nextDocument) => {
        if (disposed) {
          void nextDocument.destroy()
          return
        }
        setDocument(nextDocument)
        setPageCount(nextDocument.numPages)
        setLoading(false)
        onLoad?.(nextDocument)
      })
      .catch((cause: unknown) => {
        if (disposed) return
        const nextError = cause instanceof Error ? cause : new Error("PDF document could not be loaded")
        setError(nextError)
        setLoading(false)
        onError?.(nextError)
      })

    return () => {
      disposed = true
      renderTaskRef.current?.cancel()
      renderTaskRef.current = null
      void loadingTask.destroy()
    }
  }, [onError, onLoad, src])

  React.useEffect(() => {
    if (!document || !canvasRef.current) return

    let disposed = false
    setRendering(true)
    setError(null)
    renderTaskRef.current?.cancel()

    document
      .getPage(Math.min(Math.max(1, currentPage), document.numPages))
      .then((pdfPage) => {
        if (disposed || !canvasRef.current) return

        const canvas = canvasRef.current
        const viewport = pdfPage.getViewport({
          scale: currentScale,
          rotation: currentRotation,
        })
        const outputScale = Math.max(window.devicePixelRatio || 1, 1)
        const context = canvas.getContext("2d")

        if (!context) throw new Error("Canvas 2D context is unavailable")

        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)
        canvas.style.width = `${Math.floor(viewport.width)}px`
        canvas.style.height = `${Math.floor(viewport.height)}px`

        const renderTask = pdfPage.render({
          canvasContext: context,
          viewport,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
        })
        renderTaskRef.current = renderTask
        return renderTask.promise
      })
      .then(() => {
        if (!disposed) setRendering(false)
      })
      .catch((cause: unknown) => {
        if (disposed || (cause instanceof Error && cause.name === "RenderingCancelledException")) return
        const nextError = cause instanceof Error ? cause : new Error("PDF page could not be rendered")
        setError(nextError)
        setRendering(false)
        onError?.(nextError)
      })

    return () => {
      disposed = true
      renderTaskRef.current?.cancel()
    }
  }, [currentPage, currentRotation, currentScale, document, onError])

  React.useEffect(() => {
    if (pageCount > 0 && currentPage > pageCount) updatePage(pageCount)
  }, [currentPage, pageCount, updatePage])

  const downloadHref = typeof src === "string" ? src : src instanceof URL ? src.toString() : undefined

  return (
    <div
      data-slot="pdf-viewer"
      className={cn("overflow-hidden rounded-lg border bg-background", className)}
      {...props}
    >
      {showToolbar ? (
        <div
          data-slot="pdf-toolbar"
          className="flex flex-wrap items-center justify-between gap-2 border-b bg-muted/40 p-2"
        >
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              iconOnly
              aria-label={labels?.previousPage ?? "Previous page"}
              disabled={loading || currentPage <= 1}
              onClick={() => updatePage(currentPage - 1)}
            >
              <ChevronLeftIcon className="size-4" aria-hidden="true" />
            </Button>
            <span className="min-w-24 text-center text-xs tabular-nums text-muted-foreground">
              {labels?.page ?? "Page"} {Math.min(currentPage, Math.max(pageCount, 1))} {labels?.of ?? "of"} {pageCount || "—"}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              iconOnly
              aria-label={labels?.nextPage ?? "Next page"}
              disabled={loading || currentPage >= pageCount}
              onClick={() => updatePage(currentPage + 1)}
            >
              <ChevronRightIcon className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              iconOnly
              aria-label={labels?.zoomOut ?? "Zoom out"}
              disabled={currentScale <= minScale}
              onClick={() => updateScale(currentScale - scaleStep)}
            >
              <MinusIcon className="size-4" aria-hidden="true" />
            </Button>
            <span className="w-14 text-center text-xs tabular-nums text-muted-foreground">
              {Math.round(currentScale * 100)}%
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              iconOnly
              aria-label={labels?.zoomIn ?? "Zoom in"}
              disabled={currentScale >= maxScale}
              onClick={() => updateScale(currentScale + scaleStep)}
            >
              <PlusIcon className="size-4" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              iconOnly
              aria-label={labels?.rotate ?? "Rotate"}
              onClick={() => updateRotation(currentRotation + 90)}
            >
              <RotateCwIcon className="size-4" aria-hidden="true" />
            </Button>
            {showDownload && downloadHref ? (
              <Button
                render={<a href={downloadHref} download={downloadName} />}
                variant="ghost"
                size="icon-sm"
                iconOnly
                aria-label={labels?.download ?? "Download"}
              >
                <DownloadIcon className="size-4" aria-hidden="true" />
              </Button>
            ) : null}
          </div>
        </div>
      ) : null}

      <div
        data-slot="pdf-viewport"
        className={cn(
          "relative grid min-h-80 place-items-start overflow-auto bg-muted/30 p-4",
          viewportClassName
        )}
      >
        {loading ? (
          <div className="absolute inset-0 grid place-items-center" role="status">
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <LoaderCircleIcon className="size-4 animate-spin" aria-hidden="true" />
              {labels?.loading ?? "Loading document"}
            </span>
          </div>
        ) : null}

        {error ? (
          <div className="absolute inset-0 grid place-items-center p-6" role="alert">
            <p className="max-w-md text-center text-sm text-destructive">
              {labels?.error ?? error.message}
            </p>
          </div>
        ) : null}

        <canvas
          ref={canvasRef}
          data-slot="pdf-canvas"
          aria-label={`${labels?.page ?? "Page"} ${currentPage}`}
          className={cn(
            "mx-auto bg-white shadow-sm transition-opacity",
            (loading || rendering || error) && "opacity-40",
            canvasClassName
          )}
        />
      </div>
    </div>
  )
}

export { PdfViewer }
