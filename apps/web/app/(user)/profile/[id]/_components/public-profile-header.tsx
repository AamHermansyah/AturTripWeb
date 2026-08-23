'use client'

import { SealCheckIcon, MapPinIcon, CalendarCheckIcon, ChatCircleTextIcon } from "@phosphor-icons/react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface PublicProfileHeaderProps {
  name: string
  initials: string
  imageUrl?: string
  location: string
  joinedYear: string
  bio: string
  verified?: boolean
}

export function PublicProfileHeader({
  name,
  initials,
  imageUrl,
  location,
  joinedYear,
  bio,
  verified,
}: PublicProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Avatar className="size-24 border-2 border-background shadow-md">
        {imageUrl && <AvatarImage src={imageUrl} alt={name} />}
        <AvatarFallback className="bg-primary/15 text-xl font-extrabold text-primary">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5">
          <h1 className="font-heading text-xl font-extrabold tracking-tight">{name}</h1>
          {verified && <SealCheckIcon weight="fill" className="size-4.5 text-info" />}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPinIcon weight="fill" className="size-3.5" />
            <span className="text-xs font-medium">{location}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarCheckIcon weight="fill" className="size-3.5" />
            <span className="text-xs font-medium">Bergabung {joinedYear}</span>
          </div>
        </div>
      </div>

      <p className="max-w-xs text-[13px] leading-relaxed text-muted-foreground">{bio}</p>

      <Button asChild size="sm" className="mt-1">
        <Link href="/conversations">
          <ChatCircleTextIcon weight="fill" data-icon="inline-start" />
          Kirim Pesan
        </Link>
      </Button>
    </div>
  )
}
