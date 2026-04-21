import { StarIcon } from "@phosphor-icons/react/dist/ssr"

export function ReviewSummary() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-6">
        <h2 className="text-6xl font-black font-heading tracking-tighter mb-2">4.9</h2>
        <div className="flex items-center justify-center gap-1.5 mb-2">
          {[1,2,3,4].map(i => (
            <StarIcon key={i} weight="fill" className="size-6 text-success" />
          ))}
          <StarIcon weight="regular" className="size-6 text-success" />
        </div>
        <p className="text-[13px] font-semibold text-muted-foreground">Based on 128 reviews</p>
      </div>

      <div className="w-full bg-success/5 border border-success/10 rounded-[1.5rem] p-5 space-y-3">
        {[
          { stars: 5, pct: 80 },
          { stars: 4, pct: 12 },
          { stars: 3, pct: 5 },
          { stars: 2, pct: 1 },
          { stars: 1, pct: 2 },
        ].map((item) => (
          <div key={item.stars} className="flex items-center gap-3">
            <span className="text-xs font-extrabold w-3 text-foreground/80">{item.stars}</span>
            <div className="flex-1 h-2.5 bg-background rounded-full overflow-hidden shadow-inner flex">
              <div className="h-full bg-success rounded-full" style={{ width: `${item.pct}%` }} />
            </div>
            <span className="text-xs font-semibold text-muted-foreground w-8 text-right">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
