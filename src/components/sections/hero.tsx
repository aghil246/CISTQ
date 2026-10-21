"use client"

import {
  ArrowLeftIcon,
  BadgeCheckIcon,
  HeadphonesIcon,
  TruckIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { categories, heroStats } from "@/data/shop"
import { containerClass } from "@/lib/layout"
import { formatReviews } from "@/lib/format"

export function Hero() {
  const featured = categories.slice(0, 4)

  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/40 to-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 start-1/3 size-[32rem] rounded-full bg-primary/10 blur-3xl"
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className={`${containerClass} relative`}>
        <div className="grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-20">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <BadgeCheckIcon className="size-3.5 text-primary" />
              Original ICT Hardware · تأمین‌کننده تجهیزات اورجینال
            </span>

            <h1 className="font-heading text-3xl leading-[1.25] font-extrabold tracking-tight sm:text-4xl lg:text-[2.6rem]">
              خرید آسان و مطمئن
              <br />
              <span className="text-primary">تجهیزات شبکه و دیتاسنتر</span>
            </h1>

            <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              از روتر و سوئیچ سازمانی تا فایروال، سرور و ذخیره‌سازی؛ همه در یک
              فروشگاه با موجودی واقعی، گارانتی اصالت کالا و پشتیبانی فنی
              تخصصی در تمام مراحل انتخاب و راه‌اندازی.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button size="lg" render={<a href="#products" />}>
                مشاهده محصولات
                <ArrowLeftIcon data-icon="inline-end" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                render={<a href="#consult" />}
              >
                <HeadphonesIcon data-icon="inline-start" />
                مشاوره تخصصی رایگان
              </Button>
            </div>

            <dl className="mt-2 grid w-full grid-cols-2 gap-6 sm:grid-cols-4">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <dt className="tabular font-heading text-xl font-bold">
                    {stat.value}
                  </dt>
                  <dd className="text-xs text-muted-foreground">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4 rounded-2xl border bg-card p-4 shadow-xl ring-1 ring-foreground/5">
              {featured.map((category) => (
                <a
                  key={category.id}
                  href={`#category-${category.id}`}
                  className="group flex flex-col gap-3 rounded-xl border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <span className="grid size-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <category.icon className="size-5" />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="font-heading text-sm font-semibold">
                      {category.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatReviews(category.count)}+ محصول
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="absolute -bottom-5 -start-4 flex items-center gap-2.5 rounded-xl border bg-background/95 p-3 shadow-lg backdrop-blur">
              <span className="grid size-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-500">
                <TruckIcon className="size-4" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-semibold">موجودی آماده ارسال</span>
                <span className="text-[0.7rem] text-muted-foreground">
                  ارسال سریع به سراسر کشور
                </span>
              </span>
            </div>

            <div className="absolute -top-4 -end-3 flex items-center gap-2.5 rounded-xl border bg-background/95 p-3 shadow-lg backdrop-blur">
              <span className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <HeadphonesIcon className="size-4" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs font-semibold">پشتیبانی ۲۴/۷</span>
                <span className="text-[0.7rem] text-muted-foreground">
                  تیم مهندسی شبکه
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
