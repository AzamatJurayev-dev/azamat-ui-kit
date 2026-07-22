"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  FileIcon,
  ListIcon,
  LoaderCircleIcon,
  LockKeyholeIcon,
  MaximizeIcon,
  MinimizeIcon,
  MinusIcon,
  PanelLeftCloseIcon,
  PanelLeftOpenIcon,
  PlusIcon,
  PrinterIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  RotateCwIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"
import {
  GlobalWorkerOptions,
  getDocument,
  type DocumentInitParameters,
  type PDFDocumentProxy,
  type PDFPageProxy,
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

export type PdfSource =
  | string
  | URL
  | Uint8Array
  | ArrayBuffer
  | DocumentInitParameters
  | null
  | undefined

export type PdfViewMode = "single" | "continuous"
export type PdfFitMode = "custom" | "width" | "page"

export type PdfLoadingProgress = {
  loaded: number
  total?: number
  percent?: number
}

export type PdfSearchResult = {
  pageNumber: number
  matchIndex: number
  text: string
  context: string
}

export type PdfPasswordRequest = {
  reason: number
  submit: (password: string) => void
}

export type PdfViewerLabels = {
  previousPage?: string
  nextPage?: string
  page?: string
  of?: string
  zoomOut?: string
  zoomIn?: string
  fitWidth?: string
  fitPage?: string
  rotateCounterClockwise?: string
  rotateClockwise?: string
  download?: string
  print?: string
  fullscreen?: string
  exitFullscreen?: string
  openSidebar?: string
  closeSidebar?: string
  thumbnails?: string
  singlePage?: string
  continuous?: string
  search?: string
  searchPlaceholder?: string
  previousMatch?: string
  nextMatch?: string
  closeSearch?: string
  noMatches?: string
  loading?: string
  rendering?: string
  error?: string
  retry?: string
  empty?: string
  passwordTitle?: string
  passwordDescription?: string
  passwordPlaceholder?: string
  passwordSubmit?: string
  incorrectPassword?: string
}

export type PdfViewerStateContent = {
  empty?: React.ReactNode
  loading?: React.ReactNode | ((progress: PdfLoadingProgress | null) => React.ReactNode)
  error?: React.ReactNode | ((error: Error, retry: () => void) => React.ReactNode)
  password?: React.ReactNode | ((request: PdfPasswordRequest) => React.ReactNode)
}

export type PdfViewerHandle = {
  getDocument: () => PDFDocumentProxy | null
  previousPage: () => void
  nextPage: () => void
  goToPage: (page: number) => void
  zoomOut: () => void
  zoomIn: () => void
  setScale: (scale: number) => void
  fitWidth: () => Promise<void>
  fitPage: () => Promise<void>
  rotateCounterClockwise: () => void
  rotateClockwise: () => void
  search: (query: string) => Promise<PdfSearchResult[]>
  previousMatch: () => void
  nextMatch: () => void
  download: () => Promise<void>
  print: () => Promise<void>
  toggleFullscreen: () => Promise<void>
}

export type PdfViewerToolbarContext = {
  document: PDFDocumentProxy | null
  page: number
  pageCount: number
  pageLabel: string
  scale: number
  rotation: number
  viewMode: PdfViewMode
  fitMode: PdfFitMode
  sidebarOpen: boolean
  searchOpen: boolean
  searching: boolean
  searchQuery: string
  searchResults: PdfSearchResult[]
  activeSearchIndex: number
  loading: boolean
  rendering: boolean
  fullscreen: boolean
  actions: PdfViewerHandle & {
    setViewMode: (mode: PdfViewMode) => void
    setSidebarOpen: (open: boolean) => void
    setSearchOpen: (open: boolean) => void
    setSearchQuery: (query: string) => void
  }
}

export type PdfViewerProps = Omit<React.ComponentProps<"div">, "onError"> & {
  src?: PdfSource
  page?: number
  defaultPage?: number
  onPageChange?: (page: number) => void
  scale?: number
  defaultScale?: number
  onScaleChange?: (scale: number) => void
  rotation?: number
  defaultRotation?: number
  onRotationChange?: (rotation: number) => void
  viewMode?: PdfViewMode
  defaultViewMode?: PdfViewMode
  onViewModeChange?: (mode: PdfViewMode) => void
  fitMode?: PdfFitMode
  defaultFitMode?: PdfFitMode
  onFitModeChange?: (mode: PdfFitMode) => void
  sidebarOpen?: boolean
  defaultSidebarOpen?: boolean
  onSidebarOpenChange?: (open: boolean) => void
  searchOpen?: boolean
  defaultSearchOpen?: boolean
  onSearchOpenChange?: (open: boolean) => void
  searchQuery?: string
  defaultSearchQuery?: string
  onSearchQueryChange?: (query: string) => void
  onSearchResultsChange?: (results: PdfSearchResult[]) => void
  searchOnChange?: boolean
  searchDebounceMs?: number
  maxSearchResults?: number
  minScale?: number
  maxScale?: number
  scaleStep?: number
  thumbnailWidth?: number
  continuousGap?: number
  lazyRootMargin?: string
  autoFitOnResize?: boolean
  keyboardShortcuts?: boolean
  showToolbar?: boolean
  showSidebarToggle?: boolean
  showThumbnails?: boolean
  showSearch?: boolean
  showViewModeToggle?: boolean
  showZoom?: boolean
  showRotate?: boolean
  showPrint?: boolean
  showDownload?: boolean
  showFullscreen?: boolean
  showPasswordPrompt?: boolean
  downloadName?: string
  password?: string
  labels?: PdfViewerLabels
  stateContent?: PdfViewerStateContent
  renderToolbar?: (context: PdfViewerToolbarContext) => React.ReactNode
  sidebarContent?: React.ReactNode | ((context: PdfViewerToolbarContext) => React.ReactNode)
  beforeToolbar?: React.ReactNode
  afterToolbar?: React.ReactNode
  overlay?: React.ReactNode
  onLoad?: (document: PDFDocumentProxy) => void
  onProgress?: (progress: PdfLoadingProgress) => void
  onPasswordRequest?: (request: PdfPasswordRequest) => void
  onMetadata?: (metadata: Awaited<ReturnType<PDFDocumentProxy["getMetadata"]>>) => void
  onOutline?: (outline: Awaited<ReturnType<PDFDocumentProxy["getOutline"]>>) => void
  onPageRendered?: (pageNumber: number, page: PDFPageProxy) => void
  onDownload?: (data: Uint8Array) => void
  onPrint?: (data: Uint8Array) => void
  onError?: (error: Error) => void
  ariaLabel?: string
  canvasClassName?: string
  pageClassName?: string
  viewportClassName?: string
  toolbarClassName?: string
  sidebarClassName?: string
  searchClassName?: string
}

type PasswordRequestState = PdfPasswordRequest & {
  incorrect: boolean
}

type PdfViewerCallbacks = Pick<
  PdfViewerProps,
  | "onLoad"
  | "onProgress"
  | "onPasswordRequest"
  | "onMetadata"
  | "onOutline"
  | "onPageRendered"
  | "onDownload"
  | "onPrint"
  | "onError"
  | "onSearchResultsChange"
>

type PdfCanvasPageProps = {
  document: PDFDocumentProxy
  pageNumber: number
  scale: number
  rotation: number
  lazy?: boolean
  rootMargin?: string
  targetWidth?: number
  active?: boolean
  searchMatchCount?: number
  canvasClassName?: string
  pageClassName?: string
  onVisible?: (pageNumber: number, ratio: number) => void
  onRendered?: (pageNumber: number, page: PDFPageProxy) => void
  onRenderingChange?: (pageNumber: number, rendering: boolean) => void
  onError?: (error: Error) => void
  labels?: PdfViewerLabels
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

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function normalizeRotation(rotation: number) {
  return ((rotation % 360) + 360) % 360
}

function normalizePdfSource(src: PdfSource, password?: string): DocumentInitParameters | null {
  if (src == null || src === "") return null
  if (src instanceof ArrayBuffer) return { data: new Uint8Array(src), password }
  if (src instanceof Uint8Array) return { data: src, password }
  if (src instanceof URL) return { url: src.toString(), password }
  if (typeof src === "string") return { url: src, password }
  if (password && src.password == null) return { ...src, password }
  return src
}

function createError(cause: unknown, fallback: string) {
  return cause instanceof Error ? cause : new Error(fallback)
}

function getTextItemValue(item: unknown) {
  if (typeof item === "object" && item != null && "str" in item) {
    return String((item as { str: unknown }).str)
  }
  return ""
}

function createSearchContext(text: string, index: number, queryLength: number) {
  const start = Math.max(0, index - 44)
  const end = Math.min(text.length, index + queryLength + 56)
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trim()}${end < text.length ? "…" : ""}`
}

function toPdfBlob(data: Uint8Array) {
  const buffer = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength)
  return new Blob([buffer as ArrayBuffer], { type: "application/pdf" })
}

function resolveStateContent<T extends unknown[]>(
  content: React.ReactNode | ((...args: T) => React.ReactNode) | undefined,
  fallback: React.ReactNode,
  ...args: T
) {
  if (typeof content === "function") return content(...args)
  return content ?? fallback
}

function PdfCanvasPage({
  document,
  pageNumber,
  scale,
  rotation,
  lazy = false,
  rootMargin = "500px 0px",
  targetWidth,
  active,
  searchMatchCount = 0,
  canvasClassName,
  pageClassName,
  onVisible,
  onRendered,
  onRenderingChange,
  onError,
  labels,
}: PdfCanvasPageProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const renderTaskRef = React.useRef<RenderTask | null>(null)
  const [visible, setVisible] = React.useState(!lazy)
  const [rendering, setRendering] = React.useState(false)
  const [dimensions, setDimensions] = React.useState<{ width: number; height: number } | null>(null)
  const [error, setError] = React.useState<Error | null>(null)

  React.useEffect(() => {
    const element = containerRef.current
    if (!element || !lazy || typeof IntersectionObserver === "undefined") {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) setVisible(true)
        onVisible?.(pageNumber, entry.intersectionRatio)
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [lazy, onVisible, pageNumber, rootMargin])

  React.useEffect(() => {
    if (!visible || !canvasRef.current) return

    let disposed = false
    setRendering(true)
    setError(null)
    onRenderingChange?.(pageNumber, true)
    renderTaskRef.current?.cancel()

    document
      .getPage(pageNumber)
      .then((pdfPage) => {
        if (disposed || !canvasRef.current) return null

        const baseViewport = pdfPage.getViewport({ scale: 1, rotation })
        const resolvedScale = targetWidth ? targetWidth / Math.max(baseViewport.width, 1) : scale
        const viewport = pdfPage.getViewport({ scale: resolvedScale, rotation })
        const outputScale = Math.max(window.devicePixelRatio || 1, 1)
        const canvas = canvasRef.current
        const context = canvas.getContext("2d")

        if (!context) throw new Error("Canvas 2D context is unavailable")

        canvas.width = Math.floor(viewport.width * outputScale)
        canvas.height = Math.floor(viewport.height * outputScale)
        canvas.style.width = `${Math.floor(viewport.width)}px`
        canvas.style.height = `${Math.floor(viewport.height)}px`
        setDimensions({ width: viewport.width, height: viewport.height })

        const renderTask = pdfPage.render({
          canvasContext: context,
          viewport,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
        })

        renderTaskRef.current = renderTask
        return renderTask.promise.then(() => pdfPage)
      })
      .then((pdfPage) => {
        if (disposed || !pdfPage) return
        setRendering(false)
        onRenderingChange?.(pageNumber, false)
        onRendered?.(pageNumber, pdfPage)
      })
      .catch((cause: unknown) => {
        if (disposed || (cause instanceof Error && cause.name === "RenderingCancelledException")) return
        const nextError = createError(cause, "PDF page could not be rendered")
        setError(nextError)
        setRendering(false)
        onRenderingChange?.(pageNumber, false)
        onError?.(nextError)
      })

    return () => {
      disposed = true
      renderTaskRef.current?.cancel()
      renderTaskRef.current = null
      onRenderingChange?.(pageNumber, false)
    }
  }, [document, onError, onRendered, onRenderingChange, pageNumber, rotation, scale, targetWidth, visible])

  return (
    <div
      ref={containerRef}
      data-slot="pdf-page"
      data-page-number={pageNumber}
      data-active={active ? "true" : undefined}
      className={cn(
        "relative mx-auto grid min-h-48 place-items-center",
        active && "ring-2 ring-primary/50 ring-offset-4 ring-offset-muted/30",
        pageClassName
      )}
      style={dimensions ? { minWidth: dimensions.width, minHeight: dimensions.height } : undefined}
    >
      {rendering ? (
        <div className="absolute inset-0 z-10 grid place-items-center bg-background/45" role="status">
          <LoaderCircleIcon className="size-5 animate-spin text-muted-foreground" aria-hidden="true" />
          <span className="sr-only">{labels?.rendering ?? "Rendering page"}</span>
        </div>
      ) : null}

      {error ? (
        <div className="absolute inset-0 z-20 grid place-items-center p-4" role="alert">
          <p className="max-w-xs text-center text-xs text-destructive">{error.message}</p>
        </div>
      ) : null}

      {searchMatchCount > 0 ? (
        <span className="absolute right-2 top-2 z-20 rounded-full bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground shadow">
          {searchMatchCount} match{searchMatchCount === 1 ? "" : "es"}
        </span>
      ) : null}

      <canvas
        ref={canvasRef}
        data-slot="pdf-canvas"
        aria-label={`${labels?.page ?? "Page"} ${pageNumber}`}
        className={cn(
          "bg-white shadow-md transition-opacity",
          (rendering || error) && "opacity-45",
          canvasClassName
        )}
      />
    </div>
  )
}

function DefaultEmptyState({ labels }: { labels?: PdfViewerLabels }) {
  return (
    <div className="grid max-w-sm place-items-center text-center" role="status">
      <span className="grid size-12 place-items-center rounded-2xl bg-muted text-muted-foreground">
        <FileIcon className="size-6" aria-hidden="true" />
      </span>
      <p className="mt-4 text-sm font-semibold">{labels?.empty ?? "No PDF document"}</p>
      <p className="mt-1 text-xs text-muted-foreground">Pass a URL, byte array, or PDF.js document options.</p>
    </div>
  )
}

function DefaultLoadingState({
  labels,
  progress,
}: {
  labels?: PdfViewerLabels
  progress: PdfLoadingProgress | null
}) {
  return (
    <div className="grid w-full max-w-xs place-items-center text-center" role="status" aria-live="polite">
      <LoaderCircleIcon className="size-6 animate-spin text-primary" aria-hidden="true" />
      <p className="mt-3 text-sm font-semibold">{labels?.loading ?? "Loading document"}</p>
      {progress?.percent != null ? (
        <div className="mt-3 w-full">
          <div className="h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${progress.percent}%` }} />
          </div>
          <p className="mt-1 text-xs tabular-nums text-muted-foreground">{progress.percent}%</p>
        </div>
      ) : null}
    </div>
  )
}

