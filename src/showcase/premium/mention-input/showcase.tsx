import * as React from "react"

import { MentionInput } from "@/index"

const defaultOptions = [
  { label: "Alice", value: "alice" },
  { label: "Bob", value: "bob" },
  { label: "Charlie", value: "charlie" },
]

export function MentionInputShowcase() {
  const [value, setValue] = React.useState("Hi @alice, please review this task.")
  const [mentions, setMentions] = React.useState<string[]>([])

  return (
    <div className="space-y-3">
      <MentionInput
        value={value}
        options={defaultOptions}
        onValueChange={setValue}
        onMentionSelect={(selected) => setMentions((current) => [...new Set([...current, selected])])}
      />
      <p className="text-sm text-muted-foreground">Inserted mentions: {mentions.join(", ") || "None"}</p>
    </div>
  )
}

