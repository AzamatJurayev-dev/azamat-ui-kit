import * as React from "react"
import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, useWatch } from "react-hook-form"
import { describe, expect, it } from "vitest"

import {
  FormSelect,
  type AsyncSelectOption,
  type SimpleSelectOption,
} from "@/index"

const roleOptions: SimpleSelectOption[] = [
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
]

const ownerOptions: AsyncSelectOption[] = [
  { value: "u1", label: "Azamat" },
  { value: "u2", label: "Nodir" },
]

function SimpleHarness() {
  const { control } = useForm({ defaultValues: { role: "" } })
  const role = useWatch({ control, name: "role" })

  return (
    <>
      <FormSelect control={control} name="role" label="Role" options={roleOptions} />
      <output data-testid="role-value">{role}</output>
    </>
  )
}

function AsyncHarness() {
  const { control } = useForm({ defaultValues: { ownerId: "" } })
  const ownerId = useWatch({ control, name: "ownerId" })

  return (
    <>
      <FormSelect
        control={control}
        name="ownerId"
        kind="async"
        label="Owner"
        loadOptions={async (search) =>
          ownerOptions.filter((option) =>
            String(option.label).toLowerCase().includes(search.toLowerCase())
          )
        }
      />
      <output data-testid="owner-value">{ownerId}</output>
    </>
  )
}

describe("FormSelect consolidation", () => {
  it("keeps the simple select variant on the main FormSelect entry", async () => {
    const user = userEvent.setup()

    render(<SimpleHarness />)

    await user.click(screen.getByRole("combobox"))
    const listbox = await screen.findByRole("listbox")
    const managerOption = within(listbox).getByText("Manager").closest('[role="option"]')
    expect(managerOption).toBeTruthy()
    await user.click(managerOption!)

    expect(screen.getByTestId("role-value").textContent).toBe("manager")
  })

  it("supports async select behavior from the main FormSelect entry", async () => {
    const user = userEvent.setup()

    render(<AsyncHarness />)

    await user.click(screen.getByRole("button", { name: /select/i }))
    const search = screen.getByPlaceholderText("Search...")
    await user.type(search, "aza")

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Azamat" })).toBeTruthy()
    })

    await user.click(screen.getByRole("button", { name: "Azamat" }))

    expect(screen.getByTestId("owner-value").textContent).toBe("u1")
  })

})
