import { Textarea } from "@/index"

import type { ComponentDemoProps } from "../types"

import { textareaDemoFields } from "./data"

export function TextareaShowcase({ state, setState }: ComponentDemoProps) {
  return (
    <div className="space-y-4">
      <Textarea value={state.textareaValue} onChange={(event) => setState({ textareaValue: event.target.value })} className={textareaDemoFields[0].minHeight} placeholder={textareaDemoFields[0].placeholder} />
      <div className="grid gap-4 md:grid-cols-2">
        <Textarea defaultValue={textareaDemoFields[1].defaultValue} className={textareaDemoFields[1].minHeight} />
        <Textarea value={textareaDemoFields[2].defaultValue} disabled className={textareaDemoFields[2].minHeight} />
      </div>
    </div>
  )
}
