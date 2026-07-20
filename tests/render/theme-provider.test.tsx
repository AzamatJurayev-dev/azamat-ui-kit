import * as React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { ThemeProvider, useTheme } from "@/components/theme-provider"

function ThemeHarness() {
  const { theme, resolvedTheme, themes, setTheme, toggleTheme } = useTheme()
  return (
    <div>
      <output>{theme}:{resolvedTheme}:{themes.join(",")}</output>
      <button type="button" onClick={() => setTheme("dim")}>Dim</button>
      <button type="button" onClick={toggleTheme}>Next</button>
    </div>
  )
}

describe("ThemeProvider", () => {
  it("applies custom named themes through class and data-theme", async () => {
    const user = userEvent.setup()
    window.localStorage.clear()

    render(
      <ThemeProvider themes={["light", "dark", "dim"]} defaultTheme="light" colorSchemes={{ light: "light", dark: "dark", dim: "dark" }} disableTransitionOnChange={false}>
        <ThemeHarness />
      </ThemeProvider>
    )

    await user.click(screen.getByRole("button", { name: "Dim" }))
    await waitFor(() => expect(document.documentElement).toHaveAttribute("data-theme", "dim"))
    expect(document.documentElement).toHaveClass("dim", "dark")
    expect(document.documentElement.style.colorScheme).toBe("dark")
    expect(screen.getByText("dim:dim:light,dark,dim")).toBeInTheDocument()
  })
})
