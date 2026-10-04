import type { ReactNode } from "react"
import Logo from "@/components/shared/logo"
import { PageHeading } from "@/components/shared/page-heading"
import { PreviewNotice } from "@/components/shared/preview-notice"

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
    <main className="flex min-h-dvh flex-col px-6 py-8">
      <Logo className="mb-10 size-12" />
      <PageHeading title={title} description={description} />
      <div className="mt-8 flex w-full flex-col gap-6">{children}</div>
      <div className="mt-8"><PreviewNotice>Akun belum disimpan dan pesan verifikasi belum dikirim. Gunakan data contoh untuk meninjau alur.</PreviewNotice></div>
    </main>
  )
}
