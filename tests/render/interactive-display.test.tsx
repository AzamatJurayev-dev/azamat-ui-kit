import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ActivityFeed } from "@/components/display/activity-feed"
import { Carousel, CarouselItem } from "@/components/display/carousel"
import { AsyncSelect } from "@/components/inputs/async-select"
import { Combobox } from "@/components/inputs/combobox"

describe("interactive display surfaces", () => {
  it("supports interactive activity feed rows", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()

    render(
      <ActivityFeed
        items={[
          { id: "a", title: "Invoice synced", description: "Ready for review", onSelect, interactive: true },
        ]}
      />
    )

    await user.click(screen.getByRole("button", { name: "Invoice synced Ready for review" }))
    expect(onSelect).toHaveBeenCalledTimes(1)
  })

  it("can toggle carousel autoplay playback control", async () => {
    const user = userEvent.setup()
    const onAutoplayChange = vi.fn()

    render(
      <Carousel autoplay showDots showPlaybackControl onAutoplayChange={onAutoplayChange}>
        <CarouselItem>One</CarouselItem>
        <CarouselItem>Two</CarouselItem>
      </Carousel>
    )

    await user.click(screen.getByRole("button", { name: "Pause autoplay" }))
    expect(onAutoplayChange).toHaveBeenCalledWith(false)

    await user.click(screen.getByRole("button", { name: "Start autoplay" }))
    expect(onAutoplayChange).toHaveBeenCalledWith(true)
  })

  it("supports clearable and deselectable combobox selection", async () => {
    const user = userEvent.setup()

    function Harness() {
      const [value, setValue] = React.useState<string | undefined>("azamat")
      return (
        <>
          <Combobox
            value={value}
            options={[
              { value: "azamat", label: "Azamat", description: "Owner" },
              { value: "nodira", label: "Nodira", description: "Ops" },
            ]}
            clearable
            allowDeselect
            showSelectedDescription
            onValueChange={(next) => setValue(next)}
          />
          <div data-testid="value">{value ?? "empty"}</div>
        </>
      )
    }

    render(<Harness />)

    expect(screen.getByText("Owner")).toBeTruthy()
    await user.click(screen.getByLabelText("Clear value"))
    expect(screen.getByTestId("value").textContent).toBe("empty")
  })

  it("clears combobox selection from keyboard and keeps async multi tags compact", async () => {
    const user = userEvent.setup()

    function ComboHarness() {
      const [value, setValue] = React.useState<string | undefined>("azamat")
      return (
        <>
          <Combobox
            value={value}
            options={[
              { value: "azamat", label: "Azamat", description: "Owner" },
              { value: "nodira", label: "Nodira", description: "Ops" },
            ]}
            clearable
            onValueChange={(next) => setValue(next)}
          />
          <div data-testid="combo-value">{value ?? "empty"}</div>
        </>
      )
    }

    render(
      <>
        <ComboHarness />
        <AsyncSelect
          isMulti
          value={["north", "west", "east"]}
          onValueChange={() => undefined}
          loadOptions={async () => [
            { value: "north", label: "North" },
            { value: "west", label: "West" },
            { value: "east", label: "East" },
          ]}
          defaultOptions={[
            { value: "north", label: "North" },
            { value: "west", label: "West" },
            { value: "east", label: "East" },
          ]}
          maxVisibleTags={2}
          labels={{ hiddenSelected: (count: number) => `+${count} more` }}
        />
      </>
    )

    const clear = screen.getByLabelText("Clear value")
    clear.focus()
    await user.keyboard("{Enter}")
    expect(screen.getByTestId("combo-value").textContent).toBe("empty")

    expect(screen.getByText("North")).toBeTruthy()
    expect(screen.getByText("West")).toBeTruthy()
    expect(screen.getByText("+1 more")).toBeTruthy()
    expect(screen.queryByText("East")).toBeNull()
  })
})
