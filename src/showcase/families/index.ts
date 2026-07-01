import type { FamilyDemoBundle } from "./types"

import { actionsFamilyMock, ActionsFamilyShowcase } from "./actions"
import { calendarFamilyMock, CalendarFamilyShowcase } from "./calendar"
import { commandFamilyMock, CommandFamilyShowcase } from "./command"
import { dataTableFamilyMock, DataTableFamilyShowcase } from "./data-table"
import { displayFamilyMock, DisplayFamilyShowcase } from "./display"
import { filtersFamilyMock, FiltersFamilyShowcase } from "./filters"
import { formFamilyMock, FormFamilyShowcase } from "./form"
import { inputsFamilyMock, InputsFamilyShowcase } from "./inputs"
import { layoutFamilyMock, LayoutFamilyShowcase } from "./layout"
import { navigationFamilyMock, NavigationFamilyShowcase } from "./navigation"
import { notificationsFamilyMock, NotificationsFamilyShowcase } from "./notifications"
import { overlayFamilyMock, OverlayFamilyShowcase } from "./overlay"
import { patternsFamilyMock, PatternsFamilyShowcase } from "./patterns"
import { uploadFamilyMock, UploadFamilyShowcase } from "./upload"
import { wizardFamilyMock, WizardFamilyShowcase } from "./wizard"

export { defaultFamilyDemoState, type FamilyDemoBundle, type FamilyDemoProps, type FamilyDemoState } from "./types"

export const familyDemoRegistry: Record<string, FamilyDemoBundle> = {
  actions: { mock: actionsFamilyMock, Showcase: ActionsFamilyShowcase },
  filters: { mock: filtersFamilyMock, Showcase: FiltersFamilyShowcase },
  overlay: { mock: overlayFamilyMock, Showcase: OverlayFamilyShowcase },
  navigation: { mock: navigationFamilyMock, Showcase: NavigationFamilyShowcase },
  layout: { mock: layoutFamilyMock, Showcase: LayoutFamilyShowcase },
  "data-table": { mock: dataTableFamilyMock, Showcase: DataTableFamilyShowcase },
  inputs: { mock: inputsFamilyMock, Showcase: InputsFamilyShowcase },
  form: { mock: formFamilyMock, Showcase: FormFamilyShowcase },
  display: { mock: displayFamilyMock, Showcase: DisplayFamilyShowcase },
  notifications: { mock: notificationsFamilyMock, Showcase: NotificationsFamilyShowcase },
  command: { mock: commandFamilyMock, Showcase: CommandFamilyShowcase },
  calendar: { mock: calendarFamilyMock, Showcase: CalendarFamilyShowcase },
  wizard: { mock: wizardFamilyMock, Showcase: WizardFamilyShowcase },
  upload: { mock: uploadFamilyMock, Showcase: UploadFamilyShowcase },
  patterns: { mock: patternsFamilyMock, Showcase: PatternsFamilyShowcase },
}
