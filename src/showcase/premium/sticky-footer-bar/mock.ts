import type { ComponentDemoMock } from "../types"

export const stickyFooterBarMock: ComponentDemoMock = {
  code: `import { Button, StickyFooterBar } from "@/index"

export function Example() {
  return (
    <StickyFooterBar
      start={<span className="text-sm">Unsaved changes</span>}
      end={
        <>
          <Button size="sm" variant="outline">Discard</Button>
          <Button size="sm">Save</Button>
        </>
      }
    />
  )
}`,
  cliCommand: "npx tembro add sticky-footer-bar",
  highlights: [
    "Sticky bottom action bar with start/end slots",
    "Useful in long forms or page-level action surfaces",
    "Works with mixed content and custom children",
  ],
  scenarios: [
    { title: "Editor", description: "Keep save actions visible while scrolling long content." },
    { title: "Dashboard", description: "Show contextual batch actions near viewport bottom." },
  ],
}

