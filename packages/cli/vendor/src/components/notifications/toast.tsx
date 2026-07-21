"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { AlertCircleIcon, CheckCircle2Icon, InfoIcon, Loader2Icon, TriangleAlertIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ToastTone = "default" | "success" | "info" | "warning" | "danger" | "loading"

export type ToastItem = {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  tone?: ToastTone
  action?: React.ReactNode
  duration?: number
  dismissible?: boolean
  group?: React.ReactNode
}

export type CreateToastInput = Omit<ToastItem, "id"> & {
  id?: string
}

export type ToastShortcutInput = React.ReactNode | CreateToastInput

export type ToastPromiseMessages<TData = unknown> = {
  loading: ToastShortcutInput
  success: ToastShortcutInput | ((data: TData) => ToastShortcutInput)
  error: ToastShortcutInput | ((error: unknown) => ToastShortcutInput)
}

export type ToastContextValue = {
  toasts: ToastItem[]
  addToast: (toast: CreateToastInput) => string
  updateToast: (id: string, toast: Partial<Omit<ToastItem, "id">>) => void
  dismissToast: (id: string) => void
  clearToasts: () => void
  success: (toast: ToastShortcutInput) => string
  info: (toast: ToastShortcutInput) => string
  warning: (toast: ToastShortcutInput) => string
  error: (toast: ToastShortcutInput) => string
  loading: (toast: ToastShortcutInput) => string
  promise: <TData>(promise: Promise<TData>, messages: ToastPromiseMessages<TData>) => Promise<TData>
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

const toneClassName: Record<ToastTone, string> = {
  default: "border-border bg-popover text-popover-foreground",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100",
  info: "border-blue-500/20 bg-blue-500/10 text-blue-950 dark:text-blue-100",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-950 dark:text-amber-100",
  danger: "border-destructive/20 bg-destructive/10 text-destructive",
  loading: "border-border bg-popover text-popover-foreground",
}

const toneIcon: Record<ToastTone, React.ReactNode> = {
  default: <InfoIcon className="size-4" />,
  success: <CheckCircle2Icon className="size-4" />,
  info: <InfoIcon className="size-4" />,
  warning: <TriangleAlertIcon className="size-4" />,
  danger: <AlertCircleIcon className="size-4" />,
  loading: <Loader2Icon className="size-4 animate-spin" />,
}

function createToastId() {
  return `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function isToastObject(toast: ToastShortcutInput): toast is CreateToastInput {
  return typeof toast === "object" && toast !== null && !React.isValidElement(toast) && !Array.isArray(toast)
}

function normalizeShortcutToast(toast: ToastShortcutInput, tone: ToastTone): CreateToastInput {
  if (isToastObject(toast)) {
    return { ...toast, tone: toast.tone ?? tone }
  }

  return { title: toast, tone }
}

function resolveToastMessage<TData>(message: ToastShortcutInput | ((data: TData) => ToastShortcutInput), data: TData) {
  return typeof message === "function" ? message(data) : message
}

export type ToastProviderProps = React.PropsWithChildren<{
  defaultDuration?: number
  maxToasts?: number
  pauseOnHover?: boolean
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center"
}>

const positionClassName: Record<NonNullable<ToastProviderProps["position"]>, string> = {
  "top-right": "right-4 top-4",
  "top-left": "left-4 top-4",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "top-center": "left-1/2 top-4 -translate-x-1/2",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
}

function ToastProvider({
  children,
  defaultDuration = 4000,
  maxToasts = 5,
  pauseOnHover = true,
  position = "top-right",
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([])
  const [portalTarget, setPortalTarget] = React.useState<HTMLElement | null>(null)

  React.useEffect(() => {
    setPortalTarget(document.body)
  }, [])

  const dismissToast = React.useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const addToast = React.useCallback(
    (toast: CreateToastInput) => {
      const id = toast.id ?? createToastId()
      const nextToast: ToastItem = {
        tone: "default",
        duration: defaultDuration,
        dismissible: true,
        ...toast,
        id,
      }

      setToasts((current) => [nextToast, ...current.filter((item) => item.id !== id)].slice(0, maxToasts))

      return id
    },
    [defaultDuration, maxToasts]
  )

  const updateToast = React.useCallback((id: string, toast: Partial<Omit<ToastItem, "id">>) => {
    setToasts((current) => current.map((item) => (item.id === id ? { ...item, ...toast } : item)))
  }, [])

  const clearToasts = React.useCallback(() => {
    setToasts([])
  }, [])

  const success = React.useCallback((toast: ToastShortcutInput) => addToast(normalizeShortcutToast(toast, "success")), [addToast])
  const info = React.useCallback((toast: ToastShortcutInput) => addToast(normalizeShortcutToast(toast, "info")), [addToast])
  const warning = React.useCallback((toast: ToastShortcutInput) => addToast(normalizeShortcutToast(toast, "warning")), [addToast])
  const error = React.useCallback((toast: ToastShortcutInput) => addToast(normalizeShortcutToast(toast, "danger")), [addToast])
  const loading = React.useCallback((toast: ToastShortcutInput) => addToast({ duration: 0, ...normalizeShortcutToast(toast, "loading") }), [addToast])

  const promise = React.useCallback(
    async <TData,>(targetPromise: Promise<TData>, messages: ToastPromiseMessages<TData>) => {
      const id = addToast({ duration: 0, dismissible: false, ...normalizeShortcutToast(messages.loading, "loading") })

      try {
        const data = await targetPromise
        updateToast(id, {
          duration: defaultDuration,
          dismissible: true,
          ...normalizeShortcutToast(resolveToastMessage(messages.success, data), "success"),
        })
        return data
      } catch (promiseError) {
        updateToast(id, {
          duration: defaultDuration,
          dismissible: true,
          ...normalizeShortcutToast(resolveToastMessage(messages.error, promiseError), "danger"),
        })
        throw promiseError
      }
    },
    [addToast, defaultDuration, updateToast]
  )

  const value = React.useMemo<ToastContextValue>(
    () => ({
      toasts,
      addToast,
      updateToast,
      dismissToast,
      clearToasts,
      success,
      info,
      warning,
      error,
      loading,
      promise,
    }),
    [addToast, clearToasts, dismissToast, error, info, loading, promise, success, toasts, updateToast, warning]
  )

  const viewport = (
      <div
        data-slot="toast-viewport"
        className={cn("fixed z-[100] flex w-[min(calc(100vw-2rem),24rem)] flex-col gap-2 pointer-events-none", positionClassName[position])}
      >
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} pauseOnHover={pauseOnHover} onDismiss={dismissToast} />
        ))}
      </div>
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      {portalTarget ? createPortal(viewport, portalTarget) : null}
    </ToastContext.Provider>
  )
}

function ToastCard({
  toast,
  pauseOnHover,
  onDismiss,
}: {
  toast: ToastItem
  pauseOnHover: boolean
  onDismiss: (id: string) => void
}) {
  const tone = toast.tone ?? "default"
  const [hovered, setHovered] = React.useState(false)

  React.useEffect(() => {
    if (toast.duration === Infinity || toast.duration === 0) return
    if (pauseOnHover && hovered) return

    const timer = window.setTimeout(() => onDismiss(toast.id), toast.duration ?? 4000)

    return () => window.clearTimeout(timer)
  }, [hovered, onDismiss, pauseOnHover, toast.duration, toast.id])

  return (
    <div
      data-slot="toast"
      data-tone={tone}
      className={cn("pointer-events-auto flex gap-3 rounded-lg border p-3 shadow-lg backdrop-blur", toneClassName[tone])}
      role="status"
      aria-live="polite"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mt-0.5 shrink-0">{toneIcon[tone]}</div>
      <div className="min-w-0 flex-1 space-y-1">
        {toast.group ? <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{toast.group}</div> : null}
        {toast.title && <div className="text-sm font-medium leading-none">{toast.title}</div>}
        {toast.description && <div className="text-sm text-muted-foreground">{toast.description}</div>}
        {toast.action && <div className="pt-1">{toast.action}</div>}
      </div>
      {toast.dismissible !== false && (
        <Button type="button" variant="ghost" size="icon-xs" onClick={() => onDismiss(toast.id)}>
          <XIcon />
          <span className="sr-only">Dismiss</span>
        </Button>
      )}
    </div>
  )
}

function useToast() {
  const context = React.useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used inside ToastProvider")
  }

  return context
}

export { ToastProvider, useToast }
