"use client"

import * as React from "react"
import {
  CheckCheckIcon,
  CheckIcon,
  FileIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  SearchIcon,
  SendIcon,
  SmileIcon,
  XIcon,
} from "lucide-react"

import { Avatar } from "@/components/display/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export type ChatMessageStatus = "sending" | "sent" | "delivered" | "read" | "failed"

export type ChatAttachmentData = {
  key: string
  name: string
  size?: React.ReactNode
  type?: React.ReactNode
  href?: string
  preview?: string
}

export type ChatParticipant = {
  name: string
  avatar?: string
  fallback?: React.ReactNode
  status?: "online" | "offline" | "busy" | "away"
}

export type ChatShellProps = React.ComponentProps<"section"> & {
  sidebar?: React.ReactNode
  details?: React.ReactNode
}

function ChatShell({ sidebar, details, children, className, ...props }: ChatShellProps) {
  return (
    <section data-slot="chat-shell" className={cn("grid min-h-[34rem] overflow-hidden rounded-lg border bg-background shadow-sm lg:grid-cols-[18rem_minmax(0,1fr)]", details && "xl:grid-cols-[18rem_minmax(0,1fr)_17rem]", className)} {...props}>
      {sidebar ? <aside data-slot="chat-sidebar" className="min-h-0 border-b lg:border-b-0 lg:border-r">{sidebar}</aside> : null}
      <div data-slot="chat-main" className="grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)_auto]">{children}</div>
      {details ? <aside data-slot="chat-details" className="hidden min-h-0 border-l xl:block">{details}</aside> : null}
    </section>
  )
}

export type ChatHeaderProps = React.ComponentProps<"header"> & {
  participant: ChatParticipant
  description?: React.ReactNode
  actions?: React.ReactNode
}

function ChatHeader({ participant, description, actions, className, ...props }: ChatHeaderProps) {
  return (
    <header data-slot="chat-header" className={cn("flex min-h-16 items-center gap-3 border-b px-4 py-2.5", className)} {...props}>
      <Avatar size="sm" name={participant.name} src={participant.avatar} fallback={participant.fallback} status={participant.status} />
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{participant.name}</div>
        <div className="truncate text-xs text-muted-foreground">{description ?? (participant.status === "online" ? "Online" : participant.status)}</div>
      </div>
      <div className="flex shrink-0 items-center gap-1">{actions}</div>
    </header>
  )
}

export type ConversationItem = {
  key: string
  participant: ChatParticipant
  preview?: React.ReactNode
  time?: React.ReactNode
  unread?: number
  muted?: boolean
  pinned?: boolean
}

export type ConversationListProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  items: ConversationItem[]
  selectedKey?: string
  defaultSelectedKey?: string
  onSelect?: (item: ConversationItem) => void
  searchable?: boolean
  searchPlaceholder?: string
  empty?: React.ReactNode
}

function ConversationList({ items, selectedKey, defaultSelectedKey, onSelect, searchable = true, searchPlaceholder = "Search conversations...", empty = "No conversations found.", className, ...props }: ConversationListProps) {
  const [internalKey, setInternalKey] = React.useState(defaultSelectedKey)
  const [query, setQuery] = React.useState("")
  const activeKey = selectedKey ?? internalKey
  const filtered = items.filter((item) => `${item.participant.name} ${String(item.preview ?? "")}`.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <div data-slot="conversation-list" className={cn("grid h-full min-h-0 grid-rows-[auto_minmax(0,1fr)]", className)} {...props}>
      {searchable ? <div className="border-b p-3"><Input type="search" value={query} onValueChange={setQuery} placeholder={searchPlaceholder} leading={<SearchIcon />} clearable aria-label={searchPlaceholder} /></div> : <span />}
      <div role="listbox" aria-label="Conversations" className="min-h-0 overflow-y-auto p-2">
        {filtered.length ? filtered.map((item) => {
          const selected = item.key === activeKey
          return (
            <button key={item.key} type="button" role="option" aria-selected={selected} data-selected={selected || undefined} className="flex w-full items-start gap-3 rounded-md px-2.5 py-2.5 text-left outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring data-[selected=true]:bg-accent" onClick={() => { if (selectedKey === undefined) setInternalKey(item.key); onSelect?.(item) }}>
              <Avatar size="sm" name={item.participant.name} src={item.participant.avatar} fallback={item.participant.fallback} status={item.participant.status} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2"><strong className="min-w-0 flex-1 truncate text-sm font-medium">{item.participant.name}</strong><span className="shrink-0 text-[11px] text-muted-foreground">{item.time}</span></span>
                <span className="mt-0.5 flex items-center gap-2"><span className="min-w-0 flex-1 truncate text-xs text-muted-foreground">{item.preview}</span>{item.unread ? <Badge size="sm" label={item.unread} /> : null}</span>
              </span>
            </button>
          )
        }) : <div className="grid min-h-32 place-items-center px-4 text-center text-sm text-muted-foreground">{empty}</div>}
      </div>
    </div>
  )
}

