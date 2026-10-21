"use client"

import { brands } from "@/data/shop"
import { containerClass } from "@/lib/layout"

export function BrandStrip() {
  return (
    <section id="brands" className="scroll-mt-28 border-b py-12">
      <div className={containerClass}>
        <p className="text-center text-xs font-semibold tracking-wide text-muted-foreground">
          نمایندگی و تأمین‌کننده برندهای معتبر جهانی
        </p>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {brands.map((brand) => (
            <li key={brand}>
              <a
                href="#brands"
                className="flex h-14 items-center justify-center rounded-xl border bg-card text-sm font-semibold tracking-wide text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground hover:shadow-sm"
                dir="ltr"
              >
                {brand}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
