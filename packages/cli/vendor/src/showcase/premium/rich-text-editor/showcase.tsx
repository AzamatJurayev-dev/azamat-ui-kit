import * as React from "react"

import { RichTextEditor } from "@/index"

export function RichTextEditorShowcase() {
  const [value, setValue] = React.useState("<p>Type <strong>formatted</strong> text here.</p>")

  return (
    <div className="space-y-3">
      <RichTextEditor value={value} onValueChange={setValue} placeholder="Write product notes..." />
      <p className="text-sm text-muted-foreground">Current HTML length: {value.length}</p>
    </div>
  )
}

