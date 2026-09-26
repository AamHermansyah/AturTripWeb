import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import NotificationItem from "./_components/notification-item"
import { cn } from "@/lib/utils"

export default function NotificationsPage() {
  const tabs = ["Semua", "Pemesanan", "Pembayaran"]

  return (
    <div className="px-5 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight">Notifikasi</h1>
        <button className="text-[13px] font-bold text-primary active:opacity-70 transition-opacity cursor-pointer">
          Tandai semua dibaca
        </button>
      </div>

      <ScrollArea>
        <div className="flex items-center gap-2 pb-2">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={cn(
                "px-4 py-1.5 rounded-xl text-[13px] font-semibold border transition-colors whitespace-nowrap shadow-xs",
                i === 0
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border/60"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>

      <div className="space-y-6">
        {/* HARI INI */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground pl-1">Hari ini</h2>
          <div className="space-y-3">
            <NotificationItem
              variant="booking"
              title="Pemesanan Dikonfirmasi!"
              description={<>Pendakianmu ke <span className="font-bold text-foreground">Gunung Rinjani</span> sudah siap. Silakan tinjau rencana perjalanannya.</>}
              time="1 jam lalu"
              unread
            />
            <NotificationItem
              variant="payment"
              title="Pembayaran Diterima"
              description={<>Kamu menerima <span className="text-primary font-bold">Rp450.000</span> untuk paket Akhir Pekan Santai.</>}
              time="3 jam lalu"
              unread
            />
          </div>
        </div>

        {/* KEMARIN */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground pl-1">Kemarin</h2>
          <div className="space-y-3">
            <NotificationItem
              variant="verification"
              title="Identitas Terverifikasi"
              description="Profil pemandumu sudah terverifikasi! Kamu bisa mulai menerima pesanan."
              time="Kemarin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
