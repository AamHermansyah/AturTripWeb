'use client'

import { CameraIcon, SealCheckIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfilePhotoProps {
  name: string
  email: string
  imageUrl?: string
  initials: string
  verified?: boolean
  publicProfileHref: string
}

export function ProfilePhoto({
  name,
  email,
  imageUrl,
  initials,
  verified,
  publicProfileHref,
}: ProfilePhotoProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <Avatar className="size-24 border-2 border-background shadow-md">
          {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
          <AvatarFallback className="bg-primary/15 text-xl font-extrabold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <button
          type="button"
          aria-label="Ubah foto profil"
          className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md ring-2 ring-background transition-transform active:scale-95"
        >
          <CameraIcon weight="fill" className="size-4" />
        </button>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5">
          <h2 className="font-heading text-lg font-extrabold tracking-tight">{name}</h2>
          {verified && <SealCheckIcon weight="fill" className="size-4 text-info" />}
        </div>
        <p className="text-[13px] font-medium text-muted-foreground">{email}</p>
      </div>

      <Button asChild variant="outline" size="xs">
        <Link href={publicProfileHref}>Lihat Profil Publik</Link>
      </Button>
    </div>
  )
}
