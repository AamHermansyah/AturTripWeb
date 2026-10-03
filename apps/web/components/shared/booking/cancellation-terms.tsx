import { CANCELLATION_TEMPLATES, type CancellationTemplate } from "@/lib/booking-preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function CancellationTerms({ template }: { template: CancellationTemplate }) {
  const config = CANCELLATION_TEMPLATES[template]
  const hours = (value: number) => value >= 24 && value % 24 === 0 ? `${value / 24} hari` : `${value} jam`
  return <Alert><AlertTitle>Pembatalan {config.label.toLowerCase()}</AlertTitle><AlertDescription>
    <ul className="mt-2 flex list-disc flex-col gap-1 pl-4">
      {config.rules.map((rule, index) => <li key={rule.percent}>{rule.percent}% dari harga trip dan add-on yang sudah dibayar: {index === 0 ? `sedikitnya ${hours(rule.minimumHours)} sebelum mulai` : index === 1 ? `${hours(rule.minimumHours)} hingga kurang dari ${hours(config.rules[0].minimumHours)} sebelum mulai` : `kurang dari ${hours(config.rules[1].minimumHours)} sebelum mulai`}.</li>)}
    </ul>
    <p className="mt-3">Biaya layanan tidak dikembalikan untuk pembatalan wisatawan. Jika pemandu membatalkan, seluruh pembayaran termasuk biaya layanan dikembalikan.</p>
  </AlertDescription></Alert>
}
