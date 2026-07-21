import * as React from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import {
  Badge,
  ButtonGroup,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  CollapseContent,
  CollapseGroup,
  CollapseTrigger,
  Collapse,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Switch,
  RadioGroup,
  Tag,
} from "@/index"

describe("base primitives", () => {
  it("supports compact composed metric cards with base primitives", () => {
    const { container } = render(
      <div data-slot="metric-grid" className="grid gap-3">
        <Card data-slot="metric-card" density="compact">
          <CardContent>
            <p>Revenue</p>
            <strong>$42k</strong>
          </CardContent>
        </Card>
      </div>
    )

    expect(container.querySelector("[data-slot='metric-grid']")).toHaveClass("gap-3")
    expect(container.querySelector("[data-slot='metric-card']")).toHaveAttribute("data-density", "compact")
  })

  it("renders button content, icons and loading state", () => {
    render(
      <Button leftIcon={<span aria-hidden="true">L</span>} rightIcon={<span aria-hidden="true">R</span>}>
        Save
      </Button>
    )

    const button = screen.getByRole("button", { name: "Save" })
    expect(button.getAttribute("data-slot")).toBe("button")
    expect(within(button).getAllByText(/L|R/)).toHaveLength(2)

    render(
      <Button loading loadingLabel="Saving">
        Save
      </Button>
    )

    const loadingButton = screen.getByRole("button", { name: "Saving" })
    expect(loadingButton.getAttribute("aria-busy")).toBe("true")
    expect(loadingButton.getAttribute("disabled")).toBe("")
    expect(within(loadingButton).getByText("Saving")).toBeTruthy()
    expect(loadingButton.querySelector("[data-slot='button-spinner']")).toBeTruthy()
  })

  it("preserves public button variant and disabled data contract", () => {
    render(
      <div>
        <Button variant="destructive">Delete</Button>
        <Button variant="warning">Warn now</Button>
        <Button variant="link">Read docs</Button>
        <Button variant="secondary" disabled>
          Disabled action
        </Button>
        <Button fullWidth pressed>
          Active action
        </Button>
      </div>
    )

    const destructiveButton = screen.getByRole("button", { name: "Delete" })
    const warningButton = screen.getByRole("button", { name: "Warn now" })
    const linkButton = screen.getByRole("button", { name: "Read docs" })
    const disabledButton = screen.getByRole("button", { name: "Disabled action" })
    const pressedButton = screen.getByRole("button", { name: "Active action" })

    expect(destructiveButton.getAttribute("data-variant")).toBe("destructive")
    expect(warningButton.getAttribute("data-variant")).toBe("warning")
    expect(linkButton.getAttribute("data-variant")).toBe("link")
    expect(disabledButton.getAttribute("data-variant")).toBe("secondary")
    expect(disabledButton.getAttribute("disabled")).toBe("")
    expect(pressedButton.getAttribute("data-pressed")).toBe("true")
    expect(pressedButton.getAttribute("aria-pressed")).toBe("true")
    expect(pressedButton.className).toContain("w-full")
  })

  it("forwards refs and keeps native input behavior", async () => {
    const user = userEvent.setup()
    const ref = React.createRef<HTMLInputElement>()

    render(<Input ref={ref} placeholder="Email" defaultValue="alpha" />)

    const input = screen.getByPlaceholderText("Email") as HTMLInputElement
    expect(ref.current).toBe(input)
    expect(input.value).toBe("alpha")

    await user.type(input, "beta")
    expect(input.value).toBe("alphabeta")

    render(<Input type="file" aria-label="Attachment" />)
    expect(screen.getByLabelText("Attachment").className).toContain("file:inline-flex")
  })

  it("renders helper, decorators and character count from the canonical input", async () => {
    const user = userEvent.setup()

    render(
      <Input
        aria-label="Workspace"
        defaultValue="Acme"
        leading={<span aria-hidden="true">@</span>}
        trailing={<span aria-hidden="true">.dev</span>}
        helperText="Use the public workspace slug."
        showCharacterCount
        maxLength={20}
      />
    )

    const input = screen.getByLabelText("Workspace")
    expect(screen.getByText("Use the public workspace slug.")).toBeTruthy()
    expect(screen.getByText("4/20")).toBeTruthy()
    expect(screen.getByText("@")).toBeTruthy()
    expect(screen.getByText(".dev")).toBeTruthy()

    await user.type(input, "team")
    expect(screen.getByText("8/20")).toBeTruthy()
  })

  it("keeps clearable input affordance singular and clears from the canonical input", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <Input
        kind="clearable"
        aria-label="Search docs"
        value="Button"
        onValueChange={onValueChange}
      />
    )

    const clearButtons = screen.getAllByRole("button", { name: "Clear" })
    expect(clearButtons).toHaveLength(1)

    await user.click(clearButtons[0])
    expect(onValueChange).toHaveBeenCalledWith("")
  })

  it("renders textarea variants and merges className", async () => {
    const user = userEvent.setup()

    render(<Textarea placeholder="Notes" rows={4} className="custom-textarea" />)

    const textarea = screen.getByPlaceholderText("Notes") as HTMLTextAreaElement
    expect(textarea.getAttribute("data-slot")).toBe("textarea")
    expect(textarea.getAttribute("rows")).toBe("4")
    expect(textarea.className).toContain("custom-textarea")

    await user.type(textarea, "Hello")
    expect(textarea.value).toBe("Hello")
  })

  it("toggles checkbox and switch state", async () => {
    const user = userEvent.setup()

    render(
      <div>
        <Checkbox aria-label="Accept" />
        <Switch aria-label="Enable" />
      </div>
    )

    const checkbox = screen.getByRole("checkbox", { name: "Accept" })
    const switchControl = screen.getByRole("switch", { name: "Enable" })

    expect(checkbox.getAttribute("data-state")).toBe("unchecked")
    expect(switchControl.getAttribute("data-state")).toBe("unchecked")

    await user.click(checkbox)
    await user.click(switchControl)

    expect(checkbox.getAttribute("aria-checked")).toBe("true")
    expect(switchControl.getAttribute("aria-checked")).toBe("true")
  })

  it("renders switch field label, loading and invalid metadata", () => {
    render(
      <Switch
        label="Email alerts"
        description="Send every billing update."
        loading
        invalid
        size="lg"
      />
    )

    const switchControl = screen.getByRole("switch", { name: /Email alerts/i })
    expect(switchControl.getAttribute("data-size")).toBe("lg")
    expect(switchControl.getAttribute("aria-busy")).toBe("true")
    expect(switchControl.getAttribute("aria-invalid")).toBe("true")
    expect(switchControl.getAttribute("disabled")).toBe("")
    expect(screen.getByText("Send every billing update.")).toBeTruthy()
  })

  it("keeps checkbox size and invalid metadata on the surface", () => {
    render(<Checkbox aria-label="Terms" size="lg" invalid checked="indeterminate" />)

    const checkbox = screen.getByRole("checkbox", { name: "Terms" })
    expect(checkbox.getAttribute("data-size")).toBe("lg")
    expect(checkbox.getAttribute("aria-invalid")).toBe("true")
    expect(checkbox.getAttribute("aria-checked")).toBe("mixed")
  })

  it("cycles checkbox through indeterminate when enabled", async () => {
    const user = userEvent.setup()
    const onCheckedStateChange = vi.fn()

    render(<Checkbox aria-label="Tri-state" allowIndeterminate onCheckedStateChange={onCheckedStateChange} />)

    const checkbox = screen.getByRole("checkbox", { name: "Tri-state" })
    await user.click(checkbox)
    await user.click(checkbox)
    await user.click(checkbox)

    expect(onCheckedStateChange).toHaveBeenNthCalledWith(1, "indeterminate")
    expect(onCheckedStateChange).toHaveBeenNthCalledWith(2, true)
    expect(onCheckedStateChange).toHaveBeenNthCalledWith(3, false)
  })

  it("submits checkbox value through the native form contract", async () => {
    const user = userEvent.setup()
    const submittedValue = vi.fn()
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      submittedValue(new FormData(event.currentTarget).get("terms"))
    }

    render(
      <form onSubmit={handleSubmit}>
        <Checkbox aria-label="Accept terms" name="terms" value="accepted" />
        <Button type="submit">Submit</Button>
      </form>
    )

    await user.click(screen.getByRole("button", { name: "Submit" }))
    expect(submittedValue).toHaveBeenLastCalledWith(null)

    await user.click(screen.getByRole("checkbox", { name: "Accept terms" }))
    await user.click(screen.getByRole("button", { name: "Submit" }))
    expect(submittedValue).toHaveBeenLastCalledWith("accepted")
  })

  it("renders badge tone content without breaking inline layout", () => {
    render(
      <Badge tone="success" leftIcon={<span aria-hidden="true">+</span>} rightIcon={<span aria-hidden="true">!</span>}>
        Active
      </Badge>
    )

    const badge = screen.getByText("Active").closest("[data-slot='badge']")
    expect(badge).toBeTruthy()
    expect((badge as HTMLElement).getAttribute("data-tone")).toBe("success")
    expect((badge as HTMLElement).querySelectorAll("[data-slot='badge-icon']")).toHaveLength(2)
  })

  it("keeps badge soft/removable API and tag keyboard remove behavior", async () => {
    const user = userEvent.setup()
    const onBadgeRemove = vi.fn()
    const onTagRemove = vi.fn()

    render(
      <div>
        <Badge variant="soft" removable onRemove={onBadgeRemove}>
          Beta
        </Badge>
        <Tag removable onRemove={onTagRemove}>
          Priority
        </Tag>
      </div>
    )

    const badge = screen.getByText("Beta").closest("[data-slot='badge']")
    expect(badge?.getAttribute("data-variant")).toBe("soft")

    const badgeRemove = badge?.querySelector<HTMLButtonElement>('[data-slot="badge-remove"]')
    expect(badgeRemove).toBeTruthy()
    await user.click(badgeRemove!)
    expect(onBadgeRemove).toHaveBeenCalledTimes(1)

    const tag = screen.getByText("Priority").closest("[data-slot='tag']") as HTMLElement
    expect(tag.getAttribute("data-removable")).toBe("true")
    tag.focus()
    await user.keyboard("{Delete}")
    expect(onTagRemove).toHaveBeenCalledTimes(1)
  })

  it("moves radio group focus and value with roving keyboard keys", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <RadioGroup
        defaultValue="basic"
        onValueChange={onValueChange}
        options={[
          { label: "Basic", value: "basic" },
          { label: "Pro", value: "pro" },
          { label: "Enterprise", value: "enterprise", disabled: true },
        ]}
      />
    )

    const basic = screen.getByRole("radio", { name: "Basic" })
    const pro = screen.getByRole("radio", { name: "Pro" })

    basic.focus()
    await user.keyboard("{ArrowRight}")

    expect(pro).toHaveFocus()
    expect(pro).toBeChecked()
    expect(onValueChange).toHaveBeenCalledWith("pro")
  })

  it("updates controlled button group value and pressed state", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <ButtonGroup
        value="list"
        onValueChange={onValueChange}
        items={[
          { key: "list", label: "List" },
          { key: "board", label: "Board", description: "Kanban" },
        ]}
      />
    )

    const listButton = screen.getByRole("button", { name: "List" })
    const boardButton = screen.getByRole("button", { name: "Board" })

    expect(listButton.getAttribute("aria-pressed")).toBe("true")
    expect(boardButton.getAttribute("aria-pressed")).toBeNull()
    expect(boardButton.getAttribute("aria-describedby")).toBeTruthy()

    await user.click(boardButton)
    expect(onValueChange).toHaveBeenCalledWith("board")
  })

  it("supports button group deselect and keyboard focus movement", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <ButtonGroup
        value="comfortable"
        allowDeselect
        onValueChange={onValueChange}
        items={[
          { key: "comfortable", label: "Comfortable" },
          { key: "compact", label: "Compact" },
          { key: "dense", label: "Dense" },
        ]}
      />
    )

    const comfortable = screen.getByRole("button", { name: "Comfortable" })
    const compact = screen.getByRole("button", { name: "Compact" })
    const dense = screen.getByRole("button", { name: "Dense" })

    comfortable.focus()
    await user.keyboard("{ArrowRight}")
    expect(compact).toHaveFocus()

    await user.keyboard("{End}")
    expect(dense).toHaveFocus()

    await user.click(comfortable)
    expect(onValueChange).toHaveBeenCalledWith("")
  })

  it("keeps badge metadata contract for dot, variant and size", () => {
    render(
      <Badge variant="outline" tone="warning" size="sm" dot>
        Pending
      </Badge>
    )

    const badge = screen.getByText("Pending").closest("[data-slot='badge']")
    expect(badge).toBeTruthy()
    expect(badge?.getAttribute("data-variant")).toBe("outline")
    expect(badge?.getAttribute("data-tone")).toBe("warning")
    expect(badge?.getAttribute("data-size")).toBe("sm")
    expect(badge?.querySelector("[data-slot='badge-dot']")).toBeTruthy()
  })

  it("renders card composition helpers in order", () => {
    render(
      <Card interactive selected>
        <CardHeader>
          <CardTitle>Project</CardTitle>
          <CardDescription>Build status</CardDescription>
          <CardAction>
            <Button size="xs">Edit</Button>
          </CardAction>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )

    const card = screen.getByText("Project").closest("[data-slot='card']")
    expect(card).toBeTruthy()
    expect(card?.getAttribute("data-interactive")).toBe("true")
    expect(card?.getAttribute("data-selected")).toBe("true")
    expect(screen.getByText("Build status").textContent).toBe("Build status")
    expect(screen.getByText("Content").textContent).toBe("Content")
    expect(screen.getByText("Footer").textContent).toBe("Footer")
  })

  it("keeps card size, density, tone and disabled data contract", () => {
    render(
      <Card variant="soft" size="lg" density="comfortable" tone="warning" disabled>
        <CardContent>Review content</CardContent>
      </Card>
    )

    const card = screen.getByText("Review content").closest("[data-slot='card']")
    expect(card).toBeTruthy()
    expect(card?.getAttribute("data-variant")).toBe("soft")
    expect(card?.getAttribute("data-size")).toBe("lg")
    expect(card?.getAttribute("data-density")).toBe("comfortable")
    expect(card?.getAttribute("data-tone")).toBe("warning")
    expect(card?.getAttribute("data-disabled")).toBe("true")
    expect(card?.getAttribute("aria-disabled")).toBe("true")
  })

  it("keeps the base card surface marker when a composed component owns data-slot", () => {
    render(
      <Card data-slot="metric-card">
        <CardContent>Composed card</CardContent>
      </Card>
    )

    const card = screen.getByText("Composed card").closest("[data-slot='metric-card']")
    expect(card).toBeTruthy()
    expect(card?.hasAttribute("data-card")).toBe(true)
  })

  it("keeps nested cards visually downgraded without breaking content structure", () => {
    render(
      <Card>
        <CardContent>
          <Card>
            <CardContent>Nested content</CardContent>
          </Card>
        </CardContent>
      </Card>
    )

    expect(screen.getByText("Nested content")).toBeTruthy()
    expect(screen.getAllByText("Nested content")).toHaveLength(1)
  })

  it("renders collapse content and manages collapse group state", async () => {
    const user = userEvent.setup()

    render(
      <div>
        <Collapse>
          <CollapseTrigger>Standalone details</CollapseTrigger>
          <CollapseContent>Standalone content</CollapseContent>
        </Collapse>
        <CollapseGroup
          type="single"
          items={[
            { key: "usage", title: "Usage", badge: <span>Core</span>, meta: "P1", content: "Usage content" },
            { key: "api", title: "API", disabled: true, disabledReason: "Locked until release", content: "API content" },
          ]}
        />
      </div>
    )

    await user.click(screen.getByText("Standalone details"))
    expect(screen.getByText("Standalone content")).toBeTruthy()

    await user.click(screen.getByText("Usage"))
    expect(screen.getByText("Usage content")).toBeTruthy()
    expect(screen.getByText("Core")).toBeTruthy()
    expect(screen.getByText("P1")).toBeTruthy()
    expect(screen.getByText("Locked until release")).toBeTruthy()

    const apiTrigger = screen.getByText("API").closest("summary")
    expect(apiTrigger?.getAttribute("aria-disabled")).toBe("true")

    await user.click(screen.getByText("API"))
    expect(screen.getByText("API content").closest("details")?.hasAttribute("open")).toBe(false)
  })

  it("switches tabs and keeps selected state accessible", async () => {
    const user = userEvent.setup()

    render(
      <Tabs defaultValue="details">
        <TabsList aria-label="Profile tabs" variant="underline" overflow="scroll">
          <TabsTrigger value="details" variant="underline">Details</TabsTrigger>
          <TabsTrigger value="history" variant="underline">History</TabsTrigger>
        </TabsList>
        <TabsContent value="details">Details panel</TabsContent>
        <TabsContent value="history">History panel</TabsContent>
      </Tabs>
    )

    expect(screen.getByRole("tab", { name: "Details", selected: true })).toBeTruthy()
    expect(screen.getByText("Details panel")).toBeTruthy()

    await user.click(screen.getByRole("tab", { name: "History" }))

    expect(screen.getByRole("tab", { name: "History", selected: true })).toBeTruthy()
    expect(screen.getByRole("tablist").getAttribute("data-overflow")).toBe("scroll")
  })
})
