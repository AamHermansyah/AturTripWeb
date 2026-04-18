import { cn } from '@/lib/utils';
import Image from 'next/image'

interface IProp {
  className?: string;
}

function Logo({ className }: IProp) {
  return (
    <div className={cn(
      'relative mb-5 size-16 rounded-2xl bg-primary/10 backdrop-blur-xs',
      className
    )}>
      <Image
        src="/images/aturtrip-logo.webp"
        alt="AturTrip logo"
        fill
        className="object-contain drop-shadow-lg px-2"
        priority
      />
    </div>
  )
}

export default Logo