import { chromium } from "playwright"

const browser = await chromium.launch({
  executablePath: "/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome",
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
})
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
const page = await context.newPage()
const errors = []
page.on("pageerror", (e) => errors.push(`[pageerror] ${e.message}`))
page.on("console", (m) => {
  if (m.type() === "error" && !m.text().includes("Base UI: A component that acts as a button"))
    errors.push(`[console] ${m.text().split("\n")[0]}`)
})
const out = (label, value) => console.log(`${label}: ${JSON.stringify(value)}`)

await page.goto("http://localhost:3000/", { waitUntil: "load", timeout: 90000 })
await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 60000 })

// 1. theme persistence
await page.getByRole("button", { name: /حالت تیره/ }).click()
await page.waitForTimeout(300)
out("theme key after toggle", await page.evaluate(() => localStorage.getItem("theme")))
out("html class", await page.evaluate(() => document.documentElement.className))
await page.reload({ waitUntil: "load" })
await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 60000 })
await page.waitForTimeout(500)
out("theme after reload", await page.evaluate(() => [localStorage.getItem("theme"), document.documentElement.className]))
out("toggle label after reload", await page.getByRole("button", { name: /حالت/ }).first().getAttribute("aria-label"))

// 2. cart: add, persist, inc/dec, reload
await page.getByRole("button", { name: /افزودن به سبد خرید/ }).first().click()
await page.waitForTimeout(500)
out("cart open", await page.getByRole("dialog").count())
out("cart raw", await page.evaluate(() => localStorage.getItem("shopx-cart")))
await page.getByRole("button", { name: "افزایش تعداد" }).first().click()
await page.waitForTimeout(200)
out("cart raw after inc", await page.evaluate(() => localStorage.getItem("shopx-cart")))
await page.keyboard.press("Escape")
await page.waitForTimeout(400)
out("header cart text", await page.locator('button[aria-label="سبد خرید"]').innerText())
await page.reload({ waitUntil: "load" })
await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 60000 })
await page.waitForTimeout(500)
out("header cart after reload", await page.locator('button[aria-label="سبد خرید"]').innerText())

// 3. consult form input + select
await page.locator("#consult").scrollIntoViewIfNeeded()
const nameInput = page.getByPlaceholder("مثلاً سارا محمدی")
await nameInput.fill("سارا 123")
out("name input value", await nameInput.inputValue())
const telInput = page.getByPlaceholder("0912 000 0000")
await telInput.fill("09120000000")
out("tel input value", await telInput.inputValue())
out("tel input type", await telInput.getAttribute("type"))
const selectTrigger = page.locator("#consult [data-slot='select-trigger']")
out("select trigger text", (await selectTrigger.innerText()).replace(/\s+/g, " "))
await selectTrigger.click()
await page.waitForTimeout(500)
out("select options", await page.getByRole("option").count())
const opts = await page.getByRole("option").allInnerTexts()
out("select option labels", opts.slice(0, 3))
await page.getByRole("option", { name: "سرور و دیتاسنتر" }).click().catch(async () => {
  await page.getByRole("option").nth(4).click()
})
await page.waitForTimeout(400)
out("select after choose", (await selectTrigger.innerText()).replace(/\s+/g, " "))
out("select data-value", await page.evaluate(() => document.querySelector("#consult [data-slot='select-trigger']")?.getAttribute("data-value")))

// 4. FAQ accordion
const faqTriggers = page.locator("#faq [data-slot='accordion-trigger']")
out("faq triggers", await faqTriggers.count())
await faqTriggers.nth(1).click()
await page.waitForTimeout(400)
out("faq expanded", await page.locator("#faq [data-slot='accordion-trigger'][data-panel-open]").count())

// 5. 404
const res = await page.goto("http://localhost:3000/does-not-exist", { waitUntil: "load", timeout: 60000 })
await page.waitForTimeout(500)
out("404 status", res.status())
out("404 h1", await page.locator("h1").first().innerText().catch(() => "(none)"))
out("404 body", (await page.locator("body").innerText()).split("\n").slice(0, 5))

// 6. mobile menu
await page.goto("http://localhost:3000/", { waitUntil: "load" })
await page.getByRole("heading", { level: 1 }).waitFor({ timeout: 60000 })
await page.setViewportSize({ width: 390, height: 844 })
await page.waitForTimeout(400)
await page.getByRole("button", { name: "باز کردن منو" }).click()
await page.waitForTimeout(600)
const sheet = page.getByRole("dialog")
out("mobile sheet", await sheet.count())
out("mobile search fields", await sheet.getByRole("search").count())
await sheet.locator("[data-slot='accordion-trigger']").first().click()
await page.waitForTimeout(500)
out("mobile accordion open", await sheet.locator("[data-slot='accordion-trigger'][data-panel-open]").count())
const sheetBox = await sheet.boundingBox()
out("sheet box", sheetBox)
const closeBtn = sheet.getByRole("button", { name: "بستن" })
out("close buttons", await sheet.locator("[data-slot='sheet-close']").count())
await page.keyboard.press("Escape")
await page.waitForTimeout(500)
out("sheet closed", await page.getByRole("dialog").count())

out("errors", [...new Set(errors)])
await browser.close()
