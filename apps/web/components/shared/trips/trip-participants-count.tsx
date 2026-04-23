import { UsersIcon } from "@phosphor-icons/react/dist/ssr"

interface TripParticipantsCountProps {
  count: number;
}

export function TripParticipantsCount({ count }: TripParticipantsCountProps) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-full py-1 pl-1 pr-3 flex items-center gap-1 w-fit mb-2">
      <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <UsersIcon weight="fill" className="size-3.5 text-primary" />
      </div>
      <p className="text-[13px] font-semibold text-foreground">
        <span className="text-primary font-bold">{count} Orang</span> telah bergabung
      </p>
    </div>
  )
}
