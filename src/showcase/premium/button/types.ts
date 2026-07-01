export type ButtonDemoAction = {
  label: string
  variant: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  loading?: boolean
  disabled?: boolean
  icon?: "download" | "arrow" | "none"
  asLink?: boolean
}

export type ButtonDemoRow = {
  title: string
  actions: ButtonDemoAction[]
}
