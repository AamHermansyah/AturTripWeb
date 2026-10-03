"use client"

import { useState } from "react"
import { SlidersHorizontalIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  JOURNEY_TYPE_OPTIONS,
  DURATION_OPTIONS,
  PRICE_OPTIONS,
  RATING_OPTIONS,
} from "@/lib/constants/filter"
import {
  countTripFilters,
  DEFAULT_TRIP_FILTERS,
  type TripFilters,
} from "@/lib/explore-filters"

function FilterOptions<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: { id: T; label: string }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <FieldSet>
      <FieldLegend variant="label">{label}</FieldLegend>
      <ToggleGroup
        type="single"
        variant="outline"
        value={value}
        onValueChange={(value) => {
          if (value) onChange(value as T)
        }}
        aria-label={label}
        className="w-full flex-wrap justify-start"
      >
        {options.map((option) => (
          <ToggleGroupItem key={option.id} value={option.id}>
            {option.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </FieldSet>
  )
}

export function FilterDrawer({
  filters,
  onApply,
}: {
  filters?: TripFilters
  onApply?: (filters: TripFilters) => void
}) {
  const [open, setOpen] = useState(false)
  const [applied, setApplied] = useState<TripFilters>(DEFAULT_TRIP_FILTERS)
  const [draft, setDraft] = useState<TripFilters>(
    filters ?? DEFAULT_TRIP_FILTERS
  )
  const activeCount = countTripFilters(filters ?? applied)

  function changeOpen(nextOpen: boolean) {
    if (nextOpen) setDraft({ ...(filters ?? applied) })
    setOpen(nextOpen)
  }

  return (
    <Drawer open={open} onOpenChange={changeOpen}>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          aria-label={`Filter perjalanan${activeCount ? `, ${activeCount} aktif` : ""}`}
          className="relative shrink-0"
        >
          <SlidersHorizontalIcon data-icon="inline-start" weight="bold" />
          {activeCount > 0 && (
            <Badge variant="secondary" className="absolute -top-2 -right-2">
              {activeCount}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Filter perjalanan</DrawerTitle>
          <DrawerDescription>
            Pilih kriteria, lalu terapkan untuk memperbarui hasil.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pb-2">
          <FieldGroup className="gap-6">
            <FilterOptions
              label="Tipe perjalanan"
              options={JOURNEY_TYPE_OPTIONS}
              value={draft.type}
              onChange={(type) => setDraft({ ...draft, type })}
            />
            <FilterOptions
              label="Durasi"
              options={DURATION_OPTIONS}
              value={draft.duration}
              onChange={(duration) => setDraft({ ...draft, duration })}
            />
            <FilterOptions
              label="Rating minimum"
              options={RATING_OPTIONS}
              value={draft.rating}
              onChange={(rating) => setDraft({ ...draft, rating })}
            />
            <FilterOptions
              label="Harga"
              options={PRICE_OPTIONS}
              value={draft.price}
              onChange={(price) => setDraft({ ...draft, price })}
            />
          </FieldGroup>
        </div>
        <DrawerFooter>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setDraft({ ...DEFAULT_TRIP_FILTERS })}
            >
              Reset
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                setApplied({ ...draft })
                onApply?.({ ...draft })
                setOpen(false)
              }}
            >
              Terapkan filter
            </Button>
          </div>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Batal
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
