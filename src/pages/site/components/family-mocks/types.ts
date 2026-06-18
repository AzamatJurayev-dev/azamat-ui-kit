import type * as React from "react"

export type FamilyDemoState = {
  search: string
  notes: string
  step: number
  uploadCount: number
  density: "comfortable" | "compact"
}

export type FamilyDemoMock = {
  code: string
  highlights: string[]
  scenarios: Array<{
    title: string
    description: string
  }>
  metrics: Array<{
    label: string
    value: string
  }>
}

export type FamilyDemoProps = {
  state: FamilyDemoState
  setState: (patch: Partial<FamilyDemoState>) => void
}

export type FamilyDemoBundle = {
  mock: FamilyDemoMock
  Showcase: (props: FamilyDemoProps) => React.ReactNode
}

export const defaultFamilyDemoState: FamilyDemoState = {
  search: "",
  notes: "This module family is wired into the public showcase and has real route-level actions.",
  step: 2,
  uploadCount: 3,
  density: "comfortable",
}
