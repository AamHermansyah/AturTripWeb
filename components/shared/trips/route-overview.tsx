import { NavigationArrowIcon } from "@phosphor-icons/react/dist/ssr"

export function RouteOverview() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-heading font-extrabold tracking-tight text-foreground">Ringkasan Rute</h2>

      <div className="relative rounded-4xl overflow-hidden h-48 w-full shadow-sm bg-zinc-300 dark:bg-zinc-800 border-2 border-white dark:border-zinc-900">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
          alt="Map Topography"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply dark:mix-blend-screen"
        />
        <svg className="absolute inset-0 w-full h-full drop-shadow-md" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M -10 110 Q 50 60, 80 40" fill="none" className="stroke-primary" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="80" cy="40" r="3.5" className="fill-white stroke-primary" strokeWidth="2.5" />
        </svg>

        <div className="absolute bottom-3 left-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl px-3 py-2 flex items-center gap-4 shadow-md shadow-black/5">
          <div>
            <p className="text-[9px] font-bold text-primary uppercase tracking-widest">Jarak</p>
            <p className="text-xs font-extrabold text-foreground mt-0.5">12.4 km</p>
          </div>
        </div>

        <div className="absolute bottom-3 right-3 size-10 rounded-full bg-success flex items-center justify-center text-white shadow-lg shadow-success/30 border-2 border-white dark:border-zinc-900">
          <NavigationArrowIcon weight="fill" className="size-4" />
        </div>
      </div>
    </div>
  )
}
