import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type TreeViewItem = {
  key: string
  label: React.ReactNode
  icon?: React.ReactNode
  extra?: React.ReactNode
  children?: TreeViewItem[]
  disabled?: boolean
}

export type TreeViewProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  items: TreeViewItem[]
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  onExpandedKeysChange?: (keys: string[]) => void
  selectedKey?: string
  onSelect?: (item: TreeViewItem) => void
}

function TreeView({ items, defaultExpandedKeys = [], expandedKeys, onExpandedKeysChange, selectedKey, onSelect, className, ...props }: TreeViewProps) {
  const [internalExpandedKeys, setInternalExpandedKeys] = React.useState(defaultExpandedKeys)
  const currentExpandedKeys = expandedKeys ?? internalExpandedKeys

  const setExpandedKeys = (nextKeys: string[]) => {
    if (expandedKeys === undefined) setInternalExpandedKeys(nextKeys)
    onExpandedKeysChange?.(nextKeys)
  }

  const toggle = (key: string) => {
    setExpandedKeys(currentExpandedKeys.includes(key) ? currentExpandedKeys.filter((item) => item !== key) : [...currentExpandedKeys, key])
  }

  return (
    <div data-slot="tree-view" role="tree" className={cn("grid gap-1 text-sm", className)} {...props}>
      {items.map((item) => (
        <TreeViewNode
          key={item.key}
          item={item}
          level={1}
          expandedKeys={currentExpandedKeys}
          selectedKey={selectedKey}
          onToggle={toggle}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

function TreeViewNode({
  item,
  level,
  expandedKeys,
  selectedKey,
  onToggle,
  onSelect,
}: {
  item: TreeViewItem
  level: number
  expandedKeys: string[]
  selectedKey?: string
  onToggle: (key: string) => void
  onSelect?: (item: TreeViewItem) => void
}) {
  const hasChildren = Boolean(item.children?.length)
  const expanded = expandedKeys.includes(item.key)
  const selected = selectedKey === item.key

  return (
    <div data-slot="tree-node" role="treeitem" aria-expanded={hasChildren ? expanded : undefined} aria-selected={selected || undefined}>
      <div
        className={cn(
          "flex items-center gap-1 rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          selected && "bg-muted text-foreground",
          item.disabled && "pointer-events-none opacity-50"
        )}
        style={{ paddingLeft: `${level * 0.75}rem` }}
      >
        <button
          type="button"
          aria-label={expanded ? "Collapse" : "Expand"}
          className={cn("flex size-5 items-center justify-center rounded-sm", !hasChildren && "invisible")}
          onClick={() => onToggle(item.key)}
        >
          <ChevronRightIcon className={cn("size-4 transition-transform", expanded && "rotate-90")} />
        </button>
        {item.icon}
        <button type="button" className="min-w-0 flex-1 truncate text-left" onClick={() => onSelect?.(item)}>
          {item.label}
        </button>
        {item.extra}
      </div>
      {hasChildren && expanded && (
        <div role="group" className="grid gap-1">
          {item.children?.map((child) => (
            <TreeViewNode
              key={child.key}
              item={child}
              level={level + 1}
              expandedKeys={expandedKeys}
              selectedKey={selectedKey}
              onToggle={onToggle}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { TreeView }
