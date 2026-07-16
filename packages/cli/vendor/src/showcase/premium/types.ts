import type * as React from "react"

export type ComponentDemoState = {
  textValue: string
  textareaValue: string
  checked: boolean
  switchOn: boolean
  selectValue: string
  badgeVariant: "default" | "secondary" | "soft" | "destructive" | "outline" | "ghost" | "link"
  cardCompact: boolean
  activeTab: "overview" | "activity" | "settings"
}

export type ComponentDemoMock = {
  code: string
  htmlCode?: string
  cliCommand?: string
  highlights: string[]
  relatedBlockSlugs?: string[]
  scenarios: Array<{
    title: string
    description: string
  }>
  capabilityNotes?: string[]
}

export type ComponentDemoProps = {
  state: ComponentDemoState
  setState: (patch: Partial<ComponentDemoState>) => void
  mode: "docs" | "playground" | "components"
}

export type ComponentDemoBundle = {
  mock: ComponentDemoMock
  Showcase: (props: ComponentDemoProps) => React.ReactNode
}

export const defaultComponentDemoState: ComponentDemoState = {
  textValue: "Tembro",
  textareaValue: "Controlled preview content for the selected component.",
  checked: true,
  switchOn: true,
  selectValue: "starter",
  badgeVariant: "default",
  cardCompact: false,
  activeTab: "overview",
}
