import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { containerClass } from "@/lib/layout"

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6">
      <div className={containerClass}>
        <div className="flex flex-col items-center gap-4 text-center">
          <Logo />
          <h1 className="font-heading text-3xl font-extrabold">
            صفحه پیدا نشد
          </h1>
          <p className="max-w-md text-sm text-muted-foreground">
            آدرسی که وارد کرده‌اید وجود ندارد یا جابه‌جا شده است.
          </p>
          <Button size="lg" render={<Link href="/" />}>
            بازگشت به صفحه اصلی
          </Button>
        </div>
      </div>
    </div>
  )
}
