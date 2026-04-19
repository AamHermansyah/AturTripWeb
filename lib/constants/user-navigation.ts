import {
  CompassIcon,
  MapTrifoldIcon,
  ChatCircleDotsIcon,
  UserCircleIcon,
} from "@phosphor-icons/react"

export const NAV_ITEMS = [
  {
    href: "/explore",
    label: "Explore",
    icon: CompassIcon,
  },
  {
    href: "/trips",
    label: "Trips",
    icon: MapTrifoldIcon,
  },
  {
    href: "/inbox",
    label: "Inbox",
    icon: ChatCircleDotsIcon,
  },
  {
    href: "/profile",
    label: "Profil",
    icon: UserCircleIcon,
  },
] as const

// Paths where the navbar should be visible (exact match only)
export const VISIBLE_PATHS = new Set(["/explore", "/trips", "/inbox", "/profile"])

// Dynamic segment pattern — hide when deeper than root tab path
// e.g. /explore/123, /trips/abc/details
export const DYNAMIC_PATTERN = /^\/(explore|trips|inbox|profile)\/.+/