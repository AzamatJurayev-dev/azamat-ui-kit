import * as React from "react"

import { useCopyFeedback } from "@/pages/site/components/site-primitives"

import { CodePreview } from "./code-preview"
import { previewDeviceWidths, type PreviewDevice } from "./device-switcher"
import { PreviewToolbar, type PreviewMode } from "./preview-toolbar"

export type BlockPreviewProps = {
  title: string
  description?: string
  src: string
  code?: string
  command?: string
  defaultDevice?: PreviewDevice
  height?: number | string
}

export function BlockPreview({
  title,
  description,
  src,
  code,
  command,
  defaultDevice = "desktop",
  height = 760,
}: BlockPreviewProps) {
  const [mode, setMode] = React.useState<PreviewMode>("preview")
  const [device, setDevice] = React.useState<PreviewDevice>(defaultDevice)
  const [reloadKey, setReloadKey] = React.useState(0)
  const { copiedKey, onCopy } = useCopyFeedback()

  return (
    <section className="space-y-5">
      <div className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">{title}</h2>
        {description ? <p className="max-w-3xl text-base leading-7 text-zinc-600">{description}</p> : null}
      </div>

      <PreviewToolbar
        mode={mode}
        onModeChange={setMode}
        device={device}
        onDeviceChange={setDevice}
        onRefresh={() => setReloadKey((value) => value + 1)}
        onOpenNew={() => window.open(src, "_blank", "noopener,noreferrer")}
        command={command}
        copied={copiedKey === "command"}
        onCopy={() => (command ? void onCopy("command", command) : undefined)}
      />

      {mode === "preview" ? (
        <div className="overflow-hidden rounded-[32px] border border-zinc-200 bg-white p-4 shadow-[0_32px_90px_-60px_rgba(15,23,42,0.55)]">
          <div
            className="rounded-[28px] border border-zinc-200/80 p-4"
            style={{
              backgroundImage: "radial-gradient(rgb(212 212 216) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            <div
              className="mx-auto overflow-hidden rounded-[26px] border border-zinc-200 bg-white shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)] transition-all duration-300"
              style={{
                width: previewDeviceWidths[device],
                maxWidth: "100%",
              }}
            >
              <iframe
                key={reloadKey}
                src={src}
                title={title}
                className="block w-full bg-white"
                style={{ height, border: 0 }}
              />
            </div>
          </div>
        </div>
      ) : (
        <CodePreview code={code} />
      )}
    </section>
  )
}
