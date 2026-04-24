'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ReasonSelector } from './reason-selector'
import {
  AirplaneTiltIcon,
  CalendarBlankIcon,
  CloudIcon,
  DotsThreeIcon,
} from '@phosphor-icons/react'

const CANCELLATION_REASONS = [
  { id: 'change-of-plans', label: 'Perubahan rencana', icon: CalendarBlankIcon },
  { id: 'weather', label: 'Kondisi cuaca', icon: CloudIcon },
  { id: 'travel-issues', label: 'Masalah perjalanan', icon: AirplaneTiltIcon },
  { id: 'other', label: 'Lainnya', icon: DotsThreeIcon },
]

type CancelBookingDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm?: (reason: string, description: string) => void
}

export function CancelBookingDialog({
  open,
  onOpenChange,
  onConfirm,
}: CancelBookingDialogProps) {
  const [reason, setReason] = useState<string | null>(null)
  const [description, setDescription] = useState('')

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setReason(null)
      setDescription('')
    }
    onOpenChange(nextOpen)
  }

  function handleConfirm() {
    if (!reason) return
    onConfirm?.(reason, description)
    handleOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-5">
        <DialogHeader>
          <DialogTitle>Batalkan Pemesanan</DialogTitle>
          <DialogDescription>
            Pilih alasan pembatalan. Tindakan ini tidak dapat diurungkan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold">Alasan Pembatalan</p>
            <ReasonSelector
              reasons={CANCELLATION_REASONS}
              selected={reason}
              onSelect={setReason}
            />
          </div>

          {reason === 'other' && (
            <div className="space-y-1.5">
              <p className="text-sm font-semibold">
                Penjelasan <span className="text-muted-foreground font-normal">(opsional)</span>
              </p>
              <Textarea
                placeholder="Jelaskan lebih lanjut alasan pembatalanmu..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="text-sm resize-none min-h-20"
                autoFocus
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="destructive-fill"
            className="w-full"
            disabled={reason === null}
            onClick={handleConfirm}
          >
            Konfirmasi Pembatalan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
