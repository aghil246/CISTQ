import { chromium } from "playwright"

const url = process.env.URL ?? "http://localhost:3000/"
const browser = await chromium.launch({
  executablePath: "/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
})
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  storageState: undefined,
})
const page = await context.newPage()
const logs = []
page.on("console", (msg) => {
  if (msg.type() === "error" || msg.type() === "warning") {
    logs.push(`[console.${msg.type()}] ${msg.text()}`)
  }
})
page.on("pageerror", (err) => logs.push(`[pageerror] ${err.message}`))
page.on("requestfailed", (req) =>
  logs.push(`[requestfailed] ${req.url()} ${req.failure()?.errorText}`)
)
page.on("response", (res) => {
  if (res.status() >= 400) logs.push(`[http ${res.status()}] ${res.url()}`)
})

await page.goto(url, { waitUntil: "networkidle", timeout: 90000 })
await page.waitForTimeout(1500)

console.log("TITLE:", await page.title())
console.log("H1:", await page.locator("h1").first().innerText())
console.log("BODY_HEIGHT:", await page.evaluate(() => document.body.scrollHeight))
console.log(
  "HYDRATED_THEME_TOGGLE:",
  await page.locator('[aria-label*="تم"], [aria-label*="theme" i]').count()
)

await page.screenshot({ path: "/tmp/opencode/desktop.png", fullPage: true })

await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(800)
await page.screenshot({ path: "/tmp/opencode/mobile.png", fullPage: true })

console.log("LOGS:")
console.log(logs.join("\n") || "(none)")

await browser.close()