function DefaultErrorState({
  error,
  retry,
  labels,
}: {
  error: Error
  retry: () => void
  labels?: PdfViewerLabels
}) {
  return (
    <div className="grid max-w-md place-items-center text-center" role="alert">
      <p className="text-sm font-semibold text-destructive">{labels?.error ?? "Document could not be loaded"}</p>
      <p className="mt-1 text-xs text-muted-foreground">{error.message}</p>
      <Button className="mt-4" size="sm" variant="outline" onClick={retry} leftIcon={<RefreshCwIcon className="size-4" />}>
        {labels?.retry ?? "Retry"}
      </Button>
    </div>
  )
}

function DefaultPasswordState({
  request,
  labels,
}: {
  request: PasswordRequestState
  labels?: PdfViewerLabels
}) {
  const [value, setValue] = React.useState("")

  React.useEffect(() => setValue(""), [request])

  return (
    <form
      className="w-full max-w-sm rounded-2xl border bg-background p-5 shadow-xl"
      onSubmit={(event) => {
        event.preventDefault()
        if (value.trim()) request.submit(value)
      }}
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-muted text-muted-foreground">
          <LockKeyholeIcon className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-sm font-semibold">{labels?.passwordTitle ?? "Password protected PDF"}</h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            {request.incorrect
              ? labels?.incorrectPassword ?? "The password was incorrect. Try again."
              : labels?.passwordDescription ?? "Enter the document password to continue."}
          </p>
        </div>
      </div>
      <input
        autoFocus
        type="password"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={labels?.passwordPlaceholder ?? "Document password"}
        className="mt-4 h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
      <Button className="mt-3 w-full" type="submit" disabled={!value.trim()}>
        {labels?.passwordSubmit ?? "Open document"}
      </Button>
    </form>
  )
}

