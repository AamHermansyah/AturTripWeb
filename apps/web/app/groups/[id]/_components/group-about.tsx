import { Separator } from "@/components/ui/separator"

interface GroupAboutProps {
  description: string
  establishedYear: string
  tags: string[]
}

export function GroupAbout({ description, establishedYear, tags }: GroupAboutProps) {
  return (
    <div className="space-y-3">
      <h2 className="font-heading text-lg font-extrabold tracking-tight">Tentang Kami</h2>

      <p className="text-justify text-[13px] font-medium leading-[1.6] text-muted-foreground">
        {description}
      </p>

      <p className="text-xs text-muted-foreground">
        Beroperasi sejak <span className="font-bold text-foreground">{establishedYear}</span>
      </p>

      <Separator />

      <div className="flex flex-wrap items-center gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-muted-foreground shadow-xs"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