export type ChatMessageListProps = React.ComponentProps<"div"> & {
  autoScroll?: boolean
  empty?: React.ReactNode
}

function ChatMessageList({ autoScroll = true, empty = "No messages yet.", children, className, ...props }: ChatMessageListProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const element = ref.current
    if (!autoScroll || !element) return
    if (typeof element.scrollTo === "function") element.scrollTo({ top: element.scrollHeight, behavior: "smooth" })
    else element.scrollTop = element.scrollHeight
  }, [autoScroll, children])
  return <div ref={ref} data-slot="chat-message-list" role="log" aria-live="polite" className={cn("min-h-0 overflow-y-auto bg-muted/15 px-4 py-5", className)} {...props}>{React.Children.count(children) ? <div className="mx-auto grid w-full max-w-3xl gap-4">{children}</div> : <div className="grid h-full place-items-center text-sm text-muted-foreground">{empty}</div>}</div>
}

export type ChatAttachmentProps = React.ComponentProps<"div"> & Omit<ChatAttachmentData, "key"> & {
  attachmentKey?: string
  onRemove?: () => void
}

function ChatAttachment({ name, size, type, href, preview, onRemove, attachmentKey: _attachmentKey, className, ...props }: ChatAttachmentProps) {
  const content = <><span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-md bg-muted">{preview ? <img src={preview} alt="" className="size-full object-cover" /> : <FileIcon className="size-4" />}</span><span className="min-w-0 flex-1"><span className="block truncate text-xs font-medium text-foreground">{name}</span><span className="block truncate text-[11px] text-muted-foreground">{[type, size].filter(Boolean).join(" · ")}</span></span></>
  return <div data-slot="chat-attachment" className={cn("flex min-w-0 items-center gap-2 rounded-md border bg-background p-2", className)} {...props}>{href ? <a href={href} className="flex min-w-0 flex-1 items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-ring">{content}</a> : content}{onRemove ? <Button type="button" size="icon-xs" variant="ghost" iconOnly aria-label={`Remove ${name}`} onClick={onRemove}><XIcon /></Button> : null}</div>
}

export type ChatMessageProps = React.ComponentProps<"article"> & {
  participant?: ChatParticipant
  outgoing?: boolean
  time?: React.ReactNode
  status?: ChatMessageStatus
  replyTo?: React.ReactNode
  attachments?: ChatAttachmentData[]
  reactions?: Array<{ key: string; label: React.ReactNode; count?: number; active?: boolean }>
  onReaction?: (key: string) => void
  actions?: React.ReactNode
}

function ChatMessage({ participant, outgoing = false, time, status, replyTo, attachments, reactions, onReaction, actions, children, className, ...props }: ChatMessageProps) {
  const StatusIcon = status === "delivered" || status === "read" ? CheckCheckIcon : CheckIcon
  return (
    <article data-slot="chat-message" data-outgoing={outgoing || undefined} className={cn("group flex max-w-[88%] items-end gap-2 justify-self-start data-[outgoing=true]:justify-self-end data-[outgoing=true]:flex-row-reverse sm:max-w-[75%]", className)} {...props}>
      {participant ? <Avatar size="xs" name={participant.name} src={participant.avatar} fallback={participant.fallback} /> : null}
      <div className="min-w-0">
        {participant && !outgoing ? <div className="mb-1 px-1 text-[11px] font-medium text-muted-foreground">{participant.name}</div> : null}
        <div className={cn("rounded-lg rounded-bl-sm border bg-background px-3 py-2 text-sm leading-5 shadow-sm", outgoing && "rounded-bl-lg rounded-br-sm border-primary bg-primary text-primary-foreground")}>
          {replyTo ? <div className={cn("mb-2 border-l-2 pl-2 text-xs opacity-75", outgoing ? "border-primary-foreground/60" : "border-primary")}>{replyTo}</div> : null}
          <div className="whitespace-pre-wrap break-words">{children}</div>
          {attachments?.length ? <div className="mt-2 grid gap-1.5">{attachments.map(({ key, ...attachment }) => <ChatAttachment key={key} attachmentKey={key} {...attachment} className={outgoing ? "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground" : undefined} />)}</div> : null}
          <div className={cn("mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground", outgoing && "text-primary-foreground/75")}><span>{time}</span>{status && status !== "failed" && status !== "sending" ? <StatusIcon className={cn("size-3", status === "read" && "text-sky-300")} /> : null}{status === "sending" ? <span>Sending...</span> : null}{status === "failed" ? <span className="font-medium text-destructive">Failed</span> : null}</div>
        </div>
        {reactions?.length ? <div className={cn("mt-1 flex flex-wrap gap-1", outgoing && "justify-end")}>{reactions.map((reaction) => <button key={reaction.key} type="button" aria-pressed={reaction.active} className="rounded-full border bg-background px-2 py-0.5 text-[11px] shadow-sm outline-none hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring aria-pressed:border-primary aria-pressed:bg-primary/10" onClick={() => onReaction?.(reaction.key)}>{reaction.label}{reaction.count ? ` ${reaction.count}` : ""}</button>)}</div> : null}
      </div>
      {actions ? <div className="self-center opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">{actions}</div> : null}
    </article>
  )
}

