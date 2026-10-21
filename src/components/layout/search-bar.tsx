"use client"

import { SearchIcon } from "lucide-react"
import { cn } from "cn"

type SearchBarProps = {
  className?: string
  size?: "sm" | "lg"
}

export function SearchBar({ className, size = "lg" }: SearchBarProps) {
  return (
    <form
      role="search"
      onSubmit={(event) => event.preventDefault()}
      className={cn(
        "flex w-full items-center gap-2 rounded-xl border bg-background ps-3 pe-1 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
        size === "lg" ? "h-11" : "h-9",
        className
      )}
    >
      <SearchIcon className="size-4 shrink-0 text-muted-foreground" />
      <input
        type="search"
        name="q"
        aria-label="جستجوی محصولات"
        placeholder="جستجو در روتر، سوئیچ، سرور و فایروال…"
        className="h-full w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
      />
    </form>
  )
}
