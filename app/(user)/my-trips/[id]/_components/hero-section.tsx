import { MapPinIcon } from "@phosphor-icons/react/dist/ssr"

export function HeroSection() {
  return (
    <div className="relative h-[220px] w-full">
      <img
        src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop"
        alt="Jalur Puncak Berkabut"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

      <div className="absolute bottom-6 left-0 w-full px-5 flex flex-col gap-2 z-10">
        <div className="inline-flex items-center gap-1.5 bg-zinc-800/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full w-fit text-white">
          <MapPinIcon weight="fill" className="size-4 text-zinc-300" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-200">
            Nusa Tenggara Barat, Indonesia
          </span>
        </div>
        <h1 className="font-heading text-white text-2xl font-bold leading-[1.2] tracking-tight">
          Pendakian Gunung Rinjani dan Danau Segara Anak
        </h1>
      </div>
    </div>
  )
}
