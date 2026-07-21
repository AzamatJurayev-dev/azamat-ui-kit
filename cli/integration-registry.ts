import type { ComponentRegistryItem, RegistryFile } from "./registry"
import { registry } from "./registry"
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
    description: "Accessible video and audio players powered by Vidstack.",
    dependencies: ["@vidstack/react"],
    registryDependencies: ["utils"],
    files: [file("src/components/integrations/media-player.tsx", "{components}/integrations/media-player.tsx")],
  },
  {
    name: "pdf-viewer",
    category,
    description: "Canvas-based PDF viewer with paging, zoom, rotation, and download controls.",
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
  { name: "location-picker", category, migrationAliasFor: "map" },
  { name: "video-player", category, migrationAliasFor: "media-player" },
  { name: "audio-player", category, migrationAliasFor: "media-player" },
  { name: "qr-scanner", category, migrationAliasFor: "barcode-scanner" },
  { name: "json-editor", category, migrationAliasFor: "code-editor" },
  { name: "code-diff-editor", category, migrationAliasFor: "code-editor" },
]

for (const item of integrationRegistry) {
  registry[item.name] = item
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
  "location-picker": "internal",
  "video-player": "internal",
  "audio-player": "internal",
  "qr-scanner": "internal",
  "json-editor": "internal",
  "code-diff-editor": "internal",
})

export { integrationRegistry }
