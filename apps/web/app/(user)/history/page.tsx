import CardHistory from "./_components/card-history"

export default function HistoryPage() {
  return (
    <div className="px-5 space-y-4">
      <h1 className="font-heading text-lg font-extrabold tracking-tight">Riwayat Perjalanan</h1>

      <div className="space-y-4">
        <CardHistory
          imageSrc="https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=1200&auto=format&fit=crop"
          date="AUG 12 - AUG 15"
          title="Pendakian Gunung Rinjani dan Danau Segara Anak"
          status="LUNAS"
          price="Rp 1.500.000"
        />

        <CardHistory
          imageSrc="https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=1200&auto=format&fit=crop"
          date="SEPT 20 - SEPT 22"
          title="Starlight Pines Camp"
          status="PENDING"
          price="Rp 250.000"
        />

        <CardHistory
          imageSrc="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=500"
          date="OKT 05"
          time="04:00 - 11:00"
          title="Bromo Sunrise Adventure"
          status="LUNAS DP"
          price="Rp 450.000"
        />

        <CardHistory
          imageSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=500"
          date="NOV 10"
          time="14:00 - 18:00"
          title="Bali Hidden Beaches"
          status="EXPIRED"
          price="Rp 3.000.000"
        />
      </div>
    </div>
  )
}