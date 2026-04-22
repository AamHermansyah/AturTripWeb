import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import CardOnGoing from "./card-ongoing"

function OnGoing() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-extrabold tracking-tight">On Going Trip</h2>

      <ScrollArea>
        <div className="w-max flex items-center gap-3 pb-4">
          <CardOnGoing />
          <CardOnGoing />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default OnGoing