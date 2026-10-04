export type VersionFacts = {
  meeting: string; destination: string; coreActivities: string[]; modes: string[];
  durationMinutes: number; difficulty: string; region: string; terrain: string; risk: number;
  routeMeters: number; routeMinutes: number; startsAt: string;
}
export type ChangeClassification = {
  kind: "minor" | "important" | "reschedule"; reasons: string[];
  distancePercent: number | null; durationPercent: number | null;
}

/** Bandingkan terhadap versi lama, termasuk pengurangan jarak/durasi. */
export function relativeChange(previous: number, proposed: number): number | null {
  if (!Number.isFinite(previous) || !Number.isFinite(proposed) || previous < 0 || proposed < 0) throw new Error("Ukuran rute tidak valid")
  return previous === 0 ? (proposed === 0 ? 0 : null) : Math.abs(proposed - previous) / previous * 100
}

export function classifyTripChange(previous: VersionFacts, proposed: VersionFacts): ChangeClassification {
  const distancePercent = relativeChange(previous.routeMeters, proposed.routeMeters)
  const durationPercent = relativeChange(previous.routeMinutes, proposed.routeMinutes)
  const reasons: string[] = []
  for (const [field, label] of [["meeting", "Titik temu utama berubah"], ["destination", "Tujuan utama berubah"], ["durationMinutes", "Durasi trip berubah"], ["difficulty", "Tingkat kesulitan berubah"], ["region", "Wilayah utama berubah"], ["terrain", "Medan utama berubah"]] as const) {
    if (previous[field] !== proposed[field]) reasons.push(label)
  }
  const sameItems = (old: string[], next: string[]) => JSON.stringify([...new Set(old)].sort()) === JSON.stringify([...new Set(next)].sort())
  if (!sameItems(previous.coreActivities, proposed.coreActivities)) reasons.push("Kegiatan inti berubah")
  if (!sameItems(previous.modes, proposed.modes)) reasons.push("Moda perjalanan berubah")
  if (proposed.risk > previous.risk) reasons.push("Risiko perjalanan meningkat")
  if (distancePercent === null || distancePercent >= 20) reasons.push("Jarak rencana berubah sedikitnya 20% atau rute baru ditambahkan")
  if (durationPercent === null || durationPercent >= 20) reasons.push("Estimasi waktu rute berubah sedikitnya 20% atau perjalanan baru ditambahkan")
  const reschedule = previous.startsAt !== proposed.startsAt
  if (reschedule) reasons.push("Jam mulai berubah: gunakan alur reschedule")
  return { kind: reschedule ? "reschedule" : reasons.length ? "important" : "minor", reasons, distancePercent, durationPercent }
}

export type ChangeStatus = "draft" | "pending" | "applied" | "kept-old" | "refunded"
export type ChangeState = {
  status: ChangeStatus; activeVersion: "old" | "proposed"; refund: number;
  events: { message: string; channels: ("Aplikasi" | "WhatsApp")[] }[];
}
export type ChangeAction = "submit" | "accept" | "reject" | "no-response" | "keep-old" | "cancel"
export function initialChangeState(): ChangeState { return { status: "draft", activeVersion: "old", refund: 0, events: [] } }

/** State simulasi satu booking. Snapshot lama tidak ditulis ulang oleh usulan. */
export function transitionTripChange(state: ChangeState, action: ChangeAction, kind: ChangeClassification["kind"], paidBase: number, serviceFee: number): ChangeState {
  if (kind === "reschedule" || action === "no-response") return state
  const emit = (status: ChangeStatus, activeVersion: ChangeState["activeVersion"], message: string, refund = 0, channels: ("Aplikasi" | "WhatsApp")[] = ["Aplikasi", "WhatsApp"]): ChangeState => ({ status, activeVersion, refund, events: [...state.events, { message, channels }] })
  if (state.status === "draft" && action === "submit") return kind === "minor"
    ? emit("applied", "proposed", "Koreksi kecil berlaku. Versi lama tetap tersimpan.", 0, ["Aplikasi"])
    : emit("pending", "old", "Usulan perubahan penting menunggu jawaban wisatawan. Versi lama tetap berlaku.")
  if (state.status !== "pending") return state
  if (action === "accept") return emit("applied", "proposed", "Wisatawan menyetujui versi usulan untuk booking ini.")
  if (action === "keep-old") return emit("kept-old", "old", "Pemandu menarik usulan dan menjalankan versi lama.")
  if (action === "reject" || action === "cancel") return emit("refunded", "old", action === "reject" ? "Wisatawan menolak perubahan. Booking batal dengan refund penuh." : "Pemandu tidak dapat menjalankan versi lama. Booking batal dengan refund penuh.", paidBase + serviceFee)
  return state
}
