import * as React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Calendar } from "@/components/calendar/calendar"
import { DatePicker } from "@/components/calendar/date-picker"
import { DateRangePicker } from "@/components/calendar/date-range-picker"
import { FileUpload } from "@/components/upload/file-upload"

function createSizedFile(name: string, type: string, size: number) {
  const file = new File(["x"], name, { type })
  Object.defineProperty(file, "size", { value: size })
  return file
}

function ControlledFileUpload(props: React.ComponentProps<typeof FileUpload>) {
  const [files, setFiles] = React.useState<File[]>(props.files ?? [])

  return (
    <FileUpload
      {...props}
      files={files}
      onFilesChange={(nextFiles) => {
        setFiles(nextFiles)
        props.onFilesChange?.(nextFiles)
      }}
    />
  )
}

describe("Calendar and date pickers", () => {
  it("supports single selection and respects min/max/disabled dates", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <Calendar
        mode="single"
        defaultMonth="2024-06-01"
        min="2024-06-10"
        max="2024-06-20"
        disabledDates={["2024-06-14"]}
        onValueChange={onValueChange}
        labels={{
          selectDate: (date) => `Pick ${date}`,
          disabledDate: (date, reason) => `${date} ${reason}`,
        }}
      />
    )

    const tooEarly = screen.getByRole("button", { name: "2024-06-09 min" })
    const disabled = screen.getByRole("button", { name: "2024-06-14 disabled" })
    const tooLate = screen.getByRole("button", { name: "2024-06-21 max" })
    const valid = screen.getByRole("button", { name: "Pick 2024-06-15" })

    expect(tooEarly.hasAttribute("disabled")).toBe(true)
    expect(disabled.hasAttribute("disabled")).toBe(true)
    expect(tooLate.hasAttribute("disabled")).toBe(true)

    await user.click(valid)
    expect(onValueChange).toHaveBeenCalledWith("2024-06-15")
  })

  it("supports range selection and footer-based apply flow", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <DateRangePicker
        value={{}}
        onValueChange={onValueChange}
        defaultMonth="2024-06-01"
        showFooter
        closeOnSelect={false}
        labels={{
          selectDate: (date) => `Pick ${date}`,
          apply: "Apply range",
          clear: "Clear range",
        }}
      />
    )

    await user.click(screen.getByRole("button", { name: /select date range/i }))
    expect(screen.getAllByText("June 2024").length).toBeGreaterThan(0)
    expect(screen.getByText("July 2024")).toBeTruthy()

    await user.click(screen.getByRole("button", { name: "Pick 2024-06-12" }))
    await user.click(screen.getByRole("button", { name: "Pick 2024-06-18" }))

    expect(onValueChange).not.toHaveBeenCalled()

    await user.click(screen.getByRole("button", { name: "Apply range" }))
    expect(onValueChange).toHaveBeenCalledWith({ from: "2024-06-12", to: "2024-06-18" })
  }, 20000)

  it("selects a date from DatePicker and closes the popover", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <DatePicker
        value={undefined}
        onValueChange={onValueChange}
        defaultMonth="2024-06-01"
        labels={{
          selectDate: (date) => `Pick ${date}`,
        }}
      />
    )

    await user.click(screen.getByRole("button", { name: /select date/i }))
    await user.click(screen.getByRole("button", { name: "Pick 2024-06-11" }))

    expect(onValueChange).toHaveBeenCalledWith("2024-06-11")
    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "Pick 2024-06-12" })).toBeNull()
    })
  })
})

describe("FileUpload", () => {
  it("rejects files by max files, max size, and type", () => {
    const onFilesChange = vi.fn()
    const { container } = render(
      <FileUpload
        onFilesChange={onFilesChange}
        maxFiles={1}
        maxSize={100}
        accept=".png"
        dropzoneAriaLabel="Upload files"
      />
    )

    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const png = createSizedFile("logo.png", "image/png", 80)
    const tooBig = createSizedFile("big.png", "image/png", 400)
    const wrongType = createSizedFile("notes.pdf", "application/pdf", 60)

    fireEvent.change(input, {
      target: {
        files: [png, tooBig, wrongType],
      },
    })

    expect(onFilesChange).toHaveBeenCalledWith([png])
    expect(screen.getByText(/big\.png: Maximum 1 file allowed\./i)).toBeTruthy()
    expect(screen.getByText(/notes\.pdf: Maximum 1 file allowed\./i)).toBeTruthy()
  })

  it("handles size and type rejection when max-files is not the limiting factor", () => {
    const onFilesChange = vi.fn()
    const { container } = render(
      <FileUpload
        onFilesChange={onFilesChange}
        maxFiles={3}
        maxSize={100}
        accept=".png"
        dropzoneAriaLabel="Upload files"
      />
    )

    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const tooBig = createSizedFile("big.png", "image/png", 400)
    const wrongType = createSizedFile("notes.pdf", "application/pdf", 60)

    fireEvent.change(input, {
      target: {
        files: [tooBig, wrongType],
      },
    })

    expect(onFilesChange).toHaveBeenCalledWith([])
    expect(screen.getByText(/big\.png: File is larger than 100 B\./i)).toBeTruthy()
    expect(screen.getByText(/notes\.pdf: File type is not allowed\. Expected: \.png\./i)).toBeTruthy()
  })

  it("accepts dropped files and updates drag state", async () => {
    const user = userEvent.setup()
    const onFilesChange = vi.fn()

    render(<ControlledFileUpload onFilesChange={onFilesChange} dropzoneAriaLabel="Upload files" />)

    const dropzone = screen.getByRole("button", { name: "Upload files" })
    const file = createSizedFile("avatar.png", "image/png", 90)

    fireEvent.dragEnter(dropzone, {
      dataTransfer: { files: [file] },
    })
    expect(screen.getByText("Drop files to upload")).toBeTruthy()

    fireEvent.drop(dropzone, {
      dataTransfer: { files: [file] },
    })

    expect(onFilesChange).toHaveBeenCalledWith([file])

    await user.click(screen.getByRole("button", { name: "Clear all" }))
    expect(onFilesChange).toHaveBeenCalledWith([])
  })
})
