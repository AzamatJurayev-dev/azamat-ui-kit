import * as React from "react"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Badge,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Switch,
} from "@/index"

describe("base primitives", () => {
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

  it("switches tabs and keeps selected state accessible", async () => {
    const user = userEvent.setup()

    render(
      <Tabs defaultValue="details">
        <TabsList aria-label="Profile tabs">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="details">Details panel</TabsContent>
        <TabsContent value="history">History panel</TabsContent>
      </Tabs>
    )

    expect(screen.getByRole("tab", { name: "Details", selected: true })).toBeTruthy()
    expect(screen.getByText("Details panel")).toBeTruthy()

    await user.click(screen.getByRole("tab", { name: "History" }))

    expect(screen.getByRole("tab", { name: "History", selected: true })).toBeTruthy()
  })
})
