import type * as React from "react"

export type ShowcaseDemoState = {
  textValue: string
  textareaValue: string
  checked: boolean
  switchOn: boolean
  selectValue: string
  badgeVariant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  cardCompact: boolean
  activeTab: "overview" | "activity" | "settings"
}

export type ShowcaseDemoMock = {
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

export type ShowcaseDemoProps = {
  state: ShowcaseDemoState
  setState: (patch: Partial<ShowcaseDemoState>) => void
  mode: "docs" | "playground" | "components"
}

export type ShowcaseDemoBundle = {
  mock: ShowcaseDemoMock
  Showcase: (props: ShowcaseDemoProps) => React.ReactNode
}

export const defaultShowcaseDemoState: ShowcaseDemoState = {
  textValue: "Azamat UI",
  textareaValue: "Controlled preview content for the selected component.",
  checked: true,
  switchOn: true,
  selectValue: "starter",
  badgeVariant: "default",
  cardCompact: false,
  activeTab: "overview",
}

export type ShowcaseDemoKind =
  | "actions"
  | "calendar"
  | "data-table"
  | "display"
  | "feedback"
  | "form"
  | "inputs"
  | "layout"
  | "navigation"
  | "overlay"
  | "patterns"
  | "upload"
  | "wizard"

export type ShowcaseDemoDefinition = {
  slug: string
  title: string
  component: string
  kind: ShowcaseDemoKind
  summary: string
  highlights: string[]
  scenarios: ShowcaseDemoMock["scenarios"]
  importName?: string
}
