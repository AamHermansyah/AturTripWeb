import Link from "next/link"
import { Button } from "@/components/ui/button"

export function GuideCta() {
  return (
    <div className="relative overflow-hidden rounded-4xl bg-primary px-6 py-8">
      {/* Decorative dots */}
      <div className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex-1">
          <h2 className="font-heading text-lg font-extrabold text-primary-foreground">
            Kamu seorang Pemandu?
          </h2>
          <p className="mt-1 text-sm text-primary-foreground/80 leading-snug">
            Bergabunglah dengan komunitas profesional kami dan kembangkan bisnismu.
          </p>
        </div>
        <Button
          asChild
          className="shrink-0 rounded-full bg-primary-foreground font-bold text-primary hover:bg-primary-foreground/90"
        >
          <Link href="/register?role=guide">Daftar</Link>
        </Button>
      </div>
    </div>
  )
}
