import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { DateRangePicker } from "@/components/calendar/date-range-picker"
import { FilterBar } from "@/components/filters/filter-bar"
import { Drawer } from "@/components/overlay/drawer"

describe("filter, drawer and date-range integrations", () => {
  it("limits visible filter chips and shows overflow badge", () => {
    render(
      <FilterBar
        chipLimit={2}
        chips={[
          { key: "status", label: "Status", value: "Active" },
          { key: "owner", label: "Owner", value: "Azamat" },
          { key: "region", label: "Region", value: "APAC" },
        ]}
      />
    )

    expect(screen.getByText("Status")).toBeTruthy()
    expect(screen.getByText("Owner")).toBeTruthy()
    expect(screen.getByText("+1 more")).toBeTruthy()
  })

  it("forwards drawer section class hooks", async () => {
    const user = userEvent.setup()

    render(
      <Drawer
        trigger={<button type="button">Open drawer</button>}
        title="Filters"
        description="Tune the table"
        headerClassName="drawer-header-test"
        bodyClassName="drawer-body-test"
        footerClassName="drawer-footer-test"
        footer={<div>Footer actions</div>}
      >
        Drawer body
      </Drawer>
    )

    await user.click(screen.getByRole("button", { name: "Open drawer" }))

    expect(document.querySelector(".drawer-header-test")).toBeTruthy()
    expect(document.querySelector(".drawer-body-test")).toBeTruthy()
    expect(document.querySelector(".drawer-footer-test")).toBeTruthy()
  })

  it("can apply a date-range preset and close immediately", async () => {
    const user = userEvent.setup()

    function Harness() {
      const [value, setValue] = React.useState({ from: "2026-06-01", to: "2026-06-07" })
      return (
        <>
          <DateRangePicker
            value={value}
            onValueChange={(nextValue) => setValue({ from: nextValue.from ?? "", to: nextValue.to ?? "" })}
            closeOnPresetSelect
            presets={[
              { label: "Next 14 days", value: { from: "2026-06-08", to: "2026-06-20" } },
            ]}
            labels={{ placeholder: "Choose range" }}
          />
          <div data-testid="range-value">{value.from}::{value.to}</div>
        </>
      )
    }

    render(<Harness />)

    await user.click(screen.getByRole("button", { name: /start/i }))
    await user.click(screen.getByRole("button", { name: "Next 14 days" }))

    expect(screen.getByTestId("range-value").textContent).toBe("2026-06-08::2026-06-20")
    await waitFor(() => {
      expect(screen.queryByText("Next 14 days")).toBeNull()
    })
  })
})
