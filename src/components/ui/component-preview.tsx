import * as React from "react"
import { CheckIcon, CopyIcon, EyeIcon, FileCode2Icon } from "lucide-react"
import { Highlight, themes } from "prism-react-renderer"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Button } from "./button"
import { Badge } from "./badge"

export interface ComponentPreviewProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "description"> {
  code: string
  language?: string
  title?: React.ReactNode
  description?: React.ReactNode
  dependencies?: string[]
  children: React.ReactNode
}

export function ComponentPreview({
  code,
  language = "tsx",
  title,
  description,
  dependencies,
  children,
  className,
  ...props
}: ComponentPreviewProps) {
  const [hasCopied, setHasCopied] = React.useState(false)

  const copyToClipboard = React.useCallback(() => {
    void navigator.clipboard.writeText(code)
    setHasCopied(true)
    window.setTimeout(() => setHasCopied(false), 2000)
  }, [code])

  return (
    <div
      data-slot="component-preview"
      className={cn("group relative my-4 overflow-hidden rounded-2xl border bg-card shadow-lg shadow-primary/5", className)}
      {...props}
    >
      {(title || description || (dependencies && dependencies.length > 0)) && (
        <div className="border-b bg-muted/30 px-4 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              {title ? <h3 className="text-sm font-semibold tracking-tight">{title}</h3> : null}
              {description ? <p className="text-xs leading-5 text-muted-foreground">{description}</p> : null}
            </div>
            {dependencies && dependencies.length > 0 ? (
              <div className="flex shrink-0 flex-wrap gap-1.5">
                {dependencies.map((dep) => (
                  <Badge key={dep} variant="outline" className="bg-background/80 text-[11px]">
                    {dep}
                  </Badge>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}

      <Tabs defaultValue="preview" className="relative w-full">
        <div className="flex items-center justify-between border-b bg-background/70 px-2">
          <TabsList className="justify-start rounded-none bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 font-medium text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none"
            >
              <EyeIcon className="mr-2 size-3.5" />
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 font-medium text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none"
            >
              <FileCode2Icon className="mr-2 size-3.5" />
              Code
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="preview" className="relative">
          <div className="min-h-[280px] bg-[radial-gradient(circle_at_top_left,_color-mix(in_oklch,var(--primary),transparent_94%),_transparent_28rem)] p-4 sm:p-8">
            <div className="mx-auto flex min-h-[220px] w-full items-center justify-center rounded-xl border bg-background/70 p-5 shadow-inner">
              {children}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="code" className="relative">
          <div className="absolute right-4 top-4 z-10">
            <Button
              size="icon-sm"
              variant="secondary"
              className="h-8 w-8 border text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={copyToClipboard}
            >
              {hasCopied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
              <span className="sr-only">Copy</span>
            </Button>
          </div>
          <div className="overflow-hidden bg-[#0d1117] text-sm">
            <Highlight theme={themes.github} code={code.trim()} language={language}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={cn("max-h-[650px] overflow-x-auto py-5 font-mono text-[13px] leading-relaxed", className)}
                  style={{ ...style, backgroundColor: "transparent" }}
                >
                  <code className="grid min-w-full">
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })} className="px-5">
                        <span className="mr-4 inline-block w-8 select-none text-right text-white/25">{i + 1}</span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    ))}
                  </code>
                </pre>
              )}
            </Highlight>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
