import type { ChangeEvent } from "react"

import { Badge, Button, Textarea } from "@/index"

import type { ComponentDemoProps } from "../types"

import { textareaDemoFields } from "./data"

const panelClass =
  "rounded-[22px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5"

export function TextareaShowcase({ state, setState }: ComponentDemoProps) {
  return (
    <div className="space-y-5">
      <section className="rounded-[24px] border border-[color:var(--aui-divider)] bg-[color:var(--aui-page-bg)] p-5 sm:p-6">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] aui-text-muted">Long-form entry</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">Textarea should feel calm and readable</h3>
            <p className="mt-3 max-w-lg text-sm leading-6 aui-text-muted">
              Use it for notes, summaries, and message bodies. The preview should focus on readability, resize behavior, and passive states instead of raw field duplication.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="rounded-full">Editable</Badge>
            <Badge variant="outline" className="rounded-full">Read-only</Badge>
            <Badge variant="outline" className="rounded-full">Resizable</Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 xl:grid-cols-[1.12fr_0.88fr]">
          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Internal note</p>
            <div className="mt-3">
              <Textarea
                value={state.textareaValue}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setState({ textareaValue: event.target.value })}
                rows={textareaDemoFields[0].rows}
                className={`${textareaDemoFields[0].minHeight} resize-y`}
                placeholder={textareaDemoFields[0].placeholder}
                helperText="Visible helper copy keeps instructions outside the placeholder."
                maxLength={240}
                showCharacterCount
              />
            </div>
          </div>

          <div className={panelClass}>
            <p className="text-sm font-medium aui-text-muted">Current length</p>
            <p className="mt-3 text-2xl font-semibold tracking-tight aui-text-strong">{state.textareaValue.length} chars</p>
            <p className="mt-2 text-sm leading-6 aui-text-muted">
              Long text surfaces should stay readable before they become decorative. Keep line-height, contrast, and padding stable as content grows.
            </p>
          </div>
        </div>
      </section>

      <section className={panelClass}>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] aui-text-muted">Live state</p>
            <h4 className="mt-2 text-lg font-semibold aui-text-strong">
              Draft length: {state.textareaValue.length} characters
            </h4>
            <p className="mt-2 text-sm leading-6 aui-text-muted">
              Fill or clear the note to verify controlled textarea behavior and visual density.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => setState({ textareaValue: "Customer prefers weekly status updates and a shorter approval cycle." })}>
              Fill sample
            </Button>
            <Button type="button" size="sm" variant="secondary" onClick={() => setState({ textareaValue: "" })}>
              Clear
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Pre-filled draft</p>
          <div className="mt-3">
            <Textarea
              defaultValue={textareaDemoFields[1].defaultValue}
              rows={textareaDemoFields[1].rows}
              className={`${textareaDemoFields[1].minHeight} resize-none`}
              helperText="Uncontrolled draft with stable helper spacing."
            />
          </div>
        </section>

        <section className={panelClass}>
          <p className="text-sm font-medium aui-text-muted">Read-only copy</p>
          <div className="mt-3 space-y-3">
            <Textarea
              value={textareaDemoFields[2].defaultValue}
              readOnly={textareaDemoFields[2].readOnly}
              rows={textareaDemoFields[2].rows}
              className={`${textareaDemoFields[2].minHeight} resize-none opacity-70`}
              errorText={state.textareaValue.trim().length > 0 && state.textareaValue.trim().length < 10 ? "Draft needs at least 10 characters." : undefined}
            />
            <p className="text-sm leading-6 aui-text-muted">
              Read-only textareas should still be easy to scan and copy without looking like disabled, broken, or low-priority content.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
