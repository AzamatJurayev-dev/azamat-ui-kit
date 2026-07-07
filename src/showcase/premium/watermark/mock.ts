import type { ComponentDemoMock } from "../types"

export const watermarkMock: ComponentDemoMock = {
  code: `import { Watermark } from "@/index"

export function Example() {
  return (
    <Watermark text="PRIVATE BETA">
      <div className="grid h-28 place-items-center rounded-xl border bg-card">
        Document surface
      </div>
    </Watermark>
  )
}`,
  cliCommand: "npx @azamatjurayevdev/azix-ui add watermark",
  highlights: [
    "Optional watermark for document and export previews",
    "Works on any container content",
    "Configurable watermark text and overlay style",
  ],
  scenarios: [
    { title: "Confidential docs", description: "Show usage watermark without blocking interaction." },
    { title: "Design previews", description: "Brand mark on generated screenshots." },
    { title: "Shared exports", description: "Visual indicator for internal staging artifacts." },
  ],
}
