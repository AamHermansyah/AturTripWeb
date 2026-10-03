import { AuthForm } from "@/components/shared/auth/auth-form"
import { parseAuthRole } from "@/lib/auth-preview"

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>
}) {
  const role = parseAuthRole((await searchParams).role)
  return <AuthForm key={role} mode="register" initialRole={role} />
}
