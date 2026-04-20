import { cn } from "@/lib/utils"
import { CompassIcon, ClockCountdownIcon, LockKeyIcon } from "@phosphor-icons/react/dist/ssr"

const STEPS = [
  {
    icon: CompassIcon,
    title: "Temukan",
    description: "Cari pemandu lokal terbaik dengan mudah",
  },
  {
    icon: ClockCountdownIcon,
    title: "Rencanakan",
    description: "Tinjau rencana perjalanan & diskusikan",
  },
  {
    icon: LockKeyIcon,
    title: "Pesan Aman",
    description: "Pembayaran terjamin & terlindungi",
  },
]

export function HowItWorks() {
  return (
    <div className="px-5 rounded-4xl border border-border bg-background p-5 shadow-md shadow-muted">
      <div className="mb-5 text-center">
        <h2 className="font-heading text-lg font-extrabold text-foreground">
          Bagaimana AturTrip Bekerja
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Langkah sederhana menuju petualanganmu
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-4">
        {STEPS.map(({ icon: Icon, title, description }, index) => (
          <div key={title} className={cn(
            'flex flex-col items-center gap-2 text-center',
            index === 2 && 'col-span-2'
          )}>
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
              <Icon size={22} weight="fill" className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">{title}</p>
              <p className="text-xs leading-tight text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
