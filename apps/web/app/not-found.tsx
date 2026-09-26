import Link from "next/link"
import { MapTrifoldIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 pb-10 text-center">
      <div className="relative mb-8 flex items-center justify-center">
        <div className="size-40 rounded-full bg-accent" />
        <div className="absolute size-28 rounded-full bg-primary/10" />
        <MapTrifoldIcon
          size={64}
          weight="duotone"
          aria-hidden="true"
          className="absolute text-primary"
        />
      </div>

      <p className="text-8xl font-extrabold leading-none tracking-tighter tabular-nums text-primary select-none">
        404
      </p>
      <h1 className="font-heading mt-3 text-2xl font-extrabold text-foreground">
        Destinasi tidak ditemukan
      </h1>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
        Halaman yang kamu cari mungkin sudah dipindahkan atau tidak tersedia.
      </p>

      <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
        <Button asChild size="lg">
          <Link href="/">Kembali ke beranda</Link>
        </Button>
      </div>
    </main>
  )
}
