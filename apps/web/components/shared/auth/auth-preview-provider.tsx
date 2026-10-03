"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { PreviewChallenge } from "@/lib/auth-preview"

// State sementara antarhalaman mockup. Tidak menyimpan sandi atau membuat sesi.
const AuthPreviewContext = createContext<{
  challenge: PreviewChallenge | null
  setChallenge: (challenge: PreviewChallenge | null) => void
} | null>(null)

export function AuthPreviewProvider({ children }: { children: ReactNode }) {
  const [challenge, setChallenge] = useState<PreviewChallenge | null>(null)
  return (
    <AuthPreviewContext.Provider value={{ challenge, setChallenge }}>
      {children}
    </AuthPreviewContext.Provider>
  )
}

export function useAuthPreview() {
  const context = useContext(AuthPreviewContext)
  if (!context) throw new Error("AuthPreviewProvider is required")
  return context
}
