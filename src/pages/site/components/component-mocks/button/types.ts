export type ButtonDemoAction = {
  label: string
  variant: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"
  icon?: "download" | "arrow" | "none"
}

export type ButtonDemoRow = {
  title: string
  actions: ButtonDemoAction[]
}
