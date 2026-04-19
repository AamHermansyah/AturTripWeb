import { Spinner } from '@/components/ui/spinner'

function LoadingPage() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center animate-pulse">
      <Spinner className="size-8 text-primary" />
    </div>
  )
}

export default LoadingPage