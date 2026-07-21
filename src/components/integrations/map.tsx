"use client"

import * as React from "react"
import MapGL, {
  Marker,
  NavigationControl,
  Popup,
  type MapMouseEvent,
  type MapProps as ReactMapProps,
  type MarkerDragEvent,
} from "react-map-gl/maplibre"
import { MapPinIcon } from "lucide-react"

import "maplibre-gl/dist/maplibre-gl.css"

import { cn } from "@/lib/utils"

export type MapCoordinate = {
  longitude: number
  latitude: number
}

export type MapMarkerItem = MapCoordinate & {
  id: string
  label?: string
  content?: React.ReactNode
  popup?: React.ReactNode
  draggable?: boolean
  disabled?: boolean
}

export type MapViewProps = Omit<ReactMapProps, "children" | "style"> & {
  markers?: MapMarkerItem[]
  selectedMarkerId?: string | null
  defaultSelectedMarkerId?: string | null
  onSelectedMarkerChange?: (markerId: string | null) => void
  onMarkerChange?: (markerId: string, coordinate: MapCoordinate) => void
  onMapClick?: (coordinate: MapCoordinate, event: MapMouseEvent) => void
  showNavigationControl?: boolean
  navigationControlPosition?: React.ComponentProps<typeof NavigationControl>["position"]
  markerIcon?: React.ReactNode
  children?: React.ReactNode
  className?: string
  mapClassName?: string
  style?: React.CSSProperties
}

const DEFAULT_MAP_STYLE = "https://demotiles.maplibre.org/style.json"
const DEFAULT_VIEW_STATE = {
  longitude: 0,
  latitude: 20,
  zoom: 2,
}

function MapView({
  markers = [],
  selectedMarkerId,
  defaultSelectedMarkerId = null,
  onSelectedMarkerChange,
  onMarkerChange,
  onMapClick,
  showNavigationControl = true,
  navigationControlPosition = "top-right",
  markerIcon,
  children,
  className,
  mapClassName,
  style,
  initialViewState = DEFAULT_VIEW_STATE,
  mapStyle = DEFAULT_MAP_STYLE,
  onClick,
  ...mapProps
}: MapViewProps) {
  const [internalSelectedMarkerId, setInternalSelectedMarkerId] = React.useState<string | null>(
    defaultSelectedMarkerId
  )
  const activeMarkerId = selectedMarkerId === undefined ? internalSelectedMarkerId : selectedMarkerId
  const activeMarker = markers.find((marker) => marker.id === activeMarkerId)

  const selectMarker = React.useCallback(
    (markerId: string | null) => {
      if (selectedMarkerId === undefined) setInternalSelectedMarkerId(markerId)
      onSelectedMarkerChange?.(markerId)
    },
    [onSelectedMarkerChange, selectedMarkerId]
  )

  return (
    <div
      data-slot="map-view"
      className={cn("relative min-h-72 w-full overflow-hidden rounded-lg border bg-muted", className)}
      style={style}
    >
      <MapGL
        {...mapProps}
        initialViewState={initialViewState}
        mapStyle={mapStyle}
        className={cn("h-full min-h-72 w-full", mapClassName)}
        onClick={(event) => {
          onClick?.(event)
          onMapClick?.(
            { longitude: event.lngLat.lng, latitude: event.lngLat.lat },
            event
          )
        }}
      >
        {showNavigationControl ? <NavigationControl position={navigationControlPosition} /> : null}

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
            draggable={marker.draggable && !marker.disabled}
            onDragEnd={(event: MarkerDragEvent) => {
              onMarkerChange?.(marker.id, {
                longitude: event.lngLat.lng,
                latitude: event.lngLat.lat,
              })
            }}
          >
            <button
              type="button"
              data-slot="map-marker"
              disabled={marker.disabled}
              aria-label={marker.label ?? "Map marker"}
              className={cn(
                "grid size-9 place-items-center rounded-full border bg-background text-foreground shadow-md transition-transform",
                "hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                activeMarkerId === marker.id && "ring-2 ring-ring"
              )}
              onClick={(event) => {
                event.stopPropagation()
                selectMarker(marker.id)
              }}
            >
              {marker.content ?? markerIcon ?? <MapPinIcon className="size-5" aria-hidden="true" />}
            </button>
          </Marker>
        ))}

        {activeMarker?.popup ? (
          <Popup
            longitude={activeMarker.longitude}
            latitude={activeMarker.latitude}
            anchor="top"
            closeButton
            closeOnClick={false}
            onClose={() => selectMarker(null)}
          >
            <div data-slot="map-popup" className="min-w-36 text-sm text-foreground">
              {activeMarker.popup}
            </div>
          </Popup>
        ) : null}

        {children}
      </MapGL>
    </div>
  )
}

export type LocationPickerProps = Omit<
  MapViewProps,
  "markers" | "selectedMarkerId" | "defaultSelectedMarkerId" | "onSelectedMarkerChange" | "onMarkerChange" | "onMapClick"
> & {
  value?: MapCoordinate | null
  defaultValue?: MapCoordinate | null
  onValueChange?: (coordinate: MapCoordinate | null) => void
  markerLabel?: string
  draggable?: boolean
  selectOnMapClick?: boolean
  clearable?: boolean
}

function LocationPicker({
  value,
  defaultValue = null,
  onValueChange,
  markerLabel = "Selected location",
  draggable = true,
  selectOnMapClick = true,
  clearable = false,
  initialViewState,
  ...props
}: LocationPickerProps) {
  const [internalValue, setInternalValue] = React.useState<MapCoordinate | null>(defaultValue)
  const currentValue = value === undefined ? internalValue : value

  const updateValue = React.useCallback(
    (coordinate: MapCoordinate | null) => {
      if (value === undefined) setInternalValue(coordinate)
      onValueChange?.(coordinate)
    },
    [onValueChange, value]
  )

  const resolvedInitialViewState = initialViewState ??
    (currentValue
      ? {
          longitude: currentValue.longitude,
          latitude: currentValue.latitude,
          zoom: 13,
        }
      : DEFAULT_VIEW_STATE)

  return (
    <div data-slot="location-picker" className="grid gap-2">
      <MapView
        {...props}
        initialViewState={resolvedInitialViewState}
        markers={
          currentValue
            ? [
                {
                  id: "selected-location",
                  ...currentValue,
                  label: markerLabel,
                  draggable,
                },
              ]
            : []
        }
        onMarkerChange={(_, coordinate) => updateValue(coordinate)}
        onMapClick={(coordinate) => {
          if (selectOnMapClick) updateValue(coordinate)
        }}
      />

      {currentValue ? (
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
          <output className="tabular-nums">
            {currentValue.latitude.toFixed(6)}, {currentValue.longitude.toFixed(6)}
          </output>
          {clearable ? (
            <button
              type="button"
              className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => updateValue(null)}
            >
              Clear
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export { LocationPicker, MapView }
