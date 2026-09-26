import { CheckCircleIcon, ClockIcon, XCircleIcon, WarningIcon } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"

type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED" | "EXPIRED" | "COMPLETED"

interface BookingStatusBadgeProps {
  status: BookingStatus
  className?: string
}

const statusConfig: Record<BookingStatus, {
  label: string
  icon: React.ElementType
  className: string
}> = {
  CONFIRMED: {
    label: "Terkonfirmasi",
    icon: CheckCircleIcon,
    className: "bg-success/10 text-success border-success/20",
  },
  PENDING: {
    label: "Menunggu",
    icon: ClockIcon,
    className: "bg-warning/10 text-warning border-warning/20",
  },
  CANCELLED: {
    label: "Dibatalkan",
    icon: XCircleIcon,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
  EXPIRED: {
    label: "Kedaluwarsa",
    icon: WarningIcon,
    className: "bg-muted text-muted-foreground border-border",
  },
  COMPLETED: {
    label: "Selesai",
    icon: CheckCircleIcon,
    className: "bg-info/10 text-info border-info/20",
  },
}

export function BookingStatusBadge({ status, className }: BookingStatusBadgeProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold",
        config.className,
        className
      )}
    >
      <Icon weight="fill" className="size-3.5" />
      {config.label}
    </div>
  )
}
