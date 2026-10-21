"use client"

import { SectionHeading } from "@/components/shop/section-heading"
import { valueProps } from "@/data/shop"
import { containerClass } from "@/lib/layout"

export function ValueProps() {
  return (
    <section className="py-16 lg:py-20">
      <div className={containerClass}>
        <SectionHeading
          eyebrow="چرا شاپ‌ایکس؟"
          title="خریدی که خیالتان را راحت می‌کند"
          description="ما فقط فروشنده نیستیم؛ در انتخاب، خرید و راه‌اندازی تجهیزات شبکه در کنار شما هستیم."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((item) => (
            <div
              key={item.title}
              className="flex flex-col gap-4 rounded-xl border bg-card p-6 ring-1 ring-foreground/5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="size-6" strokeWidth={1.6} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-heading text-base font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
