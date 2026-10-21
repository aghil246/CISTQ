"use client"

import { StarIcon } from "lucide-react"
import { cn } from "cn"

import { formatRating, formatReviews } from "@/lib/format"

type StarRatingProps = {
  rating: number
  reviews?: number
  className?: string
}

export function StarRating({ rating, reviews, className }: StarRatingProps) {
  const rounded = Math.round(rating)
  return (
    <div
      className={cn("flex items-center gap-1.5 text-xs", className)}
      aria-label={`امتیاز ${formatRating(rating)} از ۵`}
    >
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className={cn(
              "size-3.5",
              index < rounded
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-muted-foreground/40"
            )}
          />
        ))}
      </span>
      <span className="tabular font-medium">{formatRating(rating)}</span>
      {reviews !== undefined && (
        <span className="text-muted-foreground">
          ({formatReviews(reviews)} نظر)
        </span>
      )}
    </div>
  )
}
