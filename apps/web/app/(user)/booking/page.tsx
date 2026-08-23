import CardHistory from "./_components/card-history"

export default function HistoryPage() {
  return (
    <div className="px-5 space-y-4">
      <h1 className="font-heading text-lg font-extrabold tracking-tight">Riwayat Perjalanan</h1>

      <div className="space-y-4">
        <CardHistory
          imageSrc="https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=1200&auto=format&fit=crop"
          date="12 AGU - 15 AGU"
          title="Pendakian Gunung Rinjani dan Danau Segara Anak"
          status="LUNAS"
          price="Rp 1.500.000"
        />

        <CardHistory
          imageSrc="https://images.unsplash.com/photo-1439853949127-fa647821eba0?q=80&w=1200&auto=format&fit=crop"
          date="20 SEP - 22 SEP"
          title="Kemah Pinus Cahaya Bintang"
          status="MENUNGGU"
          price="Rp 250.000"
        />

        <CardHistory
          imageSrc="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=500"
          date="05 OKT"
          time="04:00 - 11:00"
          title="Sunrise Bromo Adventure"
          status="LUNAS_DP"
          price="Rp 450.000"
        />

        <CardHistory
          imageSrc="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=500"
          date="10 NOV"
          time="14:00 - 18:00"
          title="Pantai Tersembunyi Bali"
          status="KEDALUWARSA"
          price="Rp 3.000.000"
        />
      </div>
    </div>
  )
}
