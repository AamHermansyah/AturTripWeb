import { CarProfileIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'

function EmptyBooking() {
  return (
    <Empty className="rounded-4xl border-2 border-border bg-secondary/30 py-10 px-4">
      <EmptyHeader>
        <EmptyMedia className="size-16 bg-primary/10 rounded-full text-primary ring-0">
          <CarProfileIcon weight="duotone" className="size-8" />
        </EmptyMedia>
        <EmptyTitle className="font-extrabold text-lg">Belum Ada Trip Aktif</EmptyTitle>
        <EmptyDescription className="text-sm text-muted-foreground">
          Daftar trip yang sedang aktif, booking, atau menunggu pembayaran tampil di sini.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link href="/explore">
          <Button size="lg">
            Cari Petualangan
          </Button>
        </Link>
      </EmptyContent>
    </Empty>
  )
}

export default EmptyBooking