import {
  CompassIcon,
  MapTrifoldIcon,
  ChatCircleDotsIcon,
  BookmarkSimpleIcon,
  UserCircleIcon,
} from "@phosphor-icons/react"

export const NAV_ITEMS = [
  {
    href: "/my-trips",
    label: "My Trips",
    icon: MapTrifoldIcon,
    center: false,
  },
  {
    href: "/saved",
    label: "Wishlist",
    icon: BookmarkSimpleIcon,
    center: false,
  },
  {
    href: "/explore",
    label: "Eksplor",
    icon: CompassIcon,
    center: false,
  },
  {
    href: "/inbox",
    label: "Pesan",
    icon: ChatCircleDotsIcon,
    center: false,
  },
  {
    href: "/account",
    label: "Akun",
    icon: UserCircleIcon,
    center: false,
  },
] as const

export const VISIBLE_PATHS = new Set(["/explore", "/my-trips", "/saved", "/inbox", "/account"])

export const DYNAMIC_PATTERN = /^\/(explore|trips|saved|inbox|account)\/.+/
