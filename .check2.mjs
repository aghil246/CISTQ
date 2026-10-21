import { chromium } from "playwright"

const base = process.env.URL ?? "http://localhost:3000/"
const browser = await chromium.launch({
  executablePath: "/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
})
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
const page = await context.newPage()
const errors = []
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`))
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`[console] ${m.text().split("\n")[0]}`)
})

await page.goto(base, { waitUntil: "networkidle", timeout: 90000 })

const out = (label, value) => console.log(`${label}: ${JSON.stringify(value)}`)

// Theme toggle
const themeBtn = page.getByRole("button", { name: /حالت (تیره|روشن)/ })
out("theme buttons", await themeBtn.count())
const htmlBefore = await page.evaluate(() => document.documentElement.className)
await themeBtn.first().click()
await page.waitForTimeout(400)
const htmlAfter = await page.evaluate(() => document.documentElement.className)
out("theme class", [htmlBefore, htmlAfter])
out("localStorage theme", await page.evaluate(() => localStorage.getItem("shopx-theme")))
out("icon after toggle", await themeBtn.first().getAttribute("aria-label"))
// toggle back and keyboard 'd'
await themeBtn.first().click()
await page.waitForTimeout(200)
await page.keyboard.press("d")
await page.waitForTimeout(200)
out("theme after 'd'", await page.evaluate(() => [document.documentElement.className, localStorage.getItem("shopx-theme")]))
await page.keyboard.press("d")
await page.waitForTimeout(200)

// Tabs
const tabs = page.getByRole("tab")
out("tabs", await tabs.allInnerTexts())
await tabs.nth(2).click()
await page.waitForTimeout(300)
out("active tab", await page.getByRole("tab", { selected: true }).innerText())
out("offer panel products", await page.locator('[role="tabpanel"]:not([hidden]) [data-slot="card"]').count())

// Add to cart
const addBtn = page.getByRole("button", { name: /افزودن به سبد خرید/ }).first()
await addBtn.click()
await page.waitForTimeout(600)
const dialog = page.getByRole("dialog")
out("cart dialog open", await dialog.count())
out("cart title", await dialog.first().innerText().then((t) => t.split("\n").slice(0, 4)))
out("cart storage", await page.evaluate(() => localStorage.getItem("shopx-cart")))
const headerCartBadge = await page.locator('button[aria-label="سبد خرید"]').innerText()
out("header cart label", headerCartBadge)

// Quantity increase
await page.getByRole("button", { name: "افزایش تعداد" }).first().click()
await page.waitForTimeout(300)
out("cart storage after inc", await page.evaluate(() => localStorage.getItem("shopx-cart")))
await page.getByRole("button", { name: "حذف از سبد" }).first().click()
await page.waitForTimeout(300)
out("empty cart text", await dialog.first().innerText().then((t) => t.includes("سبد خرید شما خالی است")))
await page.keyboard.press("Escape")
await page.waitForTimeout(400)

// Mobile
await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(400)
const menuBtn = page.getByRole("button", { name: "باز کردن منو" })
out("mobile menu button", await menuBtn.count())
await menuBtn.click()
await page.waitForTimeout(600)
const nav = page.getByRole("dialog")
out("mobile nav open", await nav.count())
out("mobile nav has search", await nav.first().getByRole("search").count())
await nav.first().getByRole("button", { name: /شبکه و اینترنت|روتر/ }).first().click().catch(() => {})
await page.waitForTimeout(500)
out("accordion expanded count", await page.locator('[data-slot="accordion-content"]').count())

// Horizontal overflow check at both widths
for (const w of [1440, 1024, 768, 390, 360]) {
  await page.setViewportSize({ width: w, height: 900 })
  await page.waitForTimeout(250)
  const overflow = await page.evaluate(() => {
    const de = document.documentElement
    const wide = [...document.querySelectorAll("body *")]
      .filter((el) => {
        const r = el.getBoundingClientRect()
        return r.width > 0 && (r.right > de.clientWidth + 2 || r.left < -2)
      })
      .slice(0, 5)
      .map((el) => `${el.tagName}.${(el.className || "").toString().slice(0, 60)}`)
    return { scrollW: de.scrollWidth, clientW: de.clientWidth, wide }
  })
  out(`overflow@${w}`, overflow)
}

out("errors", [...new Set(errors)])
await browser.close()
