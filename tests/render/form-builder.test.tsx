import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, useWatch } from "react-hook-form"
import { describe, expect, it, vi } from "vitest"

import { FormBuilder, type FormBuilderField, type FormBuilderSection } from "@/components/patterns/form-builder"

type BuilderValues = {
  title: string
  notes: string
  role: string
  ownerId: string
  active: boolean
  startDate: string
  endDate: string
}

type InputFieldProps = Extract<FormBuilderField<BuilderValues>, { type: "input" }>["props"]
type TextareaFieldProps = Extract<FormBuilderField<BuilderValues>, { type: "textarea" }>["props"]
type SelectFieldProps = Extract<FormBuilderField<BuilderValues>, { type: "select" }>["props"]
type AsyncSelectFieldProps = Extract<FormBuilderField<BuilderValues>, { type: "async-select" }>["props"]
type SwitchFieldProps = Extract<FormBuilderField<BuilderValues>, { type: "switch" }>["props"]
type DateRangeFieldProps = Extract<FormBuilderField<BuilderValues>, { type: "date-range" }>["props"]

function BuilderHarness({
  disabled = false,
  readOnly = false,
  onSubmit,
  onResetClick,
}: {
  disabled?: boolean
  readOnly?: boolean
  onSubmit?: (values: BuilderValues) => void
  onResetClick?: () => void
}) {
  const { control, handleSubmit } = useForm<BuilderValues>({
    defaultValues: {
      title: "",
      notes: "",
      role: "",
      ownerId: "",
      active: false,
      startDate: "",
      endDate: "",
    },
  })
  const values = useWatch({ control })

  const fields: FormBuilderField<BuilderValues>[] = [
    {
      id: "title",
      type: "input",
      props: {
        name: "title",
        label: "Title",
        placeholder: "Write title",
      } as InputFieldProps,
    },
    {
      id: "notes",
      type: "textarea",
      props: {
        name: "notes",
        label: "Notes",
      } as TextareaFieldProps,
    },
    {
      id: "role",
      type: "select",
      props: {
        name: "role",
        label: "Role",
        options: [
          { value: "admin", label: "Admin" },
          { value: "manager", label: "Manager" },
        ],
      } as SelectFieldProps,
    },
    {
      id: "owner",
      type: "async-select",
      props: {
        name: "ownerId",
        label: "Owner",
        loadOptions: async (search: string) =>
          [
            { value: "u1", label: "Azamat" },
            { value: "u2", label: "Nodir" },
          ].filter((option) => option.label.toLowerCase().includes(search.toLowerCase())),
      } as AsyncSelectFieldProps,
    },
    {
      id: "active",
      type: "switch",
      props: {
        name: "active",
        label: "Active",
      } as SwitchFieldProps,
    },
    {
      id: "range",
      type: "date-range",
      props: {
        fromName: "startDate",
        toName: "endDate",
        label: "Window",
      } as DateRangeFieldProps,
    },
    {
      id: "summary",
      type: "custom",
      render: ({ disabled: fieldDisabled, readOnly: fieldReadOnly }) => (
        <output data-testid="builder-context">{String(fieldDisabled)}:{String(fieldReadOnly)}</output>
      ),
    },
  ]

  const sections: FormBuilderSection<BuilderValues>[] = [
    {
      id: "main",
      title: "Main section",
      description: "Primary fields",
      fields,
    },
    {
      id: "hidden",
      hidden: true,
      fields: [
        {
          id: "hidden-field",
          type: "input",
          props: {
            name: "title",
            label: "Hidden title",
          },
        },
      ],
    },
  ]

  return (
    <>
      <FormBuilder
        control={control}
        sections={sections}
        submitLabel="Save changes"
        resetLabel="Reset form"
        disabled={disabled}
        readOnly={readOnly}
        onResetClick={onResetClick}
        onSubmit={handleSubmit((nextValues) => onSubmit?.(nextValues))}
      />
      <output data-testid="builder-values">{JSON.stringify(values)}</output>
    </>
  )
}

describe("FormBuilder", () => {
  it("renders mixed field types and keeps form state in sync", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn()
    const onResetClick = vi.fn()

    render(<BuilderHarness onSubmit={onSubmit} onResetClick={onResetClick} />)

    expect(screen.getByText("Main section")).toBeTruthy()
    expect(screen.queryByLabelText("Hidden title")).toBeNull()

    await user.type(screen.getByLabelText("Title"), "Alpha")
    await user.type(screen.getByLabelText("Notes"), "Builder notes")

    const selectComboboxes = screen.getAllByRole("combobox")
    await user.click(selectComboboxes[0])

    await waitFor(() => {
      expect(screen.getByText("Manager")).toBeTruthy()
    })
    await user.click(screen.getByText("Manager"))

    await user.click(screen.getByRole("button", { name: /select/i }))
    await user.type(screen.getByPlaceholderText("Search..."), "aza")

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Azamat" })).toBeTruthy()
    })

    await user.click(screen.getByRole("button", { name: "Azamat" }))
    await user.click(screen.getByRole("switch", { name: "Active" }))
    const dateFields = screen.getAllByPlaceholderText(/from|to/i)
    await user.type(dateFields[0], "2026-06-25")
    await user.type(dateFields[1], "2026-06-30")

    const values = screen.getByTestId("builder-values").textContent ?? ""
    expect(values).toContain("\"title\":\"Alpha\"")
    expect(values).toContain("\"notes\":\"Builder notes\"")
    expect(values).toContain("\"role\":\"manager\"")
    expect(values).toContain("\"ownerId\":\"u1\"")
    expect(values).toContain("\"active\":true")
    expect(values).toContain("\"startDate\":\"2026-06-25\"")
    expect(values).toContain("\"endDate\":\"2026-06-30\"")

    await user.click(screen.getByRole("button", { name: "Reset form" }))
    expect(onResetClick).toHaveBeenCalledTimes(1)

    await user.click(screen.getByRole("button", { name: "Save changes" }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Alpha",
          notes: "Builder notes",
          role: "manager",
          ownerId: "u1",
          active: true,
          startDate: "2026-06-25",
          endDate: "2026-06-30",
        })
      )
    })
  }, 20000)

  it("passes disabled and readOnly state into wrapped fields and custom renderers", () => {
    render(<BuilderHarness disabled readOnly />)

    expect((screen.getByLabelText("Title") as HTMLInputElement).disabled).toBe(true)
    expect((screen.getByLabelText("Notes") as HTMLTextAreaElement).disabled).toBe(true)
    const dateFields = screen.getAllByPlaceholderText(/from|to/i)
    expect((dateFields[0] as HTMLInputElement).disabled).toBe(true)
    expect((dateFields[1] as HTMLInputElement).disabled).toBe(true)
    expect(screen.getByTestId("builder-context").textContent).toBe("true:true")
  })
})
