export type SelectDemoOption = {
  value: string
  label: string
  description?: string
  disabled?: boolean
  keywords?: string[]
}

export type SelectDemoGroup = {
  title: string
  size?: "default" | "sm"
  options: SelectDemoOption[]
}
