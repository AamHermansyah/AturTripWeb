'use client'

import { toast } from "sonner"
import { MapTrifoldIcon, StarIcon, CalendarCheckIcon } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProfileStats, type ProfileStat } from "@/components/shared/profile/profile-stats"
import { ProfilePhoto } from "./_components/profile-photo"
import { PersonalInfoForm } from "./_components/personal-info-form"
import { ContactSection } from "./_components/contact-section"
import { TravelPreferences } from "./_components/travel-preferences"

// Mock data — ganti dengan data dari API saat integrasi
const PROFILE = {
  id: "1",
  name: "Aam Hermansyah",
  email: "aam.hermansyah@example.com",
  initials: "AH",
  verified: true,
}

const STATS: ProfileStat[] = [
  { icon: MapTrifoldIcon, label: "Trip", value: "12" },
  { icon: StarIcon, label: "Ulasan", value: "9" },
  { icon: CalendarCheckIcon, label: "Sejak", value: "2024" },
]

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div>
        <h2 className="font-heading text-sm font-extrabold uppercase tracking-widest text-muted-foreground">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      {children}
    </div>
  )
}

export default function ProfilePage() {
  function handleSave() {
    toast.success("Profil diperbarui", {
      description: "Perubahan datamu sudah tersimpan.",
    })
  }

  return (
    <div className="px-5 space-y-6">
      <div>
        <h1 className="font-heading text-lg font-extrabold tracking-tight">Profil Saya</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Data ini membantu pemandu mengenali dan menghubungimu saat perjalanan.
        </p>
      </div>

      <ProfilePhoto
        name={PROFILE.name}
        email={PROFILE.email}
        initials={PROFILE.initials}
        verified={PROFILE.verified}
        publicProfileHref={`/profile/${PROFILE.id}`}
      />

      <ProfileStats stats={STATS} />

      <Separator />

      <Section title="Data Diri">
        <PersonalInfoForm />
      </Section>

      <Separator />

      <Section title="Kontak">
        <ContactSection />
      </Section>

      <Separator />

      <Section title="Preferensi Perjalanan">
        <TravelPreferences />
      </Section>

      <Button size="lg" className="w-full" onClick={handleSave}>
        Simpan Perubahan
      </Button>
    </div>
  )
}
