import { Badge, Button } from "@/index"

export function NotificationsFamilyShowcase() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="aui-status-success rounded-[22px] p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium">Changes saved</p>
          <Badge variant="secondary">Success</Badge>
        </div>
        <p className="mt-2 text-sm">Your workspace updates have been published successfully.</p>
      </div>
      <div className="aui-status-warning rounded-[22px] p-4">
        <div className="flex items-center justify-between">
          <p className="font-medium">Review needed</p>
          <Badge variant="outline">Warning</Badge>
        </div>
        <p className="mt-2 text-sm">Two components still need accessibility review before release.</p>
        <Button variant="outline" className="mt-4">Open review queue</Button>
      </div>
    </div>
  )
}

