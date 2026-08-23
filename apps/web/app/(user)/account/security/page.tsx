'use client'

import { useState } from "react"
import { SecurityScoreCard } from "./_components/security-score-card"
import { SecurityGroup, SecuritySection } from "./_components/security-row"
import { ChangePasswordDrawer } from "./_components/change-password-drawer"
import { ChangeContactDrawer } from "./_components/change-contact-drawer"
import { TwoFactorSection } from "./_components/two-factor-section"
import { TransactionPinDrawer } from "./_components/transaction-pin-drawer"
import { ActiveDevices } from "./_components/active-devices"
import { DeleteAccountDialog } from "./_components/delete-account-dialog"

// Mock data — ganti dengan data dari API saat integrasi
const ACCOUNT = {
  email: "aam.hermansyah@example.com",
  phone: "0812 3456 7890",
}

export default function AccountSecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [pinActive, setPinActive] = useState(false)

  const checks = [
    { label: "Email terverifikasi", done: true },
    { label: "Nomor HP terverifikasi", done: true },
    { label: "PIN transaksi aktif", done: pinActive },
    { label: "Verifikasi dua langkah aktif", done: twoFactorEnabled },
  ]

  return (
    <div className="px-5 space-y-6">
      <div>
        <h1 className="font-heading text-lg font-extrabold tracking-tight">Keamanan Akun</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Kelola kata sandi, verifikasi, dan perangkat yang terhubung ke akunmu.
        </p>
      </div>

      <SecurityScoreCard checks={checks} />

      <SecuritySection title="Kredensial Masuk">
        <SecurityGroup>
          <ChangePasswordDrawer />
          <ChangeContactDrawer type="email" currentValue={ACCOUNT.email} />
          <ChangeContactDrawer type="phone" currentValue={ACCOUNT.phone} />
        </SecurityGroup>
      </SecuritySection>

      <TwoFactorSection
        enabled={twoFactorEnabled}
        onEnabledChange={setTwoFactorEnabled}
      />

      <SecuritySection title="Keamanan Transaksi">
        <SecurityGroup>
          <TransactionPinDrawer active={pinActive} onActiveChange={setPinActive} />
        </SecurityGroup>
      </SecuritySection>

      <ActiveDevices />

      <SecuritySection title="Zona Berbahaya">
        <SecurityGroup>
          <DeleteAccountDialog />
        </SecurityGroup>
      </SecuritySection>
    </div>
  )
}
