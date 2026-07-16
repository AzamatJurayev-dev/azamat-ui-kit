import { useState } from "react"

import { StatusLegend } from "@/components/display/status-legend"
import { Alert } from "@/components/feedback/alert"
import { ConfirmDialog } from "@/components/overlay/confirm-dialog"
import { Drawer, DrawerCloseButton } from "@/components/overlay/drawer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function OverlaySection() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  return (
    <div className="grid items-start gap-4 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Drawer</CardTitle>
          <CardDescription>Right-side overlay component.</CardDescription>
        </CardHeader>
        <CardContent>
          <Drawer
            open={drawerOpen}
            onOpenChange={setDrawerOpen}
            trigger={<Button onClick={() => setDrawerOpen(true)}>Open drawer</Button>}
            title="Drawer preview"
            description="Overlay/drawer module rendered from local Tembro code."
            footer={<DrawerCloseButton>Close drawer</DrawerCloseButton>}
          >
            <StatusLegend
              title="Drawer content"
              items={[
                { key: "one", label: "Overlay API", count: 3, tone: "info" },
                { key: "two", label: "Dialog base", count: 1, tone: "success" },
              ]}
            />
          </Drawer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>ConfirmDialog</CardTitle>
          <CardDescription>Controlled confirm modal.</CardDescription>
        </CardHeader>
        <CardContent>
          <ConfirmDialog
            open={confirmOpen}
            onOpenChange={setConfirmOpen}
            trigger={<Button variant="outline" onClick={() => setConfirmOpen(true)}>Open confirm</Button>}
            title="Confirm action"
            description="This is a Tembro ConfirmDialog."
            confirmText="Confirm"
            cancelText="Cancel"
          >
            <p className="text-sm text-muted-foreground">Dialog content area is rendered and styled by the component.</p>
          </ConfirmDialog>
        </CardContent>
      </Card>
      <Alert tone="warning" title="Overlay components" description="alert-dialog, confirm-dialog and drawer are installed. Dialog primitives are under ui/dialog." />
    </div>
  )
}
