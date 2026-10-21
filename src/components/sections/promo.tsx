"use client"

import { ArrowLeftIcon, BoxesIcon, LifeBuoyIcon, WrenchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { containerClass } from "@/lib/layout"

const highlights = [
  { value: "٪۹۸", label: "سفارش‌ها با موجودی آماده ارسال" },
  { value: "۲۴ ساعت", label: "میانگین زمان آماده‌سازی سفارش" },
  { value: "۵۰+", label: "برند و تأمین‌کننده معتبر" },
  { value: "۱۰۰٪", label: "اصالت کالا با گارانتی رسمی" },
]

const capabilities = [
  { icon: BoxesIcon, title: "انبار فعال", text: "موجودی واقعی تجهیزات پرمصرف" },
  { icon: WrenchIcon, title: "نصب و راه‌اندازی", text: "پیکربندی تخصصی تجهیزات" },
  { icon: LifeBuoyIcon, title: "پشتیبانی فنی", text: "همراهی مهندسان شبکه" },
]

export function Promo() {
  return (
    <section id="offers" className="scroll-mt-28 pb-16 lg:pb-20">
      <div className={containerClass}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-bl from-primary via-primary to-sky-600 p-8 text-primary-foreground lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 -end-10 size-64 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-6">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                پیشنهاد ویژه سازمانی
              </span>
              <h2 className="font-heading text-2xl leading-snug font-extrabold sm:text-3xl">
                تأمین تجهیزات شبکه با قیمت پروژه‌ای و شرایط اعتباری
              </h2>
              <p className="max-w-lg text-sm leading-7 text-primary-foreground/85">
                برای پروژه‌های راه‌اندازی و توسعه زیرساخت، پیش‌فاکتور تخصصی و
                تخفیف حجمی دریافت کنید. کارشناسان ما مناسب‌ترین ترکیب سخت‌افزاری
                را برای سازمان شما پیشنهاد می‌دهند.
              </p>

              <ul className="flex flex-wrap gap-3">
                {capabilities.map((cap) => (
                  <li
                    key={cap.title}
                    className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2"
                  >
                    <cap.icon className="size-4" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-xs font-semibold">{cap.title}</span>
                      <span className="text-[0.7rem] text-primary-foreground/75">
                        {cap.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  render={<a href="#consult" />}
                >
                  درخواست پیش‌فاکتور
                  <ArrowLeftIcon data-icon="inline-end" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 bg-transparent text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
                  render={<a href="#categories" />}
                >
                  مشاهده دسته‌بندی‌ها
                </Button>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col gap-1.5 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-sm"
                >
                  <dt className="tabular font-heading text-2xl font-extrabold">
                    {item.value}
                  </dt>
                  <dd className="text-xs leading-5 text-primary-foreground/80">
                    {item.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
