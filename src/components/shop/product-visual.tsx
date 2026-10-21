"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "cn"

import type { CategoryId } from "@/data/shop"

const tones: Record<CategoryId, string> = {
  routers:
    "from-blue-500/20 via-blue-500/5 to-transparent text-blue-600 dark:text-blue-400",
  switches:
    "from-indigo-500/20 via-indigo-500/5 to-transparent text-indigo-600 dark:text-indigo-400",
  firewalls:
    "from-rose-500/20 via-rose-500/5 to-transparent text-rose-600 dark:text-rose-400",
  wireless:
    "from-sky-500/20 via-sky-500/5 to-transparent text-sky-600 dark:text-sky-400",
  servers:
    "from-violet-500/20 via-violet-500/5 to-transparent text-violet-600 dark:text-violet-400",
  storage:
    "from-emerald-500/20 via-emerald-500/5 to-transparent text-emerald-600 dark:text-emerald-400",
}

type ProductVisualProps = {
  category: CategoryId
  icon: LucideIcon
  brand?: string
  className?: string
  size?: "card" | "hero"
}

/** A lightweight, asset-free product illustration used across cards and hero. */
export function ProductVisual({
  category,
  icon: Icon,
  brand,
  className,
  size = "card",
}: ProductVisualProps) {
  return (
    <div
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-xl bg-gradient-to-br",
        tones[category],
        size === "card" ? "aspect-[4/3]" : "aspect-square",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:22px_22px] opacity-[0.06]"
      />
      <div
        aria-hidden="true"
        className="absolute -end-6 -top-8 size-28 rounded-full bg-current opacity-[0.08] blur-2xl"
      />
      <Icon
        aria-hidden="true"
        className={cn(
          "relative drop-shadow-sm",
          size === "card" ? "size-14" : "size-24"
        )}
        strokeWidth={1.4}
      />
      {brand && (
        <span className="absolute bottom-2 end-2 rounded-md bg-background/70 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-foreground/70 backdrop-blur-sm">
          {brand}
        </span>
      )}
    </div>
  )
}
