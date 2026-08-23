'use client'

import { useState } from "react"
import { MagnifyingGlassIcon, XCircleIcon } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { FilterDrawer } from "@/components/shared/trips/filter-drawer"

const QUICK_FILTERS = ["Semua", "Pendakian", "Berkemah", "Mudah", "Sulit", "Ramah Keluarga"]

export function TripSearch() {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState("Semua")

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <InputGroup className="h-10 flex-1">
          <InputGroupAddon>
            <MagnifyingGlassIcon />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            placeholder="Cari trip komunitas ini..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <InputGroupAddon align="inline-end">
              <button
                type="button"
                aria-label="Hapus pencarian"
                onClick={() => setQuery("")}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <XCircleIcon weight="fill" className="size-4" />
              </button>
            </InputGroupAddon>
          )}
        </InputGroup>

        <FilterDrawer />
      </div>

      <ScrollArea>
        <div className="flex w-max items-center gap-2 pb-3">
          {QUICK_FILTERS.map((label) => (
            <Button
              key={label}
              size="xs"
              variant={active === label ? "default" : "outline"}
              onClick={() => setActive(label)}
            >
              {label}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
