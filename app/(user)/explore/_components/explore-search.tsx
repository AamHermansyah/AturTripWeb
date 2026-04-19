import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { FilterDrawer } from "./filter-drawer"

export function ExploreSearch() {
  return (
    <div className="flex items-center gap-3 px-5 pb-4">
      <InputGroup className="flex-1 h-10">
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          placeholder="Cari apapun disini ya^^"
        />
      </InputGroup>
      <FilterDrawer />
    </div>
  )
}
