import { Skeleton } from "@/components/ui/skeleton"

function LoadingPage() {
  return (
    <div role="status" aria-label="Memuat halaman" className="flex w-full flex-1 flex-col gap-6 px-5 pt-5">
      <div className="space-y-2">
        <Skeleton className="h-6 w-2/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>

      <div className="flex gap-3 overflow-hidden">
        <Skeleton className="h-44 w-60 shrink-0 rounded-4xl" />
        <Skeleton className="h-44 w-60 shrink-0 rounded-4xl" />
      </div>

      <div className="space-y-4">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="size-14 shrink-0 rounded-2xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoadingPage
