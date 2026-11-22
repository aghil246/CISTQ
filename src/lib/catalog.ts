import type { Product } from "@/data/shop"

/**
 * A product as it crosses the server → client boundary.
 *
 * `Product.icon` is a React component and can't be serialised, so the server
 * sends this shape and `CatalogProvider` attaches the category icon on the client.
 */
export type CatalogProduct = Omit<Product, "icon">
