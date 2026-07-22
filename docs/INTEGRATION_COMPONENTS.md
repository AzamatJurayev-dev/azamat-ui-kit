# Tembro integration components

These components wrap rendering engines, media engines, camera APIs, WebGL, Canvas, or complex editors that should not be part of the core Tembro bundle.

They are distributed through the source-copy CLI. Installing one component copies only its source and installs only its required packages.

## Available components

| Registry name | Main exports | Engine |
| --- | --- | --- |
| `map` | `MapView`, `LocationPicker` | MapLibre GL + react-map-gl |
| `media-player` | `VideoPlayer`, `AudioPlayer` | Vidstack |
| `pdf-viewer` | `PdfViewer`, `PdfViewerHandle` | PDF.js |
| `barcode-scanner` | `BarcodeScanner`, `QrScanner` | ZXing Browser |
| `code-editor` | `CodeEditor`, `JsonEditor`, `CodeDiffEditor` | Monaco Editor |
| `spreadsheet` | `Spreadsheet` | Univer Sheets |
| `terminal` | `Terminal`, `WebSocketTerminal` | xterm.js |
| `flow-editor` | `FlowEditor` | React Flow |
| `whiteboard` | `Whiteboard` | tldraw |
| `model-viewer` | `ModelViewer` | Google model-viewer |
| `advanced-chart` | `AdvancedChart` | Apache ECharts |
| `document-scanner` | `DocumentScanner`, `DocumentScannerHandle` | OpenCV.js + MediaDevices |

## Installation

```bash
npx tembro add map
npx tembro add media-player
npx tembro add pdf-viewer
npx tembro add barcode-scanner
npx tembro add code-editor
npx tembro add spreadsheet
npx tembro add terminal
npx tembro add flow-editor
npx tembro add whiteboard
npx tembro add model-viewer
npx tembro add advanced-chart
npx tembro add document-scanner
```

Multiple integrations can be installed in one command:

```bash
npx tembro add map media-player pdf-viewer document-scanner
```

## Import examples

```tsx
import { LocationPicker } from "@/components/integrations/map"
import { VideoPlayer } from "@/components/integrations/media-player"
import { PdfViewer, type PdfViewerHandle } from "@/components/integrations/pdf-viewer"
import { QrScanner } from "@/components/integrations/barcode-scanner"
import { DocumentScanner, type DocumentScannerHandle } from "@/components/integrations/document-scanner"
```

```tsx
<LocationPicker
  value={location}
  onValueChange={setLocation}
  clearable
/>
```

```tsx
<VideoPlayer
  src={[
    { src: "/media/video-1080.mp4", type: "video/mp4", height: 1080 },
    { src: "/media/video-720.mp4", type: "video/mp4", height: 720 },
  ]}
  title="Building production-ready UI"
  poster="/media/poster.webp"
  thumbnails="/media/thumbnails.vtt"
  tracks={[
    {
      src: "/media/captions-en.vtt",
      kind: "captions",
      language: "en",
      label: "English",
      default: true,
    },
    {
      src: "/media/chapters.vtt",
      kind: "chapters",
      language: "en",
      label: "Chapters",
    },
  ]}
  layoutProps={{
    download: true,
    colorScheme: "dark",
  }}
  overlay={
    <div className="p-4 text-sm font-medium">
      Internal training · 4 chapters
    </div>
  }
/>
```

`VideoPlayer` and `AudioPlayer` forward the Vidstack `MediaPlayerInstance` ref. Use it for player methods, subscriptions, fullscreen, casting, remote playback, or other provider APIs.

The default Vidstack layout can be configured through `layoutProps`, replaced through `layout`, or disabled with `layout={false}` when building custom controls. `providerChildren`, `beforeLayout`, `afterLayout`, and `overlay` provide composition points without adding another public component.

Empty, loading, and playback-error UI is enabled by default and can be replaced through `stateContent`.

## PDF Viewer

`PdfViewer` is a document workspace rather than a single canvas wrapper. It accepts URLs, in-memory bytes, `ArrayBuffer`, or complete PDF.js `DocumentInitParameters` for headers, credentials, password, range loading, and other transport options.

