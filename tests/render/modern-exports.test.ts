import { describe, expect, it } from "vitest"

import * as kit from "@/index"

describe("modern exports", () => {
  it("keeps the documented modern surface available from the root export", () => {
    const modernExports = [
      "CalendarScheduler",
      "DualListPicker",
      "ResizableHandle",
      "ResizablePanel",
      "ResizablePanelGroup",
      "Tag",
      "TagGroup",
      "Chip",
      "TimePicker",
    ]

    for (const exportName of modernExports) {
      expect(exportName in kit, `${exportName} should be exported from the root surface`).toBe(true)
    }
  })
})
