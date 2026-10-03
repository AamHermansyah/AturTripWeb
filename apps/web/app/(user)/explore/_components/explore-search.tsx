"use client"

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Field, FieldLabel } from "@/components/ui/field"
import { FilterDrawer } from "@/components/shared/trips/filter-drawer"
import type { TripFilters } from "@/lib/explore-filters"

export function ExploreSearch({
  query,
  onQueryChange,
  filters,
  onApplyFilters,
}: {
  query: string
  onQueryChange: (query: string) => void
  filters: TripFilters
  onApplyFilters: (filters: TripFilters) => void
}) {
  return (
    <div className="flex items-end gap-3 px-5 pb-4">
      <Field className="flex-1">
        <FieldLabel htmlFor="explore-query" className="sr-only">
          Cari nama trip atau lokasi
        </FieldLabel>
        <InputGroup>
          <InputGroupAddon>
            <MagnifyingGlassIcon />
          </InputGroupAddon>
          <InputGroupInput
            id="explore-query"
            type="search"
            placeholder="Cari trip atau lokasi"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          {query && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-sm"
                aria-label="Hapus pencarian"
                onClick={() => onQueryChange("")}
              >
                <XIcon />
              </InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </Field>
      <FilterDrawer filters={filters} onApply={onApplyFilters} />
    </div>
  )
}
