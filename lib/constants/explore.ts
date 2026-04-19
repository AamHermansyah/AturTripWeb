import {
  MountainsIcon,
  WavesIcon,
  BuildingsIcon,
  CampfireIcon,
  IslandIcon,
  TreePalmIcon,
} from "@phosphor-icons/react/dist/ssr"

export type CategoryId = "mountains" | "rivers" | "city" | "camping" | "island" | "forest"

export const EXPLORE_CATEGORIES: {
  id: CategoryId
  label: string
  icon: React.ElementType
}[] = [
  { id: "mountains", label: "Pegunungan", icon: MountainsIcon },
  { id: "rivers",    label: "Sungai",     icon: WavesIcon },
  { id: "city",      label: "Kota",       icon: BuildingsIcon },
  { id: "camping",   label: "Berkemah",   icon: CampfireIcon },
  { id: "island",    label: "Pulau",      icon: IslandIcon },
  { id: "forest",    label: "Hutan",      icon: TreePalmIcon },
]
