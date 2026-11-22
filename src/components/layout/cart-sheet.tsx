"use client"

import { MinusIcon, PlusIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ProductVisual } from "@/components/shop/product-visual"
import { useCart } from "@/components/cart-provider"
import { useCatalog } from "@/components/catalog-provider"
import { formatPrice } from "@/lib/format"

export function CartSheet() {
  const products = useCatalog()
  const {
    lines,
    unitCount,
    subtotal,
    isOpen,
    closeCart,
    removeItem,
    setQuantity,
    clear,
  } = useCart()

  const detailed = lines
    .map((line) => ({
      line,
      product: products.find((item) => item.id === line.productId),
    }))
    .filter((entry) => entry.product !== undefined)

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? null : closeCart())}>
      <SheetContent side="left" className="w-full gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCartIcon className="size-4 text-primary" />
            سبد خرید
            {unitCount > 0 && (
              <Badge variant="secondary" className="tabular">
                {unitCount} کالا
              </Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            تجهیزات انتخابی شما آماده بررسی و ثبت سفارش است.
          </SheetDescription>
        </SheetHeader>

        {detailed.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="grid size-16 place-items-center rounded-full bg-muted text-muted-foreground">
              <ShoppingCartIcon className="size-7" />
            </span>
            <div className="flex flex-col gap-1">
              <p className="font-medium">سبد خرید شما خالی است</p>
              <p className="text-sm text-muted-foreground">
                از میان روترها، سوئیچ‌ها و سرورها انتخاب کنید.
              </p>
            </div>
            <Button onClick={closeCart} render={<a href="#products" />}>
              مشاهده محصولات
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4">
              <ul className="flex flex-col divide-y">
                {detailed.map(({ line, product }) => (
                  <li key={line.productId} className="flex gap-3 py-4">
                    <ProductVisual
                      category={product!.category}
                      icon={product!.icon}
                      className="size-20 shrink-0"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                      <a
                        href={`#product-${product!.id}`}
                        className="line-clamp-2 text-sm leading-5 font-medium hover:text-primary"
                      >
                        {product!.name}
                      </a>
                      <span
                        className="text-xs text-muted-foreground"
                        dir="ltr"
                        data-persian-digits="false"
                      >
                        {product!.model}
                      </span>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <div className="flex items-center rounded-lg border">
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label="افزایش تعداد"
                            onClick={() =>
                              setQuantity(line.productId, line.quantity + 1)
                            }
                          >
                            <PlusIcon />
                          </Button>
                          <span className="tabular w-8 text-center text-sm">
                            {line.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            aria-label="کاهش تعداد"
                            onClick={() =>
                              setQuantity(line.productId, line.quantity - 1)
                            }
                          >
                            <MinusIcon />
                          </Button>
                        </div>
                        <span className="tabular text-sm font-semibold">
                          {formatPrice(product!.price * line.quantity)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="self-start text-muted-foreground hover:text-destructive"
                      aria-label="حذف از سبد"
                      onClick={() => removeItem(line.productId)}
                    >
                      <Trash2Icon />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <SheetFooter className="border-t bg-muted/40">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">جمع کالاها</span>
                <span className="tabular font-heading text-base font-bold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                هزینه ارسال و مالیات در مرحله پرداخت محاسبه می‌شود.
              </p>
              <Separator />
              <Button size="lg" className="w-full">
                ادامه فرآیند خرید
              </Button>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={closeCart}>
                  ادامه خرید
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={clear}
                >
                  خالی کردن سبد
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
