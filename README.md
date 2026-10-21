# شاپ‌ایکس (ShopX)

فروشگاه فارسی و راست‌چین (RTL) تجهیزات شبکه، سرور و ذخیره‌سازی — ساخته‌شده با
[FarsiUI](https://farsiui.ir) (نسخه فارسی و RTL-first کتابخانه shadcn/ui)،
Next.js (App Router) + React 19 + Tailwind CSS v4 و فونت **Estedad**.

الگوی صفحه اصلی از فروشگاه‌های تخصصی تجهیزات شبکه (مانند router-switch.com)
الهام گرفته شده است: نوار بالا، هدر با جستجو و منوی مگا، بنر، دسته‌بندی‌ها،
محصولات برگزیده با تب، برندها، مزیت‌ها، بنر پیشنهاد، پرسش‌های متداول و فوتر.

## اجرا

```bash
npm install      # فقط بار اول
npm run dev      # اجرای محیط توسعه
```

سپس آدرس نمایش‌داده‌شده در ترمینال را باز کنید (به‌صورت پیش‌فرض `http://localhost:3000`).

سایر دستورها:

```bash
npm run build     # خروجی پروداکشن در پوشه .next
npm start         # اجرای نسخه پروداکشن
npm run typecheck # بررسی تایپ‌ها
npm run lint      # اجرای ESLint
```

## فونت

فونت Estedad به‌صورت self-host از `@fontsource-variable/estedad` بارگذاری می‌شود
(زیرمجموعه‌های arabic/latin). در `src/app/globals.css` به‌عنوان `--font-sans`
تنظیم شده است.

## ساختار

```
src/
  app/
    layout.tsx    ریشه: <html lang="fa" dir="rtl">، متادیتا و پوشش‌دهنده‌ها
    page.tsx      صفحه اصلی (Server Component)
    providers.tsx پوشش‌دهنده‌های کلاینت (تم، تولتیپ، اعداد فارسی، سبد خرید)
    globals.css   استایل‌های سراسری و Tailwind
    not-found.tsx صفحه ۴۰۴
  components/
    ui/         کامپوننت‌های FarsiUI (قابل ویرایش؛ کد در اختیار شماست)
    layout/     هدر، فوتر، منوی موبایل، سبد خرید، مگا منو، نوار اعلان
    sections/   بخش‌های صفحه اصلی (هیرو، دسته‌بندی، محصولات، …)
    shop/       کارت محصول، کارت دسته‌بندی، تصویر محصول، امتیاز، عنوان بخش
  data/shop.ts  داده‌های نمونه فروشگاه (دسته‌بندی‌ها، محصولات، برندها)
  lib/          کمک‌تابع‌ها (digits، format، layout، utils)
```

## نکات پیاده‌سازی

- **RTL پیش‌فرض:** `dir="rtl"` و `lang="fa"` روی `<html>` در `src/app/layout.tsx`.
- **اعداد فارسی:** کامپوننت `PersianDigits` کل اپ را پوشش می‌دهد تا اعداد در متن
  فارسی به‌صورت ۰۱۲۳ نمایش داده شوند. کدهای فنی مدل (مانند `ISR4331/K9`) با
  `data-persian-digits="false"` لاتین نگه داشته شده‌اند.
- **قیمت‌ها** با `formatPrice` بر پایه `Intl.NumberFormat('fa-IR')` قالب‌بندی می‌شوند.
- **سبد خرید** در `CartProvider` نگه‌داری و در `localStorage` ذخیره می‌شود؛
  با کلیک روی «افزودن به سبد خرید» کشوی سبد باز می‌شود.
- **حالت تیره** با کلید `d` یا دکمه تم قابل تغییر است.
- **مرزهای Server/Client:** `layout.tsx` و `page.tsx` سرور هستند و کل درخت
  کامپوننت‌ها (به‌دلیل تعاملی بودن فروشگاه) با `"use client"` مشخص شده‌اند.
  تم و سبد خرید از `useSyncExternalStore` برای خواندن امن `localStorage`
  (بدون خطای hydration) و همگام‌سازی بین تب‌ها استفاده می‌کنند. برای بهینه‌سازی
  بیشتر می‌توان بخش‌های صرفاً نمایشی را به Server Component تبدیل کرد.
- **لینک‌دهی:** در حال حاضر از لنگرهای `#…` استفاده می‌شود؛ برای مسیرهای واقعی
  از `next/link` استفاده کنید.

## افزودن کامپوننت بیشتر FarsiUI

```bash
npx farsiui@latest add <component-name>
```

فهرست کامپوننت‌ها: `npx farsiui@latest search @farsiui`
