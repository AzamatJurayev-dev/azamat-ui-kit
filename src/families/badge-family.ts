import { StatusBadge } from "@/components/feedback"
import { Badge } from "@/components/ui/badge"

const BadgeFamily = {
  Root: Badge,
  Status: StatusBadge,
} as const

export { BadgeFamily }
