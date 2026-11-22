"use client"

import * as React from "react"

import type { Product } from "@/data/shop"
import { getCategory } from "@/data/shop"
import type { CatalogProduct } from "@/lib/catalog"

const CatalogContext = React.createContext<Product[] | undefined>(undefined)

/**
 * Makes the server-fetched catalog available to client components.
 * Category icons are components, so they're attached here instead of being
 * sent from the server.
 */
export function CatalogProvider({
  products,
  children,
}: {
  products: CatalogProduct[]
  children: React.ReactNode
}) {
  const catalog = React.useMemo<Product[]>(
    () =>
      products.map((product) => ({
        ...product,
        icon: getCategory(product.category).icon,
      })),
    [products]
  )

  return (
    <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>
  )
}

export function useCatalog(): Product[] {
  const catalog = React.useContext(CatalogContext)
  if (catalog === undefined) {
    throw new Error("useCatalog must be used within a CatalogProvider")
  }
  return catalog
}
