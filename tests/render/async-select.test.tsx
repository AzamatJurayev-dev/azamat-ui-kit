import * as React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { AsyncMultiSelectFixture, AsyncSelectFixture, createLoadOptionsSpy } from "../fixtures/async-select-consumer"

describe("AsyncSelect", () => {
  it("renders hydrated selected option and disabled reason", async () => {
    const loadSelectedOption = vi.fn(async (value: string) => {
      if (value === "beta") {
        return { value: "beta", label: "Beta", disabled: true, disabledReason: "Beta is locked" }
      }

      return null
    })

    render(<AsyncSelectFixture loadOptions={async () => []} loadSelectedOption={loadSelectedOption} />)

    await waitFor(() => {
      expect(loadSelectedOption).toHaveBeenCalledWith("beta", expect.any(Object))
    })

    expect(screen.getByText("Beta")).toBeTruthy()
    expect(screen.getByText("Beta is locked")).toBeTruthy()
  })

  it("ignores slower stale responses and uses the newest results", async () => {
    const user = userEvent.setup()
    let resolveSlow: ((value: { value: string; label: string }[]) => void) | undefined
    const { loadOptions } = createLoadOptionsSpy()
    const slowLoad = vi.fn((search: string, signal?: AbortSignal) => {
      void loadOptions(search, signal)

      if (search === "a") {
        return new Promise<{ value: string; label: string }[]>((resolve) => {
          resolveSlow = () => resolve([{ value: "alpha", label: "Alpha" }])
          signal?.addEventListener("abort", () => resolve([]), { once: true })
        })
      }

      if (search === "g") {
        return Promise.resolve([{ value: "gamma", label: "Gamma" }])
      }

      return Promise.resolve([])
    })

    render(<AsyncSelectFixture loadOptions={slowLoad} />)
    await user.click(screen.getByRole("button", { name: /select an item/i }))

    const search = screen.getByPlaceholderText("Search items")
    await user.type(search, "a")
    await user.clear(search)
    await user.type(search, "g")

    await waitFor(() => {
      expect(screen.getByText("Gamma")).toBeTruthy()
    })

    resolveSlow?.([{ value: "alpha", label: "Alpha" }])
    await waitFor(() => {
      expect(screen.queryByText("Alpha")).toBeNull()
    })

    expect(screen.queryByText("Alpha")).toBeNull()
    expect(slowLoad).toHaveBeenCalled()
  })

  it("debounces search before calling loadOptions", async () => {
    const loadOptions = vi.fn(async (search: string) => {
      if (search === "g") {
        return [{ value: "gamma", label: "Gamma" }]
      }

      return []
    })

    render(<AsyncSelectFixture loadOptions={loadOptions} debounceMs={25} />)
    fireEvent.click(screen.getByRole("button", { name: /select an item/i }))

    expect(loadOptions).toHaveBeenCalledTimes(1)

    const search = screen.getByPlaceholderText("Search items")
    fireEvent.change(search, { target: { value: "g" } })

    expect(loadOptions).toHaveBeenCalledTimes(1)

    await new Promise((resolve) => setTimeout(resolve, 35))

    await waitFor(() => {
      expect(loadOptions).toHaveBeenCalledWith("g", expect.any(Object))
    })
    expect(screen.getByText("Gamma")).toBeTruthy()
  })

  it("uses cached search results on reopen and refreshes them after cacheTtl expires", async () => {
    const loadOptions = vi.fn(async (search: string) => {
      if (search === "g") {
        return [{ value: "gamma", label: "Gamma" }]
      }

      return []
    })

    render(<AsyncSelectFixture loadOptions={loadOptions} cacheTtl={25} debounceMs={0} />)
    fireEvent.click(screen.getByRole("button", { name: /select an item/i }))

    const search = screen.getByPlaceholderText("Search items")
    fireEvent.change(search, { target: { value: "g" } })

    await waitFor(() => {
      expect(screen.getByText("Gamma")).toBeTruthy()
    })

    const cachedCallCount = loadOptions.mock.calls.length
    fireEvent.change(search, { target: { value: "x" } })

    await waitFor(() => {
      expect(loadOptions.mock.calls.length).toBeGreaterThan(cachedCallCount)
    })

    const afterMissCallCount = loadOptions.mock.calls.length
    fireEvent.change(search, { target: { value: "g" } })

    await new Promise((resolve) => setTimeout(resolve, 5))
    expect(loadOptions.mock.calls.length).toBe(afterMissCallCount)

    await new Promise((resolve) => setTimeout(resolve, 30))
    fireEvent.change(search, { target: { value: "g" } })

    await waitFor(() => {
      expect(loadOptions.mock.calls.length).toBeGreaterThan(afterMissCallCount)
    })
  })

  it("supports keyboard clearing and aborts loadSelectedOption on cleanup", async () => {
    const abortSpy = vi.fn()
    const loadSelectedOption = vi.fn(async (_value: string, signal?: AbortSignal) => {
      signal?.addEventListener("abort", abortSpy, { once: true })
      await new Promise((resolve) => setTimeout(resolve, 25))
      return { value: "beta", label: "Beta" }
    })

    const { unmount } = render(<AsyncSelectFixture loadOptions={async () => []} loadSelectedOption={loadSelectedOption} />)
    unmount()

    expect(abortSpy).toHaveBeenCalled()
  })

  it("shows min-search guidance before it loads remote options", async () => {
    const user = userEvent.setup()
    const loadOptions = vi.fn(async (search: string) => {
      if (search.length >= 2) {
        return [{ value: "gamma", label: "Gamma" }]
      }

      return []
    })

    render(<AsyncSelectFixture loadOptions={loadOptions} debounceMs={0} minSearchLength={2} />)
    await user.click(screen.getByRole("button", { name: /select an item/i }))

    expect(screen.getByText(/type at least 2 characters/i)).toBeTruthy()
    expect(loadOptions).not.toHaveBeenCalled()

    const search = screen.getByPlaceholderText("Search items")
    await user.type(search, "g")

    expect(screen.getByText(/type at least 2 characters/i)).toBeTruthy()
    expect(loadOptions).not.toHaveBeenCalled()

    await user.type(search, "a")

    await waitFor(() => {
      expect(loadOptions).toHaveBeenCalledWith("ga", expect.any(Object))
    })
    expect(screen.getByText("Gamma")).toBeTruthy()
  })
})

