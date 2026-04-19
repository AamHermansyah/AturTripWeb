import Link from "next/link"
import { JourneyCard, type Journey } from "./journey-card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const JOURNEYS: Journey[] = [
  {
    id: "1",
    title: "Pendakian Gunung Rinjani dan Danau Segara Anak",
    category: "Petualangan Alam",
    location: "Lombok, NTB",
    rating: 4.9,
    reviews: 124,
    price: 1750000,
    duration: { type: "day", value: 3 },
    type: "Private",
    level: "Sulit",
    packageType: "per person",
    isWishlist: false,
    isFamilyFriendly: false,
    isVerified: true,
  },
  {
    id: "2",
    title: "Arung Jeram Citarik",
    category: "Olahraga Air",
    location: "Sukabumi, Jabar",
    rating: 4.8,
    reviews: 89,
    price: 450000,
    duration: { type: "hour", value: 4 },
    type: "Shared",
    level: "Menengah",
    packageType: "per group",
    minPersons: 4,
    maxPersons: 6,
    isWishlist: true,
    isFamilyFriendly: true,
    isVerified: true,
  },
  {
    id: "3",
    title: "Trekking Bukit Penanggungan",
    category: "Pendakian",
    location: "Mojokerto, Jatim",
    rating: 4.7,
    reviews: 56,
    price: 320000,
    duration: { type: "day", value: 2 },
    type: "Private",
    level: "Menengah",
    packageType: "per person",
    isWishlist: false,
    isFamilyFriendly: false,
    isVerified: false,
  },
  {
    id: "4",
    title: "Wisata Kota Tua Batavia",
    category: "Tur Budaya",
    location: "Jakarta Barat",
    rating: 4.6,
    reviews: 210,
    price: 150000,
    duration: { type: "hour", value: 5 },
    type: "Shared",
    level: "Mudah",
    packageType: "per group",
    minPersons: 10,
    maxPersons: 15,
    isWishlist: false,
    isFamilyFriendly: true,
    isVerified: true,
  },
]

export function FeaturedJourneys() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-5">
        <h2 className="font-heading text-lg font-extrabold text-foreground">Perjalanan Unggulan</h2>
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
