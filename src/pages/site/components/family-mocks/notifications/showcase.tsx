import { Badge, Button } from "@/index"

import type { FamilyDemoProps } from "../types"

export function NotificationsFamilyShowcase(_: FamilyDemoProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-emerald-800">Changes saved</p>
          <Badge variant="secondary">Success</Badge>
        </div>
        <p className="mt-2 text-sm text-emerald-700">Your workspace updates have been published successfully.</p>
      </div>
      <div className="rounded-[22px] border border-amber-200 bg-amber-50 p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-amber-800">Review needed</p>
          <Badge variant="outline">Warning</Badge>
        </div>
        <p className="mt-2 text-sm text-amber-700">Two components still need accessibility review before release.</p>
        <Button variant="outline" className="mt-4">Open review queue</Button>
      </div>
    </div>
  )
}

