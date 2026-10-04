import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function PageHeading({ title, description, eyebrow, children, className }: { title: string; description?: ReactNode; eyebrow?: string; children?: ReactNode; className?: string }) {
  return <header className={cn("flex flex-col items-start gap-3", className)}>
    {eyebrow && <p className="text-sm font-medium text-primary">{eyebrow}</p>}
    <h1 className="font-heading text-[1.75rem] font-bold leading-[1.2] tracking-tight">{title}</h1>
    {description && <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">{description}</p>}
    {children}
  </header>
}
