import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { GuideCard, type Guide } from "./guide-card"

const GUIDES: Guide[] = [
  {
    id: "1",
    name: "Budi Santoso",
    specialty: "Ahli Pendakian Gunung",
    location: "Lombok, NTB",
    rating: 4.9,
    reviewCount: 128,
    tags: ["Pendakian", "Survival"],
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "2",
    name: "Sari Dewi",
    specialty: "Pemandu Wisata Budaya",
    location: "Yogyakarta, DIY",
    rating: 4.8,
    reviewCount: 94,
    tags: ["Budaya", "Fotografi"],
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "3",
    name: "Raka Putra",
    specialty: "Instruktur Arung Jeram",
    location: "Sukabumi, Jabar",
    rating: 4.7,
    reviewCount: 76,
    tags: ["Rafting", "Kayak"],
    verified: true,
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: "4",
    name: "Lina Hapsari",
    specialty: "Pemandu Wisata Alam",
    location: "Bogor, Jabar",
    rating: 4.6,
    reviewCount: 53,
    tags: ["Berkemah", "Alam"],
    verified: false,
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
  },
]

export function FeaturedGuides() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-heading text-lg font-extrabold text-foreground">Temui Para Profesional</h2>
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
