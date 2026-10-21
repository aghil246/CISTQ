"use client"

import { ShoppingCartIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProductVisual } from "@/components/shop/product-visual"
import { StarRating } from "@/components/shop/star-rating"
import { useCart } from "@/components/cart-provider"
import type { Product } from "@/data/shop"
import { discountPercent, formatPrice, formatToman } from "@/lib/format"

const tagMeta: Record<
  Product["tags"][number],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  bestseller: { label: "پرفروش", variant: "default" },
  new: { label: "جدید", variant: "secondary" },
  offer: { label: "تخفیف ویژه", variant: "destructive" },
  refurbished: { label: "استوک", variant: "outline" },
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem, openCart } = useCart()
  const discount = discountPercent(product.price, product.oldPrice)
  const soldOut = product.stock <= 0
  const lowStock = !soldOut && product.stock <= 5

  function handleAdd() {
    if (soldOut) return
    addItem(product)
    openCart()
  }

  return (
    <Card
      id={`product-${product.id}`}
      className="group/card h-full scroll-mt-28 gap-0 overflow-hidden p-0 ring-foreground/[0.08] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:ring-primary/25"
    >
      <div className="relative">
        <a
          href={`#product-${product.id}`}
          className="block focus-visible:outline-none"
          aria-label={product.name}
        >
          <ProductVisual
            category={product.category}
            icon={product.icon}
            brand={product.brand}
            className="rounded-none"
          />
        </a>
        <div className="absolute start-2 top-2 flex flex-col items-start gap-1">
          {product.tags.map((tag) => (
            <Badge key={tag} variant={tagMeta[tag].variant}>
              {tagMeta[tag].label}
            </Badge>
          ))}
        </div>
        {discount !== null && (
          <Badge
            variant="destructive"
            className="absolute end-2 top-2 tabular bg-rose-600 text-white dark:bg-rose-600"
          >
            {discount}٪ تخفیف
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="font-medium">{product.brand}</span>
            <span className="tabular" dir="ltr" data-persian-digits="false">
              {product.model}
            </span>
          </div>
          <a
            href={`#product-${product.id}`}
            className="line-clamp-2 font-heading text-sm leading-6 font-semibold transition-colors hover:text-primary"
          >
            {product.name}
          </a>
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
          {product.blurb}
        </p>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-baseline justify-between gap-2">
            <div className="flex flex-col">
              {product.oldPrice && (
                <span className="tabular text-xs text-muted-foreground line-through">
                  {formatToman(product.oldPrice)}
                </span>
              )}
              <span className="tabular font-heading text-base font-bold">
                {formatPrice(product.price)}
              </span>
            </div>
            {soldOut ? (
              <span className="text-xs font-medium text-destructive">
                ناموجود
              </span>
            ) : lowStock ? (
              <span className="text-xs font-medium text-amber-600 dark:text-amber-500">
                تنها {product.stock} عدد
              </span>
            ) : null}
          </div>

          <Button
            className="w-full"
            size="lg"
            variant={soldOut ? "secondary" : "default"}
            disabled={soldOut}
            onClick={handleAdd}
          >
            <ShoppingCartIcon data-icon="inline-start" />
            {soldOut ? "اتمام موجودی" : "افزودن به سبد خرید"}
          </Button>
        </div>
      </div>
    </Card>
  )
}
