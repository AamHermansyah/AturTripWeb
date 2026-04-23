import { CirclesThreePlusIcon } from "@phosphor-icons/react"
import {
  PersonSimpleWalkIcon,
  CompassIcon,
  MountainsIcon,
  WavesIcon,
  BuildingsIcon,
  CampfireIcon,
  GraduationCapIcon,
  MaskHappyIcon,
} from "@phosphor-icons/react/dist/ssr"

export type Role = "traveler" | "guide"
export type Interest = "hiking" | "rafting" | "city" | "camping" | "educational" | "culture" | "others"
export type TravelWith = "solo" | "family" | "group"
export type ExperienceLevel = "beginner" | "enthusiast" | "expert"

export const ROLES: {
  id: Role
  label: string
  description: string
  icon: React.ElementType
}[] = [
    {
      id: "traveler",
      label: "Saya seorang Wisatawan",
      description: "Jelajahi dan pesan pengalaman wisata terpandu yang unik.",
      icon: PersonSimpleWalkIcon,
    },
    {
      id: "guide",
      label: "Saya seorang Pemandu",
      description: "Bagikan keahlianmu dan kembangkan bisnis independenmu.",
      icon: CompassIcon,
    },
  ]

export const INTERESTS: {
  id: Interest
  label: string
  icon: React.ElementType
}[] = [
    { id: "hiking", label: "Pendakian Gunung", icon: MountainsIcon },
    { id: "rafting", label: "Arung Jeram", icon: WavesIcon },
    { id: "city", label: "Wisata Kota", icon: BuildingsIcon },
    { id: "camping", label: "Berkemah", icon: CampfireIcon },
    { id: "educational", label: "Wisata Edukasi", icon: GraduationCapIcon },
    { id: "culture", label: "Budaya Lokal", icon: MaskHappyIcon },
    { id: "others", label: "Lainnya", icon: CirclesThreePlusIcon },
  ]

export const TRAVEL_WITH: {
  id: TravelWith
  label: string
}[] = [
    { id: "solo", label: "Solo" },
    { id: "family", label: "Keluarga" },
    { id: "group", label: "Rombongan" },
  ]

export const EXPERIENCE_LEVELS: {
  id: ExperienceLevel
  label: string
  subtitle: string
  icon: React.ElementType
}[] = [
    {
      id: "beginner",
      label: "Pemula",
      subtitle: "Jalan santai dan jalur mudah",
      icon: PersonSimpleWalkIcon,
    },
    {
      id: "enthusiast",
      label: "Antusias",
      subtitle: "Pendakian sedang dan perjalanan sehari",
      icon: MountainsIcon,
    },
    {
      id: "expert",
      label: "Ahli",
      subtitle: "Pendakian teknis dan perjalanan multi-hari",
      icon: CompassIcon,
    },
  ]
