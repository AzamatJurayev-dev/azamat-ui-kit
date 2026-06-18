import type { ComponentDemoMock } from "../types"

export const tabsMock: ComponentDemoMock = {
  code: `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@azamat/ui"\n\nexport function Example() {\n  return (\n    <Tabs defaultValue="overview">\n      <TabsList>\n        <TabsTrigger value="overview">Overview</TabsTrigger>\n      </TabsList>\n      <TabsContent value="overview">Overview</TabsContent>\n    </Tabs>\n  )\n}`,
  cliCommand: "npx azamat-ui@latest add tabs",
  highlights: ["Segmented navigation", "Panel switching", "Controlled tab state", "Settings sections"],
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
    "Should show default selected state and content swaps clearly.",
    "Works best when each panel has a distinct responsibility.",
  ],
}

