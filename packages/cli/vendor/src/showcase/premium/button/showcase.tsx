import * as React from "react"
import { ArrowRightIcon, DownloadIcon, Trash2Icon } from "lucide-react"

import { Badge, Button, buttonVariants } from "@/index"

const variants = [
  ["Default", "default"],
  ["Secondary", "secondary"],
  ["Outline", "outline"],
  ["Ghost", "ghost"],
  ["Destructive", "destructive"],
] as const

const states = ["Ready", "Focus", "Loading", "Disabled"] as const

const panelClass = "border-t border-[color:var(--aui-divider)] py-6"

function VariantRow({
  label,
  variant,
}: {
  label: string
  variant: (typeof variants)[number][1]
}) {
  return (
    <div className="grid gap-3 border-b border-[color:var(--aui-divider)] py-4 last:border-b-0 md:grid-cols-[160px_1fr] md:items-center">
      <div>
        <p className="aui-text-strong text-sm font-semibold">{label}</p>
        <p className="aui-text-muted mt-1 text-xs">npm package variant</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant={variant}>{label}</Button>
        <Button variant={variant} size="sm">Small</Button>
        <Button variant={variant} size="icon" aria-label={`${label} icon button`}>
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  )
}

function StateButton({
  state,
  variant,
}: {
  state: (typeof states)[number]
  variant: (typeof variants)[number][1]
}) {
  if (state === "Loading") {
    return (
      <Button variant={variant} loading loadingLabel="Saving">
        Save
      </Button>
    )
  }

  return (
    <Button
      variant={variant}
      disabled={state === "Disabled"}
      className={state === "Focus" ? "ring-2 ring-[color:var(--aui-ring)] ring-offset-2 ring-offset-[color:var(--aui-page-bg)]" : undefined}
    >
      {state}
    </Button>
  )
}

export function ButtonShowcase() {
  const [selectedVariant, setSelectedVariant] = React.useState<(typeof variants)[number][1]>("default")
  const [approvalState, setApprovalState] = React.useState<"idle" | "saving" | "done">("idle")
  const [clickCount, setClickCount] = React.useState(0)

  const approveInvoice = () => {
    setClickCount((value) => value + 1)
    setApprovalState("saving")
    window.setTimeout(() => setApprovalState("done"), 850)
  }

  return (
    <div className="space-y-0">
      <section className="pb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Installed from npm</p>
        <h3 className="aui-text-strong mt-3 text-2xl font-semibold tracking-tight">Real azamat-ui-kit buttons</h3>
        <p className="aui-text-muted mt-3 max-w-2xl text-sm leading-6">
          This preview uses the exported Button component directly from the installed package. The docs page only provides spacing around it.
        </p>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_360px] xl:items-start">
          <div>
            <p className="aui-text-strong text-lg font-semibold">Approval action row</p>
            <p className="aui-text-muted mt-2 max-w-xl text-sm leading-6">
              Primary, secondary and outline actions should read clearly without custom wrapper styles.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {variants.map(([label, variant]) => (
                <Button
                  key={variant}
                  type="button"
                  size="sm"
                  variant={selectedVariant === variant ? "default" : "outline"}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg-alt)] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="aui-text-strong text-sm font-semibold">Invoice #4821</p>
                <p className="aui-text-muted mt-1 text-xs">Requires finance approval</p>
              </div>
              <Badge variant={approvalState === "done" ? "secondary" : "outline"}>
                {approvalState === "idle" ? "Pending" : approvalState === "saving" ? "Saving" : "Approved"}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button variant="secondary" onClick={() => setClickCount((value) => value + 1)}>
                Save draft
              </Button>
              <Button variant="outline">Preview</Button>
              <Button
                variant={selectedVariant}
                loading={approvalState === "saving"}
                loadingLabel="Approving"
                onClick={approveInvoice}
              >
                {approvalState === "done" ? "Approved" : "Approve invoice"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
          <div>
            <p className="aui-text-strong text-lg font-semibold">Interaction states</p>
            <p className="aui-text-muted mt-2 max-w-xl text-sm leading-6">
              Keep the important states visible without a heavy table or nested card matrix.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {states.map((state) => (
                <div key={state} className="flex items-center justify-between gap-4 border-b border-[color:var(--aui-divider)] py-3">
                  <span className="aui-text-muted text-xs font-semibold uppercase tracking-[0.2em]">{state}</span>
                  <StateButton state={state} variant={selectedVariant} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="aui-text-strong text-lg font-semibold">Variant rail</p>
            <p className="aui-text-muted mt-2 max-w-xl text-sm leading-6">
              All variants use the same exported Button API.
            </p>
            <div className="mt-2">
              {variants.map(([label, variant]) => (
                <VariantRow key={variant} label={label} variant={variant} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="grid gap-5 xl:grid-cols-[1fr_1fr]">
          <div>
            <p className="aui-text-strong text-lg font-semibold">Production footer</p>
            <p className="aui-text-muted mt-2 max-w-xl text-sm leading-6">
              A compact footer pattern for forms, settings pages and dashboard actions.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Button variant="secondary">Save draft</Button>
              <Button variant="outline">Preview</Button>
              <Button>
                Continue
                <ArrowRightIcon className="ml-2 size-4" />
              </Button>
            </div>
          </div>

          <div>
            <p className="aui-text-strong text-lg font-semibold">Icon, async and danger</p>
            <p className="aui-text-muted mt-2 max-w-xl text-sm leading-6">
              Loading and disabled states stay readable; destructive actions remain visually distinct.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Button variant="destructive">
                <Trash2Icon className="mr-2 size-4" />
                Delete
              </Button>
              <Button loading loadingLabel="Publishing">
                Publish
              </Button>
              <Button variant="outline" size="icon" aria-label="Download">
                <DownloadIcon className="size-4" />
              </Button>
              <a href="#" className={buttonVariants({ variant: "link" })}>
                Text link
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="aui-text-muted">Interaction count:</span>
          <Badge variant="secondary">{clickCount}</Badge>
          <span className="aui-text-muted">Selected variant:</span>
          <Badge variant="outline">{selectedVariant}</Badge>
        </div>
      </section>
    </div>
  )
}
