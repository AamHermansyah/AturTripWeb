"use client"

import { useState } from "react"
import { EXPLORE_CATEGORIES, type CategoryId } from "@/lib/constants/explore"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"

export function CategoryFilter() {
  const [active, setActive] = useState<CategoryId>("mountains")

  return (
    <ScrollArea>
      <div className="flex w-max gap-2 px-5 pb-4">
        {EXPLORE_CATEGORIES.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <Button
              key={id}
              onClick={() => setActive(id)}
              size="sm"
              variant={isActive ? 'default' : 'outline'}
            >
              <Icon size={16} weight={isActive ? "fill" : "regular"} />
              {label}
            </Button>
          )
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
