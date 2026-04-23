import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const PARTICIPANTS = [
  { id: "1", name: "Muhammad R.", imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80" },
  { id: "2", name: "Budi S.", imageUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80" },
  { id: "3", name: "Citra H.", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
  { id: "4", name: "Septiani M.", imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80" },
  { id: "5", name: "Alzahra P.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
  { id: "6", name: "Fani K.", imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" },
]

export function TripParticipants() {
  const registeredCount = PARTICIPANTS.length

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-extrabold text-foreground">Peserta Perjalanan ({registeredCount})</h2>
      </div>
      <ScrollArea>
        <div className="flex gap-2 pb-4">
          {PARTICIPANTS.map((p) => (
            <div key={p.id} className="flex flex-col items-center gap-1.5 w-[68px] shrink-0">
              <div className="size-14 rounded-full bg-muted overflow-hidden cursor-pointer hover:border-primary border-2 border-transparent transition duration-300">
                <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover text-xs" />
              </div>
              <div className="text-center w-full">
                <p className="text-xs font-bold text-foreground leading-tight truncate">{p.name}</p>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
