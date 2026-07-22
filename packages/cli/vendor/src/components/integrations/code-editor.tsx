"use client"

import * as React from "react"
import Editor, {
  DiffEditor,
  type DiffEditorProps as MonacoDiffEditorProps,
  type EditorProps as MonacoEditorProps,
} from "@monaco-editor/react"
import { BracesIcon, LoaderCircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const defaultEditorOptions: MonacoEditorProps["options"] = {
  automaticLayout: true,
  fontSize: 13,
  minimap: { enabled: false },
  padding: { top: 12, bottom: 12 },
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  tabSize: 2,
}

export type CodeEditorProps = Omit<MonacoEditorProps, "loading"> & {
  onValueChange?: (value: string) => void
  loading?: React.ReactNode
  containerClassName?: string
  editorClassName?: string
  bordered?: boolean
}

function DefaultEditorLoading() {
  return (
    <div className="flex h-full min-h-40 items-center justify-center gap-2 text-sm text-muted-foreground" role="status">
      <LoaderCircleIcon className="size-4 animate-spin" aria-hidden="true" />
      Loading editor
    </div>
  )
}

function CodeEditor({
  onValueChange,
  loading = <DefaultEditorLoading />,
  containerClassName,
  editorClassName,
  bordered = true,
  height = "360px",
  defaultLanguage = "typescript",
  theme = "vs-dark",
  options,
  onChange,
  ...props
}: CodeEditorProps) {
  return (
    <div
      data-slot="code-editor"
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-[#1e1e1e]",
        bordered && "border",
        containerClassName
      )}
    >
      <Editor
        {...props}
        height={height}
        defaultLanguage={defaultLanguage}
        theme={theme}
        loading={loading}
        className={editorClassName}
        options={{ ...defaultEditorOptions, ...options }}
        onChange={(value, event) => {
          onChange?.(value, event)
          onValueChange?.(value ?? "")
        }}
      />
    </div>
  )
}

export type JsonEditorProps = Omit<CodeEditorProps, "defaultLanguage" | "language"> & {
  formatOnMount?: boolean
}

function JsonEditor({
  formatOnMount = false,
  beforeMount,
  onMount,
  options,
  ...props
}: JsonEditorProps) {
  return (
    <CodeEditor
      {...props}
      defaultLanguage="json"
      beforeMount={(monaco) => {
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          allowComments: false,
          trailingCommas: "error",
        })
        beforeMount?.(monaco)
      }}
      onMount={(editor, monaco) => {
        if (formatOnMount) {
          void editor.getAction("editor.action.formatDocument")?.run()
        }
        onMount?.(editor, monaco)
      }}
      options={{
        ...options,
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  )
}

export type CodeDiffEditorProps = Omit<MonacoDiffEditorProps, "loading"> & {
  loading?: React.ReactNode
  containerClassName?: string
  editorClassName?: string
  bordered?: boolean
}

function CodeDiffEditor({
  loading = <DefaultEditorLoading />,
  containerClassName,
  editorClassName,
  bordered = true,
  height = "420px",
  language = "typescript",
  theme = "vs-dark",
  options,
  ...props
}: CodeDiffEditorProps) {
  return (
    <div
      data-slot="code-diff-editor"
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-[#1e1e1e]",
        bordered && "border",
        containerClassName
      )}
    >
      <DiffEditor
        {...props}
        height={height}
        language={language}
        theme={theme}
        loading={loading}
        className={editorClassName}
        options={{
          ...defaultEditorOptions,
          renderSideBySide: true,
          ...options,
        }}
      />
    </div>
  )
}

export type CodePreviewProps = {
  value: string
  language?: string
  label?: string
  className?: string
}

function CodePreview({ value, language = "text", label = "Code preview", className }: CodePreviewProps) {
  return (
    <div data-slot="code-preview" className={cn("overflow-hidden rounded-lg border bg-muted/30", className)}>
      <div className="flex items-center gap-2 border-b px-3 py-2 text-xs font-medium text-muted-foreground">
        <BracesIcon className="size-4" aria-hidden="true" />
        {label}
      </div>
      <pre className="max-h-96 overflow-auto p-4 text-xs leading-relaxed">
        <code data-language={language}>{value}</code>
      </pre>
    </div>
  )
}

export { CodeDiffEditor, CodeEditor, CodePreview, JsonEditor }
