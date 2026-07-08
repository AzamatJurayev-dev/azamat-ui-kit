import type { ComponentDemoMock } from "../types"

export const tabsMock: ComponentDemoMock = {
  code: `import { useState } from "react"\nimport { Tabs, TabsContent, TabsList, TabsTrigger } from "tembro"\n\nexport function Example() {\n  const [value, setValue] = useState("overview")\n\n  return (\n    <Tabs value={value} onValueChange={setValue} defaultValue="overview">\n      <TabsList>\n        <TabsTrigger value="overview">Overview</TabsTrigger>\n        <TabsTrigger value="activity">Activity</TabsTrigger>\n        <TabsTrigger value="settings">Settings</TabsTrigger>\n      </TabsList>\n      <TabsContent value="overview">Overview panel with KPIs.</TabsContent>\n      <TabsContent value="activity">Activity timeline and history.</TabsContent>\n      <TabsContent value="settings">Settings controls and workspace preferences.</TabsContent>\n    </Tabs>\n  )\n}\n\n// Use Tabs for local content sections.\n// For route transitions, prefer router-based tabs to persist deep links.`,
  cliCommand: "npx tembro add tabs",
  highlights: ["Segmented navigation", "Panel switching", "Controlled value", "Settings sections", "Keyboard interaction"],
  relatedBlockSlugs: ["dashboard-starter", "crm-dashboard", "settings-form"],
  scenarios: [
    { title: "Sectioned detail page", description: "Swap content panels without navigating away." },
    { title: "Settings layout", description: "Split preferences into clear topical groups." },
    { title: "Reporting pages", description: "Use tabs for overview, activity and settings views." },
    { title: "Template detail route", description: "Keep multiple previews in one route with explicit sections." },
  ],
  capabilityNotes: [
    "Supports segmented triggers and controlled content panels.",
    "Fits settings, reporting and detail-page information architecture.",
    "Show default selected state and content swaps clearly.",
    "Use with local content sections; use route tabs when deep-linking is required.",
  ],
}

