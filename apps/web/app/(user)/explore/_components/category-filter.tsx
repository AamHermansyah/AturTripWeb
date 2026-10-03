"use client"

import { SquaresFourIcon } from "@phosphor-icons/react"
import { EXPLORE_CATEGORIES } from "@/lib/constants/explore"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { ExploreCategory } from "@/lib/explore-filters"

export function CategoryFilter({
  active,
  onChange,
}: {
  active: ExploreCategory
  onChange: (category: ExploreCategory) => void
}) {
  return (
    <ScrollArea>
      <div className="w-max px-5 pb-4">
        <ToggleGroup
          type="single"
          variant="outline"
          value={active}
          onValueChange={(value) =>
            onChange((value || "all") as ExploreCategory)
          }
          aria-label="Kategori perjalanan"
        >
          <ToggleGroupItem value="all">
            <SquaresFourIcon data-icon="inline-start" />
            Semua
          </ToggleGroupItem>
          {EXPLORE_CATEGORIES.map(({ id, label, icon: Icon }) => (
            <ToggleGroupItem key={id} value={id}>
              <Icon
                data-icon="inline-start"
                weight={active === id ? "fill" : "regular"}
              />
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
