import { MapPinIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { NavigationArrowIcon } from "@phosphor-icons/react/dist/ssr"

interface MeetingPointSectionProps {
  location: string
  description?: string
}

export function MeetingPointSection({ location, description }: MeetingPointSectionProps) {
  return (
    <div className="flex flex-col gap-4 rounded-4xl border bg-card p-4 shadow-sm">
      {/* Header row */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
          <MapPinIcon weight="duotone" className="size-5 text-primary" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Titik Pertemuan
          </p>
          <p className="font-heading text-[15px] font-extrabold tracking-tight text-foreground">
            {location}
          </p>
          {description && (
            <p className="text-xs text-muted-foreground">{description}</p>
          )}
        </div>
      </div>

      {/* Navigate Button */}
      <Button>
        <NavigationArrowIcon weight="fill" data-icon="inline-start" />
        Navigasi
      </Button>
    </div>
  )
}
