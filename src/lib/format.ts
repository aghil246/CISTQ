import { formatPersianNumber, toPersianDigits } from "@/lib/digits"

/** Format a Toman amount with Persian digits and grouping. */
export function formatToman(value: number): string {
  return formatPersianNumber(value)
}

/** Format a Toman amount with the currency suffix. */
export function formatPrice(value: number): string {
  return `${formatPersianNumber(value)} تومان`
}

/** Percentage saved relative to the pre-discount price. */
export function discountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) {
    return null
  }
  return Math.round(((oldPrice - price) / oldPrice) * 100)
}

/** Rating rendered as a Persian digit with one decimal. */
export function formatRating(rating: number): string {
  return toPersianDigits(rating.toFixed(1))
}

/** Count of reviews, grouped. */
export function formatReviews(count: number): string {
  return formatPersianNumber(count)
}
