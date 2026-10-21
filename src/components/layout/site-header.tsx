"use client"

import { HeadphonesIcon, ShoppingCartIcon, UserIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SearchBar } from "@/components/layout/search-bar"
import { CategoryNav } from "@/components/layout/mega-menu"
import { useCart } from "@/components/cart-provider"
import { shop } from "@/data/shop"
import { containerClass } from "@/lib/layout"

function CartButton() {
  const { unitCount, openCart } = useCart()

  return (
    <Button
      variant="outline"
      size="lg"
      className="relative gap-2"
      onClick={openCart}
      aria-label="سبد خرید"
    >
      <ShoppingCartIcon data-icon="inline-start" />
      <span className="hidden sm:inline">سبد خرید</span>
      {unitCount > 0 && (
        <Badge
          className="tabular absolute -end-2 -top-2 h-5 min-w-5 justify-center px-1"
          aria-label={`${unitCount} کالا در سبد`}
        >
          {unitCount}
        </Badge>
      )}
    </Button>
  )
}

export function SiteHeader() {
  return (
    <header
      id="top"
      className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/70"
    >
      <div className={containerClass}>
        <div className="flex h-16 items-center gap-3">
          <MobileNav />

          <a href="#top" className="shrink-0">
            <Logo />
          </a>

          <div className="mx-2 hidden flex-1 md:block">
            <SearchBar />
          </div>

          <div className="ms-auto flex items-center gap-1.5">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="lg"
              className="hidden gap-2 lg:inline-flex"
              render={<a href="#login" />}
            >
              <UserIcon data-icon="inline-start" />
              ورود / ثبت‌نام
            </Button>
            <CartButton />
          </div>
        </div>

        <div className="pb-3 md:hidden">
          <SearchBar size="sm" />
        </div>
      </div>

      <div className="hidden border-t lg:block">
        <div
          className={`${containerClass} flex h-12 items-center justify-between gap-6`}
        >
          <CategoryNav />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <HeadphonesIcon className="size-4 text-primary" />
            <span>پشتیبانی تخصصی:</span>
            <a
              href={`tel:${shop.phoneHref}`}
              className="tabular font-semibold text-foreground hover:text-primary"
              dir="ltr"
            >
              {shop.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
