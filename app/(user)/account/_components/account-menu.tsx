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
  CaretRightIcon
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

  const listTop = [
    { label: "Riwayat Perjalanan", icon: ClockCounterClockwiseIcon, href: "/history" },
  ]

  const listMiddle = [
    { label: "Pindah ke Akun Guide", icon: ArrowsLeftRightIcon, href: "/guide-mode" },
    { label: "Keamanan", icon: LockKeyIcon, href: "/account/security" },
    { label: "Kontak Kami", icon: HeadsetIcon, href: "/contact" },
    { label: "Kebijakan dan Ketentuan", icon: FileTextIcon, href: "/terms" },
  ]

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <div className="space-y-4">
      {/* Top Group */}
      <div className="bg-muted/40 rounded-4xl p-3 flex flex-col gap-1">
        {listTop.map((item, i) => (
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

      {/* Middle Group */}
      <div className="bg-muted/40 rounded-[2rem] p-3 flex flex-col gap-1">
        {listMiddle.map((item, i) => (
          <Link key={i} href={item.href} className="flex items-center gap-4 p-2 rounded-full hover:bg-background/70 active:bg-background/80 transition-colors group">
            <div className="size-9 rounded-full bg-background flex items-center justify-center shrink-0 shadow-xs text-primary group-hover:border group-hover:scale-110 transition-transform">
              <item.icon weight="fill" className="size-4" />
            </div>
            <span className="flex-1 font-bold text-[15px]">{item.label}</span>
            <CaretRightIcon weight="bold" className="size-4 text-muted-foreground mr-2" />
          </Link>
        ))}
      </div>

      {/* Logout Group */}
      <Button variant="destructive" size="lg" className="w-full gap-3 group">
        <SignOutIcon weight="bold" />
        <span className="flex-1 font-bold text-left text-[15px]">Keluar Akun</span>
      </Button>
    </div>
  )
}
