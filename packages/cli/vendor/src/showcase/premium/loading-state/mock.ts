import type { ComponentDemoMock } from "../types"

export const loadingStateMock: ComponentDemoMock = {
  code: `import { LoadingState } from "tembro"

export function Example() {
  return <LoadingState label="Loading metrics" description="Preparing dashboard widgets and chart data." />
}`,
  highlights: ["Simple loading copy", "Section-level placeholder", "Can be combined with skeletons", "Suitable for overlay and inline usage"],
  scenarios: [
    { title: "Data fetch", description: "Show while loading table or card-level content." },
    { title: "Background sync", description: "Display while async actions are in progress." },
    { title: "Upload wait", description: "Use between step transitions in wizards." },
  ],
  capabilityNotes: [
    "Keep descriptions specific to what users are waiting for.",
    "Use one source of truth for loading copy across sections.",
    "Prefer replacing entire section with loading state over mixing partial stale data.",
  ],
}

