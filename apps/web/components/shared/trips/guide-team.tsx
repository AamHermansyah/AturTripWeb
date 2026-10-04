import Link from "next/link"
import Image from "next/image"
import { SealCheckIcon, UsersThreeIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr"

/** Peran seseorang pada satu trip — berbeda dari peran di komunitas. */
export type TripRole =
  | "Pemandu Utama"
  | "Asisten Pemandu"
  | "Sweeper"
  | "Medis"
  | "Dokumentasi"
  | "Logistik"
  | "Porter"

export interface TripTeamMember {
  id: string
  name: string
  tripRole: TripRole
  /** Peran di komunitas — hanya diisi untuk trip komunitas. */
  memberRole?: string
  specialty: string
  imageUrl: string
  verified: boolean
}

// Satu gaya untuk semua peran — pembeda cukup teksnya, bukan warnanya.
const ROLE_BADGE =
  "shrink-0 self-start rounded-md border border-border bg-secondary px-2 py-1 text-xs font-semibold text-muted-foreground"

interface GuideTeamProps {
  members: TripTeamMember[]
  description?: string
  /** Diisi hanya bila trip ini diselenggarakan sebuah komunitas. */
  group?: { name: string; href: string }
}

/**
 * Satu trip bisa ditangani beberapa pemandu dengan peran masing-masing.
 * Dipakai trip biasa maupun trip komunitas.
 */
export function GuideTeam({ members, description, group }: GuideTeamProps) {
  const defaultDescription = group
    ? "Trip ini ditangani satu tim dari komunitas, bukan satu pemandu. Setiap orang punya peran tersendiri selama perjalanan."
    : "Selain pemandu utama, ada anggota tim lain yang mendampingi selama perjalanan berlangsung."

  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-heading text-lg font-bold tracking-tight">
          Tim Pemandu ({members.length})
        </h2>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          {description ?? defaultDescription}
        </p>
      </div>

      {group && (
        <Link
          href={group.href}
          className="flex items-center gap-3 rounded-3xl border border-primary/20 bg-primary/5 p-3 transition-colors hover:bg-primary/10"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/15">
            <UsersThreeIcon weight="fill" className="size-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-muted-foreground">
              Diselenggarakan oleh
            </p>
            <p className="truncate font-heading text-sm font-extrabold">{group.name}</p>
          </div>
          <CaretRightIcon weight="bold" className="size-4 shrink-0 text-muted-foreground" />
        </Link>
      )}

      <div className="flex flex-col divide-y divide-border/70">
        {members.map(({ id, name, tripRole, memberRole, specialty, verified, imageUrl }) => (
          <div
            key={id}
            className="flex flex-wrap items-center gap-3 py-4"
          >
            <div className="relative size-12 shrink-0">
              <div className="size-12 overflow-hidden rounded-full bg-muted">
                <Image src={imageUrl} alt={name} width={48} height={48} unoptimized className="h-full w-full object-cover" />
              </div>
              {verified && (
                <div className="absolute -bottom-0.5 -right-0.5 flex size-4.5 items-center justify-center rounded-full bg-info ring-2 ring-card">
                  <SealCheckIcon weight="fill" className="size-2.5 text-white" />
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <p className="truncate font-heading text-[15px] font-bold leading-tight">
                  {name}
                </p>
                {memberRole && (
                  <span className="shrink-0 text-[10px] font-medium text-muted-foreground">
                    · {memberRole}
                  </span>
                )}
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{specialty}</p>
            </div>

            <span className={ROLE_BADGE}>{tripRole}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
