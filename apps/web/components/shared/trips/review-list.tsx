"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Separator } from "@/components/ui/separator"
import { ReviewCard } from "./review-card"
import { ReviewSummary } from "./review-summary"
import ImageZoom from "@/components/core/image-zoom"
import { REVIEW_FILTERS, filterPreviewReviews, type PreviewReview, type ReviewFilter } from "@/lib/review-preview"

export function ReviewList({ title, rating, total, reviews, detailHref, backLabel = "Kembali ke trip", initialFilter = "all" }: {
  title: string; rating: number; total: number; reviews: PreviewReview[]; detailHref: string; backLabel?: string; initialFilter?: ReviewFilter
}) {
  const [filter, setFilter] = useState(initialFilter)
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null)
  const matches = filterPreviewReviews(reviews, filter)
  function chooseFilter(value: string) {
    if (!Object.hasOwn(REVIEW_FILTERS, value)) return
    setFilter(value as ReviewFilter)
    const url = new URL(window.location.href); if (value === "all") url.searchParams.delete("filter"); else url.searchParams.set("filter", value)
    window.history.replaceState(null, "", url)
  }
  return <main className="flex flex-col gap-5 px-5 py-6"><Button asChild variant="ghost" className="w-fit"><Link href={detailHref}>{backLabel}</Link></Button><div><h1 className="font-heading text-2xl font-extrabold">Ulasan perjalanan</h1><p className="mt-2 text-sm text-muted-foreground">{title}</p></div><Alert><AlertDescription>{reviews.length} cuplikan sintetis untuk meninjau tampilan dan filter. Nilai keseluruhan serta jumlah ulasan masih mengikuti katalog contoh.</AlertDescription></Alert><ReviewSummary rating={rating} count={total} /><ToggleGroup type="single" value={filter} variant="outline" className="flex flex-wrap justify-start" onValueChange={chooseFilter} aria-label="Filter ulasan">{Object.entries(REVIEW_FILTERS).map(([value, label]) => <ToggleGroupItem key={value} value={value}>{label}</ToggleGroupItem>)}</ToggleGroup><p className="text-sm text-muted-foreground" role="status">{matches.length} cuplikan ditampilkan</p>{!matches.length ? <Alert><AlertDescription>Belum ada cuplikan yang cocok. <Button variant="link" onClick={() => chooseFilter("all")}>Tampilkan semua</Button></AlertDescription></Alert> : matches.map((review, index) => <div key={review.id} className="flex flex-col gap-5"><ReviewCard review={review} onClickImage={setImage} />{index !== matches.length - 1 && <Separator />}</div>)}<ImageZoom image={image} onClose={() => setImage(null)} /></main>
}
