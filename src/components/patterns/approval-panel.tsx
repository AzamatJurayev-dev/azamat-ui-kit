import * as React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type ApprovalPanelAction = {
  key: string
  label: React.ReactNode
  variant?: React.ComponentProps<typeof Button>["variant"]
  disabled?: boolean
  requiresComment?: boolean
}

export type ApprovalPanelProps = React.ComponentProps<"div"> & {
  title?: React.ReactNode
  description?: React.ReactNode
  value?: string
  defaultValue?: string
  onCommentChange?: (value: string) => void
  commentPlaceholder?: string
  actions?: ApprovalPanelAction[]
  loadingActionKey?: string
  onAction?: (action: ApprovalPanelAction, comment: string) => void
  renderAction?: (action: ApprovalPanelAction, comment: string) => React.ReactNode
}

const defaultActions: ApprovalPanelAction[] = [
  { key: "approve", label: "Approve" },
  { key: "reject", label: "Reject", variant: "destructive", requiresComment: true },
  { key: "return", label: "Return for revision", variant: "outline", requiresComment: true },
]

function ApprovalPanel({
  title = "Approval",
  description,
  value,
  defaultValue = "",
  onCommentChange,
  commentPlaceholder = "Write a comment...",
  actions = defaultActions,
  loadingActionKey,
  onAction,
  renderAction,
  className,
  ...props
}: ApprovalPanelProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const comment = value ?? internalValue

  const updateComment = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue)
    onCommentChange?.(nextValue)
  }

  return (
    <div data-slot="approval-panel" className={cn("grid gap-3 rounded-lg border bg-card p-4", className)} {...props}>
      {(title || description) && (
        <div className="grid gap-1">
          {title && <div className="text-base font-semibold text-foreground">{title}</div>}
          {description && <div className="text-sm text-muted-foreground">{description}</div>}
        </div>
      )}
      <Textarea value={comment} placeholder={commentPlaceholder} onChange={(event) => updateComment(event.currentTarget.value)} />
      <div className="flex flex-wrap justify-end gap-2">
        {actions.map((action) => {
          const disabled = action.disabled || (action.requiresComment && comment.trim().length === 0)
          return renderAction?.(action, comment) ?? (
            <Button key={action.key} type="button" variant={action.variant ?? "default"} disabled={disabled || loadingActionKey === action.key} onClick={() => onAction?.(action, comment)}>
              {loadingActionKey === action.key ? "Processing..." : action.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export { ApprovalPanel }
