"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Step1 } from "./_components/step-1"
import { Step2 } from "./_components/step-2"
import { Step3 } from "./_components/step-3"
import type { Role, Interest, TravelWith, ExperienceLevel } from "@/lib/constants/personalize"

export default function PersonalizePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const [role, setRole] = useState<Role | null>(null)
  const [interests, setInterests] = useState<Interest[]>([])
  const [travelWith, setTravelWith] = useState<TravelWith>("solo")
  const [experience, setExperience] = useState<ExperienceLevel>("enthusiast")

  const toggleInterest = (id: Interest) =>
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )

  const canContinue =
    (step === 1 && role !== null) ||
    (step === 2 && interests.length > 0) ||
    step === 3

  const handleNext = () => {
    if (step < 3) setStep((s) => s + 1)
    else router.push("/explore")
  }

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header */}
      <div className="shrink-0 px-5 pt-6 pb-4">
        <p className="mb-5 text-center text-xs font-bold tracking-widest text-primary">
          LANGKAH {step} DARI 3
        </p>
        <div className="flex gap-1.5">
          {[1, 2, 3].map((s) => (
            <div key={s} className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full bg-primary transition-all duration-500",
                  s <= step ? "w-full" : "w-0"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="min-h-0 flex-1 px-5">
        <div className="pb-6">
          {step === 1 && <Step1 role={role} setRole={setRole} />}
          {step === 2 && <Step2 interests={interests} toggleInterest={toggleInterest} />}
          {step === 3 && (
            <Step3
              travelWith={travelWith}
              setTravelWith={setTravelWith}
              experience={experience}
              setExperience={setExperience}
            />
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="shrink-0 flex flex-col gap-2 px-5 py-4">
        <Button onClick={handleNext} disabled={!canContinue} size="lg" className="w-full">
          {step === 3 ? "Selesai" : "Lanjut"}
        </Button>
        {step > 1 && (
          <Button onClick={() => setStep((s) => s - 1)} variant="outline" className="w-full">
            Kembali
          </Button>
        )}
      </div>
    </div>
  )
}
