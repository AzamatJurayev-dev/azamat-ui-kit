import * as React from "react"

import { MapView, type MapMarker } from "@/index"

const markers: MapMarker[] = [
  {
    key: "hq",
    label: "Tashkent HQ",
    latitude: 41.311081,
    longitude: 69.240562,
    description: "Operations workspace and dispatch team.",
    tone: "success",
  },
  {
    key: "airport",
    label: "Airport cargo",
    latitude: 41.257862,
    longitude: 69.281186,
    description: "Priority freight intake and route handoff.",
    tone: "info",
  },
  {
    key: "sergeli",
    label: "Sergeli hub",
    latitude: 41.22621,
    longitude: 69.22327,
    description: "South-side courier staging point.",
    tone: "warning",
  },
]

export function MapShowcase() {
  const [selected, setSelected] = React.useState("hq")

  return (
    <MapView
      title="Branch coverage"
      description="Marker selection updates the focused map area and route metadata."
      markers={markers}
      selectedMarkerKey={selected}
      onMarkerSelect={(marker) => setSelected(marker.key)}
      height={430}
    />
  )
}
