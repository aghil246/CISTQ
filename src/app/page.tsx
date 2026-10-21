import { AnnouncementBar } from "@/components/layout/announcement-bar"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { CartSheet } from "@/components/layout/cart-sheet"
import { Hero } from "@/components/sections/hero"
import { BrandStrip } from "@/components/sections/brand-strip"
import { CategoryGrid } from "@/components/sections/category-grid"
import { FeaturedProducts } from "@/components/sections/featured-products"
import { ValueProps } from "@/components/sections/value-props"
import { Promo } from "@/components/sections/promo"
import { Faq } from "@/components/sections/faq"
import { ConsultCta } from "@/components/sections/consult-cta"

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <AnnouncementBar />
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <BrandStrip />
        <CategoryGrid />
        <FeaturedProducts />
        <ValueProps />
        <Promo />
        <Faq />
        <ConsultCta />
      </main>

      <SiteFooter />
      <CartSheet />
    </div>
  )
}
