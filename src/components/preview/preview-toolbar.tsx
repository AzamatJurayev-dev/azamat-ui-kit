import { Code2Icon, ExternalLinkIcon, Maximize2Icon, RefreshCcwIcon } from "lucide-react"

import { Button } from "@/index"
import { cn } from "@/lib/utils"

import { CopyCommand } from "./copy-command"
import { DeviceSwitcher, type PreviewDevice } from "./device-switcher"

export type PreviewMode = "preview" | "code"

export function PreviewToolbar({
  mode,
  onModeChange,
  device,
  onDeviceChange,
  onRefresh,
  onOpenNew,
  command,
  copied,
  onCopy,
}: {
  mode: PreviewMode
  onModeChange: (value: PreviewMode) => void
  device: PreviewDevice
  onDeviceChange: (value: PreviewDevice) => void
  onRefresh: () => void
  onOpenNew: () => void
  command?: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <div className="space-y-4 rounded-[28px] border border-zinc-200 bg-[linear-gradient(180deg,#ffffff,#fafaf9)] p-4 shadow-[0_20px_60px_-48px_rgba(15,23,42,0.45)]">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex rounded-2xl border border-zinc-200 bg-white p-1 shadow-sm">
            {(["preview", "code"] as PreviewMode[]).map((item) => (
              <button
                key={item}
                onClick={() => onModeChange(item)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium capitalize transition",
                  mode === item ? "bg-zinc-950 text-white" : "text-zinc-600"
                )}
              >
                {item === "preview" ? <Maximize2Icon className="size-4" /> : <Code2Icon className="size-4" />}
                {item}
              </button>
            ))}
          </div>
          <DeviceSwitcher value={device} onChange={onDeviceChange} />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="rounded-2xl" onClick={onRefresh}>
            <RefreshCcwIcon className="mr-2 size-4" />
            Refresh
          </Button>
          <Button variant="outline" className="rounded-2xl" onClick={onOpenNew}>
            <ExternalLinkIcon className="mr-2 size-4" />
            Open
          </Button>
        </div>
      </div>

      {command ? <CopyCommand command={command} copied={copied} onCopy={onCopy} /> : null}
    </div>
  )
}
