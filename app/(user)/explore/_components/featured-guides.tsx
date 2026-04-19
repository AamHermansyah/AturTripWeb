import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { GuideCard, type Guide } from "./guide-card"

const GUIDES: Guide[] = [
  {
    id: "1",
    name: "Budi Santoso",
    specialty: "Ahli Pendakian Gunung",
    rating: 4.9,
    tags: ["Pendakian", "Survival"],
    verified: true,
  },
  {
    id: "2",
    name: "Sari Dewi",
    specialty: "Pemandu Wisata Budaya",
    rating: 4.8,
    tags: ["Budaya", "Fotografi"],
    verified: true,
  },
  {
    id: "3",
    name: "Raka Putra",
    specialty: "Instruktur Arung Jeram",
    rating: 4.7,
    tags: ["Rafting", "Kayak"],
    verified: true,
  },
  {
    id: "4",
    name: "Lina Hapsari",
    specialty: "Pemandu Wisata Alam",
    rating: 4.6,
    tags: ["Berkemah", "Alam"],
    verified: false,
  },
]

export function FeaturedGuides() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="text-base font-extrabold text-foreground">Temui Para Profesional</h2>
        <Link href="/explore/guides" className="text-sm font-semibold text-primary">
          Lihat Semua
        </Link>
      </div>
      <ScrollArea>
        <div className="flex gap-3 px-5 pb-4 w-max">
          {GUIDES.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
