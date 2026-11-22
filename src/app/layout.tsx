import type { Metadata, Viewport } from "next"

import { Providers } from "@/app/providers"
import { CatalogProvider } from "@/components/catalog-provider"
import { shop } from "@/data/shop"
import { getProducts } from "@/lib/medusa"

import "./globals.css"

export const metadata: Metadata = {
  title: "شاپ‌ایکس | تجهیزات شبکه، سرور و ذخیره‌سازی",
  description:
    "شاپ‌ایکس — فروشگاه تخصصی تجهیزات شبکه، سرور و ذخیره‌سازی؛ روتر، سوئیچ، فایروال و اکسس‌پوینت اصلی با گارانتی و پشتیبانی فنی.",
  applicationName: shop.name,
  icons: { icon: "/favicon.svg" },
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const products = await getProducts()

  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth">
      <body className="antialiased">
        <CatalogProvider products={products}>
          <Providers>{children}</Providers>
        </CatalogProvider>
      </body>
    </html>
  )
}
