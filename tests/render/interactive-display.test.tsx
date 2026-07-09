import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ActivityFeed } from "@/components/display/activity-feed"
import { Carousel, CarouselItem } from "@/components/display/carousel"
import { CodeBlock } from "@/components/display/code-block"
import { KanbanBoard } from "@/components/display/kanban"
import { TreeView } from "@/components/display/tree-view"
import { AsyncSelect } from "@/components/inputs/async-select"
import { Combobox } from "@/components/inputs/combobox"
import { DualListPicker } from "@/components/modern/dual-list-picker"
import { RichTextEditor } from "@/components/modern/rich-text-editor"
import { Tour } from "@/components/modern/tour"

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

  it("supports tree checkboxes, search highlight, and arrow navigation", async () => {
    const user = userEvent.setup()
    const onCheckedKeysChange = vi.fn()

    render(
      <TreeView
        checkable
        searchQuery="oper"
        defaultExpandedKeys={["root"]}
        defaultCheckedKeys={["ops"]}
        onCheckedKeysChange={onCheckedKeysChange}
        items={[
          {
            key: "root",
            label: "Workspace",
            children: [
              { key: "ops", label: "Operations" },
              { key: "billing", label: "Billing" },
            ],
          },
        ]}
      />
    )

    expect(screen.getByText("Oper")).toBeInTheDocument()
    expect(screen.queryByText("Billing")).toBeNull()

    await user.click(screen.getByLabelText("Select Operations"))
    expect(onCheckedKeysChange).toHaveBeenCalledWith([])

    const workspace = screen.getByRole("button", { name: "Workspace" })
    workspace.focus()
    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("button", { name: "Operations" })).toHaveFocus()
  })

  it("renders code block highlighted lines", () => {
    render(<CodeBlock code={"const a = 1\nconst b = 2"} lineNumbers highlightLines={[2]} />)

    expect(screen.getByText("const b = 2").closest("[data-highlighted='true']")).toBeTruthy()
  })

  it("supports kanban empty columns and keyboard card actions", async () => {
    const user = userEvent.setup()
    const onCardClick = vi.fn()

    render(
      <KanbanBoard
        columns={[
          { key: "todo", title: "Todo", cards: [{ key: "a", title: "Draft contract", actions: <button type="button">More</button> }] },
          { key: "done", title: "Done", cards: [] },
        ]}
        onCardClick={onCardClick}
        onCardMove={() => undefined}
      />
    )

    const card = screen.getByRole("button", { name: /Draft contract/ })
    card.focus()
    await user.keyboard("{Enter}")
    expect(onCardClick).toHaveBeenCalledTimes(1)
    expect(screen.getByText("No cards yet.")).toBeInTheDocument()
  })

  it("supports dual list search, transfer all, and max selected state", async () => {
    const user = userEvent.setup()
    const onPickedChange = vi.fn()

    render(
      <DualListPicker
        items={[
          { value: "north", label: "North" },
          { value: "south", label: "South" },
        ]}
        picked={["north"]}
        maxPicked={1}
        onPickedChange={onPickedChange}
      />
    )

    expect(screen.getByText("1 / 1 selected")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Add all" })).toBeDisabled()
    await user.type(screen.getByPlaceholderText("Search items..."), "south")
    expect(screen.getByText("South")).toBeInTheDocument()
    expect(screen.queryByText("North")).toBeNull()
  })

  it("supports rich text text output and tour finish callbacks", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const onFinish = vi.fn()
    const onClose = vi.fn()

    render(
      <>
        <RichTextEditor output="text" onValueChange={onValueChange} placeholder="Write" />
        <Tour steps={[{ title: "Intro" }]} onFinish={onFinish} onClose={onClose} />
      </>
    )

    await user.type(screen.getByText("", { selector: "[contenteditable='true']" }), "Hello")
    expect(onValueChange).toHaveBeenLastCalledWith("Hello")
    await user.click(screen.getByRole("button", { name: "Done" }))
    expect(onFinish).toHaveBeenCalledTimes(1)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
