import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm } from "react-hook-form"
import { describe, expect, it } from "vitest"

import {
  FormAsyncSelect,
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
  const { control, watch } = useForm({ defaultValues: { role: "" } })

  return (
    <>
      <FormSelect control={control} name="role" label="Role" options={roleOptions} />
      <output data-testid="role-value">{watch("role")}</output>
    </>
  )
}

function AsyncHarness() {
  const { control, watch } = useForm({ defaultValues: { ownerId: "" } })

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
      <output data-testid="owner-value">{watch("ownerId")}</output>
    </>
  )
}

function AsyncAliasHarness() {
  const { control, watch } = useForm({ defaultValues: { reviewerId: "" } })

  return (
    <>
      <FormAsyncSelect
        control={control}
        name="reviewerId"
        label="Reviewer"
        loadOptions={async () => ownerOptions}
      />
      <output data-testid="reviewer-value">{watch("reviewerId")}</output>
    </>
  )
}

describe("FormSelect consolidation", () => {
  it("keeps the simple select variant on the main FormSelect entry", async () => {
    const user = userEvent.setup()

    render(<SimpleHarness />)

    await user.click(screen.getByRole("combobox"))
    await user.click(screen.getByRole("option", { name: "Manager" }))

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

  it("keeps FormAsyncSelect as a compatibility alias", async () => {
    const user = userEvent.setup()

    render(<AsyncAliasHarness />)

    await user.click(screen.getByRole("button", { name: /select/i }))
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Nodir" })).toBeTruthy()
    })

    await user.click(screen.getByRole("button", { name: "Nodir" }))

    expect(screen.getByTestId("reviewer-value").textContent).toBe("u2")
  })
})
