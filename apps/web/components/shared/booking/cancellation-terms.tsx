import { CANCELLATION_TEMPLATES, type CancellationTemplate } from "@/lib/booking-preview"

export function CancellationTerms({ template }: { template: CancellationTemplate }) {
  const config = CANCELLATION_TEMPLATES[template]
  const hours = (value: number) => value >= 24 && value % 24 === 0 ? `${value / 24} hari` : `${value} jam`
  return <section className="border-t border-border pt-5 text-sm leading-relaxed" aria-label={`Syarat pembatalan ${config.label.toLowerCase()}`}><h2 className="font-heading text-base font-semibold">Pembatalan {config.label.toLowerCase()}</h2>
    <ul className="mt-3 flex list-disc flex-col gap-3 pl-4 text-muted-foreground">
      {config.rules.map((rule, index) => <li key={rule.percent}>{rule.percent}% dari harga trip dan add-on yang sudah dibayar: {index === 0 ? `sedikitnya ${hours(rule.minimumHours)} sebelum mulai` : index === 1 ? `${hours(rule.minimumHours)} hingga kurang dari ${hours(config.rules[0].minimumHours)} sebelum mulai` : `kurang dari ${hours(config.rules[1].minimumHours)} sebelum mulai`}.</li>)}
    </ul>
    <p className="mt-4 text-muted-foreground">Biaya layanan tidak dikembalikan untuk pembatalan wisatawan. Jika pemandu membatalkan, seluruh pembayaran termasuk biaya layanan dikembalikan.</p>
  </section>
}
