'use client'

import { forwardRef } from "react"
import { CaretRightIcon } from "@phosphor-icons/react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type RowBadge = {
  label: string
  variant: "success" | "warning" | "info" | "destructive" | "secondary"
}

interface SecurityRowProps extends React.ComponentProps<"button"> {
  icon: React.ElementType
  label: string
  /** Nilai ringkas di sisi kanan, mis. email yang disamarkan */
  value?: string
  badge?: RowBadge
  tone?: "default" | "destructive"
}

export const SecurityRow = forwardRef<HTMLButtonElement, SecurityRowProps>(
  ({ icon: Icon, label, value, badge, tone = "default", className, ...props }, ref) => {
    const isDestructive = tone === "destructive"

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          "group flex w-full items-center gap-4 rounded-xl p-2 text-left transition-colors hover:bg-background/70 active:bg-background/80",
          className
        )}
        {...props}
      >
        <div
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full bg-background shadow-xs transition-transform group-hover:scale-110 group-hover:border",
            isDestructive ? "text-destructive" : "text-primary"
          )}
        >
          <Icon weight="fill" className="size-4" />
        </div>

        <span
          className={cn(
            "flex-1 truncate text-[15px] font-bold",
            isDestructive && "text-destructive"
          )}
        >
          {label}
        </span>

        {badge ? (
          <Badge variant={badge.variant} className="shrink-0 text-[10px]">
            {badge.label}
          </Badge>
        ) : (
          value && (
            <span className="max-w-30 truncate text-xs font-medium text-muted-foreground">
              {value}
            </span>
          )
        )}

        <CaretRightIcon weight="bold" className="mr-2 size-4 shrink-0 text-muted-foreground" />
      </button>
    )
  }
)

SecurityRow.displayName = "SecurityRow"

export function SecuritySection({
  title,
  action,
  children,
}: {
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pl-2">
        <h2 className="text-sm font-semibold text-muted-foreground">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </div>
  )
}

export function SecurityGroup({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-1 rounded-4xl bg-muted/40 p-3", className)}>
      {children}
    </div>
  )
}
