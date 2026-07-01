export type InputDemoField = {
  kind: "search" | "email" | "disabled" | "readOnly" | "toolbar"
  label: string
  placeholder?: string
  defaultValue?: string
}
