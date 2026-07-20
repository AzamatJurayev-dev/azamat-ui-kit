"use client"

import * as React from "react"
import { EditorContent, useEditor, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import {
  BoldIcon,
  Code2Icon,
  EraserIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  MinusIcon,
  PilcrowIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  QuoteIcon,
  Redo2Icon,
  StrikethroughIcon,
  Undo2Icon,
  UnlinkIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"

export type RichTextEditorProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  output?: "text" | "html"
  placeholder?: string
  editable?: boolean
  autoFocus?: boolean
  minHeight?: number
  maxHeight?: number
  maxLength?: number
  toolbar?: boolean
  stickyToolbar?: boolean
  toolbarSize?: "compact" | "default"
  features?: RichTextFeature[]
  showCharacterCount?: boolean
  showWordCount?: boolean
  onLinkRequest?: (currentHref?: string) => string | null | undefined
  labels?: {
    editor?: string
    toolbar?: string
  }
}

export type RichTextFeature =
  | "history"
  | "bold"
  | "italic"
  | "strike"
  | "code"
  | "heading1"
  | "heading2"
  | "heading3"
  | "paragraph"
  | "bulletList"
  | "orderedList"
  | "blockquote"
  | "codeBlock"
  | "horizontalRule"
  | "link"
  | "clearFormatting"

const defaultFeatures: RichTextFeature[] = [
  "history", "bold", "italic", "strike", "code", "heading1", "heading2", "heading3", "paragraph",
  "bulletList", "orderedList", "blockquote", "codeBlock", "horizontalRule", "link", "clearFormatting",
]

type ToolbarAction = {
  feature: RichTextFeature
  group: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  active?: boolean
  disabled?: boolean
  run: () => void
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
}

function contentForEditor(value: string, output: "text" | "html") {
  return output === "html" ? value : `<p>${escapeHtml(value)}</p>`
}

function EditorToolbar({ editor, onLinkRequest, label, features = defaultFeatures, sticky = false, size = "default" }: { editor: Editor; onLinkRequest?: RichTextEditorProps["onLinkRequest"]; label: string; features?: RichTextFeature[]; sticky?: boolean; size?: "compact" | "default" }) {
  const [, refresh] = React.useReducer((value) => value + 1, 0)
  React.useEffect(() => {
    const update = () => refresh()
    editor.on("transaction", update)
    editor.on("selectionUpdate", update)
    return () => {
      editor.off("transaction", update)
      editor.off("selectionUpdate", update)
    }
  }, [editor])

  const linkHref = editor.getAttributes("link").href as string | undefined
  const actions: ToolbarAction[] = [
    { feature: "history", group: "history", label: "Undo", icon: Undo2Icon, disabled: !editor.can().undo(), run: () => editor.chain().focus().undo().run() },
    { feature: "history", group: "history", label: "Redo", icon: Redo2Icon, disabled: !editor.can().redo(), run: () => editor.chain().focus().redo().run() },
    { feature: "bold", group: "marks", label: "Bold", icon: BoldIcon, active: editor.isActive("bold"), run: () => editor.chain().focus().toggleBold().run() },
    { feature: "italic", group: "marks", label: "Italic", icon: ItalicIcon, active: editor.isActive("italic"), run: () => editor.chain().focus().toggleItalic().run() },
    { feature: "strike", group: "marks", label: "Strike", icon: StrikethroughIcon, active: editor.isActive("strike"), run: () => editor.chain().focus().toggleStrike().run() },
    { feature: "code", group: "marks", label: "Inline code", icon: Code2Icon, active: editor.isActive("code"), run: () => editor.chain().focus().toggleCode().run() },
    { feature: "paragraph", group: "blocks", label: "Paragraph", icon: PilcrowIcon, active: editor.isActive("paragraph"), run: () => editor.chain().focus().setParagraph().run() },
    { feature: "heading1", group: "blocks", label: "Heading 1", icon: Heading1Icon, active: editor.isActive("heading", { level: 1 }), run: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
    { feature: "heading2", group: "blocks", label: "Heading 2", icon: Heading2Icon, active: editor.isActive("heading", { level: 2 }), run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { feature: "heading3", group: "blocks", label: "Heading 3", icon: Heading3Icon, active: editor.isActive("heading", { level: 3 }), run: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
    { feature: "bulletList", group: "lists", label: "Bullet list", icon: ListIcon, active: editor.isActive("bulletList"), run: () => editor.chain().focus().toggleBulletList().run() },
    { feature: "orderedList", group: "lists", label: "Ordered list", icon: ListOrderedIcon, active: editor.isActive("orderedList"), run: () => editor.chain().focus().toggleOrderedList().run() },
    { feature: "blockquote", group: "lists", label: "Blockquote", icon: QuoteIcon, active: editor.isActive("blockquote"), run: () => editor.chain().focus().toggleBlockquote().run() },
    { feature: "codeBlock", group: "insert", label: "Code block", icon: Code2Icon, active: editor.isActive("codeBlock"), run: () => editor.chain().focus().toggleCodeBlock().run() },
    { feature: "horizontalRule", group: "insert", label: "Horizontal rule", icon: MinusIcon, run: () => editor.chain().focus().setHorizontalRule().run() },
    { feature: "clearFormatting", group: "clear", label: "Clear formatting", icon: EraserIcon, run: () => editor.chain().focus().unsetAllMarks().clearNodes().run() },
  ]

  if (onLinkRequest && features.includes("link")) {
    actions.push({
      feature: "link",
      group: "link",
      label: "Set link",
      icon: LinkIcon,
      active: editor.isActive("link"),
      run: () => {
        const href = onLinkRequest(linkHref)
        if (href === null || href === undefined) return
        if (!href.trim()) editor.chain().focus().unsetLink().run()
        else editor.chain().focus().extendMarkRange("link").setLink({ href: href.trim() }).run()
      },
    })
  }

  if (editor.isActive("link")) {
    actions.push({ feature: "link", group: "link", label: "Remove link", icon: UnlinkIcon, run: () => editor.chain().focus().unsetLink().run() })
  }

  const visibleActions = actions.filter((action) => features.includes(action.feature))

  return (
    <div role="toolbar" aria-label={label} data-size={size} data-sticky={sticky || undefined} className={cn("flex flex-wrap items-center gap-1 border-b bg-background/95 p-1.5", sticky && "sticky top-0 z-10 backdrop-blur", size === "compact" && "flex-nowrap overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden")}>
      {visibleActions.map((action, index) => {
        const Icon = action.icon
        const showSeparator = index > 0 && visibleActions[index - 1]?.group !== action.group
        return (
          <React.Fragment key={action.label}>
            {showSeparator ? <span role="separator" aria-orientation="vertical" className="mx-0.5 h-5 w-px shrink-0 bg-border" /> : null}
            <button
              type="button"
              title={action.label}
              aria-label={action.label}
              aria-pressed={action.active || undefined}
              disabled={action.disabled}
              className={cn("grid size-8 shrink-0 place-items-center rounded-md p-0 text-muted-foreground outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-accent aria-pressed:text-foreground disabled:pointer-events-none disabled:opacity-40", size === "compact" && "size-7")}
              onClick={action.run}
            >
              <Icon className="size-4" />
            </button>
          </React.Fragment>
        )
      })}
    </div>
  )
}

function MountedRichTextEditor({
  value,
  defaultValue = "",
  onValueChange,
  output = "html",
  placeholder = "Start typing...",
  editable = true,
  autoFocus = false,
  minHeight = 144,
  maxHeight,
  maxLength,
  toolbar = true,
  stickyToolbar = false,
  toolbarSize = "default",
  features = defaultFeatures,
  showCharacterCount = false,
  showWordCount = false,
  onLinkRequest,
  labels,
  className,
  ...props
}: RichTextEditorProps) {
  const initialContent = value ?? defaultValue
  const editor = useEditor({
    immediatelyRender: true,
    autofocus: autoFocus,
    editable,
    editorProps: {
      attributes: {
        "aria-label": labels?.editor ?? "Rich text editor",
        role: "textbox",
      },
    },
    content: contentForEditor(initialContent, output),
    extensions: [
      StarterKit.configure({ link: false }),
      Link.configure({ openOnClick: false, autolink: true, defaultProtocol: "https" }),
      Placeholder.configure({ placeholder }),
    ],
    onUpdate: ({ editor: nextEditor }) => {
      onValueChange?.(output === "html" ? nextEditor.getHTML() : nextEditor.getText())
    },
  })
  const [, refreshCount] = React.useReducer((value) => value + 1, 0)

  React.useEffect(() => {
    if (!editor) return
    const update = () => refreshCount()
    editor.on("update", update)
    return () => { editor.off("update", update) }
  }, [editor])

  React.useEffect(() => {
    if (!editor || value === undefined) return
    const currentValue = output === "html" ? editor.getHTML() : editor.getText()
    if (currentValue !== value) editor.commands.setContent(contentForEditor(value, output), { emitUpdate: false })
  }, [editor, output, value])

  React.useEffect(() => {
    editor?.setEditable(editable)
  }, [editable, editor])

  return (
    <div
      data-slot="rich-text-editor"
      data-disabled={!editable || undefined}
      data-over-limit={editor && maxLength !== undefined && editor.getText().length > maxLength || undefined}
      className={cn("overflow-hidden rounded-md border bg-background shadow-sm transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/25 data-[disabled]:opacity-60 data-[over-limit=true]:border-destructive", className)}
      {...props}
    >
      {editor && editable && toolbar ? <EditorToolbar editor={editor} onLinkRequest={onLinkRequest} label={labels?.toolbar ?? "Text formatting"} features={features} sticky={stickyToolbar} size={toolbarSize} /> : null}
      <EditorContent
        editor={editor}
        aria-label={labels?.editor ?? "Rich text editor"}
        className="overflow-y-auto [&_.tiptap]:min-h-[var(--editor-min-height)] [&_.tiptap]:px-3.5 [&_.tiptap]:py-3 [&_.tiptap]:text-sm [&_.tiptap]:leading-6 [&_.tiptap]:outline-none [&_.tiptap>*+*]:mt-2 [&_.tiptap_a]:text-primary [&_.tiptap_a]:underline [&_.tiptap_blockquote]:border-l-2 [&_.tiptap_blockquote]:border-primary/50 [&_.tiptap_blockquote]:pl-3 [&_.tiptap_code]:rounded [&_.tiptap_code]:bg-muted [&_.tiptap_code]:px-1 [&_.tiptap_code]:py-0.5 [&_.tiptap_h1]:text-2xl [&_.tiptap_h1]:font-semibold [&_.tiptap_h2]:text-xl [&_.tiptap_h2]:font-semibold [&_.tiptap_h3]:text-lg [&_.tiptap_h3]:font-semibold [&_.tiptap_hr]:my-4 [&_.tiptap_hr]:border-border [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_p.is-editor-empty:first-child:before]:pointer-events-none [&_.tiptap_p.is-editor-empty:first-child:before]:float-left [&_.tiptap_p.is-editor-empty:first-child:before]:h-0 [&_.tiptap_p.is-editor-empty:first-child:before]:text-muted-foreground [&_.tiptap_p.is-editor-empty:first-child:before]:content-[attr(data-placeholder)] [&_.tiptap_pre]:overflow-x-auto [&_.tiptap_pre]:rounded-md [&_.tiptap_pre]:bg-muted [&_.tiptap_pre]:p-3 [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6"
        style={{ "--editor-min-height": `${minHeight}px`, maxHeight } as React.CSSProperties}
      />
      {editor && (showCharacterCount || showWordCount || maxLength !== undefined) ? <div data-slot="rich-text-editor-footer" className="flex items-center justify-end gap-3 border-t bg-muted/20 px-3 py-1.5 text-[11px] text-muted-foreground">
        {showWordCount ? <span>{editor.getText().trim() ? editor.getText().trim().split(/\s+/).length : 0} words</span> : null}
        {showCharacterCount || maxLength !== undefined ? <span className={cn(maxLength !== undefined && editor.getText().length > maxLength && "font-medium text-destructive")}>{editor.getText().length}{maxLength !== undefined ? `/${maxLength}` : " characters"}</span> : null}
      </div> : null}
    </div>
  )
}

function RichTextEditor(props: RichTextEditorProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        data-slot="rich-text-editor"
        data-state="loading"
        className={cn("overflow-hidden rounded-md border bg-background shadow-sm", props.className)}
        style={{ minHeight: props.minHeight ?? 144 }}
        aria-busy="true"
      />
    )
  }

  return <MountedRichTextEditor {...props} />
}

export { EditorToolbar, RichTextEditor }
