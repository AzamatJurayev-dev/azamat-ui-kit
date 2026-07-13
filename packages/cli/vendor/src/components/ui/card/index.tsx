import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  "group/card flex flex-col gap-(--card-spacing) overflow-hidden py-(--card-spacing) [--card-spacing:--spacing(5)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0",
  {
    variants: {
      variant: {
        default: "",
        elevated: "",
        outline: "",
        soft: "",
        ghost: "",
      },
      size: {
        sm: "",
        default: "",
        lg: "",
      },
      density: {
        compact: "",
        default: "",
        comfortable: "",
      },
      tone: {
        neutral: "",
        info: "",
        success: "",
        warning: "",
        danger: "",
      },
      interactive: {
        true: "cursor-pointer focus-visible:outline-none focus-visible:ring-0",
        false: "",
      },
      selected: {
        true: "",
        false: "",
      },
      disabled: {
        true: "pointer-events-none",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      density: "default",
      tone: "neutral",
      interactive: false,
      selected: false,
      disabled: false,
    },
  }
)

type CardSurfaceSlots = {
  eyebrow?: React.ReactNode
  title?: React.ReactNode
  description?: React.ReactNode
  badge?: React.ReactNode
  action?: React.ReactNode
  media?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  mediaClassName?: string
  bodyClassName?: string
  headerClassName?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  contentClassName?: string
  footerClassName?: string
}

export type CardOrientation = "vertical" | "horizontal"
export type CardMediaAspect = "auto" | "square" | "video" | "poster" | "wide"
export type CardPadding = "none" | "sm" | "default" | "lg"

export type CardProps = Omit<React.ComponentProps<"div">, keyof CardSurfaceSlots> &
  VariantProps<typeof cardVariants> &
  CardSurfaceSlots & {
    orientation?: CardOrientation
    mediaPosition?: "start" | "end"
    mediaAspect?: CardMediaAspect
    padding?: CardPadding
  }

function hasSurfaceContent(props: CardSurfaceSlots) {
  return (
    props.eyebrow != null ||
    props.title != null ||
    props.description != null ||
    props.badge != null ||
    props.action != null ||
    props.media != null ||
    props.content != null ||
    props.footer != null
  )
}

function Card({
  className,
  variant,
  size,
  density,
  tone,
  interactive,
  selected,
  disabled,
  orientation = "vertical",
  mediaPosition = "start",
  mediaAspect = "auto",
  padding = "default",
  tabIndex,
  eyebrow,
  title,
  description,
  badge,
  action,
  media,
  content,
  footer,
  mediaClassName,
  bodyClassName,
  headerClassName,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  footerClassName,
  children,
  ...props
}: CardProps) {
  const surfaceMode = hasSurfaceContent({
    eyebrow,
    title,
    description,
    badge,
    action,
    media,
    content,
    footer,
  })
  const resolvedContent = content ?? children
  const hasHeader = eyebrow != null || title != null || description != null || badge != null || action != null
  const hasFooter = footer != null
  const mediaNode = media ? (
    <div
      data-slot="card-media"
      data-media-position={mediaPosition}
      data-media-aspect={mediaAspect}
      className={cn(
        "overflow-hidden",
        orientation === "horizontal" ? "shrink-0 self-stretch" : "",
        mediaAspect === "square" && (orientation === "horizontal" ? "w-40" : "aspect-square"),
        mediaAspect === "video" && (orientation === "horizontal" ? "w-56" : "aspect-video"),
        mediaAspect === "poster" && (orientation === "horizontal" ? "w-36" : "aspect-[3/4]"),
        mediaAspect === "wide" && (orientation === "horizontal" ? "w-72" : "aspect-[16/7]"),
        mediaClassName
      )}
    >
      {media}
    </div>
  ) : null
  const surfacePaddingClassName = {
    none: "",
    sm: "px-4",
    default: "px-(--card-spacing)",
    lg: "px-6",
  } satisfies Record<CardPadding, string>
  const bodyPaddingClassName = {
    none: "",
    sm: "pb-4",
    default: "",
    lg: "pb-6",
  } satisfies Record<CardPadding, string>

  return (
    <div
      data-slot="card"
      data-surface={surfaceMode || undefined}
      data-size={size ?? "default"}
      data-variant={variant ?? "default"}
      data-tone={tone ?? "neutral"}
      data-density={density ?? "default"}
      data-interactive={interactive || undefined}
      data-selected={selected || undefined}
      data-disabled={disabled || undefined}
      data-has-footer={hasFooter || undefined}
      data-orientation={orientation}
      data-padding={padding}
      aria-disabled={disabled || undefined}
      tabIndex={interactive && !disabled ? tabIndex ?? 0 : tabIndex}
      className={cn(
        cardVariants({ variant, size, density, tone, interactive, selected, disabled }),
        orientation === "horizontal" && "flex-row py-0",
        className
      )}
      {...props}
    >
      {surfaceMode ? (
        <>
          {mediaPosition === "start" ? mediaNode : null}
          <div
            data-slot="card-body"
            className={cn(
              "flex min-w-0 flex-1 flex-col",
              orientation === "horizontal" ? "py-(--card-spacing)" : "",
              bodyPaddingClassName[padding],
              bodyClassName
            )}
          >
            {hasHeader ? (
              <CardHeader className={cn(surfacePaddingClassName[padding], headerClassName)}>
                <div className="flex min-w-0 flex-col gap-1">
                  {eyebrow != null ? (
                    <div data-slot="card-eyebrow" className={eyebrowClassName}>
                      {eyebrow}
                    </div>
                  ) : null}
                  {title != null ? <CardTitle className={titleClassName}>{title}</CardTitle> : null}
                  {description != null ? (
                    <CardDescription className={descriptionClassName}>{description}</CardDescription>
                  ) : null}
                </div>
                {badge != null || action != null ? (
                  <CardAction className="flex items-center gap-2">
                    {badge}
                    {action}
                  </CardAction>
                ) : null}
              </CardHeader>
            ) : null}
            {resolvedContent != null ? <CardContent className={cn(surfacePaddingClassName[padding], contentClassName)}>{resolvedContent}</CardContent> : null}
            {hasFooter ? <CardFooter className={cn(surfacePaddingClassName[padding], footerClassName)}>{footer}</CardFooter> : null}
          </div>
          {mediaPosition === "end" ? mediaNode : null}
        </>
      ) : (
        children
      )}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={className}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={className}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-(--card-spacing)", className)} {...props} />
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center p-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  cardVariants,
}
