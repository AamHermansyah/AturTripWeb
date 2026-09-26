import { Skeleton } from "@/components/ui/skeleton"

function LoadingPage() {
  return (
    <div role="status" aria-label="Memuat profil grup" className="h-dvh w-full overflow-hidden">
      <Skeleton className="h-56 w-full rounded-none" />

      <div className="flex items-start gap-3 px-5 pt-3">
        <Skeleton className="size-16 shrink-0 rounded-2xl" />
        <div className="flex-1 space-y-2 pt-1">
          <Skeleton className="h-5 w-3/5" />
          <Skeleton className="h-4 w-2/5" />
        </div>
      </div>

      <div className="space-y-6 px-5 pt-5">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-16 rounded-2xl" />
          ))}
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 flex-1" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  )
}

export default LoadingPage
