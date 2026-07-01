import { Badge, Button } from "@/index"

import type { FamilyDemoProps } from "../types"

export function UploadFamilyShowcase({ state, setState }: FamilyDemoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[22px] border border-dashed border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] p-6 text-center">
        <p className="text-lg font-semibold">Drop files here</p>
        <p className="aui-text-muted mt-2 text-sm">Upload area for file attachments and documents.</p>
        <Button className="mt-4" onClick={() => setState({ uploadCount: state.uploadCount + 1 })}>Add file</Button>
      </div>
      <div className="rounded-[22px] border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface)] p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-medium">Uploaded assets</p>
          <Badge variant="secondary">{state.uploadCount} files</Badge>
        </div>
        <div className="aui-text-muted space-y-3 text-sm">
          {Array.from({ length: state.uploadCount }).map((_, index) => (
            <div key={index} className="flex items-center justify-between rounded-2xl border border-[color:var(--aui-surface-border)] bg-[color:var(--aui-surface-muted)] px-4 py-3">
              <span>{`asset-${index + 1}.png`}</span>
              <span>2.4 MB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