const PdfViewer = React.forwardRef<PdfViewerHandle, PdfViewerProps>(function PdfViewer(
  {
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
    viewMode,
    defaultViewMode = "single",
    onViewModeChange,
    fitMode,
    defaultFitMode = "custom",
    onFitModeChange,
    sidebarOpen,
    defaultSidebarOpen = false,
    onSidebarOpenChange,
    searchOpen,
    defaultSearchOpen = false,
    onSearchOpenChange,
    searchQuery,
    defaultSearchQuery = "",
    onSearchQueryChange,
    onSearchResultsChange,
    searchOnChange = false,
    searchDebounceMs = 300,
    maxSearchResults = 500,
    minScale = 0.4,
    maxScale = 4,
    scaleStep = 0.2,
    thumbnailWidth = 112,
    continuousGap = 24,
    lazyRootMargin = "600px 0px",
    autoFitOnResize = true,
    keyboardShortcuts = true,
    showToolbar = true,
    showSidebarToggle = true,
    showThumbnails = true,
    showSearch = true,
    showViewModeToggle = true,
    showZoom = true,
    showRotate = true,
    showPrint = true,
    showDownload = true,
    showFullscreen = true,
    showPasswordPrompt = true,
    downloadName = "document.pdf",
    password,
    labels,
    stateContent,
    renderToolbar,
    sidebarContent,
    beforeToolbar,
    afterToolbar,
    overlay,
    onLoad,
    onProgress,
    onPasswordRequest,
    onMetadata,
    onOutline,
    onPageRendered,
    onDownload,
    onPrint,
    onError,
    ariaLabel = "PDF document viewer",
    className,
    canvasClassName,
    pageClassName,
    viewportClassName,
    toolbarClassName,
    sidebarClassName,
    searchClassName,
    ...props
  },
  forwardedRef
) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const pageElementsRef = React.useRef(new Map<number, HTMLDivElement>())
  const renderingPagesRef = React.useRef(new Set<number>())
  const searchRunRef = React.useRef(0)
  const printFrameRef = React.useRef<HTMLIFrameElement | null>(null)
  const callbacksRef = useLatest<PdfViewerCallbacks>({
    onLoad,
    onProgress,
    onPasswordRequest,
    onMetadata,
    onOutline,
    onPageRendered,
    onDownload,
    onPrint,
    onError,
    onSearchResultsChange,
  })

  const [pdfDocument, setPdfDocument] = React.useState<PDFDocumentProxy | null>(null)
  const [pageCount, setPageCount] = React.useState(0)
  const [pageLabels, setPageLabels] = React.useState<string[] | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [loadingProgress, setLoadingProgress] = React.useState<PdfLoadingProgress | null>(null)
  const [rendering, setRendering] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [passwordRequest, setPasswordRequest] = React.useState<PasswordRequestState | null>(null)
  const [searching, setSearching] = React.useState(false)
  const [searchResults, setSearchResults] = React.useState<PdfSearchResult[]>([])
  const [activeSearchIndex, setActiveSearchIndex] = React.useState(-1)
  const [reloadKey, setReloadKey] = React.useState(0)
  const [fullscreen, setFullscreen] = React.useState(false)

  const [currentPage, setCurrentPage] = useControllableState({ value: page, defaultValue: defaultPage, onChange: onPageChange })
  const [currentScale, setCurrentScale] = useControllableState({ value: scale, defaultValue: defaultScale, onChange: onScaleChange })
  const [currentRotation, setCurrentRotation] = useControllableState({ value: rotation, defaultValue: defaultRotation, onChange: onRotationChange })
  const [currentViewMode, setCurrentViewMode] = useControllableState({ value: viewMode, defaultValue: defaultViewMode, onChange: onViewModeChange })
  const [currentFitMode, setCurrentFitMode] = useControllableState({ value: fitMode, defaultValue: defaultFitMode, onChange: onFitModeChange })
  const [currentSidebarOpen, setCurrentSidebarOpen] = useControllableState({ value: sidebarOpen, defaultValue: defaultSidebarOpen, onChange: onSidebarOpenChange })
  const [currentSearchOpen, setCurrentSearchOpen] = useControllableState({ value: searchOpen, defaultValue: defaultSearchOpen, onChange: onSearchOpenChange })
  const [currentSearchQuery, setCurrentSearchQuery] = useControllableState({ value: searchQuery, defaultValue: defaultSearchQuery, onChange: onSearchQueryChange })

  const normalizedSource = React.useMemo(() => normalizePdfSource(src, password), [password, src])
  const pageLabel = pageLabels?.[currentPage - 1] ?? String(currentPage)
  const searchCountsByPage = React.useMemo(() => {
    const counts = new Map<number, number>()
    searchResults.forEach((result) => counts.set(result.pageNumber, (counts.get(result.pageNumber) ?? 0) + 1))
    return counts
  }, [searchResults])

  const reportError = React.useCallback((cause: unknown, fallback: string) => {
    const nextError = createError(cause, fallback)
    setError(nextError)
    callbacksRef.current.onError?.(nextError)
    return nextError
  }, [callbacksRef])

  const updatePage = React.useCallback(
    (nextPage: number, scroll = true) => {
      const normalized = clamp(Math.round(nextPage), 1, Math.max(pageCount, 1))
      setCurrentPage(normalized)
      if (scroll && currentViewMode === "continuous") {
        window.requestAnimationFrame(() => {
          pageElementsRef.current.get(normalized)?.scrollIntoView({ block: "start", behavior: "smooth" })
        })
      }
    },
    [currentViewMode, pageCount, setCurrentPage]
  )

  const updateScale = React.useCallback(
    (nextScale: number, preserveFit = false) => {
      setCurrentScale(clamp(nextScale, minScale, maxScale))
      if (!preserveFit) setCurrentFitMode("custom")
    },
    [maxScale, minScale, setCurrentFitMode, setCurrentScale]
  )

  const updateRotation = React.useCallback(
    (nextRotation: number) => setCurrentRotation(normalizeRotation(nextRotation)),
    [setCurrentRotation]
  )

  const handleRenderingChange = React.useCallback((pageNumber: number, nextRendering: boolean) => {
    if (nextRendering) renderingPagesRef.current.add(pageNumber)
    else renderingPagesRef.current.delete(pageNumber)
    setRendering(renderingPagesRef.current.size > 0)
  }, [])

  const fitDocument = React.useCallback(
    async (mode: "width" | "page") => {
      if (!pdfDocument || !viewportRef.current) return
      const pdfPage = await pdfDocument.getPage(clamp(currentPage, 1, pdfDocument.numPages))
      const viewport = pdfPage.getViewport({ scale: 1, rotation: currentRotation })
      const container = viewportRef.current
      const styles = window.getComputedStyle(container)
      const horizontalPadding = Number.parseFloat(styles.paddingLeft) + Number.parseFloat(styles.paddingRight)
      const verticalPadding = Number.parseFloat(styles.paddingTop) + Number.parseFloat(styles.paddingBottom)
      const widthScale = Math.max(container.clientWidth - horizontalPadding, 120) / Math.max(viewport.width, 1)
      const pageScale = Math.min(
        widthScale,
        Math.max(container.clientHeight - verticalPadding, 120) / Math.max(viewport.height, 1)
      )
      setCurrentFitMode(mode)
      updateScale(mode === "width" ? widthScale : pageScale, true)
    },
    [currentPage, currentRotation, pdfDocument, setCurrentFitMode, updateScale]
  )

  const getDocumentData = React.useCallback(async () => {
    if (!pdfDocument) throw new Error("PDF document is not loaded")
    return pdfDocument.getData()
  }, [pdfDocument])

  const downloadDocument = React.useCallback(async () => {
    try {
      const data = await getDocumentData()
      callbacksRef.current.onDownload?.(data)
      const url = URL.createObjectURL(toPdfBlob(data))
      const anchor = window.document.createElement("a")
      anchor.href = url
      anchor.download = downloadName
      anchor.click()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (cause: unknown) {
      reportError(cause, "PDF document could not be downloaded")
    }
  }, [callbacksRef, downloadName, getDocumentData, reportError])

  const printDocument = React.useCallback(async () => {
    try {
      const data = await getDocumentData()
      callbacksRef.current.onPrint?.(data)
      const url = URL.createObjectURL(toPdfBlob(data))
      printFrameRef.current?.remove()
      const frame = window.document.createElement("iframe")
      frame.style.position = "fixed"
      frame.style.right = "0"
      frame.style.bottom = "0"
      frame.style.width = "0"
      frame.style.height = "0"
      frame.style.border = "0"
      frame.src = url
      frame.onload = () => {
        frame.contentWindow?.focus()
        frame.contentWindow?.print()
        window.setTimeout(() => {
          frame.remove()
          URL.revokeObjectURL(url)
        }, 1000)
      }
      printFrameRef.current = frame
      window.document.body.appendChild(frame)
    } catch (cause: unknown) {
      reportError(cause, "PDF document could not be printed")
    }
  }, [callbacksRef, getDocumentData, reportError])

  const toggleFullscreen = React.useCallback(async () => {
    try {
      if (!rootRef.current) return
      if (window.document.fullscreenElement) await window.document.exitFullscreen()
      else await rootRef.current.requestFullscreen()
    } catch (cause: unknown) {
      reportError(cause, "Fullscreen mode could not be changed")
    }
  }, [reportError])

  const activateSearchResult = React.useCallback(
    (index: number) => {
      if (!searchResults.length) return
      const normalized = (index + searchResults.length) % searchResults.length
      setActiveSearchIndex(normalized)
      updatePage(searchResults[normalized].pageNumber)
    },
    [searchResults, updatePage]
  )

  const runSearch = React.useCallback(
    async (query: string) => {
      const trimmed = query.trim()
      const runId = ++searchRunRef.current
      if (!pdfDocument || !trimmed) {
        setSearching(false)
        setSearchResults([])
        setActiveSearchIndex(-1)
        callbacksRef.current.onSearchResultsChange?.([])
        return []
      }

      setSearching(true)
      const normalizedQuery = trimmed.toLocaleLowerCase()
      const results: PdfSearchResult[] = []

      try {
        for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
          if (runId !== searchRunRef.current || results.length >= maxSearchResults) break
          const pdfPage = await pdfDocument.getPage(pageNumber)
          const content = await pdfPage.getTextContent()
          const text = content.items.map(getTextItemValue).filter(Boolean).join(" ").replace(/\s+/g, " ")
          const lowerText = text.toLocaleLowerCase()
          let fromIndex = 0
          let matchIndex = 0

          while (results.length < maxSearchResults) {
            const index = lowerText.indexOf(normalizedQuery, fromIndex)
            if (index < 0) break
            results.push({
              pageNumber,
              matchIndex,
              text: text.slice(index, index + trimmed.length),
              context: createSearchContext(text, index, trimmed.length),
            })
            matchIndex += 1
            fromIndex = index + Math.max(trimmed.length, 1)
          }
        }

        if (runId !== searchRunRef.current) return []
        setSearchResults(results)
        setActiveSearchIndex(results.length ? 0 : -1)
        callbacksRef.current.onSearchResultsChange?.(results)
        if (results[0]) updatePage(results[0].pageNumber)
        return results
      } catch (cause: unknown) {
        reportError(cause, "Document search failed")
        return []
      } finally {
        if (runId === searchRunRef.current) setSearching(false)
      }
    },
    [callbacksRef, maxSearchResults, pdfDocument, reportError, updatePage]
  )

  React.useEffect(() => {
    if (!normalizedSource) {
      setPdfDocument(null)
      setPageCount(0)
      setPageLabels(null)
      setLoading(false)
      setLoadingProgress(null)
      setPasswordRequest(null)
      setError(null)
      return
    }

    let disposed = false
    const loadingTask = getDocument(normalizedSource)
    renderingPagesRef.current.clear()
    setRendering(false)
    setLoading(true)
    setError(null)
    setPdfDocument(null)
    setPageCount(0)
    setPageLabels(null)
    setLoadingProgress(null)
    setPasswordRequest(null)
    setSearchResults([])
    setActiveSearchIndex(-1)

    loadingTask.onProgress = ({ loaded, total }) => {
      if (disposed) return
      const progress = {
        loaded,
        total: total || undefined,
        percent: total ? Math.min(100, Math.round((loaded / total) * 100)) : undefined,
      }
      setLoadingProgress(progress)
      callbacksRef.current.onProgress?.(progress)
    }

    loadingTask.onPassword = (submit, reason) => {
      if (disposed) return
      const request = { submit, reason, incorrect: reason === 2 }
      setPasswordRequest(request)
      setLoading(false)
      callbacksRef.current.onPasswordRequest?.({ submit, reason })
    }

    loadingTask.promise
      .then(async (nextDocument) => {
        if (disposed) {
          await nextDocument.destroy()
          return
        }

        setPdfDocument(nextDocument)
        setPageCount(nextDocument.numPages)
        setLoading(false)
        setLoadingProgress(null)
        setPasswordRequest(null)
        callbacksRef.current.onLoad?.(nextDocument)

        const [nextLabels, metadata, outline] = await Promise.all([
          nextDocument.getPageLabels().catch(() => null),
          nextDocument.getMetadata().catch(() => null),
          nextDocument.getOutline().catch(() => null),
        ])

        if (disposed) return
        setPageLabels(nextLabels)
        if (metadata) callbacksRef.current.onMetadata?.(metadata)
        callbacksRef.current.onOutline?.(outline)
      })
      .catch((cause: unknown) => {
        if (disposed) return
        setLoading(false)
        setPasswordRequest(null)
        reportError(cause, "PDF document could not be loaded")
      })

    return () => {
      disposed = true
      searchRunRef.current += 1
      void loadingTask.destroy()
    }
  }, [callbacksRef, normalizedSource, reloadKey, reportError])

  React.useEffect(() => {
    if (pageCount > 0 && currentPage > pageCount) updatePage(pageCount, false)
  }, [currentPage, pageCount, updatePage])

  React.useEffect(() => {
    if (!searchOnChange || !currentSearchOpen) return
    const timeout = window.setTimeout(() => void runSearch(currentSearchQuery), searchDebounceMs)
    return () => window.clearTimeout(timeout)
  }, [currentSearchOpen, currentSearchQuery, runSearch, searchDebounceMs, searchOnChange])

  React.useEffect(() => {
    if (
      !autoFitOnResize ||
      currentFitMode === "custom" ||
      !viewportRef.current ||
      typeof ResizeObserver === "undefined"
    ) return
    const observer = new ResizeObserver(() => void fitDocument(currentFitMode))
    observer.observe(viewportRef.current)
    return () => observer.disconnect()
  }, [autoFitOnResize, currentFitMode, fitDocument])

  React.useEffect(() => {
    if (currentFitMode !== "custom" && pdfDocument) void fitDocument(currentFitMode)
  }, [currentFitMode, currentPage, currentRotation, fitDocument, pdfDocument])

  React.useEffect(() => {
    const onFullscreenChange = () => setFullscreen(window.document.fullscreenElement === rootRef.current)
    window.document.addEventListener("fullscreenchange", onFullscreenChange)
    return () => window.document.removeEventListener("fullscreenchange", onFullscreenChange)
  }, [])

  React.useEffect(() => () => printFrameRef.current?.remove(), [])

  React.useEffect(() => {
    if (!keyboardShortcuts) return
    const root = rootRef.current
    if (!root) return

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      const editing = target?.matches("input, textarea, select, [contenteditable='true']")

      if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "f") {
        event.preventDefault()
        setCurrentSearchOpen(true)
        return
      }
      if (editing) return

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault()
        updatePage(currentPage - 1)
      } else if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault()
        updatePage(currentPage + 1)
      } else if (event.key === "+" || event.key === "=") {
        event.preventDefault()
        updateScale(currentScale + scaleStep)
      } else if (event.key === "-") {
        event.preventDefault()
        updateScale(currentScale - scaleStep)
      } else if (event.key.toLocaleLowerCase() === "r") {
        event.preventDefault()
        updateRotation(currentRotation + (event.shiftKey ? -90 : 90))
      } else if (event.key.toLocaleLowerCase() === "f") {
        event.preventDefault()
        void toggleFullscreen()
      } else if (event.key === "Escape" && currentSearchOpen) {
        setCurrentSearchOpen(false)
      }
    }

    root.addEventListener("keydown", onKeyDown)
    return () => root.removeEventListener("keydown", onKeyDown)
  }, [currentPage, currentRotation, currentScale, currentSearchOpen, keyboardShortcuts, scaleStep, setCurrentSearchOpen, toggleFullscreen, updatePage, updateRotation, updateScale])

  const actions = React.useMemo<PdfViewerHandle>(
    () => ({
      getDocument: () => pdfDocument,
      previousPage: () => updatePage(currentPage - 1),
      nextPage: () => updatePage(currentPage + 1),
      goToPage: (nextPage) => updatePage(nextPage),
      zoomOut: () => updateScale(currentScale - scaleStep),
      zoomIn: () => updateScale(currentScale + scaleStep),
      setScale: (nextScale) => updateScale(nextScale),
      fitWidth: () => fitDocument("width"),
      fitPage: () => fitDocument("page"),
      rotateCounterClockwise: () => updateRotation(currentRotation - 90),
      rotateClockwise: () => updateRotation(currentRotation + 90),
      search: runSearch,
      previousMatch: () => activateSearchResult(activeSearchIndex - 1),
      nextMatch: () => activateSearchResult(activeSearchIndex + 1),
      download: downloadDocument,
      print: printDocument,
      toggleFullscreen,
    }),
    [activateSearchResult, activeSearchIndex, currentPage, currentRotation, currentScale, downloadDocument, fitDocument, pdfDocument, printDocument, runSearch, scaleStep, toggleFullscreen, updatePage, updateRotation, updateScale]
  )

  React.useImperativeHandle(forwardedRef, () => actions, [actions])

  const toolbarContext = React.useMemo<PdfViewerToolbarContext>(
    () => ({
      document: pdfDocument,
      page: currentPage,
      pageCount,
      pageLabel,
      scale: currentScale,
      rotation: currentRotation,
      viewMode: currentViewMode,
      fitMode: currentFitMode,
      sidebarOpen: currentSidebarOpen,
      searchOpen: currentSearchOpen,
      searching,
      searchQuery: currentSearchQuery,
      searchResults,
      activeSearchIndex,
      loading,
      rendering,
      fullscreen,
      actions: {
        ...actions,
        setViewMode: setCurrentViewMode,
        setSidebarOpen: setCurrentSidebarOpen,
        setSearchOpen: setCurrentSearchOpen,
        setSearchQuery: setCurrentSearchQuery,
      },
    }),
    [actions, activeSearchIndex, currentFitMode, currentPage, currentRotation, currentScale, currentSearchOpen, currentSearchQuery, currentSidebarOpen, currentViewMode, fullscreen, loading, pageCount, pageLabel, pdfDocument, rendering, searchResults, searching, setCurrentSearchOpen, setCurrentSearchQuery, setCurrentSidebarOpen, setCurrentViewMode]
  )

  const defaultToolbar = (
    <div data-slot="pdf-toolbar" className={cn("flex flex-wrap items-center justify-between gap-2 border-b bg-muted/40 p-2", toolbarClassName)}>
      <div className="flex items-center gap-1">
        {showSidebarToggle && (showThumbnails || sidebarContent) ? (
          <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={currentSidebarOpen ? labels?.closeSidebar ?? "Close sidebar" : labels?.openSidebar ?? "Open sidebar"} onClick={() => setCurrentSidebarOpen(!currentSidebarOpen)}>
            {currentSidebarOpen ? <PanelLeftCloseIcon className="size-4" /> : <PanelLeftOpenIcon className="size-4" />}
          </Button>
        ) : null}
        {showSearch ? (
          <Button type="button" variant={currentSearchOpen ? "secondary" : "ghost"} size="icon-sm" iconOnly aria-label={labels?.search ?? "Search document"} onClick={() => setCurrentSearchOpen(!currentSearchOpen)}>
            <SearchIcon className="size-4" />
          </Button>
        ) : null}
        {showViewModeToggle ? (
          <div className="ml-1 flex rounded-lg border bg-background p-0.5">
            <Button type="button" variant={currentViewMode === "single" ? "secondary" : "ghost"} size="icon-xs" iconOnly aria-label={labels?.singlePage ?? "Single page"} onClick={() => setCurrentViewMode("single")}>
              <FileIcon className="size-3.5" />
            </Button>
            <Button type="button" variant={currentViewMode === "continuous" ? "secondary" : "ghost"} size="icon-xs" iconOnly aria-label={labels?.continuous ?? "Continuous pages"} onClick={() => setCurrentViewMode("continuous")}>
              <ListIcon className="size-3.5" />
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-1">
        <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.previousPage ?? "Previous page"} disabled={loading || currentPage <= 1} onClick={() => updatePage(currentPage - 1)}>
          <ChevronLeftIcon className="size-4" />
        </Button>
        <label className="flex h-8 items-center gap-1 rounded-lg border bg-background px-2 text-xs text-muted-foreground">
          <span className="sr-only">{labels?.page ?? "Page"}</span>
          <input
            key={currentPage}
            defaultValue={currentPage}
            inputMode="numeric"
            className="w-9 bg-transparent text-center tabular-nums text-foreground outline-none"
            onKeyDown={(event) => {
              if (event.key === "Enter") updatePage(Number(event.currentTarget.value))
            }}
            onBlur={(event) => updatePage(Number(event.currentTarget.value), false)}
          />
          <span>/ {pageCount || "—"}</span>
        </label>
        <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.nextPage ?? "Next page"} disabled={loading || currentPage >= pageCount} onClick={() => updatePage(currentPage + 1)}>
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>

      <div className="flex items-center gap-1">
        {showZoom ? (
          <>
            <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.zoomOut ?? "Zoom out"} disabled={currentScale <= minScale} onClick={() => updateScale(currentScale - scaleStep)}>
              <MinusIcon className="size-4" />
            </Button>
            <label className="relative">
              <span className="sr-only">Zoom mode</span>
              <select
                value={currentFitMode}
                onChange={(event) => {
                  const nextMode = event.target.value as PdfFitMode
                  if (nextMode === "width" || nextMode === "page") void fitDocument(nextMode)
                  else setCurrentFitMode("custom")
                }}
                className="h-8 appearance-none rounded-lg border bg-background py-0 pl-2 pr-7 text-xs tabular-nums outline-none"
              >
                <option value="custom">{Math.round(currentScale * 100)}%</option>
                <option value="width">{labels?.fitWidth ?? "Fit width"}</option>
                <option value="page">{labels?.fitPage ?? "Fit page"}</option>
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-muted-foreground" />
            </label>
            <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.zoomIn ?? "Zoom in"} disabled={currentScale >= maxScale} onClick={() => updateScale(currentScale + scaleStep)}>
              <PlusIcon className="size-4" />
            </Button>
          </>
        ) : null}
        {showRotate ? (
          <>
            <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.rotateCounterClockwise ?? "Rotate counter-clockwise"} onClick={() => updateRotation(currentRotation - 90)}>
              <RotateCcwIcon className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.rotateClockwise ?? "Rotate clockwise"} onClick={() => updateRotation(currentRotation + 90)}>
              <RotateCwIcon className="size-4" />
            </Button>
          </>
        ) : null}
        {showPrint ? (
          <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.print ?? "Print"} disabled={!pdfDocument} onClick={() => void printDocument()}>
            <PrinterIcon className="size-4" />
          </Button>
        ) : null}
        {showDownload ? (
          <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.download ?? "Download"} disabled={!pdfDocument} onClick={() => void downloadDocument()}>
            <DownloadIcon className="size-4" />
          </Button>
        ) : null}
        {showFullscreen ? (
          <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={fullscreen ? labels?.exitFullscreen ?? "Exit fullscreen" : labels?.fullscreen ?? "Fullscreen"} onClick={() => void toggleFullscreen()}>
            {fullscreen ? <MinimizeIcon className="size-4" /> : <MaximizeIcon className="size-4" />}
          </Button>
        ) : null}
      </div>
    </div>
  )

  const renderedToolbar = renderToolbar ? renderToolbar(toolbarContext) : defaultToolbar
  const customSidebarContent = typeof sidebarContent === "function" ? sidebarContent(toolbarContext) : sidebarContent
  const activeResult = activeSearchIndex >= 0 ? searchResults[activeSearchIndex] : null
  const retry = React.useCallback(() => setReloadKey((value) => value + 1), [])

  return (
    <div
      ref={rootRef}
      data-slot="pdf-viewer"
      data-view-mode={currentViewMode}
      data-fullscreen={fullscreen ? "true" : undefined}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      className={cn(
        "relative flex min-h-96 flex-col overflow-hidden rounded-xl border bg-background outline-none focus-visible:ring-2 focus-visible:ring-ring",
        fullscreen && "h-screen rounded-none border-0",
        className
      )}
      {...props}
    >
      {beforeToolbar}
      {showToolbar ? renderedToolbar : null}
      {afterToolbar}

      {currentSearchOpen ? (
        <form
          data-slot="pdf-search"
          className={cn("flex flex-wrap items-center gap-2 border-b bg-background p-2", searchClassName)}
          onSubmit={(event) => {
            event.preventDefault()
            void runSearch(currentSearchQuery)
          }}
        >
          <SearchIcon className="size-4 text-muted-foreground" />
          <input
            autoFocus
            value={currentSearchQuery}
            onChange={(event) => setCurrentSearchQuery(event.target.value)}
            placeholder={labels?.searchPlaceholder ?? "Search this document"}
            className="h-8 min-w-44 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <Button type="submit" size="sm" variant="secondary" loading={searching} disabled={!currentSearchQuery.trim()}>
            {labels?.search ?? "Search"}
          </Button>
          <span className="min-w-20 text-center text-xs tabular-nums text-muted-foreground" aria-live="polite">
            {searchResults.length
              ? `${activeSearchIndex + 1} / ${searchResults.length}`
              : currentSearchQuery && !searching
                ? labels?.noMatches ?? "No matches"
                : "—"}
          </span>
          <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.previousMatch ?? "Previous match"} disabled={!searchResults.length} onClick={() => activateSearchResult(activeSearchIndex - 1)}>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.nextMatch ?? "Next match"} disabled={!searchResults.length} onClick={() => activateSearchResult(activeSearchIndex + 1)}>
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button type="button" variant="ghost" size="icon-sm" iconOnly aria-label={labels?.closeSearch ?? "Close search"} onClick={() => setCurrentSearchOpen(false)}>
            <XIcon className="size-4" />
          </Button>
          {activeResult ? (
            <p className="basis-full truncate pl-6 text-xs text-muted-foreground" title={activeResult.context}>
              Page {activeResult.pageNumber}: {activeResult.context}
            </p>
          ) : null}
        </form>
      ) : null}

      <div className="relative flex min-h-0 flex-1">
        {currentSidebarOpen && (showThumbnails || customSidebarContent) ? (
          <aside data-slot="pdf-sidebar" className={cn("w-40 shrink-0 overflow-y-auto border-r bg-muted/20 p-3", sidebarClassName)} aria-label={labels?.thumbnails ?? "Page thumbnails"}>
            {customSidebarContent ?? (
              <div className="space-y-3">
                {pdfDocument
                  ? Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                      <button
                        key={pageNumber}
                        type="button"
                        className={cn(
                          "block w-full rounded-lg border bg-background p-2 text-left transition hover:border-primary/50",
                          currentPage === pageNumber && "border-primary ring-2 ring-primary/15"
                        )}
                        onClick={() => updatePage(pageNumber)}
                      >
                        <PdfCanvasPage
                          document={pdfDocument}
                          pageNumber={pageNumber}
                          scale={1}
                          rotation={currentRotation}
                          targetWidth={thumbnailWidth}
                          lazy
                          rootMargin="300px 0px"
                          searchMatchCount={searchCountsByPage.get(pageNumber)}
                          canvasClassName="shadow-sm"
                          pageClassName="min-h-20 overflow-hidden"
                          onError={(cause) => callbacksRef.current.onError?.(cause)}
                          labels={labels}
                        />
                        <span className="mt-2 block text-center text-[10px] tabular-nums text-muted-foreground">
                          {pageLabels?.[pageNumber - 1] ?? pageNumber}
                        </span>
                      </button>
                    ))
                  : null}
              </div>
            )}
          </aside>
        ) : null}

        <div
          ref={viewportRef}
          data-slot="pdf-viewport"
          className={cn(
            "relative min-h-80 min-w-0 flex-1 overflow-auto bg-muted/30 p-4",
            currentViewMode === "single" && "grid place-items-start",
            viewportClassName
          )}
        >
          {!normalizedSource ? (
            <div className="absolute inset-0 grid place-items-center p-6">
              {resolveStateContent(stateContent?.empty, <DefaultEmptyState labels={labels} />)}
            </div>
          ) : null}

          {loading ? (
            <div className="absolute inset-0 z-30 grid place-items-center bg-background/75 p-6 backdrop-blur-sm">
              {resolveStateContent(
                stateContent?.loading,
                <DefaultLoadingState labels={labels} progress={loadingProgress} />,
                loadingProgress
              )}
            </div>
          ) : null}

          {passwordRequest && showPasswordPrompt ? (
            <div className="absolute inset-0 z-40 grid place-items-center bg-background/80 p-6 backdrop-blur-sm">
              {resolveStateContent(
                stateContent?.password,
                <DefaultPasswordState request={passwordRequest} labels={labels} />,
                { reason: passwordRequest.reason, submit: passwordRequest.submit }
              )}
            </div>
          ) : null}

          {error ? (
            <div className="absolute inset-0 z-40 grid place-items-center bg-background/85 p-6 backdrop-blur-sm">
              {resolveStateContent(
                stateContent?.error,
                <DefaultErrorState error={error} retry={retry} labels={labels} />,
                error,
                retry
              )}
            </div>
          ) : null}

          {pdfDocument && !error ? (
            currentViewMode === "single" ? (
              <PdfCanvasPage
                document={pdfDocument}
                pageNumber={clamp(currentPage, 1, pageCount)}
                scale={currentScale}
                rotation={currentRotation}
                active={Boolean(activeResult && activeResult.pageNumber === currentPage)}
                searchMatchCount={searchCountsByPage.get(currentPage)}
                canvasClassName={canvasClassName}
                pageClassName={pageClassName}
                onRenderingChange={handleRenderingChange}
                onRendered={(pageNumber, pdfPage) => callbacksRef.current.onPageRendered?.(pageNumber, pdfPage)}
                onError={(cause) => reportError(cause, "PDF page could not be rendered")}
                labels={labels}
              />
            ) : (
              <div className="mx-auto flex w-fit flex-col" style={{ gap: continuousGap }}>
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                  <div
                    key={pageNumber}
                    ref={(element) => {
                      if (element) pageElementsRef.current.set(pageNumber, element)
                      else pageElementsRef.current.delete(pageNumber)
                    }}
                    className="scroll-mt-6"
                  >
                    <PdfCanvasPage
                      document={pdfDocument}
                      pageNumber={pageNumber}
                      scale={currentScale}
                      rotation={currentRotation}
                      lazy
                      rootMargin={lazyRootMargin}
                      active={Boolean(activeResult && activeResult.pageNumber === pageNumber)}
                      searchMatchCount={searchCountsByPage.get(pageNumber)}
                      canvasClassName={canvasClassName}
                      pageClassName={pageClassName}
                      onRenderingChange={handleRenderingChange}
                      onVisible={(visiblePage, ratio) => {
                        if (ratio >= 0.55 && visiblePage !== currentPage) setCurrentPage(visiblePage)
                      }}
                      onRendered={(renderedPage, pdfPage) => callbacksRef.current.onPageRendered?.(renderedPage, pdfPage)}
                      onError={(cause) => callbacksRef.current.onError?.(cause)}
                      labels={labels}
                    />
                  </div>
                ))}
              </div>
            )
          ) : null}
        </div>
      </div>

      {overlay ? <div data-slot="pdf-overlay" className="pointer-events-none absolute inset-0 z-50">{overlay}</div> : null}
    </div>
  )
})

PdfViewer.displayName = "PdfViewer"

export { PdfViewer }
