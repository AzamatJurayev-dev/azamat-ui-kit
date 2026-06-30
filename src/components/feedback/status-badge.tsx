import * as React from "react"

import { Badge } from "@/components/ui/badge"

export type StatusBadgeTone =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted"
  | "outline"

export type StatusBadgeProps = Omit<React.ComponentProps<typeof Badge>, "tone" | "dot"> & {
  tone?: StatusBadgeTone
  dot?: boolean
}

const toneAlias = {
  default: "neutral",
  outline: "neutral",
  success: "success",
  warning: "warning",
  danger: "danger",
  info: "info",
  muted: "muted",
} as const

/**
 * @deprecated Use `Badge` with `tone`, `dot`, and `variant` props.
 */
function StatusBadge({
  tone = "default",
  dot = false,
  variant,
  ...props
}: StatusBadgeProps) {
  return (
    <Badge
      data-status-badge=""
      variant={variant ?? (tone === "outline" ? "outline" : "secondary")}
      tone={toneAlias[tone]}
      dot={dot}
      {...props}
    />
  )
}

export { StatusBadge }
