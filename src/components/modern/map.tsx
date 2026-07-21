"use client"

import * as React from "react"
import { ExternalLinkIcon, LocateFixedIcon, MapPinIcon, MinusIcon, PlusIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type MapMarker = {
  key: string
  label: React.ReactNode
  latitude: number
  longitude: number
  description?: React.ReactNode
  tone?: "neutral" | "info" | "success" | "warning" | "danger" | "muted"
}

export type MapViewProps = React.ComponentProps<"section"> & {
  center?: { latitude: number; longitude: number }
  zoom?: number
  markers?: MapMarker[]
  title?: React.ReactNode
  description?: React.ReactNode
  height?: number | string
  showMarkerList?: boolean
  showControls?: boolean
  iframeTitle?: string
  mapUrl?: string
  onMarkerSelect?: (marker: MapMarker) => void
  selectedMarkerKey?: string
  defaultSelectedMarkerKey?: string
}

function clampZoom(value: number) {
  return Math.max(1, Math.min(19, value))
}

function toCoordinate(value: number) {
  return Number.isFinite(value) ? value : 0
}

function getOpenStreetMapEmbedUrl(center: { latitude: number; longitude: number }, zoom: number, selected?: MapMarker) {
  const lat = toCoordinate(selected?.latitude ?? center.latitude)
  const lon = toCoordinate(selected?.longitude ?? center.longitude)
  const delta = 0.012 * (20 - clampZoom(zoom))
  const bbox = [lon - delta, lat - delta, lon + delta, lat + delta].map((value) => value.toFixed(6)).join("%2C")
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat.toFixed(6)}%2C${lon.toFixed(6)}`
}

function getOpenStreetMapUrl(center: { latitude: number; longitude: number }, zoom: number, selected?: MapMarker) {
  const lat = toCoordinate(selected?.latitude ?? center.latitude)
  const lon = toCoordinate(selected?.longitude ?? center.longitude)
  return `https://www.openstreetmap.org/?mlat=${lat.toFixed(6)}&mlon=${lon.toFixed(6)}#map=${clampZoom(zoom)}/${lat.toFixed(6)}/${lon.toFixed(6)}`
}

function MapView({
  center = { latitude: 41.311081, longitude: 69.240562 },
  zoom = 13,
  markers = [],
  title = "Map",
  description,
  height = 420,
  showMarkerList = true,
  showControls = true,
  iframeTitle = "Interactive map",
  mapUrl,
  onMarkerSelect,
  selectedMarkerKey,
  defaultSelectedMarkerKey,
  className,
  ...props
}: MapViewProps) {
  const [internalZoom, setInternalZoom] = React.useState(clampZoom(zoom))
  const [internalSelectedKey, setInternalSelectedKey] = React.useState(defaultSelectedMarkerKey ?? markers[0]?.key)
  const activeKey = selectedMarkerKey ?? internalSelectedKey
  const selectedMarker = markers.find((marker) => marker.key === activeKey)
  const resolvedUrl = mapUrl ?? getOpenStreetMapEmbedUrl(center, internalZoom, selectedMarker)
  const externalUrl = getOpenStreetMapUrl(center, internalZoom, selectedMarker)

  React.useEffect(() => {
    setInternalZoom(clampZoom(zoom))
  }, [zoom])

  const selectMarker = (marker: MapMarker) => {
    if (selectedMarkerKey === undefined) setInternalSelectedKey(marker.key)
    onMarkerSelect?.(marker)
  }

  return (
    <section data-slot="map-view" className={cn("grid min-w-0 gap-3 rounded-lg border bg-card p-3 shadow-sm", className)} {...props}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          {title ? <h3 className="text-base font-semibold tracking-tight">{title}</h3> : null}
          {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
        </div>
        {showControls ? (
          <div className="flex items-center gap-1">
            <Button type="button" size="icon-sm" variant="outline" iconOnly aria-label="Zoom out" onClick={() => setInternalZoom((value) => clampZoom(value - 1))}><MinusIcon /></Button>
            <Badge variant="outline" tone="muted">{internalZoom}x</Badge>
            <Button type="button" size="icon-sm" variant="outline" iconOnly aria-label="Zoom in" onClick={() => setInternalZoom((value) => clampZoom(value + 1))}><PlusIcon /></Button>
            <Button type="button" size="icon-sm" variant="outline" iconOnly aria-label="Open in OpenStreetMap" onClick={() => window.open(externalUrl, "_blank", "noopener,noreferrer")}><ExternalLinkIcon /></Button>
          </div>
        ) : null}
      </div>

      <div className={cn("grid gap-3", showMarkerList && markers.length ? "lg:grid-cols-[minmax(0,1fr)_18rem]" : "")}>
        <div className="relative overflow-hidden rounded-lg border bg-muted" style={{ height }}>
          <iframe title={iframeTitle} src={resolvedUrl} className="absolute inset-0 size-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          {selectedMarker ? (
            <div className="absolute left-3 top-3 max-w-[calc(100%-1.5rem)] rounded-lg border bg-background/95 p-3 text-sm shadow-lg backdrop-blur">
              <div className="flex items-center gap-2 font-medium"><LocateFixedIcon className="size-4 text-primary" />{selectedMarker.label}</div>
              {selectedMarker.description ? <p className="mt-1 text-xs text-muted-foreground">{selectedMarker.description}</p> : null}
            </div>
          ) : null}
        </div>

        {showMarkerList && markers.length ? (
          <div data-slot="map-marker-list" className="grid content-start gap-2">
            {markers.map((marker) => {
              const selected = marker.key === activeKey
              return (
                <button
                  key={marker.key}
                  type="button"
                  aria-pressed={selected}
                  className="grid gap-1 rounded-lg border bg-background p-3 text-left text-sm outline-none transition hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-primary aria-pressed:bg-primary/5"
                  onClick={() => selectMarker(marker)}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-2 font-medium"><MapPinIcon className="size-4 shrink-0 text-primary" /><span className="truncate">{marker.label}</span></span>
                    <Badge size="sm" tone={marker.tone ?? "muted"} showDot>{selected ? "selected" : "marker"}</Badge>
                  </span>
                  {marker.description ? <span className="text-xs text-muted-foreground">{marker.description}</span> : null}
                  <span className="text-[11px] text-muted-foreground">{marker.latitude.toFixed(4)}, {marker.longitude.toFixed(4)}</span>
                </button>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export { MapView }
