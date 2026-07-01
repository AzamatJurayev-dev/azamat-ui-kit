import * as React from "react"

import { cn } from "@/lib/utils"

export type MentionOption = {
  label: React.ReactNode
  value: string
}

export type MentionInputProps = React.ComponentProps<"textarea"> & {
  options?: MentionOption[]
  onMentionSelect?: (value: string) => void
}

function MentionInput({ options = [], onMentionSelect, className, ...props }: MentionInputProps) {
  return (
    <div data-slot="mention-input" className="grid gap-2">
      <textarea className={cn("min-h-24 rounded-md border bg-background p-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring", className)} {...props} />
      {options.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button key={option.value} type="button" className="rounded-full border bg-muted px-2.5 py-1 text-xs font-medium" onClick={() => onMentionSelect?.(option.value)}>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export { MentionInput }
