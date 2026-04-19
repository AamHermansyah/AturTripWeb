"use client"

import {
  MapTrifoldIcon,
  UsersIcon,
  UserIcon,
  BookmarkSimpleIcon,
  MapPinIcon,
  StarIcon,
  SealCheckIcon,
} from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Empty } from "@/components/ui/empty"

// ─── Dummy data ───────────────────────────────────────────────────────────────

const SAVED_JOURNEYS = [
  {
    id: "1",
    title: "Pendakian Rinjani Summit",
    location: "Lombok, NTB",
    rating: 4.9,
    price: 1750000,
    days: 3,
    type: "Private" as const,
  },
  {
    id: "2",
    title: "Arung Jeram Citarik",
    location: "Sukabumi, Jabar",
    rating: 4.8,
    price: 450000,
    days: 1,
    type: "Shared" as const,
  },
]

const SAVED_GUIDES = [
  {
    id: "1",
    name: "Budi Santoso",
    specialty: "Ahli Pendakian Gunung",
    rating: 4.9,
    tags: ["Pendakian", "Survival"],
    verified: true,
  },
  {
    id: "2",
    name: "Sari Dewi",
    specialty: "Pemandu Wisata Budaya",
    rating: 4.8,
    tags: ["Budaya", "Fotografi"],
    verified: true,
  },
]

const SAVED_GROUPS = [
  {
    id: "1",
    name: "Nusantara Trekkers",
    description: "Spesialis pendakian ketinggian & jalur vulkanik Jawa–Bali.",
    guideCount: 12,
    rating: 4.9,
    badge: "Pro Team" as const,
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function JourneyItem({ title, location, rating, price, days, type }: typeof SAVED_JOURNEYS[0]) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-border bg-background p-3 shadow-sm shadow-muted">
      <div className="size-16 shrink-0 rounded-2xl bg-success/30" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="truncate text-sm font-bold text-foreground">{title}</p>
          <Badge variant={type === "Private" ? "default" : "secondary"} className="shrink-0 rounded-full text-xs">
            {type === "Private" ? "Privat" : "Bersama"}
          </Badge>
        </div>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-primary">
          <MapPinIcon weight="fill" className="size-3" />
          <span className="truncate">{location}</span>
        </div>
        <div className="mt-1.5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <StarIcon weight="fill" className="size-3 text-warning" />
            <span className="text-xs font-semibold text-foreground">{rating}</span>
            <span className="text-xs text-muted-foreground">· {days} hari</span>
          </div>
          <span className="text-xs font-extrabold text-primary">
            Rp {price.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  )
}

function GuideItem({ name, specialty, rating, tags, verified }: typeof SAVED_GUIDES[0]) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-border bg-background p-3 shadow-sm shadow-muted">
      <div className="relative size-14 shrink-0">
        <div className="size-14 rounded-full bg-success/30" />
        {verified && (
          <div className="absolute bottom-0 right-0 flex size-5 items-center justify-center rounded-full bg-info ring-2 ring-background">
            <SealCheckIcon weight="fill" className="size-3 text-white" />
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-foreground">{name}</p>
        <p className="truncate text-xs text-muted-foreground">{specialty}</p>
        <div className="mt-1 flex items-center gap-1">
          <StarIcon weight="fill" className="size-3 text-warning" />
          <span className="text-xs font-semibold text-foreground">{rating}</span>
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="rounded-full text-[10px]">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

function GroupItem({ name, description, guideCount, rating, badge }: typeof SAVED_GROUPS[0]) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-border bg-background p-3 shadow-sm shadow-muted">
      <div className="size-14 shrink-0 rounded-2xl bg-success/30" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-bold text-foreground">{name}</p>
          <Badge variant="default" className="shrink-0 rounded-full text-[10px]">{badge}</Badge>
        </div>
        <p className="mt-0.5 truncate text-xs text-muted-foreground">{description}</p>
        <div className="mt-1 flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <UsersIcon weight="fill" className="size-3" />
            <span>{guideCount} Pemandu</span>
          </div>
          <div className="flex items-center gap-1">
            <StarIcon weight="fill" className="size-3 text-warning" />
            <span className="text-xs font-semibold text-foreground">{rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SavedPage() {
  return (
    <div className="min-h-dvh bg-background">
      {/* Header */}
      <div className="px-5 pt-12 pb-4">
        <div className="flex items-center gap-2">
          <BookmarkSimpleIcon weight="fill" className="size-6 text-primary" />
          <h1 className="font-heading text-2xl font-extrabold text-foreground">Tersimpan</h1>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          Daftar wishlist perjalanan, pemandu, dan grup favoritmu.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="journeys" className="px-5">
        <TabsList className="w-full" variant="line">
          <TabsTrigger value="journeys" className="flex-1 gap-1.5">
            <MapTrifoldIcon className="size-4" />
            Perjalanan
          </TabsTrigger>
          <TabsTrigger value="guides" className="flex-1 gap-1.5">
            <UserIcon className="size-4" />
            Pemandu
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex-1 gap-1.5">
            <UsersIcon className="size-4" />
            Grup
          </TabsTrigger>
        </TabsList>

        <TabsContent value="journeys" className="mt-4">
          {SAVED_JOURNEYS.length > 0 ? (
            <div className="flex flex-col gap-3">
              {SAVED_JOURNEYS.map((j) => <JourneyItem key={j.id} {...j} />)}
            </div>
          ) : (
            <Empty>
              <Empty.Icon><MapTrifoldIcon weight="duotone" /></Empty.Icon>
              <Empty.Title>Belum ada perjalanan tersimpan</Empty.Title>
              <Empty.Description>Simpan perjalanan favorit untuk akses cepat.</Empty.Description>
            </Empty>
          )}
        </TabsContent>

        <TabsContent value="guides" className="mt-4">
          {SAVED_GUIDES.length > 0 ? (
            <div className="flex flex-col gap-3">
              {SAVED_GUIDES.map((g) => <GuideItem key={g.id} {...g} />)}
            </div>
          ) : (
            <Empty>
              <Empty.Icon><UserIcon weight="duotone" /></Empty.Icon>
              <Empty.Title>Belum ada pemandu tersimpan</Empty.Title>
              <Empty.Description>Simpan pemandu favoritmu di sini.</Empty.Description>
            </Empty>
          )}
        </TabsContent>

        <TabsContent value="groups" className="mt-4">
          {SAVED_GROUPS.length > 0 ? (
            <div className="flex flex-col gap-3">
              {SAVED_GROUPS.map((g) => <GroupItem key={g.id} {...g} />)}
            </div>
          ) : (
            <Empty>
              <Empty.Icon><UsersIcon weight="duotone" /></Empty.Icon>
              <Empty.Title>Belum ada grup tersimpan</Empty.Title>
              <Empty.Description>Simpan grup pemandu favoritmu di sini.</Empty.Description>
            </Empty>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
