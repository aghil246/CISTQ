"use client"

import * as React from "react"
import { LogInIcon, MenuIcon, PhoneIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "@/components/logo"
import { SearchBar } from "@/components/layout/search-bar"
import { categories, shop } from "@/data/shop"

const quickLinks = [
  { label: "پیشنهادهای ویژه", href: "#offers" },
  { label: "برندها", href: "#brands" },
  { label: "مشاوره تخصصی", href: "#consult" },
  { label: "وبلاگ فنی", href: "#blog" },
]

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="باز کردن منو"
          />
        }
      >
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="w-[86%] gap-0 p-0 sm:max-w-sm">
        <SheetHeader className="border-b">
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <div className="py-4">
            <SearchBar size="sm" />
          </div>

          <Accordion className="border-t">
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger>
                  <span className="flex items-center gap-2">
                    <category.icon className="size-4 text-primary" />
                    {category.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-3">
                    {category.menu.map((group) => (
                      <div key={group.title} className="flex flex-col gap-1.5">
                        <span className="text-xs font-semibold text-muted-foreground">
                          {group.title}
                        </span>
                        <ul className="flex flex-col gap-1.5">
                          {group.items.map((item) => (
                            <li key={item}>
                              <a
                                href={`#category-${category.id}`}
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                onClick={() => setOpen(false)}
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <ul className="flex flex-col gap-1 py-4">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 rounded-xl bg-muted/60 p-4">
            <a
              href={`tel:${shop.phoneHref}`}
              className="tabular flex items-center gap-2 text-sm font-semibold"
              dir="ltr"
            >
              <PhoneIcon className="size-4 text-primary" />
              {shop.phone}
            </a>
            <p className="text-xs leading-5 text-muted-foreground">
              {shop.hours}
            </p>
            <Button className="w-full" render={<a href="#login" />}>
              <LogInIcon data-icon="inline-start" />
              ورود / ثبت‌نام
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
