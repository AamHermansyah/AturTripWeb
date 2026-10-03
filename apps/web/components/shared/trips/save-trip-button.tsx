"use client"

import { HeartIcon } from "@phosphor-icons/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSavedPreview, type SavedTripPreview } from "./saved-preview-provider"

export function SaveTripButton({ trip, className, compact = false }: { trip: SavedTripPreview; className?: string; compact?: boolean }) {
  const { trips, toggle } = useSavedPreview()
  const saved = trips.some(item => item.href === trip.href)
  return <Button type="button" variant="outline" size={compact ? "icon-sm" : "icon"} aria-pressed={saved} aria-label={`${saved ? "Hapus dari simpanan" : "Simpan"}: ${trip.journey.title}`} title={saved ? "Hapus dari simpanan" : "Simpan trip"} className={cn("border-none bg-background/90 text-primary hover:bg-background", className)} onClick={() => { toggle(trip); toast(saved ? "Trip dihapus dari simpanan contoh." : "Trip disimpan untuk sesi pratinjau ini.") }}><HeartIcon weight={saved ? "fill" : "bold"} /></Button>
}
