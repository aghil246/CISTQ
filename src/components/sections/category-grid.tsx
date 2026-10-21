"use client"

import { SectionHeading } from "@/components/shop/section-heading"
import { CategoryCard } from "@/components/shop/category-card"
import { Button } from "@/components/ui/button"
import { categories } from "@/data/shop"
import { containerClass } from "@/lib/layout"

export function CategoryGrid() {
  return (
    <section id="categories" className="scroll-mt-28 py-16 lg:py-20">
      <div className={containerClass}>
        <SectionHeading
          eyebrow="دسته‌بندی محصولات"
          title="همه‌چیز برای شبکه شما، دسته‌بندی‌شده"
          description="از تجهیزات اکسس و توزیع تا امنیت و دیتاسنتر؛ محصول موردنیازتان را سریع پیدا کنید."
          action={
            <Button variant="outline" render={<a href="#products" />}>
              مشاهده همه محصولات
            </Button>
          }
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
