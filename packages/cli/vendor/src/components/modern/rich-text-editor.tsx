"use client"

import * as React from "react"
import { EditorContent, useEditor, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import Placeholder from "@tiptap/extension-placeholder"
import {
  BoldIcon,
  CodeIcon,
  Heading2Icon,
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
  onLinkRequest?: (currentHref?: string) => string | null | undefined
  labels?: {
    editor?: string
    toolbar?: string
  }
}

type ToolbarAction = {
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

function EditorToolbar({ editor, onLinkRequest, label }: { editor: Editor; onLinkRequest?: RichTextEditorProps["onLinkRequest"]; label: string }) {
  const linkHref = editor.getAttributes("link").href as string | undefined
  const actions: ToolbarAction[] = [
    { label: "Undo", icon: Undo2Icon, disabled: !editor.can().undo(), run: () => editor.chain().focus().undo().run() },
    { label: "Redo", icon: Redo2Icon, disabled: !editor.can().redo(), run: () => editor.chain().focus().redo().run() },
    { label: "Bold", icon: BoldIcon, active: editor.isActive("bold"), run: () => editor.chain().focus().toggleBold().run() },
    { label: "Italic", icon: ItalicIcon, active: editor.isActive("italic"), run: () => editor.chain().focus().toggleItalic().run() },
    { label: "Strike", icon: StrikethroughIcon, active: editor.isActive("strike"), run: () => editor.chain().focus().toggleStrike().run() },
    { label: "Inline code", icon: CodeIcon, active: editor.isActive("code"), run: () => editor.chain().focus().toggleCode().run() },
    { label: "Heading", icon: Heading2Icon, active: editor.isActive("heading", { level: 2 }), run: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: "Bullet list", icon: ListIcon, active: editor.isActive("bulletList"), run: () => editor.chain().focus().toggleBulletList().run() },
    { label: "Ordered list", icon: ListOrderedIcon, active: editor.isActive("orderedList"), run: () => editor.chain().focus().toggleOrderedList().run() },
    { label: "Blockquote", icon: QuoteIcon, active: editor.isActive("blockquote"), run: () => editor.chain().focus().toggleBlockquote().run() },
  ]

  if (onLinkRequest) {
    actions.push({
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
    actions.push({ label: "Remove link", icon: UnlinkIcon, run: () => editor.chain().focus().unsetLink().run() })
  }

  return (
    <div role="toolbar" aria-label={label} className="flex flex-wrap gap-1 border-b p-1.5">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <button
            key={action.label}
            type="button"
            title={action.label}
            aria-label={action.label}
            aria-pressed={action.active || undefined}
            disabled={action.disabled}
            className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-accent aria-pressed:text-foreground disabled:pointer-events-none disabled:opacity-40"
            onClick={action.run}
          >
            <Icon className="size-4" />
          </button>
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
      className={cn("overflow-hidden rounded-md border bg-background shadow-sm focus-within:ring-2 focus-within:ring-ring data-[disabled]:opacity-60", className)}
      {...props}
    >
      {editor && editable ? <EditorToolbar editor={editor} onLinkRequest={onLinkRequest} label={labels?.toolbar ?? "Text formatting"} /> : null}
      <EditorContent
        editor={editor}
        aria-label={labels?.editor ?? "Rich text editor"}
        className="[&_.tiptap]:px-3 [&_.tiptap]:py-2.5 [&_.tiptap]:outline-none [&_.tiptap_a]:text-primary [&_.tiptap_a]:underline [&_.tiptap_blockquote]:border-l-2 [&_.tiptap_blockquote]:pl-3 [&_.tiptap_h2]:text-lg [&_.tiptap_h2]:font-semibold [&_.tiptap_ol]:list-decimal [&_.tiptap_ol]:pl-6 [&_.tiptap_p.is-editor-empty:first-child:before]:pointer-events-none [&_.tiptap_p.is-editor-empty:first-child:before]:float-left [&_.tiptap_p.is-editor-empty:first-child:before]:h-0 [&_.tiptap_p.is-editor-empty:first-child:before]:text-muted-foreground [&_.tiptap_p.is-editor-empty:first-child:before]:content-[attr(data-placeholder)] [&_.tiptap_ul]:list-disc [&_.tiptap_ul]:pl-6"
        style={{ minHeight }}
      />
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
