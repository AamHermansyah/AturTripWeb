/** Data dan batas waktu ini hanya untuk mockup, bukan kontrak autentikasi API. */
export type AuthRole = "traveler" | "guide"
export type VerificationFlow = "register" | "reset"

export const PREVIEW_OTP = "1234"
export const PREVIEW_OTP_LIFETIME_MS = 5 * 60 * 1000
export const PREVIEW_RESEND_MS = 60 * 1000

export type PreviewChallenge = {
  role: AuthRole
  identity: string
  flow: VerificationFlow
  issuedAt: number
  verified: boolean
}

export function parseAuthRole(value: unknown): AuthRole {
  return value === "guide" ? "guide" : "traveler"
}

export function normalizeIdentity(
  role: AuthRole,
  value: string
): string | null {
  const trimmed = value.trim()
  if (role === "guide") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
      ? trimmed.toLowerCase()
      : null
  }
  const compact = trimmed.replace(/[\s-]/g, "")
  if (!/^(?:\+62|62|0)8\d{8,11}$/.test(compact)) return null
  return compact.startsWith("0")
    ? `+62${compact.slice(1)}`
    : `+${compact.replace(/^\+/, "")}`
}

export function maskIdentity(role: AuthRole, identity: string): string {
  if (role === "guide") {
    const [local, domain] = identity.split("@")
    return `${local.slice(0, 2)}•••@${domain}`
  }
  return `${identity.slice(0, 5)}••••${identity.slice(-3)}`
}

export function createPreviewChallenge(
  role: AuthRole,
  identity: string,
  flow: VerificationFlow,
  now = Date.now()
): PreviewChallenge {
  return { role, identity, flow, issuedAt: now, verified: false }
}

export function checkPreviewOtp(
  challenge: PreviewChallenge,
  otp: string,
  now = Date.now()
): "valid" | "expired" | "incorrect" | "used" {
  if (challenge.verified) return "used"
  if (now >= challenge.issuedAt + PREVIEW_OTP_LIFETIME_MS) return "expired"
  return otp === PREVIEW_OTP ? "valid" : "incorrect"
}

export function canResetPreviewPassword(
  challenge: PreviewChallenge | null,
  now = Date.now()
): boolean {
  return (
    !!challenge &&
    challenge.flow === "reset" &&
    challenge.verified &&
    now < challenge.issuedAt + PREVIEW_OTP_LIFETIME_MS
  )
}
