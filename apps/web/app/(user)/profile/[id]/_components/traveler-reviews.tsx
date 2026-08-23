'use client'

import { StarIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export interface TravelerReview {
  id: string
  tripTitle: string
  tripHref: string
  guideName: string
  rating: number
  date: string
  content: string
}

export function TravelerReviews({ reviews }: { reviews: TravelerReview[] }) {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review, i) => (
        <div key={review.id} className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-start justify-between gap-3">
              <Link href={review.tripHref} className="min-w-0">
                <p className="font-heading text-sm font-extrabold leading-tight transition-colors hover:text-primary">
                  {review.tripTitle}
                </p>
              </Link>
              <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">
                {review.date}
              </span>
            </div>

            <p className="text-xs text-muted-foreground">bersama {review.guideName}</p>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <StarIcon
                  key={n}
                  weight={n <= review.rating ? "fill" : "regular"}
                  className="size-3.5 text-success"
                />
              ))}
            </div>
          </div>

          <p className="text-[13px] font-medium leading-relaxed text-muted-foreground">
            {review.content}
          </p>

          {i !== reviews.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
