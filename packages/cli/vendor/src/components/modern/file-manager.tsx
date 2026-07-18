"use client"

import * as React from "react"
import { FileIcon, FolderIcon, MoreHorizontalIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollBox } from "@/components/ui/scroll-box"
import { cn } from "@/lib/utils"

export type FileManagerItem = {
  id: string
  name: string
  type: "file" | "folder"
  size?: React.ReactNode
  owner?: React.ReactNode
  status?: React.ReactNode
}

export type FileManagerProps = React.ComponentProps<"div"> & {
  items: FileManagerItem[]
  selectedId?: string
  onSelect?: (item: FileManagerItem) => void
  onOpen?: (item: FileManagerItem) => void
  onSearchChange?: (value: string) => void
  searchValue?: string
  actions?: React.ReactNode
}

function FileManager({ items, selectedId, onSelect, onOpen, searchValue, onSearchChange, actions, className, ...props }: FileManagerProps) {
  const [internalSearch, setInternalSearch] = React.useState("")
  const query = searchValue ?? internalSearch
  const filteredItems = items.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div data-slot="file-manager" className={cn("grid min-w-0 gap-3 rounded-lg border bg-card p-3", className)} {...props}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Input
          kind="search"
          placeholder="Search files..."
          value={query}
          onValueChange={(value) => {
            setInternalSearch(value)
            onSearchChange?.(value)
          }}
          className="max-w-sm"
        />
        {actions}
      </div>
      <ScrollBox className="max-h-[420px]">
        <div className="grid gap-1">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              data-selected={selectedId === item.id || undefined}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md px-3 py-2 text-left transition hover:bg-muted/60 data-[selected=true]:bg-muted"
              onClick={() => onSelect?.(item)}
              onDoubleClick={() => onOpen?.(item)}
            >
              {item.type === "folder" ? <FolderIcon className="size-4 text-primary" /> : <FileIcon className="size-4 text-muted-foreground" />}
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.owner ?? "Shared"} {item.size ? `- ${item.size}` : ""}</span>
              </span>
              <span className="flex items-center gap-2">
                {item.status ? <Badge label={item.status} variant="soft" status="info" /> : null}
                <Button type="button" variant="ghost" size="icon-xs" aria-label="File actions"><MoreHorizontalIcon /></Button>
              </span>
            </button>
          ))}
        </div>
      </ScrollBox>
    </div>
  )
}

export { FileManager }
