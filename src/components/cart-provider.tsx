"use client"

import * as React from "react"

import type { Product } from "@/data/shop"
import { products } from "@/data/shop"

export type CartLine = {
  productId: string
  quantity: number
}

type CartContextValue = {
  lines: CartLine[]
  /** Number of distinct products in the cart. */
  itemCount: number
  /** Total number of units in the cart. */
  unitCount: number
  /** Subtotal in Toman. */
  subtotal: number
  isOpen: boolean
  addItem: (product: Product, quantity?: number) => void
  removeItem: (productId: string) => void
  setQuantity: (productId: string, quantity: number) => void
  clear: () => void
  openCart: () => void
  closeCart: () => void
}

const CartContext = React.createContext<CartContextValue | undefined>(undefined)

const STORAGE_KEY = "shopx-cart"
/** Same-tab change signal (the `storage` event only fires across tabs). */
const CART_CHANGE_EVENT = "shopx:cart-change"

const EMPTY_LINES: CartLine[] = []

// The persisted cart is an external store. `useSyncExternalStore` needs a
// referentially stable snapshot, so the parsed result is memoised by raw value.
let cachedRaw: string | null = null
let cachedLines: CartLine[] = EMPTY_LINES

function isCartLine(line: unknown): line is CartLine {
  return (
    typeof line === "object" &&
    line !== null &&
    typeof (line as CartLine).productId === "string" &&
    typeof (line as CartLine).quantity === "number"
  )
}

function parseLines(raw: string | null): CartLine[] {
  if (!raw) {
    return EMPTY_LINES
  }

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return EMPTY_LINES
    }

    const lines = parsed.filter(isCartLine)
    return lines.length > 0 ? lines : EMPTY_LINES
  } catch {
    return EMPTY_LINES
  }
}

function getLinesSnapshot(): CartLine[] {
  let raw: string | null = null

  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    // Storage may be unavailable (private mode); fall back to an empty cart.
    raw = null
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw
    cachedLines = parseLines(raw)
  }

  return cachedLines
}

function getServerLinesSnapshot(): CartLine[] {
  return EMPTY_LINES
}

function subscribeToLines(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange)
  window.addEventListener(CART_CHANGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener("storage", onStoreChange)
    window.removeEventListener(CART_CHANGE_EVENT, onStoreChange)
  }
}

function writeLines(lines: CartLine[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  } catch {
    // Storage may be unavailable (private mode); the cart still works in memory.
  }

  window.dispatchEvent(new Event(CART_CHANGE_EVENT))
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = React.useSyncExternalStore(
    subscribeToLines,
    getLinesSnapshot,
    getServerLinesSnapshot
  )
  const [isOpen, setIsOpen] = React.useState(false)

  const addItem = React.useCallback((product: Product, quantity = 1) => {
    const current = getLinesSnapshot()
    const existing = current.find((line) => line.productId === product.id)

    writeLines(
      existing
        ? current.map((line) =>
            line.productId === product.id
              ? { ...line, quantity: line.quantity + quantity }
              : line
          )
        : [...current, { productId: product.id, quantity }]
    )
  }, [])

  const removeItem = React.useCallback((productId: string) => {
    writeLines(
      getLinesSnapshot().filter((line) => line.productId !== productId)
    )
  }, [])

  const setQuantity = React.useCallback(
    (productId: string, quantity: number) => {
      const current = getLinesSnapshot()

      writeLines(
        quantity <= 0
          ? current.filter((line) => line.productId !== productId)
          : current.map((line) =>
              line.productId === productId ? { ...line, quantity } : line
            )
      )
    },
    []
  )

  const clear = React.useCallback(() => writeLines([]), [])
  const openCart = React.useCallback(() => setIsOpen(true), [])
  const closeCart = React.useCallback(() => setIsOpen(false), [])

  const { itemCount, unitCount, subtotal } = React.useMemo(() => {
    let units = 0
    let total = 0
    for (const line of lines) {
      const product = products.find((item) => item.id === line.productId)
      units += line.quantity
      if (product) {
        total += product.price * line.quantity
      }
    }
    return { itemCount: lines.length, unitCount: units, subtotal: total }
  }, [lines])

  const value = React.useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      unitCount,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      setQuantity,
      clear,
      openCart,
      closeCart,
    }),
    [
      lines,
      itemCount,
      unitCount,
      subtotal,
      isOpen,
      addItem,
      removeItem,
      setQuantity,
      clear,
      openCart,
      closeCart,
    ]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = React.useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
