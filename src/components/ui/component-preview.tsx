import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Highlight, themes } from "prism-react-renderer"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Button } from "./button"

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
    navigator.clipboard.writeText(code)
    setHasCopied(true)
    setTimeout(() => setHasCopied(false), 2000)
  }, [code])

  return (
    <div
      className={cn("group relative my-4 flex flex-col space-y-2", className)}
      {...props}
    >
      {(title || description || (dependencies && dependencies.length > 0)) && (
        <div className="rounded-t-lg border border-b-0 border-border bg-muted/40 px-4 py-3">
          {title ? <h3 className="text-sm font-semibold">{title}</h3> : null}
          {description ? <p className="mt-1 text-xs text-muted-foreground">{description}</p> : null}
          {dependencies && dependencies.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {dependencies.map((dep) => (
                <span key={dep} className="rounded-full border border-border bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                  {dep}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      )}
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <div className="flex items-center justify-between pb-3">
          <TabsList className="w-full justify-start rounded-none border border-b-0 bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[selected]:border-b-primary data-[selected]:text-foreground data-[selected]:shadow-none"
            >
              Code
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview" className="relative rounded-b-md rounded-tr-md border border-t-0">
          <div className="flex min-h-[260px] w-full items-center justify-center p-8">
            {children}
          </div>
        </TabsContent>
        <TabsContent value="code" className="relative">
          <div className="absolute right-4 top-4 z-10">
            <Button
              size="icon-sm"
              variant="secondary"
              className="h-8 w-8 border border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              onClick={copyToClipboard}
            >
              {hasCopied ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
              <span className="sr-only">Copy</span>
            </Button>
          </div>
          <div className="overflow-hidden rounded-md border bg-[#0d1117] text-sm">
            <Highlight theme={themes.github} code={code.trim()} language={language}>
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={cn("max-h-[650px] overflow-x-auto py-4 font-mono text-[13px] leading-relaxed", className)}
                  style={{ ...style, backgroundColor: "transparent" }}
                >
                  <code className="grid min-w-full">
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })} className="px-4">
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
