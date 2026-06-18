export type SelectDemoOption = {
  value: string
  label: string
}

export type SelectDemoGroup = {
  title: string
  size?: "default" | "sm"
  options: SelectDemoOption[]
}
