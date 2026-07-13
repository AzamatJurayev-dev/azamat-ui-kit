import * as React from "react"
import { RichTextEditor } from "@/index"

export function RichTextEditorShowcase() {
  const [value, setValue] = React.useState("<h2>Release notes</h2><p>Describe what changed for customers.</p>")
  return (
    <div className="grid gap-3">
      <RichTextEditor value={value} onValueChange={setValue} onLinkRequest={() => "https://tembro.dev"} />
      <p className="text-xs text-muted-foreground">{value.length} HTML characters</p>
    </div>
  )
}
