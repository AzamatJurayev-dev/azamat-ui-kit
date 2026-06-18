import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@/index"

export function CopyCommand({
  command,
  copied,
  onCopy,
}: {
  command: string
  copied: boolean
  onCopy: () => void
}) {
  return (
    <button
      onClick={onCopy}
      className="flex min-w-0 items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-left shadow-sm transition hover:bg-zinc-50"
    >
      <span className="truncate font-mono text-xs text-zinc-600">{command}</span>
      <Button variant="outline" size="icon-sm" className="shrink-0 rounded-xl pointer-events-none">
        {copied ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
      </Button>
    </button>
  )
}
