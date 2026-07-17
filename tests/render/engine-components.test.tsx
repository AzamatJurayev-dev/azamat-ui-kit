import * as React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { BarChart, DonutChart, ImageCropper, LineChart, QRCode, RichTextEditor } from "@/index"

describe("library-backed components", () => {
  it("generates a real SVG QR code with error correction", async () => {
    render(<QRCode value="https://tembro.dev" errorCorrectionLevel="H" alt="Tembro QR" />)

    expect(screen.getByRole("status")).toHaveTextContent("Generating QR code")
    await waitFor(() => expect(screen.getByRole("img", { name: "Tembro QR" })).toBeTruthy())
    expect(screen.getByRole("img", { name: "Tembro QR" }).querySelector("svg")).toBeTruthy()
  })

  it("edits text through TipTap and exposes formatting actions", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<RichTextEditor output="text" onValueChange={onValueChange} />)

    expect(screen.getByRole("toolbar", { name: "Text formatting" })).toBeTruthy()
    await user.click(screen.getByRole("button", { name: "Bold" }))
    await user.type(screen.getByRole("textbox", { name: "Rich text editor" }), "Engine text")
    expect(onValueChange).toHaveBeenLastCalledWith("Engine text")
  })

  it("keeps crop, zoom, and rotation as controlled engine state", () => {
    const onZoomChange = vi.fn()
    const onRotationChange = vi.fn()

    render(
      <ImageCropper
        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
        zoom={1}
        rotation={0}
        onZoomChange={onZoomChange}
        onRotationChange={onRotationChange}
      />
    )

    expect(screen.getByRole("img", { name: "Image crop preview" })).toBeTruthy()
    fireEvent.change(screen.getByLabelText("Zoom"), { target: { value: "1.5" } })
    fireEvent.change(screen.getByLabelText("Rotation"), { target: { value: "45" } })
    expect(onZoomChange).toHaveBeenCalled()
    expect(onRotationChange).toHaveBeenCalled()
  })

  it("disables all cropper controls consistently", () => {
    render(<ImageCropper src="photo.jpg" disabled />)
    expect(screen.getByLabelText("Zoom")).toBeDisabled()
    expect(screen.getByLabelText("Rotation")).toBeDisabled()
    expect(screen.getByRole("img", { name: "Image crop preview" }).parentElement).toHaveAttribute("data-disabled", "true")
  })

  it("renders responsive charts with accessible data fallbacks", () => {
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
      x: 0, y: 0, top: 0, left: 0, right: 800, bottom: 320, width: 800, height: 320,
      toJSON: () => ({}),
    } as DOMRect)
    render(
      <>
        <BarChart ariaLabel="Revenue by region" data={[{ label: "North", value: 42 }, { label: "South", value: -8 }]} />
        <LineChart ariaLabel="Weekly trend" values={[-12, 4, 18]} labels={["Mon", "Tue", "Wed"]} showAxis />
        <LineChart
          ariaLabel="Revenue comparison"
          labels={["Jan", "Feb", "Mar"]}
          series={[
            { key: "current", label: "Current", data: [42, 58, 76] },
            { key: "previous", label: "Previous", data: [36, 49, 62] },
          ]}
          showArea
          showLegend
        />
        <DonutChart ariaLabel="Plan distribution" data={[{ label: "Pro", value: 70 }, { label: "Free", value: 30 }]} />
      </>
    )

    expect(screen.getByRole("img", { name: "Revenue by region" })).toBeTruthy()
    expect(screen.getByRole("img", { name: "Weekly trend" })).toBeTruthy()
    expect(screen.getByRole("img", { name: "Plan distribution" })).toBeTruthy()
    expect(screen.getByRole("img", { name: "Revenue comparison" })).toBeTruthy()
    expect(screen.getByRole("table", { name: "Revenue by region" })).toHaveTextContent("-8")
    expect(screen.getByRole("table", { name: "Weekly trend" })).toHaveTextContent("Mon")
    expect(screen.getByRole("table", { name: "Revenue comparison" })).toHaveTextContent("Previous")
  })
})
