"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ProductVisual } from "@/components/shop/product-visual"
import type { Category } from "@/data/shop"
import { categories, products } from "@/data/shop"
import { formatPrice } from "@/lib/format"

const tailLinks = [
  { label: "برندها", href: "#brands" },
  { label: "پیشنهاد ویژه", href: "#offers" },
  { label: "مشاوره تخصصی", href: "#consult" },
]

function MegaContent({ category }: { category: Category }) {
  const featured = products.find((product) => product.category === category.id)

  return (
    <div className="grid w-[44rem] grid-cols-[1fr_1fr_16rem] gap-2 p-3">
      {category.menu.map((group) => (
        <div key={group.title} className="flex flex-col gap-1">
          <span className="px-2 pb-1 text-xs font-semibold text-muted-foreground">
            {group.title}
          </span>
          <ul className="flex flex-col">
            {group.items.map((item) => (
              <li key={item}>
                <NavigationMenuLink
                  render={<a href={`#category-${category.id}`} />}
                >
                  {item}
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {featured && (
        <a
          href={`#product-${featured.id}`}
          className="flex flex-col gap-2 rounded-lg border bg-muted/40 p-3 transition-colors hover:border-primary/30"
        >
          <ProductVisual
            category={featured.category}
            icon={featured.icon}
            size="hero"
          />
          <span className="text-[0.7rem] font-semibold text-primary">
            پیشنهاد شاپ‌ایکس
          </span>
          <span className="line-clamp-2 text-xs leading-5 font-medium">
            {featured.name}
          </span>
          <span className="tabular mt-auto text-sm font-bold">
            {formatPrice(featured.price)}
          </span>
        </a>
      )}
    </div>
  )
}

export function CategoryNav() {
  return (
    <NavigationMenu className="max-w-none flex-1 justify-start" align="start">
      <NavigationMenuList className="justify-start gap-0.5">
        {categories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger>
              <category.icon className="me-1 size-4 text-primary" />
              {category.title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <MegaContent category={category} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        {tailLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink
              render={<a href={link.href} />}
              className={navigationMenuTriggerStyle()}
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
