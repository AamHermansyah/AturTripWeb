import { ReceiptIcon } from "@phosphor-icons/react/dist/ssr"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface PaymentSummaryItem {
  label: string
  amount: string
  isGreen?: boolean
}

interface PaymentSummaryCardProps {
  items: PaymentSummaryItem[]
  totalLabel?: string
  totalAmount: string
  /** Show the "Pay Now" button. Typically visible when status is PENDING */
  showPayButton?: boolean
}

export function PaymentSummaryCard({
  items,
  totalLabel = "Total Amount",
  totalAmount,
  showPayButton = false,
}: PaymentSummaryCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-4xl border bg-card p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="flex size-8 items-center justify-center rounded-xl bg-primary/10">
          <ReceiptIcon weight="duotone" className="size-4 text-primary" />
        </div>
        <h2 className="font-heading text-base font-extrabold tracking-tight text-foreground">
          Payment Summary
        </h2>
      </div>

      {/* Line items */}
      <div className="flex flex-col gap-2.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm text-primary/80">{item.label}</span>
            <span className="text-sm font-medium text-foreground">{item.amount}</span>
          </div>
        ))}
      </div>

      <Separator />

      {/* Total */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-extrabold text-foreground">{totalLabel}</span>
        <span className="font-heading text-lg font-extrabold text-primary">{totalAmount}</span>
      </div>

      {/* Pay Now Button */}
      {showPayButton && (
        <Button className="w-full">
          Bayar Sekarang
        </Button>
      )}
    </div>
  )
}
