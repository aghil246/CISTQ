"use client"

import { ArrowLeftIcon } from "lucide-react"
import { cn } from "cn"

import type { Category } from "@/data/shop"
import { formatReviews } from "@/lib/format"

const tones: Record<string, string> = {
  routers: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  switches: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  firewalls: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  wireless: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  servers: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  storage: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon

  return (
    <a
      id={`category-${category.id}`}
      href={`#category-${category.id}`}
      className="group/cat flex h-full scroll-mt-28 flex-col gap-4 rounded-xl border bg-card p-5 text-card-foreground ring-1 ring-foreground/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "grid size-12 place-items-center rounded-xl",
            tones[category.id]
          )}
        >
          <Icon className="size-6" strokeWidth={1.6} />
        </span>
        <ArrowLeftIcon className="size-4 text-muted-foreground transition-transform group-hover/cat:-translate-x-1 group-hover/cat:text-primary" />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-base font-semibold">{category.title}</h3>
        <p className="text-xs leading-5 text-muted-foreground">
          {category.tagline}
        </p>
      </div>

      <span className="mt-auto text-xs font-medium text-muted-foreground">
        {formatReviews(category.count)}+ محصول
      </span>
    </a>
  )
}
