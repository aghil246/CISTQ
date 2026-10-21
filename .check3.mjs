import { chromium } from "playwright"

const browser = await chromium.launch({
  executablePath: "/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
})
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } })
const logs = []
page.on("console", (m) => logs.push(`[${m.type()}] ${m.text().split("\n")[0]}`))
page.on("pageerror", (e) => logs.push(`[pageerror] ${e.message}`))
page.on("framenavigated", (f) => {
  if (f === page.mainFrame()) logs.push(`[navigated] ${f.url()}`)
})
await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 90000 })
await page.getByRole("tab").first().waitFor({ timeout: 60000 })

console.log("theme key:", await page.evaluate(() => localStorage.getItem("theme")))
console.log("tab count:", await page.getByRole("tab").count())

const tab = page.getByRole("tab", { name: "فروش ویژه" })
console.log("tab box:", await tab.boundingBox())

try {
  await tab.click({ timeout: 8000, noWaitAfter: true })
  console.log("click returned")
} catch (e) {
  console.log("click failed:", e.message.split("\n")[0])
}

// Is the main thread alive?
const t0 = Date.now()
const alive = await Promise.race([
  page.evaluate(() => 1 + 1),
  new Promise((resolve) => setTimeout(() => resolve("TIMEOUT"), 5000)),
])
console.log("main thread:", alive, "after", Date.now() - t0, "ms")
console.log("selected:", await page.evaluate(() => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent))
console.log("logs:", logs.slice(0, 20))
await browser.close()
