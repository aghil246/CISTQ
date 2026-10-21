"use client"

import { PhoneIcon, SparklesIcon, TruckIcon } from "lucide-react"

import { shop } from "@/data/shop"
import { containerClass } from "@/lib/layout"

export function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-l from-primary to-sky-500 text-primary-foreground">
      <div
        className={`${containerClass} flex h-9 items-center justify-between gap-4 text-xs`}
      >
        <p className="flex items-center gap-2 font-medium">
          <TruckIcon className="size-3.5" />
          <span className="hidden sm:inline">
            ارسال رایگان سفارش‌های بالای ۵۰ میلیون تومان
          </span>
          <span className="sm:hidden">ارسال رایگان سفارش‌های بزرگ</span>
        </p>

        <div className="flex items-center gap-4">
          <a
            href="#offers"
            className="hidden items-center gap-1.5 font-medium transition-opacity hover:opacity-80 md:flex"
          >
            <SparklesIcon className="size-3.5" />
            پیشنهادهای ویژه هفته
          </a>
          <a
            href={`tel:${shop.phoneHref}`}
            className="tabular flex items-center gap-1.5 font-medium transition-opacity hover:opacity-80"
            dir="ltr"
          >
            <PhoneIcon className="size-3.5" />
            {shop.phone}
          </a>
        </div>
      </div>
    </div>
  )
}
