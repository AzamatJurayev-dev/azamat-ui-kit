import * as React from "react"
import { ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type TreeViewItem = {
  key: string
  label: React.ReactNode
  searchText?: string
  icon?: React.ReactNode
  extra?: React.ReactNode
  children?: TreeViewItem[]
  loading?: boolean
  disabled?: boolean
}

export type TreeViewProps = Omit<React.ComponentProps<"div">, "onSelect"> & {
  items: TreeViewItem[]
  defaultExpandedKeys?: string[]
  expandedKeys?: string[]
  onExpandedKeysChange?: (keys: string[]) => void
  selectedKey?: string
  onSelect?: (item: TreeViewItem) => void
  checkedKeys?: string[]
  defaultCheckedKeys?: string[]
  onCheckedKeysChange?: (keys: string[]) => void
  checkable?: boolean
  searchQuery?: string
  onLoadChildren?: (item: TreeViewItem) => void | Promise<void>
}

function TreeView({
  items,
  defaultExpandedKeys = [],
  expandedKeys,
  onExpandedKeysChange,
  selectedKey,
  onSelect,
  checkedKeys,
  defaultCheckedKeys = [],
  onCheckedKeysChange,
  checkable = false,
  searchQuery,
  onLoadChildren,
  className,
  ...props
}: TreeViewProps) {
  const [internalExpandedKeys, setInternalExpandedKeys] = React.useState(defaultExpandedKeys)
  const [internalCheckedKeys, setInternalCheckedKeys] = React.useState(defaultCheckedKeys)
  const currentExpandedKeys = expandedKeys ?? internalExpandedKeys
  const currentCheckedKeys = checkedKeys ?? internalCheckedKeys
  const query = searchQuery?.trim().toLowerCase()

  const setExpandedKeys = React.useCallback((nextKeys: string[]) => {
    if (expandedKeys === undefined) setInternalExpandedKeys(nextKeys)
    onExpandedKeysChange?.(nextKeys)
  }, [expandedKeys, onExpandedKeysChange])

  const setCheckedKeyState = (key: string, checked: boolean) => {
    const nextKeys = checked
      ? [...new Set([...currentCheckedKeys, key])]
      : currentCheckedKeys.filter((item) => item !== key)
    if (checkedKeys === undefined) setInternalCheckedKeys(nextKeys)
    onCheckedKeysChange?.(nextKeys)
  }

  const toggle = React.useCallback((key: string) => {
    setExpandedKeys(currentExpandedKeys.includes(key) ? currentExpandedKeys.filter((item) => item !== key) : [...currentExpandedKeys, key])
  }, [currentExpandedKeys, setExpandedKeys])

  const visibleKeys = React.useMemo(() => flattenVisibleTreeKeys(items, currentExpandedKeys, query), [items, currentExpandedKeys, query])

  return (
    <div
      data-slot="tree-view"
      role="tree"
      className={cn("grid gap-1 text-sm", className)}
      onKeyDown={(event) => {
        const activeKey = (event.target as HTMLElement).dataset.treeNodeKey
        if (!activeKey) return
        const activeIndex = visibleKeys.indexOf(activeKey)
        const focusKey = (key: string | undefined) => {
          if (!key) return
          const escapedKey = key.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
          event.currentTarget.querySelector<HTMLElement>(`[data-tree-node-key="${escapedKey}"]`)?.focus()
        }

        if (event.key === "ArrowDown") {
          event.preventDefault()
          focusKey(visibleKeys[Math.min(activeIndex + 1, visibleKeys.length - 1)])
        } else if (event.key === "ArrowUp") {
          event.preventDefault()
          focusKey(visibleKeys[Math.max(activeIndex - 1, 0)])
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          if (!currentExpandedKeys.includes(activeKey)) toggle(activeKey)
        } else if (event.key === "ArrowLeft") {
          event.preventDefault()
          if (currentExpandedKeys.includes(activeKey)) toggle(activeKey)
        }
        props.onKeyDown?.(event)
      }}
      {...props}
    >
      {items.map((item) => (
        <TreeViewNode
          key={item.key}
          item={item}
          level={1}
          expandedKeys={currentExpandedKeys}
          selectedKey={selectedKey}
          onToggle={toggle}
          onSelect={onSelect}
          checkedKeys={currentCheckedKeys}
          onCheckedChange={setCheckedKeyState}
          checkable={checkable}
          searchQuery={query}
          onLoadChildren={onLoadChildren}
        />
      ))}
    </div>
  )
}

function flattenVisibleTreeKeys(items: TreeViewItem[], expandedKeys: string[], searchQuery?: string): string[] {
  return items.flatMap((item) => {
    if (!matchesTreeSearch(item, searchQuery)) return []
    return [item.key, ...(item.children && expandedKeys.includes(item.key) ? flattenVisibleTreeKeys(item.children, expandedKeys, searchQuery) : [])]
  })
}

function getTreeItemSearchText(item: TreeViewItem) {
  return item.searchText ?? (typeof item.label === "string" ? item.label : item.key)
}

function matchesTreeSearch(item: TreeViewItem, searchQuery?: string): boolean {
  if (!searchQuery) return true
  return getTreeItemSearchText(item).toLowerCase().includes(searchQuery) || Boolean(item.children?.some((child) => matchesTreeSearch(child, searchQuery)))
}

function renderHighlightedLabel(label: React.ReactNode, searchQuery?: string) {
  if (!searchQuery || typeof label !== "string") return label
  const index = label.toLowerCase().indexOf(searchQuery)
  if (index < 0) return label
  return (
    <>
      {label.slice(0, index)}
      <mark className="rounded bg-primary/15 px-0.5 text-foreground">{label.slice(index, index + searchQuery.length)}</mark>
      {label.slice(index + searchQuery.length)}
    </>
  )
}

function TreeViewNode({
  item,
  level,
  expandedKeys,
  selectedKey,
  onToggle,
  onSelect,
  checkedKeys,
  onCheckedChange,
  checkable,
  searchQuery,
  onLoadChildren,
}: {
  item: TreeViewItem
  level: number
  expandedKeys: string[]
  selectedKey?: string
  onToggle: (key: string) => void
  onSelect?: (item: TreeViewItem) => void
  checkedKeys: string[]
  onCheckedChange: (key: string, checked: boolean) => void
  checkable: boolean
  searchQuery?: string
  onLoadChildren?: (item: TreeViewItem) => void | Promise<void>
}) {
  if (!matchesTreeSearch(item, searchQuery)) return null

  const hasChildren = Boolean(item.children?.length) || Boolean(onLoadChildren)
  const expanded = expandedKeys.includes(item.key)
  const selected = selectedKey === item.key
  const checked = checkedKeys.includes(item.key)

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
          onClick={() => {
            if (!expanded && !item.children?.length) void onLoadChildren?.(item)
            onToggle(item.key)
          }}
        >
          <ChevronRightIcon className={cn("size-4 transition-transform", expanded && "rotate-90")} />
        </button>
        {checkable && (
          <input
            type="checkbox"
            className="size-4 rounded border-border accent-primary"
            checked={checked}
            disabled={item.disabled}
            aria-label={`Select ${getTreeItemSearchText(item)}`}
            onChange={(event) => onCheckedChange(item.key, event.currentTarget.checked)}
          />
        )}
        {item.icon}
        <button
          type="button"
          data-tree-node-key={item.key}
          className="min-w-0 flex-1 truncate rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          disabled={item.disabled}
          onClick={() => onSelect?.(item)}
        >
          {renderHighlightedLabel(item.label, searchQuery)}
        </button>
        {item.loading ? <span className="text-xs text-muted-foreground">Loading...</span> : item.extra}
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
              checkedKeys={checkedKeys}
              onCheckedChange={onCheckedChange}
              checkable={checkable}
              searchQuery={searchQuery}
              onLoadChildren={onLoadChildren}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export { TreeView }
