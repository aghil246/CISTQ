"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/shop/section-heading"
import { ProductCard } from "@/components/shop/product-card"
import type { Product } from "@/data/shop"
import { products } from "@/data/shop"
import { containerClass } from "@/lib/layout"

const tabs: { value: string; label: string; filter: (p: Product) => boolean }[] =
  [
    {
      value: "bestseller",
      label: "پرفروش‌ترین‌ها",
      filter: (product) => product.tags.includes("bestseller"),
    },
    {
      value: "new",
      label: "جدیدترین‌ها",
      filter: (product) => product.tags.includes("new"),
    },
    {
      value: "offer",
      label: "فروش ویژه",
      filter: (product) => product.tags.includes("offer"),
    },
  ]

export function FeaturedProducts() {
  return (
    <section
      id="products"
      className="scroll-mt-28 border-y bg-muted/30 py-16 lg:py-20"
    >
      <div className={containerClass}>
        <SectionHeading
          eyebrow="فروشگاه"
          title="محصولات برگزیده شاپ‌ایکس"
          description="منتخبی از پرتقاضاترین تجهیزات شبکه با قیمت رقابتی و موجودی واقعی انبار."
        />

        <Tabs defaultValue="bestseller" className="mt-8">
          <TabsList className="w-full sm:w-fit">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => {
            const items = products.filter(tab.filter).slice(0, 8)
            return (
              <TabsContent key={tab.value} value={tab.value} className="mt-8">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {items.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" render={<a href="#categories" />}>
            مشاهده همه محصولات
          </Button>
        </div>
      </div>
    </section>
  )
}
