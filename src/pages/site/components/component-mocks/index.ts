import type { ComponentDemoBundle } from "./types"

import { badgeMock, BadgeShowcase } from "./badge"
import { buttonMock, ButtonShowcase } from "./button"
import { cardMock, CardShowcase } from "./card"
import { checkboxMock, CheckboxShowcase } from "./checkbox"
import { dialogMock, DialogShowcase } from "./dialog"
import { inputMock, InputShowcase } from "./input"
import { popoverMock, PopoverShowcase } from "./popover"
import { selectMock, SelectShowcase } from "./select"
import { switchMock, SwitchShowcase } from "./switch"
import { tableMock, TableShowcase } from "./table"
import { tabsMock, TabsShowcase } from "./tabs"
import { textareaMock, TextareaShowcase } from "./textarea"

export { defaultComponentDemoState, type ComponentDemoBundle, type ComponentDemoProps, type ComponentDemoState } from "./types"

export const componentDemoRegistry: Record<string, ComponentDemoBundle> = {
  button: { mock: buttonMock, Showcase: ButtonShowcase },
  input: { mock: inputMock, Showcase: InputShowcase },
  textarea: { mock: textareaMock, Showcase: TextareaShowcase },
  select: { mock: selectMock, Showcase: SelectShowcase },
  checkbox: { mock: checkboxMock, Showcase: CheckboxShowcase },
  switch: { mock: switchMock, Showcase: SwitchShowcase },
  badge: { mock: badgeMock, Showcase: BadgeShowcase },
  card: { mock: cardMock, Showcase: CardShowcase },
  tabs: { mock: tabsMock, Showcase: TabsShowcase },
  dialog: { mock: dialogMock, Showcase: DialogShowcase },
  popover: { mock: popoverMock, Showcase: PopoverShowcase },
  table: { mock: tableMock, Showcase: TableShowcase },
}
