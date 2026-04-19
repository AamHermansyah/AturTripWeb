import { CarProfileIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { PaymentBanner } from './_components/payment-banner'

function TripsPage() {
  return (
    <div className="px-5">
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
          <Button asChild className="rounded-full font-bold shadow-sm px-8">
            <Link href="/explore">Cari Petualangan</Link>
          </Button>
        </EmptyContent>
      </Empty>

      <PaymentBanner />
    </div>
  )
}

export default TripsPage