import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { currency, type BookingPreview, type previewPrice } from "@/lib/booking-preview"

export function PriceSummary({ booking, participants, prices, payment, mode = "checkout" }: {
  booking: BookingPreview; participants: number; prices: ReturnType<typeof previewPrice>; payment: "full" | "dp"; mode?: "checkout" | "snapshot"
}) {
  const row = (label: string, value: number) => <div key={label} className="flex justify-between gap-4"><dt className="text-muted-foreground">{label}</dt><dd className="shrink-0 text-right font-medium tabular-nums">{currency(value)}</dd></div>
  return <Card size="sm"><CardHeader><CardTitle>{mode === "snapshot" ? "Rincian saat pemesanan" : "Rincian pembayaran"}</CardTitle></CardHeader><CardContent><dl className="flex flex-col gap-3 text-sm">
    {row(booking.packageType === "per person" ? `Trip (${participants} × ${currency(booking.price)})` : `Trip per grup (${participants} orang)`, prices.tripPrice)}
    {prices.addons.map(addon => row(addon.name, addon.price))}
    {row("Biaya layanan (2%)", prices.serviceFee)}
    <Separator />
    {row("Total pemesanan", prices.total)}
    {payment === "dp" && row(`DP trip + add-on (${Math.round((booking.dpRate ?? 1) * 100)}%)`, prices.dueNow - prices.serviceFee)}
    <div className="flex justify-between gap-3 font-bold text-primary"><dt>{mode === "snapshot" ? "Pembayaran pertama" : "Bayar sekarang"}</dt><dd className="tabular-nums">{currency(prices.dueNow)}</dd></div>
    {payment === "dp" && row(mode === "snapshot" ? "Sisa setelah pembayaran pertama" : "Sisa pelunasan", prices.remaining)}
  </dl><p className="mt-3 text-xs leading-relaxed text-muted-foreground">Simulasi tarif awal. {payment === "dp" ? "Biaya layanan dibayar seluruhnya pada pembayaran pertama dan tidak ditagih ulang pada pelunasan. " : ""}Tidak ada biaya gateway QRIS terpisah.</p></CardContent></Card>
}
