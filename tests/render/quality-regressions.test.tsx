import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { CalendarScheduler, DualListPicker, JsonInput } from "@/index"

describe("component quality regressions", () => {
  it("renders a useful scheduler empty state when no days are available", () => {
    render(<CalendarScheduler events={[]} empty="Nothing scheduled" />)

    expect(screen.getByText("Nothing scheduled")).toHaveAttribute("data-empty", "true")
  })

  it("supports uncontrolled dual-list selection", async () => {
    const user = userEvent.setup()
    const onPickedChange = vi.fn()

    render(
      <DualListPicker
        items={[
          { label: "Alpha", value: "alpha" },
          { label: "Beta", value: "beta" },
        ]}
        onPickedChange={onPickedChange}
      />
    )

    const alpha = screen.getByRole("button", { name: /Alpha/ })
    expect(alpha).toHaveAttribute("aria-pressed", "false")

    await user.click(alpha)

    expect(screen.getByRole("button", { name: /Alpha/ })).toHaveAttribute("aria-pressed", "true")
    expect(onPickedChange).toHaveBeenLastCalledWith(["alpha"])
  })

  it("keeps JsonInput editable when value is uncontrolled and reports validity", () => {
    const onValueChange = vi.fn()

    render(<JsonInput aria-label="Configuration JSON" onValueChange={onValueChange} />)

    const input = screen.getByRole("textbox", { name: "Configuration JSON" })
    fireEvent.change(input, { target: { value: '{"enabled":true}' } })

    expect(input).toHaveValue('{"enabled":true}')
    expect(input).not.toHaveAttribute("aria-invalid")
    expect(onValueChange).toHaveBeenLastCalledWith('{"enabled":true}', { enabled: true }, true)

    fireEvent.change(input, { target: { value: '{"enabled":' } })

    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid JSON")
  })
})
