import type { ReactNode } from "react"
import Logo from "@/components/shared/logo"
import { Badge } from "@/components/ui/badge"

export function AuthFrame({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center px-6 py-8">
      <Logo />
      <Badge variant="secondary">Pratinjau akun</Badge>
      <h1 className="mt-4 text-center font-heading text-2xl font-extrabold">
        {title}
      </h1>
      <p className="mt-2 text-center text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <div className="mt-6 flex w-full flex-col gap-5">{children}</div>
      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        Mode contoh. Akun belum disimpan dan pesan verifikasi belum dikirim.
      </p>
    </main>
  )
}
