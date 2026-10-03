"use client"

import { useId } from "react"
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { FilterDrawer } from "@/components/shared/trips/filter-drawer"
import type { TripFilters } from "@/lib/explore-filters"
import { GROUP_QUICK_FILTERS, type GroupQuickFilter } from "@/lib/group-trip-filters"

export function TripSearch({ query, onQueryChange, quick, onQuickChange, filters, onApplyFilters }: {
  query: string; onQueryChange: (value: string) => void; quick: GroupQuickFilter; onQuickChange: (value: GroupQuickFilter) => void;
  filters: TripFilters; onApplyFilters: (filters: TripFilters) => void
}) {
  const id = useId()
  return <div className="flex flex-col gap-3"><div className="flex items-end gap-3"><Field className="flex-1"><FieldLabel htmlFor={id} className="sr-only">Cari nama trip atau lokasi grup ini</FieldLabel><InputGroup><InputGroupAddon><MagnifyingGlassIcon /></InputGroupAddon><InputGroupInput id={id} type="search" placeholder="Cari trip atau lokasi grup" value={query} onChange={event => onQueryChange(event.target.value)} />{query && <InputGroupAddon align="inline-end"><InputGroupButton size="icon-sm" aria-label="Hapus pencarian" onClick={() => onQueryChange("")}><XIcon /></InputGroupButton></InputGroupAddon>}</InputGroup></Field><FilterDrawer filters={filters} onApply={onApplyFilters} /></div><ToggleGroup type="single" variant="outline" value={quick} onValueChange={value => { if (value) onQuickChange(value as GroupQuickFilter) }} className="flex flex-wrap justify-start" aria-label="Kategori cepat trip grup">{Object.entries(GROUP_QUICK_FILTERS).map(([value, label]) => <ToggleGroupItem key={value} value={value}>{label}</ToggleGroupItem>)}</ToggleGroup></div>
}
