import { useState } from "react"
import { CheckCircle2Icon, CommandIcon, Layers3Icon, MessageSquareIcon, PanelRightIcon, ShieldAlertIcon } from "lucide-react"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ComponentPreview,
  ConfirmDialog,
  DialogActionButton,
  DialogActions,
  EmptyState,
  LoadingState,
  ModalShell,
  SheetShell,
  StatusBadge,
  Stepper,
  useToast,
  Wizard,
} from "@/index"

import { DemoSection, PlaygroundCard, PlaygroundUsage, ShowcaseGrid, TokenPill } from "./playground-ui"
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
      <DemoSection
        sectionIndex={8}
        id="overlay"
        eyebrow="Interaction"
        title="Overlay, command and wizard"
        description="Controlled modal, sheet, confirm, command palette and multi-step flows with mock state history."
        action={<StatusBadge tone="info" dot>{feed.length} events</StatusBadge>}
      >
      <section className="mb-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <Card className="border-primary/15 bg-background shadow-lg shadow-primary/5">
          <CardHeader>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline">Overlays</Badge>
              <Badge variant="outline">Wizard flow</Badge>
              <Badge variant="outline">Command palette</Badge>
            </div>
            <CardTitle className="text-3xl tracking-tight sm:text-4xl">Overlays.</CardTitle>
            <CardDescription className="max-w-2xl text-sm leading-6">
              Modal, sheet, confirm and wizard flows should feel controlled, polished and easy to test without touching backend state.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Interactive surface</p>
              <div className="mt-2 grid gap-2">
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Modal</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Sheet</div>
                <div className="rounded-xl border bg-background px-3 py-2 text-sm">Confirm</div>
              </div>
            </div>
            <div className="rounded-2xl border bg-muted/25 p-4">
              <p className="text-xs text-muted-foreground">Feedback loop</p>
              <div className="mt-2 grid gap-2 text-sm text-muted-foreground">
                <div className="rounded-xl border bg-background px-3 py-2">Loading states</div>
                <div className="rounded-xl border bg-background px-3 py-2">Toast feedback</div>
                <div className="rounded-xl border bg-background px-3 py-2">Event feed</div>
              </div>
            </div>
            <div className="rounded-2xl border bg-background/80 p-4 sm:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">State</p>
                <Badge variant="outline" className="text-[11px]">Overlay live</Badge>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Controlled overlays.</div>
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Visible wizard.</div>
                <div className="rounded-xl border bg-muted/20 p-3 text-sm">Action feed.</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-muted/15">
          <CardHeader>
            <CardTitle className="text-lg">Overlay lab</CardTitle>
            <CardDescription>Controlled state and mock diagnostics.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">Sheets</p>
                <p className="mt-1 text-sm font-medium">{sheetSide}</p>
              </div>
              <div className="rounded-2xl border bg-background p-3">
                <p className="text-xs text-muted-foreground">Wizard step</p>
                <p className="mt-1 text-sm font-medium">{wizardStep}</p>
              </div>
            </div>
            <div className="rounded-2xl border bg-background p-3 text-sm text-muted-foreground">
              Parent-controlled overlays. Child content stays simple.
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-4 grid gap-4 md:grid-cols-4">
        <PlaygroundCard title="Modal" description="Controlled shell" badge={<Badge variant="outline">Dialog</Badge>}>
            <Button onClick={() => setModalOpen(true)}>Open modal</Button>
            <Button variant="outline" onClick={() => setInfoModalOpen(true)}>Open info modal</Button>
          </PlaygroundCard>
          <PlaygroundCard title="Sheet" description="Side-based drawer" badge={<Badge variant="outline">{sheetSide}</Badge>}>
            <Button onClick={() => { setSheetOpen(true); addFeed("info", "Sheet opened.") }}>
              <PanelRightIcon className="mr-2 size-4" />
              Open sheet
            </Button>
            <Button variant="outline" onClick={cycleSheetSide}>Cycle side</Button>
          </PlaygroundCard>
          <PlaygroundCard title="Confirm" description="Async destructive flow" badge={<Badge variant={confirmErrorMode ? "destructive" : "outline"}>{confirmErrorMode ? "error" : "normal"}</Badge>}>
            <Button variant="destructive" onClick={() => { setConfirmOpen(true); addFeed("warning", "Confirm requested by user.") }}>
              <ShieldAlertIcon className="mr-2 size-4" />
              Open confirm
            </Button>
            <Button variant="outline" onClick={() => setConfirmErrorMode((value) => !value)}>Toggle error</Button>
          </PlaygroundCard>
          <PlaygroundCard title="Command" description="Keyboard-first actions" badge={<Badge variant="outline">Ctrl K</Badge>}>
            <Button onClick={onOpenCommand}>
              <CommandIcon className="mr-2 size-4" />
              Open command
            </Button>
            <p className="text-xs text-muted-foreground">Also works with Ctrl/Cmd + K.</p>
          </PlaygroundCard>
        </section>

        <ShowcaseGrid className="mb-4 xl:grid-cols-3">
          <PlaygroundCard title="Overlay controls" description="Trigger modal, sheet, confirm and async footer states." badge={<Badge variant="outline">controls</Badge>}>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setModalOpen(true)}>Modal</Button>
              <Button variant="outline" onClick={() => setInfoModalOpen(true)}>Info</Button>
              <Button variant="outline" onClick={() => setSheetOpen(true)}>Sheet</Button>
              <Button variant="destructive" onClick={() => setConfirmOpen(true)}>Confirm</Button>
              <Button variant={sheetLoading ? "default" : "outline"} onClick={() => { setSheetLoading((value) => !value); addFeed("info", `Sheet loading mode toggled.`) }}>
                Sheet loading
              </Button>
            </div>
            <DialogActions>
              <DialogActionButton variant="outline" disabled={actionBusy} onClick={() => { setActionBusy(false); addFeed("info", "Cancel action clicked.") }}>
                Cancel
              </DialogActionButton>
              <DialogActionButton isLoading={actionBusy} loadingLabel="Saving..." onClick={runActionButton}>
                Save draft
              </DialogActionButton>
            </DialogActions>
          </PlaygroundCard>

          <PlaygroundCard title="Wizard flow" description="Stepper and wizard share the same state." badge={<Badge variant="outline">steps</Badge>}>
            <Stepper steps={wizardSteps} currentStep={wizardStep} onStepChange={setWizardStep} />
            <Wizard
              steps={wizardSteps}
              currentStep={wizardStep}
              onStepChange={setWizardStep}
              onPrevious={() => jumpWizardTo(wizardSteps[Math.max(wizardSteps.findIndex((step) => step.id === wizardStep) - 1, 0)].id)}
              onNext={() => jumpWizardTo(wizardSteps[Math.min(wizardSteps.findIndex((step) => step.id === wizardStep) + 1, wizardSteps.length - 1)].id)}
              onFinish={() => { addToast({ tone: "success", title: "Wizard finished" }); addFeed("success", "Wizard finish callback fired.") }}
            >
              <div className="rounded-lg border bg-muted/30 p-4 text-sm text-muted-foreground">
                Current step: <strong className="text-foreground">{wizardStep}</strong>
              </div>
            </Wizard>
          </PlaygroundCard>

          <PlaygroundCard title="State and event feed" description="Manual QA for loading, empty and command actions." badge={<Badge variant="outline">QA</Badge>}>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant={loadingOverlay ? "default" : "outline"} onClick={() => { setLoadingOverlay((value) => !value); addFeed("info", `Loading state toggled.`) }}>
                Loading
              </Button>
              <Button size="sm" variant={emptyMode ? "default" : "outline"} onClick={() => { setEmptyMode((value) => !value); addFeed("info", `Empty state toggled.`) }}>
                Empty
              </Button>
              <Button size="sm" variant="outline" onClick={() => setFeed([])}>Clear feed</Button>
            </div>
            {loadingOverlay ? <LoadingState label="Loading state" description="Overlay feedback is in loading mode." /> : null}
            {emptyMode ? <EmptyState title="No overlays queued" description="No action was sent to the overlay system." /> : null}
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
        </ShowcaseGrid>

        <ComponentPreview
          title="Controlled overlay system"
          description="Modal, sheet, confirm, wizard and toast all stay controlled from parent state."
          dependencies={["ModalShell", "SheetShell", "ConfirmDialog", "Wizard", "ToastProvider"]}
          code={`<ModalShell open={open} onOpenChange={setOpen} title="Reusable modal" />
<SheetShell open={sheetOpen} side="right" onOpenChange={setSheetOpen} />
<ConfirmDialog open={confirmOpen} isLoading={busy} onConfirm={onConfirm} />`}
        >
          <div className="grid w-full gap-4 md:grid-cols-2">
            <div className="rounded-xl border bg-muted/25 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Layers3Icon className="size-4 text-primary" />
                Overlay rules
              </div>
              <div className="flex flex-wrap gap-2">
                <TokenPill>controlled open</TokenPill>
                <TokenPill>slots</TokenPill>
                <TokenPill>no API logic</TokenPill>
                <TokenPill>toast feedback</TokenPill>
              </div>
            </div>
            <div className="rounded-xl border bg-muted/25 p-4">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium">
                <MessageSquareIcon className="size-4 text-primary" />
                Recent events
              </div>
              <div className="grid gap-1 text-xs text-muted-foreground">
                {feed.slice(0, 5).map((item, index) => <span key={`${item.message}-${index}`}>{item.message}</span>)}
              </div>
            </div>
          </div>
        </ComponentPreview>
      </DemoSection>

      <PlaygroundUsage
        title="Overlay usage"
        items={[
          "Keep overlays declarative and controlled from parent state; business logic belongs in the app.",
          "Use wizard/step components for critical multi-step flows like onboarding, setup and checkout.",
          "Pair confirm dialogs with loading and toast feedback for responsive destructive actions.",
          "Use command palette for navigation and action discovery without coupling it to router internals.",
        ]}
        code={`const [modalOpen, setModalOpen] = useState(false)

<ModalShell open={modalOpen} onOpenChange={setModalOpen} title="Reusable modal" />`}
      />

      <ModalShell open={modalOpen} onOpenChange={(value) => { setModalOpen(value); if (!value) addFeed("info", "Primary modal closed.") }} title="Reusable modal" description="Dashboard shell with explicit parent control." footer={<Button onClick={() => setModalOpen(false)}>Close</Button>} size="md">
        <p className="text-sm text-muted-foreground">This modal is fully controlled from parent state.</p>
      </ModalShell>

      <ModalShell open={infoModalOpen} onOpenChange={(value) => { setInfoModalOpen(value); if (!value) addFeed("info", "Info modal closed.") }} title="Info overlay" description="Single-use modal with immutable content." footer={<Button onClick={() => setInfoModalOpen(false)}>Done</Button>} size="md">
        <p className="text-sm text-muted-foreground">Use this for quick confirmation-style information.</p>
      </ModalShell>

      <SheetShell open={sheetOpen} onOpenChange={(value) => { setSheetOpen(value); if (!value) addFeed("info", "Sheet closed.") }} title="Reusable sheet" description="SheetShell supports side, header, body and footer slots." side={sheetSide} footer={<Button onClick={() => setSheetOpen(false)}>Done</Button>}>
        <p className="text-sm text-muted-foreground">Reusable shell with slot-based content.</p>
        {sheetLoading ? <div className="mt-3"><LoadingState label="Sheet sync" description="Loading internal checklist..." /></div> : null}
      </SheetShell>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Delete product?"
        description="This is a mock confirm flow. You can switch to error mode to test failed async close."
        confirmText="Delete"
        confirmVariant="destructive"
        onCancel={() => { setConfirmOpen(false); addFeed("info", "Confirm dialog canceled.") }}
        isLoading={confirmBusy}
        onConfirm={handleBusyConfirm}
      />
    </>
  )
}






