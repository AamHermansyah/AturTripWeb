import { ShieldCheckIcon, WalletIcon, ArrowUDownLeftIcon, ClockIcon, LightningIcon } from "@phosphor-icons/react/dist/ssr"

const PAYMENT_FEATURES = [
  {
    title: "Pembayaran Cepat & Beragam",
    desc: "Tersedia untuk metode pembayaran Bank maupun e-Wallet.",
    Icon: LightningIcon,
    weight: "fill" as const,
  },
  {
    title: "Bayar Lunas / DP",
    desc: "Sisa pelunasan DP dibayar langsung ke pemandu.",
    Icon: WalletIcon,
    weight: "fill" as const,
  },
  {
    title: "Batal H-3 Refund 100%",
    desc: "Tidak termasuk biaya layanan refund.",
    Icon: ArrowUDownLeftIcon,
    weight: "bold" as const,
  },
  {
    title: "Maksimal Batal H-1",
    desc: "Refund 50% potongan sebagai kompensasi pemandu. Bisa banding kok!",
    Icon: ClockIcon,
    weight: "fill" as const,
  },
]

export function PaymentBanner() {
  return (
    <div className="relative mt-8 overflow-hidden rounded-4xl bg-linear-to-br from-primary to-success px-5 py-8 shadow-sm">
      {/* Decorative dots */}
      <div className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-1.5 mb-2">
          <ShieldCheckIcon weight="fill" className="text-primary-foreground/80" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary-foreground/80">
            Informasi Transaksi
          </span>
        </div>
        <p className="font-heading text-xl font-extrabold text-primary-foreground leading-tight">
          Pembayaran & Refund
        </p>

        <div className="flex flex-col gap-4 mt-4">
          {PAYMENT_FEATURES.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="flex items-center justify-center size-10 shrink-0 rounded-xl bg-primary-foreground/20">
                <feature.Icon weight={feature.weight} className="size-5 text-primary-foreground" />
              </div>
              <div className="pt-0.5">
                <p className="font-bold text-sm text-primary-foreground leading-none">{feature.title}</p>
                <p className="text-xs text-primary-foreground/90 mt-1 leading-none">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
