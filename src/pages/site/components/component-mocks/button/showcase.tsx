import { ArrowRightIcon, DownloadIcon } from "lucide-react"

import { Button } from "@/index"

import type { ComponentDemoProps } from "../types"

import { buttonDemoRows } from "./data"

export function ButtonShowcase({ mode }: ComponentDemoProps) {
  return (
    <div className="space-y-5">
      {buttonDemoRows.map((row) => (
        <div key={row.title} className="space-y-3">
          {mode === "playground" ? <p className="text-sm font-medium text-zinc-500">{row.title}</p> : null}
          <div className={row.title === "Responsive CTA row" ? "grid gap-3 md:grid-cols-2" : "flex flex-wrap gap-3"}>
            {row.actions.map((action) => {
              const icon = action.icon === "download"
                ? <DownloadIcon className="mr-2 size-4" />
                : action.icon === "arrow"
                  ? <ArrowRightIcon className="size-4" />
                  : null

              return (
                <Button key={action.label} variant={action.variant} className={action.icon === "arrow" ? "justify-between rounded-2xl" : undefined}>
                  {action.icon === "download" ? icon : null}
                  {action.label}
                  {action.icon === "arrow" ? icon : null}
                </Button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
