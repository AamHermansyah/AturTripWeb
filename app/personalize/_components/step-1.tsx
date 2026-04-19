"use client"

import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ROLES, type Role } from "@/lib/constants/personalize"

interface Step1Props {
  role: Role | null
  setRole: (r: Role) => void
}

export function Step1({ role, setRole }: Step1Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="mb-2">
        <h1 className="font-heading text-2xl font-extrabold leading-tight text-foreground">
          Bagaimana kamu akan menggunakan AturTrip?
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pilih peran yang paling menggambarkan tujuanmu.
        </p>
      </div>

      <RadioGroup
        value={role ?? ""}
        onValueChange={(v) => setRole(v as Role)}
        className="flex flex-col gap-0"
      >
        {ROLES.map(({ id, label, description, icon: Icon }) => (
          <div key={id}>
            <RadioGroupItem value={id} id={`role-${id}`} className="sr-only" />
            <label
              htmlFor={`role-${id}`}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-all",
                role === id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-background hover:border-primary/40"
              )}
            >
              <div
                className={cn(
                  "flex size-12 shrink-0 items-center justify-center rounded-full transition-colors",
                  role === id ? "bg-primary" : "bg-muted"
                )}
              >
                <Icon
                  size={24}
                  weight="fill"
                  className={role === id ? "text-primary-foreground" : "text-muted-foreground"}
                />
              </div>
              <div>
                <p className="font-semibold text-foreground">{label}</p>
                <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
              </div>
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
