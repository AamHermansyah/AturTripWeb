import { VerificationScreen } from "@/components/shared/auth/verification-screen"
import { parseAuthRole } from "@/lib/auth-preview"

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string; flow?: string }>
}) {
  const params = await searchParams
  const role = parseAuthRole(params.role)
  const flow = params.flow === "register" ? "register" : "reset"
  return <VerificationScreen role={role} flow={flow} />
}