```tsx
function QuarterlyReview() {
  const viewerRef = React.useRef<PdfViewerHandle>(null)

  return (
    <PdfViewer
      ref={viewerRef}
      src={{
        url: "/documents/quarterly-review.pdf",
        httpHeaders: {
          Authorization: "Bearer token",
        },
      }}
      defaultViewMode="continuous"
      defaultSidebarOpen
      defaultFitMode="width"
      searchOnChange
      onProgress={(progress) => {
        console.log(progress.loaded, progress.total, progress.percent)
      }}
      onPasswordRequest={({ reason, submit }) => {
        requestDocumentPassword(reason).then(submit)
      }}
      onSearchResultsChange={(results) => {
        console.log(results)
      }}
      stateContent={{
        empty: <EmptyDocumentState />,
        loading: (progress) => <DocumentLoading progress={progress} />,
        error: (error, retry) => (
          <DocumentError error={error} onRetry={retry} />
        ),
      }}
    />
  )
}
```

### Rendering modes

- `viewMode="single"` renders one controlled or uncontrolled page.
- `viewMode="continuous"` creates a scrollable document workspace and lazily renders pages near the viewport.
- The thumbnail sidebar also renders lazily, so opening a large document does not immediately paint every page twice.
- `fitMode="width"`, `fitMode="page"`, and custom scale values share one controlled state contract.

### Search

Full-document search uses PDF.js `getTextContent()` and returns page number, match index, matched text, and nearby context.

```tsx
<PdfViewer
  src="/documents/manual.pdf"
  defaultSearchOpen
  defaultSearchQuery="installation"
  searchOnChange
  maxSearchResults={250}
  onSearchResultsChange={(results) => {
    analytics.track("pdf_search", {
      matches: results.length,
    })
  }}
/>
```

### Password handling

The built-in password surface handles missing and incorrect passwords. Product applications can replace it through `stateContent.password` or collect credentials externally through `onPasswordRequest`.

```tsx
<PdfViewer
  src="/documents/protected.pdf"
  onPasswordRequest={({ submit }) => {
    openPasswordDialog().then(submit)
  }}
  showPasswordPrompt={false}
/>
```

When `showPasswordPrompt={false}`, the application must eventually call the supplied `submit` callback or replace the source; otherwise PDF.js remains paused waiting for a password.

### Imperative actions

```tsx
viewerRef.current?.goToPage(12)
viewerRef.current?.fitWidth()
viewerRef.current?.rotateClockwise()
viewerRef.current?.search("invoice")
viewerRef.current?.nextMatch()
viewerRef.current?.download()
viewerRef.current?.print()
viewerRef.current?.toggleFullscreen()
```

The ref also exposes previous/next page, zoom, fit page, counter-clockwise rotation, current PDF document access, and match navigation.

### Composition

- `renderToolbar` replaces the toolbar while retaining typed state and actions.
- `sidebarContent` replaces the thumbnail rail.
- `beforeToolbar`, `afterToolbar`, and `overlay` add product UI without creating another public component.
- `labels` localizes built-in actions and state messages.
- `stateContent` replaces empty, loading, password, and retryable error surfaces.

### Document actions and callbacks

Download and print work for URL and in-memory sources by reading raw bytes from the loaded `PDFDocumentProxy`. Metadata, outline, loading progress, page-render, search result, print, download, and error callbacks can be connected to product state or analytics.

Cross-origin URL sources still require valid CORS headers. PDF.js API and worker versions must match. Large documents should use range requests where the server supports them, and continuous rendering should remain lazy.

## Document Scanner

`DocumentScanner` is a complete capture workflow rather than a camera button. Camera frames and imported images share one OpenCV contour, perspective, image-processing, encoding, and resizing pipeline.

```tsx
function ContractScanner() {
  const scannerRef = React.useRef<DocumentScannerHandle>(null)
  const [pages, setPages] = React.useState([])

  return (
    <DocumentScanner
      ref={scannerRef}
      facingMode="environment"
      preferredWidth={1920}
      preferredHeight={1080}
      preferredFrameRate={30}
      requireDocument
      autoCapture
      autoCaptureDelayMs={700}
      stabilityFrames={4}
      stabilityTolerance={0.025}
      minDetectionConfidence={0.55}
      defaultProcessingMode="grayscale"
      scans={pages}
      onScansChange={setPages}
      maxScans={12}
      allowTorch
      allowFileImport
      onDetectionChange={(detection) => {
        console.log(detection?.confidence, detection?.stable)
      }}
      onPermissionChange={(permission) => {
        analytics.track("scanner_permission", { permission })
      }}
      stateContent={{
        permissionDenied: (error, retry) => (
          <CameraPermissionError error={error} onRetry={retry} />
        ),
      }}
    />
  )
}
```

