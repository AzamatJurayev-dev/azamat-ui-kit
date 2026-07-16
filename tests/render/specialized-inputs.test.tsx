import * as React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

import { ColorPicker, SignaturePad, type SignatureStroke } from "@/index"

const canvasContext = {
  beginPath: vi.fn(),
  arc: vi.fn(),
  clearRect: vi.fn(),
  fill: vi.fn(),
  fillRect: vi.fn(),
  lineTo: vi.fn(),
  moveTo: vi.fn(),
  stroke: vi.fn(),
}

describe("specialized inputs", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(canvasContext as unknown as CanvasRenderingContext2D)
  })

  it("normalizes color values and preserves alpha across swatches", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(<ColorPicker value="#2563eb80" onValueChange={onValueChange} showAlpha swatches={["#dc2626"]} />)

    expect(screen.getByLabelText("Hex color")).toHaveValue("#2563eb80")
    expect(screen.getByLabelText("Opacity")).toHaveValue("50")

    await user.click(screen.getByRole("listitem", { name: "Use #dc2626" }))
    expect(onValueChange).toHaveBeenCalledWith("#dc262680")
  })

  it("rejects invalid hex drafts and commits valid keyboard input", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(<ColorPicker value="#2563eb" onValueChange={onValueChange} swatches={[]} />)
    const input = screen.getByLabelText("Hex color")

    await user.clear(input)
    await user.type(input, "invalid")
    fireEvent.blur(input)
    expect(input).toHaveValue("#2563eb")

    await user.clear(input)
    await user.type(input, "#DC2626{Enter}")
    expect(onValueChange).toHaveBeenCalledWith("#dc2626")
  })

  it("supports controlled signature undo and clear actions", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const strokes: SignatureStroke[] = [
      [{ x: 0.1, y: 0.2, pressure: 0.5 }],
      [{ x: 0.3, y: 0.4, pressure: 0.5 }],
    ]

    render(<SignaturePad value={strokes} onValueChange={onValueChange} />)

    expect(screen.getByRole("img", { name: "Signature pad" })).toBeTruthy()
    await user.click(screen.getByRole("button", { name: "Undo" }))
    expect(onValueChange).toHaveBeenCalledWith([strokes[0]])

    await user.click(screen.getByRole("button", { name: "Clear" }))
    expect(onValueChange).toHaveBeenCalledWith([])
    expect(canvasContext.fillRect).toHaveBeenCalled()
  })

  it("disables signature editing controls as one contract", () => {
    render(<SignaturePad defaultValue={[[{ x: 0.1, y: 0.2, pressure: 0.5 }]]} disabled />)

    expect(screen.getByRole("button", { name: "Undo" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Clear" })).toBeDisabled()
    expect(screen.getByRole("img", { name: "Signature pad" })).toHaveAttribute("data-disabled", "true")
  })
})
