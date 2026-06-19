import * as React from "react"

import { CopyButton } from "@/components/actions/copy-button"
import { cn } from "@/lib/utils"

export type CodeBlockProps = React.ComponentProps<"div"> & {
  code: string
  language?: string
  title?: React.ReactNode
  showCopy?: boolean
  wrap?: boolean
}

function CodeBlock({ code, language, title, showCopy = true, wrap = false, className, ...props }: CodeBlockProps) {
  return (
    <div data-slot="code-block" className={cn("overflow-hidden rounded-lg border bg-card", className)} {...props}>
      {(title || language || showCopy) && (
        <div className="flex items-center justify-between gap-3 border-b px-3 py-2 text-xs text-muted-foreground">
          <div className="flex min-w-0 items-center gap-2">
            {title && <span className="truncate font-medium text-foreground">{title}</span>}
            {language && <span className="rounded bg-muted px-1.5 py-0.5 font-mono">{language}</span>}
          </div>
          {showCopy && <CopyButton value={code} size="sm" variant="ghost" copyLabel="Copy" copiedLabel="Copied" />}
        </div>
      )}
      <pre className={cn("overflow-x-auto p-3 text-sm", wrap && "whitespace-pre-wrap break-words")}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

export { CodeBlock }
