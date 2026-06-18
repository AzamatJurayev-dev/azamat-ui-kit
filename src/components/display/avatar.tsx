import * as React from "react"

import { cn } from "@/lib/utils"

export type AvatarSize = "xs" | "sm" | "default" | "lg" | "xl"
export type AvatarShape = "circle" | "rounded" | "square"

export type AvatarProps = React.ComponentProps<"span"> & {
  src?: string
  alt?: string
  name?: string
  fallback?: React.ReactNode
  size?: AvatarSize
  shape?: AvatarShape
  status?: "online" | "offline" | "busy" | "away"
}

export type AvatarGroupItem = AvatarProps & {
  key: string
}

export type AvatarGroupProps = React.ComponentProps<"div"> & {
  items: AvatarGroupItem[]
  max?: number
  size?: AvatarSize
  shape?: AvatarShape
  stacked?: boolean
  overflowLabel?: (count: number) => React.ReactNode
}

const sizeClassName: Record<AvatarSize, string> = {
  xs: "size-6 text-[10px]",
  sm: "size-8 text-xs",
  default: "size-10 text-sm",
  lg: "size-12 text-base",
  xl: "size-16 text-lg",
}

const shapeClassName: Record<AvatarShape, string> = {
  circle: "rounded-full",
  rounded: "rounded-xl",
  square: "rounded-md",
}

const statusClassName = {
  online: "bg-emerald-500",
  offline: "bg-muted-foreground",
  busy: "bg-destructive",
  away: "bg-amber-500",
}

function getInitials(name?: string) {
  if (!name) return "?"
  const words = name.trim().split(/\s+/).filter(Boolean)
  if (!words.length) return "?"
  return words.slice(0, 2).map((word) => word[0]?.toUpperCase()).join("")
}

function Avatar({
  src,
  alt,
  name,
  fallback,
  size = "default",
  shape = "circle",
  status,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = React.useState(false)
  const showImage = Boolean(src && !imageError)

  return (
    <span
      data-slot="avatar"
      data-size={size}
      data-shape={shape}
      className={cn("relative inline-flex shrink-0 select-none items-center justify-center overflow-hidden border bg-muted font-medium text-muted-foreground", sizeClassName[size], shapeClassName[shape], className)}
      {...props}
    >
      {showImage ? (
        <img src={src} alt={alt ?? name ?? "Avatar"} className="size-full object-cover" onError={() => setImageError(true)} />
      ) : (
        <span data-slot="avatar-fallback">{fallback ?? getInitials(name)}</span>
      )}
      {status && (
        <span
          data-slot="avatar-status"
          data-status={status}
          className={cn("absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background", size === "xs" && "size-2", size === "xl" && "size-3.5", statusClassName[status])}
        />
      )}
    </span>
  )
}

function AvatarGroup({
  items,
  max = 5,
  size = "default",
  shape = "circle",
  stacked = true,
  overflowLabel = (count) => `+${count}`,
  className,
  ...props
}: AvatarGroupProps) {
  const visibleItems = items.slice(0, max)
  const overflowCount = Math.max(items.length - max, 0)

  return (
    <div data-slot="avatar-group" className={cn("flex items-center", stacked ? "-space-x-2" : "gap-2", className)} {...props}>
      {visibleItems.map((item) => (
        <Avatar key={item.key} size={item.size ?? size} shape={item.shape ?? shape} className={cn(stacked && "ring-2 ring-background", item.className)} {...item} />
      ))}
      {overflowCount > 0 && (
        <Avatar size={size} shape={shape} fallback={overflowLabel(overflowCount)} className={cn(stacked && "ring-2 ring-background")} />
      )}
    </div>
  )
}

export { Avatar, AvatarGroup }
