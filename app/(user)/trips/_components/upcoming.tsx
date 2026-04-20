import { MapPinIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import CardUpcoming from "./card-upcoming"

function Upcoming() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-extrabold tracking-tight">Upcoming Trip</h2>

      <ScrollArea>
        <div className="w-max flex items-center gap-3 pb-4">
          <CardUpcoming />
          <CardUpcoming />
          <CardUpcoming />
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default Upcoming