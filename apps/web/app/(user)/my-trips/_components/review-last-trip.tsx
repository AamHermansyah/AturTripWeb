import { StarIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export function ReviewLastTrip() {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-lg font-bold text-foreground">
        Review Your Last Trip
      </h2>
      <div
        className="relative overflow-hidden rounded-[24px] bg-[#0f172a] px-5 py-5 shadow-lg"
        style={{
          backgroundImage: "radial-gradient(circle at 100% 0%, rgba(20, 150, 120, 0.25) 0%, transparent 60%)"
        }}
      >
        <div className="relative z-10">
          <div className="flex gap-4 items-center">
            <div className="size-16 shrink-0 overflow-hidden rounded-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=200&auto=format&fit=crop"
                alt="City building"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="line-clamp-2 font-heading text-lg font-bold text-white leading-tight mb-1">
                Urban Heritage Exploration
              </h3>
              <p className="text-slate-400 text-sm">
                Bagaimana pengalamanmu?
              </p>
            </div>
          </div>

          <div className="my-5 h-px w-full bg-slate-700/50" />

          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} className="cursor-pointer">
                  <StarIcon weight="fill" className="text-slate-500 size-7" />
                </button>
              ))}
            </div>
            <Button
              variant="secondary"
              className="rounded-full bg-[#374151] text-white hover:bg-[#4B5563] hover:text-white border-0 font-medium px-5"
            >
              Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
