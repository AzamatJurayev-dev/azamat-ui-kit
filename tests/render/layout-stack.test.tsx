import * as React from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Grid, Inline, Stack } from "@/index"

describe("layout composition helpers", () => {
  it("renders stack content and split content in order", () => {
    render(
      <Stack gap="lg" splitAfter={<span>Footer action</span>}>
        <span>Header</span>
        <span>Body</span>
      </Stack>
    )

    expect(screen.getByText("Header").textContent).toBe("Header")
    expect(screen.getByText("Body").textContent).toBe("Body")
    expect(screen.getByText("Footer action").textContent).toBe("Footer action")
  })

  it("renders inline content without wrapping when requested", () => {
    render(
      <Inline wrap={false} justify="between" aria-label="inline-layout">
        <span>Left</span>
        <span>Right</span>
      </Inline>
    )

    expect(screen.getByLabelText("inline-layout").getAttribute("data-slot")).toBe("inline")
    expect(screen.getByText("Left").textContent).toBe("Left")
    expect(screen.getByText("Right").textContent).toBe("Right")
  })

  it("renders grid content with the requested column count", () => {
    render(
      <Grid columns={3} aria-label="grid-layout">
        <span>One</span>
        <span>Two</span>
        <span>Three</span>
      </Grid>
    )

    expect(screen.getByLabelText("grid-layout").getAttribute("data-slot")).toBe("grid")
    expect(screen.getAllByText(/One|Two|Three/)).toHaveLength(3)
  })
})
