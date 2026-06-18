import { Badge, Button } from "@/index"

import type { FamilyDemoProps } from "../types"

export function UploadFamilyShowcase({ state, setState }: FamilyDemoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[22px] border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center">
        <p className="text-lg font-semibold">Drop files here</p>
        <p className="mt-2 text-sm text-zinc-500">Mock upload zone for file attachments and documents.</p>
        <Button className="mt-4" onClick={() => setState({ uploadCount: state.uploadCount + 1 })}>Add mock file</Button>
      </div>
      <div className="rounded-[22px] border border-zinc-200 bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-medium">Uploaded assets</p>
          <Badge variant="secondary">{state.uploadCount} files</Badge>
        </div>
        <div className="space-y-3 text-sm text-zinc-600">
          {Array.from({ length: state.uploadCount }).map((_, index) => (
            <div key={index} className="flex items-center justify-between rounded-2xl border border-zinc-100 px-4 py-3">
              <span>{`asset-${index + 1}.png`}</span>
              <span>2.4 MB</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

