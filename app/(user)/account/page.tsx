import Link from 'next/link'
import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr'
import AccountMenu from './_components/account-menu'

export default function AccountPage() {
  return (
    <div className="px-5 space-y-4">
      <h1 className="font-heading text-lg font-extrabold tracking-tight">Akun Saya</h1>

      {/* Profile Card */}
      <Link href="/profile" className="block outline-none">
        <div className="bg-muted/40 border border-border/50 rounded-4xl p-4 flex items-center gap-4 active:scale-[0.98] transition-all">
          <div className="size-16 rounded-full bg-primary/20 flex shrink-0 items-center justify-center text-primary font-bold text-xl">
            AH
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-heading text-lg font-bold truncate">Aam Hermansyah</h2>
            <p className="text-muted-foreground text-[13px] truncate font-medium">aam.hermansyah@example.com</p>
          </div>
          <div className="size-10 rounded-full bg-background shrink-0 flex items-center justify-center shadow-sm">
            <CaretRightIcon weight="bold" className="size-5 text-muted-foreground" />
          </div>
        </div>
      </Link>

      {/* Menu Options */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xs font-bold text-muted-foreground px-2 uppercase tracking-wider">Pengaturan Menu</h3>
        <AccountMenu />
      </div>
    </div>
  )
}