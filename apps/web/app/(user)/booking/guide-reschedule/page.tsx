import { GuideReschedulePreview } from "@/components/shared/booking/guide-reschedule-preview"
import { getGuideReschedulePreview } from "@/lib/server/guide-reschedule-preview"

export const dynamic = "force-dynamic"

export default function GuideReschedulePage() {
  return <GuideReschedulePreview {...getGuideReschedulePreview()} />
}
