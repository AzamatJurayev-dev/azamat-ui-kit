import * as React from "react"
import { Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type DialogActionsAlign = "start" | "center" | "end" | "between"

const alignClassName: Record<DialogActionsAlign, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
}

export type DialogActionButtonProps = React.ComponentProps<typeof Button> & {
  isLoading?: boolean
  loadingLabel?: React.ReactNode
}

export type DialogActionsProps = React.ComponentProps<"div"> & {
  align?: DialogActionsAlign
  stackOnMobile?: boolean
}

function DialogActionButton({
  children,
  disabled,
  isLoading = false,
  loadingLabel,
  className,
  ...props
}: DialogActionButtonProps) {
  return (
    <Button
      className={className}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading && <Loader2Icon data-icon="inline-start" className="animate-spin" />}
      {isLoading && loadingLabel ? loadingLabel : children}
    </Button>
  )
}

function DialogActions({
  className,
  align = "end",
  stackOnMobile = true,
  ...props
}: DialogActionsProps) {
  return (
    <div
      data-slot="dialog-actions"
      className={cn(
        "flex items-center gap-2",
        stackOnMobile && "flex-col-reverse sm:flex-row",
        !stackOnMobile && "flex-row",
        alignClassName[align],
        className
      )}
      {...props}
    />
  )
}

export { DialogActions, DialogActionButton }
