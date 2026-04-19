import Link from "next/link"
import { JourneyCard, type Journey } from "./journey-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const JOURNEYS: Journey[] = [
  {
    id: "1",
    title: "Pendakian Rinjani Summit",
    location: "Lombok, NTB",
    rating: 4.9,
    reviews: 124,
    price: 1750000,
    days: 3,
    type: "Private",
  },
  {
    id: "2",
    title: "Arung Jeram Citarik",
    location: "Sukabumi, Jabar",
    rating: 4.8,
    reviews: 89,
    price: 450000,
    days: 1,
    type: "Shared",
  },
  {
    id: "3",
    title: "Trekking Bukit Penanggungan",
    location: "Mojokerto, Jatim",
    rating: 4.7,
    reviews: 56,
    price: 320000,
    days: 2,
    type: "Private",
  },
  {
    id: "4",
    title: "Wisata Kota Tua Batavia",
    location: "Jakarta Barat",
    rating: 4.6,
    reviews: 210,
    price: 150000,
    days: 1,
    type: "Shared",
  },
]

export function FeaturedJourneys() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="text-base font-extrabold text-foreground">Perjalanan Unggulan</h2>
        <Link href="/explore/journeys" className="text-sm font-semibold text-primary">
          Lihat Semua
        </Link>
      </div>
      <ScrollArea>
        <div className="flex gap-3 w-max px-5 pb-4">
          {JOURNEYS.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
