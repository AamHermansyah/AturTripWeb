import { Timeline } from "@/components/ui/timeline"
import TripTimelineCard from "@/components/shared/trip-timeline-card"
import { FlagPennantIcon, TentIcon, MountainsIcon, PersonSimpleHikeIcon } from "@phosphor-icons/react/dist/ssr"

const timeline = [
  {
    icon: TentIcon,
    title: "Keberangkatan Base Camp",
    date: "05:00 AM",
  },
  {
    icon: PersonSimpleHikeIcon,
    title: "Pendakian Sisi Timur",
    sub: "Mulai lebih awal untuk menyeberangi moraine yang lebih rendah sebelum matahari mengenai jatuhan es. Peralatan harness diperlukan.",
    date: "06:00 AM",
  },
  {
    icon: MountainsIcon,
    title: "Pendakian Sisi Timur",
    date: "11:30 AM",
    image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=600&auto=format&fit=crop",
  },
  {
    icon: FlagPennantIcon,
    title: "Kedatangan di Camp 1",
    sub: "Mendirikan kemah tinggi di dataran. Istirahat dan aklimatisasi untuk malam hari.",
    date: "04:00 PM",
  }
]

export function ExpeditionTimeline() {
  return (
    <div className="bg-primary/10 p-5 rounded-4xl mt-2">
      <h2 className="font-heading font-bold text-primary">Linimasa Ekspedisi</h2>
      <Timeline defaultValue={4} className="mt-4">
        {timeline.map((item, i) => (
          <TripTimelineCard
            key={i}
            item={{
              ...item,
              step: i + 1,
            }}
          />
        ))}
      </Timeline>
    </div>
  )
}
