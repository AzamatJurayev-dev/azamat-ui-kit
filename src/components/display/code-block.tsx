"use client"

import * as React from "react"

import { CopyButton } from "@/components/actions/copy-button"
import { cn } from "@/lib/utils"

export type CodeBlockProps = React.ComponentProps<"div"> & {
  code: string
  language?: string
  title?: React.ReactNode
  showCopy?: boolean
  wrap?: boolean
  lineNumbers?: boolean
  highlightLines?: number[] | readonly number[]
  maxHeight?: number | string
}

function CodeBlock({
  code,
  language,
  title,
  showCopy = true,
  wrap = false,
  lineNumbers = false,
  highlightLines = [],
  maxHeight,
  className,
  ...props
}: CodeBlockProps) {
  const lines = React.useMemo(() => code.split("\n"), [code])
  const highlightedLineSet = React.useMemo(() => new Set(highlightLines), [highlightLines])

  return (
    <div
      data-slot="code-block"
      className={cn("overflow-hidden rounded-[var(--aui-card-radius,var(--radius-xl))] border border-[color:var(--aui-card-border,var(--border))] bg-card", className)}
      {...props}
    >
      {(title || language || showCopy) && (
        <div className="flex items-center justify-between gap-3 border-b border-[color:var(--aui-card-border,var(--border))] bg-[color:color-mix(in_oklch,var(--muted),transparent_72%)] px-3 py-2 text-xs text-muted-foreground">
          <div className="flex min-w-0 items-center gap-2">
            {title && <span className="truncate font-medium text-foreground">{title}</span>}
            {language && <span className="rounded bg-muted px-1.5 py-0.5 font-mono">{language}</span>}
          </div>
          {showCopy && <CopyButton value={code} size="sm" variant="ghost" copyLabel="Copy" copiedLabel="Copied" />}
        </div>
      )}
      <pre
        className={cn("overflow-x-auto p-3 text-sm leading-6", wrap && "whitespace-pre-wrap break-words")}
        style={maxHeight ? { maxHeight, overflowY: "auto" } : undefined}
      >
        {lineNumbers ? (
          <code className="grid">
            {lines.map((line, index) => (
              <span
                key={`${index}-${line}`}
                data-highlighted={highlightedLineSet.has(index + 1) || undefined}
                className={cn(
                  "grid grid-cols-[auto_1fr] gap-4 rounded px-1",
                  highlightedLineSet.has(index + 1) && "bg-primary/10 text-foreground"
                )}
              >
                <span className="select-none text-right text-xs text-muted-foreground/75">{index + 1}</span>
                <span>{line || " "}</span>
              </span>
            ))}
          </code>
        ) : (
          <code>
            {lines.map((line, index) => (
              <span
                key={`${index}-${line}`}
                data-highlighted={highlightedLineSet.has(index + 1) || undefined}
                className={cn("block rounded px-1", highlightedLineSet.has(index + 1) && "bg-primary/10 text-foreground")}
              >
                {line || " "}
              </span>
            ))}
          </code>
        )}
      </pre>
    </div>
  )
}

export { CodeBlock }
