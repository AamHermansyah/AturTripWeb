import { StarIcon, SealCheckIcon } from "@phosphor-icons/react/dist/ssr"
import type { GroupMember } from "@/lib/constants/group"

// Satu gaya untuk semua peran — pembeda cukup teksnya, bukan warnanya.
const ROLE_BADGE =
  "shrink-0 self-start rounded-full border border-border bg-muted px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted-foreground"

export function GroupMembers({ members }: { members: GroupMember[] }) {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-lg font-extrabold tracking-tight">
        Pemandu Kami ({members.length})
      </h2>

      <div className="flex flex-col gap-2">
        {members.map(
          ({ id, name, role, specialty, rating, reviewCount, verified, imageUrl }) => (
            <div
              key={id}
              className="flex items-center gap-3 rounded-3xl border border-border/80 bg-card p-3 shadow-xs"
            >
              <div className="relative size-12 shrink-0">
                <div className="size-12 overflow-hidden rounded-full bg-muted">
                  <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
                </div>
                {verified && (
                  <div className="absolute -bottom-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-info ring-2 ring-card">
                    <SealCheckIcon weight="fill" className="size-2.5 text-white" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-[15px] font-bold leading-tight">
                  {name}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">{specialty}</p>
                <div className="mt-1 flex items-center gap-1">
                  <StarIcon weight="fill" className="size-3 text-warning" />
                  <span className="text-xs font-bold text-foreground">{rating}</span>
                  <span className="text-xs text-muted-foreground">({reviewCount})</span>
                </div>
              </div>

              <span className={ROLE_BADGE}>{role}</span>
            </div>
          )
        )}
      </div>
    </div>
  )
}
