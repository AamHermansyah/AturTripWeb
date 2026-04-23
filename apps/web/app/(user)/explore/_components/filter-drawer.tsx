"use client"

import { useState } from "react"
import { SlidersHorizontalIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { cn } from "@/lib/utils"
import {
  JOURNEY_TYPE_OPTIONS,
  DURATION_OPTIONS,
  PRICE_OPTIONS,
  RATING_OPTIONS,
  type JourneyType,
  type Duration,
  type Rating,
  type PriceRange,
} from "@/lib/constants/filter"

function RadioChips<T extends string>({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: { id: T; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(v) => onChange(v as T)}
      className="flex flex-wrap gap-2"
    >
      {options.map(({ id, label }) => (
        <div key={id}>
          <RadioGroupItem value={id} id={`${name}-${id}`} className="sr-only" />
          <label
            htmlFor={`${name}-${id}`}
            className={cn(
              "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
              value === id
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40"
            )}
          >
            {label}
          </label>
        </div>
      ))}
    </RadioGroup>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-bold text-foreground">{title}</p>
      {children}
    </div>
  )
}

const DEFAULT_FILTERS = {
  type: "all" as JourneyType,
  duration: "1" as Duration,
  rating: "4.0" as Rating,
  price: "all" as PriceRange,
}

export function FilterDrawer() {
  const [type, setType] = useState<JourneyType>(DEFAULT_FILTERS.type)
  const [duration, setDuration] = useState<Duration>(DEFAULT_FILTERS.duration)
  const [rating, setRating] = useState<Rating>(DEFAULT_FILTERS.rating)
  const [price, setPrice] = useState<PriceRange>(DEFAULT_FILTERS.price)

  const handleReset = () => {
    setType(DEFAULT_FILTERS.type)
    setDuration(DEFAULT_FILTERS.duration)
    setRating(DEFAULT_FILTERS.rating)
    setPrice(DEFAULT_FILTERS.price)
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button
          aria-label="Filter"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-opacity active:opacity-80"
        >
          <SlidersHorizontalIcon weight="bold" />
        </button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-lg font-extrabold">Filter Perjalanan</DrawerTitle>
        </DrawerHeader>

        <div className="flex flex-col gap-6 overflow-y-auto px-4 pb-2">
          <FilterSection title="Tipe Perjalanan">
            <RadioChips name="type" options={JOURNEY_TYPE_OPTIONS} value={type} onChange={setType} />
          </FilterSection>

          <FilterSection title="Durasi">
            <RadioChips name="duration" options={DURATION_OPTIONS} value={duration} onChange={setDuration} />
          </FilterSection>

          <FilterSection title="Rating Minimum">
            <RadioChips name="rating" options={RATING_OPTIONS} value={rating} onChange={setRating} />
          </FilterSection>

          <FilterSection title="Maksimum Harga">
            <RadioChips name="price" options={PRICE_OPTIONS} value={price} onChange={setPrice} />
          </FilterSection>
        </div>

        <DrawerFooter className="flex-row gap-2">
          <Button variant="outline" className="flex-1" onClick={handleReset}>
            Reset
          </Button>
          <DrawerClose asChild>
            <Button className="flex-1">Terapkan Filter</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
