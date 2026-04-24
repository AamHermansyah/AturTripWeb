import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

function BookingInputPage() {
  return (
    <div className="px-5 space-y-4">
      <div>
        <h1 className="font-heading text-lg font-extrabold">Data Peserta</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Lengkapi informasi setiap peserta untuk melanjutkan pemesanan.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-sm font-semibold">
            Peserta ke-1
          </h2>
          <span className="text-xs text-destructive font-medium">Wajib diisi</span>
        </div>

        <FieldLabel className="has-[>[data-slot=field]]:rounded-3xl">
          <Field orientation="horizontal" className="gap-2">
            <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
            <FieldContent>
              <FieldTitle>Peserta pertama sebagai pemilik akun</FieldTitle>
              <FieldDescription className="text-xs">
                Data nama dan nomor telepon akan diambil dari profil akun.
              </FieldDescription>
            </FieldContent>
          </Field>
        </FieldLabel>

        <div className="space-y-1">
          <Label>
            Nama lengkap <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="Masukkan nama lengkap"
            className="text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label>
            Nomor HP <span className="text-destructive">*</span>
          </Label>
          <Input
            placeholder="Contoh: 08123456789"
            inputMode="tel"
            className="text-sm"
          />
        </div>
      </div>

      <Separator />

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-sm font-semibold">
            Peserta ke-2
          </h2>
        </div>

        <div className="space-y-1">
          <Label>
            Nama lengkap
          </Label>
          <Input
            placeholder="Masukkan nama lengkap"
            className="text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label>
            Nomor HP
          </Label>
          <Input
            placeholder="Contoh: 08123456789"
            inputMode="tel"
            className="text-sm"
          />
        </div>
      </div>

      <Separator />

      {/* Catatan opsional */}
      <div className="space-y-2">
        <h2 className="font-heading text-sm font-semibold">
          Catatan{' '}
          <span className="text-muted-foreground font-normal">(opsional)</span>
        </h2>
        <Textarea
          placeholder="Contoh: ada peserta yang tidak bisa berenang, ingin rute tertentu, dll."
          className="text-sm resize-none min-h-20"
        />
      </div>

      <Link href="/booking/1">
        <Button className="w-full">
          Lanjut ke Pembayaran
        </Button>
      </Link>
    </div>
  )
}

export default BookingInputPage;