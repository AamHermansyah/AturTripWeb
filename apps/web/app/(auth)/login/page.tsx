import { AuthForm } from "@/components/shared/auth/auth-form"
import { parseAuthRole } from "@/lib/auth-preview"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; notice?: string }>
}) {
  const params = await searchParams
  const role = parseAuthRole(params.role)
  const notice =
    params.notice === "verified"
      ? "Verifikasi akun contoh selesai"
      : params.notice === "reset"
        ? "Kata sandi contoh berhasil diperbarui"
        : undefined
  return (
    <AuthForm
      key={`${role}-${params.notice ?? ""}`}
      mode="login"
      initialRole={role}
      notice={notice}
    />
  )
}
