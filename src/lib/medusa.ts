import { categories, products as demoProducts } from "@/data/shop"
import type { CategoryId, Product } from "@/data/shop"
import type { CatalogProduct } from "@/lib/catalog"

/**
 * Medusa Store API client (server-side only).
 *
 * Env:
 *  - NEXT_PUBLIC_MEDUSA_BACKEND_URL      e.g. https://medusa-production-xxxx.up.railway.app
 *  - NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY  pk_... (Settings → Publishable API Keys)
 *
 * When either is missing, or Medusa can't be reached, the demo catalog from
 * `@/data/shop` is used so the storefront never renders empty because of an outage.
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(/\/$/, "")
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY

/** The Medusa region currency is IRR (rial); the storefront prices in Toman. */
const RIAL_PER_TOMAN = 10
/** Re-fetch the catalog at most once per this many seconds (ISR). */
const REVALIDATE_SECONDS = 60
/** Stock shown when a product doesn't declare `metadata.stock`. */
const DEFAULT_STOCK = 999

const CATEGORY_IDS: readonly string[] = categories.map((category) => category.id)
const TAGS: readonly string[] = ["bestseller", "new", "offer", "refurbished"]

type MedusaRegion = { id: string; currency_code: string }

type MedusaVariant = {
  sku: string | null
  calculated_price?: {
    calculated_amount: number | null
    original_amount: number | null
  } | null
}

type MedusaProduct = {
  id: string
  title: string
  subtitle: string | null
  description: string | null
  metadata?: Record<string, unknown> | null
  variants?: MedusaVariant[] | null
  categories?: { handle: string }[] | null
  tags?: { value: string }[] | null
}

async function medusaFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${BACKEND_URL}${path}`, {
    headers: { "x-publishable-api-key": PUBLISHABLE_KEY ?? "" },
    next: { revalidate: REVALIDATE_SECONDS },
  })

  if (!response.ok) {
    throw new Error(`Medusa ${response.status} on ${path}`)
  }

  return (await response.json()) as T
}

function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === "string" && CATEGORY_IDS.includes(value)
}

function isTag(value: string): value is Product["tags"][number] {
  return TAGS.includes(value)
}

function toText(value: unknown): string {
  return typeof value === "string" ? value : ""
}

function toNumber(value: unknown, fallback = 0): number {
  const number = Number(value)
  return value !== null && value !== "" && Number.isFinite(number)
    ? number
    : fallback
}

function toProduct(item: MedusaProduct): CatalogProduct | null {
  const variant = item.variants?.find(
    (entry) => entry.calculated_price?.calculated_amount != null
  )
  const amount = variant?.calculated_price?.calculated_amount

  // No price in this region's currency → the item can't be sold, so skip it.
  if (!variant || amount == null) {
    return null
  }

  const original = variant.calculated_price?.original_amount ?? amount
  const price = Math.round(amount / RIAL_PER_TOMAN)
  const oldPrice =
    original > amount ? Math.round(original / RIAL_PER_TOMAN) : undefined

  const metadata = item.metadata ?? {}
  // Category: Medusa category handle first, then `metadata.category`. A product
  // with neither lands in "routers" so it stays visible while data is incomplete.
  const category: CategoryId =
    [...(item.categories ?? []).map((entry) => entry.handle), metadata.category]
      .filter(isCategoryId)
      .at(0) ?? "routers"

  return {
    id: item.id,
    name: item.title,
    brand: toText(metadata.brand),
    model: toText(metadata.model) || variant.sku || "",
    category,
    price,
    ...(oldPrice ? { oldPrice } : {}),
    rating: toNumber(metadata.rating),
    reviews: toNumber(metadata.reviews),
    stock: Math.max(0, toNumber(metadata.stock, DEFAULT_STOCK)),
    tags: (item.tags ?? [])
      .map((tag) => tag.value.toLowerCase())
      .filter(isTag),
    blurb: item.subtitle ?? item.description ?? "",
  }
}

function demoCatalog(): CatalogProduct[] {
  return demoProducts.map(({ icon, ...rest }) => {
    void icon
    return rest
  })
}

export async function getProducts(): Promise<CatalogProduct[]> {
  if (!BACKEND_URL || !PUBLISHABLE_KEY) {
    return demoCatalog()
  }

  try {
    const { regions } = await medusaFetch<{ regions: MedusaRegion[] }>(
      "/store/regions"
    )
    const region = regions.find((entry) => entry.currency_code === "irr") ?? regions[0]

    if (!region) {
      throw new Error("Medusa has no regions")
    }

    // URLSearchParams encodes `+` as %2B, which Medusa reads as "add this field".
    const query = new URLSearchParams({
      limit: "100",
      region_id: region.id,
      fields: "*variants.calculated_price,*categories,*tags,+metadata",
    })
    const { products } = await medusaFetch<{ products: MedusaProduct[] }>(
      `/store/products?${query.toString()}`
    )

    return products
      .map(toProduct)
      .filter((product): product is CatalogProduct => product !== null)
  } catch (error) {
    console.error("[medusa] using demo catalog:", error)
    return demoCatalog()
  }
}
