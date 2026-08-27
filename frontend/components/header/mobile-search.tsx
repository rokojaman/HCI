"use client"

import * as React from "react"
import { Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchAutocomplete } from "@/components/search/search-autocomplete"
import type { Category } from "@/lib/dummyjson"

function MobileSearch({
  children,
  categories,
}: {
  children: React.ReactNode
  categories: Category[]
}) {
  const [open, setOpen] = React.useState(false)

  if (open) {
    return (
      <div className="absolute inset-0 z-50 flex items-center gap-2 bg-background px-4 sm:px-6 md:hidden">
        <SearchAutocomplete
          variant="mobile"
          categories={categories}
          onNavigate={() => setOpen(false)}
          trailing={
            <Button
              variant="outline"
              size="icon"
              aria-label="Close search"
              className="rounded-full"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          }
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 md:hidden">
      <Button
        variant="outline"
        size="icon"
        aria-label="Search"
        onClick={() => setOpen(true)}
      >
        <Search />
      </Button>
      {children}
    </div>
  )
}

export { MobileSearch }
