import * as React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/index"

describe("DropdownMenu keep-open behavior", () => {
  it("keeps checkbox items open when closeOnSelect is false", async () => {
    const user = userEvent.setup()

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem checked closeOnSelect={false}>
            Notification access
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    await user.click(screen.getByRole("button", { name: "Open menu" }))
    const item = await screen.findByRole("menuitemcheckbox", { name: "Notification access" })
    await user.click(item)

    expect(screen.getByRole("menuitemcheckbox", { name: "Notification access" })).toBeTruthy()
  })
})
