"use client"

import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import {
  ClockCounterClockwiseIcon,
  MoonIcon,
  ArrowsLeftRightIcon,
  LockKeyIcon,
  HeadsetIcon,
  FileTextIcon,
  SignOutIcon,
  CaretRightIcon,
  WalletIcon,
  IdentificationCardIcon
} from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function AccountMenu() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && (theme === 'dark' || resolvedTheme === 'dark')

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  const PreferenceItems = [
    { label: "Riwayat Perjalanan", icon: ClockCounterClockwiseIcon, href: "/booking" },
    { label: "Pindah ke Akun Guide", icon: ArrowsLeftRightIcon, href: "/guide-mode" },
  ]

  const SecurityItems = [
    { label: "Keamanan Akun", icon: LockKeyIcon, href: "/account/security" },
    { label: "Verifikasi KYC", icon: IdentificationCardIcon, href: "/account/kyc" },
    { label: "Pengaturan Penarikan", icon: WalletIcon, href: "/account/withdrawal" },
  ]

  const OtherItems = [
    { label: "Kontak Kami", icon: HeadsetIcon, href: "/contact" },
    { label: "Kebijakan dan Ketentuan", icon: FileTextIcon, href: "/terms" },
  ]

  const renderGroup = (items: typeof SecurityItems) => (
    <div className="bg-muted/40 rounded-4xl p-3 flex flex-col gap-1">
      {items.map((item, i) => (
        <Link key={i} href={item.href} className="flex items-center gap-4 p-2 rounded-full hover:bg-background/70 active:bg-background/80 transition-colors group">
          <div className="size-9 rounded-full bg-background flex items-center justify-center shrink-0 shadow-xs text-primary group-hover:border group-hover:scale-110 transition-transform">
            <item.icon weight="fill" className="size-4" />
          </div>
          <span className="flex-1 font-bold text-[15px]">{item.label}</span>
          <CaretRightIcon weight="bold" className="size-4 text-muted-foreground mr-2" />
        </Link>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pl-2">Preferensi</h4>
        <div className="bg-muted/40 rounded-4xl p-3 flex flex-col gap-1">
          {PreferenceItems.map((item, i) => (
            <Link key={i} href={item.href} className="flex items-center gap-4 p-2 rounded-full hover:bg-background/70 active:bg-background/80 transition-colors group">
              <div className="size-9 rounded-full bg-background flex items-center justify-center shrink-0 shadow-xs text-primary group-hover:border group-hover:scale-110 transition-transform">
                <item.icon weight="fill" className="size-4" />
              </div>
              <span className="flex-1 font-bold text-[15px]">{item.label}</span>
              <CaretRightIcon weight="bold" className="size-4 text-muted-foreground mr-2" />
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <div
            onClick={toggleTheme}
            className="flex items-center gap-4 p-2 rounded-full hover:bg-background/70 active:bg-background/80 transition-colors group cursor-pointer"
          >
            <div className="size-9 rounded-full bg-background flex items-center justify-center shrink-0 shadow-xs text-primary group-hover:border group-hover:scale-110 transition-transform">
              <MoonIcon weight="fill" className="size-4" />
            </div>
            <span className="flex-1 font-bold text-[15px]">Mode Gelap</span>
            <div className="mr-2" onClick={(e) => e.stopPropagation()}>
              {mounted && (
                <Switch
                  checked={isDark}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pl-2">Keamanan</h4>
        {renderGroup(SecurityItems)}
      </div>

      <div className="space-y-3">
        <h4 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest pl-2">Lainnya</h4>
        {renderGroup(OtherItems)}
      </div>

      <Link href="/login">
        <Button variant="destructive" size="lg" className="w-full gap-3 group mt-4">
          <SignOutIcon weight="bold" />
          <span className="flex-1 font-bold text-left text-[15px]">Keluar Akun</span>
        </Button>
      </Link>
    </div>
  )
}
