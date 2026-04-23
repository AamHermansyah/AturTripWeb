import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import NotificationItem from "./_components/notification-item"
import { cn } from "@/lib/utils"

export default function NotificationsPage() {
  const tabs = ["All", "Bookings", "Payments"]

  return (
    <div className="px-5 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-2xl font-extrabold tracking-tight">Notifications</h1>
        <button className="text-[13px] font-bold text-primary active:opacity-70 transition-opacity cursor-pointer">
          Mark all as read
        </button>
      </div>

      <ScrollArea>
        <div className="flex items-center gap-2 pb-2">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={cn(
                "px-4 py-1.5 rounded-full text-[13px] font-bold border transition-colors whitespace-nowrap shadow-xs",
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
        {/* TODAY */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest pl-1">Today</h2>
          <div className="space-y-3">
            <NotificationItem
              variant="booking"
              title="Booking Confirmed!"
              description={<>Your trek to <span className="font-bold text-foreground">Mount Summit</span> is ready. Please review the itinerary.</>}
              time="1h ago"
              unread
            />
            <NotificationItem
              variant="payment"
              title="Payment Received"
              description={<>You received <span className="text-primary font-bold">$450.00</span> for the Weekend Getaway package.</>}
              time="3h ago"
              unread
            />
          </div>
        </div>

        {/* YESTERDAY */}
        <div className="space-y-3">
          <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest pl-1">Yesterday</h2>
          <div className="space-y-3">
            <NotificationItem
              variant="verification"
              title="Identity Verified"
              description="Your guide profile has been verified! You can now start accepting bookings."
              time="Yesterday"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
