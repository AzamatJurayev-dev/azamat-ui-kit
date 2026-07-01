import { actionsShowcaseDemoRegistry } from "@/components/actions/demo"
import { calendarShowcaseDemoRegistry } from "@/components/calendar/demo"
import { dataTableShowcaseDemoRegistry } from "@/components/data-table/demo"
import { displayShowcaseDemoRegistry } from "@/components/display/demo"
import { feedbackShowcaseDemoRegistry } from "@/components/feedback/demo"
import { filtersShowcaseDemoRegistry } from "@/components/filters/demo"
import { formShowcaseDemoRegistry } from "@/components/form/demo"
import { inputsShowcaseDemoRegistry } from "@/components/inputs/demo"
import { layoutShowcaseDemoRegistry } from "@/components/layout/demo"
import { navigationShowcaseDemoRegistry } from "@/components/navigation/demo"
import { overlayShowcaseDemoRegistry } from "@/components/overlay/demo"
import { patternsShowcaseDemoRegistry } from "@/components/patterns/demo"
import { uploadShowcaseDemoRegistry } from "@/components/upload/demo"
import { wizardShowcaseDemoRegistry } from "@/components/wizard/demo"
import { premiumShowcaseDemoRegistry } from "./premium"

export * from "./types"
export * from "./premium"

export const showcaseDemoRegistry = {
  ...actionsShowcaseDemoRegistry,
  ...calendarShowcaseDemoRegistry,
  ...dataTableShowcaseDemoRegistry,
  ...displayShowcaseDemoRegistry,
  ...feedbackShowcaseDemoRegistry,
  ...filtersShowcaseDemoRegistry,
  ...formShowcaseDemoRegistry,
  ...inputsShowcaseDemoRegistry,
  ...layoutShowcaseDemoRegistry,
  ...navigationShowcaseDemoRegistry,
  ...overlayShowcaseDemoRegistry,
  ...patternsShowcaseDemoRegistry,
  ...uploadShowcaseDemoRegistry,
  ...wizardShowcaseDemoRegistry,
  ...premiumShowcaseDemoRegistry,
}
