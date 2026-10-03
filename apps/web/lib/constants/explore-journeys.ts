import type { Journey } from "@/components/shared/trips/journey-card"
import type { ExploreJourney } from "@/lib/explore-filters"

// Katalog contoh untuk mockup Explore, bukan ketersediaan atau listing dari API.
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
    imageUrl:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=400",
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
    imageUrl:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=400",
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
    imageUrl:
      "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=400",
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
    imageUrl:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&q=80&w=400",
  },
]

const CATEGORIES: Record<string, ExploreJourney["categoryIds"]> = {
  "1": ["mountains"],
  "2": ["rivers"],
  "3": ["mountains"],
  "4": ["city"],
}

export const EXPLORE_JOURNEYS: ExploreJourney[] = JOURNEYS.map((journey) => ({
  ...journey,
  categoryIds: CATEGORIES[journey.id],
}))
