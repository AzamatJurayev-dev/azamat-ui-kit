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
npx tembro add map pdf-viewer barcode-scanner
```

## Import examples

```tsx
import { LocationPicker } from "@/components/integrations/map"
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
<PdfViewer src="/documents/example.pdf" />
```

```tsx
<QrScanner onResult={(value) => console.log(value)} />
```

## Browser requirements

Camera-based components require a secure context (`https://` or localhost) and user permission. WebGL integrations depend on browser and GPU support. PDF, editor, spreadsheet, whiteboard, map, and 3D integrations should be lazy-loaded in applications where initial bundle size matters.

## Distribution policy

Integration components are intentionally excluded from the root `tembro` library build. Do not export them from `src/index.ts` or add their engines to the root runtime dependencies. Keep them in `src/components/integrations` and register them through `cli/integration-registry.ts`.
