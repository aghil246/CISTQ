"use client"

import { SendIcon, SparklesIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { categories, shop } from "@/data/shop"
import { containerClass } from "@/lib/layout"

export function ConsultCta() {
  return (
    <section id="consult" className="scroll-mt-28 border-t bg-muted/30 py-16 lg:py-20">
      <div className={containerClass}>
        <div className="grid items-center gap-10 rounded-2xl border bg-card p-8 shadow-sm lg:grid-cols-2 lg:p-12">
          <div className="flex flex-col items-start gap-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <SparklesIcon className="size-3.5" />
              مشاوره تخصصی رایگان
            </span>
            <h2 className="font-heading text-2xl leading-snug font-bold sm:text-3xl">
              مطمئن نیستید کدام تجهیزات مناسب شبکه شماست؟
            </h2>
            <p className="max-w-lg text-sm leading-7 text-muted-foreground">
              شماره تماس خود را بگذارید؛ کارشناسان {shop.name} در سریع‌ترین زمان
              با شما تماس می‌گیرند و با توجه به ابعاد و نیاز شبکه، پیشنهاد فنی و
              قیمت ارائه می‌دهند.
            </p>

            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>• تحلیل نیاز و طراحی توپولوژی شبکه</li>
              <li>• پیش‌فاکتور و قیمت‌گذاری سازمانی</li>
              <li>• همراهی در نصب، راه‌اندازی و پشتیبانی</li>
            </ul>
          </div>

          <form
            onSubmit={(event) => event.preventDefault()}
            className="flex flex-col gap-4 rounded-xl border bg-background p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium">نام و نام خانوادگی</span>
                <Input placeholder="مثلاً سارا محمدی" />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium">شماره تماس</span>
                <Input
                  type="tel"
                  dir="ltr"
                  placeholder="0912 000 0000"
                  className="text-end"
                />
              </label>
            </div>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium">دسته‌بندی موردنیاز</span>
              <Select
                items={categories.map((category) => ({
                  value: category.id,
                  label: category.title,
                }))}
                defaultValue="routers"
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm">
              <span className="font-medium">توضیح نیاز (اختیاری)</span>
              <textarea
                rows={3}
                placeholder="تعداد کاربران، کاربرد شبکه و بودجه تقریبی…"
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </label>

            <Button size="lg" type="submit" className="w-full">
              <SendIcon data-icon="inline-start" />
              دریافت مشاوره رایگان
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              اطلاعات شما محرمانه است و صرفاً برای تماس کارشناسان استفاده می‌شود.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
