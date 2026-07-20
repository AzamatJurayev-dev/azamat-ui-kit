import { expect, test } from "@playwright/test"

const routes = ["/dashboard", "/calendar", "/kanban"]

for (const route of routes) {
  test(`${route} renders without overflow or runtime errors`, async ({ page }, testInfo) => {
    const errors: string[] = []
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text())
    })
    page.on("pageerror", (error) => errors.push(error.message))

    await page.goto(route)
    await page.waitForLoadState("networkidle")

    await expect(page.locator("body")).not.toBeEmpty()
    await expect(page.locator("vite-error-overlay")).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0)
    expect(errors).toEqual([])

    await page.screenshot({ path: testInfo.outputPath(`${route.slice(1)}.png`), fullPage: false })
  })
}

test("calendar selection updates the operational agenda", async ({ page }) => {
  await page.goto("/calendar")
  await page.getByRole("button", { name: "2026-07-16" }).click()
  await expect(page.getByText("Selected date: Jul 16, 2026")).toBeVisible()
})
