import { StarIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr"

export interface ReviewProps {
  id: string
  author: {
    name: string
    avatar?: string
    initials?: string
    location: string
    verified: boolean
  }
  date: string
  rating: number
  title: string
  content: string
  images?: string[]
  response?: {
    author: {
      name: string
      avatar?: string
    }
    content: string
  }
}

export function ReviewCard({ review }: { review: ReviewProps }) {
  return (
    <div>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {review.author.avatar ? (
            <img src={review.author.avatar} alt={review.author.name} className="size-11 rounded-full object-cover border border-border/50" />
          ) : (
            <div className="size-11 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              {review.author.initials}
            </div>
          )}
          <div>
            <div className="flex items-center gap-1">
              <h4 className="font-extrabold text-foreground text-sm leading-none">{review.author.name}</h4>
              {review.author.verified && <SealCheckIcon weight="fill" className="size-4 text-blue-500" />}
            </div>
            <p className="text-[11px] font-semibold text-muted-foreground mt-1">{review.author.location}</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-muted-foreground">{review.date}</span>
      </div>

      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map(i => (
          <StarIcon key={i} weight={i <= review.rating ? "fill" : "regular"} className="size-4 text-success" />
        ))}
      </div>

      <h5 className="font-extrabold text-[15px] mb-1.5 text-foreground">{review.title}</h5>
      <p className="text-[13px] font-medium leading-relaxed text-muted-foreground mb-4">{review.content}</p>

      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 w-full overflow-x-auto pb-2 mb-2 no-scrollbar">
          {review.images.map((img, i) => (
            <div key={i} className="size-[84px] shrink-0 rounded-2xl overflow-hidden border border-border/50 shadow-sm relative">
              <img src={img} alt="Review attachment" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {review.response && (
        <div className="ml-4 bg-success/5 border border-success/10 rounded-[1.25rem] p-4 mt-3">
          <div className="flex items-center gap-2 mb-2">
            {review.response.author.avatar && (
              <img src={review.response.author.avatar} alt={review.response.author.name} className="size-6 rounded-full object-cover border border-border/50" />
            )}
            <span className="text-xs font-bold text-foreground">Response from {review.response.author.name}</span>
          </div>
          <p className="text-[12px] font-medium text-muted-foreground leading-[1.6]">
            {review.response.content}
          </p>
        </div>
      )}
    </div>
  )
}
