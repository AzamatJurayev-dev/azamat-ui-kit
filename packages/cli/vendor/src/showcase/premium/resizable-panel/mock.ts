import type { ComponentDemoMock } from "../types"

export const resizablePanelMock: ComponentDemoMock = {
  code: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/index"

export function Example() {
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30}>Catalog</ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={70}>Details</ResizablePanel>
    </ResizablePanelGroup>
  )
}`,
  cliCommand: "npx azix add resizable-panel",
  highlights: [
    "Declarative split layout with customizable handles",
    "Supports horizontal and vertical directions",
    "Keyboard-accessible resize interactions",
  ],
  scenarios: [
    { title: "Code editors", description: "Split file tree and editor panes." },
    { title: "Dashboards", description: "Resize nav and detail panels interactively." },
  ],
}

