import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useForm, useWatch } from "react-hook-form"
import { describe, expect, it } from "vitest"

import {
  FormDateInput,
  FormInput,
  FormNumberInput,
  FormPhoneInput,
  FormSearchInput,
} from "@/index"

function TextHarness() {
  const { control } = useForm({ defaultValues: { title: "" } })
  const title = useWatch({ control, name: "title" })

  return (
    <>
      <FormInput control={control} name="title" label="Title" placeholder="Write title" />
      <output data-testid="title-value">{title}</output>
    </>
  )
}

function SearchHarness() {
  const { control } = useForm({ defaultValues: { query: "" } })
  const query = useWatch({ control, name: "query" })

  return (
    <>
      <FormInput control={control} name="query" kind="search" label="Query" placeholder="Search items" />
      <output data-testid="query-value">{query}</output>
    </>
  )
}

function NumberHarness() {
  const { control } = useForm({ defaultValues: { count: 0 } })
  const count = useWatch({ control, name: "count" })

  return (
    <>
      <FormNumberInput control={control} name="count" label="Count" />
      <output data-testid="count-value">{String(count)}</output>
    </>
  )
}

function PhoneHarness() {
  const { control } = useForm({ defaultValues: { phone: "" } })
  const phone = useWatch({ control, name: "phone" })

  return (
    <>
      <FormPhoneInput control={control} name="phone" label="Phone" valueMode="raw" />
      <output data-testid="phone-value">{phone}</output>
    </>
  )
}

function DateHarness() {
  const { control } = useForm({ defaultValues: { dueDate: "" } })
  const dueDate = useWatch({ control, name: "dueDate" })

  return (
    <>
      <FormDateInput control={control} name="dueDate" label="Due date" />
      <output data-testid="date-value">{dueDate}</output>
    </>
  )
}

function SearchAliasHarness() {
  const { control } = useForm({ defaultValues: { search: "" } })
  const search = useWatch({ control, name: "search" })

  return (
    <>
      <FormSearchInput control={control} name="search" label="Search" />
      <output data-testid="search-value">{search}</output>
    </>
  )
}

describe("FormInput consolidation", () => {
  it("keeps the default text input behavior", async () => {
    const user = userEvent.setup()

    render(<TextHarness />)

    await user.type(screen.getByLabelText("Title"), "Alpha")

    expect(screen.getByTestId("title-value").textContent).toBe("Alpha")
  })

  it("supports the search variant from the main FormInput entry", async () => {
    const user = userEvent.setup()

    render(<SearchHarness />)

    const field = screen.getByRole("searchbox", { name: "Query" })
    await user.type(field, "Button")

    expect(screen.getByTestId("query-value").textContent).toBe("Button")
  })

  it("keeps wrapper aliases wired to the universal implementation", async () => {
    const user = userEvent.setup()

    render(<SearchAliasHarness />)

    await user.type(screen.getByRole("searchbox", { name: "Search" }), "Palette")

    expect(screen.getByTestId("search-value").textContent).toBe("Palette")
  })

  it("stores numeric values through the number alias", async () => {
    const user = userEvent.setup()

    render(<NumberHarness />)

    const field = screen.getByLabelText("Count")
    await user.clear(field)
    await user.type(field, "42")

    expect(screen.getByTestId("count-value").textContent).toBe("42")
  })

  it("keeps raw phone digits in form state while showing a masked UI", async () => {
    const user = userEvent.setup()

    render(<PhoneHarness />)

    const field = screen.getByLabelText("Phone")
    await user.type(field, "901234567")

    expect((field as HTMLInputElement).value).toBe("+998 90 123 45 67")
    expect(screen.getByTestId("phone-value").textContent).toBe("998901234567")
  })

  it("writes date values through the date alias", async () => {
    const user = userEvent.setup()

    render(<DateHarness />)

    const field = screen.getByLabelText("Due date")
    await user.type(field, "2026-06-20")

    expect(screen.getByTestId("date-value").textContent).toBe("2026-06-20")
  })
})
