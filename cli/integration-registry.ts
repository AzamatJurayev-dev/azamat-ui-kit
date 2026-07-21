import type { ComponentRegistryItem, RegistryFile } from "./registry"
import { registry, registryNames } from "./registry"
import { registryStatus } from "./registry-status"

const file = (source: string, target: string): RegistryFile => ({ source, target })
const category = "integrations" as ComponentRegistryItem["category"]

const integrationRegistry: ComponentRegistryItem[] = [
  {
    name: "map",
    category,
    description: "Interactive MapLibre map with markers, popups, and a controlled location picker.",
    dependencies: ["react-map-gl", "maplibre-gl", "lucide-react"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/map.tsx", "{components}/integrations/map.tsx")],
  },
  {
    name: "media-player",
    category,
    description: "Composable Vidstack video and audio players with forwarded refs, custom layouts, tracks, overlays, thumbnails, and resilient empty/loading/error states.",
    dependencies: ["@vidstack/react"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/media-player.tsx", "{components}/integrations/media-player.tsx")],
  },
  {
    name: "pdf-viewer",
    category,
    description: "Production PDF.js workspace with lazy thumbnails, continuous rendering, search, password recovery, fit modes, print, download, fullscreen, and an imperative ref API.",
    dependencies: ["pdfjs-dist", "lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [file("src/components/integrations/pdf-viewer.tsx", "{components}/integrations/pdf-viewer.tsx")],
  },
  {
    name: "barcode-scanner",
    category,
    description: "Camera-based barcode and QR scanner powered by ZXing.",
    dependencies: ["@zxing/browser", "lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [file("src/components/integrations/barcode-scanner.tsx", "{components}/integrations/barcode-scanner.tsx")],
  },
  {
    name: "code-editor",
    category,
    description: "Monaco code, JSON, and diff editor components.",
    dependencies: ["@monaco-editor/react", "monaco-editor", "lucide-react"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/code-editor.tsx", "{components}/integrations/code-editor.tsx")],
  },
  {
    name: "spreadsheet",
    category,
    description: "Excel-like spreadsheet editor powered by Univer.",
    dependencies: ["@univerjs/presets", "@univerjs/preset-sheets-core", "lucide-react"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/spreadsheet.tsx", "{components}/integrations/spreadsheet.tsx")],
  },
  {
    name: "terminal",
    category,
    description: "Xterm terminal emulator with auto-fit and optional WebSocket transport.",
    dependencies: ["@xterm/xterm", "@xterm/addon-fit"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/terminal.tsx", "{components}/integrations/terminal.tsx")],
  },
  {
    name: "flow-editor",
    category,
    description: "Controlled and uncontrolled node graph editor powered by React Flow.",
    dependencies: ["@xyflow/react"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/flow-editor.tsx", "{components}/integrations/flow-editor.tsx")],
  },
  {
    name: "whiteboard",
    category,
    description: "Embeddable drawing and collaboration canvas powered by tldraw.",
    dependencies: ["tldraw"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/whiteboard.tsx", "{components}/integrations/whiteboard.tsx")],
  },
  {
    name: "model-viewer",
    category,
    description: "GLB and GLTF 3D model viewer with camera, animation, and AR support.",
    dependencies: ["@google/model-viewer", "three"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/model-viewer.tsx", "{components}/integrations/model-viewer.tsx")],
  },
  {
    name: "advanced-chart",
    category,
    description: "Large and specialized data visualizations powered by Apache ECharts.",
    dependencies: ["echarts"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/advanced-chart.tsx", "{components}/integrations/advanced-chart.tsx")],
  },
  {
    name: "document-scanner",
    category,
    description: "Production OpenCV camera and image scanning workflow with device switching, torch, live contour stability, auto-capture, processing presets, multi-page review, and recovery states.",
    dependencies: ["@techstark/opencv-js", "lucide-react"],
    registryDependencies: ["button", "utils"],
    files: [file("src/components/integrations/document-scanner.tsx", "{components}/integrations/document-scanner.tsx")],
  },
  { name: "location-picker", category, migrationAliasFor: "map" },
  { name: "video-player", category, migrationAliasFor: "media-player" },
  { name: "audio-player", category, migrationAliasFor: "media-player" },
  { name: "qr-scanner", category, migrationAliasFor: "barcode-scanner" },
  { name: "json-editor", category, migrationAliasFor: "code-editor" },
  { name: "code-diff-editor", category, migrationAliasFor: "code-editor" },
  { name: "web-terminal", category, migrationAliasFor: "terminal" },
  { name: "workflow-editor", category, migrationAliasFor: "flow-editor" },
  { name: "process-designer", category, migrationAliasFor: "flow-editor" },
  { name: "drawing-board", category, migrationAliasFor: "whiteboard" },
  { name: "product-3d-viewer", category, migrationAliasFor: "model-viewer" },
  { name: "echarts", category, migrationAliasFor: "advanced-chart" },
  { name: "camera-scanner", category, migrationAliasFor: "document-scanner" },
  { name: "receipt-scanner", category, migrationAliasFor: "document-scanner" },
]

for (const item of integrationRegistry) {
  registry[item.name] = item
  if (!registryNames.includes(item.name)) registryNames.push(item.name)
}

const canonicalNames = integrationRegistry
  .filter((item) => !item.migrationAliasFor)
  .map((item) => item.name)

registry.all.registryDependencies = Array.from(
  new Set([...(registry.all.registryDependencies ?? []), ...canonicalNames])
)

Object.assign(registryStatus, {
  map: "preview",
  "media-player": "preview",
  "pdf-viewer": "preview",
  "barcode-scanner": "preview",
  "code-editor": "preview",
  spreadsheet: "preview",
  terminal: "preview",
  "flow-editor": "preview",
  whiteboard: "preview",
  "model-viewer": "preview",
  "advanced-chart": "preview",
  "document-scanner": "preview",
  "location-picker": "internal",
  "video-player": "internal",
  "audio-player": "internal",
  "qr-scanner": "internal",
  "json-editor": "internal",
  "code-diff-editor": "internal",
  "web-terminal": "internal",
  "workflow-editor": "internal",
  "process-designer": "internal",
  "drawing-board": "internal",
  "product-3d-viewer": "internal",
  echarts: "internal",
  "camera-scanner": "internal",
  "receipt-scanner": "internal",
})

export { integrationRegistry }
