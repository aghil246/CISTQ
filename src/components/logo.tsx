"use client"

import { cn } from "cn"

import { shop } from "@/data/shop"

type LogoProps = {
  className?: string
  /** Hide the wordmark and render only the mark. */
  markOnly?: boolean
}

export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-sky-400 text-primary-foreground shadow-sm">
        <svg
          viewBox="0 0 64 64"
          className="size-5"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth={5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="20" cy="20" r="4" fill="currentColor" stroke="none" />
          <circle cx="44" cy="20" r="4" fill="currentColor" stroke="none" />
          <circle cx="32" cy="44" r="4" fill="currentColor" stroke="none" />
          <path d="M24 22.5 29.5 39M40 22.5 34.5 39M25 20h14" />
        </svg>
      </span>
      {!markOnly && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-extrabold tracking-tight">
            {shop.name}
          </span>
          <span
            className="text-[0.65rem] font-medium tracking-[0.28em] text-muted-foreground"
            dir="ltr"
          >
            {shop.latinName.toUpperCase()}
          </span>
        </span>
      )}
    </span>
  )
}
