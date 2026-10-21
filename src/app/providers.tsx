"use client"

import * as React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { PersianDigits } from "@/components/ui/persian-digits"
import { CartProvider } from "@/components/cart-provider"

/**
 * Client-side context providers shared by every route.
 *
 * `ThemeProvider` reads `localStorage`/`matchMedia`, `CartProvider` persists the
 * cart, and `PersianDigits` walks the element tree with `React.Children`. All of
 * them must therefore run on the client.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <PersianDigits>
          <CartProvider>{children}</CartProvider>
        </PersianDigits>
      </TooltipProvider>
    </ThemeProvider>
  )
}
