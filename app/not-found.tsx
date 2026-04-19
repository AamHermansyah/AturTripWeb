import Link from "next/link"
import { MapTrifoldIcon, ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-6 text-center">
      {/* Illustration */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="size-40 rounded-full bg-warning/10" />
        <div className="absolute size-28 rounded-full bg-warning/15" />
        <MapTrifoldIcon
          size={64}
          weight="duotone"
          className="absolute text-primary dark:text-foreground"
        />

        {/* Floating badge */}
        <div className="absolute -top-2 -right-2 flex size-12 items-center justify-center rounded-full bg-destructive shadow-md">
          <span className="text-lg font-extrabold text-white leading-none">!</span>
        </div>
      </div>

      {/* Text */}
      <p className="text-8xl font-extrabold tracking-tighter text-primary leading-none select-none">
        404
      </p>
      <h1 className="font-heading mt-2 text-2xl font-extrabold text-foreground">
        Destinasi Tidak Ditemukan
      </h1>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground leading-relaxed">
        Sepertinya peta ini belum ada. Halaman yang kamu cari mungkin sudah dipindahkan atau tidak tersedia.
      </p>

      {/* Actions */}
      <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
        <Link href="/">
          <Button size="lg">Kembali ke Beranda</Button>
        </Link>
      </div>
    </div>
  )
}
