import { Skeleton } from "@/components/ui/skeleton"

function LoadingPage() {
  return (
    <div role="status" aria-label="Memuat detail trip" className="h-dvh w-full overflow-hidden">
      <Skeleton className="h-65 w-full rounded-none" />

      <div className="space-y-6 px-5 pt-5">
        <div className="space-y-2">
          <Skeleton className="h-7 w-4/5" />
          <Skeleton className="h-4 w-2/5" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>

        <Skeleton className="h-12 w-full rounded-full" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
