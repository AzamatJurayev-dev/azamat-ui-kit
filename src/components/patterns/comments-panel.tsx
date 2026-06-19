import * as React from "react"

import { Avatar, type AvatarProps } from "@/components/display/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type CommentItem = {
  key: string
  author: React.ReactNode
  body: React.ReactNode
  createdAt?: React.ReactNode
  avatar?: AvatarProps
  actions?: React.ReactNode
}

export type CommentsPanelProps = React.ComponentProps<"div"> & {
  comments: CommentItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  submitLabel?: React.ReactNode
  placeholder?: string
  empty?: React.ReactNode
  renderComment?: (comment: CommentItem) => React.ReactNode
}

function CommentsPanel({ comments, value, defaultValue = "", onValueChange, onSubmit, submitLabel = "Comment", placeholder = "Write a comment...", empty, renderComment, className, ...props }: CommentsPanelProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value ?? internalValue

  const updateValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue)
    onValueChange?.(nextValue)
  }

  const submit = () => {
    if (!currentValue.trim()) return
    onSubmit?.(currentValue)
    if (value === undefined) setInternalValue("")
  }

  return (
    <div data-slot="comments-panel" className={cn("grid gap-4", className)} {...props}>
      <div className="grid gap-3">
        {comments.length === 0 ? empty ?? <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">No comments yet</div> : comments.map((comment) => renderComment?.(comment) ?? <CommentRow key={comment.key} comment={comment} />)}
      </div>
      <div className="grid gap-2 rounded-lg border bg-card p-3">
        <Textarea value={currentValue} placeholder={placeholder} onChange={(event) => updateValue(event.currentTarget.value)} />
        <div className="flex justify-end">
          <Button type="button" disabled={!currentValue.trim()} onClick={submit}>{submitLabel}</Button>
        </div>
      </div>
    </div>
  )
}

function CommentRow({ comment }: { comment: CommentItem }) {
  return (
    <div data-slot="comment-item" className="flex items-start gap-3 rounded-lg border bg-card p-3">
      <Avatar size="sm" {...comment.avatar} name={comment.avatar?.name ?? (typeof comment.author === "string" ? comment.author : undefined)} />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm font-medium text-foreground">{comment.author}</div>
          {comment.createdAt && <div className="text-xs text-muted-foreground">{comment.createdAt}</div>}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">{comment.body}</div>
        {comment.actions && <div className="mt-2">{comment.actions}</div>}
      </div>
    </div>
  )
}

export { CommentsPanel }
