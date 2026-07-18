"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from "@/components/ui/command"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export type AdvancedCommandMenuItem = {
  id: string
  label: React.ReactNode
  description?: React.ReactNode
  icon?: React.ReactNode
  shortcut?: React.ReactNode
  keywords?: string[]
  onSelect?: () => void
}

export type AdvancedCommandMenuGroup = {
  id: string
  label: React.ReactNode
  items: AdvancedCommandMenuItem[]
}

export type AdvancedCommandMenuProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  groups: AdvancedCommandMenuGroup[]
  title?: React.ReactNode
  triggerLabel?: React.ReactNode
  placeholder?: string
}

function AdvancedCommandMenu({
  open,
  onOpenChange,
  groups,
  title = "Command menu",
  triggerLabel = "Command",
  placeholder = "Search commands...",
}: AdvancedCommandMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const resolvedOpen = open ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  return (
    <>
      <Button type="button" variant="outline" leftIcon={<SearchIcon className="size-4" />} onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <Dialog open={resolvedOpen} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0">
          <DialogHeader className="border-b px-4 py-3">
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>No command found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.id} heading={group.label}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={[item.id, item.label, item.description, ...(item.keywords ?? [])].filter(Boolean).join(" ")}
                      onSelect={() => {
                        item.onSelect?.()
                        setOpen(false)
                      }}
                    >
                      {item.icon}
                      <span className="grid min-w-0 flex-1">
                        <span className="truncate">{item.label}</span>
                        {item.description ? <span className="truncate text-xs text-muted-foreground">{item.description}</span> : null}
                      </span>
                      {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { AdvancedCommandMenu }
