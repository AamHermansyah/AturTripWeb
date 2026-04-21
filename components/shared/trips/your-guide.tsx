import { StarIcon, ChatTeardropTextIcon } from "@phosphor-icons/react/dist/ssr"

export function YourGuide() {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-heading font-extrabold tracking-tight text-foreground">Pemandu Anda</h2>

      <div className="bg-card border border-border/40 rounded-full p-2 pr-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop"
            alt="Tenzing N. Walker"
            className="size-12 rounded-full object-cover border border-border/50"
          />
          <div>
            <h3 className="font-heading truncate text-[15px] font-semibold text-foreground mb-0.5">Tenzing N. Walker</h3>
            <div className="flex items-center gap-1">
              <StarIcon weight="fill" className="size-3.5 text-warning" />
              <span className="text-xs font-semibold text-muted-foreground">4.9 (124)</span>
            </div>
          </div>
        </div>

        <button className="size-10 rounded-full bg-success/10 flex items-center justify-center shrink-0 text-success transition-colors hover:bg-success/20">
          <ChatTeardropTextIcon weight="fill" className="size-5" />
        </button>
      </div>
    </div>
  )
}