function ChatTypingIndicator({ participant, className, ...props }: React.ComponentProps<"div"> & { participant?: ChatParticipant }) {
  return <div data-slot="chat-typing" className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)} {...props}>{participant ? <Avatar size="xs" name={participant.name} src={participant.avatar} fallback={participant.fallback} /> : null}<span className="flex items-center gap-1 rounded-full border bg-background px-3 py-2"><span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" /><span className="size-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" /><span className="size-1.5 animate-bounce rounded-full bg-current" /></span></div>
}

export type ChatComposerProps = Omit<React.ComponentProps<"form">, "onSubmit"> & {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  onSend: (value: string) => void | Promise<void>
  placeholder?: string
  disabled?: boolean
  sending?: boolean
  attachments?: ChatAttachmentData[]
  onRemoveAttachment?: (key: string) => void
  onAttachmentClick?: () => void
  onEmojiClick?: () => void
  maxLength?: number
  submitLabel?: string
}

function ChatComposer({ value, defaultValue = "", onValueChange, onSend, placeholder = "Write a message...", disabled = false, sending = false, attachments, onRemoveAttachment, onAttachmentClick, onEmojiClick, maxLength, submitLabel = "Send message", className, ...props }: ChatComposerProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value ?? internalValue
  const setValue = (next: string) => { if (value === undefined) setInternalValue(next); onValueChange?.(next) }
  const send = async () => {
    const next = currentValue.trim()
    if (!next || disabled || sending) return
    await onSend(next)
    setValue("")
  }
  return (
    <form data-slot="chat-composer" className={cn("border-t bg-background p-3", className)} onSubmit={(event) => { event.preventDefault(); void send() }} {...props}>
      {attachments?.length ? <div className="mb-2 grid gap-2 sm:grid-cols-2">{attachments.map(({ key, ...attachment }) => <ChatAttachment key={key} attachmentKey={key} {...attachment} onRemove={onRemoveAttachment ? () => onRemoveAttachment(key) : undefined} />)}</div> : null}
      <div className="flex items-end gap-2 rounded-lg border bg-background p-1.5 shadow-sm transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/20">
        {onAttachmentClick ? <Button type="button" size="icon-sm" variant="ghost" iconOnly aria-label="Attach file" onClick={onAttachmentClick}><PaperclipIcon /></Button> : null}
        <Textarea value={currentValue} onValueChange={setValue} rows={1} maxLength={maxLength} disabled={disabled} placeholder={placeholder} aria-label={placeholder} className="max-h-36 min-h-9 resize-none border-0 bg-transparent px-2 py-2 font-normal shadow-none focus-visible:shadow-none" onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void send() } }} />
        {onEmojiClick ? <Button type="button" size="icon-sm" variant="ghost" iconOnly aria-label="Choose emoji" onClick={onEmojiClick}><SmileIcon /></Button> : null}
        <Button type="submit" size="icon-sm" iconOnly aria-label={submitLabel} loading={sending} disabled={disabled || !currentValue.trim()}><SendIcon /></Button>
      </div>
    </form>
  )
}

function ChatHeaderActions() {
  return <><Button size="icon-sm" variant="ghost" iconOnly aria-label="Search conversation"><SearchIcon /></Button><Button size="icon-sm" variant="ghost" iconOnly aria-label="More conversation actions"><MoreHorizontalIcon /></Button></>
}

export {
  ChatAttachment,
  ChatComposer,
  ChatHeader,
  ChatHeaderActions,
  ChatMessage,
  ChatMessageList,
  ChatShell,
  ChatTypingIndicator,
  ConversationList,
}
