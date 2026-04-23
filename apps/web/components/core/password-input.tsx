"use client"

import { forwardRef, useState } from "react"
import { LockSimpleIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"

type StrengthLevel = "weak" | "fair" | "strong" | "very-strong"

const STRENGTH_CONFIG: Record<
  StrengthLevel,
  { label: string; bars: number; color: string; labelColor: string }
> = {
  "weak": { label: "Lemah", bars: 1, color: "bg-destructive", labelColor: "text-destructive" },
  "fair": { label: "Cukup", bars: 2, color: "bg-warning", labelColor: "text-warning" },
  "strong": { label: "Kuat", bars: 3, color: "bg-success", labelColor: "text-success" },
  "very-strong": { label: "Sangat Kuat", bars: 4, color: "bg-success", labelColor: "text-success" },
}

function getStrengthLevel(password: string): StrengthLevel {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return "weak"
  if (score === 2) return "fair"
  if (score === 3) return "strong"
  return "very-strong"
}

function getMissingHints(password: string): string[] {
  const hints: string[] = []
  if (password.length < 8) hints.push("minimal 8 karakter")
  if (!/[A-Z]/.test(password)) hints.push("satu huruf kapital")
  if (!/[0-9]/.test(password)) hints.push("satu angka")
  if (!/[^A-Za-z0-9]/.test(password)) hints.push("satu karakter spesial")
  return hints
}

type PasswordInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  showStrength?: boolean
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ placeholder = "Kata Sandi", showStrength = false, onChange, className, ...props }, ref) => {
    const [show, setShow] = useState(false)
    const [value, setValue] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
      onChange?.(e)
    }

    const level = getStrengthLevel(value)
    const config = STRENGTH_CONFIG[level]
    const hints = getMissingHints(value)
    const hasInput = value.length > 0

    return (
      <div className="flex flex-col gap-2">
        <InputGroup>
          <InputGroupAddon>
            <LockSimpleIcon />
          </InputGroupAddon>
          <InputGroupInput
            ref={ref}
            type={show ? "text" : "password"}
            placeholder={placeholder}
            onChange={handleChange}
            className={cn("rounded-r-none", className)}
            {...props}
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
            >
              {show ? <EyeSlashIcon /> : <EyeIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>

        {showStrength && hasInput && (
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Kekuatan kata sandi</span>
              <span className={cn("text-xs font-semibold", config.labelColor)}>
                {config.label}
              </span>
            </div>

            <div className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 flex-1 rounded-full transition-colors duration-300",
                    i < config.bars ? config.color : "bg-muted"
                  )}
                />
              ))}
            </div>

            {hints.length > 0 && (
              <p className="text-xs text-muted-foreground">
                Harus mengandung {hints.join(", ")}.
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
