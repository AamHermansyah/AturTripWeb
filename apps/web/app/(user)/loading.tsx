import { Spinner } from '@/components/ui/spinner'

function LoadingPage() {
  return (
    <div className="w-full flex-1 flex flex-col justify-center items-center animate-pulse">
      <Spinner className="size-8 text-primary" />
    </div>
  )
}

export default LoadingPage