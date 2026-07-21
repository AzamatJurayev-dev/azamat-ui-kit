"use client"

import * as React from "react"
import {
  Tldraw,
  getSnapshot,
  type Editor,
  type TLEditorSnapshot,
} from "tldraw"

import "tldraw/tldraw.css"

import { cn } from "@/lib/utils"

export type WhiteboardProps = Omit<React.ComponentProps<typeof Tldraw>, "onMount"> & {
  onMount?: (editor: Editor) => void
  onSnapshotChange?: (snapshot: TLEditorSnapshot) => void
  snapshotChangeDelay?: number
  className?: string
}

function Whiteboard({
  onMount,
  onSnapshotChange,
  snapshotChangeDelay = 250,
  className,
  ...props
}: WhiteboardProps) {
  const cleanupRef = React.useRef<(() => void) | null>(null)
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const snapshotCallbackRef = React.useRef(onSnapshotChange)

  React.useEffect(() => {
    snapshotCallbackRef.current = onSnapshotChange
  }, [onSnapshotChange])

  React.useEffect(() => {
    return () => {
      cleanupRef.current?.()
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleMount = React.useCallback(
    (editor: Editor) => {
      cleanupRef.current?.()
      onMount?.(editor)

      if (!snapshotCallbackRef.current) return

      cleanupRef.current = editor.store.listen(
        () => {
          if (timerRef.current) clearTimeout(timerRef.current)
          timerRef.current = setTimeout(() => {
            snapshotCallbackRef.current?.(getSnapshot(editor.store))
          }, snapshotChangeDelay)
        },
        { scope: "document" }
      )
    },
    [onMount, snapshotChangeDelay]
  )

  return (
    <div
      data-slot="whiteboard"
      className={cn("relative h-[620px] min-h-96 w-full overflow-hidden rounded-lg border bg-background", className)}
    >
      <Tldraw {...props} onMount={handleMount} />
    </div>
  )
}

export { Whiteboard }
