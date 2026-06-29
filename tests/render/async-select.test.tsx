import * as React from "react"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { AsyncSelect } from "@/components/inputs/async-select"
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

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 35))
    })

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

    render(<AsyncSelectFixture loadOptions={loadOptions} cacheTtl={250} debounceMs={0} />)
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

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5))
    })
    expect(loadOptions.mock.calls.length).toBe(afterMissCallCount)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 260))
    })

    await act(async () => {
      fireEvent.change(search, { target: { value: "" } })
      await new Promise((resolve) => setTimeout(resolve, 10))
    })

    await act(async () => {
      fireEvent.change(search, { target: { value: "g" } })
      await new Promise((resolve) => setTimeout(resolve, 20))
    })

    await waitFor(() => {
      expect(loadOptions.mock.calls.length).toBeGreaterThan(afterMissCallCount)
    })
  })

  it("clears cached results when loadOptions changes", async () => {
    const user = userEvent.setup()
    const firstLoad = vi.fn(async (search: string) =>
      search === "g" ? [{ value: "gamma", label: "Gamma" }] : []
    )
    const secondLoad = vi.fn(async (search: string) =>
      search === "g" ? [{ value: "green", label: "Green" }] : []
    )

    const { rerender } = render(
      <AsyncSelectFixture loadOptions={firstLoad} debounceMs={0} />
    )

    await user.click(screen.getByRole("button", { name: /select an item/i }))
    const search = screen.getByPlaceholderText("Search items")
    await user.type(search, "g")

    await waitFor(() => {
      expect(screen.getByText("Gamma")).toBeTruthy()
    })

    rerender(<AsyncSelectFixture loadOptions={secondLoad} debounceMs={0} />)
    await user.clear(search)
    await user.type(search, "g")

    await waitFor(() => {
      expect(screen.getByText("Green")).toBeTruthy()
    })

    expect(secondLoad).toHaveBeenCalledWith("g", expect.any(Object))
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

  it("shows loading and empty states for remote searches", async () => {
    const user = userEvent.setup()
    let resolveOptions: ((value: { value: string; label: string }[]) => void) | undefined
    const loadOptions = vi.fn(
      () =>
        new Promise<{ value: string; label: string }[]>((resolve) => {
          resolveOptions = resolve
        })
    )

    render(
      <AsyncSelect
        loadOptions={loadOptions}
        debounceMs={0}
        labels={{
          placeholder: "Select an item",
          searchPlaceholder: "Search items",
          loading: "Loading remote options",
          empty: "Nothing matched",
        }}
      />
    )

    await user.click(screen.getByRole("button", { name: /select an item/i }))
    expect(screen.getByText("Loading remote options")).toBeTruthy()

    resolveOptions?.([])

    await waitFor(() => {
      expect(screen.getByText("Nothing matched")).toBeTruthy()
    })
  })

  it("shows error state when loading fails", async () => {
    const user = userEvent.setup()
    const loadOptions = vi.fn(async () => {
      throw new Error("network")
    })

    render(
      <AsyncSelect
        loadOptions={loadOptions}
        debounceMs={0}
        labels={{
          placeholder: "Select an item",
          searchPlaceholder: "Search items",
          error: "Could not reach the server",
        }}
      />
    )

    await user.click(screen.getByRole("button", { name: /select an item/i }))

    await waitFor(() => {
      expect(screen.getByText("Could not reach the server")).toBeTruthy()
    })
  })

  it("renders grouped options and custom selected labels", async () => {
    const user = userEvent.setup()

    render(
      <AsyncSelect<string>
        value="alpha"
        selectedOption={{ value: "alpha", label: "Alpha" }}
        renderValue={(option) => `Chosen ${String(option.label)}`}
        loadOptions={async () => [
          {
            label: "Core team",
            options: [
              { value: "alpha", label: "Alpha" },
              { value: "beta", label: "Beta" },
            ],
          },
          {
            label: "Extended team",
            options: [{ value: "gamma", label: "Gamma" }],
          },
        ]}
        debounceMs={0}
        labels={{
          placeholder: "Select an item",
          searchPlaceholder: "Search items",
        }}
      />
    )

    expect(screen.getByText("Chosen Alpha")).toBeTruthy()

    await user.click(screen.getByRole("button", { name: /chosen alpha/i }))

    await waitFor(() => {
      expect(screen.getByText("Core team")).toBeTruthy()
    })

    expect(screen.getByText("Extended team")).toBeTruthy()
    expect(screen.getByRole("button", { name: "Gamma" })).toBeTruthy()
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

  it("closes after selection when closeOnSelect is enabled", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <AsyncMultiSelectFixture
        value={[]}
        closeOnSelect
        loadOptions={async () => [
          { value: "alpha", label: "Alpha" },
          { value: "gamma", label: "Gamma" },
        ]}
        onValueChange={onValueChange}
      />
    )

    await user.click(screen.getByRole("button", { name: /select many/i }))
    await user.click(await screen.findByRole("button", { name: /alpha/i }))

    expect(onValueChange).toHaveBeenCalledWith(["alpha"], expect.any(Array))
    await waitFor(() => {
      expect(screen.queryByPlaceholderText("Search items")).toBeNull()
    })
  })

  it("shows max-selected guidance and blocks adding more values", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <AsyncMultiSelectFixture
        maxSelected={2}
        loadOptions={async () => [
          { value: "alpha", label: "Alpha" },
          { value: "gamma", label: "Gamma" },
          { value: "delta", label: "Delta" },
        ]}
        onValueChange={onValueChange}
      />
    )

    await user.click(screen.getByRole("button", { name: /select many/i }))

    expect(screen.getByText("2 selected")).toBeTruthy()
    expect(screen.getByText("Maximum 2 selected")).toBeTruthy()
    expect(screen.queryByRole("button", { name: "Select all" })).toBeNull()

    await user.click(await screen.findByRole("button", { name: /delta/i }))
    expect(onValueChange).not.toHaveBeenCalledWith(expect.arrayContaining(["delta"]), expect.any(Array))
  })

  it("selects all visible non-disabled options when requested", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()

    render(
      <AsyncMultiSelectFixture
        value={[]}
        showSelectAll
        loadOptions={async () => [
          { value: "alpha", label: "Alpha" },
          { value: "beta", label: "Beta", disabled: true },
          { value: "gamma", label: "Gamma" },
        ]}
        onValueChange={onValueChange}
      />
    )

    await user.click(screen.getByRole("button", { name: /select many/i }))
    await user.click(await screen.findByRole("button", { name: "Select all" }))

    expect(onValueChange).toHaveBeenCalledWith(
      ["alpha", "gamma"],
      expect.arrayContaining([
        expect.objectContaining({ value: "alpha" }),
        expect.objectContaining({ value: "gamma" }),
      ])
    )
  })
})
