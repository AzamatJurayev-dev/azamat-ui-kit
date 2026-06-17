import { useState } from "react"
import { CheckCircle2Icon, CommandIcon } from "lucide-react"
import {
  Button,
  ConfirmDialog,
  DialogActionButton,
  DialogActions,
  EmptyState,
  LoadingState,
  ModalShell,
  SheetShell,
  Stepper,
  useToast,
  Wizard,
} from "@/index"

import { DemoSection, PlaygroundCard, PlaygroundUsage } from "./playground-ui"
import { wizardSteps } from "./playground-data"

type FeedItem = {
  type: "info" | "success" | "warning"
  message: string
}

export function OverlaySection({ onOpenCommand }: { onOpenCommand: () => void }) {
  const { addToast } = useToast()
  const [modalOpen, setModalOpen] = useState(false)
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [wizardStep, setWizardStep] = useState("info")
  const [sheetSide, setSheetSide] = useState<"right" | "left" | "top" | "bottom">("right")
  const [sheetLoading, setSheetLoading] = useState(false)
  const [confirmBusy, setConfirmBusy] = useState(false)
  const [actionBusy, setActionBusy] = useState(false)
  const [confirmErrorMode, setConfirmErrorMode] = useState(false)
  const [loadingOverlay, setLoadingOverlay] = useState(false)
  const [emptyMode, setEmptyMode] = useState(false)
  const [feed, setFeed] = useState<FeedItem[]>([
    { type: "info", message: "Overlay lab initialized. Use controls below." },
    { type: "info", message: "Wizard and command can be tested independently." },
  ])

  const addFeed = (type: FeedItem["type"], message: string) => {
    setFeed((value) => [{ type, message }, ...value.slice(0, 7)])
  }

  const cycleSheetSide = () => {
    setSheetSide((value) => (value === "right" ? "left" : value === "left" ? "top" : value === "top" ? "bottom" : "right"))
    addFeed("info", "Sheet side changed.")
  }

  const jumpWizardTo = (stepId: string) => {
    setWizardStep(stepId)
    addFeed("info", `Wizard moved to ${stepId}.`)
  }

  const handleBusyConfirm = () => {
    setConfirmBusy(true)
    addFeed("warning", "Delete flow running.")

    setTimeout(() => {
      if (confirmErrorMode) {
        addToast({ tone: "warning", title: "Delete failed", description: "Mock server returned an error." })
        addFeed("warning", "Delete failed in mock mode.")
      } else {
        addToast({ tone: "danger", title: "Delete confirmed", description: "No real data was removed." })
        addFeed("success", "Delete completed in mock mode.")
        setConfirmOpen(false)
      }

      setConfirmBusy(false)
    }, 900)
  }

  const runActionButton = () => {
    setActionBusy(true)
    addFeed("info", "Async action started.")

    setTimeout(() => {
      setActionBusy(false)
      setLoadingOverlay((value) => !value)
      addFeed("success", "Async action complete, loading state updated.")
    }, 700)
  }

  return (
    <>
      <DemoSection sectionIndex={8} id="overlay" title="Command and wizard" description="Keyboard command palette and multi-step flow.">
        <div className="grid gap-4 lg:grid-cols-2">
          <PlaygroundCard title="Command palette">
            <Button onClick={onOpenCommand}>
              <CommandIcon className="mr-2 size-4" />
              Open command palette
            </Button>
            <p className="text-sm text-muted-foreground">Shortcut: Ctrl/Cmd + K</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onOpenCommand()
                  addFeed("info", "Command palette launched from section action.")
                }}
              >
                Open command again
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  jumpWizardTo("info")
                  setSheetSide("right")
                }}
              >
                Reset wizard path
              </Button>
            </div>
          </PlaygroundCard>

          <PlaygroundCard title="Stepper and wizard">
            <Stepper steps={wizardSteps} currentStep={wizardStep} onStepChange={setWizardStep} />
            <Wizard
              steps={wizardSteps}
              currentStep={wizardStep}
              onStepChange={setWizardStep}
              onPrevious={() =>
                jumpWizardTo(wizardSteps[Math.max(wizardSteps.findIndex((step) => step.id === wizardStep) - 1, 0)].id)
              }
              onNext={() =>
                jumpWizardTo(wizardSteps[Math.min(wizardSteps.findIndex((step) => step.id === wizardStep) + 1, wizardSteps.length - 1)].id)
              }
              onFinish={() => {
                addToast({ tone: "success", title: "Wizard finished" })
                addFeed("success", "Wizard finish callback fired.")
              }}
            >
              <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                Current step: <strong className="text-foreground">{wizardStep}</strong>
              </div>
            </Wizard>
          </PlaygroundCard>
        </div>
      </DemoSection>

      <DemoSection
        sectionIndex={9}
        title="Overlay and feedback"
        description="Modal, sheet, confirm, loading and empty states with action history."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          <PlaygroundCard title="Overlay controls">
            <div className="grid gap-2">
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                <Button variant="outline" onClick={() => setInfoModalOpen(true)}>
                  Open info modal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSheetOpen(true)
                    addFeed("info", "Sheet opened.")
                  }}
                >
                  Open sheet
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={cycleSheetSide}>
                  Sheet side: {sheetSide}
                </Button>
                <Button
                  variant={sheetLoading ? "secondary" : "outline"}
                  onClick={() => {
                    setSheetLoading((value) => !value)
                    addFeed("info", `Sheet loading mode: ${sheetLoading ? "off" : "on"}`)
                  }}
                >
                  Sheet loading: {sheetLoading ? "ON" : "OFF"}
                </Button>
                <Button
                  variant={confirmErrorMode ? "destructive" : "outline"}
                  onClick={() => {
                    setConfirmErrorMode((value) => !value)
                    addFeed("warning", "Confirm error mode toggled.")
                  }}
                >
                  {confirmErrorMode ? "Error OFF" : "Error ON"}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setConfirmOpen(true)
                    addFeed("warning", "Confirm requested by user.")
                  }}
                >
                  Open confirm
                </Button>
              </div>
              <DialogActions>
                <DialogActionButton
                  variant="outline"
                  disabled={actionBusy}
                  onClick={() => {
                    setActionBusy(false)
                    addFeed("info", "Cancel action clicked.")
                  }}
                >
                  Cancel
                </DialogActionButton>
                <DialogActionButton isLoading={actionBusy} loadingLabel="Saving..." onClick={runActionButton}>
                  Save draft
                </DialogActionButton>
              </DialogActions>
            </div>
          </PlaygroundCard>

          <PlaygroundCard title="State cards">
            <div className="grid gap-2">
              <Button
                size="sm"
                variant={loadingOverlay ? "secondary" : "outline"}
                onClick={() => {
                  setLoadingOverlay((value) => !value)
                  addFeed("info", `Loading state: ${loadingOverlay ? "off" : "on"}`)
                }}
              >
                Toggle loading card
              </Button>
              <Button
                size="sm"
                variant={emptyMode ? "secondary" : "outline"}
                onClick={() => {
                  setEmptyMode((value) => !value)
                  addFeed("info", `Empty state: ${emptyMode ? "off" : "on"}`)
                }}
              >
                Toggle empty state
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setFeed([])}
              >
                Clear feed
              </Button>
            </div>

            {loadingOverlay ? <LoadingState label="Loading state" description="Overlay feedback is in loading mode." /> : null}
            {emptyMode ? <EmptyState title="No overlays queued" description="No action was sent to the overlay system." /> : null}
          </PlaygroundCard>

          <PlaygroundCard title="Overlay event feed">
            <div className="grid gap-2 text-xs">
              {feed.length === 0 ? (
                <p className="text-muted-foreground">No events yet.</p>
              ) : (
                feed.map((item, index) => (
                  <div
                    key={`${item.type}-${item.message}-${index}`}
                    className={`flex items-start gap-2 rounded border px-2 py-1 ${
                      item.type === "success"
                        ? "border-emerald-500/40 bg-emerald-500/10"
                        : item.type === "warning"
                          ? "border-rose-500/40 bg-rose-500/10"
                          : "border-border/80 bg-muted/20"
                    }`}
                  >
                    <CheckCircle2Icon className="mt-0.5 size-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{item.message}</span>
                  </div>
                ))
              )}
            </div>
          </PlaygroundCard>
        </div>
      </DemoSection>

      <PlaygroundUsage
        title="Overlay usage"
        items={[
          "Keep overlays declarative and controlled from parent state; do not nest business logic in shell component.",
          "Use wizard/step components for critical multi-step flows (onboarding, setup, checkout).",
          "Pair dialog controls with global toasts and optimistic updates for responsive UX.",
          "Track side effects with action feed for auditability and QA demonstration.",
        ]}
        code={`const [modalOpen, setModalOpen] = useState(false)\nconst [open, setOpen] = useState(false)\n<ModalShell open={open} onOpenChange={setOpen} ... />`}
      />

      <ModalShell
        open={modalOpen}
        onOpenChange={(value) => {
          setModalOpen(value)
          if (!value) addFeed("info", "Primary modal closed.")
        }}
        title="Reusable modal"
        description="Dashboard shell with explicit parent control."
        footer={<Button onClick={() => setModalOpen(false)}>Close</Button>}
        size="md"
      >
        <p className="text-sm text-muted-foreground">This modal is fully controlled from parent state.</p>
      </ModalShell>

      <ModalShell
        open={infoModalOpen}
        onOpenChange={(value) => {
          setInfoModalOpen(value)
          if (!value) addFeed("info", "Info modal closed.")
        }}
        title="Info overlay"
        description="Single-use modal with immutable content."
        footer={<Button onClick={() => setInfoModalOpen(false)}>Done</Button>}
        size="md"
      >
        <p className="text-sm text-muted-foreground">Use this for quick confirmation-style information.</p>
      </ModalShell>

      <SheetShell
        open={sheetOpen}
        onOpenChange={(value) => {
          setSheetOpen(value)
          if (!value) addFeed("info", "Sheet closed.")
        }}
        title="Reusable sheet"
        description="SheetShell supports side, header, body and footer slots."
        side={sheetSide}
        footer={<Button onClick={() => setSheetOpen(false)}>Done</Button>}
      >
        <p className="text-sm text-muted-foreground">Reusable shell with slot-based content.</p>
        {sheetLoading ? (
          <div className="mt-3">
            <LoadingState label="Sheet sync" description="Loading internal checklist..." />
          </div>
        ) : null}
      </SheetShell>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete product?"
        description="This is a mock confirm flow. You can switch to error mode to test failed async close."
        confirmText="Delete"
        confirmVariant="destructive"
        onCancel={() => {
          setConfirmOpen(false)
          addFeed("info", "Confirm dialog canceled.")
        }}
        isLoading={confirmBusy}
        onConfirm={handleBusyConfirm}
      />
    </>
  )
}

