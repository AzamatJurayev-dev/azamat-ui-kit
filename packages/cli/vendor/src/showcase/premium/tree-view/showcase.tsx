import * as React from "react"

import { TreeView } from "@/index"
import { File, FolderOpen, Folder } from "lucide-react"

const catalogItems = [
  {
    key: "design",
    label: "Design",
    icon: <FolderOpen className="size-4" />,
    children: [
      { key: "components", label: "Components", icon: <Folder className="size-4" /> },
      { key: "tokens", label: "Tokens", icon: <File className="size-4" /> },
    ],
  },
  {
    key: "dev",
    label: "Development",
    icon: <Folder className="size-4" />,
    children: [
      { key: "docs", label: "Docs", icon: <File className="size-4" /> },
      {
        key: "release",
        label: "Release",
        icon: <Folder className="size-4" />,
        children: [{ key: "notes", label: "Notes", icon: <File className="size-4" /> }],
      },
    ],
  },
]

export function TreeViewShowcase() {
  const [selected, setSelected] = React.useState("components")
  const [expandedKeys, setExpandedKeys] = React.useState(["design", "dev"])
  const handleSelect = React.useCallback((item: { key: string }) => {
    setSelected(item.key)
  }, [])

  return (
    <div className="space-y-3">
      <TreeView
        items={catalogItems}
        selectedKey={selected}
        expandedKeys={expandedKeys}
        onExpandedKeysChange={setExpandedKeys}
        onSelect={handleSelect}
      />
      <div className="rounded-md border px-3 py-2 text-sm text-muted-foreground">Selected: {selected}</div>
    </div>
  )
}
