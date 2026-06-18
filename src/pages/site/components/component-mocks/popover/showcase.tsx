import { Button, Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/index"

import type { ComponentDemoProps } from "../types"

import { popoverDemoItems } from "./data"

export function PopoverShowcase({ mode }: ComponentDemoProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {popoverDemoItems.map((item) => (
          <Popover key={item.label}>
            <PopoverTrigger render={<Button variant={item.variant} />}>{item.label}</PopoverTrigger>
            <PopoverContent>
              <PopoverHeader>
                <PopoverTitle>{item.title}</PopoverTitle>
                <PopoverDescription>{item.description}</PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        ))}
      </div>
      {mode === "playground" ? <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">Popover examples cover helper content and action-menu style overlays.</div> : null}
    </div>
  )
}
