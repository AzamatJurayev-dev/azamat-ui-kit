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
import { defaultComponentDemoState, premiumShowcaseDemoRegistry } from "./premium"
import { registryQualityDemoRegistry } from "./registry-quality"
import { registrySpecificDemoRegistry } from "./registry-specific"
import { supplementalShowcaseDemoRegistry } from "./supplemental"

export * from "./types"
export * from "./premium"
export * from "./registry-quality"
export * from "./registry-specific"
export * from "./fallback"
export * from "./families/index"
export * from "./preview-catalog"
export * from "./preview-registry"
export * from "./site-data"
export * from "./component-api-schema"
export * from "./search-utils"
export * from "./package-meta"
export * from "./supplemental"

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
  ...registrySpecificDemoRegistry,
  ...supplementalShowcaseDemoRegistry,
  ...premiumShowcaseDemoRegistry,
  ...registryQualityDemoRegistry,
}

export { defaultComponentDemoState }
export const componentDemoRegistry = showcaseDemoRegistry
