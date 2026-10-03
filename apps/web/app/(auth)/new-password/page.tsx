import { NewPasswordForm } from "@/components/shared/auth/new-password-form"
import { parseAuthRole } from "@/lib/auth-preview"

export default async function NewPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>
}) {
  const role = parseAuthRole((await searchParams).role)
  return <NewPasswordForm role={role} />
}
