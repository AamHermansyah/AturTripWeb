import { FootprintsIcon, MapPinIcon, MountainsIcon, NavigationArrowIcon } from "@phosphor-icons/react"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline"

const timeline = [
  {
    icon: MapPinIcon,
    title: "Titik Kumpul",
    sub: "Pos 1, pukul 04:00",
    date: "04:00-13:00"
  },
  {
    icon: FootprintsIcon,
    title: "Mulai Pendakian",
    sub: "Briefing & cek perlengkapan barang bawaan. Semuanya harus lengkap dan sesuai standar pendakian.",
    date: "04:00-13:00"
  },
  {
    icon: MountainsIcon,
    title: "Area Kawah",
    sub: "Pemandangan matahari terbit",
    date: "04:00-13:00"
  },
]

export function JourneyIllustration() {
  return (
    <div className="flex flex-col gap-6">
      {/* Map */}
      <div className="relative overflow-hidden rounded-3xl bg-muted">
        <AspectRatio ratio={16 / 10} />

        {/* Route card overlay */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-card px-3 py-2 shadow-md">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/20">
              <NavigationArrowIcon weight="fill" className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold">Jalur Pendakian Bromo</span>
          </div>
          <span className="text-xs text-muted-foreground">15 km · 6 j</span>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-primary/20 p-4 rounded-4xl">
        <h2 className="font-heading font-bold text-primary">Timeline Perjalanan</h2>
        <Timeline defaultValue={3} className="mt-4">
          {timeline.map((item, i) => (
            <TimelineItem
              key={i}
              step={i + 1}
              className="group-data-[orientation=vertical]/timeline:not-last:pb-4"
            >
              <div className="bg-card/70 p-4 rounded-4xl shadow-sm">
                <TimelineHeader>
                  <TimelineSeparator className="group-data-[orientation=vertical]/timeline:w-px group-data-[orientation=vertical]/timeline:top-0" />
                  <TimelineDate className="mb-0 text-primary font-bold tracking-wider">
                    {item.date}
                  </TimelineDate>
                  <TimelineTitle className="font-bold font-heading">{item.title}</TimelineTitle>
                  <TimelineIndicator className="border-4" />
                </TimelineHeader>
                <TimelineContent className="text-[13px] text-muted-foreground">
                  {item.sub}
                </TimelineContent>
              </div>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </div>
  )
}
