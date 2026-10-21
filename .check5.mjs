import { chromium } from "playwright"

const browser = await chromium.launch({
  executablePath: "/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
})
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await context.newPage()
const out = (l, v) => console.log(`${l}: ${JSON.stringify(v)}`)

await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 90000 })
await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 60000 })

await page.getByRole("button", { name: /افزودن به سبد خرید/ }).first().click()
await page.waitForTimeout(500)
out("storage before reload", await page.evaluate(() => localStorage.getItem("shopx-cart")))
out("badge before reload", await page.locator('button[aria-label="سبد خرید"]').innerText())
await page.keyboard.press("Escape")
await page.waitForTimeout(400)

await page.reload({ waitUntil: "load" })
await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 60000 })
await page.waitForTimeout(1500)
out("storage after reload", await page.evaluate(() => localStorage.getItem("shopx-cart")))
out("badge after reload", await page.locator('button[aria-label="سبد خرید"]').innerText())
out("badges", await page.locator('[aria-label*="کالا در سبد"]').count())

// Second reload to check hydration behavior again
await page.reload({ waitUntil: "load" })
await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 60000 })
await page.waitForTimeout(2000)
out("badge after 2nd reload", await page.locator('button[aria-label="سبد خرید"]').innerText())

// open cart by click
await page.locator('button[aria-label="سبد خرید"]').click()
await page.waitForTimeout(700)
out("dialog lines", await page.getByRole("dialog").innerText().then((t) => t.split("\n").slice(0, 6)))
await browser.close()