describe("AsyncMultiSelect", () => {
  it("removes tags with keyboard and keeps selected options hydrated", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    const loadSelectedOptions = vi.fn(async (values: string[]) =>
      values.map((value) => ({ value, label: value.toUpperCase() }))
    )

    render(
      <AsyncMultiSelectFixture
        loadOptions={async () => []}
        loadSelectedOptions={loadSelectedOptions}
        onValueChange={onValueChange}
      />
    )

    await waitFor(() => {
      expect(screen.getByText("ALPHA")).toBeTruthy()
      expect(screen.getByText("GAMMA")).toBeTruthy()
    })

    const removeButtons = screen.getAllByRole("button", { name: /remove/i })
    await user.click(removeButtons[0])

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalled()
    })

    const trigger = screen.getByText("ALPHA").closest("button")
    expect(trigger).toBeTruthy()
    fireEvent.keyDown(trigger as HTMLElement, { key: "Backspace" })

    await waitFor(() => {
      expect(onValueChange).toHaveBeenCalled()
    })
  })

  it("keeps disabled reasons visible in tags", async () => {
    render(
      <AsyncMultiSelectFixture
        loadOptions={async () => []}
        loadSelectedOptions={async (values: string[]) =>
          values.map((value) =>
            value === "alpha"
              ? { value, label: "Alpha", disabled: true, disabledReason: "Alpha is locked" }
              : { value, label: "Gamma" }
          )
        }
      />
    )

    await waitFor(() => {
      expect(screen.getByText("Alpha is locked")).toBeTruthy()
    })
  })
})