### Camera lifecycle

The scanner requests preferred resolution and frame rate while supporting exact camera IDs or user/environment facing mode. After permission is granted, it enumerates video devices, reports changes, and can switch the active camera. `devicechange` keeps the device inventory current when hardware is connected or removed.

Camera access requires HTTPS or localhost. Denied permission, unsupported MediaDevices, insecure context, disconnected device, and retry states are explicit. Existing scans remain available when the camera stops.

### Live detection and auto-capture

OpenCV detection runs on a downscaled analysis canvas rather than the full output frame. Each accepted contour reports:

```ts
{
  corners,
  areaRatio,
  confidence,
  stableFrames,
  stable,
}
```

Confidence combines document area, edge symmetry, and frame centering. Stable-frame tracking compares normalized corner movement. When `autoCapture` is enabled, a contour must remain stable for the configured number of frames and delay before capture.

### Processing and output

The same corrected document can be rendered as:

- `color`;
- `grayscale`;
- `black-white` with configurable threshold.

Output type, quality, maximum width, and maximum height are configurable. The result contains the encoded `Blob`, data URL, output and source dimensions, document corners, detection confidence, processing mode, camera ID, and timestamp.

### Multi-page review

`scans` and `defaultScans` provide controlled and uncontrolled page collections. `selectedScanId` controls the review page. The built-in review surface supports selection, remove, clear, and download; `renderReview` replaces it while retaining typed actions.

```tsx
<DocumentScanner
  defaultScans={draftPages}
  defaultSelectedScanId={draftPages[0]?.id ?? null}
  renderReview={(context) => (
    <CustomDocumentReview
      pages={context.scans}
      selectedId={context.selectedScanId}
      onSelect={context.actions.selectScan}
      onRemove={context.actions.removeScan}
      onDownload={context.actions.downloadScan}
    />
  )}
/>
```

### File fallback and torch

Image import uses `scanFile(file)` and the same correction pipeline. This provides a fallback for denied camera permission and supports photos already stored on the device.

Torch controls are shown only when the active video track reports torch capability. Applications can also use `scannerRef.current?.toggleTorch()`.

### Imperative actions

```tsx
await scannerRef.current?.start()
scannerRef.current?.stop()
await scannerRef.current?.scan()
await scannerRef.current?.scanFile(file)
await scannerRef.current?.listCameras()
await scannerRef.current?.switchCamera(deviceId)
await scannerRef.current?.toggleTorch(true)
scannerRef.current?.selectScan(pageId)
scannerRef.current?.downloadScan(pageId)
scannerRef.current?.removeScan(pageId)
scannerRef.current?.clearScans()
const snapshot = scannerRef.current?.getSnapshot()
```

### Composition and cleanup

- `renderToolbar` replaces controls while retaining camera, processing, detection, review, and action state.
- `renderReview` replaces the multi-page review panel.
- `beforePreview`, `afterPreview`, and `overlay` add product UI.
- `labels` localizes built-in controls and status messages.
- `stateContent` replaces idle, permission, error, and empty-review surfaces.

The component stops media tracks, clears detection and auto-capture timers, deletes OpenCV Mats, revokes imported-image object URLs, removes device listeners, and resets torch and detection state during cleanup.

```tsx
<QrScanner onResult={(value) => console.log(value)} />
```

## Browser requirements

Camera-based components require a secure context (`https://` or localhost) and user permission. WebGL integrations depend on browser and GPU support. PDF, editor, spreadsheet, whiteboard, map, media, and 3D integrations should be lazy-loaded in applications where initial bundle size matters.

PDF printing uses an isolated browser frame and remains subject to browser print policies. Fullscreen requires the Fullscreen API. Password, progress, metadata, outline, and raw-data operations are provided by the PDF.js display API.

Torch availability depends on camera hardware, browser support, and the active track. Device labels may remain empty until camera permission is granted. OpenCV initialization can be expensive, so scanner routes should be lazy-loaded.

## Distribution policy

Integration components are intentionally excluded from the root `tembro` library build. Do not export them from `src/index.ts` or add their engines to the root runtime dependencies. Keep them in `src/components/integrations` and register them through `cli/integration-registry.ts`.
