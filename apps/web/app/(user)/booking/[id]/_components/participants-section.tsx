import { UsersThreeIcon } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

interface ParticipantsSectionProps {
  bookingId: string
  participantSummary: string
}

export function ParticipantsSection({ bookingId, participantSummary }: ParticipantsSectionProps) {
  return (
    <div className="flex items-center justify-between rounded-3xl border bg-card px-4 py-3.5 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex size-10 items-center justify-center rounded-2xl bg-info/10">
          <UsersThreeIcon weight="duotone" className="size-5 text-info" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Peserta
          </p>
          <p className="font-heading text-[15px] font-extrabold tracking-tight text-foreground">
            {participantSummary}
          </p>
        </div>
      </div>

      {/* Edit Link → redirects to /booking/:id/input */}
      <Link
        href={`/booking/${bookingId}/input`}
        className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
      >
        Edit
      </Link>
    </div>
  )
}
