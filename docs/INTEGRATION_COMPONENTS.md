# Tembro integration components

These components wrap rendering engines, media engines, camera APIs, WebGL, Canvas, or complex editors that should not be part of the core Tembro bundle.

They are distributed through the source-copy CLI. Installing one component copies only its source and installs only its required packages.

## Available components

| Registry name | Main exports | Engine |
| --- | --- | --- |
| `map` | `MapView`, `LocationPicker` | MapLibre GL + react-map-gl |
| `media-player` | `VideoPlayer`, `AudioPlayer` | Vidstack |
| `pdf-viewer` | `PdfViewer` | PDF.js |
| `barcode-scanner` | `BarcodeScanner`, `QrScanner` | ZXing Browser |
| `code-editor` | `CodeEditor`, `JsonEditor`, `CodeDiffEditor` | Monaco Editor |
| `spreadsheet` | `Spreadsheet` | Univer Sheets |
| `terminal` | `Terminal`, `WebSocketTerminal` | xterm.js |
| `flow-editor` | `FlowEditor` | React Flow |
| `whiteboard` | `Whiteboard` | tldraw |
| `model-viewer` | `ModelViewer` | Google model-viewer |
| `advanced-chart` | `AdvancedChart` | Apache ECharts |
| `document-scanner` | `DocumentScanner` | OpenCV.js + MediaDevices |

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
npx tembro add map media-player pdf-viewer barcode-scanner
```

## Import examples

```tsx
import { LocationPicker } from "@/components/integrations/map"
import { VideoPlayer } from "@/components/integrations/media-player"
import { PdfViewer } from "@/components/integrations/pdf-viewer"
import { QrScanner } from "@/components/integrations/barcode-scanner"
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

```tsx
<PdfViewer src="/documents/example.pdf" />
```

```tsx
<QrScanner onResult={(value) => console.log(value)} />
```

## Browser requirements

Camera-based components require a secure context (`https://` or localhost) and user permission. WebGL integrations depend on browser and GPU support. PDF, editor, spreadsheet, whiteboard, map, media, and 3D integrations should be lazy-loaded in applications where initial bundle size matters.

## Distribution policy

Integration components are intentionally excluded from the root `tembro` library build. Do not export them from `src/index.ts` or add their engines to the root runtime dependencies. Keep them in `src/components/integrations` and register them through `cli/integration-registry.ts`.
