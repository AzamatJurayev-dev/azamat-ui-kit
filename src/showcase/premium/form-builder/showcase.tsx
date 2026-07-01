import * as React from "react"
import { useForm } from "react-hook-form"

import { Button } from "@/index"
import { FormBuilder, formSection, inputField, phoneField, switchField, textareaField } from "@/components/patterns/form-builder"

import type { ComponentDemoProps } from "../types"

type DemoValues = {
  workspace: string
  ownerPhone: string
  notes: string
  isLive: boolean
}

export function FormBuilderShowcase({ mode }: ComponentDemoProps) {
  const form = useForm<DemoValues>({
    defaultValues: {
      workspace: "Azamat UI",
      ownerPhone: "+998 90 123 45 67",
      notes: "Connected sections and submit/reset wiring.",
      isLive: true,
    },
  })

  const sections = React.useMemo(
    () => [
      formSection<DemoValues>({
        id: "main",
        title: "Workspace settings",
        description: "Schema-driven form builder with explicit submit and reset controls.",
        fields: [
          inputField<DemoValues>({ id: "workspace", props: { name: "workspace", label: "Workspace", required: true } }),
          phoneField<DemoValues>({ id: "ownerPhone", props: { name: "ownerPhone", label: "Owner phone" } }),
          textareaField<DemoValues>({ id: "notes", colSpan: "full", props: { name: "notes", label: "Notes", rows: 3 } }),
          switchField<DemoValues>({
            id: "isLive",
            colSpan: "full",
            props: { name: "isLive", label: "Publish workspace", description: "Visible only when record is active." },
          }),
        ],
      }),
    ],
    []
  )

  return (
    <div className="space-y-4">
      <FormBuilder control={form.control} sections={sections} columns={1} submitLabel={mode === "playground" ? "Save workspace" : undefined} />
      <Button type="button" variant="outline" onClick={() => form.reset()}>
        Reset form
      </Button>
    </div>
  )
}
