import type { ComponentDemoMock } from "../types"

export const mapMock: ComponentDemoMock = {
  code: `import { MapView } from "tembro"

const branches = [
  {
    key: "hq",
    label: "Tashkent HQ",
    latitude: 41.311081,
    longitude: 69.240562,
    description: "Main operations office.",
    tone: "success",
  },
]

export function Example() {
  return (
    <MapView
      title="Branch coverage"
      description="OpenStreetMap embed with local marker selection."
      markers={branches}
      defaultSelectedMarkerKey="hq"
      height={420}
    />
  )
}`,
  cliCommand: "npx tembro add map",
  highlights: [
    "Real OpenStreetMap embed instead of a static placeholder",
    "Marker list with controlled and uncontrolled selection",
    "Zoom controls and external map navigation",
  ],
  scenarios: [
    { title: "Delivery operations", description: "Show depots, delayed routes, and selected city coverage." },
    { title: "Real estate CRM", description: "Inspect listings by region with marker metadata." },
  ],
  capabilityNotes: [
    "Pass `mapUrl` when the product already owns a custom tile or embed provider.",
    "Use `selectedMarkerKey` and `onMarkerSelect` for fully controlled route state.",
  ],
}
