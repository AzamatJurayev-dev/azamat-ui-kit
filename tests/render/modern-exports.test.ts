import { describe, expect, it } from "vitest"

import * as kit from "@/index"

describe("modern exports", () => {
  it("keeps the documented modern surface available from the root export", () => {
    const modernExports = [
      "Affix",
      "CalendarScheduler",
      "DualListPicker",
      "Menubar",
      "MenubarContent",
      "MenubarItem",
      "MenubarMenu",
      "MenubarTrigger",
      "NavigationMenu",
      "NavigationMenuItem",
      "NavigationMenuLink",
      "NavigationMenuList",
      "ResizableHandle",
      "ResizablePanel",
      "ResizablePanelGroup",
      "RichTextEditor",
      "QRCode",
      "QRCodeSvg",
      "Tag",
      "TagGroup",
      "Chip",
      "TimePicker",
      "Tour",
    ]

    for (const exportName of modernExports) {
      expect(exportName in kit, `${exportName} should be exported from the root surface`).toBe(true)
    }
  })
})
