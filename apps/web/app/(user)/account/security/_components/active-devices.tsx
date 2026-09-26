'use client'

import { DeviceMobileIcon, DesktopIcon, DeviceTabletIcon, SignOutIcon } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SecuritySection } from "./security-row"

const DEVICES = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    meta: "Jakarta Selatan · Aktif sekarang",
    icon: DeviceMobileIcon,
    current: true,
  },
  {
    id: "2",
    name: "Chrome · Windows",
    meta: "Bandung · 2 jam lalu",
    icon: DesktopIcon,
    current: false,
  },
  {
    id: "3",
    name: "iPad Air",
    meta: "Jakarta Selatan · 3 hari lalu",
    icon: DeviceTabletIcon,
    current: false,
  },
]

export function ActiveDevices() {
  return (
    <SecuritySection title="Perangkat aktif">
      <div className="flex flex-col gap-1 rounded-4xl bg-muted/40 p-3">
        {DEVICES.map(({ id, name, meta, icon: Icon, current }) => (
          <div key={id} className="flex items-center gap-4 rounded-xl p-2">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-background text-primary shadow-xs">
              <Icon weight="fill" className="size-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold leading-tight">{name}</p>
              <p className="truncate text-xs text-muted-foreground">{meta}</p>
            </div>

            {current ? (
              <Badge variant="success" className="mr-2 shrink-0 text-[10px]">
                PERANGKAT INI
              </Badge>
            ) : (
              <Button variant="ghost" size="xs" className="mr-1 shrink-0 text-destructive hover:text-destructive">
                Keluarkan
              </Button>
            )}
          </div>
        ))}

        <Button variant="destructive" size="sm" className="mt-2 w-full">
          <SignOutIcon weight="bold" data-icon="inline-start" />
          Keluar dari Semua Perangkat
        </Button>
      </div>
    </SecuritySection>
  )
}
