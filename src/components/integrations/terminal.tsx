"use client"

import * as React from "react"
import { Terminal as XTerm, type ITerminalOptions, type ITheme } from "@xterm/xterm"
import { FitAddon } from "@xterm/addon-fit"

import "@xterm/xterm/css/xterm.css"

import { cn } from "@/lib/utils"

export type TerminalHandle = {
  terminal: XTerm
  fit: () => void
  focus: () => void
  clear: () => void
  write: (data: string | Uint8Array) => void
  writeln: (data: string) => void
}

export type TerminalProps = Omit<React.ComponentProps<"div">, "onResize"> & {
  options?: ITerminalOptions
  theme?: ITheme
  initialData?: string
  autoFit?: boolean
  onData?: (data: string) => void
  onBinary?: (data: string) => void
  onResize?: (size: { cols: number; rows: number }) => void
  onReady?: (handle: TerminalHandle) => void
  viewportClassName?: string
}

function Terminal({
  options,
  theme,
  initialData,
  autoFit = true,
  onData,
  onBinary,
  onResize,
  onReady,
  className,
  viewportClassName,
  ...props
}: TerminalProps) {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  const callbacksRef = React.useRef({ onData, onBinary, onResize, onReady })

  React.useEffect(() => {
    callbacksRef.current = { onData, onBinary, onResize, onReady }
  }, [onBinary, onData, onReady, onResize])

  React.useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const terminal = new XTerm({
      convertEol: true,
      cursorBlink: true,
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
      fontSize: 13,
      theme,
      ...options,
    })
    const fitAddon = new FitAddon()
    terminal.loadAddon(fitAddon)
    terminal.open(viewport)

    const fit = () => {
      try {
        fitAddon.fit()
      } catch {
        // The terminal can briefly be detached while a parent layout is changing.
      }
    }

    const handle: TerminalHandle = {
      terminal,
      fit,
      focus: () => terminal.focus(),
      clear: () => terminal.clear(),
      write: (data) => terminal.write(data),
      writeln: (data) => terminal.writeln(data),
    }

    const dataDisposable = terminal.onData((data) => callbacksRef.current.onData?.(data))
    const binaryDisposable = terminal.onBinary((data) => callbacksRef.current.onBinary?.(data))
    const resizeDisposable = terminal.onResize((size) => callbacksRef.current.onResize?.(size))

    if (initialData) terminal.write(initialData)
    if (autoFit) queueMicrotask(fit)
    callbacksRef.current.onReady?.(handle)

    const resizeObserver = autoFit
      ? new ResizeObserver(() => requestAnimationFrame(fit))
      : null
    resizeObserver?.observe(viewport)

    return () => {
      resizeObserver?.disconnect()
      dataDisposable.dispose()
      binaryDisposable.dispose()
      resizeDisposable.dispose()
      terminal.dispose()
    }
  }, [autoFit, initialData, options, theme])

  return (
    <div
      data-slot="terminal"
      className={cn("min-h-64 overflow-hidden rounded-lg border bg-[#0c0c0c] p-2", className)}
      {...props}
    >
      <div
        ref={viewportRef}
        data-slot="terminal-viewport"
        className={cn("h-full min-h-60 w-full", viewportClassName)}
      />
    </div>
  )
}

export type WebSocketTerminalProps = Omit<TerminalProps, "onData" | "onBinary" | "onReady"> & {
  url: string | URL
  protocols?: string | string[]
  reconnect?: boolean
  reconnectDelay?: number
  onConnectionChange?: (state: "connecting" | "open" | "closed" | "error") => void
  onSocket?: (socket: WebSocket) => void
}

function WebSocketTerminal({
  url,
  protocols,
  reconnect = false,
  reconnectDelay = 1500,
  onConnectionChange,
  onSocket,
  ...props
}: WebSocketTerminalProps) {
  const terminalRef = React.useRef<TerminalHandle | null>(null)
  const socketRef = React.useRef<WebSocket | null>(null)
  const reconnectTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    let disposed = false

    const connect = () => {
      if (disposed) return
      onConnectionChange?.("connecting")

      const socket = new WebSocket(url, protocols)
      socket.binaryType = "arraybuffer"
      socketRef.current = socket
      onSocket?.(socket)

      socket.addEventListener("open", () => onConnectionChange?.("open"))
      socket.addEventListener("message", (event) => {
        const payload = event.data
        if (typeof payload === "string") terminalRef.current?.write(payload)
        else if (payload instanceof ArrayBuffer) terminalRef.current?.write(new Uint8Array(payload))
        else if (payload instanceof Blob) {
          void payload.arrayBuffer().then((buffer) => terminalRef.current?.write(new Uint8Array(buffer)))
        }
      })
      socket.addEventListener("error", () => onConnectionChange?.("error"))
      socket.addEventListener("close", () => {
        onConnectionChange?.("closed")
        if (reconnect && !disposed) {
          reconnectTimerRef.current = setTimeout(connect, reconnectDelay)
        }
      })
    }

    connect()

    return () => {
      disposed = true
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current)
      socketRef.current?.close()
      socketRef.current = null
    }
  }, [onConnectionChange, onSocket, protocols, reconnect, reconnectDelay, url])

  const send = React.useCallback((data: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) socketRef.current.send(data)
  }, [])

  return (
    <Terminal
      {...props}
      onData={send}
      onBinary={send}
      onReady={(handle) => {
        terminalRef.current = handle
      }}
    />
  )
}

export { Terminal, WebSocketTerminal }
